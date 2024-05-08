---
title: "AuthorizationAccessTokenRequestContext"
---

# AuthorizationAccessTokenRequestContext

Extends [`OAuth2RequestContext`](/reference/main/OAuth2RequestContext).

Represents an authorization request in the authorization code grant type as defined in [RFC 6749 section 4.1.3](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3), with support for PKCE as as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636).

On initialization:

- Sets `grant_type` parameter to `authorization_code`
- Sets `code` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(authorizationEndpoint: string): this;
```

### Parameters

- `authorizationEndpoint`

## Methods

- [`OAuth2RequestContext.authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`OAuth2RequestContext.authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`OAuth2RequestContext.setClientId()`](/reference/main/OAuth2RequestContext/setClientId)
- [`OAuth2RequestContext.toFetchRequest()`](/reference/main/OAuth2RequestContext/toFetchRequest)
- [`setCodeVerifier()`](/reference/main/AuthorizationAccessTokenRequestContext/setCodeVerifier)
- [`setRedirectURI()`](/reference/main/AuthorizationAccessTokenRequestContext/setRedirectURI)

## Properties

```ts
interface Properties {
	body: URLSearchParams;
	headers: Headers;
}
```

- `OAuth2RequestContext.body`
- `OAuth2RequestContext.headers`
