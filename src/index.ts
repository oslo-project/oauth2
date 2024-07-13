export class OAuth2RequestResult {
	public body: object;

	constructor(body: object) {
		this.body = body;
	}

	public hasErrorCode(): boolean {
		return "error" in this.body && typeof this.body.error === "string";
	}

	public errorCode(): string {
		if ("error" in this.body && typeof this.body.error === "string") {
			return this.body.error;
		}
		throw new Error("Missing or invalid 'error' field");
	}

	public hasErrorDescription(): boolean {
		return "error_description" in this.body && typeof this.body.error_description === "string";
	}

	public errorDescription(): string {
		if ("error_description" in this.body && typeof this.body.error_description === "string") {
			return this.body.error_description;
		}
		throw new Error("Missing or invalid 'error_description' field");
	}

	public hasErrorURI(): boolean {
		return "error_uri" in this.body && typeof this.body.error_uri === "string";
	}

	public errorURI(): string {
		if ("error_uri" in this.body && typeof this.body.error_uri === "string") {
			return this.body.error_uri;
		}
		throw new Error("Missing or invalid 'error_uri' field");
	}

	public hasState(): boolean {
		return "state" in this.body && typeof this.body.state === "string";
	}

	public state(): string {
		if ("state" in this.body && typeof this.body.state === "string") {
			return this.body.state;
		}
		throw new Error("Missing or invalid 'state' field");
	}
}

export class TokenRequestResult extends OAuth2RequestResult {
	public tokenType(): string {
		if ("token_type" in this.body && typeof this.body.token_type === "string") {
			return this.body.token_type;
		}
		throw new Error("Missing or invalid 'token_type' field");
	}

	public accessToken(): string {
		if ("access_token" in this.body && typeof this.body.access_token === "string") {
			return this.body.access_token;
		}
		throw new Error("Missing or invalid 'access_token' field");
	}

	public accessTokenExpiresInSeconds(): number {
		if ("expires_in" in this.body && typeof this.body.expires_in === "number") {
			return this.body.expires_in;
		}
		throw new Error("Missing or invalid 'expires_in' field");
	}

	public accessTokenExpiresAt(): Date {
		return new Date(Date.now() + this.accessTokenExpiresInSeconds() * 1000);
	}

	public hasRefreshToken(): boolean {
		return "refresh_token" in this.body && typeof this.body.refresh_token === "string";
	}

	public refreshToken(): string {
		if ("refresh_token" in this.body && typeof this.body.refresh_token === "string") {
			return this.body.refresh_token;
		}
		throw new Error("Missing or invalid 'refresh_token' field");
	}

	public hasScopes(): boolean {
		return "scope" in this.body && typeof this.body.scope === "string";
	}

	public scopes(): string[] {
		if ("scope" in this.body && typeof this.body.scope === "string") {
			return this.body.scope.split(" ");
		}
		throw new Error("Missing or invalid 'scope' field");
	}
}

export class DeviceAuthorizationRequestResult extends OAuth2RequestResult {
	public deviceCode(): string {
		if ("device_code" in this.body && typeof this.body.device_code === "string") {
			return this.body.device_code;
		}
		throw new Error("Missing or invalid 'device_code' field");
	}

	public userCode(): string {
		if ("user_code" in this.body && typeof this.body.user_code === "string") {
			return this.body.user_code;
		}
		throw new Error("Missing or invalid 'user_code' field");
	}

	public verificationURI(): string {
		if ("verification_uri" in this.body && typeof this.body.verification_uri === "string") {
			return this.body.verification_uri;
		}
		throw new Error("Missing or invalid 'verification_uri' field");
	}

	public codesExpireInSeconds(): number {
		if ("expires_in" in this.body && typeof this.body.expires_in === "number") {
			return this.body.expires_in;
		}
		throw new Error("Missing or invalid 'expires_in' field");
	}

	public codesExpireAt(): Date {
		return new Date(Date.now() + this.codesExpireInSeconds() * 1000);
	}

	public intervalSeconds(): number {
		if ("interval" in this.body) {
			if (typeof this.body.interval === "number") {
				return this.body.interval;
			}
			throw new Error("Invalid 'interval' field");
		}
		return 5;
	}
}
