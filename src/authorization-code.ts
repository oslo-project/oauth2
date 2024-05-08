import { base64url } from "@oslojs/encoding";
import { OAuth2RequestContext } from "./request.js";
import { sha256 } from "@oslojs/crypto/sha2";

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

export class AuthorizationCodeAccessTokenRequestContext extends OAuth2RequestContext {
	constructor(authorizationCode: string) {
		super();
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
