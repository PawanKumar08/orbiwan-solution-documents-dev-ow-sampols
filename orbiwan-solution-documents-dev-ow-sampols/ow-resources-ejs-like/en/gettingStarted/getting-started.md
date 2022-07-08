---
layout: page
title: Getting Started
menu: starter
lang: en
permalink: GettingStarted.html
ow_parent: '-'
page_id: 'gettingStarted'
page_type: 'top'
sub_pages: false
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
# image_path1: 'images/NoiseSensorUI'
video_path: 'videos'
order: 2
visible: false
sidebar_content:
  - Login
  - Data Source
  - Visualization
---

<div class="side-bar">
<ul id="menu" style="height: 503px;">

<li id="m_getting-started-with-orbiwan-edge" ><a href="#sampols-overview">Sampols Overview</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#getting-started-with-sampols">Getting Started</a>
   <ol id="sub-section">
   <li id="m_login1" ><a href="#login-to-sampols-application">Login to Sampols</a></li> 
   <li id="m_login2"><a href="#connect-sampol-device-to-orbiwan">Connect Sampol device to OrbiWAN</a></li>
   <li id="m_login"><a href="#noise-sensor-ui">Sampols App</a></li>
<li id="m_dashboard"><a href="#data-source-application-integration-with-sampols">Application integration with Sampols</a></li>
   </ol>
</li>
 
<li id="m_add-gateway"><a href="#connecting-sampols-devices-to-3rd-party-lns">Connecting Sampols devices to 3rd party LNS</a></li>
<li id="m_add-device"><a href="#documentations">Documentations</a>
<ol id="sub-section"> 
   <li id="m_login"><a href="#device-datasheet">Device data sheet</a></li>
   <li id="m_login"><a href="#installation--maintenance-guide">Installation & Maintenance Guide</a></li>
   <li id="m_login"><a href="#end-user-license-agreement-eula-for-sampols-software">EULA</a></li>
   <li id="m_login"><a href="#warranty">Warranty</a></li>
   <li id="m_login"><a href="#certifications">Certifications</a></li>
   </ol>
</li>
</ul>
</div>

{:.pageTitle}

# Sampols Overview

<div>
<br />
<br />
<br />
<br />
</div>

# Getting Started with Sampols

This simple guide will help you get started with LNS <sup>TM</sup> Noise Data Analysis and Visualisation.

<!-- ![OrbiwanImages]({{ page.image_path }}/image001.png) -->

<!-- ![OrbiwanImages]({{ page.image_path }}/flow-chart.png) -->

<p ><img src="images/GettingStarted/flow-chart.png" alt="OrbiwanImages" width="650" height="230"></p>

<!-- ## Pre-Requisite:

Please make sure that the Noise-Sensor is Registered in the LNS and the device is transmitting. -->

## Login to Sampols Application

After adding the Device to the LNS, we need to setup the Sampols Application to analyse the Noise data. To Setup, login to the Sampols Application.

The Login page looks likes as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Login.png)

Once you Sign in, you will be redirected to the first page i.e. **Map** which shows the location of the devices, as shown in the image below:

<!--![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Map.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

## Connect Sampol device to OrbiWAN

To Connect Sensor Device to Sampols Application. Follow the below steps :

- Register the Sampols Device to the OrbiWAN.

  - To Register Sampols Device to the OrbiWAN follow the below steps :

  - Login to OrbiWAN application.

![OrbiwanImages]({{ page.image_path }}/dass_login.png)

![OrbiwanImages]({{ page.image_path }}/dass_login_1.png)

- Sampol Device Should be Registered via **OTAA Activation Mode** , choose the Device Profile created for **OTAA** mode and enter the **AppKey**.

![OrbiwanImages]({{ page.image_path }}/RegisterSampolDevice_OTAAprofile.png)

- Then click OK. The device will be registered as seen below:

![OrbiwanImages]({{ page.image_path }}/RegisteredSampolDevice_OTAAprofile.png)

Once the device is added, it will start sending the Payload to the Sampols Application.

You can see each device’s payloads in **Devices** -> Select your device –> Action –> View Data as shown in the figure below :

![OrbiwanImages]({{ page.image_path }}/viewData.png)

![OrbiwanImages]({{ page.image_path }}/DeviceActivityNoPayload.png)

The user can view additional device payload data in the **Device Activity** page by clicking on **Columns** –> **Decoded Payload** as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/DeviceActivityWithPayload.png)

## Data Source (Application integration with Sampols)

To Add the **Data Source** the admin has to add a Tenant.

The Tenant Admin will have the rights to **Add Tenant**. To **Add Tenant** Navigate to **Accounts** --&gt; **Tenant** --&gt; **Add Tenant** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/AddTenant.png)

![OrbiwanImages]({{ page.image_path }}/AddTenantButton.png)

![OrbiwanImages]({{ page.image_path }}/AddTenantUser.png)

Once the tenant is added, the admin will have to configure the **Data Source**. The **Data Source** will be used establish a connection between the LNS and Sampols Application. To configure the **Data Source** select the Tenant, Click on **Action** --&gt; **Data Source** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/AddDataSource.png)

![OrbiwanImages]({{ page.image_path }}/AddNewDataSource.png)

Enter the required details in the fields and click on **Add** button as shown iin the image below:

![OrbiwanImages]({{ page.image_path }}/AddNewDataSource_001.png)

Once, the **Data Source** is added, the Device registered in the LNS will show in the Sampols Application after the first Payloads in the **Map** as shown in the image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png)  -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

<div>
<br />
<br />
<br />
</div>

## Connecting Sampols devices to 3rd party LNS

<div>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
</div>

## Dashboard

