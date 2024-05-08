---
title: "DeviceAuthorizationResponseBody"
---

# DeviceAuthorizationResponseBody

Represents the JSON-parsed successful response body from the device authorization endpoint, as defined in [RFC 8628 section 3.2](https://datatracker.ietf.org/doc/html/rfc8628#section-3.2). 

## Definition

```ts
interface DeviceAuthorizationResponseBody {
	device_code: string;
	user_code: string;
	verification_uri: string;
	expires_in: number;
	interval?: number;
	verification_uri_complete?: string;
}
```

### Properties

- `device_code`
- `user_code`
- `verification_uri`
- `expires_in`
- `interval`
- `verification_uri_complete`
