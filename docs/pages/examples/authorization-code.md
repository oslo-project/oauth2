---
title: "Authorization code grant type"
---

# Authorization code grant type

This grant type is defined in [RFC 6749 section 1.3.1](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.1).

## Create authorization URL

Use [`AuthorizationCodeAuthorizationURL`](/reference/main/AuthorizationCodeAuthorizationURL) to represent a new authorization URL. You can use [`generateState()`](/reference/main/generateState) to generate a new state (make sure the state is different on each request).

```ts
import { AuthorizationCodeAuthorizationURL, generateState } from "@oslojs/oauth2";

const authorizationEndpoint = "https://example.com/oauth2/authorize";

const state = generateState();

const url = new AuthorizationCodeAuthorizationURL(authorizationEndpoint, clientId);
url.setRedirectURI("https://my-app.com/login/callback");
url.setState(state);
url.setScopes("user", "profile");

const redirectLocation = url.toString();

// Store state as cookie or in session.
```

Use `appendScopes()` to append new scopes to existing ones.

```ts
url.appendScopes("user");
url.appendScopes("profile");
```

## Validation authorization code

Create a new [`AuthorizationCodeAccessTokenRequestContext`](/reference/main/AuthorizationCodeAccessTokenRequestContext) and send an access token request with [`sendTokenRequest()`](/reference/main/sendTokenRequest).

This throws an [`OAuth2RequestError`](/reference/main/OAuth2RequestError) when the endpoint returns a known OAuth 2.0 error response.

```ts
import {
	AuthorizationCodeAccessTokenRequestContext,
	sendTokenRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

// Validate state.

const context = new AuthorizationCodeAccessTokenRequestContext(code);
context.setRedirectURI("https://my-app.com/login/callback");
context.authenticateWithHTTPBasicAuth(clientId, clientSecret);

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

Use `authenticateWithHTTPBasicAuth()` to send the client ID and password in the `Authorization` header. Alternatively, use `authenticateWithRequestBody()` to send the client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential, use `setClientId()` to just set the `client_id` parameter.

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
