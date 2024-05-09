---
title: "AuthorizationCodeAuthorizationURL"
---

# AuthorizationCodeAuthorizationURL

Extends the web standard [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

Represents an authorization request URL in the authorization code grant type, as defined in [RFC 6749 §4.1.1](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1).

## Constructor

```ts
function constructor(authorizationEndpoint: string, clientId: string): this;
```

### Parameters

- `authorizationEndpoint`
- `clientId`

## Methods

See also [`URL` methods](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#instance_methods).

- [`appendScopes()`](/reference/main/AuthorizationCodeAuthorizationURL/appendScopes)
- [`setPlainCodeChallenge()`](/reference/main/AuthorizationCodeAuthorizationURL/setPlainCodeChallenge)
- [`setRedirectURI()`](/reference/main/AuthorizationCodeAuthorizationURL/setRedirectURI)
- [`setS256CodeChallenge()`](/reference/main/AuthorizationCodeAuthorizationURL/setS256CodeChallenge)
- [`setScopes()`](/reference/main/AuthorizationCodeAuthorizationURL/setScopes)
- [`setState()`](/reference/main/AuthorizationCodeAuthorizationURL/setState)

## Properties

See [`URL` properties](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#instance_properties).
