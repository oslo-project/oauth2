---
title: "Device authorization grant type"
---

# Device authorization grant type

This grant type is defined in [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628).

## Device authorization

Create a new [`DeviceAuthorizationRequestContext`](/reference/main/DeviceAuthorizationRequestContext) and send a request to the token endpoint using the context's method, body (`application/x-www-form-urlencoded`), and headers.

Use [`DeviceAuthorizationRequestResult`](/reference/main/TokenRequestResult) to parse the returned JSON response. Get the error code with `errorCode()` or the device code with `deviceCode()`. These methods throw an error if the field does not exist in the object or if the value is not of the expected type.

```ts
import {
	DeviceAuthorizationRequestContext,
	DeviceAuthorizationRequestResult
} from "@oslojs/oauth2";

const context = new DeviceAuthorizationRequestContext();
context.authenticateWithHTTPBasicAuth(clientId, clientPassword);
context.setScopes("profile", "email");

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
// Some providers return 200 even for errors
if (result.hasErrorCode()) {
	const error = result.errorCode();
} else {
	const deviceCode = result.deviceCode();
	const userCode = result.userCode();
	const verificationURI = result.verificationURI();
	const interval = result.intervalSeconds();
	const expiresAt = result.codesExpireAt();
}
```

`authenticateWithHTTPBasicAuth()` sets the client ID and password in the `Authorization` header, while `authenticateWithRequestBody()` sets client ID and secret as the `client_id` and `client_secret` parameter. If the provider didn't provide a client credential, use `setClientId()` to just set the `client_id` parameter.

```ts
context.authenticateWithRequestBody(clientId, clientSecret);

context.setClientId(clientId);
```

Use `appendScopes()` instead of `setScopes()` to append new scopes to existing ones.

```ts
url.appendScopes("user");
url.appendScopes("profile");
```

## Validate device code

Create a new [`DeviceAuthorizationTokenRequestContext`](/reference/main/DeviceAuthorizationTokenRequestContext) and send a request to the token endpoint using the context's method, body (`application/x-www-form-urlencoded`), and headers.

Use [`TokenRequestResult`](/reference/main/TokenRequestResult) to parse the returned JSON response. Get the error code with `errorCode()` or the access token with `refreshToken()`. These methods throw an error if the field does not exist in the object or if the value is not of the expected type.

The authentication methods for `DeviceAuthorizationTokenRequestContext` are the same as `DeviceAuthorizationRequestContext` mentioned above.

```ts
import { DeviceAuthorizationTokenRequestContext, TokenRequestResult } from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

// Validate state.

const context = new DeviceAuthorizationTokenRequestContext(code);
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
// Some providers return 200 even for errors
if (result.hasErrorCode()) {
	const error = result.errorCode();
} else {
	const accessToken = result.accessToken();
	const accessTokenExpiresAt = result.accessTokenExpiresAt();
	const refreshToken = result.refreshToken();
	const refreshTokenExpiresAt = result.refreshTokenExpiresAt();
}
```
