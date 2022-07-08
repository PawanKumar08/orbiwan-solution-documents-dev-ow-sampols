---
layout: page
title: Installation & Maintenance Guide
menu: documentation
lang: en
permalink: 'installation-maintenance.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
image_path3: 'images/Installation-maintenance'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
---

<div class="side-bar">
<ul id="menu" style="height: 503px;">
<li id="m_getting-started-with-orbiwan-edge" ><a href="#installation-of-sampols-device">Installation of Sampols' device</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#powering-the-noise-sensor">Powering Up Sampols' Device</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#addingreplacing-the-battery">Adding/Replacing the Battery</a></li>
<!-- <li id="m_getting-started-with-orbiwan-edge" ><a href="#installing-noisesensor-v16">Installing Noise sensor Firmware</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#noise-sensor-v16-ffc-cable-replacement-moko-devices">FFC Cable replacement</a></li> -->
</ul>
</div>

{:.pageTitle}

# Installation & Maintenance Guide

<!-- ### Noise Sensor V1.6 FFC cable replacement MOKO Devices

The document shows how to correctly insert the FFC cable into the microphone board connector.

<br/>
<br/>

1 . The document shows how to correctly insert the FFC cable into the microphone board connector.

![OrbiwanImages]({{ page.image_path3 }}/FCC_1.png)

<br/>
<br/>

2 . Identify the insulated side (opposite to the contact side) of the FFC cable.

![OrbiwanImages]({{ page.image_path3 }}/FCC_2.png)

<br/>
<br/>

3 . Insert the FFC cable into the unlocked connector with the insulated side mating the connector lock.

![OrbiwanImages]({{ page.image_path3 }}/FCC_3.png)

<br/>
<br/>

4 . Lock the FFC cable by pushing down the connector lock.

![OrbiwanImages]({{ page.image_path3 }}/FCC_4.png)

<br/>
<br/>

5 . The correct position of the FFC cable is shown in the figure

![OrbiwanImages]({{ page.image_path3 }}/FCC_5.png)

<br/>
<br/>

6 . The same procedure applies to the insertion of the FFC cable in the Noise Sensor motherboard connector.

![OrbiwanImages]({{ page.image_path3 }}/FCC_6.png)
-->

## Installation of Sampols' device

For the installation of the "Sampols" device, you can use simple cable ties for electrical installations or, in case of wall-mounted installation, with normal screws and dowels.

The cable ties to be used must have the following characteristics:

- Self-extinguishing cable ties in accordance with UL 94 class V.
- in accordance with UL 94 class V.
- Temperature resistant from -40°C to +80°C.
- High quality UV stabilized nylon (typically black in color).
- Cable tie thickness 4.8mm, length from 250 to 450mm.
- In case you need more length you can use 2 or more ties per side.

![OrbiwanImages]({{ page.image_path3 }}/dev-install-1.png)

![OrbiwanImages]({{ page.image_path3 }}/dev-install-2.png)

Below, some examples of installation with cable ties:

_Square pipe_

![OrbiwanImages]({{ page.image_path3 }}/dev-install-3.png)

_Circular pipe_

![OrbiwanImages]({{ page.image_path3 }}/dev-install-4.png)

For wall installation use 4 screws with 6mm dowel:

![OrbiwanImages]({{ page.image_path3 }}/dev-install-5.png)

![OrbiwanImages]({{ page.image_path3 }}/dev-install-6.png)

![OrbiwanImages]({{ page.image_path3 }}/dev-install-7.png)

<!-- ### Installing NoiseSensor V1.6

a) Download the STM32 ST-LINK utility from this link:
https://www.st.com/en/development-tools/stsw-link004.html
b) Connect the ST-LINK USB cable to a PC.
c) Connect the Noise Sensor programming cable provided.

![OrbiwanImages]({{ page.image_path3 }}/FW-install1.png)

d) Identify the pin 1 of the connector on the programming cable (indicated with a black dot).

![OrbiwanImages]({{ page.image_path3 }}/FW-install2.png)

e) Identify the pin 1 of the connector J1 on the board ( white dot ).

![OrbiwanImages]({{ page.image_path3 }}/FW-install3.png)

f) Connect properly the programming cable to the programming connector.

![OrbiwanImages]({{ page.image_path3 }}/FW-install4.png)

g) Start the STM32 ST-LINK utility and turn on the NoiseSensor

h) Select File -> Open File and select the .bin or .hex file that you want to install

