---
title: "TokenRequestResult.refreshTokenExpiresAt()"
---

# TokenRequestResult.refreshTokenExpiresAt()

Gets the `refresh_token_expires_in` field value and returns the expiration `Date`. Throws an `Error` if the field is missing or the value isn't a number.

## Definition

```ts
function refreshTokenExpiresAt(): Date;
```
