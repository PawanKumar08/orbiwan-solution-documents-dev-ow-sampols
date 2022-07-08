---
layout: page
title: Devices Management
menu: guide
lang: en
permalink: 'devices-management.html'
image_path: 'images/DASS/Device_Management_Orbiwise_files/'
image_path1: 'images/DASS/Profile_Management_Orbiwise_files/'
image_path2: 'images/DASS/Data_management_Orbiwise_files/'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
visible: false
---

{:.pageTitle}

# Device Management

## Register Device

<!-- Registering a new device on UI in release 6.0 has 2 ways, either the devices is being registered using  device-profile  (and  service-profile ) or the device is being registered using the direct registration (legacy  method of registration prior to release 6). -->

- Once you login
- Go to **Devices**
- Click on **Manage devices**.
- There will be option to **Add device**.

<img src="{{ page.image_path }}devices_01.png" />

### Add device with profile.

OrbiWan from release 6 uses profiles to manage the increasingly complex set of parameters that are needed to manage devices. Two kind of profiles are assigned to each device.

- **Device Profile** defines a type of device with all the needed parameters. Typically, once a device profile has been defined for one kind of device, e.g. a particular type of temperature sensor, this profile will be used to register all the devices of that kind. This means that there is no need for the owner to enter any of the otherwise complicated LoraWAN parameters that the network needs to be able to correctly control the device.
- **Service Profile** is a profile that is defined by the operator. It details how the device should be managed by the network. I.e. it contains information about things like Quality-of-Service (QoS), allowed network features, such as real-time downlink, Class B and C operations, etc. A user account may have access to several service profiles and can chose the one best fitting the need when registering a device. However, often there is just one default service profile.

Below are the steps to add device with profile

On clicking the **Add Device with profile** button brings up the following pop-up window:

<img src="{{ page.image_path }}ab52107c-3bf0-48ce-b8cf-2d824d331fe3.png" />

When using profiles, the number of fields needed to register a device is far less than when doing direct registration.

When a customer/user register a new device a device profile and service profile must be selected and provided in the registration message

Profiles can be created as links and referenced from other accounts. For example a customer may create a device profile at the root level of the customer account, and then share this profile as links to some of its users. As it is a link, if the root profile is changed, the change will automatically apply to all the linked usages of the profile

## Create Device Profile

We can create Device Profiles:-

- Profiles
- Device Profiles
- Add Device Profile
- Specify the required parameters
- Add Profile

<img src= "{{page.image_path1 }}172898b0-e8cc-4026-b930-d2059f7854a1.png" />

We have to mention whether the device is `OTAA` or `ABP` in the device activation mode field.

The **LoRaWAN MAC** version needs to be selected from a pre-defined list of allowed values.

<img src="{{page.image_path1 }}810f943f-3113-4a63-b6d1-267e02291867.png" />

<img src="{{page.image_path1 }}26ce4957-1fe2-4684-b0eb-e01e8ebb678c.png" />

You can also watch the following videos to see the Device Activation process in action:

### Device Join via ABP Activation

<video width="100%" controls poster="images/GettingStarted/poster_device_registration_abp.png">
    <source src="{{page.video_path}}/aws-marketplace-ow-abp-device-registration.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>

### Device Join via OTAA Activation

<video width="100%" controls poster="images/GettingStarted/poster_device_registration_otaa.png">
    <source src="{{page.video_path}}/aws-marketplace-ow-otaa-device-registration.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>

### List Device Profiles

We can see the list of device profiles in UI. The list of device profiles can be seen from the following steps:

- Login to **UI**
- Profiles
- Device Profiles

<img src="{{page.image_path1 }}fd56b734-df65-4eb0-a8bb-da66e43bf99a.png" />

### Modify Device Profiles

We can also edit the device profile from `UI`. The device profiles can be edited from the following steps:

- Login to **UI**
- Device Profile
- Action (individual profile)
- Edit Profile -Update the required Values
- Update Profile

**Note** :- _The screens for the Create Device Profile and Edit Device Profile are same_.

### Delete Device Profiles

We can delete the device profile from UI. The device profiles can be deleted from the following steps:

- Login to UI
- Profiles
- Device Profile
- Action(individual profile)
- Delete Profile

## Edit Device Parameters

Once a device has been added (registered), the device parameters can still be changed.

<!-- This can be done by following 2 methods, -->

### Edit device from UI

