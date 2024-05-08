---
title: "AuthorizationCodeAuthorizationURL.setScopes()"
---

# AuthorizationCodeAuthorizationURL.setScopes()

Sets the `scope` parameter. Use [`AuthorizationCodeAuthorizationURL.appendScopes()`]() to append to existing scopes.

## Definition

```ts
function setScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
url.appendScopes("profile", "email");
url.appendScopes("openid"); // completely replaces the existing "profile", "email"
```
