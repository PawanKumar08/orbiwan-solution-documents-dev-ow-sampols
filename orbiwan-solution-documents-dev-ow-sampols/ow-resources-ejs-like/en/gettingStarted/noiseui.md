---
layout: page
title: NoiseUI
menu: gettingStarted
lang: en
permalink: 'noiseui.html'
image_path: 'images/GettingStarted'
image_path2: 'images/UserManagement'
image_path3: 'images/Installation-maintenance'
video_path: 'videos'
sub_pages: false
page_type: 'sub-page'
---

{:.pageTitle}

<div class="side-bar">
<ul id="menu" style="height: 503px;">
<li id="m_getting-started-with-orbiwan-edge" ><a href="#dashboard">Dashboard</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#map">Map</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#location">Location</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#general-statistics">General Statistics</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#devices">Devices</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#visualization">Visualization</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#exporting-the-data">Exporting the data</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#event">Event</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#groups">Groups</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#global-threshold">Global Threshold</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#event-definition">Event Definition</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#users">Users</a></li>
<!--<li id="m_getting-started-with-orbiwan-edge" ><a href="#tenant">Tenant</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#tags-1">Tags</a></li>-->
<li id="m_getting-started-with-orbiwan-edge" ><a href="#login-forwarding">Login Forwarding</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#report">Report</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#jupyter">Jupyter</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#languages">Language</a></li>
<li id="m_getting-started-with-orbiwan-edge" ><a href="#audit-history">Audit History</a></li>
</ul>
</div>

# Detailed Sampols NoiseApp Navigation

The UI is divided into several pages to help manage content and visualise data collected by sensors. A glimpse of the NoiseApp can be seen in the figure below:

<!-- ![OrbiwanImages]({{ page.image_path }}/Map.png) -->

![OrbiwanImages]({{ page.image_path }}/Noise_App1.png)

The list below gives a breif intoduction to all pages:
- __Dashboard:__ A live dashboard showing current data counts, relative noise and newest events.

- __Map:__ Helps users to visualize the locations on map.

- __Locations:__ Allows users to manage locations and generate and export statistics for selected locations.

- __Devices:__ Allows users to manage devices.

- __Events:__ All raised events can be seen, exported using this page.

- __Visualization:__ Users can analyse the data with help of numerous charts. Users can export the charts data,
raw data, aggregated data etc.

- __Groups:__ Allows users to manage groups.

- __Accounts:__
  
  - __User:__ Allows administrators to manage users.
  
  - __Tenants:__ Allows System Administrators to manage tenants.

- __Configuration:__

  - __Global Thresholds:__ Thresholds can be created, updated and then can be used in rules.

  - __Event Definitions:__ Event types, which are raised when rules are evaluated to be true.

  - __Rules:__ As the name suggest, a rule is kind of a function or code which gets called on data to detect if
there is any alert situation.

- __Jupyter:__ If a user has permission to access jupyter, notebooks can be accessed. Users can play with the data
collected.

Apart from these navigation items, there are two more tabs for the users:

- __Language Drop Down:__ Allows users to choose a language. Currently French and English are supported.

- __User Info:__ Allows users to manage their account details, change password etc. Also provides a link to sign out
of the app.

## Sampols NoiseApp Ideology

The main concept in Sampols NoiseApp is Location.
Sampols works around the idea of collecting noise data from the designated location where the devices are located.
Hence it becomes necessary for the users to identify appropriate location for the devices to be installed so that the data from the location can be used to measure the noise.

Therefore we do not register devices on the Sampols NoiseApp, instead we create locations and assoaciate devices to these locations.

<!-- ## Dedicated Customers vs SAAS Customers

Dedicated customers will have access to a private instance where they can be in control of various tenants within a network.

The  concept of a tenant basically allows users to create a separate private network(tenant network) within the NoiseApp network called the tenant.
The tenant network admin (also referred to as Landlord user) user can control access of the user account data, data souce of the data creation/deletion of tenants on the dedicated instance.
Within each tenant network data is kept private (ie no other tenant can access/see the network) or can share it with other tenant networks.

Dedicated customers have access to the lanlord user.

SAAS customers will not be able to create tenants or manage tenants. They will be assignned to a particular tenant. -->

## Dashboard

Dashboard gives you a high level overview of your assets. You can see the counts of devices, locations and events. A relative noise chart gives you an idea of the current noise levels. Most recent events captured can be seen in the Newest events table.

![OrbiwanImages]({{ page.image_path }}/Dashboard.png)

All of the sections are discussed in details in the sections below:

There are three data counts

- __Devices:__ Shows the total and active devices. The widget also allows you to reload the counts.
- __Locations:__ Shows the total locations. The widget also allows you to reload the counts.
- __Events:__ Shows the last 30 days events counts as active vs total. Also shows top active event names. For big screen the max event names count is 5 and for smaller screen 2 event names along with the active event counts are displayed.

__Note:__ All of the widgets allow users to update the counts to live value without the need of refreshing the page.

### Relative Noise Chart

The chart shows a distribution of relative noise for all devices for given filters. On x-axis relative noise value is plotted and on y-axis number of devices are plotted as bars - just like a distribution.

Relative noise for a device is calculated as:

*Short_term_relative_noise* = Noise data in most recent xx minutes i.e. Latest Short Term Average.

*Long_term_relative_noise* = Noise data in most recent yy days i.e. Long Term Average.

__Relative_noise__ = Short_term_relative_noise - Long_term_relative_noise

As shown in the image below:

__Note:__ A relative noise > 0 means the noise received is higher than the usual.


| Filter                   | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| Groups                   | Groups assigned to tenant.                                            |
| Locations                | All the locations.                                                    |
| Measurement Parameters   | One of the noise parameters [Leq, Lmin, Lmax, L10, L50, L90, L95] for which chart is to be generated|
| Latest Short Term Average| The short term minutes options are - 15min, 30min, 60min.             |
| Long Term Average        | For Long term days we can 1, 3, 7, 14, 28, 30 days.                   |


The chart also plots the standard deviation values which gives an idea of the spread of the relative noise. If the periods are defined and used in Tenant Profile, then the chart title will show the applied period.

To understand more about periods and the role on relative noise, lets take an example. Consider that you’re viewing the chart at 2pm of a weekday(Monday-Friday) and there is a period defined for 5am till 7pm for a weekday.

Then the chart title will show the Applied Period as Weekday Day Time (05:00 - 19:00), Weekdays where Weekday Day Time is the name of the shift defined in Tenant Profile.

The chart plots -3σ, -2σ, -σ, σ, 2σ, 3σ values highligh,ng the area. Usually 99% of the data stays within -3σ to 3σ.

### Newest Events

A screenshot of the events table is shown below:

![OrbiwanImages]({{ page.image_path }}/Newest_Events.png)

The newest events table shows latest 25 events. The table allows users to filter the results based on:

| Field                   | Filteting Type              | Description                              |
| ------------------------| ----------------------------|----------------------------------------- |
| Name                    | Text (Partial).             | Name of the event (Event definition).    |
| Status                  | Dropdown.                    | Active/Closed.                           |
| Location                | Text (Partial).               | Name of the location.                    |
| Groups/Tags             | Text (Partial).              | Groups(tags) assigned to event.         |


The columns in the event table are:

| Column                   | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| Event Name               | Name of the Event (definition).                                       |
| Status                   | Active, if the event is still there, closed otherwise.                |
| Start Time               | Start time of the event.                                              |
| End Time                 | End time of the event.                                                |
| Locations                | Locations for which the event is raised.                              |
| Deveuis                  | Deveuis if applicable.                                                |
| Groups                   | Groups assigned to the rule which raised the event.                   |
| Action                   | Action column allows users to perform an action.                      |

The action column has actions for:

- __Visualise Event:__ Allows you to visualise the data of participating locations/tags for the event. The event along with surrounding days data is visualised as Average 15min chart.

- __Show Event on Map:__ Allows you to see the events on participating locations/tags at the time when this event was raised.


## Map

Map menu shows a customized map where the markers show sensors deployed on the city of choice.

<!-- ![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png) -->

![OrbiwanImages]({{ page.image_path }}/Device_Map_Location1.png)

### Groups Filter
 The groups search box allows users to filter locations for a selected groups. Once user starts typing the groups name, suggestions appear below and user can select one or more groups.

The Reset button resets the group filter to default tag selected in user preferences. Also, Map is reset to user’s preferred latitude, longitude and zoom level.

![OrbiwanImages]({{ page.image_path }}/Group_filter.png)

### Parameters dropdown
 Users can see the status for all locations for various parameters. The dropdown allows users to select one of the parameters.

  - __Last noise Status:__
      - __Available Noise parameters:__  Leq, Lmin, Lmax, L10, L50, L90, L95

  - __Last reception__

  - __Battery Voltage__

  - __Active Events__

  - __Relative Noise:__
      - __Available Noise parameters:__  Leq, Lmin, Lmax, L10, L50, L90, L95.

  - __Current Baseline:__
      - __Available Noise parameters:__  Leq, Lmin, Lmax, L10, L50, L90, L95.

  - __Absolute Threshold Levels:__
      - __Available Noise parameters:__  Leq, Lmin, Lmax, L10, L50, L90, L95.

  Leq is the default noise parameter selected.

  Once you select a parameter, both location list and map view will change the markers according to the legend shown on Map view. The legend has a different color value map for each parameter. All these color schemes can be customized using Tenant profiles.

### Locations List
The locations list is displayed along with current status for selected parameter along with more options.

  - First column (with checkboxes) allow users to select a location directly from the list.

