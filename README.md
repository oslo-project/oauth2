# @oslojs/oauth2

**Documentation: https://oauth2.oslojs.dev**

A JavaScript client library for OAuth 2.0 by [Oslo](https://oslojs.dev).

Supports authorization code grant type, PKCE extension, refresh token grant type, token revocation, and device code grant type as specified in [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749), [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009), [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636), and [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628).

- Runtime-agnostic
- No third-party dependencies
- Fully typed

```ts
import { AuthorizationCodeAccessTokenRequestContext, TokenRequestResult } from "@oslojs/oauth2";

const context = new AuthorizationCodeAccessTokenRequestContext(code);
context.authenticateWithHTTPBasicAuth(clientId, clientSecret);
context.setRedirectURI("https://my-app.com/login/callback");

const body = new URLSearchParams();
for (const [key, value] of context.body.entries()) {
	body.set(key, value);
}
const response = await fetch("https://github.com/login/oauth/access_token", {
	method: context.method,
	body,
	headers: new Headers(context.headers)
});
// GitHub returns 200 even for errors
const data = await response.json();

const result = new TokenRequestResult(data);
if (result.hasErrorCode()) {
	const error = result.errorCode();
} else {
	const accessToken = result.accessToken();
	const accessTokenExpiresAt = result.accessTokenExpiresAt();
	const refreshToken = result.refreshToken();
}
```

> Implicit grant type and resource owner password credentials grant type are not supported as they are no longer recommended.

## Installation

```
npm i @oslojs/oauth2
```

## Prerequisites

This package requires the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). This is available in most modern runtimes, including Node.js 20+, Deno, Bun, and Cloudflare Workers. The major exception is Node.js 16 and 18. Make sure to polyfill it using `webcrypto`.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when executing files.

```
node --experimental-global-webcrypto index.js
```
