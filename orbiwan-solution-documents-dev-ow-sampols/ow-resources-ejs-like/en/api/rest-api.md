---
layout: page
title: Rest API
menu: api
lang: en
permalink: "rest.html"
sub_pages: false
page_type: "sub-page"
---
# REST API

<!-- {:.ow-heading-class} -->
## Purpose

This document specifies the interface between the OrbiWise sever and external applications.

<!-- {:.ow-heading-class} -->
## Status of document

<!--This version 2.0 of the UI interface specification is covering OrbiWAN release 6.0-->

Please note that for all returned message JSON objects there may be additional fields to those documented in this document. An application should never rely on any field not documented in this document as these additional fields may change or disappear without prior warning from one release to the next.

## Scope
## Reference

[1]	LoRaWAN™ V1.0 \
[2]	LoRaWAN™ Backend Interfaces Specification, V1.0 \
[3]	Guidelines for 64-bit Global Identifier (EUI-64) General,<https://standards.ieee.org/develop/regauth/tut/eui64.pdf"> \
[4]	Base64 encoding,  <https://tools.ietf.org/html/rfc4648>

## Definitions, Acronyms, and Abbreviations

<!--UI	Data Access Sub-System \ -->
<!-- RNSS [Radio Network Sub-System] \ -->
APP  [Application] \
CRUD [Create Read Update Delete Operation] \
JSON [JavaScript Object Notation. Lightweight data-interchange format] \
Base64 [Encoding scheme]

# Interface overview

This document details the interface seen by the user applications towards the OrbiWAN UI . The interface enables the user to manage the devices on the network as well as the operator to register users.

Data send to and received from the devices are cached in persistent temporary storage inside the RNSS ensuring that there are no real-time constraints on the applications to access the data.

Messages are REST based following the “CRUD” principle with transport over HTTPS. Authentication is done using a bearer token (as per OAuth2 standard) or via the Basic authentication scheme of HTTP(S). 

*Note:* Basic authentication may be disabled and only token authentication is allowed.

