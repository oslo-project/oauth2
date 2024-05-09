---
title: "DeviceAccessTokenRequestContext"
---

# DeviceAccessTokenRequestContext

Extends [`OAuth2RequestContext`](/reference/main/OAuth2RequestContext).

Represents a device access token request in the device authorization grant type as defined in [RFC 8628 §3.4](https://datatracker.ietf.org/doc/html/rfc8628#section-3.4).

On initialization:

- Sets `grant_type` parameter to `urn:ietf:params:oauth:grant-type:device_code`
- Sets `device_code` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(deviceCode: string): this;
```

### Parameters

- `deviceCode`

## Methods

- [`OAuth2RequestContext.authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`OAuth2RequestContext.authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`OAuth2RequestContext.setClientId()`](/reference/main/OAuth2RequestContext/setClientId)
- [`OAuth2RequestContext.toFetchRequest()`](/reference/main/OAuth2RequestContext/toFetchRequest)

## Properties

```ts
interface Properties {
	body: URLSearchParams;
	headers: Headers;
}
```

- `OAuth2RequestContext.body`
- `OAuth2RequestContext.headers`
