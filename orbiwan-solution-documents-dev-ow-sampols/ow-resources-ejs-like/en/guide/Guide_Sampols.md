---
layout: page
title: User Management
menu: guide
lang: en
permalink: UserManagement.html
ow_parent: '-'
page_id: 'UserManagement'
page_type: 'sub-page'
sub_pages: false
image_path: 'images/UserManagement'
video_path: 'videos'
order: 2
sidebar_content:
  - Login
  - Add Device
  - Map
  - Visualization
  - Jupyter
---

{:.pageTitle}

# Relationship among entities

The following core entities are part of the application:

- User
- Device
- Location
- Tags
- Permissions

Let’s understand each of these one by one.

## User

Users are independent entity which represents an individual(most often).

![OrbiwanImages]({{ page.image_path }}/User.png)

## Devices

A device is an independent entity which represents a single noise sensor device. Devices are associated with location. A device can be associated with atmost one location at a point of time.

![OrbiwanImages]({{ page.image_path }}/Device.png)

## Location

A location is a physical location. It can be a pole’s location, building, campus, field, an area etc. Every location will have latitude and longitude. At each location, there can be more than one device.

![OrbiwanImages]({{ page.image_path }}/Location.png)

## Tags

A tag is a keyword assigned to an entity. Mostly to a device or a location. More than one tag can be assigned to an entity. A single tag can be assigned to more than one entity.

![OrbiwanImages]({{ page.image_path }}/Tags.png)

## Permissions

User’s rights are managed using different rights. A right is a key using which a user can perform certain action or is entitled to access something.

![OrbiwanImages]({{ page.image_path }}/Permissions.png)

### Normal User

Any logged in user has at least this right. This role allows users to see the pages which does not require any specific access.

### Administrator

A super user will be able to do all of the administrative tasks for the application. All of the rights are part of this role.

### Read-only User

A user will be only able to access certain pages and only view the data. The user with this roles will not be allowed to perform any modifications.
