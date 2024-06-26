import { OAuth2RequestContext } from "./request.js";

export enum TokenType {
	AccessToken = 0,
	RefreshToken
}

export class TokenRevocationRequestContext extends OAuth2RequestContext {
	constructor(token: string) {
		super("POST");
		this.body.set("token", token);
	}

	public setTokenTypeHint(tokenType: TokenType): void {
		if (tokenType === TokenType.AccessToken) {
			this.body.set("token_type_hint", "access_token");
		} else if (tokenType === TokenType.RefreshToken) {
			this.body.set("token_type_hint", "refresh_token");
		}
	}
}
