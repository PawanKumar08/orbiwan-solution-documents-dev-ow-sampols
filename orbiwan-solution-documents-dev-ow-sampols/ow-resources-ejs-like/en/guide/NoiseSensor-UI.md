---
layout: page
title: Noise Sensor UI
menu: guide
lang: en
permalink: NoiseSensorUI.html
ow_parent: '-'
page_id: 'NoiseSensorUI'
page_type: 'sub-page'
sub_pages: false
image_path: 'images/NoiseSensorUI'
video_path: 'videos'
order: 2
---

{:.pageTitle}

The UI is divided into several pages to help manage content and visualise data collected by sensors. A glimpse of the app can be seen in the figure below:

![OrbiwanImages]({{ page.image_path }}/Map.png)

## Map

Helps users to visualize the locations on map. This also shows the location of the Devices on the Map.

![OrbiwanImages]({{ page.image_path }}/Device_Map_Location.png)

## Location

Allows users to manage locations and generate and export statistics for selected locations.

![OrbiwanImages]({{ page.image_path }}/Location-Tab.png)

## Devices

Allows users to manage devices.

![OrbiwanImages]({{ page.image_path }}/Devices-Tab.png)

## Visualization

Users can analyse the data with help of numerous charts. Users can export the
charts data, raw data, aggregated data etc.

![OrbiwanImages]({{ page.image_path }}/Visualization-Tab.png)

## Tags

Allows users to manage tags.

![OrbiwanImages]({{ page.image_path }}/Tab.png)

## Accounts

Allows administrators to manage users.

![OrbiwanImages]({{ page.image_path }}/Accounts-Tag.png)

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

__Legend as per parameter__

The legend changes according to the parameter selected. Only one out of these parameters at a time.

- Noise levels at the locations.

![OrbiwanImages]({{ page.image_path }}/Legend-NoiseLevel.png)

- Most recent battery voltage of the sensors installed at location.

![OrbiwanImages]({{ page.image_path }}/Legend-BatteryLevel.png)

- Last reception time at a location.

![OrbiwanImages]({{ page.image_path }}/Legend-LastSeen.png)

## Locations List

The locations list is displayed along with current status for selected parameter along with more options.

- First column is the __Location Name__. Users can also filter the locations using this.

![OrbiwanImages]({{ page.image_path }}/Location-Name.png)

- Second column is status. This columns shows the LED marker based on the parameter selected.

![OrbiwanImages]({{ page.image_path }}/Location-Status.png)

- Next to Status is a link icon, which takes you directly to the visualization page with location selected. The default visualization shown is the Average 15 min for last 7 days.

![OrbiwanImages]({{ page.image_path }}/Location-Link.png)

- At the end, there is a “>” icon which opens a small menu for the location. There are three options:

   - View:  Allows you to quick view of the noise levels for many visualizations. More on this is covered later in this chapter

   - Edit: Allows you to edit the location details.

   - Remove: Allows you to delete a location.

![OrbiwanImages]({{ page.image_path }}/Location-EditViewDelete.png)

The list also supports pagination and sorting. User can also select number of locations to be displayed on the list. However, the markers count on map is not related to number of results shown in list at one page. In fact, all of the locations in visible area are displayed on the map.

## Parameter Dropdown 

The dropdown allows users to select one of the parameters.

- Last Noise Status.

- Last Reception.

- Battery Voltage.

Once you select a parameter, both location list and map view will change the markers according to the legend shown on Map view.


## Tag Filter

The tag search box allows users to filter locations for a selected tags. Once user starts typing the tag name, suggestions appear below and user can select one or more tags.

## Time Machine

This option allows users to select a date in past. The status of selected parameter will be shown on the map. The markers will show the status as per most recent reception (in past from the time selected). 

__For e.g:__ Lets say today is 1st Nov 2020 and user selects 20th March 2020, the most recent status before 20th March 2020 will be fetched and marker colors will change accordingly. If there was no data for 7 days in past(i.e. 14th-20th March) the color will be gray (No data).

![OrbiwanImages]({{ page.image_path }}/TimeMachine.png)

The map view allows users to select more than one location. This feature is handy when user wants to visualize more than one location at a time. User can select all locations of their choice and simply click the visualization tab, the charts will be rendered for the locations selected.

## Quick View of Noise Levels

If user clicks on View button, user can see the quick view of noise levels for the selected location. By default the user will see the data for last 5 days. The number of days are configurable. This sections lists out all of the available quick views.

![OrbiwanImages]({{ page.image_path }}/QuickView.png)

- Quick View of Noise

This chart shows the individual time series of Leq, Lmin, Lmax for selected location.

![OrbiwanImages]({{ page.image_path }}/QuickView-001.png)

- Average 15 Min

This chart shows the average 15 min chart for Leq, Lmin, Lmax similar to the one on
visualization page.

![OrbiwanImages]({{ page.image_path }}/QuickView-15Min.png)

- Average OPB Periods

This chart shows the average OPB chart for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-OPB.png)

- Average 24 hours

This chart shows the average 24 hour for Leq, Lmin, Lmax similar to the one on visualization
page.

![OrbiwanImages]({{ page.image_path }}/QuickView-24Hour.png)

- Accumulated Average

This chart shows the accumulated average for Leq, Lmin, Lmax similar to the one on
visualization page.

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

