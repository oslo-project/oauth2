---
title: "DeviceAuthorizationRequestContext.addScopes()"
---

# DeviceAuthorizationRequestContext.addScopes()

Appends scopes to the `scope` parameter.

## Definition

```ts
function addScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
context.addScopes("profile", "email");
context.addScopes("admin");
```