The dashboard gives a summary of the loations and noise status of the location. This page shows how many devices are active in the location, a summary of the noise and events of the user.

![OrbiwanImages]({{ page.image_path }}/Dashboard.png)

## Visualization

The **Visualization** page shows the graphical representation of the data received by the Sampols Application for the analysis.

To view the data select the location in the **Select Location(s)** section as shown in the below image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-001.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App2.png)

Once, the Location is selected, click on **Draw Graph** to view the graphical representation of the Noise-Data as shown in the image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-002.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App3.png)

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-003.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App4.png)

# Noise Sensor UI

The UI is divided into several pages to help manage content and visualise data collected by sensors. A glimpse of the app can be seen in the figure below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Map.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

## Location

Allows users to manage locations and generate and export statistics for selected locations.

![OrbiwanImages]({{ page.image_path }}/Location-Tab.png)

## Devices

Allows users to manage devices.

![OrbiwanImages]({{ page.image_path }}/Devices-Tab.png)

## Visualization

Users can analyse the data with help of numerous charts. Users can export the charts data, raw data, aggregated data etc.

![OrbiwanImages]({{ page.image_path }}/Visualization-Tab.png)

## Tags

Allows users to manage tags which can be assigned to the location(s).

![OrbiwanImages]({{ page.image_path }}/Tab.png)

## Accounts

Allows administrators to manage users and Tenants (for Super Admin User).

![OrbiwanImages]({{ page.image_path }}/Accounts-Tag.png)

## Tenant

Allow the Super admin user to create and access the tenants.

![OrbiwanImages]({{ page.image_path }}/Tenant.png)

Once the tenant is created, the admin can create the **Data Source** which will allow the user to fetch the device data fron the LNS.

To Configure the **Data Source**, Click on **Action** --> **Data Source** of the created Tenant as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-Tenant.png)

The Super admin user can also log forward to the respected Tenant by clicking on **Action** --> **Forward as Tenant** as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-LogForward.png)

The admin can also configure the rights and the tabs that the tenat and its associated users can view by clicking on **Action** --> **Profile** as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-Profile.png)

![OrbiwanImages]({{ page.image_path }}/DataSource-Profile-001.png)

# Map

Map menu shows a customized map where the markers show sensors deployed on the city of choice.

![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png)

## Map View

The map is cabable of showing following details using different colored markers.

- Markers

It allows users to click on any location and see a popup with high level details about the location as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/Device-Marker.png)

## Legend and Options

The map also has a legend along with few options to manage the map markers.

– Legend: This shows different colors a marker will have for the option selected.

![OrbiwanImages]({{ page.image_path }}/Legends.png)

- Show only selected locations: If user has selected some locations,checking this option will show only those selected locations and hide all other locations.

- Hide locations popup: Hides the location popup so that it does not overlap other markers and allows users to check nearby locations.

- Locations: If the user has selected this, the devices location will be shown on the map else nothing will be shown.

**Legend as per parameter**

The legend changes according to the parameter selected. Only one out of these parameters at a time.

- Battery Voltage: Most recent battery voltage of the sensors installed at location.

![OrbiwanImages]({{ page.image_path }}/Legend-BatteryLevel.png)

- Last noise status: Shows the last received noise levels at the locations.

![OrbiwanImages]({{ page.image_path }}/Legend-NoiseLevel.png)

- Last Reception: Shows the Last reception time at a location.

![OrbiwanImages]({{ page.image_path }}/Legend-LastSeen.png)

- Active Events: Shows the open Active Events of the location.

![OrbiwanImages]({{ page.image_path }}/Map-ActiveEvents.png)

- Relative Noise: Show the Result of the Average of the Noise from Last 7 days with the last received noise level.

![OrbiwanImages]({{ page.image_path }}/Map-RelativeNoise.png)

- Absoulte Threshold Noise: Shows the Thresold values configured in the Global Configuration

![OrbiwanImages]({{ page.image_path }}/Map-AbsoulteThreshold.png)

- Current Baseline: Shows the Thresold values configured in the Global Configuration

![OrbiwanImages]({{ page.image_path }}/Map-AbsoulteThreshold.png)

## Locations List

The locations list is displayed along with current status for selected parameter along with more options.

- First column is the **Location Name**. Users can also filter the locations using this.

![OrbiwanImages]({{ page.image_path }}/Location-Name.png)

- Second column is status. This columns shows the LED marker based on the parameter selected.

![OrbiwanImages]({{ page.image_path }}/Location-Status.png)

- Other Options are associated witht the location for the ease of the user. Below are the details of the same:

  - Visualization: Allows you to quickly navigate to the Visualization and view the Graph of the Selected location instantly.

  - View: Allows you to quick view of the noise levels for many visualizations. More on this is covered later in this chapter

  - Edit: Allows you to edit the location details.

  - Bin: Allows you to delete a location.

![OrbiwanImages]({{ page.image_path }}/Location-EditViewDelete.png)

The list also supports pagination and sorting. User can also select number of locations to be displayed on the list. However, the markers count on map is not related to number of results shown in list at one page. In fact, all of the locations in visible area are displayed on the map.

## Parameter Dropdown

The dropdown allows users to select one of the parameters.

- Battery Voltage.

- Last noise status.

- Last Reception.

- Active Events.

- Relative Noise.

- Absoulte Threshold Noise.

- Current Baseline.

Once you select a parameter, both location list and map view will change the markers according to the legend shown on Map view.

## Tag Filter

The tag search box allows users to filter locations for a selected tags. Once user starts typing the tag name, suggestions appear below and user can select one or more tags.

## Time Machine

