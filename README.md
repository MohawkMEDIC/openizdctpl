# OPEN IMMUNIZE DISCONNECTED CLIENT APPLET

This is a blank OpenIZ Disconnected Client applet. It can be used as a springboard for creating
OpenIZ disconnected client applications.

## Directory Structure

An OpenIZ applet can be made up of any structure, but we find this structure to be useful for organizing your
work.

* /.ref - References to OpenIZ core stuff (JavaScript, CSS, etc.) anything you want in your IntelliSense auto-complete
* /controllers - Javascript files which represent the AngularJS controllers
* /css - Styles used in your application
* /js - JavaScript that is not really a controller
* /templates - IMS templates in JSON format which your applet wishes to expose
* /views - Views and partials in your applications
* /Manifest.xml - The manifest file which is used to identify your application's metadata
* /index.html - The landing page for your applet when it is marked as the entry applet

## Getting your Applet into OpenIZ DC

To get your applet into OpenIZ Disconnected client you must first package it. To do this, run the AppletCompiler
available from the OpenIZ website. This will produce a .pak file which represents your applet and can be imported
into the OpenIZ Disconnected Client.

You may also debug your applet by rendering the HTML pages to disk and then viewing them in any HTTP server. Unfortunately
the JNI functions provided by OpenIZ.js will not function but we find it useful for getting the basic user interface
stuff done.