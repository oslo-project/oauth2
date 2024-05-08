---
title: "OAuth2RequestContext.authenticateWithRequestBody()"
---

# OAuth2RequestContext.authenticateWithRequestBody()

Authenticates the client by setting the `client_id` and `client_secret` parameter, as defined in [RFC 6749 section 2.3.1](https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1).

## Definition

```ts
function authenticateWithRequestBody(clientId: string, clientSecret: string): void;
```

### Parameters

- `clientId`
- `clientSecret`
