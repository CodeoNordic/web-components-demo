# Event Templates
A powerful feature of this calendar is the ability to drag an event in
from the side-menu, by using **templates**. This can be used for creating specific types
of events, but also for assigning a time to future events in a waiting list.

When a template is dragged into the calendar, an ID is automatically created using the
`uuid` format. However, if an ID is already specified in the `event` value of a template,
this will be used.

Each event template may also include a `locked` value, which controls whether or not the user can
drag the template into the calendar. This is useful if you want to prevent dragging E.G an event from
a waiting-list twice.

It is also possible to give an event template a `duration` value in the event field, which specifies the duration of the event when dragged in, in hh:mm format.

> If you have event creation enabled (popup), you can add a `instant` boolean value to bypass this for a specific template.

```json
{
    // Config
    "eventTemplates": [
        // Consulting
        {
            "title": "Consulting",
            "backgroundColor": "#4499cc",
            "textColor": "#ffffff",

            "event": {
                "colors": {
                    "background": "#4499cc",
                    "textColor": "#ffffff"
                },
                "duration": "02:00",

                "YourCustomEventType": "consulting"
            }
        },

        // Meeting
        {
            "title": "Meeting",
            "backgroundColor": "#aaeeaa",
            "textColor": "#000000",

            "event": {
                "colors": {
                    "background": "#aaeeaa",
                    "textColor": "#000000"
                },

                "YourCustomEventType": "meeting"
            }
        },

        // An event in a waiting list
        {
            "title": "P-001 Joakim Isaksen",
            "backgroundColor": "#777799",
            "textColor": "#ffffff",

            "event": {
                // Pre-determined ID
                "id": "abcd-efgh-ijkl-mnop",

                "colors": {
                    "background": "#777799",
                    "textColor": "#ffffff"
                },

                "YourCustomEventType": "consulting"
            }
        }
    ]
}
```
## Grouping event templates into areas
If you have many templates of varying categories, you may group these by specifying an `areaName` per template.
These areas must already be defined in the [config](./init.md#eventtemplateareas-array).

> If no event template areas are specified, a default one will be created with the name "Templates", unless
the `eventTemplatesHeader` translation is defined in the [`translations`](./init.md#translations-object) object.

By default, the templates will be ordered depending on their placement in the array, but this can be overwritten
by specifying a `sort` number for one or more templates.

```json
{
    "eventTemplateAreas": [
        {
            "id": "templates",
            "title": "Templates",
            "open": true
        },

        {
            "id": "waitingList",
            "title": "Waiting List",
            "open": false
        }
    ],

    "eventTemplates": [
        // Consulting
        {
            "areaName": "templates",

            "title": "Consulting",
            "backgroundColor": "#4499cc",
            "textColor": "#ffffff",

            "event": {
                "colors": {
                    "background": "#4499cc",
                    "textColor": "#ffffff"
                },
                "duration": "02:00",

                "YourCustomEventType": "consulting"
            }
        },

        // Meeting
        {
            "areaName": "templates",

            "title": "Meeting",
            "backgroundColor": "#aaeeaa",
            "textColor": "#000000",

            "event": {
                "colors": {
                    "background": "#aaeeaa",
                    "textColor": "#000000"
                },

                "YourCustomEventType": "meeting"
            }
        },

        // An event in a waiting list
        {
            "areaName": "waitingList",

            "title": "P-001 Joakim Isaksen",
            "backgroundColor": "#777799",
            "textColor": "#ffffff",

            "event": {
                // Pre-determined ID
                "id": "abcd-efgh-ijkl-mnop",

                "colors": {
                    "background": "#777799",
                    "textColor": "#ffffff"
                },

                "YourCustomEventType": "consulting"
            }
        }
    ]
}
```