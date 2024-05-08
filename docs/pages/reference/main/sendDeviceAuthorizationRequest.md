---
title: "sendDeviceAuthorizationRequest()"
---

# sendDeviceAuthorizationRequest()

Sends a device authorization request to the device authorization endpoint as defined in [RFC 8628 section 3.1](https://datatracker.ietf.org/doc/html/rfc8628#section-3.1). Returns the JSON-parsed response body on successful responses and throws a [`OAuth2RequestError`](/reference/main/OAuth2RequestError) on error responses. Can also throw one of the exceptions from the global `fetch()`.

See [RFC 8628 section 3.1](https://datatracker.ietf.org/doc/html/rfc8628#section-3.1) for a full list of error messages.

## Definition

```ts
//$ DeviceAuthorizationResponseBody=/reference/main/DeviceAuthorizationResponseBody
//$ DeviceAuthorizationRequestContext=/reference/main/DeviceAuthorizationRequestContext
function sendDeviceAuthorizationRequest<_ResponseBody extends $$DeviceAuthorizationResponseBody>(
	deviceAuthorizationEndpoint: string,
	context: $$DeviceAuthorizationRequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<_ResponseBody>;
```

### Parameters

- `deviceAuthorizationEndpoint`
- `context`
- `options`
  - `signal`: `AbortSignal` for `fetch()`

## Example

```ts
import {
	DeviceAuthorizationRequestContext,
	sendDeviceAuthorizationRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new DeviceAuthorizationRequestContext();
try {
	const tokens = await sendDeviceAuthorizationRequest(endpoint, context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
        // oauth 2 error
	}
    // unknown error
}
```
