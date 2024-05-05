import { OAuth2Request, OAuth2RequestContext, OAuth2RequestError } from "./request.js";

import type { TokenErrorResponseBody } from "./token.js";

export class TokenRevocationClient {
	public clientId: string;
	public tokenRevocationEndpoint: string;

	constructor(clientId: string, tokenRevocationEndpoint: string) {
		this.clientId = clientId;
		this.tokenRevocationEndpoint = tokenRevocationEndpoint;
	}

	public createAccessTokenRevocationRequestContext(
		accessToken: string
	): TokenRevocationRequestContext {
		const request = new TokenRevocationRequestContext(this.clientId, accessToken);
		request.setTokenTypeHint("access_token");
		return request;
	}

	public createRefreshTokenRevocationRequestContext(
		refreshToken: string
	): TokenRevocationRequestContext {
		const request = new TokenRevocationRequestContext(this.clientId, refreshToken);
		request.setTokenTypeHint("refresh_token");
		return request;
	}

	public async sendTokenRevocationRequest(
		context: TokenRevocationRequestContext,
		options?: {
			timeoutInSeconds?: number;
		}
	): Promise<void> {
		let response: Response;
		if (options?.timeoutInSeconds !== undefined) {
			response = await fetch(context.toFetchRequest("POST", this.tokenRevocationEndpoint), {
				signal: AbortSignal.timeout(options.timeoutInSeconds * 1000)
			});
		} else {
			response = await fetch(context.toFetchRequest("POST", this.tokenRevocationEndpoint));
		}
		if (response.status === 200) {
			return;
		}
		const result: TokenErrorResponseBody = await response.json();
		const request = new OAuth2Request(
			"POST",
			this.tokenRevocationEndpoint,
			context.headers,
			context.body
		);
		throw new OAuth2RequestError(request, response.headers, {
			message: result.error,
			description: result.error_description
		});
	}
}

export class TokenRevocationRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, token: string) {
		super(clientId);
		this.body.set("token", token);
	}

	public setTokenTypeHint(tokenType: "access_token" | "refresh_token"): void {
		this.body.set("token_type_hint", tokenType);
	}
}
