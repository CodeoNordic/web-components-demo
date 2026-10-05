# Init function <!-- omit in toc -->
This function initialises the calendar with all the required values.

In practice, the function can be called multiple times in order to update the calendar, but optimally you should use the appropriate function listed in the [function documentation](./functions.md).

**Check the [demo file](./Demo.fmp12) and/or the [example-data](./example-data/) folder for examples.**

---

## JSON Structure <!-- omit in toc -->
All configuration values should be structured into the same object, in such a way that the entire configuration can be passed as a singular JSON string.

## List of config values <!-- omit in toc -->
- [`view` (string)](#view-string)
- [`date` (string)](#date-string)
- [`dateFormat` (string)](#dateformat-string)
- [`clampStartDates` (boolean)](#clampstartdates-boolean)
- [`clampEndDates` (boolean)](#clampenddates-boolean)
- [`shortenClampedDates` (boolean)](#shortenclampeddates-boolean)
- [`days` (number)](#days-number)
- [`events` (array)](#events-array)
- [`eventTimeFormat` (string)](#eventtimeformat-string)
- [`resources` (array)](#resources-array)
- [`resourceGroups` (array)](#resourcegroups-array)
- [`resourceGroupField` (string)](#resourcegroupfield-string)
- [`resourcesWidth` (string)](#resourceswidth-string)
- [`eventFilters` (array)](#eventfilters-array)
- [`eventFilterAreas` (array)](#eventfilterareas-array)
- [`eventFiltersHidden` (boolean)](#eventfiltershidden-boolean)
- [`eventFilterBehavior` (string)](#eventfilterbehavior-string)
- [`eventTemplates` (array)](#eventtemplates-array)
- [`eventTemplateAreas` (array)](#eventtemplateareas-array)
- [`eventTemplatesHidden` (boolean)](#eventtemplateshidden-boolean)
- [`eventComponents` (array)](#eventcomponents-array)
- [`defaultEventComponent` (string)](#defaulteventcomponent-string)
- [`searchFields` (array)](#searchfields-array)
- [`searchFieldsHidden` (boolean)](#searchfieldshidden-boolean)
- [`eventStartEditable` (boolean)](#eventstarteditable-boolean)
- [`eventDurationEditable` (boolean)](#eventdurationeditable-boolean)
- [`eventResourceEditable` (boolean)](#eventresourceeditable-boolean)
- [`contrastCheck` (boolean)](#contrastcheck-boolean)
- [`contrastMin` (number)](#contrastmin-number)
- [`dayMinWidth` (number)](#dayminwidth-number)
- [`fullCalendarLicense` (string)](#fullcalendarlicense-string)
- [`locale` (string)](#locale-string)
- [`translations` (object)](#translations-object)
- [`nowIndicator` (boolean)](#nowindicator-boolean)
- [`firstDayOfWeek` (string or number)](#firstdayofweek-string-or-number)
- [`hideTimeLabels` (boolean)](#hidetimelabels-boolean)
- [`slotLabelFormat` (string or object or array)](#slotlabelformat-string-or-object-or-array)
- [`slotDuration` (string)](#slotduration-string)
- [`slotLabelInterval` (string)](#slotlabelinterval-string)
- [`useDefaultSlotRenderer` (boolean)](#usedefaultslotrenderer-boolean)
- [`allDaySlot` (boolean)](#alldayslot-boolean)
- [`showWeekends` (boolean)](#showweekends-boolean)
- [`selectableTooltips` (boolean)](#selectabletooltips-boolean)
- [`calendarStartTime` (string) and `calendarEndTime` (string)](#calendarstarttime-string-and-calendarendtime-string)
- [`initialScrollTime` (string)](#initialscrolltime-string)
- [`eventCreation` (boolean)](#eventcreation-boolean)
- [`eventCreationDoubleClick`](#eventcreationdoubleclick)
- [`heatmap` (array or boolean)](#heatmap-array-or-boolean)
- [`newEventFields` (array)](#neweventfields-array)
- [`newEventMovable` (boolean)](#neweventmovable-boolean)
- [`scriptNames` (object)](#scriptnames-object)
- [`customCSS` (string)](#customcss-string)
- [`styles` (object)](#styles-object)
- [`icons` (array)](#icons-array)
- [`eventButtons` (array)](#eventbuttons-array)
- [`nextPollMs` (number)](#nextpollms-number)
- [`pollIntervalMs` (number)](#pollintervalms-number)
- [`sideMenuOpen` (boolean)](#sidemenuopen-boolean)
- [`sideMenuDisabled` (boolean)](#sidemenudisabled-boolean)
- [`datePickerDisabled` (boolean)](#datepickerdisabled-boolean)
- [`ignoreInfo` (boolean)](#ignoreinfo-boolean)
- [`ignoreWarnings` (boolean)](#ignorewarnings-boolean)

### `view` (string)
Controls which [FullCalendar view](https://fullcalendar.io/docs/initialView) should be used.
Although FullCalendar has an `initialView` value, this calendar will automatically update the
view if the value is changed in the config through E.G [`setConfigValue`](./functions.md#setconfigvaluekey-value)

#### All Different Views <!-- omit in toc -->

**Time Grid**
- `timeGrid`
- `timeGridDay`
- `timeGridWeek`
- `resourceTimeGrid`
- `resourceTimeGridDay`
- `resourceTimeGridWeek`

**Day Grid**
- `dayGrid`
- `dayGridDay`
- `dayGridWeek`
- `dayGridMonth`
- `dayGridYear`
- `resourceDayGrid`
- `resourceDayGridDay`
- `resourceDayGridWeek`
- `resourceDayGridMonth`

**List**
- `listDay`
- `listWeek`
- `listMonth`
- `listYear`

**Timeline**
- `timeline`
- `timelineDay`
- `timelineWeek`
- `timelineMonth`
- `timelineYear`
- `resourceTimeline`
- `resourceTimelineDay`
- `resourceTimelineWeek`
- `resourceTimelineMonth`
- `resourceTimelineYear`

**Other**
- `multiMonthYear`

```json
{
    "view": "resourceTimeGridDay" // The view most commonly used by Codeo
}
```

**Default value:** `timeGridWeek`

### `date` (string)
Controls which date is currently selected. If multiple days are shown, the currently selected date will be the first date in the range.

**Note:** The date picker in the side-menu will automatically update this value UNLESS the scriptname `onDateSelected` is defined,
in which case you should manually set this value using [`setConfigValue('date', ...)`](./functions.md#setconfigvaluekey-value).

```json
{
    "date": "19.11.2024"
}
```

**Default value:** `[Current Date]`

### `dateFormat` (string)
Controls the format of the date displayed in the calendar.

```json
{
    "dateFormat": "DD.MM.YYYY"
}
```

### `clampStartDates` (boolean)
If enabled, will ensure that every event that is before the calendars time range, is forced to be displayed in the calendar, at the earliest date.

This is used in Codeo's production plan, where each individual event may
be displayed regardless of its date.

```json
{
    "date": "2024-11-19",
    "days": 4,
    "clampStartDates": true,
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "start": "2024-11-18T07:00:00.000Z" // Will be shown at November 19th 
        }
    ]
}
```

**Default value:** `false`

### `clampEndDates` (boolean)
If enabled, will ensure that every event that is after the calendars time range, is forced to be displayed in the calendar, at the latest date.

This is used in Codeo's production plan, where each individual event may
be displayed regardless of its date.

```json
{
    "date": "2024-11-19",
    "days": 4,
    "clampEndDates": true,
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "start": "2024-11-25T07:00:00.000Z" // Will be shown at November 22nd 
        }
    ]
}
```

**Default value:** `false`

### `shortenClampedDates` (boolean)
Clamped end dates will normally be clamped to the end of the range. Set this value
to `true` to set clamped end dates to the start of the range.

```json
{
    "shortenClampedDates": true
}
```

**Default value:** `false`

### `days` (number)
Controls how many days to display at once in the calendar. Certain calendar views will not use this value.

```json
{
    "days": 3 // shows 3 days at once
}
```

### `events` (array)
The list of events to display in the calendar.

```json
{
    "events": [
        {
            "id": "1",
            // ...
        }
    ]
}
```

Check the [events definition](./events.md) for more information.

### `eventTimeFormat` (string)
Passes into FullCalendar's [`eventTimeFormat`](https://fullcalendar.io/docs/eventTimeFormat) value.

This value does mostly nothing, as the event display is controlled by the [event component](./event-components.md).

**Default value:** `HH:mm`

### `resources` (array)
The list of resources to use in the calendar.

```json
{
    "resources": [
        {
            "id": "1",
            "title": "Room 6"
        }
    ]
}
```

### `resourceGroups` (array)
Optional array used to group resources in views that support it.

```json
{
    "resourceGroups": [
        {
            "id": "group1",
            "title": "Managers",
            "collapsed": true, // optional boolean to expand/collapse the group by default
        }
    ]
}
```

### `resourceGroupField` (string)
Determines which value should be checked when determining
which resource group an event should be assigned to.

```json
{
    "resourceGroups": [
        {
            "id": "group_managers",
            "title": "Managers"
        },

        {
            "id": "group_employees",
            "title": "Employees"
        }
    ],
    "resourceGroupField": "GroupId", // Custom key
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "GroupId": "group_managers",
            // ...
        },

        {
            "id": "ponm-lkji-hgfe-dcba",
            "GroupId": "group_employees",
            // ...
        }
    ]
}
```

### `resourcesWidth` (string)
Controls the width of the resources. Only relevant in views where resources are visible on the side. **Must be a valid CSS unit.**

```json
{
    "resourcesWidth": "360px"
}
```

**Default value:** `17.5rem`

### `eventFilters` (array)
The list of available event filters.

Check the [event filters definition](./event-filters.md) for more information.

### `eventFilterAreas` (array)
The list of areas that [event filters](./event-filters.md) can be grouped into. The only required field is `name`.

```json
{
    "eventFilterAreas": [
        {
            "name": "area1", // Unique name
            "title": "Area 1", // Title displayed in the menu
            "open": true, // Whether the area should be opened or collapsed
            "sort": 3 // the order the area appears in the side menu
        }
    ]
}
```

### `eventFiltersHidden` (boolean)
Controls whether or not all event filters should be hidden.
May serve as a global control over each individual filter's
`hidden` value.

```json
{
    "eventFiltersHidden": true
}
```

### `eventFilterBehavior` (string)
Controls how [event filters](./event-filters.md) behave in relation to one another.

```json
{
    "eventFilterBehavior": "any"
}
```

**Default value:** `groupedAny`

### `eventTemplates` (array)
Displays a list of event templates in the sidemenu that can be dragged
into the calendar to automatically create an event with a certain set
of values.

Useful for granting the ability to easily create specific types of
events, or to assign a date/time for an event that isn't currently
in the calendar.

Check the [event templates definition](./event-templates.md) for more information.

### `eventTemplateAreas` (array)
The list of areas that [event templates](./event-templates.md) can be grouped into. The only required field is `name`.

```json
{
    "eventTemplateAreas": [
        {
            "name": "area1", // Unique name
            "title": "Area 1", // Title displayed in the menu
            "open": true, // Whether the area should be opened or collapsed
            "sort": 1 // the order the area appears in the side menu
        }
    ]
}
```

### `eventTemplatesHidden` (boolean)
Controls whether or not the event templates should be hidden.
Ideally, if event templates are meant to be hidden, they shouldn't
be passed in the first place, but this serves as a shortcut.

```json
{
    "eventTemplatesHidden": true
}
```

### `eventComponents` (array)
The list of event components used for displaying events.

Check the [event component definition](./event-components.md) for more information.

### `defaultEventComponent` (string)
Controls which [event component](#eventcomponents-array) should be used by default
for events that don't match the criteria of any component.

If a default event component isn't defined, and the event does not match any
component criteria, the event will not be displayed, and a warning will be shown
in the web console.

```json
{
    "eventComponents": [
        {
            "name": "exampleComponent",
            // ...
        }
    ],

    "defaultEventComponent": "exampleComponent"
}
```

### `searchFields` (array)
A list of search  fields that should be available in the side-menu.

Check the [searching definition](./searching.md) for more information.

### `searchFieldsHidden` (boolean)
Controls whether or not all search fields should be hidden.
Ideally, if search fields are meant to be hidden, they shouldn't
be passed in the first place, but this serves as a shortcut.

```json
{
    "searchFieldsHidden": true
}
```

### `eventStartEditable` (boolean)
Controls whether or not events can be dragged to a different time.

**This only controls the starting time. Use together with [`eventDurationEditable`](#eventdurationeditable-boolean) to disable changing any time.**

```json
{
    "eventStartEditable": false
}
```

**Default value:** `true`

### `eventDurationEditable` (boolean)
Controls whether or not events can have their duration changed.

**This only controls the end time. Use together with [`eventStartEditable`](#eventstarteditable-boolean) to disable changing any time.**

```json
{
    "eventDurationEditable": false
}
```

**Default value:** `true`

### `eventResourceEditable` (boolean)
Controls whether or not events can be dragged to a different resource.

```json
{
    "eventResourceEditable": false
}
```

**Default value:** `true`

### `contrastCheck` (boolean)
Controls whether or not the built-in contrast checker should be used when displaying certain elements,
such as the events and filters, to try and optimize accessibility.

```json
{
    "contrastCheck": true
}
```

**Default value:** `true`

### `contrastMin` (number)
Sets the level of contrast that is required for the contrast check to activate.

```json
{
    "contrastMin": 3.5    
}
```

### `dayMinWidth` (number)
Sets the minimum width per day in the calendar. Used to enable horizontal
scrolling, where the amount of days displayed cannot fit properly in a
single screens width.

FullCalendar only accepts a number of pixels for this value.

```json
{
    "dayMinWidth": 200 // each day is minimum 200 pixels wide
}
```

**Default value:** `2`

### `fullCalendarLicense` (string)
Your developer license to fullcalendar, if needed.

**This is not required if you are using the original, non-modified version of the calendar, unless you explicitly wish to use your own license.**

Codeo Norge AS owns a FullCalendar developer license applicable for the original version of "Just Another Calendar", which is automatically passed into the module.

```json
{
    "fullCalendarLicense": "xxxx-xxxx-xxxx-xxxx"
}
```

### `locale` (string)
Controls which language preset should be used by the calendar.
Used by FullCalendar along with certain date/time related areas of the calendar.

```json
{
    "locale": "en-us"
}
```

**Default value:** `en`

### `translations` (object)
Translation table for various labels in the calendar.

```json
{
    "weekNumberHeader": "U", // Defaults to 'W' for 'Week'
    "todayButton": "I dag", // Defaults to 'Today'

    "eventTemplatesHeader": "Avtalemaler", // Defaults to 'Event Templates', only used if no areas are defined

    "eventCreationHeader": "Ny avtale", // Defaults to 'New Event'
    "eventCreationConfirm": "Lagre", // Defaults to 'Save'
    "eventCreationCancel": "Avbryt" // Defaults to 'Discard'
}
```

### `nowIndicator` (boolean)
Controls whether or not an "now indicator" should be displayed in the calendar.

```json
{
    "nowIndicator": true
}
```

**Default value:** `true`

### `firstDayOfWeek` (string or number)
Controls which weekday is considered the start of a week, where 0 = sunday, 1 = monday, etc.
This is respected by both FullCalendar, and the date picker in the side-menu.

Can also be written as a string, E.G `"mon"`, `"tuesday"` etc. These must be written in English.

```json
{
    "firstDayOfWeek": 1 // Monday
}

{
    "firstDayOfWeek": "sun" // Sunday
}
```

**Default value:** `1 (monday)`

### `hideTimeLabels` (boolean)
Controls whether or not FullCalendar's time-slot labels will be hidden.

```json
{
    "hideTimeLabels": true // Hides time-slot labels
}
```

### `slotLabelFormat` (string or object or array)
This value is passed into FullCalendar's [`slotLabelFormat`](https://fullcalendar.io/docs/slotLabelFormat) value.

### `slotDuration` (string)
This value is passed into FullCalendar's [`slotDuration`](https://fullcalendar.io/docs/slotDuration) value.

### `slotLabelInterval` (string)
This value is passed into FullCalendar's [`slotLabelInterval](https://fullcalendar.io/docs/slotLabelInterval) value.

### `useDefaultSlotRenderer` (boolean)
Set to true to utilize FullCalendar's default slot renderer when displaying day/time slots.

```json
{
    "useDefaultSlotRenderer": true
}
```

### `allDaySlot` (boolean)
Controls whether or not "all day" events should be displayed or not. Passes into FullCalendar's [`allDaySlot`](https://fullcalendar.io/docs/allDaySlot) value.

```json
{
    "allDaySlot": false // Disables the all-day slot
}
```

**Default value:** `true`

### `showWeekends` (boolean)
Controls whether or not weekends should be displayed or not. Passes into FullCalendar's [`weekends`](https://fullcalendar.io/docs/weekends) value.

```json
{
    "showWeekends": true
}
```

**Default value:** `false`

### `selectableTooltips` (boolean)
Controls whether or not event tooltips can be highlighted/copied.

```json
{
    "selectableTooltips": true
}
```

**Default value:** `false`

### `calendarStartTime` (string) and `calendarEndTime` (string)
Sets the earliest and latest visible times in the calendar. Useful for defining working hours.

It is recommended to add 15 minutes to the end time, as the end time will not have a label.

```json
{
    "calendarStartTime": "08:00",
    "calendarEndTime": "16:15"
}
```

**Default value:** `08:00` and `21:15`

### `initialScrollTime` (string)
The initial time the calendar should scroll to upon loading.

In some cases, you may want the calendar to start at E.G 08:00, but grant the ability
to scroll up to E.G 06:00.

If this value is changed, the calendar will scroll again, but if the value is
changed to the same time, it will not scroll. Due to this, you should use the
[`scrollToTime(time)`](./functions.md#scrolltotimetime) function when
changing the position after loading.

```json
{
    "calendarStartTime": "06:00",
    "initialScrollTime": "08:00"
}
```

### `eventCreation` (boolean)
Controls whether or not events are able to be created by dragging in the calendar.

```json
{
    "eventCreation": false
}
```

**Default value:** `true`

### `eventCreationDoubleClick`
Controls whether or not events can be created by double clicking.

If a time is double clicked, AND [`eventCreation`](#eventcreation-boolean) is set to `false`, the [`onRangeSelected`](./script-names.md) script will run.

### `heatmap` (array or boolean)

**Boolean**
- `true` - Uses passed calendar events to calculate and display a heatmap in the sidebar date picker.
- `false` - Disables the heatmap.

**Array**

You can also pass an array of specific events for a custom heatmap, without sending all events to the calendar. Each entry in the array should include:

- `date` - The date of the event (e.g., "19.11.2024").
- `hours` - Total duration in hours (e.g., 3.5). Used to calculate "resource load"
- `color` - (optional): Custom color for the date, overriding the default heatmap color.

If `color` is set, `hours` is not required, as the calculation will be overridden by the custom color.

```json
{
    "heatmap": [
        {
            "date": "19.11.2024", // The date of the events
            "hours": 3.5, // The length of the events in hours

            "color": "#ff0000" // Color to use instead of calculating with hours
        }
    ],
    // or
    "heatmap": true // Will use the events in the calendar to calculate the heatmap
}
```

**Default value:** `true`


### `newEventFields` (array)
Controls which input fields to display in the built-in event-creation popup.

Check the [event creation documentation](./creating-events-from-calendar.md) for more information.

### `newEventMovable` (boolean)
Controls whether the new event popup can be moved around in the web viewer.

```json
{
    "newEventMovable": true
}
```

**Default value:** `true`


### `scriptNames` (object)
An object used to map FileMaker scripts to the calendar.

Check the [script names definition](./script-names.md) for more information.

### `customCSS` (string)
Injects custom CSS-styling into the web viewer's `<head>` element.

```json
{
    "customCSS": "body { background: red; }"
}
```

### `styles` (object)
Applies custom styling to specific parts of the calendar, such as events, or weekday labels.

Strings must be valid CSS-values.

Each style object is as follows:
```json
{
    "font": "...", // Sets 'font-family'
    "size": "...", // Sets 'font-size'
    "style": "...", // Sets 'font-style' E.G 'italic'

    "weight": "...", // Sets 'font-weight'. "boldness" can also set this (aliased)

    "margin": "...", // Sets 'margin'
    "padding": "...", // Sets 'padding'

    "color": "...", // Sets 'color'. "textColor" can also set this (aliased)
    "background": "...", // Sets 'backgroundColor'. "backgroundColor" can also set this (aliased)

    "aligment": "..." // Sets 'text-alignment'
}
```

```json
{
    "styles": {
        "base": {
            "font": "Sans-serif", // Overwrite the base font
            "size": "1.5rem" // Overwrite the base font size
        },

        "tooltip": {
            "font": "Arial",
            "weight": "bold"
        }
    }
}
```

### `icons` (array)
The list of reusable SVG-icons.

Check the [icon definition](./icons.md) for more information.

### `eventButtons` (array)
The list of available popup-buttons to display when hovering over events.

Check the [event button definition](./event-buttons.md) for more information.

### `nextPollMs` (number)
When this value is set, the module will run the `poll` script defined in [`scriptNames`](#scriptnames-object),
after a delay in milliseconds. Every time this number is set again, it will queue another poll.

`nextPollMs` is particularly useful for controlled polling, meaning you can account for
the time a FileMaker script takes to run, preventing cases where the script may run
before the previous script has finished.

For instance, you can set this value once, and set it again once the polling script has finished.

```json
{
    "nextPollMs": 3000
}
```

### `pollIntervalMs` (number)
Assign an interval in milliseconds for how often the module should run the `poll` script defined
in [`scriptNames`](#scriptnames-object).

This polling is continuous, meaning that if you set this value to 10 000, it will run the `poll`
script every 10 seconds.

Consider using [`nextPollMs`](#nextpollms-number) if possible, as it will likely be more consistent. 

```json
{
    "pollIntervalMs": 10000
}
```

### `sideMenuOpen` (boolean)
Controls whether or not the side menu should currently be opened. Should be used together with
the `onSideMenuOpened` and `onSideMenuClosed` scripts defined in [`scriptNames`](#scriptnames-object).

```json
{
    "sideMenuOpen": false
}
```

### `sideMenuDisabled` (boolean)
Controls whether or not the side menu should be disabled entirely.

```json
{
    "sideMenuDisabled": true
}
```

### `datePickerDisabled` (boolean)
Controls whether or not the side menu's date picker should be hidden.

```json
{
    "datePickerDisabled": true // Hides the date picker
}
```

### `ignoreInfo` (boolean)
Supresses info logs sent to the browser console.

**Default value:** `false`

### `ignoreWarnings` (boolean)
Supresses warnings sent to the browser console.

**It is not recommended to use this, as warnings often mean that a function was used incorrectly.**

**Default value:** `false`