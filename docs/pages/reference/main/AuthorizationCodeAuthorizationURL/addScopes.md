---
title: "AuthorizationCodeAuthorizationURL.addScopes()"
---

# AuthorizationCodeAuthorizationURL.addScopes()

Appends scopes to the `scope` parameter.

## Definition

```ts
function addScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
url.addScopes("profile", "email");
url.addScopes("openid");
```
