---
title: "AuthorizationCodeAuthorizationURL.setPlainCodeChallenge()"
---

# AuthorizationCodeAuthorizationURL.setPlainCodeChallenge()

Sets the `code_challenge` parameter and the `code_challenge_method` parameter. Use [`generateCodeVerifier()`](/reference/main/generateCodeVerifier) to generate the code verifier.

## Definition

```ts
function setPlainCodeChallenge(codeVerifier: string): void;
```

### Parameters

- `codeVerifier`

## Example

```ts
import { $$generateCodeVerifier } from "oslo/oauth2";

const codeVerifier = generateCodeVerifier();
url.setPlainCodeChallenge(codeVerifier);
```
