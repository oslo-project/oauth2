---
title: "AuthorizationCodeAuthorizationURL.setState()"
---

# AuthorizationCodeAuthorizationURL.setRedirectURI()

Sets the state to the URL (`state`). Use [`generateState()`](/reference/main/generateState) to generate the state.

## Definition

```ts
function setState(redirectURI: string): void;
```

### Parameters

- `redirectURI`

## Example

```ts
import { generateState } from "oslo/oauth2";

const state = generateState();
url.setState(state);
```