![OrbiwanImages]({{ page.image_path }}/First_column.png)

  - Second column is the location name. Users can also filter the locations using this. Clicking on the location name will locate the location on map.

![OrbiwanImages]({{ page.image_path }}/Second_column.png)

  - Next column is status. This columns shows the LED marker based on the parameter selected.

![OrbiwanImages]({{ page.image_path }}/Third_column.png)

  - Next to Status there are some actions which user can perform for each location.
         
    - **Visualisation icon**, which takes you directly to the visualization page with location selected. The default visualization shown is the Average 15 min for last 7 days.

      ![OrbiwanImages]({{ page.image_path }}/Visual.png)

    - **Eye icon**, which allows you to quickly view different charts for the location in a modal, thus no need to visit the visualisation page if you’re interested to just get the idea about the noise levels.

      ![OrbiwanImages]({{ page.image_path }}/Eye.png)
 


The list also supports pagination and sorting. User can also select number of locations to be displayed on the list.
          


### Map View
The map is cabable of showing following details using different colored markers.

- __Markers:__ One marker represents one location. It color changes as per the legend displayed.

- __Legend:__ The map also has a legend for which color scheme can be separate depending on the 
selected paramter as explained in bullet point 2 of this list.

- Users can click on any location marker and see a popup with high level details about the location.
![OrbiwanImages]({{ page.image_path }}/Clicking_To_Location.png)

- After clicking the marker, user can select the location.

- The map view allows users to select more than one location. This feature is handy when user wants 
to visualize more than one location at a time. User can select all locations of their choice and simply click the visualization tab, the charts will be rendered for the locations selected. > Although users are allowed to select any number of locations, but it is wise to select a limited number (e.g. 1-6) so that the lines on the charts are clearly visible.

### Map Options
- On the right side of the map, there is options icon which allows users to control the markers.
![OrbiwanImages]({{ page.image_path }}/Map_Option.png)
         
   - **Checkbox** Show only selected locations - If user has selected some locations, checking this option will show only those selected locations and hide all other locations.

   - **Checkbox** Hide locations popup - Hides the location popup so that it does not overlap other markers and allows users to check nearby locations.
   
   - The Map marker icon with a plus sign allows you to add a new location. The add location interface is explained in chapter - Locations.

- If you select one or more locations, then an icon appears below the add location icon on map. This 
option allows users to group the selected locations at once.
        
  ![OrbiwanImages]({{ page.image_path }}/Assign_group_to_selected_location.png)

Once you click on the icon, it opens a modal to let you select one or more groups to assig to selected 
locations.
  
  ![OrbiwanImages]({{ page.image_path }}/Map_Group_Of_Location.png))

### Time Machine
 - This feature allows users to do playback or to view map on a date in past.
Following screenshot shows a time slider.
![OrbiwanImages]({{ page.image_path }}/Time_machine.png)
         
   - At the left and right there are two date time selectors which stand for start_time and end_time. 
By default the date range is selected for 7 days.

   - Dropdown before play button with 15min, 30min, 1hr options allow you to choose a time interval. If 
you selected 1 hour, and playback start time is 1pm, then the playback will be done for 1pm, 2pm, 
3pm… and so on till the end_date is reached.

   - The play button allows you to play/stop the playback.

   - Few utility buttons are also provided for quickly go forward or backward 1hour, 1day, 1week. The 
buttons will honour the start and end dates. If the button can not take you to forward or back in time 
because of date ranges, it will be disabled.

   - Once the playback is started, it will fetch the data and update the markers on map.

   - The status of selected parameter will be shown on the map.
  
   - In case the data is not present or is not applicable, icon color will be of No Data.
   
   - At the middle there is another time which shows the time being viewed during playback.
   
   - In case you do not want to do a playback, you can simply click on the date time displayed in middle 
and select a date time for which you want to view the data.

   - When you’re viewing the data of past, the Live icon will turn to gray.
   
   - At any moment when the playback is stopped, you can click the Live icon to fetch the latest data and display it on map.


### Quick View of Noise Levels

- The eye icon for a location, on the location table, opens a modal which allows users to view various charts for a location. The difference between this view and visualisation page is that on quick view, you can not choose filter to customise the chart. Also, histograms, weekly averages, statistics summary are not present as well.
- If user clicks on the icon, user can see the quick view of noise levels for the selected location. By default the user will see the data for last 7 days. The number of days are configurable. This sections lists out all of the available quick 
views

![OrbiwanImages]({{ page.image_path }}/QuickView.png)

- **Quick View of Noise**

This chart shows the individual time series of Leq, Lmin, Lmax for selected location.

![OrbiwanImages]({{ page.image_path }}/QuickView-001.png)

- **Average 15 Min**

This chart shows the average 15 min chart for Leq, Lmin, Lmax similar to the one on
visualization page.

![OrbiwanImages]({{ page.image_path }}/QuickView-15Min.png)

- **Average OPB Periods**

This chart shows the average OPB chart for Leq similar to the one on visualization page.

![OrbiwanImages]({{ page.image_path }}/DayNight.png)

**Average 24 hours**

This chart shows the average 24 hour for Leq similar to the one on visualization page.

![OrbiwanImages]({{ page.image_path }}/Average24.png)


<!-- - Average OPB Periods

This chart shows the average OPB chart for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-OPB.png)

- Average 24 hours

This chart shows the average 24 hour for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-24Hour.png) -->

- **Accumulated Average**

This chart shows the accumulated average for Leq, Lmin, Lmax similar to the one on visualization page.

![OrbiwanImages]({{ page.image_path }}/QuickView-Average.png)


<!--location-->
It allows users to click on any location and see a popup with high level details about the location as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/Device-Marker.png)

## Locations

Allows users to manage locations and generate and export statistics for selected locations.

The Location page shows a list of all available locations as a table where columns describe all about the location. The
following table lists all columns of location table:

| Column                   | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| Name                     | Name of the Location                                                  |
| Status                   | LED, based on the last reception                                      |
| Start Date               | Start date, needed for the statistics.                                |
| End Date                 | End date, needed for the statistics.                                  |
| Timezone                 | Auto guessed timezone of location using latitude and longitude.       |
| Latitude                 | Locations Latitude.                                                   |
| Longitude                | Locations Longitude.                                                  |
| Nearest Physical Address | Locations Physical address.                                           |
| Deveuis                  | Deveui Mapped/Associated to the location.                             |
| Action                   | Action column allows users to perform an action.                      |

<!-- ![OrbiwanImages]({{ page.image_path }}/Location-Tab.png) -->

![OrbiwanImages]({{ page.image_path }}/Location-Tab1.png)

The last column in the table is Action column. Following options are available for an administrator: 

- __Show on Map:__ Clicking this, will take you to Map with location selected.

- __Edit:__ Allows you to edit the location details and device mappings

- __Delete:__ Allows you to delete the location. Before the location gets deleted, the devices mapped to locationswill be dis-associated, the tag mappings will be removed.

User can select one or more location and export statistics about the location. The exported statistics table contains the following:

- Location details.
- Day and night data averages statistics for Leq, Lmin, Lmax, L10, L50, L90, L95 - mean, std etc.

![OrbiwanImages]({{ page.image_path }}/Location_option01.png)

The figure below shows the view of the Locations page. A list of all locations is displayed along with few buttons: 

- __Refresh:__ Icon, Refreshes the page.
- __Add Location:__ Button, Allows users to add a location.
- __Report Start Date:__ Button, Bulk change the start date for selected locations. This is not enabled if no location
is selected
- __Report End Date:__ Button, Bulk change the end date for selected locations. This is not enabled if no location
is selected.
- __Export location statistics:__ Icon, Allows users to export statistics of selected locations. This is not enabled if
no location is selected.
- __Tags filtering:__ Allows users to filter the locations by tags.

![OrbiwanImages]({{ page.image_path }}/Location_option02.png)

## Adding Location

Adding a location is divided into three different screens.

### Geolocation details of the location

The following screen is for adding a location:

![OrbiwanImages]({{ page.image_path }}/Location-AddLocation.png)

For Geolocation tab, the fields are: 

| Field                    | Mandatory | Description                                                           |
| ------------------------ | --------- | --------------------------------------------------------------------- |
| Location Name            | Y         | Location name. This is used to filter content.                        |
| Nearest physical address | N         | Nearest address to the location to help users to locate the location. |
| Latitude                 | Y         | Latitude of the location.                                             |
| Longitude                | Y         | Longitude of the location.                                            |
| Comment                  | N         | A comment about the location.                                         |
| Image                    | N         | Any image of the location.                                            |

A location is uniquely identified using using its name.

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

The fields are:

| Field     | Mandatory | Description                                                                                      |
| --------- | --------- | ------------------------------------------------------------------------------------------------ |
| Device ID | Y         | The Device ID                                                                                    |
| From Date | Y         | The date and time when device was placed at this location                                        |
| To Date   | Y         | By default this is not set, this is the date and time when device was removed from this location |
| Height    | Y         | Height of the device at the location                                                             |
| Direction | Y         | Direction of the deivce at the location                                                          |
| Active    | Y         | Whether this device still exists at the location. By default it is yes.                          |

**Note:** The option “Active” is provided so that old devices can be associated along with to date.For an inactive listing, to date is mandatory. If user is providing a to date, the association automatically becomes inactive.

All devices being associated are placed into Newly Associated Devices before the mappings are saved to database. All of the associated devices are listed in Associated Devices table.

### Location-Tags

Please note that throughout the document, tags and groups are inter-changeable. They refer to the same thing. Using tenant profile, you can choose whether you want to use Groups or Tags.

Users can also add tags to the location which can later be used for filtering. The following
screen shows the tab content:

![OrbiwanImages]({{ page.image_path }}/Tag.png)

