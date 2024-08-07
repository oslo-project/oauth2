---
title: "TokenRequestResult"
---

# TokenRequestResult

Extends [`OAuth2RequestResult`](/reference/main/OAuth2RequestResult).

Represents a JSON-parsed token response body for authorization code access token request, device authorization access token request, and refresh token request.

## Constructor

```ts
function constructor(body: object): this;
```

### Parameters

- `body`: `JSON.parsed()`-ed object.

## Methods

- [`OAuth2RequestResult.errorCode()`](/reference/main/OAuth2RequestResult/errorCode)
- [`OAuth2RequestResult.errorDescription()`](/reference/main/OAuth2RequestResult/errorDescription)
- [`OAuth2RequestResult.errorURI()`](/reference/main/OAuth2RequestResult/errorURI)
- [`OAuth2RequestResult.hasErrorCode()`](/reference/main/OAuth2RequestResult/hasErrorCode)
- [`OAuth2RequestResult.hasErrorDescription()`](/reference/main/OAuth2RequestResult/hasErrorDescription)
- [`OAuth2RequestResult.hasErrorURI()`](/reference/main/OAuth2RequestResult/hasErrorURI)
- [`OAuth2RequestResult.state()`](/reference/main/OAuth2RequestResult/state)

- [`TokenRequestResult.accessToken()`](/reference/main/TokenRequestResult/accessToken)
- [`TokenRequestResult.accessTokenExpiresAt()`](/reference/main/TokenRequestResult/accessTokenExpiresAt)
- [`TokenRequestResult.accessTokenExpiresInSeconds()`](/reference/main/TokenRequestResult/accessTokenExpiresInSeconds)
- [`TokenRequestResult.hasRefreshToken()`](/reference/main/TokenRequestResult/hasRefreshToken)
- [`TokenRequestResult.hasScopes()`](/reference/main/TokenRequestResult/hasScopes)
- [`TokenRequestResult.refreshToken()`](/reference/main/TokenRequestResult/refreshToken)
- [`TokenRequestResult.scopes()`](/reference/main/TokenRequestResult/scopes)
- [`TokenRequestResult.tokenType()`](/reference/main/TokenRequestResult/tokenType)

## Properties

```ts
interface Properties {
	body: object;
}
```

- `OAuth2RequestResult.body`