i) Select Target -> Connect

l) Select Target ->Program & Verify

m) Wait for the “Verify OK” message and close the connection with: Target -> Disconnect

n) Disconnect the programming connector and turn off the NoiseSensor.
-->

<br />
<br />
<br />

## Powering the noise sensor

Press the power button and make sure the LED flashes three times.

![OrbiwanImages]({{ page.image_path3 }}/powerup-dev4.png)

If the sensor has been successfully recorded on the network, it will be connected to the monitoring system within few minutes to an hour.

<br />
<br />
<br />

## Adding/Replacing the battery

The OW noise sensor uses 3.6V D/R20 size primary batteries in Li-SOCl2 (lithium-thionyl chloride) technology.

Make sure you have the correct battery type, below are some battery models that you can mount in the sensor:

| Manufacturer    | P/N                    | Capacity      |
| --------------- | ---------------------- | ------------- |
| EVE BATTERY CO. | ER34615S               | 3.6V 19000mAh |
| SAFT            | LS33600                | 3.6V 17000mAh |
| ULTRALIFE       | ER34615/TC UHE-ER34615 | 3.6V 19000mAh |
| TEKCELL         | ER34615                | 3.6V 19000mAh |
| TADIRAN         | TL5930/S               | 3.6V 19000mAh |
| XENO-ENERGY     | XL-205F STD            | 3.6V 19000mAh |

The positive pole of the battery must be placed on the side of the power button.
Place the battery respecting the correct polarity.

![OrbiwanImages]({{ page.image_path3 }}/powerup-dev1.png)

![OrbiwanImages]({{ page.image_path3 }}/powerup-dev2.png)

Before closing the box, make sure the flat cable is connected properly.

To ensure the watertightness of the box, tighten the screws with a cross-pattern
and use a tightening torque of 8 in-lbs = 0.9 Nm.

![OrbiwanImages]({{ page.image_path3 }}/powerup-dev3.png)

<br />
<br />
<br />

<!-- ## Noise Sensor V1.6 FFC cable replacement MOKO Devices

The document shows how to correctly insert the FFC cable into the microphone board connector.

<br/>
<br/>

1 . The document shows how to correctly insert the FFC cable into the microphone board connector.

![OrbiwanImages]({{ page.image_path3 }}/FCC_1.png)

<br/>
<br/>

2 . Identify the insulated side (opposite to the contact side) of the FFC cable.

![OrbiwanImages]({{ page.image_path3 }}/FCC_2.png)

<br/>
<br/>

3 . Insert the FFC cable into the unlocked connector with the insulated side mating the connector lock.

![OrbiwanImages]({{ page.image_path3 }}/FCC_3.png)

<br/>
<br/>

4 . Lock the FFC cable by pushing down the connector lock.

![OrbiwanImages]({{ page.image_path3 }}/FCC_4.png)

<br/>
<br/>

5 . The correct position of the FFC cable is shown in the figure

![OrbiwanImages]({{ page.image_path3 }}/FCC_5.png)

<br/>
<br/>

6 . The same procedure applies to the insertion of the FFC cable in the Noise Sensor motherboard connector.

![OrbiwanImages]({{ page.image_path3 }}/FCC_6.png)

<br />
<br />
<br />

## Installing NoiseSensor V1.6

a) Download the STM32 ST-LINK utility from this link:
https://www.st.com/en/development-tools/stsw-link004.html
b) Connect the ST-LINK USB cable to a PC.
c) Connect the Noise Sensor programming cable provided.

![OrbiwanImages]({{ page.image_path3 }}/FW-install1.png)

d) Identify the pin 1 of the connector on the programming cable (indicated with a black dot).

![OrbiwanImages]({{ page.image_path3 }}/FW-install2.png)

e) Identify the pin 1 of the connector J1 on the board ( white dot ).

![OrbiwanImages]({{ page.image_path3 }}/FW-install3.png)

f) Connect properly the programming cable to the programming connector.

![OrbiwanImages]({{ page.image_path3 }}/FW-install4.png)

g) Start the STM32 ST-LINK utility and turn on the NoiseSensor

h) Select File -> Open File and select the .bin or .hex file that you want to install

i) Select Target -> Connect

l) Select Target ->Program & Verify

m) Wait for the “Verify OK” message and close the connection with: Target -> Disconnect

n) Disconnect the programming connector and turn off the NoiseSensor.
-->