- Basic authentication uses the standard header field “Authorization” with the argument string: “Basic [username:password]base64 encoded”. 
- For OAuth2 a token must first be requested using the OAuth2 API (see @sec:oauth2).
- Data exchanged in the message body is JSON format and will have “Content-Type HTTP header directives with “application/json”. All messages are HTTP v1.1 compliant.


 <!-- ![Stack overview](stack-overview.png){#fig:stackOverview} -->

The Application<->UI interface is a host/client <-> host/client interface, meaning that both sides can initiate requests and receive requests. After initial start-up, the UI will act as host only and the applications will connect to the UI as clients only. In this “pull-mode” each application must initiate all communication and must poll (GET) the UI for updates.

To avoid this polling an application must register its own host interface on the UI after which the UI will be able to act as a client too and make unsolicited PUT/POST to the application with incoming payload and update of status. This is “push-mode”.
 
Push-mode and Pull-mode co-exist simultaneously, but once push-mode is started, only house-keeping operations will be performed in pull-mode and all “normal” data flow is performed in push-mode for the application that registered its host interface.


# Message Exchange Description

Several classes of API commands are available, the most important being; Device Management, Device Payloads commands, profile definitions, account management and push-notification management. A short summary of the commands is shown below. All devices are identified by their DevEUI (Device Extended Unique Identifier), hence for any device to be registered to the network it must have valid DevEUI. Devices are always registered uniquely to one account.


### Device management (add, remove and get status):

Get a list of registered devices and their status or status for just one device. Returns basic registration status and downlink FCNT.

    GET /rest/nodes
    GET /rest/nodes/{DevEUI}


Add a new device to OrbiWAN.

    POST /rest/nodes


Remove a device from OrbiWAN

    DELETE /rest/nodes/{DevEUI}


Request (PUT) a status update (i.e. LoraWAN DevStatusReq MAC procedure) from the device, and read (GET) the device MAC status. The status includes battery level and link margin of the device.

    PUT /rest/nodes/{DevEUI}/status
    GET /rest/nodes/{DevEUI}/status

### Payload management

All payloads sent over LoRaWAN are encrypted and must be encrypted/decrypted by the either the UI server or the applications.

Get all the received uplink payloads or just the latest. The payload data returned is by default base64 encoded. Each payload is returned with various additional parameters such as receive timestamp, RSSI, SNR, SF and a unique ID that is used to delete the particular payload when read.

    GET /rest/nodes/{DevEUI}/payloads/ul
    GET /rest/nodes/{DevEUI}/payloads/ul/latest


Delete uplink payload from the temporary storage. If payloads are not deleted after reading, next read will return the same payload. The ID is the ID returned with the payloads.

    DELETE /rest/nodes/{DevEUI}/payloads/ul/{id}

Send a (encrypted) payload (downlink) to a device. The port and FCNT is provided as part of the URL. The payload must be given directly as base64 encoded data in the HTTP message body:

    POST /rest/nodes/{DevEUI}/payloads/dl?fcnt={xx}&port={yy}

port is the message port for the payload , see [1]. fcnt is the downlink frame counter to be used for the message. In case the internal Join Server in OrbiWAN is used or the AppSKey for the device has been included in the device registration, OrbiWAN can automatically derive the FCNT, hence the FCNT parameter is optional in these cases, and if included the FCNT will be forced to value in the message. 

The FCNT can be read from the UI API using the following command: 

    GET /rest/nodes/{DevEUI}

This return (with other parameters) the last used FCNT. The next FCNT to use for the downlink is calculated simply by adding +1 to the returned FCNT. Alternatively, an application can keep track of the last used FCNT by register for the downlink push event.

Note, as OrbiWAN might send messages to the devices with only LoRa MAC commands, the applications have to use one of the two above methods to keep track of the latest used FCNT.

Get status of outstanding downlink message. The ID is the ID returned in the send (POST) command.

    GET /rest/nodes/{DevEUI}/payloads/dl/{id}


### Push mode call-back messages

To avoid polling for new payloads, status for on-going downlink and device status, the applications can register to receive pushed callback messages when any of the above events happens. Callback message are live messages that are sent immediately when the event happens. 

Two push schemes are defined :

* No retry: If a push delivery fails, it will not be repeated but a payload will be stored in the temporary payload storage. If there are payloads already stored in the persistent temporary storage before the push mode is started, the application must manually read out these messages using the pull interface. Already existing payloads and status are not pushed.
* With retry: continuously push any undelivered payloads to flush the persistent temporary payload storage.



When a new uplink payload has arrived the Server will send the payload in a push message:

    POST /rest/callback/payloads/ul

The message body will contain a JSON object with the device DevEUI, the actual payload, timestamp and all needed parameters to decrypt it.

In the downlink direction once a downlink message transaction has completed and the delivery status is known (i.e. the payload we received or not) the Server will send:

    PUT /rest/callback/payloads/dl

The message body contains a JSON object with the device DevEUI, ID of the downlink payload and status of the delivery.

When there is any update on the device (such as an update on the FCNT, change in registration state, etc.) the Server will send:

    PUT /rest/callback/nodeinfo

The message body contains a JSON object with the device information.

When a device has updated it device status with battery status and link margin (either requested from the application or unsolicited by the OrbiWAN) the Server will send:

    PUT /rest/callback/status

The message body contains a JSON object with the device status.

When a device attempts to join the network with the JOIN procedure, the UI will send the message to the user application with the join request for the application to authenticate, generate keys, and encrypt the join accept message:

	PUT /rest/callback/join

In case the internal Join Server is used, the application will just be notified that a device has joined.

The user application can register for push call-back message by sending a registration request to the Server:

	PUT /rest/pushmode/start

The message body must contain a JSON object with the URL of the user application host interface where the UI will send the push callback messages.

When the user’s application no longer want to receive push (e.g. if the application server is being restarted) it must send to the Server:

    PUT /rest/pushmode/stop


<!-- ### user registration messages

Get a list of registered users:

	GET /rest/users

Add a new user. A JSON payload with credentials and rights of the user must be provided in the message body.

    POST /rest/users

Delete a user and all users and devices associated with the user

    DELETE /rest/users/user-id
--> 
### User registration messages

Get a list of users for a user:

    GET /rest/users

Add a new user to a user. A JSON payload with credentials and rights of the user is provided to the message body.

    POST /rest/users

Delete a user and all associated devices

    DELETE /rest/users/user-id


## Formats

### Query fields and strict option

Most of the REST API supported by the UI also support a number of optional query fields. The query field is placed on the URL after the path with the ‘?’ (question mark) and separated (when more than one is specified) by the ‘&’ (ampersand).

One query option that is supported by all APIs is the strict option, e.g.:

	GET /rest/nodes?strict=true&data_format=hex

The strict field force the Server to perform strict parameters checking and will cause a failure on the API if any unknown parameter is provided or if any parameter is missing and that is assigned “hidden” default values.
The strict field should NEVER be used in production code, only during development. The Server API continues to evolve and will continue to introduce new features in a backward compatible way. This often means that default values will be assigned to new fields that are added to the API.

An application should ensure to provide all parameters and not rely on “hidden” default values; hence the strict field option can be used during development to check that all fields have been correctly provided.

### HEX Notation

All keys, EUIs and the DevAddr(*) are always represented in HEX notation in all JSON message and in the URL path (in the case of the DevEUI).

The ordering of bytes follows the recommendations from the LoRaWAN specification [1].

Three notations are supported (with varies lengths for either DevAddr, DevEUI/AppEUI and keys):

	"AAbbCCDD00112233"
	"0xAABBccDD00112233"
	"AA-BB-CC-dd-00-11-22-33"

All HEX notations are case insensitive.

Note, for DevAddr it is also possible to specify the address and a decimal number representation of the HEX value. In JSON notation the hex values are represented as strings with quotes (“”) whereas the decimal number is directly represented as a number (i.e. without quotes).

###	Payload data format

All payload data provided in either JSON or directly in the message body for a downlink or uplink payload message are always encoded in standard Base64 or HEX representation. Each REST API that take or return payload data accept the ‘data_format’ query field that is used to indicate if the data should be represented in Base64 or HEX. If the data_format is not specified, the default is Base64.

The Base64 encoding scheme, encodes binary data into an ASCII text string with each character representing 6-bit of the binary message. This allows inserting the binary payload into a standard string in the JSON message. The Base64 standard encoding scheme is defined in [4].

An example of using the data_format field is:

    GET /rest/nodes?data_format=hex

or

    GET /rest/nodes?data_format=base64

### Error format {#sec:errorFormat}

All REST commands always return a status code. Typically 200 for success and some 4xx error code on failure.

In case of error, an error text will often accompany the status code to better explain the precise issue that cause the command to fail. This error text is send as a plain text with the Content-Type field in the http header set to "text/plain". A typical error message may look like this:

    "cannot find device"

The Server also support returning error code in JSON for easier machine parsing. This format is in accordance to RFC 7807. To receive JSON error codes, the client must set the Accept header field to "application/problem+json" to indicate to the Server that it expect and understand RFC 7807 messages. The Server will in this case return the error description in JSON and with a Content-Type set to "application/problem+json".

A typical error with JSON may look like this:

```JSON
{
    "type": "about:blank",
    "title": "cannot find device",
    "detail": "cannot find device '1234567812345678'",
    "status": 404
}
```

Additional fields may be present in JSON object. Please refer to the description of each API.


## OAuth Authentication {#sec:oauth2}

The Server API can be used with the basic authentication scheme or the using OAuth2 authentication using a token. The following sections describes how to use the tokens.

### Obtain an access token

To obtain a pair of tokens (access and refresh) the following URL is used.

```
URL: https://UI-host[:port] /rest/oauth2/token?grant_type=password
                               &client_id={clientid}&username={userid}&password={passwd}

Method: POST
Direction: application->Server
```

**Note:** While it is possible to make the request directly as query arguments on the URL, this is not safe as URL request may be logged, the request should therefore always be made with the Content-Type set to "*application/x-www-form-urlencoded*" and the parameters provided in the body of the message.

Example :
```
POST https://{host}/rest/oauth2/token?grant_type=password&client_id=my-client&username=my-user&password=my-password
```

```JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkYXNzdWkiLCJleHBpcnlfdGltZSI6MTU2NTc0MDU0NiwicmlnaHRzX21hc2siOjE2Nzc3MjE1LCJ0b2tlbl9pZCI6IjM2MDQxNWZjLTI1OTgtNDkzOC04MjZiLWUwNTEwODgyZDk5YSIsInVzZXJpZCI6ImN1c3QxLXRlbmFudDEiLCJpYXQiOjE1NjU2OTczNDYsImV4cCI6MTU2NTc0MDU0Nn0.KpXLM29Ld4_ztmW2h-WA3Jxy6BDTowyVgr8UBH70ZHE",
    "expires_in": 43200,
    "jti": "360415fc-2598-4938-826b-e0510882d99a",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkYXNzdWkiLCJleHBpcnlfdGltZSI6MTU2NTc0MDU0NiwicmlnaHRzX21hc2siOjE2Nzc3MjE1LCJ0b2tlbl9pZCI6IjM2MDQxNWZjLTI1OTgtNDkzOC04MjZiLWUwNTEwODgyZDk5YSIsInVzZXJpZCI6ImN1c3QxLXRlbmFudDEiLCJpYXQiOjE1NjU2OTczNDZ9.2kp5FeLTGtQy_zBeU20QZyL3EKvZoqUoN2Y6laCOyXs",
    "scope": "openid",
    "token_type": "bearer"
}
```

The *access_token* can subsequently be used to authenticate all other Server API requests. The refresh_token can only be used to renew the access_token and cannot for API authentication. The access token will expire after a time and a new token must be requested using the refresh_token (see @sec:refreshToken)

Return values:

| Status value | Meaning      | Description                                                                        |
| ------------ | ------------ | ---------------------------------------------------------------------------------- |
| 200          | OK           | JSON with tokens returned in body                                                  |
| 400          | Bad request  | Something is wrong or missing in the request                                       |
| 401          | Unauthorized | The username/password used in the authentication scheme is invalid or not present. |


### Renew a token {#sec:refreshToken}

The access token returned will expire after a period of time and will need to be renewed. On the initial request to get the token, the refresh_token can be used to request a new pair of token.

```
URL: https://UI-host[:port] /rest/oauth2/token?grant_type=refresh_token&refresh_token={token}

Method: POST
Direction: Application->Server
```

Example:
```
POST UI-hostname/rest/oauth2/token?grant_type=refresh_token&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkYXNzdWkiLCJleHBpcnlfdGltZSI6MTU1NzUyNjMxNiwicmlnaHRzX21hc2siOjE2Nzc3MjE1LCJ0b2tlbl9pZCI6IjFhMTJjYzhlLTVmZmQtNDgzZC05YmNkLTUyMmNkMjU5MTJlOCIsInVzZXJpZCI6Im9yYml3aXNlIiwiaWF0IjoxNTU3NDgzMTE2fQ.IMVu18Bt1cOunIuisJ4hTal7hPyAiRx-TwhBRqvh_m8
```

Returned message body:

```JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkYXNzdWkiLCJleHBpcnlfdGltZSI6MTU2NTc0MDU0NiwicmlnaHRzX21hc2siOjE2Nzc3MjE1LCJ0b2tlbl9pZCI6IjM2MDQxNWZjLTI1OTgtNDkzOC04MjZiLWUwNTEwODgyZDk5YSIsInVzZXJpZCI6ImN1c3QxLXRlbmFudDEiLCJpYXQiOjE1NjU2OTczNDYsImV4cCI6MTU2NTc0MDU0Nn0.KpXLM29Ld4_ztmW2h-WA3Jxy6BDTowyVgr8UBH70ZHE",
    "expires_in": 43200,
    "jti": "360415fc-2598-4938-826b-e0510882d99a",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkYXNzdWkiLCJleHBpcnlfdGltZSI6MTU2NTc0MDU0NiwicmlnaHRzX21hc2siOjE2Nzc3MjE1LCJ0b2tlbl9pZCI6IjM2MDQxNWZjLTI1OTgtNDkzOC04MjZiLWUwNTEwODgyZDk5YSIsInVzZXJpZCI6ImN1c3QxLXRlbmFudDEiLCJpYXQiOjE1NjU2OTczNDZ9.2kp5FeLTGtQy_zBeU20QZyL3EKvZoqUoN2Y6laCOyXs",
    "scope": "openid",
    "token_type": "bearer"
}
```

| Status value | Meaning      | Description                                  |
| ------------ | ------------ | -------------------------------------------- |
| 200          | OK           | JSON with tokens returned in body            |
| 400          | Bad request  | Something is wrong or missing in the request |
| 401          | Unauthorized | the refresh_token is expired or not valid    |


### Obtain Application token

Tokens for application sub-accounts can be obtained just like for normal user accounts but there is also an convenience API to obtain a token for an application directly from the master account.

```
URL: https://UI-host[:port] /rest/applications/{application-id}/oauth2/token

Method: POST
Direction: Application->Server
```

Calling this API requires no arguments and will return the same JSON message with the tokens as described in the above API.


| Status value | Meaning      | Description                                                               |
| ------------ | ------------ | ------------------------------------------------------------------------- |
| 200          | OK           | JSON with tokens returned in body                                         |
| 400          | Bad request  | Something is wrong in the request                                         |
| 401          | Unauthorized | the username/password or token used to authenticate the request is wrong. |



## Device management - detailed description

This section describes the details of each message.

### Register a Device {#sec:deviceRegistration}

Register a new device on the UI/RNSS.

```
URL: https://host[:port]/rest/nodes
```

Method: POST \
Direction: Application->Server

The message content of the registration message depend on the whether the devices is being registered using **device-profile** (and **service-profile**) or if the device is being registered using the direct registration (*legacy* method of registration prior to release 6). The API to register devices either way is the same, however the message content is different.

When using profiles, the number of fields needed to register a device is far less than when doing direct registration. The following show the registration message object to fill when using profile. The values shown are examples but are typically the default value (if the field is not specified).

```JSON
{
    "DevEUI": "AA-BB-CC-dd-00-11-22-33",
    "lora_device_class": 0,
    "appeui": "",
    "joineui": "",
    "appkey": "",
    "nwkkey": "",
    "nwkskey": "",
    "snwksintkey": "",
    "fnwksintkey": "",
    "nwksenckey": "",
    "appskey": "",
    "applications": "",
    "groups": "",
    "userid": "",
    "comment": "",
    "altitude": 0,
    "latitude": 0,
    "longitude": 0,
    "options": 0,
    "activated": true,
    "device_profile_uuid": "",
    "service_profile_uuid": ""
}

```

Note, which keys that need to be provided depends on whether the device is being activated via ABP or OTAA, and whether the device is compliant to LoraWAN MAC version 1.0.x or 1.1.x. Please see table at end of section for explanation on which keys to provide.

The device registration message parameters are described in the table below:

| Field                | type    | Description                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DevEUI               | string  | Device Extended Unique Identifier (DevEUI).<br>Mandatory.                                                                                                                                                                                                                                                   |
| lora_device_class    | number  | Active device class of the device<br>Optional. Valid range: [0;2]                                                                                                                                                                                                                                           |
| appeui               | string  | Application EUI of device.<br>This field should almost never be provided, but can be specified to make it look like a ABP device also have an AppEUI for legacy applications that require to receive a valid AppEUI<br>Optional.                                                                            |
| joineui              | string  | JoinEUI override of OTAA device.<br>This field can be specified to override the the AppEUI/JoinEUI sent by the device during the JOIN procedure. This is used to direct the JOIN ACCEPT to a registered Join Server that doesn't match the range of the JoinEUI embedded in the actual device.<br>Optional. |
| appkey               | string  | AppKey of the device.<br>The application key is optional and may be ommitted if the device key is stored in an external key store, or if the JOIN procedure is managed by the application<br>Optional.                                                                                                      |
| nwkkey               | string  | NwkKey of of device (for OTAA activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                                          |
| nwkskey              | string  | Network Session Key (for ABP activation mode and LoraMac 1.0.x only)<br>Optional.                                                                                                                                                                                                                           |
| snwksintkey          | string  | Serving Network Session Integretry key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                        |
| fnwksintkey          | string  | Forwarding Network Session Integretry key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                     |
| nwksenckey           | string  | Network Session Encryption key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                                |
| appskey              | string  | Application Session Key (for ABP activation mode)<br>Optional.                                                                                                                                                                                                                                              |
| applications         | string  | Application accounts associated with this device<br>Optional.                                                                                                                                                                                                                                               |
| groups               | string  | Groups associated with this device<br>Optional.                                                                                                                                                                                                                                                             |
| userid               | string  | The account ID of the account owning the device.<br>This parameters cannot not be set on creation but can be changed later by administrator accounts.<br>Optional.                                                                                                                                          |
| comment              | string  | Device user comment<br>Optional.                                                                                                                                                                                                                                                                            |
| altitude             | number  | Altitude of device [m]<br>Optional.                                                                                                                                                                                                                                                                         |
| latitude             | number  | Latitude of device [deg]<br>Optional.                                                                                                                                                                                                                                                                       |
| longitude            | number  | Longitude of device [deg]<br>Optional.                                                                                                                                                                                                                                                                      |
| options              | number  | Options field<br>This field should only be used when specifically requested by the operator. Can be omitted or set to zero<br>Optional.                                                                                                                                                                     |
| activated            | boolean | Device activated.<br>When the device is activated the device will operate normally on the netowrk. When not activated, the network will not allow up and downlink from the device.<br>Optional.                                                                                                             |
| device_profile_uuid  | string  | Device Profile UUID<br>Mandatory.                                                                                                                                                                                                                                                                           |
| service_profile_uuid | string  | Service Profile UUID<br>Mandatory.                                                                                                                                                                                                                                                                          |



<!--When registering the device using direct registration (also known as the *legacy* registration method), profiles are not used and additional information about the device need to be provided directly in the registration message. The registration message object for direct registration is shown below: 


```JSON
{
    "lora_device_class": 0,
    "DevEUI": "AA-BB-CC-dd-00-11-22-33",
    "appeui": "",
    "joineui": "",
    "appkey": "",
    "nwkkey": "",
    "nwkskey": "",
    "snwksintkey": "",
    "fnwksintkey": "",
    "nwksenckey": "",
    "appskey": "",
    "groups": "",
    "applications": "",
    "userid": "",
    "lora_fcnt_32bit": false,
    "lora_rx_delay1": 1,
    "lora_rx_delay2": 2,
    "lora_major": 0,
    "lora_rx2_sf": "",
    "comment": "",
    "expiry_time_uplink": 168,
    "expiry_time_downlink": 168,
    "redundant_uplink_cnt": 0,
    "device_properties": "",
    "options": 0,
    "max_allowed_dutycycle": 0,
    "expected_avr_dutycycle": 0,
    "latitude": 0,
    "longitude": 0,
    "altitude": 0,
    "activation": "",
    "lora_location": false,
    "activated": true,
    "downlink_allowed": true,
    "MACVersion": "1.0.1",
    "RegParamsRevision": "A",
    "MaxEIRP": 16,
    "RFRegion": "default region of the network"
}

```

The device registration message parameters for the direct (legacy) registration method are described in the table below:

| Field                  | type    | Description                                                                                                                                                                                                                                                                                                |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lora_device_class      | integer | Active device class of the device<br>Mandatory. Valid range: [0;2]                                                                                                                                                                                                                                         |
| DevEUI                 | string  | Device Extended Unique Identifier (DevEUI)<br>Mandatory.                                                                                                                                                                                                                                                   |
| appeui                 | string  | Application EUI key of device<br>This field should almost never be provided, but can be specified to make it look like a ABP device also have an AppEUI for legacy applications that require to receive a valid AppEUI<br>Optional.                                                                        |
| joineui                | string  | JoinEUI override of OTAA device<br>This field can be specified to override the the AppEUI/JoinEUI sent by the device during the JOIN procedure. This is used to direct the JOIN ACCEPT to a registered Join Server that doesn't match the range of the JoinEUI embedded in the actual device.<br>Optional. |
| appkey                 | string  | AppKey of the device<br>The application key is optional and may be ommitted if the device key is stored in an external key store, or if the JOIN procedure is managed by the application<br>Optional.                                                                                                      |
| nwkkey                 | string  | NwkKey of of device (for OTAA activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                                         |
| nwkskey                | string  | Network Session Key (for ABP activation mode and LoraMac 1.0.x only)<br>Optional.                                                                                                                                                                                                                          |
| snwksintkey            | string  | Serving Network Session Integretry key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                       |
| fnwksintkey            | string  | Forwarding Network Session Integretry key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                    |
| nwksenckey             | string  | Network Session Encryption key (for ABP activation mode and LoraMac 1.1.x only)<br>Optional.                                                                                                                                                                                                               |
| appskey                | string  | Application Session Key (for ABP activation mode)<br>Optional.                                                                                                                                                                                                                                             |
| groups                 | string  | Groups associated with this device<br>Optional.                                                                                                                                                                                                                                                            |
| applications           | string  | Application accounts associated with this device<br>Optional.                                                                                                                                                                                                                                              |
| userid                 | string  | The account ID of the account owning the device.<br>This parameters cannot not be set on creation but can be changed later by administrator accounts.<br>Optional.                                                                                                                                         |
| lora_fcnt_32bit        | boolean | Use 32-bit FCNT in the LoraMac frames (LoraMac 1.0.x only)<br>Mandatory.                                                                                                                                                                                                                                   |
| lora_rx_delay1         | integer | RX window 1 delay [seconds]<br>Optional. Valid range: [1;5]                                                                                                                                                                                                                                                |
| lora_rx_delay2         | integer | RX window 2 delay [seconds]<br>If specified, must be set to RX window 1 delay + 1 second<br>Optional. Valid range: [2;6]                                                                                                                                                                                   |
| lora_major             | integer | Lora Major number. Must be zero<br>Optional. Valid range: [0;0]                                                                                                                                                                                                                                            |
| lora_rx2_sf            | string  | Initial spreading factor of RX slot 2<br>Mandatory.                                                                                                                                                                                                                                                        |
| comment                | string  | Device user comment<br>Optional.                                                                                                                                                                                                                                                                           |
| expiry_time_uplink     | number  | Uplink payloads expiry time [hours]<br>Optional. Valid range: [1;1000000]                                                                                                                                                                                                                                  |
| expiry_time_downlink   | number  | Downlink payloads expiry time [hours]<br>Optional. Valid range: [1;1000000]                                                                                                                                                                                                                                |
| redundant_uplink_cnt   | integer | Device uplink redundancy override<br>Should be normally be ommited. Values are 0: let network decide, 1: use one transmission per uplink (no redundancy), 2-8: use 2-8 transmissions per uplink<br>Optional. Valid range: [0;6]                                                                            |
| device_properties      | string  | Device properties<br>comma separated string with properties. The supported properties are: static,mobile,indoor,outdoor<br>Optional.                                                                                                                                                                       |
| options                | integer | Options field<br>This field should only be used when specifically requested by the operator. Can be omitted or set to zero<br>Optional.                                                                                                                                                                    |
| max_allowed_dutycycle  | number  | Maximum allowed dutycycle in percent [%]<br>Optional. Valid range: [0;100]                                                                                                                                                                                                                                 |
| expected_avr_dutycycle | number  | expected dutycycle of device [%]<br>Optional. Valid range: [0;100]                                                                                                                                                                                                                                         |
| latitude               | number  | Latitude of device [deg]<br>Optional.                                                                                                                                                                                                                                                                      |
| longitude              | number  | Longitude of device [deg]<br>Optional.                                                                                                                                                                                                                                                                     |
| altitude               | number  | Altitude of device [m]<br>Optional.                                                                                                                                                                                                                                                                        |
| activation             | string  | Activation mode of the device<br>Valid options are ABP (Activation By Personalisation) or OTAA (Over The Air Activation).<br>Optional.                                                                                                                                                                     |
| lora_location          | boolean | Enable Lora based location estimation.<br>Optional.                                                                                                                                                                                                                                                        |
| activated              | boolean | Device activated.<br>When the device is activated the device will operate normally on the netowrk. When not activated, the network will not allow up and downlink from the device.<br>Optional.                                                                                                            |
| downlink_allowed       | boolean | Downlink allowed<br>Optional.                                                                                                                                                                                                                                                                              |
| MACVersion             | string  | Version of LoraWAN MAC that the device is compliant to<br>Optional. Valid values: "1.0.1", "1.1.1"                                                                                                                                                                                                         |
| RegParamsRevision      | string  | Revision of LoraWAN MAC that the device is compliant to<br>Note, only some versions of the LoraWAN MAC have revisions<br>Optional. Valid values: "A", "B"                                                                                                                                                  |
| MaxEIRP                | number  | Max Equivalent Isotropically Radiated Power (EIRP) of device [dBm]<br>This is only applicable to 1.0.2 Rev B or later device<br>Optional. Valid range: [0;33]                                                                                                                                              |
| RFRegion               | string  | Region of the device<br>Optional. Valid values: "EU868", "US915", "CN779", "EU433", "AU915", "CN470", "AS923", "AS923-2", "AS923-3", "KR920", "IN865", "RU864", "JP923", "China779", "Australia915", "China470", "INDIA"                                                                                   |


The ***expiry_time_uplink*** and ***expiry_time_downlink*** is the time in hours an up- or downlink payload will stay in the persistent temporary storage if the UI or application does not delete it. The downlink expiry time is independent of whether the messages has been sent or not.

The ***device_properties*** field is a string with comma-separated properties that best describe the device. These properties are used by the network to improve the overall quality of server in the entire system. The following properties are currently supported.

| Property name | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| "static"      | The device is installed in a fixed position and does not move. |
| "mobile"      | The device can move around                                     |
| "indoor"      | The device is generally used indoors                           |
| "outdoor"     | The device is generally used outdoors.                         |

Examples:

```JSON
Valid combinations:
    "device_properties": "static,indoor",
    "device_properties": "mobile",

Illegal combinations:
    "device_properties": "static,mobile",
```
-->
#### Key schemes

Common for both registration methods (profiles or direct) are the device key fields and the DevEUI and DevAddr fields.

The **DevEUI** must be unique per device, a DevAddr can be assigned to multiple devices, but the **DevAddr** + **NwkSKey** pair must be unique.

The presence of the ***appkey***, ***nwkkey***, ***appskey***, ***nwkskey***, ***snwksintkey***, ***fnwksintkey***, ***nwksenckey***, and ***devaddr*** depends on the type of device activation mode used, the level of security required (i.e. who have access to the master key), and the version of the LoraWAN MAC the device is compliant to.

**Using OrbiWAN internal Join-Server, OTAA devices.**

When using the OTAA activation mode, the AppKey (and NwkKey for LoraWAN 1.1.x devices) can be either registered on the UI such that the internal JOIN Server (JS) will manage the JOIN procedure. In this case the AppKey (and NwkKey) must be registered on the device. In this case the Sever will also manage all encryption/decryption of payload messages. Data send/received on the  API will not be LoRaWAN encrypted, but still protected by HTTPS.

**ABP activation**

When an external JS is used (or the JOIN is managed directly by the Application) the AppKey (and NwkKey) is kept outside of the UI and the keys are not provided to the UI. In this case the UI will automatically invoke the JS (or application) to process the JOIN procedure. In this case the UI will not be able to manage the payload encryption/decryption and will parse directly the raw encrypted payload messaged for the application to manage the encryption/decryption.

When using ABP activation mode all "network session" keys must be provided. However the AppSKey is optional, and if provide the UI will automatically manage all payload encryption/decryption. When not present the UI will "pass-through" the raw encryption payload messages in both up and downlink.

The following combinations are supported, requiring the indicated keys:

| Activation scheme | Mac Version | AppKey   | AppSKey | NwkKey | DevAddr | NwkSKey | SNwkSIntKey | FNwkSIntKey | NwkSEncKey |
| ----------------- | ----------- | ------   | ------- | ------ | ------- | ------- | ----------- | ----------- | ---------- |
| OTAA              | 1.0.x       |  X       |         |        |         |         |             |             |
| OTAA              | 1.1.x       |  [X]     |         | X      |         |         |             |             |
| OTAA              | 1.0.x       |          |         |        |         |         |             |             |
| OTAA              | 1.1.x       |          |         | X      |         |         |             |             |
| ABP               | 1.0.x       |          | [X]     |        | X       | X       |             |             |
| ABP               | 1.1.x       |          | [X]     |        | X       |         | X           | X           | X          |


Note, in the case of OTAA on MAC 1.1.x, the AppKey is optional. In this case the Server will manage all key derivation for the network on the JOIN message, but will forward also the raw JOIN message to the application (via pushmode notification). The application must then itself derive the AppSKey from the JOIN and perform all payload encryption/decryption.

#### Groups and Applications

Each device can be associated with multiple groups and applications. The association is set directly by specifying directly the comma separated list of groups, e.g.:

```
    "groups": "groupid1,groupid3"
```

This applies to both lists, i.e. Groups and Applications.


Return values for device registration:

| Status value | Meaning               | Description                                                                                                                                                                                                         |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200          | OK                    | Registration was successful                                                                                                                                                                                         |
| 401          | Unauthorized          | The username/password used in the basic authentication scheme is invalid or not present.                                                                                                                            |
| 404          | Error in registration | One or more of the parameters are invalid. Possible causes for this error are: devaddr + nwkskey pair already used, missing parameters in the message.                                                              |
| 406          | Not Acceptable        | Some of the parameters are not valid (e.g. wrong key length, etc).                                                                                                                                                  |
| 409          | Already registered    | The device (based on the DevEUI) was already registered on the network. No values have been updated. If a device needs to be registered with new values, the device must be deleted first before being added again. |


### Get Device Info {#sec:getDevice}

Get information on a registered device.

```
    URL: https://host[:port]/rest/nodes/{DevEUI}
```
Optional query fields: strict=[true,false], all=[true,false] \
Method: GET \
Direction: Application->Server

The command returns a message with a JSON payload with the following field:

``` JSON
{
    "device_status": 3, // 0: registered but never seen,
                        // 1: seen, but with MIC error,
                        // 2: JOIN’ed (for JOIN devices only),
                        // 3: successfully received uplink

    "last_reception": "timestamp", // time when device was last seen
    "dl_fcnt": 45,                // 0: class A, 1: class B, 2: class C
    "registration_status": 1,     // 0: pending RNSS registration,
                                  // 1: registered, 2: pending RNSS
                                  // deregistration
    "DevEUI": "DevEUI in hex",    // DevEUI of device in HEX
    "expiry_time_uplink": 168,    // ul payload expiry time in hours
    "expiry_time_downlink": 168,  // dl payload expiry time in hours

    "latitude": 45,
    "longitude": 22,
    "loraloc_time": "timestamp",    // time of last location estimate
    "loraloc_fcnt": 123             // FCNT of last uplink used in
                                    // location estimate
}
```

The timestamp is in ISO 8601 format “yyyy-mm-ddThh:mm:ss.SSSZ” format (where SSS is in milliseconds) and aligned with UTC time.

To read back the complete set registration parameters (as defined in @sec:deviceRegistration) for the device, specify the all option, i.e.

```
    https://host[:port]/rest/nodes/{DevEUI}?all=true
```

Reading back the complete registration message is significantly slower that just reading the standard message, the all field should therefore only be used when needed, and not when e.g. just querying for the current FCNT.

Return values:

| Status value | Meaning        | Description                                                                              |
| ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK             | Request ok, the above JSON message is received in the message body                       |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown device | The DevEUI is not known                                                                  |

###    Update / Modify device registration {#sec:deviceUpdate}

Modify the parameters on a registered device on the UI/RNSS.

```
    URL: https://host[:port]/rest/nodes/{DevEUI}
    URL: https://host[:port]/rest/nodes/{groupid}
```

Method: PUT \
Direction: Application->Server

This command can be used to modify any parameter of device already registered on the UI. This command can be used to modify a single device by specifying its DevEUI in the URL, but it is also possible to perform a multi-device update by specifying a group ID in the URL. In this case the modification will be applied to all devices in the group. Note, when using large groups, the command can take long to complete.

The typical usages are to change the device operation mode between class A and class C, update the static position of the device, update the name, etc. But any parameter can be change, except the DevEUI.

Warning: If parameters such as the keys, DevAddr, RX slot timing and RX slot spreading factor are changed there is a risk communication is lost to the device.

The command takes a JSON payload with the parameters from the JSON object in the registration message described in @sec:deviceRegistration. Only the fields that are being changed should be included in the JSON object. The DevEUI cannot be change and should not be specified in the JSON object.

Example: o modify the device class and update the device name the following JSON object would be used:

```JSON
    {
        "comment": "now a class C device",
        "lora_device_class": 2
    }
```

Note, when updating either the devaddr or the nwkskey, both parameters must always be updated together, it is not allowed to update either alone.

For groups and applications, the list can be set directly as for registration to replace all current associations, e.g.:

    "groups": "groupid1,groupid3"

But it is also possible to perform a modification such as adding one group to the existing list. This is useful when modifying devices via the multi-device group update. In this way, a group can be added or removed without affecting any other associated groups.

To add a group, prefix the group name with a plus ‘’+”, e.g.:

    "groups": "+groupid3"

This will add groupid3 to the list of groups, not affecting what is already in the list. Similarly a group can be removed from the device using the minus “-“ prefix, e.g.:

    "groups": "-groupid3"

This applies to both lists, groups and to applications.


It is possible to change the owning user of a device. To move a device or group of devices to another account, The field “userid” can be set in the message body with the name of the user account that should become the owner of the device(s).
Devices can be moved between user accounts freely.

E.g.

```JSON
{
    "userid": "{userid}"
}
```

After modifying a device or group of devices this way, it is no longer possible to access the device on the old account. It is possible to combine the modification with any other fields from above. Associated groups and application will automatically be removed from the device during the move to the new account, as the groups and application belongs to the old account.

When changing the owner of a device, the target groups and applications for the device on the new account can be set in the same command. When the userid field is used in the message, the scope for the applications and groups fields automatically relate to the new account. E.g.:

```JSON
{
    "userid": "{userid2}",
    "groups": "group1-userid2, group2-userid2",
    "applications": "app1-userid2, app2-userid2"
}
````

Note: when changing userid, setting the +/- modifies on groups and applications are not allowed.


Changing owner of a device to another account within the same user, can only be done from an account with user admin rights. 



Return values:

| Status value | Meaning         | Description                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------- |
| 200          | OK              | Modification was successful                                                                               |
| 202          | Accepted        | The command was accepted, and at least one device was updated, but at least one devices failed to update. |
| 401          | Unauthorized    | The username/password used in the basic authentication scheme is invalid or not present.                  |
| 403          | Forbidden       | The user does not have the rights to modify the parameter                                                 |
| 400          | Error in update | One or more of the parameters are invalid.                                                                |
| 406          | Not Acceptable  | Some of the parameters are not valid (e.g. wrong key length, etc).                                        |

Node in case of multi-device update (either update via group, or multiple targets in URL), when 202 or 406 status code is present, it is possible to see a list of which devices failed and the reason for the failure. This information is available when using the "application/problem+json" error format (see section @sec:errorFormat). The error object will look as follows:

```JSON
{
    "type": "about:blank",
    "status": 202 or 406,
    "title": ...,
    "detail": ...,
    "failed-devices": [
        { "reason": "reason 1", "DevEUIs": ["1234567800000001", "1234567800000002"] },
        { "reason": "reason 2", "DevEUIs": ["1234567800000003"] }
    ]
}
```

In the above example three devices failed for two separate reasons. The "failed-devices" array will have an entry for each of the encountered reason for failure, and list the DevEUIs of each failed device in the section for the different reasons.



### Get List of Devices {#sec:getDevices}

Get list of registered devices with the device info for each device.

URL: https://host[:port]/rest/nodes[?[group=groupid][&application=appid1]]

Method: GET \
Direction: Application->Server

The request returns an array of device info objects (see description of object in @sec:getDevice):

```JSON
[
    {"device_status": 3, "last_reception": "timestamp", "dl_fcnt": 45,
    "device_class": 0, "registration_status": 1, "DevEUI": "DevEUI in hex", "appeui": "HEX"},

    {"device_status": 3, "last_reception": "timestamp", "dl_fcnt": 45,
    "device_class": 0, "registration_status": 1, "DevEUI": "DevEUI in hex", "appeui":"HEX "},

    ...
]
```

The list can be filtered by the following query filters:

* **group={group-id}**, when this query is set, only the devices associated to the specified group is returned.
* **application={app-id}**, when this query is set, the devices associated to the specified application is returned.
* **search_comment=text**, will filter the devices according to the text string. The text is automatically “wildcarded” at both ends.
* **search_DevEUI=partial_DevEUI**, text search of partial DevEUI
* **from_date={ISO8601-date-string}**, return device with an update from ISO timestamp and forward.
* **to_date={ISO8601-date-string}**, return device with an update from before the given timestamp.


In addition, special queries can be used to help the pagination. These queries can be combined with the above filters.

* **limit={max-num-devices}**, set maximum number of devices returned. Used for paging
* **get_pages=true** is normally combined with “limit=xx” (which set the page size) and will return a table with the page state of each page allowing "random access" to all pages. This is typically use in UI to be able to put paging button on a table.
* **page_state=page_state_info**. Read from page where the page_state_info is provided as the page_state fields of the special **get_pages** query. Note the string must be copied exactly as returned from the get_pages query.
* **paged_results=true**, returns the query result and addition page state information to be able to read the next page.

Sorting of the result can be specified in the following query options:

* **sort_by_DevEUI=asc|desc|true**, sort the output ascending or descending (true=ascending for backward compatibility) by the DevEUI.
* **soft_by_comment=asc|desc|true**, sort the output ascending or descending (true=ascending) by the device comment.
* **sort_by_date=asc|desc|true**, sort the output ascending or descending (true=ascending) by the last update (which is when the last uplink was received).


When the **get_pages=true** query is used, the following object is returned:

```JSON
{
    "total": 1121,
    "per_page": 2000,
    "pages": [
        { "page_state": "xxxxxx" },
        ...
    ]
}
```

For backward compatibility the result of a query is directly an array with the results. However, when using paged queries unless the entire page state table has been acquired by the "get_pages=true" command, it is necessary to receive the page state at the end of each page to be able to query the next one. To receive the page state in the result set the "paged_results=true" option. With this option the result from a query has the following format:

```JSON
{
    "results": [
        ...
    ],
    "next_page_state": "xxxxxx"
}
```

**Note:** when using sorting there are some limitation that must be observed. Sorting on some columns (e.g. the DevEUI) is always supported and can be queried directly in a page-by-page fashion. However when sorting on other columns it may not be possible to query the pages in this way. In this case a query with the "get_pages=true" option must be used. This returns the table with all page states. From this table it is possible to start querying the first page using the returned page state from that page. Sub-sequently it is possible to go page-by-page using the **next_page_state** state, or to use the table that was returned by the "get_pages=true" query. It is always safe to "try" to query the first page without the page state. If it is supported the page will be returned, if not supported an error 416 is returned. When this error is received, the application knows that it must first use the "get_pages=true" query to get the page states.

For accounts with a lot of devices (e.g several 100k devices) sorting by some columns will be restricted. If there is too much data to sort an error 413 is returned. In this case the user must either specify more filtering so limit the data set, or must disable sorting or sort via the safe DevEUI sorting column.

The returned page states may expire after a while, and if trying to access or reload a page with an expired page state will return 410. In this case the application need to reload again from first page, or use the "get_pages=true" option to get the update-to-date page states.



Return values:

| Status value | Meaning            | Description                                                                                                                                          |
| ------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200          | OK                 | Request ok, the above JSON message is received in the message body                                                                                   |
| 400          | Error in query     | There is an error in the query fields                                                                                                                |
| 401          | Unauthorized       | The username/password used in the basic authentication scheme is invalid or not present.                                                             |
| 404          | Not found          | The specified filter refer to unknown resource                                                                                                       |
| 410          | Page expired       | returned when the page_state field is used and the page is expired                                                                                   |
| 413          | Too big query      | When using sorting and there are too many records in the result, this error is returned. In this case avoid to use sorting on that particular field. |
| 416          | Page state reqired | A page state is required to be able to query with the particular sorting option. Get the page states with a query with get_pages=true.               |



###    Delete Device from OrbiWAN

Deregister a device from the OrbiWAN.

Note that the successful return of this command means that the request has been accepted and is valid. The actual device de-registration and deletion from internal databases can take several seconds to complete. There is therefore a chance that, if the same device is being registered again immediately after the de-registration, the re-registration may fail.
To see that a device have been completely deleted a query on the device with the GET device Info command (see @sec:getDevice) can be used and should return with a error 404.

    URL: https://host[:port]/rest/nodes/{DevEUI}

Method: DELETE \
Direction: Application->Server

Return values:

| Status value | Meaning        | Description                                                                              |
| ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK             | Delete was successful                                                                    |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown device | The DevEUI is not known                                                                  |


###    Request Device Status Procedure

Request the OrbiWAN to perform the LoraWAN DevStatusReq MAC procedure (see section 5.5 “Device Status” in [1]). he procedure will be performed by the OrbiWAN on the tail of the next device uplink. The result will be available from the device on the uplink again after that. Hence the procedure can take as long as the duration of two normally scheduled uplink periods from a device, and the results may not be available for hours or even days depending on the uplink period of the device.

    URL: https://host[:port]/rest/nodes/{DevEUI}/status

Method: PUT \
Direction: Application->Server

Return values:

Status value    Meaning    Description
200    OK    Request was accepted. A DevStatusReq will be sent to the device on the next opportunity.
401    Unauthorized     The username/password used in the basic authentication scheme is invalid or not present.
404    Unknown device    The DevEUI is not known


### Read Device Status Procedure Result

Read the result from a completed DevStatusReq MAC procedure (see previous section).

    URL: https://host[:port]/rest/nodes/{DevEUI}/status

Method: GET \
Direction: Application->Server

The following JSON object is returned:

```JSON
{
    "battery_status": 0,    // value from LoraWAN specification,
                            // 0: connected to power source,
                            // 1..254: battery level 1 being minimum and
                            // 254 being maximum,
                            // 255:not possible for the device to measure
                            // battery level
    "margin_status": 0,     // demodulation SNR [dB]for the
                            // DevStatusReq command.
    "timestamp_status": "2015-02-06T10:43:23.331Z",// GMT time of last report
    "req_status": 2         // 0: never updated, 1: update requested,
                            // 2: request pending, 3: result ready
}
```

The values can be considered valid only when the req_status field has a value of 3 (meaning result ready). The timestamp is in ISO 8601 format “yyyy-mm-ddThh:mm:ss.SSSZ” format (where SSS is in milliseconds) and aligned with UTC.


Return values:

| Status value | Meaning        | Description                                                                              |
| ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK             | Request was OK. The above explained JSON object is returned in the message body.         |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown device | The DevEUI is not known                                                                  |


## Payload Management – Detailed Description

### Receive all Pending Uplink Payloads from Device {#sec:getPayloadsUl}

Receive an array with all received payloads for a device. The payloads are stored in the persistent temporary storage inside OrbiWAN. The application should delete the payload once they have been safely “consumed”. Unread payloads will be automatically deleted after an expiry period.

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/ul[?query_options]

Method: GET \
Direction: Application->Server

The valid queries that can be used with this API are:

| Parameter           | values            | description                                                                                                                                                                                                                                                                                     |
| ------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data_format         | hex,base64        | Data format for all binary data. Default is base64                                                                                                                                                                                                                                              |
| from_date           | ISO8601 date/time | show only payload from after this time/date                                                                                                                                                                                                                                                     |
| to_date             | ISO8601 date/time | show only payload from before time/date                                                                                                                                                                                                                                                         |
| get_pages           | boolean           | see section on paged queries                                                                                                                                                                                                                                                                    |
| limit               | number            | see section on paged queries                                                                                                                                                                                                                                                                    |
| page_state          | string            | see section on paged queries                                                                                                                                                                                                                                                                    |
| paged_results       | boolean           | see section on paged queries                                                                                                                                                                                                                                                                    |
| mac_msg             | boolean           | when true and user has rights to see MAC message, the returned list of payloads will include the raw LoRaWAN Mac frames. Default is false.                                                                                                                                                      |
| search_port         | string            | filter by port number. Port can be composed of comma separated ranges. E.g. "1-10,50-55,100,200-" will return payloads with port values from 1 to 10 and 50 to 55, 100 and 200 to 255. When the range '-' is left open, e.g. 100- or -50 it means from 100 to 255 or from 0 to 50 respectively. |
| sort_by_timestamp   | asc,desc          | Sort the payloads by the timestamp ascending or descending.                                                                                                                                                                                                                                     |
| strict              | boolean           | enforce strict checking of all parameters                                                                                                                                                                                                                                                       |
| locations           | boolean           | include estimated location (latitude, longitude, altitude) in results. Note, the fields are only included in the message if a location estimate is available, and the altitude will normally not be available as most locations solver will not estimate the altitude.                          |
| push_status         | boolean           | include push_status array with status of the push attempt to each application                                                                                                                                                                                                                   |
| search_pushfail     | boolean           | filter the payloads and return only the payloads that failed pushing the data to the an application.                                                                                                                                                                                            |
| search_pushfail_app | app-id            | filter the payloads and return only the payloads that failed pushing the data to the specified application.                                                                                                                                                                                     |


[DMM] the above push_status and search_pushfail is part of DMM.



A JSON message body is returned with an array of all payloads

```JSON
    [
        {
            "dataFrame": "AB==",	// raw (encrypted) payload in base64 format
            "confirmed": false,     // confirmed(true) or unconfirmed(false) uplink
            "port": 1,		        // MAC port the message was receive on
            "timestamp": "2015-02-11T10:33:00.578Z",	// time of reception in GMT
            "fcnt": 138,		    // uplink FCNT (needed for decryption)
            "rssi": -111,	    	// RSSI from gateway
            "snr": -6,		        // SNR from gateway
            "sf_used": 8,	        // used spreading factor – Depreciated,
                                    // don’t use in new code.
                                    // please use dr_used field instead.
            "dr_used": "SF8BW128",	// used data-rate, SF and BW
            "cr_used":"4/5",        // Forward error correction code used
            "device_redundancy":1,  // number of times the device has transmitted
                                    // the burst
            "time_on_air_ms":41.216,// Airtime for this burst [ms]
            "id": 278998,	        // unique identifier (64-bit) of payload.
                                    // Needed to delete the payload
            "session_id": "0f9aaa82-b16c-4c2d-9b99-344e2f2c8b7d",	// session ID under which the packet was received
            "decrypted": true,     // set true if the UI decrypted the payload,
                                    // false if the message is still encrypted.

            "gtw_info": [		    // see note below.
                {gtw_id: "0000000012340000", rssi: -100, snr: 5 },
                {gtw_id: "0000000012350000", rssi: -90, snr: 15 },
                ...
            ],

            "push_status": [        // only available with push_status=true option.
                { "app": "app-id1", "app_uuid": "uuid-of-app1", status: 200 }
                { "app": "app-id2", "app_uuid": "uuid-of-app2", status: 404 }
                ...
            ],

            "decoded": {            // only availble with associated payload decoder
                // user defined object from payload decoder
            }
        },
        ...
    ]
```

The ***gtw_info*** field is only present for accounts that have the “can access network gateway info” right. It contains a list of all gateways that receive the uplink message, and the signal quality data associated with it. The gateway ID can be used to query the gateway location through the gateway API.

The ***session_id*** field in the payload message is used to identify for which join session the message was received. When the application manages the decryption (i.e. the keys are not available on the UI), the ***session_id*** can be used to check which ***appskey*** to use for the decryption.

**push_status** is an array that show the status from push to an application. Currently status is only available for REST based push.

**Note:** when query *mac_msg=true* is used, non-application payloads may be inserted in the list of payloads. These system payloads are from varies LoRaWAN control messages, and can be identified by the port value. All application payloads always have a port value >= 1. Payloads that have been inserted by the system may have either no port value (null), or 0 or negative values.


Return values:

| Status value | Meaning        | Description                                                                                                             |
| ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 200          | OK             | Request ok. The above list of payloads is return in the message body                                                    |
| 204          | No Payload     | Request ok, but there is currently no payload pending for this device (i.e. the persistent temporary storage is empty). |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present.                                |
| 404          | Unknown device | The DevEUI is not known                                                                                                 |


###	Receive latest payload from device

Devices where only the latest value is relevant can be query for just the latest received payload.

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/ul/latest
Method: GET \
Direction: Application->Server

A JSON message body is returned with a single payload object (i.e. no array). The payload object is described in the previous section.

Return values:

| Status value | Meaning        | Description                                                                                                              |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 200          | OK             | Request ok. Single JSON object with payload and parameters (see @sec:getPayloadsUl).                                     |
| 204          | No Payload     | Request ok, but there is currently no payload pending for this devices (i.e. the persistent temporary storage is empty). |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present.                                 |
| 404          | Unknown device | The DevEUI is not known                                                                                                  |


###	Delete Uplink Payload

Payloads stay in OrbiWAN persistent temporary storage until they are deleted by the application or until the payload expiry period is reached. Once a payload has been read and provided to its destination(s) is should be deleted.
The payload is deleted based on its unique id that is provided to the application in the same message as the payload itself.

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/ul/{id}
Method: DELETE \
Direction: Application->Server

Return value:

| Status value | Meaning        | Description                                                                              |
| ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK             | Payload successfully deleted                                                             |
| 401          | Unauthorized   | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown device | The DevEUI is not known                                                                  |


###	Send Downlink Payload to Device or Multicast group {#sec:postDownlink}

Downlink payloads are sent to the UI for it to transmit them to the device on next opportunity. Payloads are provided either encrypted or un-encrypted depending on the chosen key scheme .

Note: Devices that does not use the default application payload scheme (option in upcoming LoraWAN specification) does not need to provide the FCNT, but must encrypt the payload in a self-containing way that does not rely on the MAC frame FCNT. This will be detailed further in a later release.

```
URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/dl?port={xx}[&fcnt={yy}][&confirmed=true][&mode=fail_on_busy|replace_on_busy|enqueue_on_busy][data_format=base64|hex]

https://host[:port]/rest/multicast/{group-id}?port={xx}[&fcnt={yy}]
[&mode=fail_on_busy|replace_on_busy|enqueue_on_busy][data_format=base64|hex]
```
Method: POST \
Direction: Application->Server

| Options     | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| port        | LoRaWAN port number                                                                                                                                                              |
| fcnt        | Optional LoRaWAN FCNT. Note when AppKey/AppSKey is know by the network this field is not needed, but when the application manage the payload encryption this field is mandatory. |
| confirmed   | true/false (for unicast downlink only, not allowed on multicast)                                                                                                                 |
| mode        | Determine the behavior when there are already messages pending in the downlink queue. See table below for the available values.                                                  |
| data_format | hex or base64                                                                                                                                                                    |

The payload itself is put directly in the request message body in base64 format unless “data_format” is set to hex (&data_format=hex) in which case message body must contain a valid hex payload.

Downlink messages are by default transmitted as confirmed messages, but it is possible to control the usage of confirmed vs. unconfirmed downlink message types. Setting &confirmed=false as a URL option will force transmission of the downlink as unconfirmed.

If there is already an outstanding downlink message waiting to be sent, the default behavior is to en-queue the new message to be send after the outstanding package. However, it is often not relevant to have multiple outstanding packets if the downlink related to immediate status for class A devices. For this reason, it is possible to control the behavior of the downlink when there are already one or more outstanding downlinks. This can be controlled using the “mode” filter option on the URL. There are 3 modes:


| mode            | Description                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fail_on_busy    | Return error 409 if there is already one or more outstanding downlink waiting to be sent.                                                                                                                                                                                                             |
| replace_on_busy | Abort any existing downlink messages (i.e. they will not be sent and will have cancelled state when querying their state) and schedule the new message for downlink.                                                                                                                                  |
| enqueue_on_busy | Schedule the downlink to be sent after all already outstanding messages have been sent. The maximum number of outstanding downlinks is limited to 10 or the value set in the service / connectivity profile. An error (409) is return when the max number of outstanding downlinks have been reached. |


Note, while the default behavior is “enqueue_on_busy“ (backward compatibility reasons) it is recommended to use “fail_on_busy” or “replace_on_busy” whenever possible to avoid sending downlink that are already “out-of-date”.

As it may take long time before the payload can be transmitted it is not possible to get delivery status on the payload immediately. Instead the Server must query the packet status, and a unique ID is therefore assigned to the downlink payload and returned on the POST for the UI to identify the payload for later query.

The post returns the following JSON object:

```JSON
    {
        "id": 252,			// unique ID to query payload later
        "data": "ABC=",			// *Optional the payload data sent)
        "fcnt": 10,			// the usedFCNT
        "port": 1,			// the used port
        "transmissionStatus": 0	// see definition below
        "session_id": "UUID"		// session ID when packet was created
    }
```

* Has to be enabled in a configuration field, by default not included, used only for backwards compatibility.

The meaning of the transmission status is the following:

| Transmission status | Description                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0                   | Payload pending transmission (i.e. not sent yet)                                                                                                  |
| 1                   | Payload has been sent, but reception status unknown                                                                                               |
| 2                   | Payload has been sent and acknowledged by the device                                                                                              |
| 3                   | Payload has been sent, and NOT acknowledged by the device => most likely the device did not receive the downlink payload.                         |
| 4                   | An error has been discovered on the payload. The possible reasons for this error are: FCNT collision, payload size too big.                       |
| 5                   | Payload has been cancelled. This happens if downlinks have been queued but are erased again due to new JOIN, or if the payloads have been purged. |

The transmission status get updated live to reflect the status of the packet. If an application has registered for push, it will receive a downlink payload status callback message (see @sec:pushPayloadDl) on every change of the status.

<!-- ![Downlink packet life-cycle (for unicast downlink)](payload-life-cycle.png){#fig:downlinkLifeCycle} -->

Note: It is import to wait for the POST to complete before making a new POST with another payload. Scheduling several payloads in parallel is not supported and can have unexpected results.

Return values:

| Status value | Meaning            | Description                                                                                           |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------- |
| 200          | OK                 | Payload successfully scheduled for transmission, and message body will contain the above JSON object. |
| 401          | Unauthorized       | The username/password used in the basic authentication scheme is invalid or not present.              |
| 404          | Unknown device     | The DevEUI is not known                                                                               |
| 409          | Busy or Queue full | The downlink queue is full or not empty (in case of mode=fail_on_busy).                               |


###	Check Downlink Payload Status

After scheduling a payload for transmission to a device, the status of the packets successful delivery to the device can be queried. The payload status is queried by the ID returned from the POST command (see @sec:postDownlink).

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/dl/{id}
    URL: https://host[:port]/rest/multicast/{groupid}/payloads/dl/{id}

Method: GET \
Direction: Application->Server

The command returns the same JSON object as that returned by the payload POST commands (see @sec:postDownlink).

After the payload transmission has concluded (either successfully or not) the application should delete the payload packet from the Server using the delete downlink payload command (see @sec:deletePayloadDl). If the application does not delete the payload it will be automatically delete when the expiry period has been reached.

Return values:

| Status value | Meaning                         | Description                                                                                                                                             |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200          | OK                              | The downlink status and payload has been successfully found and returned in the message body. See @sec:postDownlink for the details on the JSON object. |
| 401          | Unauthorized                    | The username/password used in the basic authentication scheme is invalid or not present.                                                                |
| 404          | Unknown device and/or packet ID | The DevEUI is not known or the packet ID does not exist.                                                                                                |



### Get Status for all Downlink Payloads

Similarly to querying for a single downlink, it is also possible to get the entire list of payloads for both device and multicast.

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/dl[?query_options]
    URL: https://host[:port]/rest/multicast/{groupid}/payloads/dl[?query_options]

Method: GET \
Direction: Application->Server

Supported query options:

| Parameter                  | values            | description                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data_format                | hex,base64        | Data format for all binary data. Default is base64                                                                                                                                                                                                                                              |
| from_date                  | ISO8601 date/time | show only payload from after this time/date                                                                                                                                                                                                                                                     |
| to_date                    | ISO8601 date/time | show only payload from before time/date                                                                                                                                                                                                                                                         |
| get_pages                  | boolean           | see section on paged queries                                                                                                                                                                                                                                                                    |
| limit                      | number            | see section on paged queries                                                                                                                                                                                                                                                                    |
| page_state                 | string            | see section on paged queries                                                                                                                                                                                                                                                                    |
| paged_results              | boolean           | see section on paged queries                                                                                                                                                                                                                                                                    |
| mac_msg                    | boolean           | when true and user has rights to see MAC message, the returned list of payloads will include the raw LoRaWAN Mac frames. Default is false.                                                                                                                                                      |
| search_port                | string            | filter by port number. Port can be composed of comma separated ranges. E.g. "1-10,50-55,100,200-" will return payloads with port values from 1 to 10 and 50 to 55, 100 and 200 to 255. When the range '-' is left open, e.g. 100- or -50 it means from 100 to 255 or from 0 to 50 respectively. |
| search_transmission_status | number            | shown only payloads with particular transmission status.                                                                                                                                                                                                                                        |
| sort_by_timestamp          | asc,desc          | Sort the payloads by the timestamp ascending or descending.                                                                                                                                                                                                                                     |
| strict                     | boolean           | enforce strict checking of all parameters                                                                                                                                                                                                                                                       |



The command will return an JSON array with the same status messages as described for the POST downlink command (see sec:postDownlink). E.g.

```JSON
[{
    "id": 252,			// unique ID to query payload later
    "data": "ABC=",			// the payload data sent
    "fcnt": 10,			// the used fcnt
    "port": 1,			// the used port
    "transmissionStatus": 1,	// see definition below
    "session_id": "UUID"		// session ID when packet was created
},{
   "id": 254,			// unique ID to query payload later
    "data": "ABC=",			// the payload data sent
    "fcnt": 11,			// the used fcnt
    "port": 1,			// the used port
    "transmissionStatus": 0,	// see definition below
    "session_id": "UUID"		// session ID when packet was created
	}, ... {
    ...
}]
```

**Note:** When query *mac_msg=true* is used, non-application payloads may be inserted in the list of payloads. These system payloads are from varies LoRaWAN control messages, and can be identified by the port value. All application payloads always have a port value >= 1. Payloads that have been inserted by the system may have either no port value (null), or 0 or negative values.


Return values:

| Status value | Meaning      | Description                                                                                                                                             |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200          | OK           | The downlink status and payload has been successfully found and returned in the message body. See @sec:postDownlink for the details on the JSON object. |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present.                                                                |


### Get Status for all Downlink Payloads

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/all[?query_options]

Method: GET \
Direction: Application->Server

This is a convenience query that can return both uplinks and downlink in the same query. It returns a list of mixed up and downlinks. All the combined query options from the *https://host[:port]/rest/nodes/{DevEUI}/payloads/ul* and *https://host[:port]/rest/nodes/{DevEUI}/payloads/dl* can be used with this query. And in addition the following queries are available.


| Parameter     | Values          | Description                                                            |
| ------------- | --------------- | ---------------------------------------------------------------------- |
| payload_type: | uplink,downlink | when present show only uplink or downlink. When omitted both are shown |

Return values:

| Status value | Meaning      | Description                                                                                   |
| ------------ | ------------ | --------------------------------------------------------------------------------------------- |
| 200          | OK           | The downlink status and payload has been successfully found and returned in the message body. |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present.      |



###	Delete Downlink Payload {#sec:deletePayloadDl}

Downlink payloads stay in the OrbiWAN temporary storage even after having been sent to allow the application to query the status of the payload transmission. When the application has seen the completion of the downlink the payload should be deleted using this command.

    URL: https://host[:port]/rest/nodes/{DevEUI}/payloads/dl/{id}
Method: DELETE \
Direction: UI->RNSS

Return value:

| Status value | Meaning                         | Description                                                                              |
| ------------ | ------------------------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK                              | The payload has been deleted.                                                            |
| 401          | Unauthorized                    | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown device and/or packet ID | The DevEUI is not known or the packet ID does not exist.                                 |




## Push Mode Callbacks – Detailed Description {#sec:pushModeDescription}

Applications can subscribe to push-notifications. Push notification can be delivered through any of the following protocols:

* REST
* WebSocket
* MQTT

Applications can chose the protocol that is most suitable for the application. For additional convenience when using either WebSocket or MQTT it is also possible to send downlink message via either WebSocket and MQTT.

There are nine types of push notification messages that are sent. Applications can decide to subscribe to only a subset of them.

The eight notification are:


| Notification          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| payloads_ul_early     | Uplink message received. The message body contains the uplink message data and port number. This notification is sent as early as possible to allow the application to be able to respond to the message and have it send back to the device on the immediate following downlink opportunity.                                                                                                                                                                                                                                                                                                      |
| payloads_ul(complete) | Uplink message received. The message body contains the uplink message data and port number, and the RSSI and SNR of the best gateway that received the data. Further depending on the rights of the application, the message may also contain the full list of gateways that received the message and the estimated Geo location of the device. As this message requires aggregation of data from multiple gateways and optional processing of geo locations data, this message will arrive too late to be able to send data back to the device on the immediately following downlink opportunity. |
| payloads_dl           | This notification is send with the status of a scheduled downlink. The notification will be send when the downlink have actually been sent, and in case of confirmed downlink, when the downlink have been (or not) acknowledged. If an error happened on the downlink this will also be indicated on this notification. This notification may be send several times as the state changes.                                                                                                                                                                                                         |
| multicast             | The multicast status is similar to the payloads_dl message, but is for multicast messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| nodeinfo              | A nodeinfo notification is sent tell the application that the state of a device has changed. This is the case when the network schedules a downlink without request from the application. In this case the downlink FCNT counter is incremented, and the nodeinfo notification is send to notify the application of this change.                                                                                                                                                                                                                                                                   |
| status                | The status notification is sent when the device have reported back the **DevStatusAns** which report the battery level of the device and the downlink link margin.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| join                  | Raw LoraWAN join message sent to the application when the application want to manage directly the JOIN procedure and process the JOIN-REQ, JOIN-ACCEPT and session keys.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| joininfo              | Send when the a device have send a join request message and the network has accepted the device.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| location              | A location estimate has been updated for the device. Note, this message is redundant with the payloads_ul(complete) notification that will also include the location information when available.                                                                                                                                                                                                                                                                                                                                                                                                   |
| alarm                 | An issue is detected and the UI will notify the application about it with the alarm message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

The application can subscribe to all the messages or select a subset. The default it to subscribe to all the message except the payloads_ul_early message.

*Note:* an application can subscribe to both payloads_ul_early_ and payloads_ul(complete) messages. In this case the application will receive both messages and the application must take care not to confuse the two messages for different uplinks and process the data twice. The early message has a field **early** that is set to true to indicate that this message is of early type and that realtime downlink is possible.

*Note2:* Subscription to payloads_ul_early messages is conditional on the service profile, and only service profiles that allow "real-time" downlink will be able to receive the payloads_ul_early notification. As the notification subscription is set per application and not per device, it is possible that there are devices that both support and not support the early message due to different service profiles. If the application subscribes only to the early notification and receive an uplink from a device with a service profile that doesn't support it, the UI will automatically send the complete type message instead for those devices.

### Receive Uplink Payload Callback {#sec:pushPayloadUl}

When a new uplink payload arrives the Server will store the message in the persistent temporary storage. If the application has registered push-mode callback the UI will then immediately send the payload to the application with a POST. When the application has finished the request (i.e. answered 200 OK) the Server will automatically delete the payload from the persistent temporary storage again.

Note, the Server may delay the storage into the persistent temporary storage database by a configurable duration (e.g. 500ms) and if the application has confirmed the reception of the payload before this duration they payload will never be stored. This behavior is transparent to the USER.

Push mode can be setup separately for each user and application.

The UI push the following message on the payload arrival:

    URL: https://UI-host[:port][url-prefix]/rest/callback/payloads/ul
    URL: https://UI-host[:port][url-prefix]/rest/callback/payloads/ul_early

Method: POST \
Direction: Server->Application

The message body contain the following JSON object. For the payloads_ul(complete) type message the following JSON is received:

```JSON
    {
        "early": false,         // true: payloads_ul(early), false: payloads_ul(complete)
        "DevEUI": "hex",        // DevEUI of source device
        "dataFrame": "AB==",    // raw (encrypted) payload in base64 format
        "port": 1,              // MAC port the message was receive on
        "timestamp": "2015-02-11T10:33:00.578Z",    // time of reception in GMT
        "fcnt": 138,            // uplink FCNT (needed for decryption)
        "rssi": -111,           // RSSI from gateway
        "snr": -6,              // SNR from gateway
        "sf_used": 8,           // used spreading factor
        "id": 278998,           // unique identifier (64-bit) of payload.
        "live": true,           // indicate if the message is live, or
                                // resent from the temporary storage
        "session_id": "session-uuid", // session ID under which the packet was received
        "decrypted": false      // set true if the UI decrypted the payload,
                                //  false if the message is still encrypted.

        "gtw_info": [        // see note below.
            {"gtw_id": "0000000012340000", "rssi": -100, "snr": 5 },
            {"gtw_id": "0000000012350000", "rssi": -90, "snr": 15 },
            ...
        ],

        "latitude": 34,
        "longitude": 30,
        "altitude": 0
    }
```

When the application subscribes to the early type message, the following JSON is provided:

```JSON
    {
        "early": true,         // indicate if message is early or complete type
        "DevEUI": "hex",        // DevEUI of source device
        "dataFrame": "AB==",    // raw (encrypted) payload in base64 format
        "port": 1,              // MAC port the message was receive on
        "timestamp": "2015-02-11T10:33:00.578Z",    // time of reception in GMT
        "fcnt": 138,            // uplink FCNT (needed for decryption)
        "sf_used": 8,           // used spreading factor
        "id": 278998,           // unique identifier (64-bit) of payload.
        "live": true,           // indicate if the message is live, or
                                // resent from the temporary storage
        "session_id": "session-uuid", // session ID under which the packet was received
        "decrypted": false      // set true if the UI decrypted the payload,
                                //  false if the message is still encrypted.
    }
```


The gtw_info field is only present for accounts that have the “can access network gateway info” right. It contains a list of all gateways that receive the uplink message, and the signal quality data associated with it. The gateway ID can be used to query the gateway location through the gateway API.

The application must acknowledge the POST request by returning on of the following return values:

| Status value    | Meaning  | Description                                                                                                                                                                                           |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200             | OK       | The application has taken the payload and the UI can delete it from the persistent temporary storage                                                                                                |
| 202             | Accepted | The application received the payload but will not process it. The UI must leave the payload in the persistent temporary storage so it can be read out later via the “pull” interface using the GET. |
| Any other value | ERROR    | The UI will keep the payload in the persistent storage.                                                                                                                                             |

The behavior on any error is tbd. Current implementation ignores error and will not retry but will continue to push new messages. Error behavior will be detailed in later release.



### Downlink Payload Status Callback {#sec:pushPayloadDl}

When a downlink payload transmission has completed (successfully or unsuccessfully) the Server inform the application (if the application has registered for push mode) with message with the downlink delivery status.

    URL: https://application-host[:port][url-prefix]/rest/callback/payloads/dl
Method: PUT \
Direction: Server->Application

The message body contains the following JSON object:

```JSON
    {
        "DevEUI": "hex",            // DevEUI of the receiving device
        "id": 252,                  // unique ID of the dl payload
        "data": "ABC=",             // Optional*,the payload data sent
        "fcnt": 10,                 // the used downlink FCNT
        "port": 1,                  // the used port
        "tag": "optional-tag-string",
        "transmissionStatus": 0,
        "session_id": "UUID"       // session ID when packet was created
    }
```

The status of the downlink payload can be read in the transmissionStatus field, see table in @sec:postDownlink for a definition of the status values.

The application must acknowledge the PUT request by returning on of the following return values:

| Status value | Meaning | Description                                          |
| ------------ | ------- | ---------------------------------------------------- |
| 200          | OK      | The application has read the downlink payload status |


### Downlink Multicast Status Callback {#sec:pushMulticast}

When a multicast payload transmission has completed (successfully or unsuccessfully) the Server inform the application (if the application has registered for push mode) with message with the downlink delivery status.

    URL: https://application-host[:port][url-prefix]/rest/callback/multicast
Method: PUT \
Direction: Server->Application

The message body contains the following JSON object:

```JSON
    {
        "groupid": "mulitcast-group-name",
        "id": 252,            // unique ID of the dl payload
        "fcnt": 10,            // the used downlink FCNT
        "port": 1,            // the used port
        "tag": "optional-tag-string",
        "transmissionStatus": 0,
    }
```

The status of the multicast payload can be read in the transmissionStatus field, see table in @sec:postDownlink for a definition of the status values.

The application must acknowledge the PUT request by returning on of the following return values:

| Status value | Meaning | Description                                          |
| ------------ | ------- | ---------------------------------------------------- |
| 200          | OK      | The application has read the downlink payload status |



### Device Info Update Callback{#sec:pushNodeinfo}

When device info is updated (e.g. the downlink FCNT is changed) and the application has registered for push message, the UI will send a message with the device information to the application.

    URL: https://application-host[:port][url-prefix]/rest/callback/nodeinfo
Method: PUT \
Direction: Server->Application

The message contains the following JSON object:

```JSON
{
    "DevEUI": "hex",               // DevEUI of source device
    "device_status": 3,
    "last_reception": "timestamp", // time when device was last seen in GMT time
    "dl_fcnt": 45,                 // last used downlink FCNT
    "device_class": 0,             // 0: class A, 1: class B, 2: class C
    "registration_status": 1,
    "expiry_time_uplink": 168,     // ul payload expiry time in hours
    "expiry_time_downlink": 168    // dl payload expiry time in hours
}
```

See @sec:getDevice for definition of *device_status* and *registration_status* values.
The application must acknowledge the PUT request by returning on of the following return values:

| Status value    | Meaning | Description                                                                                                                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200             | OK      | The info was received by the UI                                                                                                                                                   |
| Any other value | ERROR   | The behavior on any error is tbd. Current implementation ignores error and will not retry but will continue to push new messages. Error behavior will be detailed in later release. |


### Device Status Update Callback {#sec:pushStatus}

When the device status from a device has been received by OrbiWAN and an application has registered for push mode, the UI send a push notification with the device status update to the application.

    URL: https://application-host[:port][url-prefix]/rest/callback/status
Method: PUT <bt>
Direction: Server->Application

The message body contains the following JSON object:

```JSON
    {
        "DevEUI": "hex",    // DevEUI of source device
        "battery_status": 0,    // value from LoraWAN specification,
                    // 0: connected to power source,
                    // 1..254: battery level 1 being minimum and
                    // 254 being maximum,
                    // 255: not possible for the device to measure
                    // battery level
        "margin_status": 0,    // demodulation SNR [dB]for the DevStatusReq
                            // command message received
        "timestamp_status": "2015-02-06T10:43:23.331Z", // UTC time last report
        "req_status": 2        // 0: never updated, 1: update requested,
                            // 2: request pending, 3: result ready
    }
```

The application must acknowledge the PUT request by returning on of the following return values:

| Status value    | Meaning | Description                                                                                                                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200             | OK      | The info was received by the UI                                                                                                                                                   |
| Any other value | ERROR   | The behavior on any error is tbd. Current implementation ignores error and will not retry but will continue to push new messages. Error behavior will be detailed in later release. |


### Join Callback {#sec:pushJoin}

When a device is registering on OrbiWAN using the JOIN procedure and the AppKey is NOT provided to the UI, the UI will forward the JOIN request to the application for it to authenticate, generate keys and encrypt the join accept message.

Note, there is no pull mode version of the join callback, hence push modem must be enabled at all times for join procedure device to be able to join the network, unless the AppKey has been registered on the UI in which case the internal Join Server will manage the JOIN procedure autonomously.

The join procedure has real-time constraints and the application must answer back to the UI within < 3 seconds.

    URL: https://application-host[:port][url-prefix]/rest/callback/join
Method: PUT \
Direction: Server->Application

The message body contains the following JSON object:

```JSON
{
    "DevEUI": "hex",            // DevEUI (8 bytes) of source device
    "appeui": "hex",            // AppEUI (8 bytes) of source device
    "join_request": "base64",   // raw join request message from device
    "join_accept": "base64",    // unencrypted join accept message to
                                // be encrypted
    "session_id": "uuid"        // integer session ID
}
```

The application (or UI) must perform the MIC check on the raw join request message using the AppKey. If the MIC is valid the application can extract the DevNonce from the join request message, the AppNonce, NetID and DevAddr from the unencrypted join accept message and use these values together with the AppKey to create the two session keys, NwkSKey and AppSKey.

The AppKey is then used to calculate the MIC of the join accept message and finally used to encrypt the join accept message.

The details of join request and join accept frame formats are specified in [1] section 6.2.3 “Join procedure”.

The session_id returned must be stored and associated with the generated AppSKey. After the JOIN sub-sequent uplinks received will be tagged with this session_id and the application knows that is must use the new AppSKey to decode the messages.

There are circumstances where the join fails (related to varies security attach methods) and the old session is kept. In this case the application will see that sub-sequent uplink payloads received will continue to use the previous session_id. In this case the application should use the previous appskey for the message decoding.

The encoded join accept message and the generated Network session key (NwkSKey) is then passed back to the OrbiWAN in the message body of the answer to the request. The answer JSON object is as follows:

```JSON
{
    "DevEUI": "hex",        // DevEUI (8 bytes) of source device
    "join_accept": "base64",     // encrypted join accept message to send
                    // back to the joining device
    "nwkskey": "hex"           // Generate network session key (16-bytes)
}
```

Return values:

| Status value | Meaning        | Description                                                                                                   |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------- |
| 200          | OK             | The join request MIC is ok and a valid join accept message and nwkskey is available in the JSON message body. |
| 403          | Forbidden      | The DevEUI is not known and this device is not allowed to join                                                |
| 406          | Not acceptable | The DevEUI is known, but the MIC check failed.                                                                |



### Join-Info Callback {#sec:pushJoinInfo}

When a device is joining the network and the JOIN procedure is managed by the internal join server, the Server will send a number of Join-Info message to the application to inform the application that the device has send a JOIN REQ message, and whether the device has been accepted on the network. Further a second message will be sent by the Server if and when the device has cleared the three-phase join phase by having send a valid uplink message using the new keys from the JOIN procedure.

    URL: https://application-host[:port][url-prefix]/rest/callback/joininfo
Method: PUT \
Direction: Server->Application

The message body contains the following JSON object:
``` JSON
{
    "DevEUI": "hex",    // DevEUI (8 bytes) of source device
    "appeui": "hex",    // AppEUI (8 bytes) of source device
    "join_status": "JOIN_ACCEPTED",
    "session_id": "uuid"
}
```



The join_status field can have the following values:

| Join_status   |    Description |
| ------------- | -------------- |
| JOIN_FAILURE_BAD_MIC | A JOIN request was received from a device with the DevEUI but failed the authentication check (i.e. the MIC value is wrong)       |                                           |
| JOIN_ACCEPTED        | A JOIN request was received and the MIC is ok, and the network has sent back a JOIN_ACCEPT message to the device        |                                                     |
| JOIN_FAILURE_BAD_MIC | A join request was received from a device with the DevEUI but failed the authentication check (i.e. the MIC value is wrong)     |                                             |
| JOIN_NOT_PROCESSED   | The UI was not able find a source for the Appkey. This can happen if a Join server is used and is not available at the time of the JOIN.     |                              |
| JOIN_COMPLETE        | The device completes the JOIN ACCEPT procedure and has successfully send an uplink to the network using the new key         |                                                 |
| JOIN_ABORTED         | The status is sent if the device after sending a JOIN continued to transmit using it “old” NwkSKey that was used before the JOIN (if the device was active before the JOIN). |
This can happen if a device tried to send a re-JOIN message but did not receive the JOIN ACCEPT and then continue to transmit data with the old key.|

Another reason for this message can also be that a JOIN replay-attach is being perpetrated on the network.



The application should respond with the following return value:

| Status value | Meaning | Description             |
| ------------ | ------- | ----------------------- |
| 200          | OK      | The status was received |


### Geo-Location Info Callback {#sec:pushLocation}

When a device has Lora Geo-Location enabled, the location solver will make location estimates for the devices on the received uplinks. Not every uplink will result in a new location estimate. When a new estimate is available, the network push the new location estimate to the application.

    URL: https://application-host[:port][url-prefix]/rest/callback/location
Method: PUT \
Direction: Server->Application

The message body contains the following JSON object:
```JSON
{
    "DevEUI": "hex",              // DevEUI (8 bytes) of source device
    "latitude": 46.207390,
    "longitude": 6.155835,
    "loraloc_time": "timestamp",  // timestamp of location estimate
    "loraloc_fcnt": 123           // FCNT of last uplink used in
                                  // lora location estimate

}
```

The application should respond with the following return value:

| Status value | Meaning | Description             |
| ------------ | ------- | ----------------------- |
| 200          | OK      | The status was received |


### Alarm Callback {#sec:pushAlarm}

When an issue is detected, the Server will push an alarm message. The alarm message contains an alarm_type that gives information about the kind of issue. Also a severity field (in accordance with the syslog severity) is also present to indicate if the alarm is an error, warning, info, etc.

    URL: https://application-host[:port][url-prefix]/rest/callback/alarm
Method: POST \
Direction: Server->Application

The message body contains the following JSON object:
```JSON
{
    "timestamp": "ISO8601",             // time of the alarm
    "severity": "warning",              // see table below
    "category": "devices",        // see table below
    "alarm_code": "UPLINK_WITHOUT_ADR", // see table below
    "DevEUI": "hex",            // when applicable
    "gtw_id": "hex",            // when applicable
    "userid": "userid",          // when applicable
    "alarm_text": "textual description of alarm"    // when applicable
}
```

The **severity** can have the following values:

| Severity | Description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| alert    | Action should be taken immediately                                               |
| critical | Critical conditions	Hard device errors.                                          |
| error    | Error conditions                                                                 |
| warning  | Warning conditions                                                               |
| notice   | Conditions that are not error conditions, but that may require special handling. |
| info     | Informational messages                                                           |
| debug    | Messages that contain information normally of use only when debugging a program. |


The **category** can have the following values:

| Category     | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| devices      | the alarm is related to a device. The DevEUI of the device is always available in the message |
| gateways     | the alarm is related to a gateway. The gateway ID is always available in the message          |
| applications | the alarm is related to the application associated to the account                             |
| accounts     | the alarm is related to the owning account.                                                   |
| system       | for administrator only                                                                        |


The **alarm_code** can have the following values:

| Alarm code         | Category | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UPLINK_WITHOUT_ADR | devices  | An uplink message was received without the ADR bit set and the device's connectivity profile does has the allow_non_adr = false. In this case the uplink is not forwarded to the application, nor is it stored. Only this message is sent. For the device to work normally, a service profile having a connectivity profile with allow_non_adr set must be assigned to the device. The DevEUI of the device is present in the message. |

The application should respond with the following return value:

| Status value | Meaning | Description            |
| ------------ | ------- | ---------------------- |
| 200          | OK      | The alarm was received |



### Push Mode Start {#sec:pushModeStart}

When an application wants to receive push messages from the Server it must first implement a HTTPS host interface that can be reached from the Server and identified by a hostname or IP address. The application can then register the interface on the UI and start push mode, which will cause the Server to push any new payload or update in status directly to the application host interface. The application must implement the paths specified in previous sections for each of the different types of push messages.

To register and start the push mode service the following message is used:

    URL: https://UI-host[:port] /rest/pushmode/start
    URL: https://UI-host[:port] /rest/pushmode/start/{application-id}
Method: PUT \
Direction: Application->Server \
Optional queries: strict=[true,false], update_only=[true,false]

Note, applications accounts can only call */rest/pushmode/start*. An account can start push from the account itself or directly start push for one of its application sub-accounts via */rest/pushmode/start/{application-id}*. The application sub-account must exist before calling start, it is not created by this call.

The message body must contain a JSON object with the following parameters:
```JSON
{
    "host": "hostname",      // Hostname or IP address
                             // of UI HTTPS host interface
    "port": 1234,            // port number of UI HTTPS host interface
    "path_prefix": "/abc",   // path prefix

    "auth_string": "string", // see below
    "push_auth_access_token": "authentication-token",   // for Bearer HTTP authentication
    "push_auth_username": "username",
    "push_auth_password": "password",

    "push_auth_cert": "certificate-pem",
    "push_auth_key": "private-key-pem",
    "push_auth_passphrase": "pem-passphrase",

    "retry_policy": 0,       // for future use, must be set to zero
    "data_format": "hex",    // hex, base64 or decoded_json. Default is base64.
    "push_subscription": "payloads_ul,payloads_dl,nodeinfo,alarm"
}
```
The host name must be prefixed by "http://" or "https://" for REST style push, or "mqtt://" or "mqtts://" for connection MQTT broker.

The Server will use the *auth_string directly* as the argument of the "Authorization" http header tag. I.e. the *auth_string* must contain the complete argument (e.g. "Basic base64"). The *auth_string* is mutually exclusive with *push_auth_access_token* and *push_auth_username*/*push_auth_password*. Only on of the three types of authentication can be specified at any given time.

The Server will push messages to the host and port specified in the JSON object. The path_prefix is added in front of the /rest/… path allowing the application host interface to be implemented in a sub-path on a shared host.

The **push_subscription** is a comma separated string with the list of types of push notification the application want to receive. The available types are:

* payloads_ul_early
* payloads_ul
* payloads_dl
* multicast
* status
* nodeinfo
* joininfo
* join
* alarm

Each of the above type correspond to the notification types described in the table at the beginning of this chapter.

It is possible to only update the push server information without starting the push. Setting the ?update_only=true query will update settings but will not change the current state (i.e. start or stop) the push mode.


The Server will return one of the following values:

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | The push mode registration was successful. Push mode is now started.                     |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 400          | Bad request  | The JSON object is not valid                                                             |

### Push Mode Stop

When the application no longer can receive push messages (e.g. if the application is stopped or restarted) it should deregister from the Server and the Server will stop sending push message.

    URL: https://UI-host[:port] /rest/pushmode/stop[/{application-id}]
Method: PUT \
Direction: Application->Server

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Push mode is stopped                                                                     |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |

### Push Mode Status

To check the status of the current settings of pushmode,

    URL: https://UI-host[:port] /rest/pushmode/status[/{application-id}]
Method: GET \
Direction: Application->Server

The following object is returned.

```JSON
{
    "enabled": true,
    "host": "https://lora.orbiwise.com",
    "port": 443,
    "path_prefix": "/v1/networks/ubiq/uplink",

    "auth_string": "",                                  // optional
    "push_auth_access_token": "authentication-token",   // for Bearer HTTP authentication
    "push_auth_cert": "certificate-pem",
    "push_auth_key": "private-key-pem",
    "push_auth_passphrase": "pem-passphrase",

    "retry_policy": 0,
    "data_format": "base64",
    "push_subscription": "payloads_ul,payloads_dl,nodeinfo"
}
```

### Push Mode Connections {#sec:pushmodeConnections}

Get list of connections to current user.

    URL: https://UI-host[:port] /rest/pushmode/connections
    URL: https://UI-host[:port] /rest/pushmode/connections/{application-id}
Method: GET \
Direction: Application->Server

This API returns the list of connections and subscriptions for both WebSocket and MQTT as well as enabled push notification via http/https to a URL. The fields in the returned object depends on the connection type. When the API is called from an account, all connections from all application sub-accounts and the account itself are returned. If the API is called by an application, only the connections for that application is returned.

The following object is returned:

```JSON
[
    {
        "type": "websocket",
        "appid": "app-id",   // application sub-account ID, if not present the user account itself.
        "status": "",        // for brkoer clients only
        "connection_time": "ISO8601-timestamp", // time of connection (websocket or mqtt only)
        "subscription": "payloads_ul,payloads_dl,nodeinfo", // see section on subscription
        "remote_address": "ip-address",         // remote IP address for websocket and MQTT host-mode connections
        "url": "https:/xx.com",                  // for url http/https push only
        "error": "error-message"
    },
    ...
]
```

The connection **type** can be one of the following:

| type         | Description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| websocket    | A connection from an external application is made via websocket                                    |
| mqtt         | A connection from an external application is made via MQTT (host-mode MQTT, see @sec:mqttHostMode) |
| url          | Rest push mode is enabled for                                                                      |
| mqtt-client  | Push via MQTT to external broker is enabled (client-mode MQTT, see @sec:mqttClientMode).           |
| kafka-client | Push via KAFKA to external broker is enabled.                                                      |

**appid** is the name of the application sub-account, if not present it means the connection is directly on the user account.

**status** can be one of "connecting", "connected" or "error". When "connected" it means that a working connectiong between the Server and the broker is establised. The **status** is only available for some connection types.

Note: more fields may be returned for each connection but only the above specified fields should be used by any application as other fields may change and disappear without warning.

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | result is returned as JSON object                                                        |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |


### Push Mode Log

Get log

    URL: https://UI-host[:port] /rest/pushmode/log

Method: GET \
Direction: Application->Server

The content has the following format:

```JSON
[
    {
        "evt": "ErrorWebSocketConnect",
        "ts": "2019-05-30T14:08:41.611Z",
        "txt": ""
    },
    ...
    {
        "evt": "ErrorPush",
        "ts": "2019-05-30T14:08:41.611Z",
        "DevEUI": "1234567812345678",
        "app": "my-app",
        "txt": ""
    }
]
```

The **evt** field contains the log entry type, the **ts** is the timestamp of when the log was recorded, and the **txt** is a text field with additional information about the entry. Where relevant the application sub-account id is provided in the **app** field, and when the message is relevant to one particular device, the **DevEUI** is set to the device DevEUI value.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | result is returned as JSON object                                                        |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |


### Set Push Mode Log Level

Get list of connections to current user.

    URL: https://UI-host[:port] /rest/pushmode/loglevel?log_level=info&duration_in_hours=24

Method: PUT \
Direction: Application->Server

Possible values for log_level are:

| value | Description                                |
| ----- | ------------------------------------------ |
| error | log only errors and rare events. (default) |
| info  | log all push messages                      |

When a log level above **error** is set, it will only remain set for a duration of time, after which it will automatically go back to the error level.

**NOTE** only messages pushed via HTTP/HTTPS push mode are logged. Messaged pushed via WebSocket and MQTT are currently not logged, however the connection and disconnection events to both WebSocket and MQTT are logged (at all log levels).

Default interval if not specified is 24 hours. Setting **duration_in_hours** on the query can allow to set the duration up to one week. Longer periods are not allowed (except for users with SysAdmin rights that can set any duration).


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | result is returned as JSON object                                                        |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |



### Get Push Mode Log Level

Get list of connections to current user.

    URL: https://UI-host[:port] /rest/pushmode/loglevel?log_level=info

Method: GET \
Direction: Application->Server

```JSON
{
  "log_level": "info",
  "until": "2019-09-11T11:50:38.862Z"
}
```

The default level is "error" that will log only errors and rare events.

The the *until* field above is only shown for elevated logging (i.e. info) and show the time until the logging level will automatically be set back to *error* level.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | result is returned as JSON object                                                        |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |



### Repush an uplink payload

[DMM]

If some received payloads have not been successfully delivered to one or more applications, typically due to connection problem between application and UI, the payload can be "pushed" again.

    URL: https://UI-host[:port] /rest/pushmode/test/payload_ul/{DevEUI}/{payloadid}[?failed_only=true]

Method: POST \
Direction: Application->Server

This API takes no payload. If called without *failed_only" query option, the UI will push the payload to all enabled push applications accounts, regardless if data was already received and acknowledged. This is mainly intended to testing that connection to an application server is working.

When called with *failed_only=true* query option, the UI will not push to applications that have already acknowledged reception.

The API returns with a list of status codes from each push target (when pushing with REST). If push to an application server that was previously marked as failed, but now succeed, the status of the payload for this application will be updated and will not be pushed again, if this api as called again with *failed_only=true*

To see status of delivery of a payloads, see @sec:getPayloadsUl

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | result is returned as JSON object                                                        |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |



## Push-Mode – Push via Web Socket

The REST based on callback push mode described in the previous sections require that the application that registers for push has a public IP address can be accessed by the Server. For applications running behind NAT or firewall this may not be possible.

To support push-mode for applications with these constraints a second push-mode, push via WebSocket, is available. A WebSocket (RFC6455) is standard Internet protocol that is used between web-browsers and the web-servers to establish a bi-directional link to exchange data.

As it is very commonly used in “normal” Internet web pages chances are good that varies firewall and corporate access policies will allow access of this kind.

A web socket is established from the application with a connection to the server. The connection is setup with standard WebSocket header (which is basically HTTP). As for all request to the UI, the basic authentication scheme is used, and the “Authorization” header field must be provided as described in @sec:pushModeDescription.

Once the connection has been setup, the connection will remain open until the application closes the connection again. It is up to the application to re-establish the connection if the connection fails.

Web sockets are message base meaning that the receiver side always receives a block of data at the same size as it was sent (unlike stream-based connections like TCP message boundaries are not guaranteed).

Push via web socket is setup per user (as for Push with REST callback) but unlike the latter it is possible to have more than one web socket push connection per user. Applications can also send downlink (and multicast) via the websocket.

### Setup Web Socket Connection

The application establishes the connection using a standard web socket connector.

URL: wss://UI-host[:port] /websocket/connect [?push_subscription=payloads_ul,payloads_dl]

Once established successfully the Server will start to push messages the application. Each message is contained in JSON object. The ?push_subscription= URL query argument can be used to specify which messages the application wish to received. Please see sections @sec:pushModeStart for available topics to subscribe to.

The following messages are used. Please refer to the listed sections for the details of the message and for the details for the inner JSON message body.



| JSON body                            | Comment                |
| ------------------------------------ | ---------------------- |
| ```{ "payloads_ul_early": {...} }``` | see @sec:pushPayloadUl |
| ```{ "payloads_ul": {...} }```       | see @sec:pushPayloadUl |
| ```{ "payloads_dl": {...} }```       | see @sec:pushPayloadDl |
| ```{ "multicast": {...} }```         | see @sec:pushMulticast |
| ```{ "nodeinfo": {...} }```          | see @sec:pushNodeinfo  |
| ```{ "status": {...} }```            | see @sec:pushStatus    |
| ```{ "join": {...} }```              | see @sec:pushJoin      |
| ```{ "joininfo": {...} }```          | see @sec:pushJoinInfo  |
| ```{ "location": {...} }```          | see @sec:pushLocation  |
| ```{ "alarm": {...} }```             | see @sec:pushAlarm     |



### Downlink via Web Socket

An application can also send a downlink via the web socket.

```JSON
    {
        "payloads_dl": {
            "confirmed": true,
            "DevEUI": "aabbccdd00000000",
            "data": "aabbcc",
            "port": 10,
            "data_format": "base64" | "hex",        // optional, default to base64
            "fcnt": 12,                             // optional
            "mode": "fail_on_busy",                 // optional, default to enqueue_on_busy
            "session_id": "uuid-of-session",        // optional,
            "tag": "request-tag"                  // optional
        }
    }
```

The **tag** field can be filled by the application with a identifier for that the request that allow the application to associate response to this request. The Server will include this tag on all message related to this downlink message.

Upon reception of the message the Server will, if there is no error in the message, immediately send back on the same WebSocket the following reply:

```JSON
    {
        "payloads_dl": {
            "DevEUI": "hex",            // DevEUI of the receiving device
            "id": 252,                  // unique ID of the dl payload
            "fcnt": 10,                 // the used downlink FCNT
            "port": 1,                  // the used port
            "transmissionStatus": 0,
            "session_id": "UUID",       // session ID when packet was created for OTAA devices
            "tag": "request-tag"
        }
    }
```

See @sec:postDownlink for the values of *transmissionStatus*

In the event of an error, the Server will send back the following error object:

```JSON
    {
        "error": {
            "tag": "request-tag",           // reference to requesting message
            "error_msg": "error message",
            "status_code": 404              // REST style status code, e.g. 404 not found
        }
    }
```


### Send multicast message via WebSocket

An application can send multicast message via WebSocket, by sending the following JSON message on the WebSocket.

```JSON
    {
        "multicast": {
            "groupid": "group-id",
            "data": "aabbcc",
            "port": 10,
            "data_format": "base64" | "hex",        // optional, default to base64
            "fcnt": 12,                             // optional
            "mode": "fail_on_busy",                 // optional, default to enqueue_on_busy
            "tag": "free-text-tag"                  // optional
        }
    }
```


```JSON
    {
        "multicast": {
            "groupid": "group-id",      // multicast group id
            "id": 252,                  // unique ID of the dl payload
            "fcnt": 10,                 // the used downlink FCNT
            "port": 1,                  // the used port
            "transmissionStatus": 0,
            "session_id": "UUID",       // session ID when packet was created
            "tag": "request-tag"
        }
    }
```

The transmissionStatus (see @sec:postDownlink for definition of the status values) is set to zero indicating that the payload have been enqueued. Note this message is only send back on MQTT and not pushed in general (i.e. applications listening for REST or Web-Socket will not receive this message).

In the even of an error, the following error object is sent:

topic: **username/multicast**

```JSON
    {
        "error": {
            "tag": "request-tag",           // reference to requesting message
            "error_msg": "error message",
            "status_code": 404              // REST style status code, e.g. 404 not found
        }
    }
```

## Push-Mode – Push via MQTT

[DMM]

The Server can push data to applications via MQTT in two different modes; Host-mode where the UI itself is the MQTT broker and the applications must connect directly to the MQTT broker of the UI; And Client-mode where UI will connect as a client to an external MQTT broker and publish data to the external broker. The data exchanged in either mode is the same but there are some differences in the way to use the two modes and some differences in topic names.

### MQTT - Client Mode {#sec:mqttClientMode}

In client mode, the Server will open and maintain a connecting to a external MQTT broker. To create the connection, an application sub-account must be created. The application sub-account is then configure to push data to the MQTT broker. This is done using the /rest/pushmode/start command (see @sec:pushModeStart). The protocol name of the host must be set to mqtt:// or mqtts:// (for tls version of MQTT). The MQTT broker may require username/password, which can be provided to the pushmode/start command. Similarly, some brokers can rely on key authentication and requires the client connection be made with certain key/cert pair. This can equally be specified in the pushmode/start command.

Below is an example of starting connection to a MQTT broker.
```JSON
PUT /rest/pushmode/start

{
    "host": "mqtts://mybroker.mydomain.com",
    "port": 8883,

    "push_auth_username": "myusername",
    "push_auth_password": "mypassword",

    "data_format": "hex",
    "push_subscription": "payloads_ul,payloads_dl,nodeinfo,alarm"
}
```

As soon as this command has been execute, the Server will establish and maintain the connection to the broker and start to push the subscribed messages to the broker. Once the connection is no longer needed, the /rest/pushmode/stop command should be invoked.

The Server will automatically maintain the connection to the broker. If the broker go down for a while and the Server gets disconnected (either by protocol or simply by timeout), the Server will continue to try to reestablish the connection. It should be noted that the Server will apply a backoff scheme that will increase the period between retries. Hence if the broker has been down for a long time (days) it may take several minutes before the Server reconnect after the broker is back up. For short broker disruptions the reconnection time is almost instant.

Please see @sec:pushModeStart for more details of the /rest/pushmode/start command.

Once the broker is connected the Server will push data to the subscribed topics. The application must also connect its own client to the broker and subscribe to the needed topics. The names of the topics differ between client-mode and host-mode. In client mode the following topics are used.

    payloads_ul_early
    payloads_ul
    payloads_dl
    multicast
    nodeinfo
    status
    join	(* not currently available
    joininfo
    location
    alarm

These are the same topics as used in the push_subscription. The JSON payloads for the message is shown later in this chapter.

### MQTT - Host mode {#sec:mqttHostMode}

In host mode the Server publish data to its own builtin MQTT broker. In this case the application must connect it MQTT client directly to the UI. The UI support both MQTT and MQTTs (TLS connection) protocols. To connect, the application must provide the username (for normal user accounts) or UUID (for application sub-accounts) and password from the account.

Once the client is connected, the application must subscribe to the topics it wish to receive.

Unlink in the case of the Client-mode, in host-mode the topics that are published to and subscribed to are prefixed with the name of the account. Account-ID is the username for a normal user account, and the UUID for an application sub-account.

The available topic are:

	Account-ID/payloads_ul_early
	Account-ID/payloads_ul
	Account-ID/payloads_dl
	Account-ID/multicast
	Account-ID/nodeinfo
	Account-ID/status
	Account-ID/join	( not currently available)
	Account-ID/joininfo
	Account-ID/alarm

The first part of the channel name must be the username that was used to make the connection. Attempting to set another username will result in an authorization error on the subscription.

Once a subscription has been made the Server will send message to the application using the above listed channels. The payloads are in the same JSON format as their REST push versions. The REST message is encapsulated in an outer object with the name of the message type. I.e.:


### Default MQTT topics and JSON Message body {#sec:mqttMessages}

The message body of the varies topics published on MQTT are identical to the messages pushed via REST and all other protocols, except that the JSON body is further encapsulated in an outer object with the same name as the topic. The lift of and message body JSON objects are shown in the table below.

| MQTT topic                     | JSON body                            | Comment                |
| ------------------------------ | ------------------------------------ | ---------------------- |
| [Account-ID/]payloads_ul_early | ```{ "payloads_ul_early": {...} }``` | see @sec:pushPayloadUl |
| [Account-ID/]payloads_ul       | ```{ "payloads_ul": {...} }```       | see @sec:pushPayloadUl |
| [Account-ID/]payloads_dl       | ```{ "payloads_dl": {...} }```       | see @sec:pushPayloadDl |
| [Account-ID/]multicast         | ```{ "multicast": {...} }```         | see @sec:pushMulticast |
| [Account-ID/]nodeinfo          | ```{ "nodeinfo": {...} }```          | see @sec:pushNodeinfo  |
| [Account-ID/]status            | ```{ "status": {...} }```            | see @sec:pushStatus    |
| [Account-ID/]join              | ```{ "join": {...} }```              | see @sec:pushJoin      |
| [Account-ID/]joininfo          | ```{ "joininfo": {...} }```          | see @sec:pushJoinInfo  |
| [Account-ID/]alarm             | ```{ "alarm": {...} }```             | see @sec:pushAlarm     |






### Downlink via MQTT {#sec:mqttDownlink}

Downlink can be sent to a device via MQTT. Downloads must be sent to the following topics:

topic: **username/send_payloads_dl** for client-mode and **send_payloads_dl** for host-mode


```JSON
    {
        "payloads_dl": {
            "confirmed": true,                      // optional, defaults to true
            "DevEUI": "aabbccdd00000000",
            "data": "aabbcc",
            "port": 10,
            "data_format": "base64" | "hex",        // optional, default to base64
            "fcnt": 12,                             // optional
            "mode": "fail_on_busy",                 // optional, default to enqueue_on_busy
            "session_id": "uuid-of-session",        // optional,
            "tag": "request-tag"                    // optional
        }
    }
```

Upon reception of the downlink message, provided there are no errors, the UI immediately send back the following message:

topic: **username/payloads_dl** for client-mode and **payloads_dl** for host-mode

```JSON
    {
        "payloads_dl": {
            "DevEUI": "hex",            // DevEUI of the receiving device
            "id": 252,                  // unique ID of the dl payload
            "fcnt": 10,                 // the used downlink FCNT
            "port": 1,                  // the used port
            "transmissionStatus": 0,
            "session_id": "UUID",       // session ID when packet was created
            "tag": "request-tag"
        }
    }
```

The transmissionStatus (see section @sec:postDownlink for valid values) is set to zero indicating that the payload has been enqueued. Note this message is only send back on MQTT and not pushed in general (i.e. applications listening for REST or Web-Socket will not receive this message).

In the even of an error, the following error object is sent:

topic: **username/payloads_dl** for client-mode and **payloads_dl** for host-mode.

```JSON
    {
        "error": {
            "tag": "request-tag",           // reference to requesting message
            "error_msg": "error message",
            "status_code": 404              // REST style status code, e.g. 404 not found
        }
    }
```


### Multicast via MQTT

Multicast message can be sent via MQTT by sending the following message:

topic: **username/send_multicast** for client-mode and **send_multicast** for host-mode

```JSON
    {
        "multicast": {
            "groupid": "group-id",
            "data": "aabbcc",
            "port": 10,
            "data_format": "base64" | "hex",        // optional, default to base64
            "fcnt": 12,                             // optional
            "mode": "fail_on_busy",                 // optional, default to enqueue_on_busy
            "tag": "free-text-tag"                  // optional
        }
    }
```

topic: **username/multicast** for client-mode and **multicast** for host-mode

```JSON
    {
        "multicast": {
            "groupid": "group-id",      // multicast group id
            "id": 252,                  // unique ID of the dl payload
            "fcnt": 10,                 // the used downlink FCNT
            "port": 1,                  // the used port
            "transmissionStatus": 0,
            "session_id": "UUID",       // session ID when packet was created
            "tag": "request-tag"
        }
    }
```

The transmissionStatus (see @sec:postDownlink for valid values) is set to zero indicating that the payload has been enqueued. Note this message is only send back on MQTT and not pushed in general (i.e. applications listening for REST or Web-Socket will not receive this message).

In the even of an error, the following error object is sent:

topic: **username/multicast** for client-mode and **multicast** for host-mode

```JSON
    {
        "error": {
            "tag": "request-tag",           // reference to requesting message
            "error_msg": "error message",
            "status_code": 404              // REST style status code, e.g. 404 not found
        }
    }
```



### Topic customization

The topic names used with MQTT are fully customizable and are controlled by special tags assigned to the account used. This applies both to client mode and host mode. The tags used to control the MQTT (and topics for other broker types as well) are tags prefixed with ***broker_topic_***. Each topic can be customized by appending the topic name, e.g. ***broker_topic_payloads_ul***. A special tag ***broker_topic_any*** apply to all topics and can be used to change all topics with a single tag. Individual tag customization always has priority over ***broker_topic_any***.

The topic customization use parameter substitution which allow topics to be generated dynamically. The parameters that can be substituted are the general parameters defined in section @sec:customTags as well as all the parameters that are inside the message being pushed.

The default topics as mentioned in the previous sections are actually defined with tags as follows:

For host mode:

```
"broker_topic_any": "${userid}/${topic}"
```

and for client mode:
```
"broker_topic_any": "${topic}"
```

Some application server prefer to switch topics based directly on the *DevEUI* and it may be needed to provide the *DevEUI* in the topic path. This can be done this way:

```
"broker_topic_any": "${DevEUI}/${topic}"
```

Some application servers may require different specific topics. For example is a server expect a topic like this:  "uplink/aabbccdd00000000/120/data" (i.e.: uplink/{DevEUI}/{port}/data), that can be defined like this:

```
"broker_topic_payloads_ul": "uplink/${DevEUI}/$(port)/data"
```

As mention in previous section, the JSON payload also contains the topic by default. The JSON object is by default an outer object with onle inner object with the name of the topic. E.g.

```
{
    "topic": {
        body of topic
    }
}
```

This can be customized too with the ***broker_json_topic_*** prefixed tags. Similar to the MQTT topics, it is possible to customise each topic individually as well as set a default using ***broker_json_topic_any***.

By default the following is defined:

```
"broker_json_topic_any": "${topic}"
```

The json topic can be customized in anyway using the same substitution as for the MQTT topic. To completely remove the JSON topic, and send directly the body of the topic, the topic can be set to a period ".". Like this:

```
"broker_json_topic_any": "."
```

In this case the message sent on MQTT will have directly the message body as the message, i.e.:

```
{
    body of topic
}
```

Finally, the topic customization also works for the downlink topics where the application server is sending data back to OrbiWAN. Downlink is described in more detail in section @sec:mqttDownlink.

The downlink topics are ***send_payloads_dl*** and ***send_multicast***. These topics are customized exactly like the other topics. When parameter substitution is used, some of the parameters that is otherwise provided in the payload can be extracted from the topic.

For example, in the above example with the DevEUI in the path i.e.:

```
"broker_topic_any": "${DevEUI}/${topic}"
```

When a downlink is set to e.g. aabbccdd00000000/send_payloads_dl, the DevEUI is automatically extracted from the topic path and inserted into the body JSON. In this case it is not necessary to add the DevEUI in the body.

This can apply also to all the other parameters. For example:

```
"broker_topic_send_payloads_dl": "${DevEUI}/${port}/downlink"
```

In this example if we send to the topic: "aabbccdd00000000/120/downlink", the DevEUI and the port number is automatically extracted from the topic and inserted into the body of the message, and we don't need to provide them in the JSON.

This can in some cases be very convenient when integrating with application servers that use the topics directly to exchange these kind of information.

The inner json topic for the downlink topics are also controlled as for all other topics, so if setting the ***broker_json_topic_any*** or ***broker_json_send_payloads_dl*** to a period ("."), then the downlink JSON must be provided directly in the body of the MQTT message without the JSON topic object.



## Push Customization

Push notification is the "normal" way to receive data and status update from the Server. The information is normally pushed to a dedicated applications that is able to process the message directly from the Server. However often it is also desirable to push the information directly to some standard platform that is not designed to meet the standard format from the Server, or may required some additional information to identify the device and/or user.

The Server push mechanism has some customizability to configure which messages are send (i.e. the subscription), how the target URL is generated, and what is included in the message body (for payloads).

This section describes these topics.

By default the URL use to send (REST based) push notifications is generated in the following way:

```
    http(s)://${host}:${port}{$path_prefix}
```

The ${} notation is used for variable substitution and in this case the *host*, *port* and *path_prefix* are the values set in pushmode/start API described in earlier sections. The topic_path depend on the type of message being pushed. The values are as follows:

| Topic             | topic_path        | default subscription | default URL                                               |
| ----------------- | ----------------- | -------------------- | --------------------------------------------------------- |
| payloads_ul_early | payloads/ul_early | disabled             | POST https(s)://host:port/rest/callback/payloads/ul_early |
| payloads_ul       | payloads/ul       | enabled              | POST https(s)://host:port/rest/callback/payloads/ul       |
| payloads_dl       | payloads/dl       | enabled              | PUT https(s)://host:port/rest/callback/payloads/dl        |
| multicast         | multicast         | enabled              | PUT https(s)://host:port/rest/callback/multicast          |
| nodeinfo          | nodeinfo          | enabled              | PUT https(s)://host:port/rest/callback/nodeinfo           |
| status            | status            | enabled              | PUT https(s)://host:port/rest/callback/status             |
| join              | join              | *)                   | PUT https(s)://host:port/rest/callback/join               |
| joininfo          | joininfo          | enabled              | PUT https(s)://host:port/rest/callback/joininfo           |
| location          | location          | **)                  | PUT https(s)://host:port/rest/callback/location           |
| alarm             | alarm             | disabled             | POST https(s)://host:port/rest/callback/alarm             |

The join message is only sent when the Sever cannot find other means to process the join (i.e. no key nor join server specified).\
Only for devices that have geo-location enabled.

By default all notifications are send, except for the payloads_ul_early, are sent when the event occur. But for applications that does not need or does not understand some of the messages, the subscription field in the pushmode/start message should be specified to select only the needed messages.

Typically for use-cases where payloads from as sensor should stored on some standard IoT platform, only the payloads_ul topic is relevant and the other messages should be disabled.

### URL customization

The URL with the target server for the messages is specified in the pushmode/start message (please see section @sec:pushModeStart for the pushmode/start API) and set the following parameters

| Parameter   | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| host        | host address (domain name or IP address) and the protocol (http:// or https://) |
| port        | port on the host                                                                |
| path_prefix | prefix added before standard topic path or complete path                        |

Example:

```
    "host": "https://my.domain.com",
    "port": 9000,
    "path_prefix", "/UI_callback_api"
```

Will result in the Server pushing to the following URL for uplink message:

```
    POST https://my.domain.com/UI_callback_api/rest/callback/payloads/ul
```

This is the case when the the path_prefix contain a simple string. But the path_prefix can also contain parameters that are substituted dynamically and it is possible to completely control the format of the whole URL to avoid the standard "/rest/callback/payloads/ul" part of the URL.

Parameter substitution is done with the following format ${parameter-name} where parameter-name is one of the following:

| Parameter-name | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| DevEUI         | DevEUI of the device for which the push notification is being made                                                 |
| devaddr        | DevAddr of the device for which the push notification is being made                                                |
| devtags.xx     | Custom tag 'xx' from the device for which the push notification is being made                                      |
| usertags.yy    | Custom tag 'yy' from the owner account that is making the push                                                     |
| topic          | The topic of the push message (see table above)                                                                    |
| topic_path     | The topic path of the push message (see table above)                                                               |
| skip_topic     | Returns empty string, but also remove the standard path from the URL and using only the path from the path_prefix. |

Example:

```
    "host": "https://my.domain.com",
    "port": 9000,
    "path_prefix", "/UI_callback_api/${DevEUI}"
```

Will resolve to (for a device with DevEUI=1234567812345678):

```
    POST https://my.domain.com/UI_callback_api/1234567812345678/rest/callback/payloads/ul
```

The following example illustrate how to customize the complete path:

```
    "host": "https://my.domain.com",
    "port": 9000,
    "path_prefix", "${skip_topic}/UI_callback_api/uplink?DevEUI=${DevEUI}"
```

resolve to:

```
    POST https://my.domain.com/UI_callback_api/uplink?DevEUI=1234567812345678
```

Notice how the *\${skip_topic}* in the path_prefix removes the standard */rest/callback/\${topic_path}* from the URL, making it possible to completely customizing the URL. This allows also to add query options (e.g. options after the '?') to the URL.

### Custom tags {#sec:customTags}

It may often be needed to use additional information to identify devices and or users on some application platforms. I.e. some platforms may identify a device by some other ID than the DevEUI, that is normally used on the Server. Some platforms may assign devices with an UUID or other ID that is required as part of the push notification in place of or in addition to the DevEUI.

Similar for the account identification, a user account may need to present some additional ID as part of the push notification to be correctly identified.

To accommodate such requirements the UI has a feature of associating custom tags to both individual devices and to the owner account. These tags can be referenced by parameter substitution and hence can be used in the push notification URL.

Example:

Assign the following tags to a device:

```
    PUT /rest/nodes/1234567812345678

    {
        "tags": {
            "asset-id": "4dbba5dd-3284-4ec6-af67-25ddfe781e18",
            "group": "sensors"
        }
    }
```

These can be used in the URL as:

```
    "host": "https://my.domain.com",
    "port": 9000,
    "path_prefix", "${skip_topic}/UI_callback_api/uplink?DevEUI=${DevEUI}&asset=${devtags.asset-id}&group=${devtags.group}"
```

This resolves to:

```
    POST https://my.domain.com/UI_callback_api/uplink?DevEUI=1234567812345678&asset=4dbba5dd-3284-4ec6-af67-25ddfe781e18&group=sensors
```

Notice how tags associated with the device is resolved at runtime and the all device tags can be accessed using *\${devtags.xx}* where xx is the name of the tags. The names of the tags can be specified as any name as long as it uses only letters, number and the following symbols "-_.".

Tags for user accounts are used in the same way using the *\${usertags.yy}* substitution, where yy is the name of the tag that has been associated with the owning account. Note the usertags are liked to the owning account for the devices. That means that if an application sub-account is used for the push, the referenced tags are those of the actual user account not the application sub-account.

### Push HTTP Header

The Server will always make HTTP/HTTPS request using a properly formatted HTTP/1.1 request header with all HTTP header fields correctly set. This includes the common types such as "Content-Type" and "Content-Length", etc. E.g.:

```
Content-Type: application/json
content-Length: 139
Host: my-host.com:10080
Connection: keep-alive
```

Sometime it is required to provide additional header to e.g. identify a device directly from the header (where not possible to provide this information in the URL), e.g:

```
Content-Type: application/json
...
One-Custom-Header-Device-DevEUI: 1234567812345678
Another-Header-Account-Id: 4c8ab358-7f28-4471-872b-f55aff806d89
```

To enable this, some special tags can be use. These tags can be set on either the device, the application sub-account, or the account that own the device.

To generate a header like the above, tags prefixed with "push_header_" and followed by the exact name of the header field, are used. These can be set on the user/application sub-account used to push the messages. E.g.:

```
PUT /rest/applications/my-push-app

{
    ...

    "tags": {
        "push_header_One-Custom-Header-Device-DevEUI": "${DevEUI}",
        "push_header_Another-Header-Account-Id": "4c8ab358-7f28-4471-872b-f55aff806d89"
    },

    ...
}
```

In this example the two headers are added and the Server will when pushing data it will add these two headers to the message. The content of the header fields are parsed by the normal keyword substitution function so as to be able to use variable names such as the DevEUI of the current device, as is described in section @sec:customTags.

Note, only custom headers can be set in this way. Setting standard protocol headers (such as Content-Type, Accept, Content-Length, etc.) is not allowed and will return an error when trying to set the tags.


### Message body

As specified in the previous sections, each push notification message has different payloads, but the payload is predefined. There are a few customizations possible that can be set in the *data_format* parameter in the /pushmode/start API.

This field currently have the following three values:

| data_format  | Meaning                                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base64       | Default. Message binary payloads given in base64 format string (https://tools.ietf.org/html/rfc4648)                                                                                                     |
| hex          | The message binary payload is in hex encoded string.                                                                                                                                                     |
| decoded_json | Only valid for payloads_ul and payloads_ul_early topics. Replace the normal message body with the content of the *decoded* field. If no *decoded* field is present the pushed object is an empty object. |

The "decoded_json" option will substitute the normal message body of a payloads_ul/payloads_ul_early with only the JSON of a decoded payloads, meaning that the message pushed has only the decoded valies of the sensor and no other "LoRa" related parameters. This can make integration with generic IoT platform easier in some cases.

Example:

An temperature sensor device that will normally push an uplink message like this (shortened):

```JSON
{
    "confirmed":true,
    "cr_used":"4/5",
    "dataFrame":"AACq",
    "decrypted":true,
    "devaddr":279387178,
    "dr_used":"SF7BW125",
    "fcnt":5,
    "freq":865572500,
    "id":1553768623768,
    "port":8,
    "rssi":-69,
    "session_id":"be20388f-3ee2-4d38-9794-bce44a28d8c0",
    "sf_used":7,
    "snr":9,
    "time_on_air_ms":51,
    "timestamp":"2019-03-28T10:23:43.768Z",
    "decoded": {
        "temperature": 19.5,
        "humidity": 25
    }
}
```

Will instead just push :

```JSON
{
    "temperature": 19.5,
    "humidity": 25
}
```

The content of the decoded object is specified by the associated payload decoder (see @sec:pluginFunctions on plugin functions) and can be customized to contain any fields.


## Groups and Multicast

Groups are used to organize devices and can be used to query a subset of the devices for both reading status, but also to update device parameters.

Groups are also used to send downlink data for multicast devices. If a group is to be used for multicasting, the group must have the **nwkskey** parameter set.

### Creating a new group

Add a new group to an account. The group is created empty. After creating the group can be assigned to devices.

    URL: https://UI-host[:port] /rest/groups

Method: POST \
Direction: Application->Server

The following JSON object must be provided to create the group.

```JSON
{
    "groupid": "group-id",         // mandatory
    "title": "group title",	       // mandatory
    "comment": "text description", // [optional]

    // multicast parameters
    "nwkskey": "hex-key",       // [optional]
    "appskey": "hex-key",       // [optional]
    "devaddr": 12345,
    "fcnt": 0,                  // [optional]

    "data_rate": 0,             // [optional]
    "freq": 868.1,              // [optional]
    "ping_slot_periodicity": 1, // [optional, for class B only]

    "applications": "appid1,appid2"  // [optional]
}
```

The applications field holds the list of applications that can access the group. Note, an application can only access device in the group that are also assigned to the application, i.e. having access to a group does not give access to the devices of the group, these must be added separately. Except for multicast downlink, in this case all devices in the group will be addressed in the multicast downlink, regardless if the application has access to the devices or not.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Group was added successfully                                                             |
| 400          | Bad request  | Something wrong with the JSON message                                                    |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | forbidden    | Application sub-accounts cannot create groups.                                           |
| 409          |              | Group ID already exists.                                                                 |

### Get group(s) info

    URL: https://UI-host[:port] /rest/groups
    URL: https://UI-host[:port] /rest/groups/{group-id}

Method: GET \
Direction: Application->Server

Read group properties. When specifying a group-id a single object is returned. If no id is specified on the URL an array with all groups is returned.

```JSON
{
     "groupid": "group-id",	        // mandatory
     "title": "group title",	    // mandatory
     "comment": "text description", // optional
     "nwkskey": "hex-key",          // mandatory if group used for multicast
     "appskey": "hex-key",          // optional
     "fcnt": 0,			            // optional

     "applications": "appid1, appid2",	// optional

    // Class B multicast only
    "ping_slot_periodicity": number,
    "data_rate": number,
    "freq": number
}
```

```JSON
[
    { "groupid": "group-id", "title": "my group 1", "comment": "text description"},
    ...
]
```


The list can be filtered by the following query filters:

* **application={app-id}**, when this query is set, the devices associated to the specified application is returned.
* **search_id=group-id-string**, will filter the groups according groupid name. The text is automatically “wildcarded” at both ends.
* **search_title=partial_title**, text search of partial title



| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Group was added successfully                                                             |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Not Found    | Group not found.                                                                         |



### Delete a group

Delete group from an account.

    URL: https://UI-host[:port] /rest/groups/{group-id}

Method: DELETE \
Direction: Application->Server

Deleting a group does NOT delete the devices, the devices remains registered under the account and can be assigned to another group.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Group was deleted successfully                                                           |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    | Application sub-accounts cannot delete groups.                                           |
|404 | Not Found | Group not found.

### Update a group

Update group information.

    URL: https://UI-host[:port] /rest/groups/{group-id}

Method: PUT \
Direction: Application->Server

Change parameters of a group.

```JSON
{
     "groupid": "group-id",
     "comment": "text description",

     "nwkskey": "hex-key",
     "appskey": "hex-key",
     "fcnt": 0
}
```

Note, when changing the group-id subsequent references to the group will be only through the new id.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Group was changed successfully                                                           |
| 400          | Bad request  | Something wrong with the JSON message                                                    |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    | The application sub-account used does not have rights to change group parameter.         |
| 404          | Not Found    | Group with group-id not found.                                                           |





## Application Sub-Accounts

Application sub-accounts can be added to user account (the “owning account”) and is used to associate a sub-set of the owning accounts devices. The application sub-account has its own auto generated credentials that can be safely provided to an application without giving access to the owning accounts credentials. Application sub-accounts created from the UI uses the password given when creating the application sub-account.

The application sub-account functions seamlessly as a normal user or user account, but give the application access to only the associated subset of devices. The other devices remain invisible to the application sub-account. Also, the rights of the application sub-account can be set to subset of the owning account, meaning that the application can be restricted to not see certain data (like location, gateway info, etc.), while the owning account may have these rights.

Application sub-account ids are only unique within the same owning account.

Application sub-accounts use the same basic authentication scheme as normal account with the exception that where owning accounts have unique account names, the application sub-account names are unique only within the same user account.

Therefore, the account UUID can be used as the user-name for the basic authentication. The UUID is returned on the POST of the account creation (see @sec:postApplication). The UUID is also used in the topic subscription and for MQTT.

Alternatively, the basic authentication user-name can also be constructed in the following way (for convenience):

	#app.{app-account-name}#{user-account-name} (e.g. “#app.myapp#myuser”)

However, this notation only works for the REST API and cannot be used with MQTT and possibly other future broker systems. It is therefore recommended to use the UUID method.

### Create new application sub-account {#sec:postApplication}

Create a new application sub-account under the owning account.

    URL: https://UI-host[:port] /rest/applications
Method: POST \
Direction: Application->Server

The parameters are like those of the owning accounts, except that administration rights cannot be assigned to an application sub-account and the account is “read-only” meaning that application sub-account cannot modify its own parameters.

The parameters that can be set are:

```JSON
{
    "accountid": "application-id",// name or id of application
    "password": "passwd",		// password, optional, if not provided, it
                                 // is auto generated.
    "can_register": true,		// can administer device
    "can_access_gtw_info": true,	// will receive info about
                                // gateways that received messages
                                // and can query position
                                // of general gateways
    "can_own_gtw": true,		// can own gateways
    "can_add_gtw": false,		// can add/remove gateways
    "can_mng_gtw": false,		// can manage setting on gateway
    "loraloc_enable": true		// can enable lora location on
            					// devices
}
```

Unlike the owning account name that must be globally unique, the application sub-account name must be unique only within the owning account.

Once created the following object is returned:

```JSON
{
    "accountid": "application-id",// name or id of application given in the
					  //request
    "app_uuid": "APP.UUID",
    "password": "passwd"
}
```

The app_uuid field value returned is the auto generated user credential created to be used when accessing the account via the REST API. The password return on the return object must be read and stored as it cannot be queried again.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Application was added successfully                                                       |
| 400          | Bad request  | Something wrong with the JSON message                                                    |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    | Account does not have administration rights                                              |
| 409          |              | Application ID already exists.                                                           |

### Get application sub-account info {#sec:getApplication}

Get application sub-account information from the owning account.

    URL: https://UI-host[:port] /rest/applications[/{<application-id >}]
Method: GET \
Direction: Application->Server

Read the parameters of an application sub-account, or all application sub-accounts. When querying an account, the following object is returned.

```JSON
{
    "accountid": "application-id",
    "app_uuid": "APP.UUID",
    "can_register": true,		// can administer device
    "can_access_gtw_info": true,
    "can_own_gtw": true,		// can own gateways
    "can_add_gtw": false,		// can add/remove gateways
    "can_mng_gtw": false,		// can manage setting on gateway
    "loraloc_enable": true,	    // can enable lora location on
            					// devices
}
```

When querying for all accounts, an array of the above object is returned:

```JSON
    [ {"accountid": "application-id",

    … },{
    … }]
```

Optional filters:
* "all=true" returns all additional information about the application, incl. push mode status. When this query is included all field from the /rest/pushmode/status is included in the message.


| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | User was added successfully                                                              |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    |
| 404          | Unknown      | Unknown application-id in URL.                                                           |


### Modify application sub-account info

Modify an application sub-account

    URL: https://UI-host[:port] /rest/applications/{app-id}
Method: PUT \
Direction: Application->Server

Modify parameters of an application sub-account. All parameters listed in @sec:postApplication can be modified except the “accountid” that cannot be changed.

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Command was successful                                                                   |
| 400          | Bad request  | Something wrong with the JSON message                                                    |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    | Account does not have administration rights to modify target user                        |
| 404          | Unknown      | Unknown application-id in URL.                                                           |


### Delete application sub-account

Delete an application sub-account

    URL: https://UI-host[:port] /rest/applications/{app-id}

Method: DELETE \
Direction: Application->Server

Delete application sub-account. When an application sub-account is deleted, no devices gets deleted, but reference to the application from the device is automatically removed, and if the application gets created again the association of devices to application has to be done again.

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | User was added successfully                                                              |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Not found    | Application sub-account is not known.                                                    |


## Gateway API
### Get List with Information about Gateways

Get list with information about all gateways associated to an account.

    URL: https://UI-host[:port] /rest/gateways
Method: GET \
Direction: Application->Server

A JSON payload with the following content is returned:

```JSON
[
    {
        "id": "0000000008050313",
        "name": "313 Labo",
        "address": {},
        "latitude": 46.21025,
        "longitude": 2.922363,
        "antenna_gain": 3,
        "position_valid": true,
        "status": "OK",
        "backhaul_type": "WIRED",
        "backhaul_cell_operator": "",
        "backhaul_cell_rssi": "N/A"
    },
    …
]
```

Return values

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Command was successful                                                                   |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |




### Get Information about a Gateway

Get information about a particular gateway. If the gateway is associated to the account, the full list of information is returned. If the account has can_access_gtw_info right, this command can be used to query any gateway in the network, however, only the location (latitude / longitude) information is provided.

    URL: https://UI-host[:port] /rest/gateways/{gateway-id}
Method: GET \
Direction: Application->Server

The following JSON message is returned for devices that is associated to the account:

```JSON
    {
        "id": "0000000008050313",
        "name": "313 Labo",
        "address": {
            "address": "my street",     // optional
            "city": "Geneva",           // optional
            "zipcode": "1200",          // optional
            "country": "switzerland"    // optional
        },
        "latitude": 46.21025,
        "longitude": 2.922363,
        "antenna_gain": 3,
        "position_valid": true,
        "status": "OK",
        "backhaul_type": "Wired",
        "backhaul_cell_operator": "",
        "backhaul_cell_rssi": "N/A"
    }
```

For gateways that are not associated, but for accounts with can_access_gtw_info rights, the following is returned:

```JSON
    {
        "id": "0000000008050313",
  "latitude": 46.21025,
        "longitude": 2.922363
    }
```

Return values

| Status value | Meaning         | Description                                                                              |
| ------------ | --------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK              | Command was successful                                                                   |
| 400          | Bad request     | Something wrong with the JSON message                                                    |
| 401          | Unauthorized    | The username/password used in the basic authentication scheme is invalid or not present. |
| 404          | Unknown gateway | The gateway with gateway-id was not found.                                               |


### Associate gateway with user

Associate a gateway to an account. Once associated, status of this gateway can be queried from the account.

    URL: https://UI-host[:port] /rest/gateways/{gateway-id}
Method: POST \
Direction: Application->Server

This command takes an optional JSON body with properties of the association. Currently no properties are defined but will be added in later releases.

```JSON
{
}
```

Return values

| Status value | Meaning      | Description                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 200          | OK           | Command was successful                                                                   |
| 400          | Bad request  | Something wrong with the JSON message                                                    |
| 401          | Unauthorized | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden    | Account doesn’t have rights to associate the gateway                                     |



### Un-associate gateways

Remove (un-associate) a gateway to an account.

    URL: https://UI-host[:port] /rest/gateways/{gateway-id}
Method: DELETE \
Direction: Application->Server


Return values

| Status value | Meaning         | Description                                                                              |
| ------------ | --------------- | ---------------------------------------------------------------------------------------- |
| 200          | OK              | Command was successful                                                                   |
| 401          | Unauthorized    | The username/password used in the basic authentication scheme is invalid or not present. |
| 403          | Forbidden       | Account doesn’t have rights to associate the gateway                                     |
| 404          | Unknown gateway |




# Profiles

OrbiWan from release 6 uses profiles to manage the increasingly complex set of parameters that are needed to manage devices. Two kind of profiles are assigned to each device. A **device profile** and a **service profile**.

The **device profile** described the device parameters such as the version LoRaWAN MAC, device capabilities, supported regions, etc. The information needed to create a device profile must typically be provided by the device manufacturer. Device profiles can be created by the network operator but can also be created by the users/users. Devices of same kind normally use the same device profile.

The **service profile** defines the way the network will manage the device. This includes the QoS, allowed traffic volume, etc.

This profile is always created by the network operator and is assigned to users. users with elevate rights may in some cases define their own service profiles, but this is not the common case.


When a user register a new device a **device profile** and **service profile** must be selected and provided in the registration message. The user/user can see a list of available profile through the API.

Device Profiles can be created as links and referenced from other accounts. For example a user may create a device profile at the root level of the user account, and then share this profile as links to some of its users. As it is a link, if the root profile is changed, the change will automatically apply to all the linked usages of the profile.

A user can also chose to make profiles at the user level visible to all its user accounts (without using linking). Profiles are managed by a number of APIs, with separate API for each kind of profiles. However all profiles use a very similar API the following section describes the API in general as the same applies to all kinds of profiles. Each particular API is then described in full detail in the subsequent sections.

## Profile API Summary

Profiles are manipulated using the following commands:

```
GET /rest/xx-profiles
GET /rest/xx-profiles?get_schema=true
GET /rest/xx-profiles/{uuid}
POST /rest/xx-profiles
PUT /rest/xx-profiles/{uuid}
DELETE /rest/xx-profiles/{uuid}
```

The rights to access these APIs are governed by the the following account rights:

* can_list_xx_profiles
* can_inspect_xx_profiles
* can_create_xx_profiles
* can_link_xx_profiles

There are different kind of profiles, but they are all managed in similar way, as described in the following sections. The exact details for all the API are described in following separate sections.

The following profiles exists, and the "xx" in all API and rights can be replaced according to following table.


| Name            | "xx"    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Device-Profile  | device  | The **device-profile** describes the common device parameters and capabilities. Each device must be assigned a device profile, and devices of same kind will be assigned the same device profile. The input for this profile is normally provided by the device manufacturer. I contains elements like version of the LoraWAN spec, default frequency values, support for features such as Class B/C mode, etc.                                                                                                                                                                                                                                                       |
| Service-Profile | service | Device are managed by the network according to the **service-profile**. Each device must be assigned a service profile. Often all devices will be assigned the same service profile, but devices with very different requirements in QoS will need different service profiles. Service profiles are generally created only by the operator and normal users can only select from a list of predefined profiles. It is possible to create links of a **service-profile** and apply **restrictions** to the profile essentially "downgrading" the service. The restricted version of service profile can be assigned to devices same way as a "normal" service profile. |



### Create a Profile

Profiles are created with the POST command.

```
    POST /rest/xx-profile
```

``` JSON
    {
        "description": "text description of profile",
        "profile_name": "name-of-profile",
        "notes": "internal notes about this profile",
        "shared_with_all_users": false,

"content": {
            // profile specific fields
        }
    }
```

| Field                 | type    | Description                                                                                                                                      |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| profile_name          | string  | Name of the profile. Mandatory field. Must be valid string of 6 or more characters (up to 64).                                                   |
| description           | string  | Textual description of the profile for convenience                                                                                               |
| notes                 | string  | "private" notes about this profile. The notes field can only be seen by the profile owner.                                                       |
| shared_with_all_users | boolean | Set this flag to make the profile visible to all users belonging to the user. This flag is only valid for profiles created under a user. |
| content               | object  | profile specific parameters                                                                                                                      |


If the profile was created OK, the command will return status 200 and return the following JSON object:

``` JSON
    {
        "profile_uuid": "uuid-of-new-created-profile"
    }
```

The returned UUID of the created profiles is the ID that must be used to reference the profile later.

Return status values:

| Status | Description                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| 200    | Profile created ok. return message contains above JSON object with created UUID.                             |
| 400    | Invalid profile definition. Inspect the returned text string for further clues about the reason for failure. |
| 401    | Unauthorized. Invalid account or password                                                                    |
| 403    | Forbidden. The account does not have sufficient rights for the requested operation.                          |
| 404    | Referenced profiles (for service profile only) not found.                                                    |

### Create a Linked Profile {#sec:createLinkedProfile}

Profiles can be linked across accounts and can be re-linked multiple times (i.e. link to link to link etc.). When a link is created, the account that create the link must have access to both the owning account and target account, which means only administrators can create links across accounts. Links can be create only by accounts that have the **can_link_xx_profiles** right. When a link is created, the right to inspect the content of the profile can be set. If this not set, the target account user will be able to see the profile in the list of profile, but will not be able to see the content (even when having the **can_inspect_xx_profiles** right).

Linked profiles have the exact same properties of the root profile, but can be renamed have different description. Also the sharing for the profile can be set independently of the root profile. If the root profile is changed all linked profiles will automatically get the new properties of the root profile.

The right to create a link to a profile (**can_link_xx_profiles**) is deliberately separate from the right to create a profile (**can_create_xx_profiles**). This a allow a separation in responsibility in where some accounts has the right to create the profiles, which requires some technical insight into LoraWan, and have other accounts be responsible for the assignment of these profiles. In this case a local administrator may be able to create links on varies accounts giving access to profiles already created and tested.

Creating a link uses the same API as creating a profile:

```
    POST /rest/xx-profile
```

However the JSON message body does not contain the actual profile data, but a reference (by UUID) to the profile that is to be linked. The account that is creating the link must have rights to both create a link on the target account, and have right to access the profile on the account where it is being linked from. The message body looks as follows:

``` JSON
    {
        "description": "text description of profile",
        "profile_name": "name-of-profile",

        "shared_with_all_users": false,
        "can_be_inspected": true,
        "userid": "target-user.id",

        "link_to_profile_uuid": "uuid-of-target-profile"
    }
```


| Field                 | type    | Description                                                                                                                                                                                                                        |
| --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| profile_name          | string  | Name of the profile                                                                                                                                                                                                                |
| description           | string  | Textual description of the profile for convenience                                                                                                                                                                                 |
| can_be_inspected      | boolean | If this flag is set, the profile content (of the linked profile) may be viewed via the link (if the account also have the **can_inspect_xx_profiles** right). If set to false, the content of the actual profile cannot be viewed. |
| userid                | string  | Administrators may specify directly the target user ID when assigning links to profile to other users.                                                                                                                             |
| shared_with_all_users | boolean | Set this flag to make the profile visible to all users belonging to the user. This flag is only valid for profiles created under a user.                                                                                   |
| content               | object  | profile specific parameters                                                                                                                                                                                                        |
| link_to_profile_uuid  | string  |


Upon success a JSON object is returned with the UUID of the new profile that is linked to the original profile.

``` JSON
    {
        "copy_from_profile_uuid": "uuid-of-target-profile"
    }
```


### Unlinking profile

An linked profile can be "unlinked" and turned in to a profile by itself. If a profile has the **can_be_inspected** rights set, accounts that has **can_create_xx_profiles** rights, can directly unlink the profile and turn it into a local profile. This profile can then be modified.
This can be done with the *copy_from_profile_uuid*.

```
    PUT /rest/xx-profile{uuid}
```

``` JSON
    {
        "copy_from_profile_uuid": "uuid-of-target-profile"
    }
```

Setting the target profile UUID to the same as the current linked profile, if the


### Profile JSON schema

Profiles are fairly complex JSON object. For convenience it is possible to query a JSON schema object for all the profile types. The schema is always up-to-date and contains both JSON definition and description for all fields.

To query the schema for profile, use the following query:

```
    GET /rest/xx-profiles?get_schema=true
```

The returned scheme applies to direct profile manipulation (i.e. not linked profiles). To get schema for linked profiles use the following query;

```
    GET /rest/xx-profiles?get_link_schema=true
```

## Device Profile

This section the API for Device Profiles. Access to the device profile API controlled by the following rights:

* can_list_device_profiles
* can_inspect_device_profiles
* can_create_device_profiles
* can_link_device_profiles

The individual API are described in the following sections.

### Create Device Profile {#sec:createDevProfile}

Accounts that has the **can_create_device_profiles** and/or **can_link_device_profiles** rights can create new device profiles or link existing device profiles respectively using the following REST command:

```
    POST /rest/device-profiles
```

When creating a new profile, the following parameters must be provided:

``` JSON
{
    "description": "text description of profile",
    "profile_name": "name-of-profile",
    "payload_decoder_js": "javascript code",
    "content":
        {
            "activation": "OTAA",
            "RFRegion": "EU868",
            "MACVersion": "1.0.2",
            "RegParamsRevision": "A",
            "MaxEIRP": 14,
            "DefaultDeviceClass": "CLASS_A",
            "SupportsClassB": true,
            "SupportsClassC": true,
            "transmit_capable_only": false,
            "lora_fcnt32bits": true,
            "dl_max_size_app_payload": 64,
            "dl_max_size_phy_payload": 64,
            "dl_max_num_mac_cmd": 3,
            "dl_max_size_mac_cmd": 16,
            "support_fuota": true,
            "mobile_device": false,
            "persisted_fcnt": "AUTO",
            "persistent_nonce_counters": "AUTO",
            "factory_presets": [
                {
                    "RFRegion": "EU868",
                    "MaxEIRP": 14,
                    "ul_dwell_time": 0,
                    "dl_dwell_time": 0,
                    "adr_ack_limit": 6,
                    "adr_ack_delay": 5,
                    "max_time_between_rejoin_req": 0,
                    "max_num_of_ul_between_rejoin_req": 0,
                    "min_ul_dr_supported": 0,
                    "max_ul_dr_supported": 6,
                    "rx2_dr": 2,
                    "rx2_freq_mhz": 868,
                    "rx1_delay": 1,
                    "rx1_dr_offset": 0,
                    "ping_slot_freq_mhz": 868,
                    "ping_slot_dr": 0,
                    "ping_slot_periodicity": 0,
                    "channels": [
                        {
                            "freq_mhz": 0,
                            "dr_min": 0,
                            "dr_max": 0,
                            "masked": false,
                            "dl_freq_mhz": 433
                        }
                    ],
                    "mask_125khz": "FFFFFFFFFFFFFFFF",
                    "mask_500khz": "FF",
                    "freq_change_not_supported": false
                }
            ]
        }

}
```

The profile specific **content** parameters are described in the table below:

| Field                                               | type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activation                                          | string  | Device activation mode<br>Mandatory. Valid values: "OTAA", "ABP"                                                                                                                                                                                                                                                                                                                                                                      |
| RFRegion                                            | string  | LoRaWAN region<br>Mandatory. Valid values: "EU868", "US915", "AU915", "CN470", "AS923", "AS923-2", "AS923-3", "IN865", "RU864", "JP923"                                                                                                                                                                                                                                                                                               |
| MACVersion                                          | string  | LoRaWAN MAC version<br>Mandatory. Valid values: "1.0.0", "1.0.1", "1.0.2", "1.0.3", "1.0.4", "1.1.1"                                                                                                                                                                                                                                                                                                                                  |
| RegParamsRevision                                   | string  | LoRaWAN MAC regional parameters revision<br>Mandatory. Valid values: "A", "B", "RP002-1.0.0", "RP002-1.0.1", "RP002-1.0.2"                                                                                                                                                                                                                                                                                                            |
| MaxEIRP                                             | integer | Max EIRP [dBm]<br>Set the device max Equivalent Isotropically Radiated Power (EIRP). This is maximum EIRP capability of the device (not necessarily the default value)<br>Mandatory. Valid range: [0;33]                                                                                                                                                                                                                              |
| DefaultDeviceClass                                  | string  | Default class of device after reset<br>Mandatory. Valid values: "CLASS_A", "CLASS_B", "CLASS_C"                                                                                                                                                                                                                                                                                                                                       |
| SupportsClassB                                      | boolean | Supports Class B<br>Mandatory.                                                                                                                                                                                                                                                                                                                                                                                                        |
| SupportsClassC                                      | boolean | Supports Class C<br>Mandatory.                                                                                                                                                                                                                                                                                                                                                                                                        |
| transmit_capable_only                               | boolean | Transmit capable only device cannot receive downlink (i.e. it has no receiver). When this is set the network will never send any downlink towards the device<br>Mandatory.                                                                                                                                                                                                                                                            |
| lora_fcnt32bits                                     | boolean | FCNT 32-bit counter (for 1.0.x devices only)<br>Select the size of the FCNT counter<br>Mandatory.                                                                                                                                                                                                                                                                                                                                     |
| dl_max_size_app_payload                             | integer | Max accepted downlink application payload size [bytes]<br>Mandatory. Valid range: [0;242]                                                                                                                                                                                                                                                                                                                                             |
| dl_max_size_phy_payload                             | integer | Max accepted downlink PHY Payload size [bytes]<br>Mandatory. Valid range: [20;255]                                                                                                                                                                                                                                                                                                                                                    |
| dl_max_num_mac_cmd                                  | integer | Max number of MAC commands in each downlink message<br>Mandatory. Valid range: [2;7]                                                                                                                                                                                                                                                                                                                                                  |
| dl_max_size_mac_cmd                                 | integer | Max accepted size of MAC commands in downlink message [bytes]<br>Mandatory. Valid range: [11;64]                                                                                                                                                                                                                                                                                                                                      |
| support_fuota                                       | boolean | Device support Firmware Update Over The Air (FUOTA)<br>Mandatory.                                                                                                                                                                                                                                                                                                                                                                     |
| mobile_device                                       | boolean | Device is mobile and may be in a new location from uplink to uplink.<br>Optional.                                                                                                                                                                                                                                                                                                                                                     |
| persisted_fcnt                                      | string  | Device persist the FCNT and keep the FCNT value on device reset<br>Mandatory. Valid values: "AUTO", "YES", "NO"                                                                                                                                                                                                                                                                                                                       |
| persistent_nonce_counters                           | string  | Use persistent nonce counters for JOIN. OTAA devices can use either random values or sequential counters that are persisted (i.e. values are never reset even if the power is off the device) for the Nonce in the JOIN procedure. Normally this scheme is determined by the MAC version, however some devices have chosen one scheme or the other regardless of the MAC version used.<br>Optional. Valid values: "AUTO", "YES", "NO" |
| factory_presets[]. RFRegion                         | string  | <br>LoRaWAN region<br>Mandatory. Valid values: "EU868", "US915", "AU915", "CN470", "AS923", "AS923-2", "AS923-3", "IN865", "RU864", "JP923"                                                                                                                                                                                                                                                                                           |
| factory_presets[]. MaxEIRP                          | integer | Max EIRP [dBm]<br>Set the device max Equivalent Isotropically Radiated Power (EIRP). This is default value used for the current region (not necessarily the maximum capability)<br>Mandatory. Valid range: [0;33]                                                                                                                                                                                                                     |
| factory_presets[]. ul_dwell_time                    | integer | Uplink dwell time (AU915, AS923, AS923-2, AS923-3 and JP923 regions only)<br>Set 0 for no constraint, 1 for 400ms<br>Optional. Valid values: 0, 1                                                                                                                                                                                                                                                                                     |
| factory_presets[]. dl_dwell_time                    | integer | Downlink dwell time (AU915, AS923, AS923-2, AS923-3 and JP923 regions only)<br>Set 0 for no constraint, 1 for 400ms<br>Optional. Valid values: 0, 1                                                                                                                                                                                                                                                                                   |
| factory_presets[]. adr_ack_limit                    | integer | ADR_ACK_LIMIT as defined in LoraWan specification<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                    |
| factory_presets[]. adr_ack_delay                    | integer | ADR_ACK_DELAY as defined in LoraWan specification<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                    |
| factory_presets[]. max_time_between_rejoin_req      | integer | Max time between rejoin attempts [seconds] (LoraWan 1.1 only)<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                        |
| factory_presets[]. max_num_of_ul_between_rejoin_req | integer | Max number of uplinks between REJOIN requests (LoraWan 1.1 only)<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                     |
| factory_presets[]. min_ul_dr_supported              | integer | Minumum uplink data-rate supported. This may be needed as some devices use payloads sizes incompatible with the lower datarates.<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                     |
| factory_presets[]. max_ul_dr_supported              | integer | Highest uplink data-rate supported<br>Mandatory. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                                  |
| factory_presets[]. rx2_dr                           | integer | Default data-rate of RX2 downlink slot<br>Mandatory. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                              |
| factory_presets[]. rx2_freq_mhz                     | number  | Default frequency [MHz] of RX2 downlink slot<br>Mandatory. Valid range: [433;930]                                                                                                                                                                                                                                                                                                                                                     |
| factory_presets[]. rx1_delay                        | number  | Default delay [seconds] of RX1 downlink slot after TX slot<br>Optional. Valid range: [1;15]                                                                                                                                                                                                                                                                                                                                           |
| factory_presets[]. rx1_dr_offset                    | number  | Default data-rate offset between uplink and downlink<br>Optional. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                 |
| factory_presets[]. ping_slot_freq_mhz               | number  | Default frequency [MHz] of class B ping-slot. When set to 0 the hopping slot is used.<br>Mandatory. Valid range: [433;930]                                                                                                                                                                                                                                                                                                            |
| factory_presets[]. ping_slot_dr                     | number  | Default data-rate of class B ping-slot<br>Mandatory. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                              |
| factory_presets[]. ping_slot_periodicity            | number  | Class B periodicity of ping-slot<br>Mandatory. Valid range: [0;15]                                                                                                                                                                                                                                                                                                                                                                    |
| factory_presets[]. channels[]. freq_mhz             | number  | Channel frequency [MHz]<br>Mandatory.                                                                                                                                                                                                                                                                                                                                                                                                 |
| factory_presets[]. channels[]. dr_min               | integer | <br>Mandatory. Valid range: [0;8]                                                                                                                                                                                                                                                                                                                                                                                                     |
| factory_presets[]. channels[]. dr_max               | integer | <br>Mandatory. Valid range: [0;8]                                                                                                                                                                                                                                                                                                                                                                                                     |
| factory_presets[]. channels[]. masked               | boolean | channel disabled (masked)<br>Mandatory.                                                                                                                                                                                                                                                                                                                                                                                               |
| factory_presets[]. channels[]. dl_freq_mhz          | number  | Downlink frequency if different from uplink frequency [MHz]<br>Optional. Valid range: [433;940]                                                                                                                                                                                                                                                                                                                                       |
| factory_presets[]. channels                         | array   | Channels Definition<br>Optional.                                                                                                                                                                                                                                                                                                                                                                                                      |
| factory_presets[]. mask_125khz                      | string  | Channel mask for 125kHz channels<br>Optional.                                                                                                                                                                                                                                                                                                                                                                                         |
| factory_presets[]. mask_500khz                      | string  | Channel mask for 500kHz channels<br>Optional.                                                                                                                                                                                                                                                                                                                                                                                         |
| factory_presets[]. freq_change_not_supported        | boolean | Device frequency list is fixed and cannot be changed by network<br>Optional.                                                                                                                                                                                                                                                                                                                                                          |
| factory_presets                                     | array   | Device factory settings<br>If the factory presets are not provided the network will use LoraWan regional default settings for the region.<br>Mandatory.                                                                                                                                                                                                                                                                               |


For creating a link please see @sec:createLinkedProfile.



Return values:

| Status | Description                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| 200    | Device Profile created ok. return message contains above JSON object with created UUID.                      |
| 400    | Invalid profile definition. Inspect the returned text string for further clues about the reason for failure. |
| 401    | Unauthorized. Invalid account or password                                                                    |
| 403    | Forbidden. The account does not have sufficient rights for the requested operation.                          |

### List Device Profiles

Accounts that have **can_list_device_profiles** rights can use the following REST commands to list the available devices profiles accessible by this account.

```
    GET /rest/device-profiles?[query-options]
```

The following query-options are available.

| Query option        | Description                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get_pages           | Get list of page links to be used with paged queries. See section "Paged Queries".                                                                                |
| limit               | Set number of items per page. Used with paged queries. See section "Paged Queries".                                                                               |
| page_state          | Set the page state to start the query from where the previous query finished or jump to any page returned by the *get_pages* option. See section "Paged Queries". |
| paged_results       | Return results in paged format. See section "Paged Queries".                                                                                                      |
| strict              | Force strict parameter and options checking. Should be used during development only and not used in production code.                                              |
| get_schema          | Return the JSON schema used to define a device profile.                                                                                                           |
| search_name         | Return only profiles that match the search criteria on the profile name.                                                                                          |
| search_description  | Return only profiles that match the search criteria on the profile description.                                                                                   |
| search_linked       | set true or false to return only profiles that are linked or not linked                                                                                           |
| search_shared       | set true or false to return only profiles that are shared with all users or not.                                                                                  |
| sort_by_name        | set to asc (ascending) or desc (descending) to sort the result according to the name.                                                                             |
| sort_by_uuid        | set to asc (ascending) or desc (descending) to sort the result according to the profile UUID.                                                                     |
| sort_by_description | set to asc (ascending) or desc (descending) to sort the result according to the profile description.                                                              |
| source_userid       | account from where the profiles should be listed. Only accounts with administration or user_admin rights can use this field.                                  |

Examples:
```
    GET /rest/device-profiles?paged_results=true&limit=100&search_name=myprofile
    GET /rest/device-profiles?get_schema=true
```

```JSON
    [
        {
            "profile_uuid": "UUID-of-profile",
            "profile_name": "name-of-profile",
            "description": "text description of profile",

            "shared_with_all_users": false,
            "link_to_profile_uuid": "uuid-of-target-profile"
        }
        , ...
    ]
```

### Get Specific Device Profile

Accounts that have the **can_list_device_profiles** right can use the following REST command to access the content of a device profile.

```
    GET /rest/device-profiles/{UUID-of-device-profile}
```

If the account has the **can_inspect_device_profiles** right, the full device profile with all parameters is returned. If the account does not have the **can_inspect_device_profiles** right, the **content** object will return a minimal subset of the device profiles with just the following two parameters:

The **MACVersion** field with a reduced version number ("1.0.x" or "1.1.x") and the **activation** field with "ABP" or "OTAA". These two fields allow an application to determine the key-scheme to use to for a device, even if the actual device profile is not visible.


```JSON
{
    "description": "text description of profile",
    "profile_name": "name-of-profile",
    "content":
        {
            "activation": "OTAA",
            "RFRegion": "EU868",
            "MACVersion": "1.0.2",
            "RegParamsRevision": "A",
            "MaxEIRP": 14,
            "DefaultDeviceClass": "CLASS_A",
            "SupportsClassB": true,
            "SupportsClassC": true,
            "transmit_capable_only": false,
            "lora_fcnt32bits": true,
            "dl_max_size_app_payload": 64,
            "dl_max_size_phy_payload": 64,
            "dl_max_num_mac_cmd": 3,
            "dl_max_size_mac_cmd": 16,
            "support_fuota": true,
            "mobile_device": false,
            "persisted_fcnt": "AUTO",
            "persistent_nonce_counters": "AUTO",
            "factory_presets": [
                {
                    "RFRegion": "EU868",
                    "MaxEIRP": 14,
                    "ul_dwell_time": 0,
                    "dl_dwell_time": 0,
                    "adr_ack_limit": 6,
                    "adr_ack_delay": 5,
                    "max_time_between_rejoin_req": 0,
                    "max_num_of_ul_between_rejoin_req": 0,
                    "min_ul_dr_supported": 0,
                    "max_ul_dr_supported": 6,
                    "rx2_dr": 2,
                    "rx2_freq_mhz": 868,
                    "rx1_delay": 1,
                    "rx1_dr_offset": 0,
                    "ping_slot_freq_mhz": 868,
                    "ping_slot_dr": 0,
                    "ping_slot_periodicity": 0,
                    "channels": [
                        {
                            "freq_mhz": 0,
                            "dr_min": 0,
                            "dr_max": 0,
                            "masked": false,
                            "dl_freq_mhz": 433
                        }
                    ],
                    "mask_125khz": "FFFFFFFFFFFFFFFF",
                    "mask_500khz": "FF",
                    "freq_change_not_supported": false
                }
            ]
        }

}
```

The reduced device profile (when the user either doesn't have the **can_inspect_device_profiles** right, or the profile is a link and has the **can_be_inspected** field set false) will return the following object.

```JSON
{
    "description": "text description of profile",
    "profile_name": "name-of-profile",
    "content":
        {
            "activation": "ABP",
            "MACVersion": "1.0.x"
        }
}
```

Note: when checking the MACVersion to determine the key scheme, ONLY the first three bytes of the version should be used (e.g. 1.0 or 1.1). The remaining part of the version should be discarded. 

If the profile is a link to another profile the field **link_to_profile_uuid** will contain the UUID of the linked profile. When the **link_to_profile_uuid** field is not present, it means the profile is not a link but a local profile.

For a detailed description of the parameters, please see @sec:createDevProfile.



### Modify Device Profile

Profiles can be modified using the following command:

```
    PUT /rest/device-profiles/{profile-UUID}
```

Only accounts that have **can_create_device_profiles** and/or **can_link_device_profiles** can use this API.
The PUT command take the same JSON object as the POST command (to create the profile). Please see the API for create device-profile for details on the JSON object. Note, that when modifying a profile, if any profile parameter (other than name and description) is modified, all the parameters must be provided.

Device profiles once in use (i.e. have been assigned to a device) cannot be freely changed in the content part of the profile. If a PUT contains change to parameters that are not allowed to be changed, the command will fail with a 423 (locked) error. The following parameters are safe to change:

```
    "content": {
        "DefaultDeviceClass",
        "SupportsClassB",
        "SupportsClassC",
        "transmit_capable_only",
        "lora_fcnt32bits",
        "dl_max_size_app_payload",
        "dl_max_size_phy_payload",
        "dl_max_num_mac_cmd",
        "dl_max_size_mac_cmd",
        "support_fuota",
        "persisted_fcnt",
        "mobile_device"
    }
```

Changing any of the other parameters not in the above list will cause the request to fail.

Return values:

| Status | Description                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| 200    | Device Profile created ok. return message contains above JSON object with created UUID.                      |
| 400    | Invalid profile definition. Inspect the returned text string for further clues about the reason for failure. |
| 401    | Unauthorized. Invalid account or password                                                                    |
| 403    | Forbidden. The account does not have sufficient rights for the requested operation.                          |
| 404    | Profile not found.                                                                                           |
| 423    | Profile is locked for change on the affected parameters                                                      |


### Delete Device Profile

Profiles can be deleted using the following command:

```
    DELETE /rest/device-profiles/{profile-UUID}
```

Only accounts that has **can_create_device_profiles** and/or **can_link_device_profiles** can use this API.

Return values:

| Status | Description                                                                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200    | Device Profile deleted ok.                                                                                                                                |
| 401    | Unauthorized. Invalid account or password                                                                                                                 |
| 403    | Forbidden. The account does not have sufficient rights for the requested operation.                                                                       |
| 404    | The profile is not found                                                                                                                                  |
| 423    | The profile is locked because it is referenced either by link or by device and cannot be deleted. Remove all reference to the profile before deleting it. |




## Service Profile

This section described the API used to manage **service-profiles**. The following rights governs which service profile API an account can access.

* can_list_service_profiles

The following sections details all API and parameters for service profiles.

### List Service Profiles

Accounts that have **can_list_service_profiles** rights can use the following REST commands to list the available devices profiles accessible by this account.

```
    GET /rest/service-profiles?[query-options]
```

The following query-options are available.

| Query option       | Description                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get_pages          | Get list of page links to be used with paged queries. See section "Paged Queries".                                                                                |
| limit              | Set number of items per page. Used with paged queries. See section "Paged Queries".                                                                               |
| page_state         | Set the page state to start the query from where the previous query finished or jump to any page returned by the *get_pages* option. See section "Paged Queries". |
| paged_results      | Return results in paged format. See section "Paged Queries".                                                                                                      |
| strict             | Force strict parameter and options checking. Should be used during development only and not used in production code.                                              |
| get_schema         | Return the JSON schema used to define a service profile.                                                                                                          |
| search_name        | Return only profiles that match the search criteria on the profile name.                                                                                          |
| search_description | Return only profiles that match the search criteria on the profile description.                                                                                   |
| search_linked      | set true or false to return only profiles that are linked or not linked                                                                                           |
| source_userid      | account from where the profiles should be listed. Only accounts with administration or user_admin rights can use this field.                                  |

Examples:
```
    GET /rest/service-profiles?paged_results=true&limit=100&search_name=myprofile
    GET /rest/service-profiles?get_schema=true
```

If successful the following JSON object is returned:

```JSON
    [
        {
            "profile_uuid": "UUID-of-profile",
            "profile_name": "name-of-profile",
            "description": "text description of profile",

            "shared_with_all_users": false,
            "link_to_profile_uuid": "uuid-of-target-profile"
        }
        , ...
    ]
```

| Status | Description                                                                         |
| ------ | ----------------------------------------------------------------------------------- |
| 200    | Query successful, list of profiles is being returned.                               |
| 401    | Unauthorized. Invalid account or password                                           |
| 403    | Forbidden. The account does not have sufficient rights for the requested operation. |



# Plugin Functions {#sec:pluginFunctions}

The UI has support for inserting small Javascript functions to perform encoding of messages to customizable formats as well as decoder functions to decode the binary payload from a device and translate it into device agnostic data. The functions are provided in Javascript and the UI will execute them when needed.

As the functions are executed in real-time the UI put some restrictions on what is allowed and in general the Javascript function must be short and fast to execute. The UI will accumulate the time spent in a function and if the average time over a period exceed 0.1ms the function will be automatically disabled.

The functions are executed in a "sandbox" which means the usage of library function inside the function is highly restricted.




## Payload Decoding function {#sec:payloadDecoderFunction}

A payload decoding function is used to translate the binary format of a device into a more device agnostic format. E.g. for a temperature sensor, the sensor may send the temperature readings in a binary format that will have to be converted into an actual message field called "temperature" with and value directly in degree centigrade (or any other unit). When a payload have been decoding in this way it is typically possible to forward the data directly to end applications that may not know the exact sensor used (and hence would not understand the binary payload format), but understand the generic "temperature" field and is able to process it.

Note, the decode function is only called for devices that can be decrypted by the network, meaning the network must be able to access the AppSKey.

To help expose the data to varies IoT platforms and frameworks, it is useful (and highly recommended) to provide also a model description of the output from the device. A model describe which parameters is available from the payload decoder. The model can be queried through the Graphite API on the UI so that applications can ask device which kind of data is provided by the device.

E.g. if the device is a temperature sensor it will typically provide the temperature. In this case the model would contain a parameter "temperature" of type "number" with an optional description.

A payload decoding function can be assigned to a device function


```javascript
model = {
    temperature: "number",
    color: "string",
    open: "boolean"
}

decoder = function (uplink, meta) {

    const temp  = (uplink.data[0] + uplink.data[1] * 256) / 10;
    const color = temp > 30 ? "red" : "green";
    const open  = uplink.data[2] == 1 ? true : false;

    const output = {
        json: {
            temperature: temp,
            color: color,
            open: open
        }
    }

    return output;
}
```

The above javascript code must be provided in the *payload_decoder_js* field of a device profile as a properly JSON encoded/escaped string.



The decoder function is called for each payload to decode. The function is called with the following arguments:

```javascript
uplink: {
    data: Buffer, // Buffer object from NodeJS
    fport: 1,     // the port number
    devaddr: 123, // the DevAddr of the device
    fcnt: 2345    // the FCNT of the uplink
}
```

The meta parameter has these fields:

```JS
meta: {
    freq: 868.1,        // received frequency
    rssi: -102,         // RSSI from best received gateway
    snr: 10,            // SNR from best received gateway
    tags: {             // optional tags object on each device
        "user-tag-1": "value"   //
    },
}
```

Note; the object may have more fields - but presently the above fields are the only fields guaranteed to be there.

# Misc API

## Graphite API

The UI support a subset of the Graphite API (https://graphite-api.readthedocs.io/en/latest/). This API is well supported by varies Dashboard tools such as Grafana, and by using this API it is easy to connect a Dashboard directly to the UI and show varies graphs without customizing any tool. It should be noted the exposed API is a subset only and not all features of the API is available.

The Graphite API expose two endpoints:

```
GET /api/graphite/metrics/find
POST /api/graphite/render
```

They are explained in the following sections

### Graphite - Find API

The find API is used for device and parameter discovery. Tools such as Grafana can query on this API to see which devices are available and which particular parameters can be access on the devices. This make it easy to build a dashboard as all available information is presented directly in the tool.

The API is used in the following way:

GET /api/graphite/metrics/find?query=search-path&[format=json]

Where search-path is used to narrow the search. Initially putting the search-path to '\*' will cause the API to return a list of available devices. Asterisk ('\*') wildcards can be used to narrow the search.

Example:

```
    GET /api/graphite/metrics/find?query=70b3*
```

returns e.g.:

```JSON
[
  {
    "text": "70b3d507800008e8",
    "id": "70b3d507800008e8",
    "expandable": 1,
    "leaf": 0,
    "allowChildren": 0
  },
  {
    "text": "70b3d507800008e9",
    "id": "70b3d507800008e9",
    "expandable": 1,
    "leaf": 0,
    "allowChildren": 0
  }
]
```

Once a devices have been selected it is provided again to the API followed by a period ('.') and another ampersand. This will return a list of available parameters:

```
    GET /api/graphite/metrics/find?query=70b3d507800008e8.*
```

This returns:

```JSON
[
  {
    "text": "info",
    "id": "70b3d507800008e8.info",
    "expandable": 1,
    "leaf": 1,
    "allowChildren": 0
  },
  {
    "text": "timeseries",
    "id": "70b3d507800008e8.timeseries",
    "expandable": 1,
    "leaf": 1,
    "allowChildren": 0
  }
]
```

The format of the JSON is in "json" format type of the Graphite find API.

As can be seen, there are two groups of properties on a devices, *info* and *timeseries*. When *expandable* is 1 it means they have additional fields and can be be further explored:

```
    GET /api/graphite/metrics/find?query=70b3d507800008e8.info.*
```

returns:

```JSON
[
  {
    "text": "comment",
    "id": "70b3d507800008e8.info.comment",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "location",
    "id": "70b3d507800008e8.info.location",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "dlfcnt",
    "id": "70b3d507800008e8.info.dlfcnt",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "device_class",
    "id": "70b3d507800008e8.info.device_class",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "DevEUI",
    "id": "70b3d507800008e8.info.DevEUI",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "latitude",
    "id": "70b3d507800008e8.info.latitude",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "longitude",
    "id": "70b3d507800008e8.info.longitude",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  }
]
```

and

```
    GET /api/graphite/metrics/find?query=70b3d507800008e8.timeseries.*
```

```JSON
[
  {
    "text": "fcnt",
    "id": "70b3d507800008e8.timeseries.fcnt",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "rssi",
    "id": "70b3d507800008e8.timeseries.rssi",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "freq",
    "id": "70b3d507800008e8.timeseries.freq",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "snr",
    "id": "70b3d507800008e8.timeseries.snr",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "sf_used",
    "id": "70b3d507800008e8.timeseries.sf_used",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "port",
    "id": "70b3d507800008e8.timeseries.port",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "latitude",
    "id": "70b3d507800008e8.timeseries.latitude",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "longitude",
    "id": "70b3d507800008e8.timeseries.longitude",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "decoded",
    "id": "70b3d507800008e8.timeseries.decoded",
    "expandable": 1,  "leaf": 1,  "allowChildren": 0
  }
]
```

The last element of the timeseries is the decoded object. This element can also be inspected and will return the available decoded parameters from an associated payload decoder.

The elements available here are the ones specified in the *model* object in the payload decoder (see @sec:payloadDecoderFunction on plugin function for the payload decoder).

Example:

```
    GET /api/graphite/metrics/find?query=70b3d507800008e8.timeseries.decoded.*
```

will return the parameters of the payload decoder model, e.g.:

```JSON
[
  {
    "text": "temperature",
    "id": "70b3d507800008e8.timeseries.decoded.temperature",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  },
  {
    "text": "humidity",
    "id": "70b3d507800008e8.timeseries.decoded.humidity",
    "expandable": 0,  "leaf": 1,  "allowChildren": 0
  }
]
```

Note, that the exposed fields are shown above may change in future release. More fields may be added, and the queries will automatically return these new fields.

### Graphite - Render API

The render API is used to return the values for the parameters found with the Find API described above. It is used in this way:

```
    POST /api/graphite/render
    Content-Type: application/x-www-form-urlencoded

    target=471ABD910019003D.timeseries.decoded.temperature&
    target=70b3d507800008e9.timeseries.decoded.humidity&
    from=-24h&until=now&format=json
```

Note, a valid from/until range should always be provided.

It will return:

```JSON
[
  {
    "target": "temperature",
    "datapoints": [
      [
        19.5,
        1553693923
      ],
      [
        19.6,
        1553694664
      ],
      ...
    ]
  }, {
    "target": "humidity",
    "datapoints": [
      [
        25,
        1553693923
      ],
      [
        25,
        1553694664
      ],
      ...
    ]
  }
]
```



# Geo-location Solver

## Using an external Geo-location Solver

By default OrbiWAN use it own embedded TDOA based geo location solver. However it is possible to use 3rd external solvers as part of the normal message flow. The external solver must support the LoraCloud / Collos v2 tdoaMultiframe format.

The v2 TDOA-Multiframe format is specified here:

https://www.loracloud.com/documentation/geolocation?url=v2.html#tdoa-multiframe-request

To configure the system to use the external solver, the destination for the solver must be specified on the account. It can be specified either on the user account owning the device but can also be specified on an application sub-account in case different solvers are used for different devices.

Note: for each device only one solver will be called.

To specify the solver a dedicated tags "geosolver_url" must be assigned to the account. See @sec:customTags for more information about tags and keyword substitution.

Once the geosolver_url tag is present OrbiWAN will forward the geolocation solve request to the solver at the URL. Often the solver will need some additional account information to authenticate the user. Typically this requires additional header fields to be added to the HTTP request.

These additional HTTP header fields can be added by adding additional tags prefixed with "geosolver_header_" followed by the name of the actual header field, e.g. "geosolver_header_MyHeader": "my-content" will add to the HTTP header of the solver request "MyHeader: my-content".

I.e.:

```JSON
"tags": {
    "geosolver_url": "https://my-solver-host/",
    "geosolver_header_my-header-1": "content-for-my-header-1",
    "geosolver_header_my-header-2": "content-for-my-header-2",
}
```




### Example LoraCloud

To configure the solver on a users main account to use the Semtech LoraCloud (previously Collos) the following tags must be set:

PUT https://{instance}/rest/user

```JSON
"tags": {
    "geosolver_url": "https://gls.loracloud.com/api/v2/tdoaMultiframe",
    "geosolver_header_Ocp-Apim-Subscription-Key": "my-loracloud-api-key",
}
```

The Ocp-Apim-Subscription-Key is the custom header required by LoraCloud to access the API. The key must be requested on the LoraCloud.com website.