## General Statistics

One of the key feature offered by Locations page is statistics. For each location, start date and end date can be set individually. More than one locations can be selected and statistics can be generated.

**Changing the dates**

The empty space/date under the columns - start date and end date can be clicked. This will
open a calendar which helps users to select date and time.

![OrbiwanImages]({{ page.image_path }}/StatisticsStartDate.png)

Once the date is set, UI automatically saves it to database in order to preserve the selection.

**Bulk changing dates**

Users can also select more than one location and click **Report Start Date** or **Report End Date**
to update the start/end date for all selected locations at once.

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkSelect.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkStartDate.png)

 **Generating the Statistics**

Once the dates are changed and locations are selected, users can generate the statistics by clicking on **Export location statistics** as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation001.png)

There are two options for user to choose.

  - Include tagged data - whether to include tagged data in the statistics calculations or not

   - User current time as end date - If this option is enabled then for all chosen locations, data will be fetched for each location for duration - pre-selected-location-start-date till current-time.
After clicking export - app will start processing and will generate the statistics. It will finally download a csv 
files.


After clicking export NoiseApp will start processing and will generate the statistics. It will finally download a csv files.

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocationProcessing.png)

Please note that statistics generation is a time consuming task due to a lot of calculations being done for each location selected.



## Devices

The devices page allows users to view all sensors along with most recent noise status. The following figure is showing the device page:

![OrbiwanImages]({{ page.image_path }}/DevicePage.png)

The table has following columns-

| Column     | Description                                                                                      |
| --------- | ---------------------------------------------- |
| DevEUI |          Deveui of the device                                                                                    |
| Name   | Name given to the device                                        |
| Location     | Location to which the device is mapped |
| Vbat       | Battery Voltage LED, for details see below                                                             |
| KPI    | LED, For details see below                                                          |
| L/T        | LED, For details see below                          |
| Last Reception |          Last reception date time                                                                                    |
| Last RSSI   | RSSI of last received uplink                                        |
| Last SNR     | SNR of the last received uplink |
| Date Installation       | Date of installation of device                                                            |
| Date Installation Battery    | Date of installation of new battery                                                          |
| Payloads Received        | Number of payloads received till date                         |
| Firmware Version    | Version of the firmware installed on device                                                        |


Three columns **vBat**, **KPI** and **L/T** are LED types. The status shown are as:

**vBat - LED for battery voltage**

- Green: Vbat > 3.45

- Yellow: Vbat > 3.3

- Red: Otherwise

**KPI - LED for radio KPI**

- Green: SF11 or below

- Yellow: SF12 with SNR > -10dB

- Red: Otherwise

**L/T - LED for last transmission**

- Green : received in last 6 hours

- Yellow : received in last 3 days

- Red : otherwise

Add Device is not yet supported through this interface. The last column is the action menu as shown in the figure below:

![OrbiwanImages]({{ page.image_path }}/DisassociateDevice.png)

Action Menu allows users to:
 
- View device on map 

- Disassociate from the location

- Edit device details: Allows you to update the saved device object.

- Delete device: This allows you to configure the (actual)device.

When edit device is clicked in actions, the following figure shows the edit device form:

![OrbiwanImages]({{ page.image_path }}/EditDevice.png)

Users can update name, add a comment, date of installation and battery installation. <!--The **Compute data** flag decides if the data for device should be computed or not.-->

### Device Settings

Device settings allow you to configure the behaviour of the actual device. There are three tabs - Periods, Filters, and 
System.

![OrbiwanImages]({{ page.image_path }}/Device_setting.png)

  - Periods

  This tab allows users to specify the measurement period, hours of the day when device should be active, measurement duty cycle during off hours.

  ![OrbiwanImages]({{ page.image_path }}/Period.png)

   - Filters

   ![OrbiwanImages]({{ page.image_path }}/Filters.png)

   - System

   ![OrbiwanImages]({{ page.image_path }}/System.png)

  
## Visualization
The visualization page enables users to visualize the data as charts. The charts are rendered based on the options selected. The interactive UI helps to let user choose locations, noise parameters, chart type etc.

<!-- ![OrbiwanImages]({{ page.image_path }}/Visualization-Tab.png) -->

![OrbiwanImages]({{ page.image_path }}/Visualization-Tab1.png)

![OrbiwanImages]({{ page.image_path }}/Visualization-Tab2.png)

![OrbiwanImages]({{ page.image_path }}/Visualization-Tab3.png)

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

###  Visualization UI

A sample view of the Visualization page is below:

![OrbiwanImages]({{ page.image_path }}/VisualizationUI.png)

The page can be divided into three major sections:

- The left side of the page has numerous options user can choose.

- The right top side, shows the generated charts.

- The right bottom side displays the tables with mean(average) and sigma(standard deviation) along with number of days. The tables are displayed for:

  - __Monday to Friday:__ Only weekdays data is used to calculate mean and sigma.

  - __Saturday to Sunday:__ Only weekends data is used to calculate mean and sigma.

  - __Monday to Sunday:__ Data of all days of week is used to calculate mean and sigma.

  ### Filter Options

Users can do following:

- Filter locations by tags.

- Choose one or more locations from dropdown.

- If a location is selected, then from device dropdown a device can be selected. The device dropdown shows all devices currently placed at the location.

- If the tenant profile has Global thresholds allowed, then in the filters, global threshold dropdown will appear. Once selected, the global threshold is plotted with Average 15 min chart. More about this is explained in next section - charts.

- If the tenant profile has Compare with nearby locations allowed, then a one more filter is visble as below -

![OrbiwanImages]({{ page.image_path }}/Compare_the_location.png)

User can select upto 5 more locations to compare. Based on the number selected, nearest locations (as per physical distance (as per latitude, longitude)) data will be compared with the location selected in filter.

- Histogram’s bins size - Allows users to configure bin size for all histograms.

- Choose a date range for the visualisation.

- Choose one or more from the parameters - L10, L50, L90, L95, Lmin, Lmax, Leq, vBat, nMeas, Temperature.

- Select a chart type to generate. More about these charts is explained in next section in this chapter.

<!-- - Select a chart from the following types. More about these charts is explained in next section in this chapter.

  - Average 15 Min.

  - Average OPB periods.

  - Average 24 hour chart.

  - Average accumulated chart.
  
- The Parameters Leq, Lmin, Lmax, L10, L50, L90, L95 can be selected at once.

- The charts are different when user selects:

  - Single location, single chart for all selected parameters(Leq, Lmin, Lmax, L10, L50, L90, L95).

  - Multiple location - one chart for each parameter showing all selected locations.

- If nMeas, Temp, VBat are selected, then it should show different chart for each of these
  parameters, since the scale for all three are different.-->

### Charts

**Accumulated Average**

It is possible to display the cumulative average values between the two dates selected by the user. For each parameter selected, the noise level is accumulated for day and night values. The difference between day and night value is also plotted.

![OrbiwanImages]({{ page.image_path }}/Accumulated_Average_Chart.png)



**Average 15 Mins**

Usually a device sends uplink with data every 15 minute. We can also refer it as raw data. The average 15 min chart shows this data as it is.

