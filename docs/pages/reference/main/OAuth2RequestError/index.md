---
title: "OAuth2RequestError"
---

# OAuth2RequestError

Extends the standard `Error`.

Represents an OAuth 2.0 request error as defined in [RFC 6749 §5.2](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2). See the RFC §for the endpoint and request type for a full list of error messages.

## Constructor

```ts
//$ OAuth2RequestContext=/reference/main/oauth2/OAuth2RequestContext
function constructor(
	message: string,
	request: Request,
	context: $$OAuth2RequestContext,
	responseHeaders: Headers,
	options?: {
		description?: string;
	}
);
```

- `message`: OAuth 2.0 error message
- `request`
- `context`
- `responseHeaders`
- `options`
  - `description`: OAuth 2.0 error description

## Methods

See [`Error` methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#instance_methods).

## Properties

See also [`Error` properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#instance_properties).

```ts
interface Properties {
	request: Request;
	context: OAuth2RequestContext;
	description: string | null;
	responseHeaders: Headers;
}
```

- `request`
- `context`
- `description`
- `responseHeaders`
