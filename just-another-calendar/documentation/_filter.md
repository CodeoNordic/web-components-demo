# _filter
Multiple configurations in the calendar can include a `_filter` object.
This object defines criteria that an event must follow to be included
in E.G the event filter, event component etc.

Each value in the `_filter` object will be compared with each event,
and has support for [lodash.get](https://lodash.com/docs/4.17.15#get) syntax.
In practice, this means that if an entire event is passed as a `_filter`, it
will work, but only that specific event will satisfy the criteria, granted that
its `id` is 100% unique.

Events can have any amount of values, and as such, you may use your own values
here, as long as they do not overwrite values required by the calendar.

**For string values, you may attempt to use a syntax similar to FileMaker Find requests, as the code includes an attempted equivalent. This equivalent is not a 1:1 replica, but is designed to be as close as possible to it.**

---

## Example 1: Event component for "meeting" events
Check the [event component definition](./event-components.md) for more information.

```json
// Config
{
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "start": "2024-11-19T08:00:00.000Z", // ISO timestamp
            "end": "2024-11-19T09:00:00.000Z", // ISO timestamp

            // Custom value NOT used by the calendar code
            "YourCustomEventType": "meeting", // The key can be anything
            "YourCustomRoom": "1A",

            "YourCustomNestedObject": {
                "TestValue": true
            }
        }
    ],

    "eventComponents": [
        {
            "name": "YourMeetingComponent",
            "fields": [
                {
                    "type": "text",
                    "template": "{time:start} - {time:end}"
                },

                {
                    "type": "text",
                    "template": "Room: {YourCustomRoom}"
                }
            ],
            
            "_filter": {
                "YourCustomEventType": "==meeting",
                "YourCustomNestedObject.TestValue": true // Lodash.get syntax
            }
        }
    ]
}
```

## Example 2: Delayed button for "appointment" events
Check the [event button definition](./event-buttons.md) for more information.

```json
// Config
{
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "start": "2024-11-19T08:00:00.000Z", // ISO timestamp
            "end": "2024-11-19T09:00:00.000Z", // ISO timestamp

            // Custom value NOT used by the calendar code
            "YourCustomEventType": "appointment", // The key can be anything
            "YourCustomNestedObject": {
                "Arrived": false
            }
        }
    ],

    "eventButtons": [
        {
            "icon": "clock",
            "script": "[TRG] = EVNT Late", // FileMaker script to run when the button is clicked
            
            "_filter": {
                "YourCustomEventType": "==appointment",
                "YourCustomNestedObject": {
                    "Arrived": false
                }
            }
        }
    ]
}
```

## Example 3: Client-only event filters
Check the [event filter definition](./event-filters.md) for more information.

```json
// Config
{
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",
            "start": "2024-11-19T08:00:00.000Z", // ISO timestamp
            "end": "2024-11-19T09:00:00.000Z", // ISO timestamp

            "YourCustomEventType": "meeting"
        },

        {
            "id": "ponm-lkji-hgfe-dcba",
            "start": "2024-11-19T08:00:00.000Z", // ISO timestamp
            "end": "2024-11-19T09:00:00.000Z", // ISO timestamp

            // Custom value NOT used by the calendar code
            "YourCustomEventType": "appointment", // The key can be anything
            "YourCustomNestedObject": {
                "PaymentStatus": 0 // Example: 0 = Unpaid, 1 = Overdue, 2 = Paid
            }
        }   
    ],

    "eventFilters": [
        {
            "title": "Meetings",
            "clientOnly": true,
            "_filter": {
                "YourCustomEventType": "==meeting"
            }
        },

        {
            "title": "Unpaid Appointments",
            "clientOnly": true,
            "_filter": {
                "YourCustomEventType": "==appointment",
                "YourCustomNestedObject.PaymentStatus": "<2" // Less than 2
            }
        }
    ]
}
```