![OrbiwanImages]({{ page.image_path }}/Average15MinGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

- If tenant profile has enabled config - Visualization > Show mu/sigma on charts, then for each 
selected parameter, µ and σ are calculated and plotted as a straight horizontal line with shaded area under µ - σ to µ + σ.

![OrbiwanImages]({{ page.image_path }}/miue_and_sigma.png)

**Average 15 min chart with Global Thresholds**

Sometimes, you need to visualise the data to identify a good threshold level so that it can be used in rules. If a 
parameter value is more than the threshold, then an event should be raised. To identify this threshold, Average 15 min 
chart can help. - Select a global threshold from the global threshold filter from left side. - As soon as filter is selected, it 
would appear as:
   
    ![SampolsApp Navigation - global threshold filter](./images/noiseapp-ui-page-visualizations global-th-filter-2.2.png){#fig:SampolsApp-Navigation-Vis-Global-Threshold-Filter}

   - The chart will also update to plot the global threshold.

   ![OrbiwanImages]({{ page.image_path }}/Chart_with_threshold.png)

   - A data summary will be printed with approximate number of events which will be raised with selected 
threshold.

   ![OrbiwanImages]({{ page.image_path }}/Data_Interpreted.png)

   - Users can change the global threshold values by editing it and re-plotting the charts. User can click on the edit button just below the global thresholds filter and a modal opens with threshold values.

![OrbiwanImages]({{ page.image_path }}/update.png)
![OrbiwanImages]({{ page.image_path }}/update_threshold.png)


   - In case, there is no global threshold available, user can select Create New from global thresholds filter. This will open a similar UI as creating a new threshold but the name and variable field will not be present. User can just press OK and the new values will be used.

   ![OrbiwanImages]({{ page.image_path }}/Global_Threshold_New.png)




   - Once the threshold values look good, the global threshold can be saved.
   - If Tenant profile has enabled Visualisation > Show param histogram as main chart config, 
then the distributions for selected parameters are also plotted as an additonal chart below the Average 15 min Chart.

![OrbiwanImages]({{ page.image_path }}/Parameter_distribution.png)

   - This is a plot as Parameter Leq on x-axis and Number of Data Points on y-axis. Along with the distribution chart also plots -3σ, -2σ, -σ, σ, 2σ, 3σ values highlighting the area.

**Events with Average 15 min Chart**

 If Tenant profile has enabled Visualisation > Show events on charts config, then the events also plotted on __Average 15 min Chart__.

 

 ![OrbiwanImages]({{ page.image_path }}/Event_visulization.png)

 This is a plot as Parameter Leq on x-axis and Number of Data Points on y-axis. Along with the distribution chart also plots -3σ, -2σ, -σ, σ, 2σ, 3σ values highlighting the area.

**Average 24 Hour**

Since the sensors are sending noise levels once every 15 minutes, there would be total 96 data points every day. For each day in date range selection, the data is to be averaged for each 15 min slot and be displayed on the chart as 96 data points. A curve fitting is also done using the function.

![OrbiwanImages]({{ page.image_path }}/Average24Hours.png)

The parameters used for the curve fitting are displayed below the chart. In the image, it can be seen that a table is generated for curve fitting parameters for Leq for Mon-Fri, Sat-Sun, Mon- Sun. The parameters are - Beta1, Beta2, t1, t2, Lmin, Lmax and R2.


**Day/Night Averages Chart**

The data collected over the day is aggregated further and two aggregations are done per day. For the night period and day period. This data is plotted as Average OPB period chart.

![OrbiwanImages]({{ page.image_path }}/AverageOPBGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

**Event Duration Distribution Chart (Data Counts)**

  - This chart plots the distribution of event durations. Event duration is calculated as event_end_time - event_start_time. The value is converted(and rounded) to minutes.
  - This chart is similar to the event duration distribution chart with percentage with a minor difference. The values shown on y-axis here are not percentage.
  - A sample chart is shown below:
    

![OrbiwanImages]({{ page.image_path }}/Event_Duration_Distribution.png)

![OrbiwanImages]({{ page.image_path }}/Statistic_event.png)

In the chart above x-axis is the duration in minutes and y axis shows the number of events.

This chart only considers closed events since for active events, duration calculated will be based on assumption and not real.

__Chart Summary__

   - Just below the chart, a summary is also printed. Along with the filters used for generating the chart, It shows top 
events, total events, and average duration taken by all events.
   - An event wise summary is also printed where number of total and closed events are printed along with average 
duration for all event types. Average duration will be zero if there are no closed events.
   - How the chart is generated ?
      - For the given duration, tag, location, device filters, we collect the all events from database.
      - For all closed events, duration is calculated
          - duration => end_time - start_time
      - This duration is converted into minutes.
      - For each unique duration, we count the events.
      - Using the this duration, we plot the distribution.
          - On x-axis, we have duration in minutes.
          - On y-axis, we have count of events which took a particular duration.


**Event Duration Distribution Chart (Percentage)**

This chart plots the distribution of event durations. The event count is shown as percentage for this chart. Event duration is calculated as event_end_time - event_start_time. The value is converted(and rounded) to minutes.

This chart helps you to know - how long the events last. Assuming if a noise event is being analysed using this chart. If the events are taking a lot of time to close, that means the noise stays high for longer duration than expected. Since this chart directly gives us a percentage value, we can see the percentage of events with a certain duration.

A sample chart is shown below:

![OrbiwanImages]({{ page.image_path }}/Event_Distribution_percent_visual.png)

![OrbiwanImages]({{ page.image_path }}/Event_Distribution_statistic.png)

In the chart above x-axis is the duration in minutes and y axis shows the percentage of events.

This chart only considers closed events since for active events, duration calculated will be based on assumption and not real.

__Chart Summary__

Just below the chart, a summary is also printed. Along with the filters used for generating the chart, It shows top events, total events, and average duration taken by all events.

An event wise summary is also printed where number of total and closed events are printed along with average duration for all event types. Average duration will be zero if there are no closed events.

How the chart is generated ?
   - For the given duration, tag, location, device filters, we collect the all events from database.
   - For all closed events, duration is calcuated.
      - duration => end_time - start_time.
   - This duration is converted into minutes.
   - We count the total events i.e. total_events.
   - For each unique duration, we count the events.
   - Then for each duration, we calculate percentage of events,
     - (events_at_a_duration / total_events) * 100
     - e.g. if there were 10 events which lasted for 5 minutes, then event_at_a_duration = 10.
   - Using the this duration, we plot the distribution.
     - On x-axis, we have duration in minutes.
     - On y-axis, we have % of events which took a particular duration.

**Event During the Day Chart (Data Counts)**  

This chart allows users to see the number of events each hour of the day. Bins for each hour of the day are 
created. Total 24. All of the events are put into these bins based on their start_time. This data is plotted and a sample 
is as below: 

![OrbiwanImages]({{ page.image_path }}/Event_during_day_statistic.png)

![OrbiwanImages]({{ page.image_path }}/Event_during_day_visulization.png)

How the chart is generated ?
   - For the given duration, tag, location, device filters, we collect the all events from database.
   - Each data row has start_time (time at UTC).
   - All these start_time are converted to tenant’s local time // TODO.
   - For all events, hour value is extracted from the start_time.
   - Using the this time, we find the hour of day.
   - For each hour the data is grouped and events are counted.
   - For each hour then the percentage of events is calculated against total number of events.
   - Then the data is plotted.
     - 1h on x-axis says = all events during 00:00 to 01:00 hour.
     - 4h on x-axis says = all events during 03:00 to 04:00 hour.

**Event During the Day Chart (Percentage)**

This chart is similar to the previous chart Events During the day chart with data counts. The only difference here is that the values on y-axis are percentage.

![OrbiwanImages]({{ page.image_path }}/Event_day_percentage.png_visual.png)

![OrbiwanImages]({{ page.image_path }}/Event_day_percentage.png)

How the chart is generated ?

   - For the given duration, tag, location, device filters, we collect the all events from database.
   - Each data row has start_time (time at UTC).
   - All these start_time are converted to tenant’s local time.
   - For all events, hour value is extracted from the start_time.
   - Using the this time, we find the hour of day.
   - For each hour the data is grouped and events are counted.
   - Then the data is plotted.
      - 1h on x-axis says = all events during 00:00 to 01:00 hour
      - 4h on x-axis says = all events during 03:00 to 04:00 hour  


**Noise Distribution (Data counts)**

This is a simple distribution of noise levels for a given time period. This chart also allows users to see the mu, sigma values and how the distribution spreads around mu. This chart gives an idea about the average noise overall along with minimum and maximum values. Visually it also allows to see the most frequent noise levels ranges.

A sample chart is below:

![OrbiwanImages]({{ page.image_path }}/statics_graph.png)

![OrbiwanImages]({{ page.image_path }}/Statics.png)

**Noise Distribution (Percentage)**

This chart is similar to Noise Distribution chart with Data counts. The only difference here is that the values on y-axis are in percentage.

A sample chart is below:

![OrbiwanImages]({{ page.image_path }}/Distribution_percentage.png)

![OrbiwanImages]({{ page.image_path }}/D.png)


How the chart is generated ?
   
   - For the given duration, tag, location, device filters, we collect the data from database.
   - f we have data like (in dB) - 30, 45.5, 43, 42, 46, 50, 60, 65, 71, 73, 74, 75, 70, 67, 64, 59, 54, 50, 47, 80 And we want total 10 bins. - Min value in data = 30 dB - Max value in data = 80 dB - Difference is = 80 - 30 = 50 dB - Each bin will have 50 / 10 = 5dB - Then our bins will be - - min_value (30) - (30 + 5) => 30-35 - 35 - 40, 40-45, 45-50… and so on.
   - For first bin(30dB-35dB) -> 30, => 1 For bin(45dB-50dB) -> 45.5, 46, 47 => 3 and for all bins are evaluated and plotted.
   - Then all bins are calculated with averaging done on dB values. Since the distribution is actually done by libraries. And in this case, we are looking at the averaging of noise parameter dB values only.

   <!--- For Sabra - These dB values are converted to linear - Then averaging is done on the linear values - The average value is converted back to dB.

   - Otherwise, - The averaging is done directly on dB values.-->



**Noise During the Day (Bar Plot)**

For each hour of the day, the noise levels are averaged and plotted using this chart. Similar to the box plot version of this chart allows us to see the hours when the maximum noise is measured or when the noise is low.

This chart also shows a pattern similar to average 24 hour. Although since average 24 hours chart has duration bucket as 15 min, that gives us a more detailed view of noise average. However, we can get a fair idea about the pattern that noise follows throughout the day.

![OrbiwanImages]({{ page.image_path }}/Noise_during_the_day_bar.png)

![OrbiwanImages]({{ page.image_path }}/Noise_during_the_day.png)

How the chart is generated?

   - For the given duration, tag, location, device filters, we collect the data from database.
   - Each data row has epoch (time at UTC)
   - All these epochs are converted to location’s local time
   - Using the this time, we find the hour of day
   - For each hour the data is grouped and average is calculated
   - Averaging is done on dB values and not on the linear value
     - Averaging is to be done on linear values
   - Then the data is plotted
     - 1h on x-axis says = 00:00 to 01:00 hour
     - 4h on x-axis says = 03:00 to 04:00 hour

If we have data like (in dB) - 45, 43, 42, 46, 50, 60, 65, 71, 73, 74, 75, 70, 67, 64, 59, 54, 50, 47

For Sabra - These dB values are converted to linear - Then averaging is done on the linear values - The average value is converted back to dB.

Otherwise, - The averaging is done directly on dB values.

**Noise During the Day (Box Plot)**

Box plots can help to understand the median values, minimum, maximum along with outliers. In this chart we have tried to plot the noise levels for each hour of the day. This chart also gives an idea about the hours which are most noisy and quiet.

A sample chart is shown below:

![OrbiwanImages]({{ page.image_path }}/Box_Plot.png)

![OrbiwanImages]({{ page.image_path }}/Box_Plot_Statistic.png)

How the chart is generated ?
  
   - For the given duration, tag, location, device filters, we collect the data from database.
   - Each data row has epoch (time at UTC)
   - All these epochs are converted to location’s local time
   - Using the this time, we find the hour of day
   - For each hour the data is grouped and q1, q2, q3, iqr, upper and lower bounds are calculated q1 = 
groups.quantile(q=0.25) q2 = groups.quantile(q=0.5) q3 = groups.quantile(q=0.75) iqr = q3 - q1 upper = q3 + 1.5iqr lower = q1 - 1.5iqr.
   - Then the data is plotted
      - 1h on x-axis says = 00:00 to 01:00 hour
      - 4h on x-axis says = 03:00 to 04:00 hour

If we have data like (in dB) - 45, 43, 42, 46, 50, 60, 65, 71, 73, 74, 75, 70, 67, 64, 59, 54, 50, 47

<!--For Sabra - These dB values are converted to linear - Then averaging is done on the linear values - The average value is converted back to dB
Otherwise, - The averaging is done directly on dB value-->

**Occurrence of Noise Levels During the Day**

If you’re interested to know about the distribution of noise levels each hour, this chart is for you to visualise. For each hour, we can see the noise levels occurrence with color coding. The dark colored cell shows that the most noise levels are seen around it.

![OrbiwanImages]({{ page.image_path }}/Occurence.png)

![OrbiwanImages]({{ page.image_path }}/Occurence_Statistic.png)

How the chart is generated ?
  - For the given duration, tag, location, device filters, we collect the data from database.
  - Each data row has epoch (time at UTC)
  - All these epochs are converted to location’s local time
  - Using the this time, we find the hour of day
  - Then we convert the noise dB value to integer - For simplification
  - For each hour the data is grouped and counting is done for each unique noise dB value
  - Then the data is plotted in a way that 
     - x-axis shows the time
     - y-axis shows all unique noise dB value 
     - for y-axis, we color all x-y meeting rectangle as per the count.
     - 1h on x-axis says = 00:00 to 01:00 hour
     - 4h on x-axis says = 03:00 to 04:00 hour



<!--**Accumulated Average**

It is possible to display the cumulative average values between the two dates selected by the user. For each parameter selected, the noise level is accumulated for day and night values. The difference between day and night value is also plotted.

![OrbiwanImages]({{ page.image_path }}/AccumulatedAverage.png)

There are few common things for each chart:

- Day and night indication lines: The grey lines(as a pulse) on the chart indicate day(high) and night period(low). Applicable for Average 15 min and Average OPB periods.

- Weekday and Weekend indication lines: The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low). Applicable for Average 15 min and Average OPB periods.-->

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

- **Raw Data**: All of the raw data which is used to generate the charts and to do the calcualtions.

- **Averaged Data**: Daily aggregated data.

- **Chart data**: Final data which can directly be plotted to re-generate the charts.

  - For each chart data, histograms data and curve fitting parameters are also exported.

  - For Average 24 hour chart, where curve fitting is done, the parameters used for curve fitting are also exported.

### Tagging the data

Sometimes, the data can be affected due to external events. Due to a construction work, noise reported can be higher. Or during a sport event in a north part of the city, south can be quieter than usual.

The data like this, can greatly affect the noise pattern and thus calculated statistics will see a higher or lower noise than usual.

If a reason is known, or if a period is known then the data can be tagged with a value. This tagged data can be excluded while calculating statisitcs or generating different charts.

Data tags can be defined in the tenant’s profile.

A default set of tags is already present as -

    [{
    "key": "VALID",
    "value": "0",
    "description": "Validated by user"
    },
    {
    "key": "INVALID",
    "value": "1",
    "description": "Invalidated by user"
    },
    {
    "key": "RAIN",
    "value": "2",
    "description": "Rainy Day"
    },
    {
    "key": "CONSTRUCTION_NEARBY",
    "value": "3",
    "description": "Construction is near by"
    }]

The data can be tagged in two ways.

**Using Tagging Mode Chart**

In the filters, at the bottom, there is an option to enable tagging mode. For tagging mode there are some restrictions on what you can choose as filters.

The App supports tagging mode chart for -
     - Atmost one location at a time.
     - Maximum 7 days as chart duration.
     - One noise parameter at a time.

Once you have selected a tag/location/device and a date range, enable the tagging mode and it will generate a chart as follows 

![OrbiwanImages]({{ page.image_path }}/Using_Tagging_Mode_Chart.png)

In the figure above, we can see a scatter plot with the data of 7 days. The night period and day period lines are also plotted.

Below the chart there is a strip of buttons. There are two buttons at the left(left arrow <) and right (right arrow >) with orange colored background. The left arrow will re-generate the chart for past 7 days. Similarly the right arrow will generate for the next 7 days.

Between the two arrow buttons, for each day there are two buttons just below the chart - N (stands for night period) and D (stands for day period). Clicking on any of the button will disable all other data points and select only the ones falling in the selected duration. Users can select more than one button at a time.

In the figure below, we have selected a night period which is the only highlighted period.

![OrbiwanImages]({{ page.image_path }}/Tagging_Mode_Data_Selection.png)

Once you have selected all data to be tagged, you can choose one or more parameters, a data tag and an optional comment.

Once you hit “Tag Data” button, it will ask for confirmation. At the confirmation, app will show the summary of data being tagged.

![OrbiwanImages]({{ page.image_path }}/Tagging_Mode_Confirmation_Dialog.png)



Once user confirms, the data will be tagged. Later, this tagged data can be skipped using “Include Tagged Data” option in the filters.

The tagging mode allows data selection using buttons like we just did. When we are using buttons, it will select all of the data of that duration. E.g. if a day button is clicked, then it will select all of the data of that day period for tagging.

Sometimes, we do not want to tag data of whole period and only want to tag one or two data points which look like outlier (or can be any other reason). We can do so using a tool. Above the top right of the chart, there are several chart tools.

![OrbiwanImages]({{ page.image_path }}/Tagging_Mode_Selection_tool.png)

The third tool from the left allows users to select a data point by selecting and creating a rectangle on the chart. Once 
you click the tool icon, it will be enabled and a blue underline will appear just below the icon similar to the figure 
above.

If you look at the chart above, there are many data points at around 70dB Leq. Lets consider all of those data points are outliers and unwanted. To select all of those data points, just select the tools, and start dragging and create a rectangle to select all of those points at once. Just like in the figure below.

![OrbiwanImages]({{ page.image_path }}/Tagging_Mode_Selection_tool_In_Action.png)

Once this selection is done, you can further select any other data point also. You can also use day/night buttons to select/unselect one ore more data points.

After the selection is made, all you need is to follow the same steps as we did earlier to tag the data. Fill in the required parameters, tag, and an optional comment. It is always better to put a comment to specify the reason of this tagging.

**Manual Tagging on Map and Visualisation**

Sometimes, the case can be different. Consider a sports event happening in a particular region of the city. Let’s say it is a stadium where a football match is taking place. All devices around the stadium are going to report higher noise than usual. You would like to tag all of the data reported by these devices. We can say the same thing as - we want to tag all of the data for a day for the locations around the stadium.

If there are 10 locations, using the tagging mode is not a quick way to do it. Instead of this, we could use the manual data tagging wizard.

On **Visualisation** page, the tag measurement icon is present at the right top side of the page.

![OrbiwanImages]({{ page.image_path }}/Tag_measurement_icon_on_Visualisation.png)

On **Map** page, the tag measurement icon is present at the right bottom side of the page, just above the time slider.

![OrbiwanImages]({{ page.image_path }}/Tag_measurement_icon_on_Map.png)

Clicking on this icon at any page, opens the dialog below.

![OrbiwanImages]({{ page.image_path }}/Tag_measurement.png)


Tagging data using this option is more flexible. Since it allows users to select any tag(groups), locations, date range for tagging the data. We can tag data of any number of locations using this.

Once you choose a tag(groups), the locations dropdown will list all of the locations in the dropdown. Select all required locations and click “Add” button to add selected locations. In case you want to select all locations of chosen tag(groups), click “Select All”.

![OrbiwanImages]({{ page.image_path }}/Tag_measurement_filled.png)

Once rest of the input are selected, click Save button to tag the data of selected locations for chosen duration.


## Event

When a rule is evaluated and the result is true, then an event is raised. All those raised events can be seen on events page. Following is a listing of events. 

![OrbiwanImages]({{ page.image_path }}/Event.png)

| Column     | Description | 
| ---------- | ---------- | 
| Event Name   | Name of the Event (definition)      |
| Start Time| Start time of the event      |
| End Time   | End time, closing time of the event     |
| Locations| Locations for which the event is raised.     |
| Deveuise   | Deveuis if applicable    |
| Groups| Groups assigned to the rule which raised the event       |
| Status   | Active, if the event is still there, closed otherwise     |
| Triggers| (Experimental)A human readable string for understanding of the reason for which event was raised      |
| Action   | Action column allows users to perform an action     |


We can not create an event manually.

Other options on the page are 
  - Refresh the events table 

  - Export the event data as CSV

The Action column offers -
        
  - Visualise event : Allows you to visualise the data of participating locations/tags for the event. The event along with surrounding days data is visualised as Average 15min chart.

  - Visualise event while comparing data with nearby locations : Same as visualise event, but now 3 nearby locations are also chosen and data plotted for comparison.

  - Show on map : allows you to see the events on participating locations/tags at the time when this event was raised.

  - Close event : In case the event is to be closed manually, Administrators can close the events. A consent dialog box is shown to confirm from user.

![OrbiwanImages]({{ page.image_path }}/close_event.png)

Since the events should be closed automatically when the event condition becomes normal and rule 
evaluation comes false, it is not encouraged to close the events manually. Hence a confirmation is shown with a text.

  - **Delete event** : Tenant administrators can also delete events from this version onward.


### Event logging

For each event, in action column, there is an icon for event logs.

![OrbiwanImages]({{ page.image_path }}/message.png)

Clicking on this, will open a modal with all of the comments added by various tenant users with latest comment on top.

A general use of this can be to acknowledge the reason for the event. Or putting a reason before closing the event manually.

![OrbiwanImages]({{ page.image_path }}/Events_Comments.png)

Please note that comments can be added only when the event is active. Also, a user can edit/delete their own comment and not of other users.


## Groups

Please note that throughout the document, groups and groups are inter-changeable. They refer to the same thing. Using tenant profile, you can choose whether you want to use Groups or Groups.

Groups page allows users to manage groups. Once a group is created, it is available for filtering the locations on Map, Locations, and Visualization page. The figure below shows a listing of the groups. Users can sort and filter the list using group and description. The action column allows users to edit/delete the group.

![OrbiwanImages]({{ page.image_path }}/Tab.png)

The columns in the table are -

| Column     | Description | 
| ---------- | ---------- | 
| Group   | Name of the Group      |
| Description  | Description given to the group      |
| Action   | Action column allows users to perform an action      |

### Add Tag

The figure below shows add group screen which allows users to add a new group. The fields are -

| Field     | Mandatory |  Description |
| ---------- | ---------- | ---------- |
| Group   | Y     |  Unique Group name. This is used to filter content. |
| Description  | Y     |  Description of the group. |


![OrbiwanImages]({{ page.image_path }}/TabAdd.png)


<!--## Configuration

After Account the next tab is Configuration. In the Configuration tab the user will be able to configure their own rules for Events which can also be considered as an alarm. To create an Event follow the steps given below:-->

## Global Threshold

The rule engine in the app can use the variables instead of static values. These variables are called as Global Threhsolds. If a tenant is using the periods (i.e. Using Periods is checked in Tenant Profile), then for all defined periods, users can set threshold values. While evaluating the rule, corrosponding threshold value will be used. If the 
rule was being evaluated on a data of night period of a weekend, the threshold will be used of weekend night time.

The following screenshot shows the Global Thresholds listing. 

<!--This section allows the user to configure the thresold of the noise parameter. This thresold can be later assigned to a rule which will enable the application to raise the Events.

Global Threshold is used to set the threshold value for the designated parameter which can be used to alert the user when the parameters threshold value is reached.

The User can add the Global Threshold by clicking the **Add Threshold** button as shown below:-->

![OrbiwanImages]({{ page.image_path }}/GlobalThreshold.png)

The columns are:

|Column | Description|
|-------|------------|
|Name | Name of the Global Threshold, below the name variable name is printed. |
| Parameter | Thresholds defined for each parameter. |
| Action | Action column allows users to perform an action. |


## Event Definition

When rules are evaluated and the result is true, then an event is raised. We can specify which event should be raised. Those event types are defined using this page.

Please note that in the document, event definition and event types are interchangeable.


![OrbiwanImages]({{ page.image_path }}/EventDefinition-Configure.png)

the column are -

| Column     |  Description |
| ---------- | ----------   |
| Name       | Name of the Event definition. |
| Description| Description to explain the event definition.    |
| Color      | A color assigned to quickly distinguish events. |
| Is Active  | Whether this event definition is active and available for use in rules or not.  |
| Action     | Action column allows users to perform an action |

The Action column has options to edit and delete event definition.

### Add/Edit Event Definition
 Following screen allows us to add/edit an event definition.

 ![OrbiwanImages]({{ page.image_path }}/Edit-Event.png)

 | Field      | Mandatory |  Description |
| ----------  | ---------- | ---------- |
| Event       | Y     |  Name of the Event definition. |
| Description | Y     |  Description to explain the event definition. |
| Color       | Y     |  A color assigned to quickly distinguish events. |
| Is Active   | Y     |  Whether this event definition is active and available for use in rules or not |


### Rules

For identifying any anamoly, higher noise, missing data etc situations, Users can define rules. These rules can be evaluated on specific times. These times can be configured using tenant profiles. A default value of these triggering times are -

    {
     "EVERY_4_HOURS": {
    "key": "every_4_hours",
    "cron": "0 */4 * * *",
    "time_range_in_seconds": 14400
    },
    "EVERY_6_HOURS": {
    "key": "every_6_hours",
    "cron": "0 */6 * * *",
    "time_range_in_seconds": 21600
    },
    "EVERY_DAY_AT_MIDNIGHT_UTC": {
    "key": "every_day_at_midnight_utc",
    "cron": "0 0 * * *",
    "time_range_in_seconds": 86400
    },
    "EVERY_HOUR": {
    "key": "every_hour",
    "cron": "0 * * * *",
    "time_range_in_seconds": 3600,
    "at_server_start": false
    },
    "WHEN_NEW_DATA_IS_RECEIVED": {
    "key": "on_new_data"
    }
    }

A trigger is defined by the following properties -

|Property| Mandatory |Description|
|--------|----------|------------|
|key| Y |A key which is used as ID in application. Usually a lowercase, words separated by underscores.|
|cron | Y | The cron expression which is used to schedule the rules executions.|
|time_range_in_seconds| Y |Time in seconds between two rule runs. Strictly aligned with cron expression.|
|At_server_start | N | Whether we want to run the rules everytime when server starts.|

*WHEN_NEW_DATA_IS_RECEIVED* is a special trigger which does not need cron, time_range_in_seconds or 
*at_server_start*.

These triggers allow rules to be run at every 4 hours, 6 hours, midnight, every hour or as soon as a data(payload) is received. Depends on what we have specified while defining the rule.

   - For EVERY_XYZ triggers you will be able to use functions - Compare Data, Check Relative value, Check 
Current baseline, Count Data.
   - For WHEN_NEW_DATA_IS_RECEIVED, you will be able to use - Check Threshold.

  More about the functions can be learned later in this chapter.

The following screenshot shows the rules listing.

![OrbiwanImages]({{ page.image_path }}/RulesPage.png)

The columns are -

|Column | Description |
|-------|------------ |
|Name | Name of the Rule|
|Description| Description to explain the rule.|
|Event Definition| Event definition to be raised if the rule is evaluated to be true.|
|Is Active | Whether this rule is active or not. |
| Groups |Groups being used while evaluating the rule.|
| Action |Action column allows users to perform an action.|

### Add Rule

As soon as users click on Add Rule button, they are presented with the following modal -

![OrbiwanImages]({{ page.image_path }}/Rules.png)

Only the name, description and trigger are visible. As soon as you select trigger, then the rest of the fields become visible and you can continue building the rule.

For example, in the following screen we are building a rule to check data count for all locations(individually) grouped as noise_robots group, every hour.

![OrbiwanImages]({{ page.image_path }}/Add-Rule.png)

The fields are as -

|Column                      |Description|
|----------------------------|-----------|
|Name                        |Name of the Rule|
|Description                 |Description to explain the rule|
|On                          |The trigger. This allows you to set time(s) when the rule will run. If trigger selected is EVERY_4_HOURS, the rule will be evaluated at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00.
|Run for individual locations| In some cases, you want to take all locations mapped to specified tags and then evaluate rule for each location separately. e.g. evaluating count_data for each location separately and raise an alert if a location has lower count of data than expected. At the other hand, if you want to check baseline of an area every hour, all locations data should be processed together. In this case, set it to false.
|For all the locations that match these groups | If we have selected Run for individual locations as true, then we can choose a list of groups and the rule will be evaluated on each locations that is mapped to selected groups.|
|Evaluate the following       | Actual rule definition created using either Interactive rule builder or using the Advanced version which allows users to enter a python code. |
| If true, raise              | Event definition to be raised if the rule is evaluated to be true.|
|Is Active                    | Whether this rule is active or not|

### Edit Rule
Following screen allows us to add/edit a rule.

![OrbiwanImages]({{ page.image_path }}/Edit_rule.png)

The figure above shows the edit screen for a rule named RelNoiseCheck.. The rule is evaluated every hour, for all locations of Airport_LeGrandSaconnex group individually to check the relative value of Leq. If the value is less than 100dB, the event TestRelNoise is raised.

This rule was created using the interactive rule builder. We can see the generated rule definition (code part) by clicking the Advanced button:

![OrbiwanImages]({{ page.image_path }}/Edit_rule_adv.png)


We can see that the python code is present as -

*(check_relative_value ( start_time, end_time,  ["d94a66f0-40e3-40ee-b6d3-c3d3dddaf2cb"], location_ids,  'Leq', '<', 100  ))*

This python function check_current_baseline is going to run for the given tag_ids, location_ids constrained 
in start_time and end_time.

   - **start_time, end_time** are going to be picked based on the trigger. In this case it was every hour. Assuming if the rule is running at 2pm then start_time will be 1pm and end_time will be 2pm.
   - tag_ids are given as the actual UUID of the tag
   - location_ids are to be considered based on the value selected for Run for individual locations flag. 
If it is to be run on individual location, then location_ids will have maximum 1 location and the rule will run for all locations one by one.
   - Leq is the selected parameter.
   - < is the comparison operator selected by user.
   - 100 is the value chosen by user. This can also be taken using a global threshold. The value could be like **$relative_noise_thresholds.Leq**.

###  Rule Functions : Interactive Mode

Following functions can be used while defining a rule.

   - **check_thresholds:** This function checks the threshold value of selected parameter of incoming data.
   - **check_current_baseline:** This function checks the current baseline of the data for given input and compare it against the given value.
   - **check_relative_value:** This function checks the relative value of the data for given input and compare it against the given value.
   - **compare_data:** This will allow you to compare two ore more different tags for a common function. With this function, you will not be able to run the rule separately for each location.
   - **count_data:** This function counts the data for given input and compare it against the given value.

### Rule Functions : Advanced Mode

While defining a rule, users can choose one ore more functions to be evaluated. These functions can be used in Advanced mode. Also, When a rule is saved in interactive mode, it is compiled as the combination of the these functions.

  - **check_thresholds:** Function to check threshold. For usage in rules with trigger- WHEN_NEW_DATA_IS_RECEIVED.
   *check_threshold(noise_param, operator, value) –> Returns True / False.*
     - noise_param can be one of - [‘Leq’, ‘Lmin’, ‘Lmax’, ‘L10’, ‘L50’, ‘L90’, ‘L95’].
    - operator can be one of - [‘>’, ‘<’, ‘>=’, ‘<=’, ‘==’].
    - value will be a number or a variable using global threshold.

   **Returns** True/False

       Examples:
       Check the parameter value of an incoming data.
       check_threshold('Lmin', '>=', 65)Check the parameter value of an incoming data.check_threshold('Lmax', '>', $global_th.Lmax)


- **check_current_baseline:** Function to check current baseline. For usage in rules with trigger - 
EVERY_X_HOURS i.e. Periodic checks
*check_current_baseline(start_time, end_time, tag_ids, location_ids, noise 
params,operator, value) –> Returns True / False.*
   - start_time - variable is available as per period range. format - epoch.
   - end_time - variable is available as per period range. format - epoch.
   - noise_param can be one of - [‘Leq’, ‘Lmin’, ‘Lmax’, ‘L10’, ‘L50’, ‘L90’, ‘L95’].
   - operator can be one of - [‘>’, ‘<’, ‘>=’, ‘<=’, ‘==’].
   - value will be a number or a variable using global threshold.

   **Returns** True/False

        Examples:
        Check the current baseline value of a given tag_id, paramter against a given value.

        check_current_baseline ( start_time, end_time["97ce4ee2-df9e-4042-956e-011aa885aa81"], [], 'Leq', '<', 10 )

        Check the current baseline value of a given tag_id, paramter against a given value. The value can also be specified using a global threshold.

        check_current_baseline ( start_time, end_time, ["97ce4ee2-df9e-4042-956e-011aa885aa81"], [], 'Leq', '<', $global_th.Lmax)

   - **check_relative_value:** 
   Function to check relative value. For
   usage in rules with trigger - EVERY_X_HOURS i.e. Periodic checks check_relative_value (start_time, end_time, tag_ids, location_ids, noise params,operator, value) –> Returns True/False
     - start_time - variable is available as per period range. format - epoch.
     -  end_time - variable is available as per period range. format - epoch.
     - noise_param can be one of - [‘Leq’, ‘Lmin’, ‘Lmax’, ‘L10’, ‘L50’, ‘L90’, ‘L95’].
     - operator can be one of - [‘>’, ‘<’, ‘>=’, ‘<=’, ‘==’].
     - value will be a number or a variable using global threshold.

**Returns** True/False

    Examples:
    - Check the relative value of a given tag_id, paramter against a given value. 

     check_relative_value ( start_time, end_time, ["97ce4ee2-df9e-4042-956e-011aa885aa81"], [], 'Leq', '<', 10 ) 

    Check the relative value of a given tag_id, paramter against a given value. The value can also be specified using a global threshold.

    check_relative_value ( start_time, end_time, ["97ce4ee2-df9e-4042-956e-011aa885aa81"], [], 'Leq', '<', $global_th.Lmax)

   - **count_data:** Function to get the data count. For usage in rules with trigger - EVERY_X_HOURS i.e Periodic checks.
     - count_sensor_data(start_time, end_time, tag_ids, location_ids) –> Returns a number  
     - start_time - variable is available as per period range. format - epoch.
      - end_time - variable is available as per period range. format - epoch.
     - location_ids - Array of location ids, if not specified, each location id of tag will be processed.
     - tag_ids - Array of tag_ids, if not specified, each tag assigned to rule will be processed.

**Returns:** number of data count.

    Examples:
    When no location id is specified but tag_ids are specified
    count_sensor_data(start_time, end_time, tag_ids, []) == 0 

    When location ids and tag ids are not specified
    count_sensor_data(start_time, end_time) == 0

    When specific location id is mentioned and tag_ids are left empty
    count_sensor_data(start_time, end_time, [], ['2e079cb7-3181-44b2-920cd23c96736bbd']) == 0

    When location id is left blank and specific tag_ids are mentioned
    count_sensor_data(start_time, end_time, ['72645c0d-1978-467e-9003-b473701682f7'], []) == 0

   - **get_sensor_data:** Function to get the data as DataFrame

   get_sensor_data(start_time, end_time, location_ids, tag_ids) –> Returns a DataFrame or None

   - start_time - variable is available as per period range. format - epoch.
   - end_time - variable is available as per period range. format - epoch.
   - location_ids - Array of location ids, if not specified, each location id of tag will be processed.
   - tag_ids - Array of tag_ids, if not specified, each tag assigned to rule will be processed.
   
**Returns:** Pandas Dataframe

Pandas Dataframe is a table like structures but highly optimised for data analysis. To know more about it 
please visit: **[https]://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html**

    Examples:
    When no location id is specified but tag_ids are specified
    df = get_sensor_data(start_time, end_time, [], tag_ids)

    When location ids and tag ids are not specified
    df = get_sensor_data(start_time, end_time)

    When specific location id is mentioned and tag_ids are left empty
    df = get_sensor_data(start_time, end_time, ['2e079cb7-3181-44b2-920cd23c96736bbd'], [])

    When location id is left blank and specific tag_ids are mentioned
    df = get_sensor_data(start_time, end_time, [], ['72645c0d-1978-467e-9003-b473701682f7'])

    This function returns you the dataframe which can be used to get more details. Few examples below:

    To get the data count
    counts = df.shape[0] # Shape function gives you the [rows, column], df.shape[0] will give you number of rows

    To get the data count for all Leq > 60 dB
    counts = df[df.Leq > 60].shape[0] # Shape function gives you the [rows, column], df.shape[0] will give you number of rows

    To get the list of all column
    columns = df.columns

    Take a mean(average) of all Leq in the dataframe
    df['Leq_linear'] = df.Leq.apply(lambda x: 10 ** (x/10)) # converting the dB value to linear scale
    mean_value_linear = df.Leq_linear.mean()
    mean_value_dB = 10 * math.log10(mean_value_linear)

    Take a standard deviation of all Leq
    Take a standard deviation of all Leq
    






<!--## Accounts

Allows administrators to manage users and Tenants (for Super Admin User).

![OrbiwanImages]({{ page.image_path }}/Accounts-Tag.png)

### Tenant

Allow the Super admin user to create and access the tenants.

![OrbiwanImages]({{ page.image_path }}/Tenant.png)

Once the tenant is created, the admin can create the **Data Source** which will allow the user to fetch the device data fron the LNS.

To Configure the **Data Source**, Click on **Action**  **Data Source** of the created Tenant as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-Tenant.png)

The Super admin user can also log forward to the respected Tenant by clicking on the "Forward as Tenant" as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-LogForward.png)