This option allows users to select a date in past. The status of selected parameter will be shown on the map. The markers will show the status as per most recent reception (in past from the time selected).

**For e.g:** Lets say today is 1st Nov 2020 and user selects 20th March 2020, the most recent status before 20th March 2020 will be fetched and marker colors will change accordingly. If there was no data for 7 days in past(i.e. 14th-20th March) the color will be gray (No data).

![OrbiwanImages]({{ page.image_path }}/TimeMachine.png)

The map view allows users to select more than one location. This feature is handy when user wants to visualize more than one location at a time. User can select all locations of their choice and simply click the visualization tab, the charts will be rendered for the locations selected.

## Quick View of Noise Levels

If user clicks on View(Eye) button, user can see the quick view of noise levels for the selected location.

![OrbiwanImages]({{ page.image_path }}/QuickView.png)

- Quick View of Noise

This chart shows the individual time series of Leq, Lmin, Lmax for selected location.

![OrbiwanImages]({{ page.image_path }}/QuickView-001.png)

- Average 15 Min

This chart shows the average 15 min chart for Leq, Lmin, Lmax similar to the one on
visualization page.

![OrbiwanImages]({{ page.image_path }}/QuickView-15Min.png)

<!-- - Average OPB Periods

This chart shows the average OPB chart for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-OPB.png)

- Average 24 hours

This chart shows the average 24 hour for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-24Hour.png) -->

- Accumulated Average

This chart shows the accumulated average for Leq, Lmin, Lmax similar to the one on visualization page.

![OrbiwanImages]({{ page.image_path }}/QuickView-Average.png)

## Location

The Location page shows a list of all available locations as a table where columns describe all about the location. The columns have the details about the location such as - latitude, longitude, name, status, physical address, sensors deployed at the location etc.

User can select one or more location and export statistics about the location. The exported statistics table contains the following:

![OrbiwanImages]({{ page.image_path }}/LocationPage.png)

- Location Details

- Day and night data averages statistics for Leq, Lmin, Lmax, L10, L50, L90, L95 - mean, std etc. A detailed explaination about the statistics is explained later.

User can add locations, edit/update details of the location.

- Add Location

Allows users to add a location.

- Refresh

Refreshes the page.

- Report Start Date

Bulk change the start date for selected locations. This is not enabled if no location is selected.

- Report End Date

Bulk change the end date for selected locations. This is not enabled if no location is selected.

- Export location statistics

Allows users to export statistics of selected locations. This is not enabled if no location is selected.

- Tags Filtering

Allows users to filter the locations by tags.

## Adding Location

Adding a location is divided into three different screens.

### Geolocation details of the location

The following screen is for adding a location:

![OrbiwanImages]({{ page.image_path }}/Location-AddLocation.png)

Below are the Mandatory fields required.

| Field                    | Mandatory | Description                                                           |
| ------------------------ | --------- | --------------------------------------------------------------------- |
| Location Name            | Y         | Location name. This is used to filter content.                        |
| Nearest physical address | N         | Nearest address to the location to help users to locate the location. |
| Latitude                 | Y         | Latitude of the location.                                             |
| Longitude                | Y         | Longitude of the location.                                            |
| Comment                  | N         | A comment about the location.                                         |
| Image                    | N         | Any image of the location.                                            |

A location is uniquely identified using latitude-longitude pair.

This is the only mandatory form needed to create a location.

### Location - Device Association

The second tab allows users to associate devices to the location. Usually a location will never change but sensors placed at a location can be changed.

There can be multiple reasons for the change:

- Battery Drained.

- Damage or some other fault.

- Reprogramming of the device etc.

But at a time, a device can be associated with only one location. At a location there can be multiple devices. E.g. One device can be pointing to North, other can be facing East to collect data. One device can be at ground level, another can be 10 meters high.

The following screen is the default view of the tab:

![OrbiwanImages]({{ page.image_path }}/AssociateDevice.png)

There is a button to associate devices - **Associate Device**. Once user clicks the button, a form appears below as:

![OrbiwanImages]({{ page.image_path }}/AssociateDevice-Add.png)

Below are the Mandatory fields required.

| Field     | Mandatory | Description                                                                                      |
| --------- | --------- | ------------------------------------------------------------------------------------------------ |
| Device ID | Y         | The Device ID                                                                                    |
| From Date | Y         | The date and time when device was placed at this location                                        |
| To Date   | Y         | By default this is not set, this is the date and time when device was removed from this location |
| Height    | Y         | Height of the device at the location                                                             |
| Direction | Y         | Direction of the deivce at the location                                                          |
| Active    | Y         | Whether this device still exists at the location. By default it is yes.                          |

**Note:** The option “Active” is provided so that old devices can be associated along with to date.

**Note:** For an inactive listing, to date is mandatory. If user is providing a to date, the association automatically becomes inactive.

All devices being associated are placed into Newly Associated Devices before the mappings are saved to database. All of the associated devices are listed in Associated Devices table.

## Tags

Users can also add tags to the location which can later be used for filtering. The following
screen shows the tab content:

![OrbiwanImages]({{ page.image_path }}/Tag.png)

## General Statistics

One of the key feature offered by Locations page is statistics. For each location, start date and end date can be set individually. More than one locations can be selected and statistics can be generated.

### Changing the dates

The empty space/date under the columns - start date and end date can be clicked. This will
open a calendar which helps users to select date and time.

![OrbiwanImages]({{ page.image_path }}/StatisticsStartDate.png)

Once the date is set, UI automatically saves it to database in order to preserve the selection.

### Bulk changing dates

Users can also select more than one location and click **Report Start Date** or **Report End Date**
to update the start/end date for all selected locations at once.

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkSelect.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkStartDate.png)

