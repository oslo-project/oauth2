---
title: "RefreshRequestContext.appendScopes()"
---

# RefreshRequestContext.appendScopes()

Adds scopes to the `scope` parameter by appending them to existing ones. Use [`RefreshRequestContext.setScopes()`](/reference/main/RefreshRequestContext/setScopes) to replace existing ones.

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
