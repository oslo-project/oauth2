import { OAuth2Request, OAuth2RequestError } from "./request.js";

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

export async function sendTokenEndpointRequest<_TokenResponseBody extends TokenResponseBody>(
	tokenEndpoint: string,
	context: OAuth2RequestContext
): Promise<_TokenResponseBody> {
	const response = await fetch(context.toFetchRequest("POST", tokenEndpoint));
	const result: _TokenResponseBody | TokenErrorResponseBody = await response.json();
	if ("access_token" in result) {
		return result as _TokenResponseBody;
	}
	const request = new OAuth2Request("POST", tokenEndpoint, context.headers, context.body);
	throw new OAuth2RequestError(request, response.headers, {
		message: result.error,
		description: result.error_description
	});
}
