# Events
To inject content into the calendar, events must be passed using the `events` key in the [config](./init.md#events-array).

The minimum requirement for each event is a unique `id` (string), and a start+end time.
If you are using a [FullCalendar view](./init.md#view-string) that includes resources, each event must also have
an associated `resourceId` (string or array of strings).

You can add any amount of additional fields, as long as they do not conflict with fields
already in use by the calendar. It is recommended to avoid using `camelCase`-casing for
additional fields, as the calendar uses this format. 

Some of the fields for events are:

- `allDay` (boolean) - If the event is an all-day event
- `tooltip` (string) - Text displayed when hovering over the event
- `type` (string) - Type of event (event or backgroundEvent)

## Background Events
If `type` is set to `backgroundEvent`, the event will be displayed in the background of the calendar.
Background events are events that are not clickable, and are partially see through.

A background event does not need a `resourceId`, if no `resourceId` is supplied, it will be displayed in the background of all resources for the given time.

The fields specific to background events are:

- `backgroundTitle` (string) - Text displayed under the date in the calendar
- `backgroundText` (string) - Text displayed in the event

## Start+End
Due to a diversity in preference, there are multiple ways of defining a date/time range for events:

**Note:** FullCalendar by default DOES NOT respect timezones. Due to this, we created a way
of translating the event time to the correct timezone, but ONLY IF the event uses
ISO or Unix timestamps. If you are not comfortable working with timezones, it is recommended
to avoid using ISO and Unix. Functionality is not affected depending on which date/time definition you use.

### Valid Start date/time definitions
- `start` (string) or `timestampStart` (string) - An ISO timestamp (E.G 2024-11-19T07:00:00.000Z)

- `dateStart` (string) or `startDate` (string) - A standard date format (E.G 2024-11-19, 11/19/2024, 19.11.2024, etc.)
- `timeStart` (string) or `startTime` (string) - A 24-hour time (E.G 09:00, 17:30, etc.)
- `unixStart` (number) - A unix timestamp in seconds (E.G 1731999600)

### Valid End date/time definitions
- `end` (string) or `timestampEnd` (string) - An ISO timestamp (E.G 2024-11-19T08:00:00.000Z)

- `dateEnd` (string) or `endDate` (string) - A standard date format (E.G 2024-11-19, 11/19/2024, 19.11.2024, etc.)
- `timeEnd` (string) or `endTime` (string) - A 24-hour time (E.G 10:00, 18:30, etc.)
- `unixEnd` (number) - A unix timestamp in seconds (E.G 1732003200)

## Example

> In an event's `tooltip`, you can create a divider by including three dashes `---` on its own line.

```json
{
    "resources": [
        {
            "id": "room6",
            "title": "Room 6"
        }
    ],

    // Config
    "events": [
        {
            "id": "1",
            "resourceId": "room6",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "tooltip": "A young development team in Codeo Norway has made a developer friendly calendar component for FileMaker Developers in JavaScript (TypeScript) using React.",

            "colors": {
                "text": "#fff",
                "background": "#285a78"
            },

            // Additional custom fields to be used in an event component
            "Title": "Just Another Calendar",
            "Sponsor": "Andreas Haandlykken"
        }
    ]
}
```