| Field | Mandatory | Description |
| ----- | --------- | ------------|
| Location Name | Y | Location name. This is used to filter content.|
| Nearest physical address | N | Nearest address to the location to help users to locate the location. |
| Latitude | Y | Latitude of the location. |
| Longitude | Y | Longitude of the location. |
| Comment | N | A comment about the location. |
| Image | N | Any image of the location. |

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

There is a button to associate devices - __Associate Device__. Once user clicks the button, a form appears below as:

![OrbiwanImages]({{ page.image_path }}/AssociateDevice-Add.png)

Below are the Mandatory fields required.

| Field | Mandatory | Description |
| ----- | --------- | ------------|
| Device ID | Y | The Device ID|
| From Date | Y | The date and time when device was placed at this location|
| To Date | Y | By default this is not set, this is the date and time when device was removed from this location|
| Height | Y | Height of the device at the location|
| Direction | Y | Direction of the deivce at the location|
| Active| Y | Whether this device still exists at the location. By default it is yes.|

__Note:__ The option “Active” is provided so that old devices can be associated along with to date. 

__Note:__ For an inactive listing, to date is mandatory. If user is providing a to date, the association automatically becomes inactive.

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

Users can also select more than one location and click __Report Start Date__ or __Report End Date__
to update the start/end date for all selected locations at once.

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkSelect.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsBulkStartDate.png)

### Generating the Statistics

Once the dates are changed and locations are selected, users can generate the statistics by clicking on __Export location statistics__ as shown in the image below:

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation.png)

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocation001.png)

After clicking export app will start processing and will generate the statistics. It will finally download a csv files.

![OrbiwanImages]({{ page.image_path }}/StatisticsExportLocationProcessing.png)

## Devices

The devices page allows users to view all sensors along with most recent noise status. The following figure is showing the device page:

![OrbiwanImages]({{ page.image_path }}/DevicePage.png)

Three columns __vBat__, __KPI__ and __L/T__ are LED types. The status shown are as:

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

Users can update name, add a comment, date of installation and battery installation. The __Compute data__ flag decides if the data for device should be computed or not.

## Visualization

The visualization page enables users to visualize the data as charts. The charts are rendered based on the options selected. The interactive UI helps to let user choose locations, noise parameters, chart type etc.

__A note about data__

- The data is collected by noise sensors for a defined period of time, for current noise sensor it is defined as 15 minutes.

- Total 900 data points are collected over 15 minutes (1 per second).

- This data is aggregated and sent to Network Server.

- Thus, total 24x4 data points are the maximum count for a sensor.

The day and night periods are defined as the figure below:

![OrbiwanImages]({{ page.image_path }}/DataNote.png)

__Noiseapp Navigation - Day/Night Period Definition__

| Period | Start time | End time | Total time |
|--------| -----------| ---------| -----------|
|Day time | 6:00 | 21:45 | 16 Hours|
| Night time| 20:00| 05:45| 8 Hours|


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

__Average 15 Mins__

The average 15 min chart shows this data as it is.

![OrbiwanImages]({{ page.image_path }}/Average15MinGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

__Average OPB Periods__

The data collected over the day is aggregated further and two aggregations are done per day. For the night period and day period. This data is plotted as Average OPB period chart.

![OrbiwanImages]({{ page.image_path }}/AverageOPBGraph.png)

The grey lines(as a pulse) on the chart indicate day(high) and night period(low). The grey dashed lines(as a pulse) on the chart indicate weekdays (high), and weekends(low).

__Average 24 Hour__

Since the sensors are sending noise levels once every 15 minutes, there would be total 96 data points every day. For each day in date range selection, the data is to be averaged for each 15 min slot and be displayed on the chart as 96 data points. A curve fitting is also done using the function.

![OrbiwanImages]({{ page.image_path }}/Average24Hours.png)


The parameters used for the curve fitting are displayed below the chart. In the image, it can be seen that a table is generated for curve fitting parameters for Leq for Mon-Fri, Sat-Sun, Mon- Sun. The parameters are - Beta1, Beta2, t1, t2, Lmin, Lmax and R2.

__Accumulated Average__

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

| Field | Mandatory | Description |
| ----- | --------- | ------------|
| Tag | Y | Unique Tag name. This is used to filter content.|
| Description | Y | Description of the tag.|

![OrbiwanImages]({{ page.image_path }}/TabAdd.png)

## Users

Users page allows administrators to manage users. The figure below is a glimpse of the page.

![OrbiwanImages]({{ page.image_path }}/UserPage.png)


This page allows administrators to manage the users. They should be able to add more users, change passwords, and allow users to be admin. 

Administrators can also manage the permission to view the Jupyter notebook. If user is not allowed to view the jupyter notebook, he/she will not be able to see Jupyter tab in the menu.

Users can filter the list of users for - username, name, email, Administrator access, Jupyter access etc. Users can sort the list by name. The action column allows adminstrators to edit/delete users.

The figure below is the add user screen where administrators can add a user. Required fields are:

| Field | Mandatory | Description |
| ----- | --------- | ------------|
|Name | N | Display name of a user.|
|Username | Y | Required Username for the user.|
|Email | Y | Email address which is also used as a login.|
|Password| Y | Password must contain at least 1 special character, uppercase, lowercase letter and number. |
| Confirm Password | Y | Same as Password. |
| Role | Y | The role of the user. The user can be Administrator, Normal User or Read-only.|

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
