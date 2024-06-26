---
title: "Authorization code grant type"
---

# Authorization code grant type

This grant type is defined in [RFC 6749 §1.3.1](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.1).

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

Create a new [`AuthorizationCodeTokenRequestContext`](/reference/main/AuthorizationCodeTokenRequestContext) and send a request to the token endpoint using the context's method, body (`application/x-www-form-urlencoded`), and headers.

Use [`TokenRequestResult`](/reference/main/TokenRequestResult) to parse the returned JSON response. Get the error code with `errorCode()` or the access token with `refreshToken()`. These methods throw an error if the field does not exist in the object or if the value is not of the expected type.

```ts
import { AuthorizationCodeTokenRequestContext, TokenRequestResult } from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

// Validate state.

const context = new AuthorizationCodeTokenRequestContext(code);
context.setRedirectURI("https://my-app.com/login/callback");
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

`authenticateWithHTTPBasicAuth()` sets the client ID and password in the `Authorization` header, while `authenticateWithRequestBody()` sets client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```

If your provider only returns the refresh token sometimes, use `hasRefreshToken()` to check if the refresh token exists.

```ts
const accessToken = result.accessToken();
const accessTokenExpiresAt = result.accessTokenExpiresAt();
if (result.hasRefreshToken()) {
	const refreshToken = result.refreshToken();
	const refreshTokenExpiresAt = result.refreshTokenExpiresAt();
}
```
