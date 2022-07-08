---
layout: page
title: Device Datasheet
menu: documentation
lang: en
permalink: 'device-datasheet.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
---

{:.pageTitle}

## Device Datasheet

### Features

The OrbiWise Sampols' noise sensor is a high-performance and low-cost remote wireless sensor for acoustic noise measurement.

- Measuring all relevant noise parameters (Leq , L10, L50, L90, L95, Lmin, Lmax) in 5 or 15 minute periods
- Battery operated, continuous measurements for 10-12 months
- Outdoor, IP 67 waterproof enclosure
- Easy installation and maintenance
- Unattended real-time measurements transmitted wirelessly
- Configurable periodic reporting period
- Configurable measurement schedule
- Temperature measurement
- Battery and device humidity monitoring for device monitoring
- Local backup storage of 10 years of measurement, can be retrieved remotely if data lost.
- LoRaWAN 1.0.3 compliant
- Easy LoRaWAN device registration from claim code
- OTAA device, can be ABP configured upon request
- LoRaWAN FUOTA 2.0

### Applications

The noise sensor is part of the OrbiWise noise measuring and monitoring solution Sampols include a comprehensive noise application suitable for applications like:

- Noise cadaster
- Industrial noise surveillance
- Activity detection

### General Description

![OrbiwanImages]({{ page.image_path }}/Noise-sensor-pic.png)

The OrbiWise Sampols' noise sensor is a high-performance and low-cost remote wireless sensor for acoustic noise measurement.

It continuously measures and compute the equivalent noise level averaged over 1 second in dBA (Leq1s) and periodically transmits reports containing noise level distribution information (by default mean, minimum, maximum of Leq1s, Leq10, 50 90 and 95) and meta data such as temperature or battery level.

Sampols' noise sensor is autonomous, easy to deploy and allows to perform continuous measurements over long periods of time.

### Device Specification

| Measurements \*     | Parameter                                                 |
| ------------------- | --------------------------------------------------------- |
| Acoustic            | parameters LA, L95, L90, L50, L10, Lavg, Lmin             |
| Sensitivity         | 30dB SPL                                                  |
| Linearity           | ±1.5 dB (30dB – 95dB)                                     |
| Measurement periods | 5 minute or 15 minutes, Configurable measurement schedule |
| Device parameters   | Temperature, Humidity, Battery level                      |

<!-- | Frequency response  | < 2.5 dB from Class B limits (100 – 20000Hz)              | -->

<div>
<br />
<br />
</div>

| Directivity | ≤0.5kHz | 1kHz  | 2kHz  | 4kHz  | ≥8kHz  |
| ----------- | ------- | ----- | ----- | ----- | ------ |
| 90°         | 1.5dB   | 4.0dB | 3.5dB | 7.0dB | 7.0 dB |
| 180°        | 2.0dB   | 3.5dB | 4.5dB | 10dB  | ≤ 20dB |

<div>
<br />
<br />
</div>

| Wireless Protocol       | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| Standard                | LoRaWAN 1.0.3                                           |
| Device Class            | Class A, OTAA                                           |
| Transmit Power\*\*      | Output power level up to +19 dBm (868), +17.5 dBm (915) |
| Receive sensitivity\*\* | Sensitivity down to -137 dBm                            |
| Transmission distance   | Typical 1km (Urban) – 10 km (Rural)                     |

<div>
<br />
<br />
</div>

| Operating           | Parameter                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Temperature Range   | Operating: -10°C – 60°C                                                                        |
| Storage:            | -20°C – 70°C, recommended max 30°C due to battery                                              |
| Battery             | D size, non-rechargeable, Lithium Thionyl Chloride (Li-SOCl2), 3.6V, 17Ah e.g. Saft: LS33600   |
| Measurement Logging | All measurements are logged in internal memory, 128 Mb for more than 10 years measurement data |

<div>
<br />
<br />
</div>

| Mechanical | Description                                             |
| ---------- | ------------------------------------------------------- |
| Enclosure  | Grey Polycarbonate with mounting brackets               |
| Dimensions | 115 x 65 x 55 mm                                        |
| Weight     | 315, g with D type battery                              |
| Rating     | IP67, UV resistant                                      |
| Button     | Power button with LED indicating wireless transmissions |

\* All measurements are typical values

\*\* Without antenna

### Device Variants

| Name P/N           | Region / Usage   |
| ------------------ | ---------------- |
| OW-0004-01.6-EU868 | EU region        |
| OW-0004-01.6-US915 | America region   |
| OW-0004-01.6-IN865 | India Region     |
| OW-0004-01.6-AS923 | Asia region      |
| OW-0004-01.6-AU915 | Australia region |

<!-- ### Size and Weight

<p ><img src="images/GettingStarted/Noise-sensor-model.png" alt="OrbiwanImages" width="900" height="450"></p>

- Length: 145.00 mm
- Width: 66.36 mm
- Height: 55.00 mm
- Weight (with battery): 313 g
-->

### Acoustics

- Sensitivity (Typical): -29dBFS (at 94 dB SPL @ 1 kHz)
- Total Harmonic Distortion (THD): 0.1% , at 94 dB SPL @ 1 kHz
  THD: 1.6% , at 120 dB SPL @ 1 kHz

<!--- ### Wireless

- LoRaWAN® 1.0.4
- Model xyz: US915 band (902MHZ-928MHZ). FCC certified.
- Model abc: EU868 band etc.

(\*) AU915 and AS923 models available Q1 2022?
-->

<!-- ### Environmental Characteristics

- Working temperature: -15°C to 65°C
- IP Protection: IP66
- Max recommended storage time <6 months
- Storage humidity: 5% to 95% non-condensing -->

### Warning

Do not attempt to replace the Sampols battery before having read the related instructions in the online material: you may damage the battery, possibly causing overheating, fire, and injury.
The Lithium-thionyl-chloride battery in your Sampols' device is a high-performance, primary cell that cannot be recharged.
This battery should be recycled or disposed of separately from household waste following your local environmental laws and guidelines.

<!-- ### Other features

FUOTA etc..

Sampols
Wireless Acoustic Noise Measurement
Model: OW-0004-01.06
-->
