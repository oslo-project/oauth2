---
title: "Refresh tokens"
---

# Refresh tokens

Token refresh is defined in [RFC 6749 §6](https://datatracker.ietf.org/doc/html/rfc6749#section-6).

Create a new [`RefreshRequestContext`](/reference/main/RefreshRequestContext) and send a request to the token endpoint using the context's method, body (`application/x-www-form-urlencoded`), and headers.

Use [`TokenRequestResult`](/reference/main/TokenRequestResult) to parse the returned JSON response. Get the error code with `errorCode()` or the access token with `refreshToken()`. These methods throw an error if the field does not exist in the object or if the value is not of the expected type.

```ts
import { RefreshRequestContext, TokenRequestResult } from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

const context = new RefreshRequestContext(refreshToken);
context.authenticateWithHTTPBasicAuth(clientId, clientSecret);

const body = new URLSearchParams();
for (const [key, value] of context.body.entries()) {
	body.set(key, value);
}
const response = await fetch(tokenEndpoint, {
	method: context.method,
	body,
	headers: new Headers(context.headers)
});
const data = await response.json();

const result = new TokenRequestResult(data);
// Some providers like GitHub return 200 even for errors
if (result.hasErrorCode()) {
	const error = result.errorCode();
} else {
	const accessToken = result.accessToken();
	const accessTokenExpiresAt = result.accessTokenExpiresAt();
	const refreshToken = result.refreshToken();
	const refreshTokenExpiresAt = result.refreshTokenExpiresAt();
}
```

`authenticateWithHTTPBasicAuth()` sets the client ID and password in the `Authorization` header, while `authenticateWithRequestBody()` sets client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential or doesn't require it, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```
