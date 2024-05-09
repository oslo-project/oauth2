---
title: "Device authorization grant type"
---

# Device authorization grant type

This grant type is defined in [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628).

## Device authorization

Create a new [`DeviceAuthorizationRequestContext`](/reference/main/DeviceAuthorizationRequestContext) and send an access token request to the authorization endpoint with [`sendDeviceAuthorizationRequest()`](/reference/main/sendDeviceAuthorizationRequest). This throws an [`OAuth2RequestError`](/reference/main/OAuth2RequestError) when the endpoint returns a known OAuth 2.0 error response.

```ts
import {
	DeviceAuthorizationRequestContext,
	sendDeviceAuthorizationRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new DeviceAuthorizationRequestContext();
context.authenticateWithHTTPBasicAuth(clientId, clientPassword);
context.setScopes("profile", "email");

try {
	const result = await sendDeviceAuthorizationRequest(tokenEndpoint, context);
	const deviceCode = tokens.device_code;
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

Use `appendScopes()` to append new scopes to existing ones.

```ts
url.appendScopes("user");
url.appendScopes("profile");
```

## Validate device code

Create a new [`DeviceAccessTokenRequestContext`](/reference/main/DeviceAccessTokenRequestContext) and send an access token request to the token endpoint with [`sendTokenRequest()`](/reference/main/sendTokenRequest). The request should be sent repeatedly on a set interval until the endpoint returns a successful response or the code expires. The function throws an [`OAuth2RequestError`](/reference/main/OAuth2RequestError) when the endpoint returns a known OAuth 2.0 error response.

The authentication methods for `DeviceAccessTokenRequestContext` are the same as `DeviceAuthorizationRequestContext` mentioned above.

```ts
import {
	DeviceAccessTokenRequestContext,
	sendTokenRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new DeviceAccessTokenRequestContext(deviceCode);
context.authenticateWithHTTPBasicAuth(clientId, clientPassword);

try {
	// Long-polling with regular interval
	const result = await sendTokenRequest(tokenEndpoint, context);
	const deviceCode = tokens.device_code;
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// known error
		const message = e.message;
	}
	// unknown error
}
```
