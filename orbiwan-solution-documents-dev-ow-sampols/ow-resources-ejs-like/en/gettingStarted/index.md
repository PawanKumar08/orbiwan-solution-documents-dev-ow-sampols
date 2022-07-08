---
layout: page
title: Sampols Noise App
menu: gettingStarted
lang: en
permalink: 'index.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
# image_path1: 'images/NoiseSensorUI'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
order: 1
---

{:.pageTitle}

<div class="side-bar">
<ul id="menu" style="height: 503px;">
<li id="m_getting-started-with-orbiwan-edge" ><a href="#sampols-overview">Sampols Overview</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#getting-started-with-sampols">Getting Started with Sampols</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#login-to-sampols-noiseapp">Login to Sampols NoiseApp</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#dashboard">Dashboard</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#data-source-application-integration-with-sampols">Data Source mapping</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#visualization">Visualization</a></li>
</ul>
</div>

# Sampols Overview

Sampols is a high-performance, low-cost solution for acoustic noise cadaster
management, based on the Internet of Things paradigm.

Sampols' sensor is a light, autonomous and high performance outdoor wireless sensor that continuously measures, computes and reports the statistics of ambient noise.

<!-- <p ><img src="images/GettingStarted/overview-dash.png" alt="OrbiwanImages" width="650" height="230"></p> -->
<p ><img src="images/GettingStarted/overview-device.png" alt="OrbiwanImages" width="500" height="380"></p>

Sampols NoiseApp is a practical and scientific tool designed to easily manage measurement, analytics and visualization of noise pollution in cities or in industrial sites.

![OrbiwanImages]({{ page.image_path }}/overview-dash.png)

<!-- <p ><img src="images/GettingStarted/overview-dash.png" alt="OrbiwanImages" width="500" height="380"></p> -->

# Getting Started with Sampols

The following section will help you get your Sampols' device configured and help you start using Sampols NoiseApp.

<p ><img src="images/GettingStarted/Flowchart-sampols-2.png" alt="OrbiwanImages" width="800" height="307"></p>

<!-- ![OrbiwanImages]({{ page.image_path }}/image001.png) -->

<!-- ![OrbiwanImages]({{ page.image_path }}/flow-chart.png) -->
<!-- <iframe src="images/FCC_grant.pdf" style="width:600px; height:500px;"></iframe> -->

The flow chart above shows the steps in visual format. They are as follows

- Power up and Activate Sampols' device.
- Register device on LNS (OrbiWAN LNS or third party LNS)
- Push data to the Noise App and view it on NoiseApp

### Power up and install your Sampols’ device

Once the Sampols' Noise sensor has been shipped to you, it might not be operational straight out of the box.
In order for the device to starting transmitting data it needs to be powered up. For more information on setting up your device to transmit data head to the installation and maintanance section or click on the link below.

<div class="link">
<a href="installation-maintenance.html">Installation &amp; Maintenance Guide</a>
</div>

### Register device on LNS (OrbiWAN)

After powering up the device the next step is to register the devices on an LNS.
To register the Sampols' device on the OrbiWAN LNS please follow the steps given in link below:

<div class="link">
<a href="connect-sampols-with-orbiwan.html">Connect Sampols' device with OrbiWAN LNS</a>
</div>

### Register device on LNS (3rd Party)

Once the deivce is transmitting, it needs to be registered in the LNS.
To register the Sampols' device in the LNS please follow the steps given link below:

<div class="link">
<a href="connect-sampols-with-other-lns.html">Connect Sampols' device with 3rd Party LNS</a>
</div>
<!--### Noise App. -->

<br/>
<br/>

### NoiseApp Summary

After device is registered on LoRa LNS , and Noise App is also configured on LNS - the following steps will help you get started with Noise data analysis and visualization Within Sampols NoiseApp.

<p ><img src="images/GettingStarted/flow-chart.png" alt="OrbiwanImages" width="650" height="230"></p>

<!-- ## Pre-Requisite:

Please make sure that the Noise-Sensor is Registered in the LNS and the device is transmitting. 5334 × 3000 -->

## Login to Sampols NoiseApp

After adding the Device to the LNS, we need to setup the Sampols NoiseApp to analyse the Noise data. To Setup, login to the Sampols NoiseApp.

The Login page looks likes as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Login.png)

Once you Sign in, you will be redirected to the first page i.e. **Map** which shows the location of the devices, as shown in the image below:

<!--![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Map.png) -->

<!-- [OrbiwanImages]({{ page.image_path }}/Noise_App1.png)
<a href="images/FCC_grant.pdf" target="_blank">FCC Grant of Equipment Authorization for US Sampols Device</a> -->

<br/>
<br/>
<br/>

## Dashboard

The dashboard gives a summary of the loations and noise status of the location. This page shows how many devices are active in the location, a summary of the noise and events of the user.

![OrbiwanImages]({{ page.image_path }}/Dashboard.png)

<div>
<br />
<br />
<br />
<br />
</div>

## Data Source (Application integration with Sampols)

To Add the **Data Source** the admin has to add a Tenant.

The Tenant Admin will have the rights to **Add Tenant**. To **Add Tenant** Navigate to **Accounts** --&gt; **Tenant** --&gt; **Add Tenant** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/AddTenant.png)

![OrbiwanImages]({{ page.image_path }}/AddTenantButton.png)

![OrbiwanImages]({{ page.image_path }}/AddTenantUser.png)

Once the tenant is added, the admin will have to configure the **Data Source**. The **Data Source** will be used establish a connection between the LNS and Sampols NoiseApp. To configure the **Data Source** select the Tenant, Click on **Data Source** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/AddDataSource.png)

<!--- ![OrbiwanImages]({{ page.image_path }}/AddNewDataSource.png) -->

Enter the required details in the fields and click on **Add** button as shown iin the image below:

![OrbiwanImages]({{ page.image_path }}/AddNewDataSource_001.png)

Once, the **Data Source** is added, the Device registered in the LNS will show in the Sampols NoiseApp after the first Payloads in the **Map** as shown in the image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png)  -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

_**Note**: The Sampols in SAAS Instance is configured by the Orbiwise Team._

<div>
<br />
<br />
<br />
</div>

## Visualization

The **Visualization** page shows the graphical representation of the data received by the Sampols NoiseApp for the analysis.

To view the data select the location in the **Select Location(s)** section as shown in the below image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-001.png) -->

<!---![OrbiwanImages]({{ page.image_path }}/Noise_App2.png) -->

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-002.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App3.png)

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-003.png) -->

Once, the Location is selected, click on **Draw Graph** to view the graphical representation of the Noise-Data as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/Noise_App4.png)

  <!-- <button id="hide-bp">Hide</button>  -->

<script src="https://chatbot-demo.internal.orbiwise.com/assets/modules/channel-web/inject.js"></script>

<script>
      window.botpressWebChat.init({
        host: 'https://chatbot-demo.internal.orbiwise.com',
        botId: 'sampol-rule-based-bot',
      })
</script>

  <script>
    document.getElementById('show-bp').addEventListener('click', function() {
        window.botpressWebChat.sendEvent({ type: 'show' })
      })
</script>

  <script>
 document.getElementById('hide-bp').addEventListener('click', function() {
        window.botpressWebChat.sendEvent({ type: 'hide' })
      })
</script>