### Generating the Statistics

Once the dates are changed and locations are selected, users can generate the statistics by clicking on **Export location statistics** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation001.png)

After clicking export app will start processing and will generate the statistics. It will finally download a csv files.

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocationProcessing.png)

## Devices

The devices page allows users to view all sensors along with most recent noise status. The following figure is showing the device page:

![OrbiwanImages]({{ page.image_path }}/DevicePage.png)

Three columns **vBat**, **KPI** and **L/T** are LED types. The status shown are as:

### vBat - LED for battery voltage

- Green: Vbat > 3.45

- Yellow: Vbat > 3.3

- Red: Otherwise

### KPI - LED for radio KPI

- Green: SF11 or below

- Yellow: SF12 with SNR > -10dB

- Red: Otherwise

Add Device is not yet supported through this interface. The last column is the action menu as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/DisassociateDevice.png)

Action Menu allows users to:

- Disassociate from the location

- Edit device details

- Delete device

When edit device is clicked in actions, the following figure shows the edit device form:

![OrbiwanImages]({{ page.image_path }}/EditDevice.png)

Users can update name, add a comment, date of installation and battery installation. The **Compute data** flag decides if the data for device should be computed or not.

## Visualization

The visualization page enables users to visualize the data as charts. The charts are rendered based on the options selected. The interactive UI helps to let user choose locations, noise parameters, chart type etc.

**A note about data**

- The data is collected by noise sensors for a defined period of time, for current noise sensor it is defined as 15 minutes.

- Total 900 data points are collected over 15 minutes (1 per second).

- This data is aggregated and sent to Network Server.

- Thus, total 24x4 data points are the maximum count for a sensor.

The day and night periods are defined as the figure below:

![OrbiwanImages]({{ page.image_path }}/DataNote.png)

**Sampols app Navigation - Day/Night Period Definition**

| Period     | Start time | End time | Total time |
| ---------- | ---------- | -------- | ---------- |
| Day time   | 6:00       | 21:45    | 16 Hours   |
| Night time | 20:00      | 05:45    | 8 Hours    |

A sample view of the Visualization page is below:

![OrbiwanImages]({{ page.image_path }}/VisualizationUI.png)

The page can be divided into three major sections:

- The left side of the page has numerous options user can choose.

- The right top side, shows the generated charts.

- The right bottom side displays the tables with mean(average) and sigma(standard deviation) along with number of days. The tables are displayed for:

  - Monday to Friday - Only weekdays data is used to calculate mean and sigma.

  - Saturday to Sunday - Only weekends data is used to calculate mean and sigma.

  - Monday to Sunday - Data of all days of week is used to calculate mean and sigma.

### Filter Options

Users can do following:

- Choose one or more locations from dropdown.

- Filter locations by tags.

- Choose a date range for the visualisation.

- Choose one or more from the parameters - L10, L50, L90, L95, Lmin, Lmax, Leq, vBat, nMeas, Temperature.

- Select a chart from the following types. More about these charts is explained in next section in this chapter.

  - Average 15 Min.

  - Average OPB periods.

  - Average 24 hour chart.

  - Average accumulated chart.

- The Parameters Leq, Lmin, Lmax, L10, L50, L90, L95 can be selected at once.

- The charts are different when user selects:

  - Single location, single chart for all selected parameters(Leq, Lmin, Lmax, L10, L50, L90, L95).

  - Multiple location - one chart for each parameter showing all selected locations.

- If nMeas, Temp, VBat are selected, then it should show different chart for each of these
  parameters, since the scale for all three are different.

### Charts

**Average 15 Mins**

The average 15 min chart shows this data as it is.

