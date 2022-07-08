---
layout: page
title: AWS IoT Core Integration
menu: guide
lang: en
permalink: 'aws-iot-core-integration.html'
image_path: 'images/AWS-IoT/IoT_Core_Integration_files'
sub_pages: false
page_type: 'sub-page'
visible: false
---

{:.pageTitle}

# AWS Iot Core Integration

Customers can easily set up a bi-directional HTTPS connector between OrbiWAN and AWS IoT Core by using the CloudFormation template developed and published by OrbiWise.

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/757fe53d-025f-4174-831f-c68c0a3c9403.png" />

### Assign devices to the application

Once the AWS IoT Core connector has been setup using the CloudFormation template, the first step is to assign a device or set of devices to the AWS IoT Core application sub-account:

- Login to the OrbiWAN GUI
- In the top menu, under **Devices**, go to **Manage Devices**
- Click on **Action** in the menu on the right and select **App Assignment**

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/240a6dc3-7e6c-4744-b02e-5cc3a77d3065.png" />

- Select the application account the chosen device(s) should be assigned to, then click on **Add**

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/56cdc4ba-9ff8-4fc2-93e4-5f71086e129c.png" />

From this point on, every uplink data message transmitted by the devices that are associated to the appication will be sent to the appropiate AWS IoT device data endpoint through the IoT Core message broker. All notifications are sent using HTTP POST such that IoT Core interpret them as MQTT messages.

## Testing AWS IoT Core integration

The HTTPS connector publishes event-based messages to the pre-determined topics when specific device events occur and allows applications to send commands back to the devices, for example, to update properties or invoke actions. The available topics are:

<table>
    <tr>
        <th>MQTT topic</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/uplink_early</b></td>
        <td>Uplink message received. The message body contains the uplink message data and port number. This notification is sent as early as possible to allow the application to be able to respond to the message and have it send back to the device on the immediate following downlink opportunity.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/uplink</b></td>
        <td>Uplink message received. The message body contains the uplink message data and port number, and the RSSI and SNR of the best gateway that received the data. Further depending on the rights of the application, the message may also contain the full list of gateways that received the message and the estimated Geo location of the device. As this message requires aggregation of data from multiple gateways and optional processing of geo locations data, this message will arrive too late to be able to send data back to the device on the immediately following downlink opportunity.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/downlink/status</b></td>
        <td>This notification is send with the status of a scheduled downlink. The notification will be send when the downlink have actually been sent, and in case of confirmed downlink, when the downlink have been (or not) acknowledged. If an error happened on the downlink this will also be indicated on this notification. This notification may be send several times as the state changes.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/joininfo</b></td>
        <td>Send when the a device has send a join request message and the network has accepted the device.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/nodeinfo</b></td>
        <td>A nodeinfo notification is sent to tell the application that the state of a device has changed. This is the case when the network schedules a downlink without request from the application. In this case the downlink FCNT counter is incremented, and the nodeinfo notification is send to notify the application of this change.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/location</b></td>
        <td>A location estimate has been updated for the device. Note, this message is redundant with the orbiwan/lorawan/{deveui}/uplink notification that will also include the location information when available.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/{deveui}/status</b></td>
        <td>The status notification is sent when the device have reported back the DevStatusAns which report the battery level of the device and the downlink link margin.</td>
    </tr>
    <tr>
        <td><b>orbiwan/lorawan/appchange</b></td>
        <td>The appchange notification is sent every time a device subscribes or unsubscribes to the AWS IoT Core application sub-account.</td>
    </tr>
</table>

Downlink messages must be send to the following topic: **orbiwan/lorawan/{deveui}/downlink**.

The following sections describe how to test uplink and downlink message flows.

### Uplink payloads

You can use the IoT Core MQTT test client to monitor the MQTT messages being passed in your AWS account:

- Navigate to the IoT Core console, choose **Test** on the navigation pane, and select **Subscribe to a topic**
- Configure the MQTT client to subscribe to the desired topics. For example, to subscribe to uplink payloads, enter **orbiwan/lorawan/+/uplink**, set the QoS level and click **Subscribe**

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/8e2c1231-2c88-427a-aa7b-39122ee14660.png" />

