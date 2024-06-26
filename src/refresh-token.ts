import { OAuth2RequestContext } from "./request.js";

export class RefreshRequestContext extends OAuth2RequestContext {
	constructor(refreshToken: string) {
		super("POST");
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
