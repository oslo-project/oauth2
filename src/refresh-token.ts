import { OAuth2RequestContext } from "./request.js";
import { sendTokenEndpointRequest } from "./token.js";

import type { TokenResponseBody } from "./token.js";

export class RefreshTokenClient {
	public clientId: string;

	public tokenEndpoint: string;

	constructor(clientId: string, tokenEndpoint: string) {
		this.clientId = clientId;
		this.tokenEndpoint = tokenEndpoint;
	}

	public createTokenRequestContext(refreshToken: string): RefreshTokenRequestContext {
		const request = new RefreshTokenRequestContext(this.clientId, refreshToken);
		return request;
	}

	public async sendTokenRequest<_TokenResponseBody extends TokenResponseBody>(
		context: RefreshTokenRequestContext
	): Promise<_TokenResponseBody> {
		const result = await sendTokenEndpointRequest<_TokenResponseBody>(this.tokenEndpoint, context);
		return result;
	}
}

export class RefreshTokenRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, refreshToken: string) {
		super(clientId);
		this.body.set("grant_type", "refresh_token");
		this.body.set("refresh_token", refreshToken);
	}

	public setScopes(...scopes: string[]): void {
		this.body.set("scope", scopes.join(" "));
	}

	public appendScopes(...scopes: string[]): void {
		if (scopes.length < 1) {
			return;
		}
		let scopeValue = scopes.join(" ");
		const existingScopes = this.body.get("scope");
		if (existingScopes !== null) {
			scopeValue = scopeValue + " " + existingScopes;
		}
		this.body.set("scope", scopeValue);
	}
}
