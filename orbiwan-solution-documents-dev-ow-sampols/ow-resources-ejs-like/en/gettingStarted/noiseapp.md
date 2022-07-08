---
layout: page
title: Sampols Noise App
menu: gettingStarted
lang: en
permalink: 'noiseapp.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
# image_path1: 'images/NoiseSensorUI'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
visible: false
---

{:.pageTitle}

<div class="side-bar">
<ul id="menu" style="height: 503px;">
<li id="m_getting-started-with-orbiwan-edge" ><a href="#sampols-overview">Sampols Overview</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#getting-started-with-sampols">Login to Sampols</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#dashboard">Dashboard</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#data-source-application-integration-with-sampols">Data Source mapping</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#visualization">Visualization</a></li>
</ul>
</div>

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
<!-- <iframe src="images/FCC_grant.pdf" style="width:600px; height:500px;"></iframe> -->

<p ><img src="images/GettingStarted/flow-chart.png" alt="OrbiwanImages" width="650" height="230"></p>

<!-- ## Pre-Requisite:

Please make sure that the Noise-Sensor is Registered in the LNS and the device is transmitting. -->

## Login to Sampols NoiseApp

After adding the Device to the LNS, we need to setup the Sampols NoiseApp to analyse the Noise data. To Setup, login to the Sampols NoiseApp.

The Login page looks likes as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Login.png)

Once you Sign in, you will be redirected to the first page i.e. **Map** which shows the location of the devices, as shown in the image below:

<!--![OrbiwanImages]({{ page.image_path }}/NoiseSensor-Map.png) -->

<!-- [OrbiwanImages]({{ page.image_path }}/Noise_App1.png)
<a href="images/FCC_grant.pdf" target="_blank">FCC Grant of Equipment Authorization for US Sampols Device</a> -->

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

Once the tenant is added, the admin will have to configure the **Data Source**. The **Data Source** will be used establish a connection between the LNS and Sampols NoiseApp. To configure the **Data Source** select the Tenant, Click on **Action** --&gt; **Data Source** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/AddDataSource.png)

![OrbiwanImages]({{ page.image_path }}/AddNewDataSource.png)

Enter the required details in the fields and click on **Add** button as shown iin the image below:

![OrbiwanImages]({{ page.image_path }}/AddNewDataSource_001.png)

Once, the **Data Source** is added, the Device registered in the LNS will show in the Sampols NoiseApp after the first Payloads in the **Map** as shown in the image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png)  -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

<div>
<br />
<br />
<br />
</div>

## Visualization

The **Visualization** page shows the graphical representation of the data received by the Sampols NoiseApp for the analysis.

To view the data select the location in the **Select Location(s)** section as shown in the below image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-001.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App2.png)

Once, the Location is selected, click on **Draw Graph** to view the graphical representation of the Noise-Data as shown in the image below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-002.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App3.png)

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-003.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App4.png)

# Noise Sensor UI

The UI is divided into several pages to help manage content and visualise data collected by sensors. A glimpse of the NoiseApp can be seen in the figure below:

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

After clicking export NoiseApp will start processing and will generate the statistics. It will finally download a csv files.

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

**Sampols NoiseApp Navigation - Day/Night Period Definition**

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

- Sign Out: Allows users to sign out of the NoiseApp.

Following figure shows that when username is clicked the links appear:

![OrbiwanImages]({{ page.image_path }}/UserSettings.png)

![OrbiwanImages]({{ page.image_path }}/UserSettings001.png)
