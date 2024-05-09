---
title: "Token revocation"
---

# Token revocation

This is defined is [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009).

Create a new [`TokenRevocationRequestContext`](/reference/main/TokenRevocationRequestContext) and send a revocation request to the token endpoint with [`sendTokenRevocationRequest()`](/reference/main/sendTokenRevocationRequest). This throws an [`OAuth2RequestError`](/reference/main/OAuth2RequestError) when the endpoint returns a known OAuth 2.0 error response.

```ts
import {
	TokenRevocationRequestContext,
	sendTokenRevocationRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new TokenRevocationRequestContext(accessToken);
context.authenticateWithHTTPBasicAuth(clientId, clientPassword);
context.setTokenTypeHint("access_token"); // set `token_type_hint`

try {
	await sendTokenRevocationRequest(tokenRevocationEndpoint, context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// known error
		const message = e.message;
	}
	// unknown error
}
```

Use `authenticateWithHTTPBasicAuth()` to send the client ID and password in the `Authorization` header. Alternatively, use `authenticateWithRequestBody()` to send the client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```

This also supports refresh token revocation.

```ts
const context = new TokenRevocationRequestContext(refreshToken);
context.setTokenTypeHint("refresh_token");
```
