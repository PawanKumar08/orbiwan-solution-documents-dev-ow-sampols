---
layout: page
title: Register device on OrbiWAN LNS
menu: gettingStarted
lang: en
permalink: 'connect-sampols-with-orbiwan.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
# image_path1: 'images/NoiseSensorUI'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
---

{:.pageTitle}

## Connect Sampols device to OrbiWAN

To Connect the Sampols' Sensor to Sampols NoiseApp, Follow the below steps :

<!--- - Register the Sampols Device to the OrbiWAN.

  To Register Sampols Device to the OrbiWAN follow the below steps :
-->

- First, Login to OrbiWAN.

![OrbiwanImages]({{ page.image_path }}/dass_login.png)

![OrbiwanImages]({{ page.image_path }}/dass_login_1.png)

- Once logged in, next step is to register the Sampols' Device on OrbiWAN. To register the device , choose the Device Profile created for **OTAA** mode and enter the **AppKey**.
  Please note Sampols' Device Should be Registered via **OTAA Activation Mode**

![OrbiwanImages]({{ page.image_path }}/RegisterSampolDevice_OTAAprofile.png)

- Finally to register the device, select "OK". The device will be registered as seen below:

![OrbiwanImages]({{ page.image_path }}/RegisteredSampolDevice_OTAAprofile.png)

Once the device is added, it will start sending payloads to the Sampols NoiseApp.

You can see each device’s payloads in **Devices** -> Select your device –> Action –> View Data as shown in the figure below :

![OrbiwanImages]({{ page.image_path }}/viewData.png)

![OrbiwanImages]({{ page.image_path }}/DeviceActivityNoPayload.png)

The user can view additional device payload data in the **Device Activity** page by clicking on **Columns** –> **Decoded Payload** as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/DeviceActivityWithPayload.png)