- Select **Edit Device..** option from dropdown in the device list as described in below figure,

<img src="{{ page.image_path }}2a6f57d1-f254-4f66-beff-56256532158e.png"  />

- This will open the same window as for the “Add Device” but with the values filled-in and in “read- only” mode except for the Comment field. A padlock symbol at the bottom left of the page indicates that the values are locked (read-only). See picture below for profile based device:

<img src="{{ page.image_path }}e0500040-8b91-47ef-a5b3-2497ca0d6047.png"  />

<!-- - And the picture below show the same for a device that was registered without Profile.

<img src="{{ page.image_path }}43e5dd68-e2fa-418b-9819-9c080187fdd3.png"  /> -->

- To modify any value (other than the comment field), click on the padlock symbol to unlock the values. Once the device has been unlocked the values can be changed. Values that have been changed will be highlighted with a green frame.

- Invalid input values are marked with a red frame and it will not be possible to accept the changes and update the device until all changed settings are valid (and in green) or reset to the unchanged state.

- Once the changes are complete press “Update Device” to apply the changes.

- A new window will pop up to confirm that the change has been applied.

You can also watch the following video to see the Device Activity process in action:

### Device Activity

<video width="100%" controls poster="images/GettingStarted/poster_device_activity.png">
    <source src="{{page.video_path}}/aws-marketplace-device-activity.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>

## Batch Registration

When many devices must be registered, it is not practical to manually add each device individually via the Add Device UI.

To register many devices in one operation, the UI provides a batch registration feature. Select **Batch registration** from the **Devices** dropdown menu to go to the batch registration view.

<img src="{{ page.image_path }}batch1.png"/>

The batch registration view has a file **drop zone** at the top where a CSV can be dragged and dropped. It is also possible to click on the drop zone to open a file explorer to select the file.

The batch registration view with the file drop zone is shown below.

<img src="{{ page.image_path }}3a662c9e-94bd-4488-939a-e54f3bfce162.png" />

Once a file has been selected or dropped in the drop zone, the file is uploaded and analysed, then a list with devices and their status is shown. See figure below.

<!-- <img src="{{ page.image_path }}0306642b-9b00-41b6-89f1-18105dedcbd1.png"  /> -->

<img src="{{ page.image_path }}Device_profile_batchRegistration.png"  />

To register Profile devices the following parameters must be mentioned in the csv file.

The Mandatory and optional fields for Profile device batch registration which need to be provided in the .csv file are given below:

| Status               | Description |
| -------------------- | ----------- |
| deveui               | Mandatory   |
| device_profile_uuid  | Mandatory   |
| service_profile_uuid | Mandatory   |
| appkey               | Optional    |
| comment              | Optional    |
| lora_device_class    | Optional    |
| activated            | Optional    |

For reference please see the image below:

<img src="{{ page.image_path }}Device_profile_csv.png"  />

The table shows the status of each DevEUI provided in the file. The possible states are:

| Status             | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| Device not found   | The Device is currently unknown on the network [the normal state]. |
| Registered         | The Device is successfully registered                              |
| Already Registered | The Device is already registered on the network.                   |

Check boxes at the beginning of each line can be used to unselect devices that should not be processed under the batch processing.

Press **Register** to start the registration process to add the selected devices to the network. The progress bar above the buttons will show the status of the registration.

Devices can also be deleted using the batch processing by pressing **Delete** to delete all the selected devices in the list.

Once the batch process starts, if there are many devices to process, the process can take a while to complete. It is safe to leave the page and even sign out of the UI. The batch process continues to run until it is completed. It is always possible to sign in again check the status by going back to the batch registration view.

The process can be aborted by pressing the **clear** button. Any devices that has been registered remain registered.

You can also watch the following video to see the Batch Registration process in action:

### Batch Registration Demo

<video width="100%" controls poster="images/GettingStarted/poster_batch_reg.png">
    <source src="{{page.video_path}}/aws-marketplace-device-batch-registration.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>

## Payload Decoder

Payload decoder is a special feature of OrbiWAN which allow decoding(as per configured decoding function by the user) of payload before sending it to end application. Also, help of payload decoder you can integrate Thingsboard with OrbiWAN.

**Prerequisite:**

The decode function is only called for devices that can be decrypted by the network, meaning the network must be able to access the AppSKey.

**How it works:**

The OrbiWAN has support for inserting small Javascript functions to perform encoding of messages to customizable formats as well as decoder functions to decode the binary payload from a device and translate it into device agnostic data. The functions are provided in Javascript and the OrbiWAN will execute them when needed.

