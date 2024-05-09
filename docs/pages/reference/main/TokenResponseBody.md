---
title: "TokenResponseBody"
---

# TokenResponseBody

Represents the JSON-parsed successful response body from the token endpoint, as defined in [RFC 6749 §4.2.2](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2.2).

## Definition

```ts
interface TokenResponseBody {
	access_token: string;
	token_type: string;
	expires_in?: number;
	refresh_token?: string;
	scope?: string;
}
```

### Properties

- `access_token`
- `token_type`
- `expires_in`
- `refresh_token`
- `scope`