The admin can also configure the rights and the tabs that the tenat and its associated users can view by clicking on **Action**  **Profile** as shown in the Figure below:

![OrbiwanImages]({{ page.image_path }}/DataSource-Profile.png)

![OrbiwanImages]({{ page.image_path }}/DataSource-Profile-001.png) -->


## Users

Users page allows administrators to manage users. The figure below is a glimpse of the page.

![OrbiwanImages]({{ page.image_path }}/UserPage.png)

The columns in the table are -

|Column| Description|
|-------|-----------|
|Username| Username of the user|
|Name| Name of the user|
|Email |Email used for login|
|Role| Role assigned to the user|
|Is Active| Whether the user is active or not|
|Action |Action column allows users to perform an action|

This page allows administrators to manage the users. They should be able to add more users, change passwords, and allow users to be admin.

<!--Administrators can also manage the permission to view the Jupyter notebook. If user is not allowed to view the jupyter notebook, he/she will not be able to see Jupyter tab in the menu.-->

Users can filter the list of users for - username, name, email, Administrator access, Jupyter access etc. Users can sort the list by name. The action column allows adminstrators to edit/delete users, login forwarding and to manage user preferences.

### User Preferences

A Normal User and Admin User can update their own preferences and for others. A * Readonly user can not update the preferences for others.