As the functions are executed in real-time the OrbiWAN put some restrictions on what is allowed and in general, the Javascript function must be short and fast to execute. The OrbiWAN will accumulate the time spent in a function and if the average time over a period exceeds 0.1ms the function will be automatically disabled.

The functions are executed in a **sandbox** which means the use of library function inside the function is highly restricted.

The functions are associated to the devices with device registration parameter* payload_decoder_js *. When a function is defined, the uplink messages pushed to the applications contain the object that is returned by the function.

It is also possible to make the application push only the decoded object parameters. This can be done by changing the **data_format** of the application with **decoded_json**.

And finally, this is also possible to customize the application URL with device tags so the OrbiWAN will customize the URL to which it pushed for each device. This is often used to connect directly to a dashboard.

### Payload Decoding function

A payload decoding function is used to translate the binary format of a device into a more device agnostic format. E.g. for a temperature sensor, the sensor may send the temperature readings in a binary format that will have to be converted into an actual message field called "temperature" with and value directly in degree centigrade (or any other unit). When a payload have been decoding in this way it is typically possible to forward the data directly to end applications that may not know the exact sensor used (and hence would not understand the binary payload format), but understand the generic "temperature" field and is able to process it.

Note, the decode function is only called for devices that can be decrypted by the network, meaning the network must be able to access the AppSKey.

To help expose the data to varies IoT platforms and frameworks, it is useful (and highly recommended) to provide also a model description of the output from the device. A model describes which parameters are available from the payload decoder. The model can be queried through REST API on the OrbiWAN so that applications can ask device which kind of data is provided by the device.

E.g. if the device is a temperature sensor it will typically provide the temperature. In this case, the model would contain a parameter "temperature" of type "number" with an optional description.

A payload decoding function can be assigned to a device function.

```java
model = {
temperature:"number",
color:"string",
open:"boolean"
}

decoder = function(uplink, meta) {
const temp =(uplink.data[0] +uplink.data[1] *256) / 10;
const color = temp > 30 ? "red": "green";
const open = uplink.data[2] == 1 ? true: false;
const output = {

json:{
temperature: temp,
color: color,
open: open
}}
return output;
}
```

The decoder function is called for each payload to decode. The function is called with the following arguments:

```js
uplink:{
data: Buffer,// Buffer object from NodeJS
fport: 1, // the port number
devaddr: 123,// the DevAddr of the device
fcnt: 2345 // the FCNT of the uplink

}
```

The meta parameter has these fields:

```js
meta:{

freq: 868.1, // received frequency
rssi: -102, // RSSI from best received gateway
snr: 10, // SNR from best received gateway
tags: { // optional tags object on each device

"user-tag-1":"value" //
}
}
```

**Note**: _the object may have more fields - but presently the above fields are the only fields guaranteed to be there._

The easiest way to set the decoder function is to use e.g. postman and use the direct set key option. This allows to write put the decoder function directly as raw text to the OrbiWAN (without having to format it into JSON):

PUT /rest/nodes/{deveui}?key=payload_decoder_js BODY: raw text of the function described above

Alternatively, it can be set as JSON:

**PUT** /rest/nodes/{deveui}
BODY: {"payload_decoder_js:"JSON-escaped-string-with-above-code"}

### Devices tags:

Tags are used to customize the URL to which the OrbiWAN will push, which is required for most of the application platforms.

Tags can be added freely to any device.

**PUT** /rest/nodes/{deveui}
**BODY:**

```json
{
  "tags": {
    "tb-access-token": "23req34erg45rg",
    "tb-device-id": "e450bd92-69f1-491d-b367-390ad1133148"
  }
}
```

The naming of the tags can be chosen freely. Assign the access token values (and optionally the device ID) from the TB(ThingsBoard) platform for each of the devices. Assigning these tags will allow the OrbiWAN to access the values for each device when the push message is getting sent.

Finally, we need to make the URL use the tags. When using the "decoded_json" mode, the OrbiWAN will not append any path to the push prefix path. The prefix path will essentially be the complete path used for the push.

We can now use parameter substitution in the path to making the OrbiWAN insert the correct path. Parameters to be substituted in the path are specified this way, e.g.: /path/%{parameter}/end?find=false, where parameters can be e.g. `deveui` and other parameters.

Now we can use this to build the start message for an application account associated with the devices that must send data to TB(ThingsBoard).

**PUT** /rest/pushmode/start/{name-of-app-account}
**BODY:**

```json
{
  "data_format": "decoded_json",
  "host": "https://demo.thingsboard.io",
  "path_prefix": "/REST API/v1/${devtags.tb-access-token}/telemetry",
  "port": 443,
  "retry_policy": 0
}
```

**Note** _that pushmode/start works with the name of the application but not with its uuid. Uuid is used for authentication._

When the above command is issued, the application account will start to push the decoded payload values to the demo.thingsboard.io/REST API/vi/xyz/telemetry URL, where xyz will be automatically replaced with the value of the device tag with the name "tb-access-token".

You can also watch the following video to see the Payload Decoder process in action:

### Payload Decoder

<video width="100%" controls poster="images/GettingStarted/poster_paylaod_decoder.png">
    <source src="{{page.video_path}}/aws-marketplace-payload-decoder-setup.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>

## Payload Management Using UI

To see data from a device,

Login into UI -&gt; go to **Devices** -&gt; Click on **Manage devices** tab.

Select the device to view the data from device list-&gt; Click on **Action** -&gt; **View Data.**

<img  src="{{page.image_path2 }}0ec573ed-db2d-463f-8a7c-a0843a0c8213.png" />

The list will be populated for both Uplink &amp; Downlink packets. Each packet is shown with a timestamp, FCNT, Port, Status, Data Rate, RSSI etc. See picture below:

<img src="{{page.image_path2 }}634676a9-a52b-40e7-8ae8-b6e5ebb05eab.png" />

The Dass user/customer can see the payload for any device by clicking on **Show Message Payload** button on **Device Activity** Page.This is only available for user/customer that have rights enabled for **Message Payload** on user account settings to see decoded payload message. See picture below:

<img src="{{page.image_path2 }}user3.png" />

<img src="{{page.image_path2 }}4c6b729e-738d-4506-ba04-1f9f3902e7cc.png"  />

## Create Groups (For Multicasting)

Devices can be grouped by using the group feature. To create a group, click on “Groups” menu.

This open the following dialog:We can create groups using UI:

- Login to **UI**
- Go to **Manage Group**
- Click on **Add Group**
- Fill the details
- Save

<img src="{{ page.image_path }}d498cb62-87da-4ad7-935e-f25d3f92b7e7.png" />

Enter a valid group ID and the title of the group. The title is a plain text description of the groups and can contain spaces, whereas the group ID is must not contain any spaces.

The comment is an optional field that can be used by the user to provide additional information about the group.

In the multicast section the three LoRaWAN multicast values for Class C devices can be entered.

These are:

- Multicast DevADDR
- Multicast NwkSKey
- Multicast AppSKey

These values must match the devices of all the devices. Currently LoRaWAN does not specify how the devices gets provisioned with the multicast parameters, hence it is up to the user or the users application to ensure that the multicast parameters are correct.

DevAddr should be unique per group. The **Devaddr** is used to locate the multicast packet in trace.

By default, the Ping-slot Periodicity is set to Class C. In case of class B we can set this to Class B multicast.

## Multicast DL Scheduling

Multicast is used to send DL to multiple devices which belongs to a group, it is only applicable to class B and C devices.
There are two ways to send Multicast Downlink:

### Schedule a Multicast DL:

After creating a group and assigning it to the respective devices user can send Multicast data to all the devices associated with that group.

To send a multicast using UI:

- Login into **UI**
- Go to **Groups** tab
- Go to **Manage Group**
- Click on **Action** button,

<img src="{{page.image_path2 }}Mcast1.png"  />

- Then pressing the **Send Multicast** button will brings up the following "**Send Data** window for user to enter the details for Multicast,

<img src="{{page.image_path2 }}Mcast2.png"  />

- User needs to enter, the **Payload** to be send to devices, **Port** and **FCNT** (if required, make sure it is not duplicated),
- Finally, Click on the **Send** button then all the devices assigned to this group will receive the DL packet from this group devaddr,

<img src="{{page.image_path2 }}9c82a32f-5574-4bbf-b733-13514049d452.png"  >

You can also watch the following video to see the Group Management and Multicast in action:

### Group Management and Multicast

<video width="100%" controls poster="images/GettingStarted/poster_group_management_2.png">
    <source src="{{page.video_path}}/aws-marketplace-group-management.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>