![OrbiwanImages]({{ page.image_path }}/Average15MinGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

**Average OPB Periods**

The data collected over the day is aggregated further and two aggregations are done per day. For the night period and day period. This data is plotted as Average OPB period chart.

![OrbiwanImages]({{ page.image_path }}/AverageOPBGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

**Average 24 Hour**

Since the sensors are sending noise levels once every 15 minutes, there would be total 96 data points every day. For each day in date range selection, the data is to be averaged for each 15 min slot and be displayed on the chart as 96 data points. A curve fitting is also done using the function.

![OrbiwanImages]({{ page.image_path }}/Average24Hours.png)

The parameters used for the curve fitting are displayed below the chart. In the image, it can be seen that a table is generated for curve fitting parameters for Leq for Mon-Fri, Sat-Sun, Mon- Sun. The parameters are - Beta1, Beta2, t1, t2, Lmin, Lmax and R2.

**Accumulated Average**

It is possible to display the cumulative average values between the two dates selected by the user. For each parameter selected, the noise level is accumulated for day and night values. The difference between day and night value is also plotted.

![OrbiwanImages]({{ page.image_path }}/AccumulatedAverage.png)

There are few common things for each chart:

- Day and night indication lines: The grey lines(as a pulse) on the chart indicate day(high) and night period(low). Applicable for Average 15 min and Average OPB periods.

- Weekday and Weekend indication lines: The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low). Applicable for Average 15 min and Average OPB periods.

### Histogram

For all of the charts, histograms must also be plotted for all selected parameters, day and
night period, along with curve fitting:

- Week days (Monday - Friday).

- Week ends (Saturday - Sunday).

- Whole week (Monday - Sunday).

Similar to Average 24 hour chart, tables are displayed with curve fitting parameters for histograms. A chart with histograms for Monday to Friday for Leq is shown in the image below. the histograms are for day and night periods.

![OrbiwanImages]({{ page.image_path }}/NoiseHistogram001.png)

![OrbiwanImages]({{ page.image_path }}/NoiseHistogram002.png)

## Exporting the data

The chart data can be exported as csv file(s). Whatever options are selected, the data can be exported for those as:

- Raw Data: All of the raw data which is used to generate the charts and to do the calcualtions.

- Averaged Data: Daily aggregated data.

- Chart data: Final data which can directly be plotted to re-generate the charts.

  - For each chart data, histograms data and curve fitting parameters are also exported.

  - For Average 24 hour chart, where curve fitting is done, the parameters used for curve fitting are also exported.

## Tags

Tags page allows users to manage tags. Once a tag is created, it is available for filtering the locations on Map, Locations, and Visualization page.

The figure below shows a listing of the tags. Users can sort and filter the list using tag and description. The action column allows users to edit/delete the tag.

![OrbiwanImages]({{ page.image_path }}/TagPage.png)

The figure below shows add tag screen which allows users to add a new tag. The fields are:

| Field       | Mandatory | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| Tag         | Y         | Unique Tag name. This is used to filter content. |
| Description | Y         | Description of the tag.                          |

![OrbiwanImages]({{ page.image_path }}/TabAdd.png)

## Users

Users page allows administrators to manage users. The figure below is a glimpse of the page.

![OrbiwanImages]({{ page.image_path }}/UserPage.png)

This page allows administrators to manage the users. They should be able to add more users, change passwords, and allow users to be admin.

Administrators can also manage the permission to view the Jupyter notebook. If user is not allowed to view the jupyter notebook, he/she will not be able to see Jupyter tab in the menu.

Users can filter the list of users for - username, name, email, Administrator access, Jupyter access etc. Users can sort the list by name. The action column allows adminstrators to edit/delete users.

The figure below is the add user screen where administrators can add a user. Required fields are:

| Field            | Mandatory | Description                                                                                 |
| ---------------- | --------- | ------------------------------------------------------------------------------------------- |
| Name             | N         | Display name of a user.                                                                     |
| Username         | Y         | Required Username for the user.                                                             |
| Email            | Y         | Email address which is also used as a login.                                                |
| Password         | Y         | Password must contain at least 1 special character, uppercase, lowercase letter and number. |
| Confirm Password | Y         | Same as Password.                                                                           |
| Role             | Y         | The role of the user. The user can be Administrator, Normal User or Read-only.              |

## Configuration

After Account the next tab is Configuration. In the Configuration tab the user will be able to configure their own rules for Events which can also be considered as an alarm. To create an Event follow the steps given below:

### Global Threshold

This section allows the user to configure the thresold of the noise parameter. This thresold can be later assigned to a rule which will enable the application to raise the Events.

The User can add the Global Threshold by clicking the **Add Threshold** button as shown below:

![OrbiwanImages]({{ page.image_path }}/GlobalThreshold.png)

Once the values are entered into the desired parameters click on **Add** to add the global threshold.

### Event Definition

After Global threshold is configured, next the user has to configure the Event Definition. The Event definition will be responsible for the color coding of the Events when raised.

To add the Event Definition Click on the **Event Definition** under the configuration tab.

![OrbiwanImages]({{ page.image_path }}/EventDefinition-Configure.png)

Once, the Definition is entered and color is selected click on the **Add** button.

### Rules

After the Global Threshold and Events are defined, these values will be used to configure the Rules which will alert the application to raise an event.

To create a new Rule click on **Rules** under the configuration tab.

![OrbiwanImages]({{ page.image_path }}/Rule-Configuration.png)

**More Details on how to configure new Rules.**

When the User clicks on **Add Rules**, a window opens to add new rules which has various fields. Please find the details below on how to configure each values for the rules to be applied.

- **Name :** Enter the desired name for the Rule.

- **Description :** Enter the description for the Rule.

- **For all the locations that match these tags :** Select the tags assigned to the location for which this rule should be applied.

- **On :** This field allows the user to apply the rules on various types of data from the drop-down as shown in the below figure:

![OrbiwanImages]({{ page.image_path }}/Rule-On.png)

- **Evaluate the following :** Allows the user to set the condition which will be checked against the received data. This section is divided into two part for the users convenience namely:

  - **Interactive :** To enable the Condition click on the Rule, as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/Rule-Rule.png)

When Rule is clicked a parameter is enabled to set the configuration.

This section allows the user to select the parameter and assign the condition for the parameter from the drop-down. Please refer the image below:

![OrbiwanImages]({{ page.image_path }}/Rule-Param.png)

![OrbiwanImages]({{ page.image_path }}/Rule-Condition.png)

![OrbiwanImages]({{ page.image_path }}/Rule-FullCondition.png)

- **Advanced :** This section allows the user to write basic python script to set as condition as shown below:

![OrbiwanImages]({{ page.image_path }}/Rule-AdvanceConfiguration.png)

The basic code to check condition is `check threshold ('Name of the Parameter', 'Condition', $GlobalThresholdDefinition.Paramter)`.

**Note :** \$GlobalThresholdDefinition.Paramter are without single quotes.

A user can have check multiple parameter values in a single rule.

- **If true, raise :** This section is used to assign the event, when this rule is true the assigned Color coded event will be raised.

![OrbiwanImages]({{ page.image_path }}/Rule-IfTrue.png)

Click on **Add** to create a Rule.

The application also gives an option to Deactivate the rule if not required as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/Active-Deactivate.png)

## Language

At the top right of the page, there is a dropdown for choosing the languages. All supported languages are listed in the dropdown. User can choose the language of their choice.

Currently English and French are supported.

![OrbiwanImages]({{ page.image_path }}/Language.png)

## User Settings

Next to Languages dropdown at top right of the page, there is user settings dropdown. When users click on thier username and two links appear:

- User Settings: Opens the users detail screen similar to edit user screen. User can update own details using this.

- Sign Out: Allows users to sign out of the app.

Following figure shows that when username is clicked the links appear:

![OrbiwanImages]({{ page.image_path }}/UserSettings.png)

![OrbiwanImages]({{ page.image_path }}/UserSettings001.png)

## Documentations

<div>
<br />
<br />
<br />
<br />
</div>

## Device Datasheet

### General Description

![OrbiwanImages]({{ page.image_path }}/Noise-sensor-pic.png)

OrbiWise Sampols device is a high-performance wireless sensor for acoustic noise measurement. It measures the equivalent noise level averaged over 1 second in dBA (Leq1s) and periodically transmits reports containing noise level distribution information (by default: mean, minimum, maximum of Leq1s, Leq10, 50 90 and 95) and meta data such as temperature or battery voltage.

The Sampols Sensor is autonomous, easy to deploy and can perform continuous measurements over long periods of time.

The Sampols sensor is designed to work with the Sampols App, which provides extensive features and flexible analytics to address the needs of to cities and industrial applications alike.

### Size and Weight

<p ><img src="images/GettingStarted/Noise-sensor-model.png" alt="OrbiwanImages" width="900" height="450"></p>

- Length: 145.00 mm
- Width: 66.36 mm
- Height: 55.00 mm
- Weight (with battery): 313 g

### Acoustics

- Sensitivity (Typical): -29dBFS (at 94 dB SPL @ 1 kHz)
- Total Harmonic Distortion (THD): 0.1% , at 94 dB SPL @ 1 kHz
  THD: 1.6% , at 120 dB SPL @ 1 kHz

Measurements: Leq etc.
Possible Measurement Duty Cycles…

### Wireless

- LoRaWAN® 1.0.4
- Model xyz: US915 band (902MHZ-928MHZ). FCC certified.
- Model abc: EU868 band etc.

(\*) AU915 and AS923 models available Q1 2022?

### Environmental Characteristics

- Working temperature: -15°C to 65°C
- IP Protection: IP66
- Max recommended storage time <6 months
- Storage humidity: 5% to 95% non-condensing

### Battery Life

Do not attempt to replace the Sampols battery before having read the related instructions in the online material: you may damage the battery, possibly causing overheating, fire, and injury.
The Lithium-thionyl-chloride battery in your Sampols device is a high-performance, primary cell that cannot be recharged.
This battery should be recycled or disposed of separately from household waste following your local environmental laws and guidelines.

### Other features

FUOTA etc..

## Installation & Maintenance Guide

<div>
<br />
<br />
<br />
<br />
</div>

## End-User License Agreement (EULA) for Sampols Software

This Agreement sets forth the terms and conditions applicable to the licensing of the Sampols Software from OrbiWise SA, (hereinafter “Licensor” or “OrbiWise”) by the Party subscribing to the Software (hereinafter “Buyer”) through the Subscription page on OrbiWise website.
The offer of the Software on OrbiWise website and Buyer’s purchase of the corresponding Subscription on constitutes each Party’s respective acceptance of this Standard Contract and their entry into this Agreement.
Hereinafter Buyer and Licensor may be referred to collectively as the “Parties” or individually as a “Party”.

### 1. Power and Authority

Each Party represents and warrants that: (a) it has full power and authority to enter in and perform this Agreement and that the execution and delivery of this Agreement has been duly authorized; and (b) this Agreement and such Party’s performance hereunder will not breach any other agreement to which the Party is a party or is bound or violate any obligation owed by such Party to any third party.

### 2. Software as a Service

The Software licensed by OrbiWise under this Agreement is provided as a service (“SaaS”) to the Buyer.
If the pricing model selected by Buyer on OrbiWise website includes also Technical Support, said Technical Support is provided by OrbiWise according to the terms specified in the said pricing model.

### 3. Granted Rights

Subject to the terms and conditions of this Agreement, upon OrbiWise’ acceptance of Buyer’s Order, Buyer has the non-exclusive, non-transferrable, limited Right To Use the Licensed Software for its Sampols devices for a set term specified in the Order (“Subscription Term”).
Buyer acknowledges that Licensor’s SaaS Software is provided as an online, subscription-based hosted service (“Hosted Services”) and that Licensor may make changes to said Software from time to time.

### 4. Open Source Software

The Software provided by Licensor to Buyer may contain or be provided with components that are subject to the terms and conditions of “open source” software licenses (“Open Source Software”). Information pertaining said Open Source Software can be found in the Standard Contract Listing or Documentation. To the extent required by the license to which the Open Source Software is subject, the terms of such license will apply in lieu of the terms of this Agreement with respect to such Open Source Software, including without limitation, any provisions governing attribution, access to source code, modification and reverse-engineering.
Nothing in this Agreement limits Subscriber's rights under, or grants Subscriber rights that supersede, the terms and conditions of any applicable end user license for the Open Source Software.

### 5. Payment

Buyer agrees to pay all fees in accordance with each Order. Unless otherwise specified in the Order, Buyer will pay all amounts in Euros at the time Buyer places his/her Order and receives the related Invoice.
All payments are non-refundable, non-cancelable and non-creditable.
Licensor may, at its sole discretion, suspend Buyer’s access to the Software in the event Buyer’s invoice, remains unpaid for more than 30 (thirty) days from the invoice date.

### 6. Taxes

Buyer’s payments under this Agreement exclude any taxes or duties payable with respect to the licensed Software in the jurisdiction where the payment is either made or received. If any such taxes or duties are payable by Licensor, Buyer must pay to Licensor the amount of such taxes or duties in addition to any fees owed under this Agreement.

