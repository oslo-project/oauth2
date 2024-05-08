---
title: "AuthorizationCodeAuthorizationURL.appendScopes()"
---

# AuthorizationCodeAuthorizationURL.appendScopes()

Adds scopes to the `scope` parameter by appending them to existing ones. Use [`AuthorizationCodeAuthorizationURL.setScopes()`](/reference/main/AuthorizationCodeAuthorizationURL/setScopes) to replace existing ones.

## Definition

```ts
function appendScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
url.appendScopes("profile", "email");
url.appendScopes("openid");
```
