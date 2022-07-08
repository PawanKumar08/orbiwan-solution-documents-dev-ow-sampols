---
layout: page
title: Security Best Practices
menu: advanced
lang: en
permalink: "security.html"
sub_pages: false
page_type: "sub-page"
---

# Production Best Practices: Security

## Overview

The term _"production"_ refers to the stage in the software lifecycle when an application or API is generally available to its end-users or consumers. In contrast, in the _"development"_ stage, you're still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as _production_ and _development_ environments, respectively.

Development and production environments are usually set up differently and have vastly different requirements. What's fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don't need to worry about scalability, reliability, and performance, while those concerns become critical in production.
