import { OAuth2RequestContext, OAuth2RequestError } from "./request.js";

import type { TokenErrorResponseBody } from "./token.js";

export class DeviceAuthorizationRequestContext extends OAuth2RequestContext {
	constructor() {
		super();
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

export class DeviceAccessTokenRequest extends OAuth2RequestContext {
	constructor(deviceCode: string) {
		super();
		this.body.set("grant_type", "urn:ietf:params:oauth:grant-type:device_code");
		this.body.set("device_code", deviceCode);
	}
}

export async function sendDeviceAuthorizationRequest<
	_ResponseBody extends DeviceAuthorizationResponseBody
>(
	deviceAuthorizationEndpoint: string,
	context: DeviceAuthorizationRequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<_ResponseBody> {
	const request = context.toFetchRequest("POST", deviceAuthorizationEndpoint);
	const response = await fetch(request, {
		signal: options?.signal
	});
	const result: _ResponseBody | TokenErrorResponseBody = await response.json();
	if ("device_code" in result) {
		return result as _ResponseBody;
	}
	throw new OAuth2RequestError(result.error, request, context, response.headers, {
		description: result.error_description
	});
}

export interface DeviceAuthorizationResponseBody {
	device_code: string;
	user_code: string;
	verification_uri: string;
	expires_in: number;
	interval?: number;
	verification_uri_complete?: string;
}