- Verify the published data in the IoT Core MQTT Test Client

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/03794b4b-e90f-4936-8e4f-2edf77c4099d.png" />

### Send a downlink payload to a device

Applications can send dowlink payloads to LoRaWAN devices by publishing an MQTT message to AWS IoT Core. Hexadecimal payloads published to the topic **orbiwan/lorawan/{deveui}/downlink** are sent to a Lambda function that republishes the messages by making POST requests to the appropriate OrbiWAN server for it to transmit them to the devices on next opportunity. Note that the DevEUI of the target device will be taken from the MQTT topic.

The message is a JSON object with the following format:

```json
{
  "data": "aabbcc", // Hex payload
  "port": 20 // LoRaWAN port
}
```

The picture below illustrates the overall approach:

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/276e09a5-2768-495b-9734-de1d0508a2df.png" />

You can use the IoT Core MQTT test client to publish downlink messages to OrbiWAN:

- Go to the IoT Core console, choose **Test** on the navigation pane, and subscribe to topic **orbiwan/lorawan/+/downlink/status** to see a response from OrbiWAN once a downlink message transaction has completed:

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/a8c2e00a-b494-456e-aeaf-885d2acbdfb3.png" />

- Select **Publish to a topic**
- Enter the downlink topic, set the QoS, define the message payload and click **"Publish"**

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/4d0dc4ce-4f26-488c-813b-6e400cb0d20d.png" />

- Monitor the response from the OrbiWise LNS that contains the status of the scheduled downlink message:

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/ab996e9d-228d-42b7-bf9c-7ccf14363a3e.png" />

Note that this notification will be sent several times as the state changes. The meaning of the transmission status is the following:

<table>
    <tr>
        <th>Transmission status</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>0</td>
        <td>Payload pending transmission (i.e. not sent yet).</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Payload has been sent, but reception status unknown.</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Payload has been sent and acknowledged by the device.</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Payload has been sent, and NOT acknowledged by the device => most likely the device did not receive the downlink payload.</td>
    </tr>
    <tr>
        <td>4</td>
        <td>An error has been discovered on the payload. The possible reasons for this error are: FCNT collision, payload size too big.</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Payload has been cancelled. This happens if downlinks have been queued but are erased again due to new JOIN, or if the payloads have been purged.</td>
    </tr>
</table>

If an error happened on the downlink this will be indicated on this notification:

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/0d156c20-8c28-4592-97cb-c957bcfeb384.png" />

Downlink payloads will be listed in the OrbiWAN GUI, provided they have been successfully scheduled:

<img src= "./images/AWS-IoT/IoT_Core_Integration_files/d6094c47-c7cf-4e39-8675-50859e0c5645.png" />

Note that applications can also publish their messsages by making POST requests to the following URL:

```shell
https://AWS_IoT_data_endpoint/topics/orbiwan/lorawan/{deveui}/downlink?qos=1
```

To find your IoT data custom endpoint, got to the AWS IoT Core console and choose **Settings**.

See the snippet below for an example of how to send a downlink payload through HTTPS connection to AWS IoT Core.

```python
import requests
import argparse

# Define command-line parameters
parser = argparse.ArgumentParser(description='Send message through HTTP POST')
parser.add_argument('--endpoint', required=True,
                    help='AWS IoT data custom endpoint, not including a port.')
parser.add_argument('--cert', required=True,
                    help='Path to cert file, in PEM format.')
parser.add_argument('--key', required=True,
                    help='Path to private key, in PEM format.')
parser.add_argument('--deveui', required=True,
                    help='DevEUI of the target device.')
parser.add_argument('--message', default='{"data":"aabbcc","port":10}',
                    help='Message to publish.')

# Parse command-line parameter values
args = parser.parse_args()

# Define values for HTTPS request
topic = 'orbiwan/lorawan/%s/downlink' % args.deveui
publish_url = 'https://%s:8443/topics/%s?qos=1' % (args.endpoint, topic)
publish_msg = args.message.encode('utf-8')

# Make HTTP POST request
publish = requests.request('POST',
                           publish_url,
                           data=publish_msg,
                           cert=[args.cert, args.key])

# Print response
print('Response status: ', str(publish.status_code))
if publish.status_code == 200:
    print('Response body:', publish.text)
```