The figure below shows the user preferences screen.

![OrbiwanImages]({{ page.image_path }}/setting.png)


![OrbiwanImages]({{ page.image_path }}/User_Preferences.png)


###  Add/Edit User

The figure below is the add user screen where administrators can add a user. Required fields are:

|Field     | Mandatory  | Description|
|----------|------------|-------------|
|Name      |  N          |Display name of a user.|
|Username  | Y          | Username|
|Email     | Y          | Email address which is also used as a login.|
|Tenant    | Y          | Tenant, the user belongs to.|
|Role      |  Y         | Tenant role assigned to the user.|
|Password  |  Y         | Password must contain at least 1 special character, uppercase, lowercase letter and number.|
|Confirm Password |Y| Same as Password|
|Is Active| Y| Whether the user is active or not. Boolean field. Defaults to Yes|

![OrbiwanImages]({{ page.image_path }}/Add_User.png)


## Login Forwarding

Sometimes, it is useful to see how the UI appears for other user. System Administrators can login forward to a user and experience the way UI appears to the user. All of the things including locations, devices, visualisation, events, rules and other items which the user can see, System administrator can also see after login forwarding.

The login forwarding icon in the user table allows System Admins to perform this. If the login forwarding is on, the User menu in the Menubar changes.

   - **Before Login Forwarding**
   ![OrbiwanImages]({{ page.image_path }}/Before_log_forwarding.png)


   - **After Login Forwarding**
   ![OrbiwanImages]({{ page.image_path }}/After_log_forwarding.png)


