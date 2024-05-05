# @oslojs/oauth2

A runtime-agnostic TypeScript library for OAuth 2.0. Supports authorization code grant type, PKCE extension, refresh token grant type, token revocation, and device code grant type requests based on [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749), [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009), [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636), and [RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628). Implicit grant type and resource owner password credentials grant type are not supported as they are no longer recommended.

```
npm i @oslojs/oauth2
```

## Prerequisites

This package requires the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) and `AbortSignal.timeout()`. The Web Crypto API is available in most modern runtimes, including Node.js 20+, Deno, Bun, and Cloudflare Workers. The big exception is Node.js 16 and 18. Make sure to polyfill it using `webcrypto`.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when executing files.

```
node --experimental-global-webcrypto index.js
```

## Examples

### Authorization code grant type

```ts
import { AuthorizationCodeClient } from "@oslojs/oauth2";

const client = new AuthorizationCodeClient(clientId, authorizationEndpoint, tokenEndpoint, {
	// optional
	redirectURI: "https://example.com/login/callback"
});
```

```ts
import { generateState } from "@oslojs/oauth2";

const state = generateState();

const url = client.createAuthorizationURL();
url.setState(state);
url.appendScopes("profile", "email");
```

```ts
const context = client.createTokenRequestContext(code);
context.authenticateWithHTTPBasicAuth(clientSecret);
const tokens = await client.sendTokenRequest(context);
```

### Authorization code grant type with PKCE extension

```ts
import { AuthorizationCodeClient } from "@oslojs/oauth2";

const client = new AuthorizationCodeClient(clientId, authorizationEndpoint, tokenEndpoint, {
	// optional
	redirectURI: "https://example.com/login/callback"
});
```

```ts
import { generateState, generateCodeVerifier } from "@oslojs/oauth2";

const state = generateState();
const codeVerifier = generateCodeVerifier();

const url = client.createAuthorizationURL();
url.setState(state);
url.setS256CodeChallenge(codeVerifier);
url.appendScopes("profile", "email");
```

```ts
import { OAuth2RequestError } from "@oslojs/oauth2";

const context = client.createTokenRequestContext(code);
context.authenticateWithHTTPBasicAuth(clientSecret);
context.setCodeVerifier(codeVerifier);
try {
	const tokens = await client.sendTokenRequest(context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// handle error
	}
	// fetch() error
}
```

### Refresh access tokens

```ts
import { RefreshTokenClient } from "@oslojs/oauth2";

const client = new RefreshTokenClient(clientId, tokenEndpoint);
```

```ts
import { OAuth2RequestError } from "@oslojs/oauth2";

const context = client.createTokenRequestContext(refreshToken);
context.authenticateWithHTTPBasicAuth(clientSecret);
try {
	const tokens = await client.sendTokenRequest();
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// handle error
	}
	// fetch() error
}
```

### Token revocation

```ts
import { TokenRevocationClient } from "@oslojs/oauth2";

const client = new TokenRevocationClient(clientId, tokenRevocationEndpoint);
```

```ts
import { OAuth2RequestError } from "@oslojs/oauth2";

const context = client.createAccessTokenRevocationRequestContext(accessToken);
const context = client.createRefreshTokenRevocationRequestContext(refreshToken);
context.authenticateWithHTTPBasicAuth(clientSecret);
try {
	const tokens = await client.sendTokenRequest();
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// handle error
	}
	// fetch() error
}
```

### Device code grant type

```ts
import { DeviceCodeClient } from "@oslojs/oauth2";

const client = new DeviceCodeClient(clientId, authorizationEndpoint, tokenEndpoint);
```

```ts
import { OAuth2RequestError } from "@oslojs/oauth2";

const context = client.createAuthorizationRequestContext();
try {
	const result = await client.sendAuthorizationRequest(context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// handle error
	}
	// fetch() error
}
```

```ts
import { OAuth2RequestError } from "@oslojs/oauth2";

const context = client.createTokenRequestContext(deviceCode);
context.authenticateWithHTTPBasicAuth(clientSecret);
try {
	const result = await client.sendTokenRequest(context, {
        // optional
		timeoutInSeconds: 30
	});
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// handle error
		// resend request until successful
	}
	// fetch() error
	// if timed-out, wait few more seconds
}
```
