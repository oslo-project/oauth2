---
title: "DeviceAuthorizationRequestContext.setScopes()"
---

# DeviceAuthorizationRequestContext.setScopes()

Sets the `scope` parameter. Use [`DeviceAuthorizationRequestContext.appendScopes()`](/reference/main/DeviceAuthorizationRequestContext/appendScopes) to append to existing scopes.

## Definition

```ts
function setScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
context.appendScopes("profile", "email");
context.appendScopes("profile"); // completely replaces the existing "profile", "email"
```
