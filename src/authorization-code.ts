import { sha256 } from "@oslojs/crypto/sha2";
import { base64url } from "@oslojs/encoding";
import { OAuth2RequestContext } from "./request.js";
import { sendTokenEndpointRequest } from "./token.js";

import type { TokenResponseBody } from "./token.js";

export class AuthorizationCodeClient {
	public clientId: string;

	public authorizationEndpoint: string;
	public tokenEndpoint: string;

	private redirectURI: string | null = null;

	constructor(
		clientId: string,
		authorizationEndpoint: string,
		tokenEndpoint: string,
		options?: {
			redirectURI?: string;
		}
	) {
		this.clientId = clientId;
		this.authorizationEndpoint = authorizationEndpoint;
		this.tokenEndpoint = tokenEndpoint;
		if (options !== undefined && options.redirectURI !== undefined) {
			this.redirectURI = options.redirectURI;
		}
	}

	public createAuthorizationURL(): AuthorizationCodeAuthorizationURL {
		const url = new AuthorizationCodeAuthorizationURL(this.authorizationEndpoint, this.clientId);
		if (this.redirectURI !== null) {
			url.setRedirectURI(this.redirectURI);
		}
		return url;
	}

	public createTokenRequestContext(
		authorizationCode: string
	): AuthorizationCodeTokenRequestContext {
		const request = new AuthorizationCodeTokenRequestContext(
			this.clientId,
			authorizationCode
		);
		if (this.redirectURI !== null) {
			request.setRedirectURI(this.redirectURI);
		}
		return request;
	}

	public async sendTokenRequest<_TokenResponseBody extends TokenResponseBody>(
		context: AuthorizationCodeTokenRequestContext
	): Promise<_TokenResponseBody> {
		const result = await sendTokenEndpointRequest<_TokenResponseBody>(this.tokenEndpoint, context);
		return result;
	}
}

export class AuthorizationCodeAuthorizationURL extends URL {
	constructor(authorizeEndpoint: string, clientId: string) {
		super(authorizeEndpoint);
		this.searchParams.set("response_type", "code");
		this.searchParams.set("client_id", clientId);
	}

	public setRedirectURI(redirectURI: string): void {
		this.searchParams.set("redirect_uri", redirectURI);
	}

	public setScopes(...scopes: string[]): void {
		this.searchParams.set("scope", scopes.join(" "));
	}

	public appendScopes(...scopes: string[]): void {
		if (scopes.length < 1) {
			return;
		}
		let scopeValue = scopes.join(" ");
		const existingScopes = this.searchParams.get("scope");
		if (existingScopes !== null) {
			scopeValue = " " + existingScopes;
		}
		this.searchParams.set("scope", scopeValue);
	}

	public setState(state: string): void {
		this.searchParams.set("state", state);
	}

	public setS256CodeChallenge(codeVerifier: string): void {
		const codeChallengeBytes = sha256(new TextEncoder().encode(codeVerifier));
		const codeChallenge = base64url.encode(codeChallengeBytes, {
			includePadding: false
		});
		this.searchParams.set("code_challenge", codeChallenge);
		this.searchParams.set("code_challenge_method", "S256");
	}

	public setPlainCodeChallenge(codeVerifier: string): void {
		this.searchParams.set("code_challenge", codeVerifier);
		this.searchParams.set("code_challenge_method", "plain");
	}
}

export class AuthorizationCodeTokenRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, authorizationCode: string) {
		super(clientId);
		this.body.set("grant_type", "authorization_code");
		this.body.set("code", authorizationCode);
	}

	public setCodeVerifier(codeVerifier: string): void {
		this.body.set("code_verifier", codeVerifier);
	}

	public setRedirectURI(redirectURI: string): void {
		this.body.set("redirect_uri", redirectURI);
	}
}

export function generateCodeVerifier(): string {
	const randomValues = new Uint8Array(32);
	crypto.getRandomValues(randomValues);
	return base64url.encode(randomValues, {
		includePadding: false
	});
}

export function generateState(): string {
	const randomValues = new Uint8Array(32);
	crypto.getRandomValues(randomValues);
	return base64url.encode(randomValues, {
		includePadding: false
	});
}
