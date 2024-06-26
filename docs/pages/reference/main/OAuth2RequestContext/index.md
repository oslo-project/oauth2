---
title: "OAuth2RequestContext"
---

# OAuth2RequestContext

Represents a OAuth 2.0 POST request. On initialization:

- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(method: string): this;
```

### Parameters

- `method`

## Methods

- [`authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`setClientId()`](/reference/main/OAuth2RequestContext/setClientId)

## Properties

```ts
interface Properties {
	method: string;
	body: Map<string, string>;
	headers: Map<string, string>;
}
```

- `method`
- `body`
- `headers`
