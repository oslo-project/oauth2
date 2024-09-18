---
title: "DeviceAuthorizationRequestResult"
---

# DeviceAuthorizationRequestResult

Extends [`OAuth2RequestResult`](/reference/main/OAuth2RequestResult).

Represents a JSON-parsed device authorization response body.

## Constructor

```ts
function constructor(body: object): this;
```

### Parameters

- `body`: JSON-parsed object.

## Methods

- [`OAuth2RequestResult.errorCode()`](/reference/main/OAuth2RequestResult/errorCode)
- [`OAuth2RequestResult.errorDescription()`](/reference/main/OAuth2RequestResult/errorDescription)
- [`OAuth2RequestResult.errorURI()`](/reference/main/OAuth2RequestResult/errorURI)
- [`OAuth2RequestResult.hasErrorCode()`](/reference/main/OAuth2RequestResult/hasErrorCode)
- [`OAuth2RequestResult.hasErrorDescription()`](/reference/main/OAuth2RequestResult/hasErrorDescription)
- [`OAuth2RequestResult.hasErrorURI()`](/reference/main/OAuth2RequestResult/hasErrorURI)
- [`OAuth2RequestResult.state()`](/reference/main/OAuth2RequestResult/state)
- [`DeviceAuthorizationRequestResult.codesExpireAt()`](/reference/main/DeviceAuthorizationRequestResult/codesExpireAt)
- [`DeviceAuthorizationRequestResult.codesExpireIn()`](/reference/main/DeviceAuthorizationRequestResult/codesExpireIn)
- [`DeviceAuthorizationRequestResult.deviceCode()`](/reference/main/DeviceAuthorizationRequestResult/deviceCode)
- [`DeviceAuthorizationRequestResult.intervalSeconds()`](/reference/main/DeviceAuthorizationRequestResult/intervalSeconds)
- [`DeviceAuthorizationRequestResult.userCode()`](/reference/main/DeviceAuthorizationRequestResult/userCode)
- [`DeviceAuthorizationRequestResult.verificationURI()`](/reference/main/DeviceAuthorizationRequestResult/verificationURI)

## Properties

```ts
interface Properties {
	body: object;
}
```

- `OAuth2RequestResult.body`
