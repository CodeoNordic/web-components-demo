# Get Started
This guide will help you get a quick and easy start to implement the calendar in your application.

## Prerequisites
To implement the calendar in your application, you will need a **FileMaker text-field to store the HTML-contents to.**
It is recommended to create a `HTML`-table, with a `Name` and `HTML`-field, allowing you to store multiple web
modules in the same table, by identifying source-code by name.

## 1. Copy the `UploadHTML` script from the [`demo-file`](../Demo.fmp12)
This script takes in JSON parameters sent from [`upload.js`](../upload.js) to read the contents of the HTML-file,
and writes it to the HTML-field. You will need to copy this script and ensure that the references layouts and fields are defined.

**Note:** The parameters sent depend on your [`widget.json`](../widget.json) configuration. Ensure that its values are correct.

Read the documentation on [uploading the HTML to FileMaker](./uploading-to-filemaker.md) for more information.

The following lines should be checked:
- 22 - Goes to the `HTML`-layout
- 28 - Checks for an existing web module in the `HTML`-table using the `HTML::Name`-field
- 34 and 50 - Uses the `HTML::HTML`-field
- 70 - Uses the `HTML::Name`-field

**Alternatively, you can simply copy and paste the HTML-contents into the web viewer or `HTML`-table.**

## 2. Copy the `LoadHTML` script from the [`demo-file`](../Demo.fmp12)
This script takes in three parameters through JSON to inject the HTML into your web viewer:
- `moduleName` (string) - Name of the module to load from the `HTML`-table
- `objectName` (string) - Object name of the web viewer to inject the HTML into
- `dev` (boolean, optional) - Used when developing the source-code, loads a `localhost` address instead

The following lines should be checked:
- 27 - Opens a new window in the `HTML`-layout
- 30 - Finds the web module in the `HTML`-table using the `HTML::Name`-field
- 35 - Stores the HTML-code in a variable using the `HTML::HTML`-field

## 2. Add a JSON-field to your Event table
To pass your events into the calendar, you will need a JSON-object for each event. Create a JSON-field which follows the structure defined
in the [event documentation](./events.md).

It is also highly recommended to make a summary field for the JSON, to improve performance when fetching your events.

## 3. Add a JSON-field to your Resources table (if relevant)
If you are using a [FullCalendar view](./init.md#view-string) that includes resources, you will need to add a JSON-object for each resource.
The minimum requirement is that each resource must have an `id` and a `title`. Events will be placed under its respective resource(s) by its `resourceId` field.

## 4. Create your initialization script
The initialization script should do the following:
1. Gather a JSON array of events
2. Gather a JSON array of resources (if relevant)
3. Load the calendar HTML into your web viewer
4. Use the `[Perform JavaScript In Web Viewer]` step to run the `init function`(./init.md)

## 5. Customize the how events are displayed
To achieve this, you will have to define your own [event component](./event-components.md).

The default event display displays the event's time range and `title` (if defined).

## 6. Add event filters
To enhance the user experience, you may add [event filters](./event-filters.md) to the side-menu, making it
easy for the user to hide/show specific types of events.

## 7. Add event templates
If you have events with frequent duplicate fields, you may want to consider adding [event templates](./event-templates.md).

## 8. Add custom searching
Users that need to find specific events quickly may benefit from custom [searching](./searching.md) functionality.