import { OAuth2RequestError } from "./request.js";

import type { OAuth2RequestContext } from "./request.js";

export interface TokenResponseBody {
	access_token: string;
	token_type: string;
	expires_in?: number;
	refresh_token?: string;
	scope?: string;
}

export interface TokenErrorResponseBody {
	error: string;
	error_description?: string;
}

export async function sendTokenRequest<_TokenResponseBody extends TokenResponseBody>(
	tokenEndpoint: string,
	context: OAuth2RequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<_TokenResponseBody> {
	const request = context.toFetchRequest("POST", tokenEndpoint);
	const response = await fetch(request, {
		signal: options?.signal
	});
	const result: _TokenResponseBody | TokenErrorResponseBody = await response.json();
	if ("access_token" in result) {
		return result as _TokenResponseBody;
	}
	throw new OAuth2RequestError(result.error, request, context, response.headers, {
		description: result.error_description
	});
}
