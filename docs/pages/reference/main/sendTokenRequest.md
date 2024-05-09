---
title: "sendTokenRequest()"
---

# sendTokenRequest()

Sends a request to the token endpoint as defined in [RFC 6749 §3.2](https://datatracker.ietf.org/doc/html/rfc6749#section-3.2). Returns the JSON-parsed response body on successful responses and throws a [`OAuth2RequestError`](/reference/main/OAuth2RequestError) on error responses. Can also throw one of the exceptions from the global `fetch()`.

See [RFC 6749 §4.1.2.1](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1) for a full list of error messages.

## Definition

```ts
//$ TokenResponseBody=/reference/main/TokenResponseBody
//$ OAuth2RequestContext=/reference/main/OAuth2RequestContext
function sendTokenRequest<_ResponseBody extends $$TokenResponseBody>(
	tokenEndpoint: string,
	context: $$OAuth2RequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<_ResponseBody>;
```

### Parameters

- `tokenEndpoint`
- `context`: [`AuthorizationCodeAccessTokenRequestContext`](/reference/main/AuthorizationCodeAccessTokenRequestContext), [`DeviceAccessTokenRequestContext`](/reference/main/DeviceAccessTokenRequestContext), or [`RefreshRequestContext`](/reference/main/RefreshRequestContext).
- `options`
  - `signal`: `AbortSignal` for `fetch()`

## Example

```ts
import {
	AuthorizationCodeAccessTokenRequestContext,
	sendTokenRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new AuthorizationCodeAccessTokenRequestContext();
try {
	const tokens = await sendTokenRequest(endpoint, context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// oauth 2 error
	}
	// unknown error
}
```
