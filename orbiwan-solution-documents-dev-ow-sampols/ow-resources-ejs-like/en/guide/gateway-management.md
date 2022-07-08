---
layout: page
title: Gateway Management
menu: guide
lang: en
permalink: 'Gateway_management.html'
image_path: 'images/GettingStarted'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
visible: false
---

{:.pageTitle}

# Gateway Management

## Add Gateway

One of the important steps you are supposed to do after login is to latch/register your gateway on OrbiWAN Network.

To register the gateways you can follow these simple steps -

- Navigate to **Gateways menu** --&gt; **Add Gateways**.
- Enter the **Gateway name** and **Select the model**.
- Copy the command provide in **Installation** box to provision the gateway.
- Login to the gateway using SSH and paste the copied command in the gateway shell.
- This command will download the Gateway Software and install on the Gateway.
- Once the Software is installed, **Reboot** the gateway.

![OrbiwanImages]({{ page.image_path }}/Gateway1.png)

![OrbiwanImages]({{ page.image_path }}/Gateway2.png)

You can also follow the video to see it in action.

<video width="100%" controls poster="{{ page.image_path }}/poster_gateway_privisioning.png">
    <source src="{{page.video_path}}/aws-marketplace-ow-gateway-provisioning.mov" type="video/mp4" />
    Your browser does not support HTML video.
</video>
