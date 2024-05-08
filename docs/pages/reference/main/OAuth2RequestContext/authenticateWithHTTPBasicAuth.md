---
title: "OAuth2Request.authenticateWithHTTPBasicAuth()"
---

# OAuth2Request.authenticateWithHTTPBasicAuth()

Authenticates the client with the HTTP basic auth scheme by using the client ID as the username and the client password/secret as the password, as defined in [RFC 6749 section 2.3.1](https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1).

## Definition

```ts
function authenticateWithHTTPBasicAuth(clientId: string, clientPassword: string): void;
```

### Parameters

- `clientId`
- `clientSecret`