### 7. Buyer’s Data

“Buyer’s Data” means any data, content, code or other materials of any type that Buyer submits via the OrbiWise website and the Licensed Software. Buyer retains all right, title and interest in said Buyer’s Data.
Subject to the terms of this Agreement, Buyer hereby grants to Licensor a non-exclusive, worldwide, royalty-free right to collect and use Buyer’s Data, solely to the extent necessary to provide the applicable services to Buyer or utilize statistical and other aggregated data derived from Buyer’s use of the Services ("Aggregated Data") for Licensor's business purposes, provided the Aggregated Data is combined with similar data from Licensor's other customers and does not include any information identifying Customer or any identifiable individual. The Aggregated Data is not considered Buyer’s Confidential Information.
Buyer warrants and represents that its use of the Hosted Services and all Buyer’s Data are at all times compliant with all applicable local, state, federal and international laws and regulations (“Laws”).
Buyer represents and warrants to have secured all necessary rights to provide all Buyer’s Data to Licensor and that Buyer’s Data do not violate any intellectual property rights or, without limitation, any other third-party rights. including without limitation any intellectual property rights, rights of privacy, or rights of publicity, and any use, collection and disclosure authorized herein is not inconsistent with the terms of any applicable privacy policies. Buyer is solely responsible for Buyer’s Data and the consequences of disclosing, storing or otherwise using said data.
Licensor may remove or delete Buyer’s Data within a reasonable period of time after the termination of Buyer’s Subscription Term.

### 8. Limitation of Liability

Neither Party shall be liable for any loss of use, inaccurate or lost data, interruption of business or any consequential damages of any kind incurred by the other Party in relation to this Agreement.
Neither Party’s Aggregate Liability to the other Party shall exceed the amount paid by Buyer to Licensor in relation to this Agreement in the 12 (twelve) months immediately preceding the claim.
This section does not apply to:
a. Breach of License Grant;
b. Breach of Confidentiality Obligation;
c. Amounts owed by Buyer to Licensor in this Agreement;
d. Each Party’s express indemnification obligation in this Agreement;
e. A Party’s Gross Negligence, willful misconduct or fraud.

The parties agree that the limitations specified in this Section shall survive the Termination of this Agreement.

### 9. Confidentiality

For purposes of this Agreement, "Confidential Information" means any information that is confidential such as technical, commercial, strategic, financial, economic in nature, related to research, technical specifications, software, components, products, infrastructure, customers, network or business of a Party, on any medium, verbal, visual or written, and communicated to the other Party during the negotiations or the performance of this Agreement and Orders. The following information is not deemed Confidential Information:
i) Information that was already known to the Receiving Party before it was first communicated by the Disclosing Party, without confidentiality obligation;
ii) Information that was in the public domain at the time it was disclosed or which came into the public domain subsequent to such disclosure without this being the result of an infringement of any confidentiality obligation incumbent on the Receiving Party or on a third party; or;
iii) Information that one Party received in good faith from a third party who itself has no confidentiality obligation towards the Disclosing Party in relation to such information.
Any Confidential Information that is required to be disclosed pursuant to applicable law or court order or requested by another authority legally authorized to demand such disclosure may be disclosed as required but only limited to the extent as necessary to follow such request. In case of such request, to the extent permissible by law, the Receiving Party shall provide prior notice to the Disclosing Party and provide the latter with a copy of the demand for which the disclosure is required.
Any Party receiving Confidential Information (the “Receiving Party”) from the other Party (the “Disclosing PARTY”) undertakes:
(i) To hold said information in strict confidence, and to not publish or disclose it to third parties;
(ii) To not use the information for any purpose other than that provided in the Agreement and Orders;
(iii) To take all measures necessary to protect confidentiality;
(iv) To limit circulation and access to its directors, employees, representatives, consultants or sub-contractors or those of its Affiliated Companies that need to know such information and, in this case, to inform these people of the confidential nature of the information;
(v) To not make any copies for third parties.
Any disclosure of confidential information to third parties can only happen with the other PARTY’s previous written consent, subject to this Article.
Any breach of this Article by the Receiving Party shall authorize the Disclosing Party to terminate as of right this Agreement and the Order, in accordance with Article “Termination”, without prejudice to any damages that the Disclosing Party could claim.
In case of an unauthorized use or communication of the Confidential Information, in most cases, compensation is not an adequate remedy: the nature of the Confidential Information means that action to safeguard confidentiality is required before loss or damage has occurred (which shall not prevent it to obtain compensation). Therefore, the Receiving PARTY acknowledges that the Disclosing Party is entitled to apply for emergency remedial action from any judge such as an injunction, specific performance or other equitable relief, against any person or entity that has breached or is threatening to breach this Article. In doing so, the Disclosing PARTY will not have to prove that it has already incurred or will incur actual loss or damage.
Upon termination of this Agreement or sooner upon Disclosing Party’s written request the Receiving Party shall immediately undertake to return, to destroy or to extinguish any written or otherwise recorded information received from the other Party, including any copies made, to the other Party. The Party requesting that all written information be returned, destroyed or extinguished must be issued with confirmation that all such information has been returned, destroyed or extinguished. The Parties acknowledge, however, that Confidential Information provided in electronic format (e.g. e-mail) may be copied by the Receiving Party as part of its back-up procedures and if such copies cannot be destroyed or returned to the Disclosing Party each Party agrees that it shall not access or utilize such copies following receipt of a request to return, destroy or extinguish Confidential Information received from the Disclosing Party.

### 10. Term and Termination

This Agreement will continue in full force and effect until conclusion of the Subscription, unless terminated earlier by either Party as provided by this Agreement.

