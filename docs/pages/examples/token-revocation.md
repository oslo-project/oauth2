---
title: "Token revocation"
---

# Token revocation

Token revocation is defined is [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009).

Create a new [`TokenRevocationRequestContext`](/reference/main/TokenRevocationRequestContext) and send a request to the token endpoint using the context's method, body (`application/x-www-form-urlencoded`), and headers.

Use [`OAuth2RequestResult`](/reference/main/OAuth2RequestResult) to parse the returned JSON and get the error code with `errorCode()`. This throws an error if the field does not exist in the object or if the value is not of the expected type.

```ts
import { TokenRevocationRequestContext, TokenType, OAuth2RequestResult } from "@oslojs/oauth2";

const context = new TokenRevocationRequestContext(accessToken);

context.authenticateWithHTTPBasicAuth(clientId, clientSecret);
context.setTokenTypeHint(TokenType.AccessToken);

const body = new URLSearchParams();
for (const [key, value] of context.body.entries()) {
	body.set(key, value);
}
const response = await fetch(tokenEndpoint, {
	method: context.method,
	body,
	headers: new Headers(context.headers)
});

if (!response.ok) {
	const data = await response.json();
	const result = new OAuth2RequestResult(data);
	const error = result.errorCode();
}
```

`authenticateWithHTTPBasicAuth()` sets the client ID and password in the `Authorization` header, while `authenticateWithRequestBody()` sets client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```

You can also set the `token_type_hint` parameter to `refresh_token` by passing `TokenType.RefreshToken`.

```ts
import { TokenType } from "@oslojs/oauth2";

context.setTokenTypeHint(TokenType.RefreshToken);
```
