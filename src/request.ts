import { base64 } from "@oslojs/encoding";

export class OAuth2RequestContext {
	public body = new URLSearchParams();
	public headers = new Headers();

	public clientId: string;

	constructor(clientId: string) {
		this.clientId = clientId;
		this.body.set("client_id", clientId);
		this.headers.set("Content-Type", "application/x-www-form-urlencoded");
		this.headers.set("Accept", "application/json");
		this.headers.set("User-Agent", "oslo");
	}

	public authenticateWithRequestBody(clientSecret: string): void {
		this.body.set("client_secret", clientSecret);
	}

	public authenticateWithHTTPBasicAuth(clientPassword: string): void {
		const authorizationHeader = base64.encode(
			new TextEncoder().encode(`${this.clientId}:${clientPassword}`)
		);
		this.headers.set("Authorization", authorizationHeader);
	}

	public toFetchRequest(method: string, url: string): Request {
		return new Request(url, {
			method,
			body: this.body,
			headers: this.headers
		});
	}
}

export class OAuth2Request {
	public method: string;
	public url: string;
	public headers: Headers;
	public body: URLSearchParams;

	constructor(method: string, url: string, headers: Headers, body: URLSearchParams) {
		this.method = method;
		this.url = url;
		this.headers = headers;
		this.body = body;
	}
}

export class OAuth2RequestError extends Error {
	public request: OAuth2Request;
	public description: string | null;
	public responseHeaders: Headers;

	constructor(
		request: OAuth2Request,
		responseHeaders: Headers,
		options?: {
			message?: string;
			description?: string;
		}
	) {
		super(options?.message ?? "Unknown error");
		this.request = request;
		this.responseHeaders = responseHeaders;
		this.description = options?.description ?? null;
	}
}