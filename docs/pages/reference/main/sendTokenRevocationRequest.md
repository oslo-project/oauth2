---
title: "sendTokenRevocationRequest()"
---

# sendTokenRevocationRequest()

Sends a token revocation request to the token revocation endpoint as defined in [RFC 7009 §2](https://datatracker.ietf.org/doc/html/rfc7009#section-2). Throws a [`OAuth2RequestError`](/reference/main/OAuth2RequestError) on error responses. Can also throw one of the exceptions from the global `fetch()`.

See [RFC 7009 §2.2.1](https://datatracker.ietf.org/doc/html/rfc7009#section-2.2.1) for a full list of error messages.

## Definition

```ts
//$ TokenRevocationRequestContext=/reference/main/TokenRevocationRequestContext
function sendTokenRevocationRequest(
	tokenEndpoint: string,
	context: $$TokenRevocationRequestContext,
	options?: {
		signal?: AbortSignal;
	}
): Promise<void>;
```

### Parameters

- `tokenEndpoint`
- `context`
- `options`
  - `signal`: `AbortSignal` for `fetch()`

## Example

```ts
import {
	TokenRevocationRequestContext,
	sendTokenRequest,
	OAuth2RequestError
} from "@oslojs/oauth2";

const context = new TokenRevocationRequestContext();
try {
	const tokens = await sendTokenRevocationRequest(endpoint, context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// oauth 2 error
	}
	// unknown error
}
```
