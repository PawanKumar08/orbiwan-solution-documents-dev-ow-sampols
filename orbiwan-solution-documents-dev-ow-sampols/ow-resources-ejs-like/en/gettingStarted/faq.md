---
layout: page
title: faq
menu: gettingStarted
lang: en
permalink: 'faq.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
image_path3: 'images/Installation-maintenance'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
---





## Sampols FAQ for chat bot

### How to view registered devices?

- The devices page allows users to view all devices along with most recent noise status.

### How to view data on Noise app?

- We can view the data on Visualization section.The visualization page enables users to visualise the data as charts. The charts are rendered based on the options selected. The interactive UI helps to let user choose locations, noise parameters, chart type etc.

### Why is location adding needed?

- Adding location gives the exact positions of the devices. Usually a location will never change but sensors placed at a location can be changed. A device can be associated with only one location. At a location there can be multiple devices. E.g. One device can be pointing to North, other can be facing East to collect data. One device can be at ground level, another can be 10 meters high.

### What is Data Source?

- The Data Source is used to establish a connection between the LNS and Sampols NoiseApp.

### How to configure data source?
 
- To configure the Data Source select the Tenant, Click on Data Source i.e. click on the third icon in Action section. Enter the required details in the fields and click on Add button. Once, the Data Source is added, the Device registered in the LNS will show in the Sampols NoiseApp after the first Payloads.
 
### The Noise Status on some location is blank or shows no Data?
 
- If the location has no device associated, then there will be no data of that location.

### How to set an alarm for Low battery?

- In configuration tab, click on event defination and create a event. Now in configuration tab, click on Rules section and add new rule. Fill all the mandatory field and in interactive select check threshold and in second dropdown select Vbat and then create a condition according to the requirement.Then in the below field select the event that was created.

### How to set an alarm for High Leq/Lmin/Lmax/L10?

- In configuration tab, click on event defination and create a event. Now in configuration tab, click on Rules section and add new rule. Fill all the mandatory field and in interactive select check threshold and in second dropdown select Leq/Lmin/Lmax/L10 and then create a condition according to the requirement.Then in the below field select the event that was created.

### Can one location have multiple devices?

- A device can be associated with only one location. At a location there can be multiple devices. E.g. One device can be pointing to North, other can be facing East to collect data. One device can be at ground level, another can be 10 meters high.


### Can I push the Noise data to other external applications?

- Yes we can push the data to other external applications.

### Issue while updating device Firmware?

- Will update it in next session.

