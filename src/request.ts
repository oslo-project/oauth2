import { base64 } from "@oslojs/encoding";

export class OAuth2RequestContext {
	public body = new URLSearchParams();
	public headers = new Headers();

	constructor() {
		this.headers.set("Content-Type", "application/x-www-form-urlencoded");
		this.headers.set("Accept", "application/json");
		this.headers.set("User-Agent", "oslo");
	}

	public setClientId(clientId: string): void {
		this.body.set("client_id", clientId);
	}

	public authenticateWithRequestBody(clientId: string, clientSecret: string): void {
		this.setClientId(clientId);
		this.body.set("client_secret", clientSecret);
	}

	public authenticateWithHTTPBasicAuth(clientId: string, clientSecret: string): void {
		const authorizationHeader = base64.encode(
			new TextEncoder().encode(`${clientId}:${clientSecret}`)
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

export class OAuth2RequestError extends Error {
	public request: Request;
	public context: OAuth2RequestContext;
	public description: string | null;
	public responseHeaders: Headers;

	constructor(
		message: string,
		request: Request,
		context: OAuth2RequestContext,
		responseHeaders: Headers,
		options?: {
			description?: string;
		}
	) {
		super(message);
		this.request = request;
		this.context = context;
		this.responseHeaders = responseHeaders;
		this.description = options?.description ?? null;
	}
}
