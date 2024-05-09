---
title: "Refresh tokens"
---

# Refresh tokens

This is defined in [RFC 6749 §6](https://datatracker.ietf.org/doc/html/rfc6749#section-6).

Create a new [`RefreshRequestContext`](/reference/main/RefreshRequestContext) and send a refresh request to the token endpoint with [`sendTokenRequest()`](/reference/main/sendTokenRequest). This throws an [`OAuth2RequestError`](/reference/main/OAuth2RequestError) when the endpoint returns a known OAuth 2.0 error response.

```ts
import { RefreshRequestContext, sendTokenRequest, OAuth2RequestError } from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

const context = new RefreshRequestContext(refreshToken);
context.authenticateWithHTTPBasicAuth(clientId, clientPassword);

try {
	const tokens = await sendTokenRequest(tokenEndpoint, context);
	const accessToken = tokens.access_token;
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// known error
		const message = e.message;
	}
	// unknown error
}
```

Use `authenticateWithHTTPBasicAuth()` to send the client ID and password in the `Authorization` header. Alternatively, use `authenticateWithRequestBody()` to send the client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential or doesn't require it, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```

You can overwrite the response type by providing a type as an argument.

```ts
import type { TokenResponseBody } from "@oslojs/oauth2";

const tokens = await sendTokenRequest<ResponseBody>(context);
const accessToken = tokens.access_token;
const refreshToken = tokens.refresh_token;

interface ResponseBody extends TokenResponseBody {
	refresh_token: string;
}
```
