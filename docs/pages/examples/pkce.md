---
title: "PKCE"
---

# PKCE

This extension is defined in [RFC 7639](hhttps://datatracker.ietf.org/doc/html/rfc7636). See the [Authorization code grant type](/examples/authorization-code) example page for the basic authorization code grant type.

## Authorization URL

Use [`generateCodeVerifier()`](/reference/main/generateCodeVerifier) to generate a new code verifier and set a code challenge with either [`setS256CodeChallenge()`](/reference/main/setS256CodeChallenge) or [`setPlainCodeChallenge()`](/reference/main/setPlainCodeChallenge). Make sure the code verifier is different on each request.

```ts
import { AuthorizationCodeAuthorizationURL, generateCodeVerifier } from "@oslojs/oauth2";

const codeVerifier = generateCodeVerifier();
const url = new AuthorizationCodeAuthorizationURL(tokenEndpoint, clientId);

url.setS256CodeChallenge(codeVerifier);
url.setPlainCodeChallenge(codeVerifier);

// Store code verifier alongside state.
```

## Access token request

Use `setCodeVerifier()` to set the `code_verifier` parameter.

```ts
import { AuthorizationCodeTokenRequestContext } from "@oslojs/oauth2";

const tokenEndpoint = "https://example.com/oauth2/token";

// Validate state.
// Get code verifier associated with the request.

const context = new AuthorizationCodeTokenRequestContext(code);
context.setCodeVerifier(codeVerifier);
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
```
