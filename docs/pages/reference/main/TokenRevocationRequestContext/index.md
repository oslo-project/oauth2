---
title: "TokenRevocationRequestContext"
---

# TokenRevocationRequestContext

Extends [`OAuth2RequestContext`](/reference/main/OAuth2RequestContext).

Represents a token revocation request as defined in [RFC 7009 §2.1](https://datatracker.ietf.org/doc/html/rfc7009#section-2.1).

## Constructor

```ts
function constructor(token: string): this;
```

## Parameters

- `token`

## Methods

- [`OAuth2RequestContext.authenticateWithHTTPBasicAuth()`](/reference/main/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`OAuth2RequestContext.authenticateWithRequestBody()`](/reference/main/OAuth2RequestContext/authenticateWithRequestBody)
- [`OAuth2RequestContext.setClientId()`](/reference/main/OAuth2RequestContext/setClientId)

- [`setTokenTypeHint()`](/reference/main/TokenRevocationRequestContext/setTokenTypeHint)

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