#### 10.1. Termination for Convenience

Buyer may terminate the Subscription or this Agreement without cause at any time upon notice to Licensor or using the termination or cancellation functionality available through the AWS Services.

#### 10.2. Termination for Cause

Either Party may terminate the Subscription or this Agreement if the other Party materially breaches this Agreement and does not cure the breach within 30 days following its receipt of written notice of the breach from the non-breaching Party.

#### 10.3. Effect of Termination

Upon termination or expiration of the Subscription or this Agreement, Buyer’s right to use the Software licensed under such Subscription will terminate, and Buyer’s access to the Software and Service provided under such Subscription may be disabled and discontinued. Termination or expiration of any Subscription purchased by Buyer from Licensor will not terminate or modify any other Subscription purchased by Buyer from Licensor.

### 11. Notices

To be effective, notice under this Agreement must be given in writing. Each Party consents to receiving electronic communications and notifications from the other Party in connection with this Agreement. Each Party agrees that it may receive notices from the other Party regarding this Agreement: (a) by email to the email address designated by such Party as a notice address for the Standard Contract; (b) by personal delivery; (c) by registered or certified mail, return receipt requested; or (d) by nationally recognized courier service. Notice will be deemed given upon written verification of receipt.

### 12. Governing Law and Arbitration

This Agreement shall be governed by and construed in accordance with the laws of Switzerland, without regard to its conflict of laws rules.
Any and all disputes, differences or questions arising out of or in connection with this Agreement shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce, by one or more arbitrators appointed in accordance with the said Rules. The arbitral proceedings shall be conducted in the English language and shall take place in Geneva, Switzerland.
Any arbitration award shall be final and binding and may, if necessary, be enforced by any court or authority having competent jurisdiction.
The Parties undertake and agree that all arbitral proceedings conducted under this Section shall be kept strictly confidential, and all information, documentation, materials in whatever form disclosed in the course of such arbitral proceedings shall be used solely for the purpose of the proceedings.
Notwithstanding the foregoing, nothing in this Section shall prevent the Parties from seeking any injunctive or equitable relief by a court of competent jurisdiction.

### 13. Entire Agreement

This Agreement constitutes the entire agreement between the Parties relating to the subject matter hereof, and there are no other representations, understandings or agreements between the Parties relating to the subject matter hereof. This Agreement is solely between Buyer and Licensor. Neither Amazon Web Services, Inc. nor any of its Affiliates are a party to this Agreement and none of them will have any liability or obligations hereunder. The terms and conditions of this Agreement will not be changed, amended, modified or waived unless such change, amendment, modification or waiver is in writing and signed by authorized representatives of the Parties. Neither party will be bound by, and each specifically objects to, any provision that is different from or in addition to this agreement (whether proffered orally or in any quotation, purchase order, invoice, shipping document, online terms and conditions, acceptance, confirmation, correspondence, or otherwise), unless such provision is specifically agreed to in a writing signed by both Parties.

## Warranty

OrbiWise warrants the included hardware product against defects in materials and workmanship for one year from the date of original purchase. OrbiWise does not warrant the included hardware product against normal wear and tear, nor damage caused by accident or abuse.
The warranty is restricted to the original country of sale.
To obtain service, contact OrbiWise at helpdesk@orbiwise.com, specifying the serial number of the device that the service request refers to.
Please read the complete warranty at https://orbiwise.com/resources/Sampols/Warranty.
If you submit a valid claim under this warranty, OrbiWise will either repair, replace, or refund your Sampols device at its own discretion. You may be required to furnish proof of purchase details when making a claim under this warranty.

## Certifications

### EU Regulatory Certification

This Sampols device operates in the 863-870MHz frequency band and complies with Directive 2014/53/EU.
Do not use this device in countries with different radio regulations.
A copy of the related Declaration of Conformity is available at https://orbiwise.com/resources/Sampols/Certifications.

### US Regulatory Certification

This Sampols device operates in the 902-928MHz frequency band and complies with part 15 of the FCC Rules.
Do not use this device in countries with different radio regulations.
A copy of the FCC Declaration of Conformity is available at https://orbiwise.com/resources/Sampols/Certifications.

## User Management

### Relationship among entities

The following core entities are part of the application:

- User
- Device
- Location
- Tags
- Permissions

Let’s understand each of these one by one.

### User

Users are independent entity which represents an individual(most often).

![OrbiwanImages]({{ page.image_path2 }}/User.png)

### Devices

A device is an independent entity which represents a single noise sensor device. Devices are associated with location. A device can be associated with atmost one location at a point of time.

![OrbiwanImages]({{ page.image_path2 }}/Device.png)

### Location

A location is a physical location. It can be a pole’s location, building, campus, field, an area etc. Every location will have latitude and longitude. At each location, there can be more than one device.

![OrbiwanImages]({{ page.image_path2 }}/Location.png)

### Tags

A tag is a keyword assigned to an entity. Mostly to a device or a location. More than one tag can be assigned to an entity. A single tag can be assigned to more than one entity.

![OrbiwanImages]({{ page.image_path2 }}/Tags.png)

### Permissions

User’s rights are managed using different rights. A right is a key using which a user can perform certain action or is entitled to access something.

![OrbiwanImages]({{ page.image_path2 }}/Permissions.png)

#### Normal User

Any logged in user has at least this right. This role allows users to see the pages which does not require any specific access.

#### Administrator

A super user will be able to do all of the administrative tasks for the application. All of the rights are part of this role.

#### Read-only User

A user will be only able to access certain pages and only view the data. The user with this roles will not be allowed to perform any modifications.
