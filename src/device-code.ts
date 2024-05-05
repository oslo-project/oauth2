import { OAuth2Request, OAuth2RequestContext, OAuth2RequestError } from "./request.js";

import type { TokenResponseBody, TokenErrorResponseBody } from "./token.js";

export class DeviceCodeClient {
	public clientId: string;

	private authorizationEndpoint: string;
	private tokenEndpoint: string;

	constructor(clientId: string, authorizationEndpoint: string, tokenEndpoint: string) {
		this.clientId = clientId;
		(this.authorizationEndpoint = authorizationEndpoint), (this.tokenEndpoint = tokenEndpoint);
	}

	public createAuthorizationRequestContext(): DeviceCodeAuthorizationRequestContext {
		const context = new DeviceCodeAuthorizationRequestContext(this.clientId);
		return context;
	}

	public async sendAuthorizationRequest<_ResponseBody extends DeviceCodeAuthorizationResponseBody>(
		context: DeviceCodeAuthorizationRequestContext
	): Promise<_ResponseBody> {
		const response = await fetch(context.toFetchRequest("POST", this.authorizationEndpoint));
		let result: _ResponseBody | TokenErrorResponseBody = await response.json();
		if (response.status === 200) {
			return result as _ResponseBody;
		}
		result = result as TokenErrorResponseBody;
		const request = new OAuth2Request(
			"POST",
			this.authorizationEndpoint,
			context.headers,
			context.body
		);
		throw new OAuth2RequestError(request, response.headers, {
			message: result.error,
			description: result.error_description
		});
	}

	public createTokenRequestContext(deviceCode: string): DeviceCodeTokenRequest {
		const context = new DeviceCodeTokenRequest(this.clientId, deviceCode);
		return context;
	}

	public async sendTokenRequest<_ResponseBody extends TokenResponseBody>(
		context: DeviceCodeTokenRequest
	): Promise<_ResponseBody> {
		const response = await fetch(context.toFetchRequest("POST", this.tokenEndpoint));
		const result: _ResponseBody | TokenErrorResponseBody = await response.json();
		if ("access_token" in result) {
			return result;
		}
		const request = new OAuth2Request("POST", this.tokenEndpoint, context.headers, context.body);
		throw new OAuth2RequestError(request, response.headers, {
			message: result.error,
			description: result.error_description
		});
	}
}

export class DeviceCodeAuthorizationRequestContext extends OAuth2RequestContext {
	constructor(clientId: string) {
		super(clientId);
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

export class DeviceCodeTokenRequest extends OAuth2RequestContext {
	constructor(clientId: string, deviceCode: string) {
		super(clientId);
		this.body.set("grant_type", "urn:ietf:params:oauth:grant-type:device_code");
		this.body.set("device_code", deviceCode);
	}
}

export interface DeviceCodeAuthorizationResponseBody {
	device_code: string;
	user_code: string;
	verification_uri: string;
	expires_in: number;
	interval?: number;
	verification_uri_complete?: string;
}
