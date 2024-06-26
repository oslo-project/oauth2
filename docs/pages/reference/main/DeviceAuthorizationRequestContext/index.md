---
title: "DeviceAuthorizationRequestContext"
---

# DeviceAuthorizationRequestContext

Extends [`OAuth2RequestContext`](/reference/main/OAuth2RequestContext).

Represents a device authorization request in the device authorization grant type as defined in [RFC 8628 §3.1](https://datatracker.ietf.org/doc/html/rfc8628#section-3.1).

On initialization:

- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(): this;
```

## Methods

- [`OAuth2RequestContext.authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`OAuth2RequestContext.authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`OAuth2RequestContext.setClientId()`](/reference/main/OAuth2RequestContext/setClientId)

- [`appendScopes()`](/reference/main/DeviceAuthorizationRequestContext/appendScopes)
- [`setScopes()`](/reference/main/DeviceAuthorizationRequestContext/setScopes)

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
