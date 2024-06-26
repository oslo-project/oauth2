---
title: "RefreshRequestContext"
---

# RefreshRequestContext

Extends [`OAuth2RequestContext`](/reference/main/OAuth2RequestContext).

Represents a refresh request as defined in [RFC 6749 §6](https://datatracker.ietf.org/doc/html/rfc6749#section-6).

On initialization:

- Sets `grant_type` parameter to `refresh_token`
- Sets `refresh_token` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(refreshToken: string): this;
```

### Parameters

- `refreshToken`

## Methods

- [`OAuth2RequestContext.authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`OAuth2RequestContext.authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`OAuth2RequestContext.setClientId()`](/reference/main/OAuth2RequestContext/setClientId)

- [`appendScopes()`](/reference/main/RefreshRequestContext/appendScopes)
- [`setScopes()`](/reference/main/RefreshRequestContext/setScopes)

## Properties

```ts
interface Properties {
	method: string;
	body: Map<string, string>;
	headers: Map<string, string>;
}
```

- `OAuth2RequestContext.method`
- `OAuth2RequestContext.body`
- `OAuth2RequestContext.headers`
