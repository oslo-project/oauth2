import { OAuth2RequestContext, OAuth2RequestError } from "./request.js";

import type { TokenErrorResponseBody } from "./token.js";

export async function sendTokenRevocationRequest(
	tokenRevocationEndpoint: string,
	context: TokenRevocationRequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<void> {
	const request = context.toFetchRequest("POST", tokenRevocationEndpoint);
	const response = await fetch(request, {
		signal: options?.signal
	});
	if (response.status === 200) {
		return;
	}
	const result: TokenErrorResponseBody = await response.json();
	throw new OAuth2RequestError(result.error, request, context, response.headers, {
		description: result.error_description
	});
}

export class TokenRevocationRequestContext extends OAuth2RequestContext {
	constructor(token: string) {
		super();
		this.body.set("token", token);
	}

	public setTokenTypeHint(tokenType: "access_token" | "refresh_token"): void {
		this.body.set("token_type_hint", tokenType);
	}
}
