---
title: "Parsing responses"
---

# Parsing responses

## Access token and refresh token requests

Use `TokenRequestResult` for parsing access token and refresh token responses from the token endpoint. Methods like `accessToken()` will either return a value or throw an error if the field doesn't exist.

```ts
import { TokenRequestResult } from "@oslojs/oauth2";

const response = await fetch(accessTokenRequest);
const data = await response.json();
if (typeof data !== "object" || data === null) {
	throw new Error("Unexpected response body");
}
const result = new TokenRequestResult(data);
if (result.hasErrorCode()) {
	const error = result.errorCode();
	throw new Error(`Failed to revoke token: ${error}`);
}
try {
	const accessToken = result.accessToken();
	const accessTokenExpiresAt = result.accessTokenExpiresAt();
	const refreshToken = result.refreshToken();
} catch {
	throw new Error("Failed to parse response");
}
```

## Token revocation requests

Since the token revocation endpoint returns an empty response when successful, use `OAuthRequestResult` directly.

```ts
import { OAuthRequestResult } from "@oslojs/oauth2";

const response = await fetch(tokenRevocationRequest);
if (!response.ok) {
	const data = await response.json();
	if (typeof data !== "object" || data === null) {
		throw new Error("Unexpected response body");
	}
	const result = new OAuthRequestResult(data);
	if (!result.hasErrorCode()) {
		throw new Error("Unexpected response body");
	}
	const error = result.errorCode();
	throw new Error(`Failed to revoke token: ${error}`);
}
```

## Device authorization requests

Use `DeviceAuthorizationRequestResult` for parsing device authorization responses. Methods like `deviceCode()` will either return a value or throw an error if the field doesn't exist.

```ts
import { DeviceAuthorizationRequestResult } from "@oslojs/oauth2";

const response = await fetch(deviceAuthorizationRequest);
const data = await response.json();
if (typeof data !== "object" || data === null) {
	throw new Error("Unexpected response body");
}
const result = new DeviceAuthorizationRequestResult(data);
if (result.hasErrorCode()) {
	const error = result.errorCode();
	throw new Error(`Failed to revoke token: ${error}`);
}
try {
	const deviceCode = result.deviceCode();
	const userCode = result.userCode();
	const codesExpireIn = result.codesExpireIn();
} catch {
	throw new Error("Failed to parse response");
}
```