Post login forwarding, System admin can choose to return as Admin and the UI will be same as before login forwarding.


## Report

A usual report page looks like following: 

![OrbiwanImages]({{ page.image_path }}/List_Report.png)

Report page allows users to create and manage existing reports.

For each existing report, users can:

   - Download Data used in report
   - Export report as .docx file
   - Generate a new report using existing report
   - View report as html
   - Edit report
   - Delete report

### Add Report

Following screen allows us to add report.

![OrbiwanImages]({{ page.image_path }}/Report.png)

|Field| Mandatory|Description|
|------|--------|-----------|
|name |Y| name of report (nickname )as unique|
|title| Y |title of report|
|description|Y |description|
|start_date|Y |start date(while generate chart based report duration on from_ts as start_date)|
|end_date|Y| end date (while generate chart based report duration on to_ts as end_date)|
|content |Y |Report content|

The content field of the report allows you to add some rich content such as chart links, other images and formatted text. When you click on open area, a box appears as :

![OrbiwanImages]({{ page.image_path }}/Report_Contact.png)

The + icon allows you to add different type of content. Once you click it, the options appear as -

![OrbiwanImages]({{ page.image_path }}/Report_Content_OPtion.png)

The first icon, T allows you to add a text. Second icon H enables you to add different headings (h1, h2, h3, h4, h5, h6) and three dotted lines add a list.

