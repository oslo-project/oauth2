---
title: "DeviceAuthorizationRequestContext.appendScopes()"
---

# DeviceAuthorizationRequestContext.appendScopes()

Adds scopes to the `scope` parameter by appending them to existing ones. Use [`DeviceAuthorizationRequestContext.setScopes()`]() to replace existing ones.

## Definition

```ts
function appendScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
context.appendScopes("profile", "email");
context.appendScopes("admin");
```