The last icon is for adding an image by a url. Clicking on it will prompt for an image url:

![OrbiwanImages]({{ page.image_path }}/Image_Url.png)

Whatever image url is provided, the image will be loaded. This is where the Chart links copied from clipboard are to be used. If you copied a chart link as it is, the chart will appear in the add/edit report view immediately, as below:

![OrbiwanImages]({{ page.image_path }}/Report_Content_Image.png)

At the other hand, if you want to add a linked chart (i.e. chart should use the start/end dates from report), then you copy the link and paste in image url placeholder. Once you do, an image like below appears instead of chart. This is done because the chart is regenarated using the start/end date of report. It is possible that user might put the chart image first and then start_date, end_date for the report. In this case, report while adding chart, report start/end dates would be missing. Hence, once the report is saved, a new request in the backend is fired to generate respective chart. All this is done at the backend and user does not need to worry about anything

![OrbiwanImages]({{ page.image_path }}Report_Content_Image.png)

## View and Download Report

The report can be viewed at anytime in future. The report view displayed is pure HTML rendered in the dialog box which takes styles from the app styles.

![OrbiwanImages]({{ page.image_path }}/View_Report.png)

In case, you want to generate a report (doc, pdf etc) with your own style then you can simply download the report as docx. This will bring all of the text and chart images in a docx file which can be edited to match the desired styles.

##  Regenerate Report
The regenerate report icon in the action menu allows you to create a new report based on the selected report. For any report, if you click on regenerate report icon, it will open a modal asking you the name, and start/end dates.

![OrbiwanImages]({{ page.image_path }}/Re_generate_report_symbol.png)

![OrbiwanImages]({{ page.image_path }}/Regenerate.png)

By default the modal start/end dates will be same as report being used. After providing required input, the Ok button will be enabled and you will be able to save it as a new report.


## Jupyter

This page allows users to access jupyter hub and notebooks. Using these notebooks users can query on data, analyse, perform various visualisations etc.

Following is a glimpse of the page.

![OrbiwanImages]({{ page.image_path }}/Jupiter.png)

### Accessing Your Notebooks

Login with your user and navigate to Jupyter in the Menu. Once clicked it will open the server screen.

   - You might see a button “Start My Server”, clicking it will take you to your personal space for notebooks.
   - When you logout, make sure to logout the server also.
   - In case you do not logout, next time you access Jupyter menu, you will see two buttons - “Stop My Server” and “My Server”.
   - Click on “My Server” to access your space.

##  Languages

At the top right of the page, there is a dropdown for choosing the languages. All supported languages are listed in the dropdown. User can choose the language of their choice.

![OrbiwanImages]({{ page.image_path }}/Language.png)


## Audit History

App records audit history for the data. As of this version, if users change Global thresholds, Event definitions, or Rules, then all changes are recorded and can be viewed by respective administrators.

For each of these pages, each row has an icon like below:


![OrbiwanImages]({{ page.image_path }}/Audit_trail.png)

This icon enables tenant administrators to see the changes done by any user to this entity.

Below is an example of audit history for a global threshold:

![OrbiwanImages]({{ page.image_path }}/Audit_trail_detail.png)

Every line in the table is expandable on click. On expansion, the details about what was changed is shown.


![OrbiwanImages]({{ page.image_path }}/Audit_trail_single_message_detail.png)

We can see that the name for global threshold was changed, and since the name was changed, the variable also got changed.

Moreover, if user wants a git like diff View diff button can be used:

![OrbiwanImages]({{ page.image_path }}/Audit_history_list_expanded.png)

This compares the properties line by line and allows users to see things in details.






<!--## Legend and Options

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

<!-- - Last noise status: Shows the last received noise levels at the locations.

![OrbiwanImages]({{ page.image_path }}/Legend-NoiseLevel.png) 

- Last Reception: Shows the Last reception time at a location.

![OrbiwanImages]({{ page.image_path }}/Legend-LastSeen.png)

<!-- - Active Events: Shows the open Active Events of the location.

![OrbiwanImages]({{ page.image_path }}/Map-ActiveEvents.png) -->

<!-- - Relative Noise: Show the Result of the Average of the Noise from Last 7 days with the last received noise level.

![OrbiwanImages]({{ page.image_path }}/Map-RelativeNoise.png) -->

<!-- - Absoulte Threshold Noise: Shows the Thresold values configured in the Global Configuration

![OrbiwanImages]({{ page.image_path }}/Map-AbsoulteThreshold.png) -->

<!-- - Current Baseline: Shows the Thresold values configured in the Global Configuration

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

  <!-- - Edit: Allows you to edit the location details.

  - Bin: Allows you to delete a location. 

![OrbiwanImages]({{ page.image_path }}/Location-EditViewDelete.png)

The list also supports pagination and sorting. User can also select number of locations to be displayed on the list. However, the markers count on map is not related to number of results shown in list at one page. In fact, all of the locations in visible area are displayed on the map.

## Parameter Dropdown

The dropdown allows users to select one of the parameters.

- Battery Voltage.

- Last noise status.

- Last Reception.

<!-- - Active Events.

- Relative Noise.

- Absoulte Threshold Noise.

- Current Baseline. 

Once you select a parameter, both location list and map view will change the markers according to the legend shown on Map view.

## Groups

The tag search box allows users to filter locations for a selected tags. Once user starts typing the tag name, suggestions appear below and user can select one or more tags.

## Time Machine

<!-- This option allows users to select a date in past. The status of selected parameter will be shown on the map. The markers will show the status as per most recent reception (in past from the time selected).

**For e.g:** Lets say today is 1st Nov 2020 and user selects 20th March 2020, the most recent status before 20th March 2020 will be fetched and marker colors will change accordingly. If there was no data for 7 days in past(i.e. 14th-20th March) the color will be gray (No data). 

This feature allows users to do playback or to view map on a date in past.

![OrbiwanImages]({{ page.image_path }}/TimeMachine.png)

- At the left and right there are two date time selectors which stand for start_time and end_time. By default the date range is selected for 7 days.

- Dropdown before play button with 15min, 30min, 1hr options allow you to choose a time interval. If you selected 1 hour, and playback start time is 1pm, then the playback will be done for 1pm, 2pm, 3pm... and so on till the end_date is reached.

- The play button allows you to play/stop the playback.

- Few utility buttons are also provided for quickly go forward or backward 1hour, 1day, 1week. The buttons will honour the start and end dates. If the button can not take you to forward or back in time because of date ranges, it will be disabled.

- Once the playback is started, it will fetch the data and update the markers on map.

- The status of selected parameter will be shown on the map.

- In case the data is not present or is not applicable, icon color will be of No Data.

- At the middle there is another time which shows the time being viewed during playback.

- In case you do not want to do a playback, you can simply click on the date time displayed in middle and select a date time for which you want to view the data.

- When you’re viewing the data of past, the Live icon will turn to gray.

- At any moment when the playback is stopped, you can click the Live icon to fetch the latest data and
  display it on map.


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





## Tags

Tags page allows users to manage tags. Once a tag is created, it is available for filtering the locations on Map, Locations, and Visualization page.

The figure below shows a listing of the tags. Users can sort and filter the list using tag and description. The action column allows users to edit/delete the tag.

![OrbiwanImages]({{ page.image_path }}/TagPage.png)

The figure below shows add tag screen which allows users to add a new tag. The fields are:

| Field       | Mandatory | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| Tag         | Y         | Unique Tag name. This is used to filter content. |
| Description | Y         | Description of the tag.                          |



### Rules

After the Global Threshold and Events are defined, these values will be used to configure the Rules which will alert the application to raise an event.

Rules are triggers wherein the users can configure the conditions to check the threshold value configured in the Global threshold will raise an alert. This alert will be color coded with the color that was selected while creating the Event.

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

<!-- ![OrbiwanImages]({{ page.image_path }}/Rule-Param.png) 

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

![OrbiwanImages]({{ page.image_path }}/UserSettings001.png)-->

