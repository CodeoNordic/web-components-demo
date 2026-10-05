# Event Buttons
Events may have a set of buttons that are shown upon hovering the mouse on the event.
These buttons are fully dynamic, and are specified using the `eventButtons` array.

Each button should have an [`icon`](./icons.md) and an associated `script` to run when clicked.

**Note:** These scripts should NOT be keys of [`scriptNames`](./script-names.md).

Buttons may also include a [`_filter`](./_filter.md) to specify which events may
include the button. This is especially useful for displaying different buttons
depending on the type of event.

---

```json
{
    // Config
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "Arrived": false,
            "DidNotArrive": false
        }
    ],

    "eventButtons": [
        // Arrived
        {
            "script": "[TRG] = EVNT Arrived",
            "icon": "<svg>...</svg>",
            "_filter": {
                "Arrived": false,
                "DidNotArrive": false
            }
        },

        // Did not arrive
        {
            "script": "[TRG] = EVNT DidNotArrive",
            "icon": "minus",
            "_filter": {
                "Arrived": false,
                "DidNotArrive": false
            }
        },

        // Checkout
        {
            "script": "[TRG] = EVNT Checkout",
            "icon": "checkout",
            "_filter": {
                "Arrived": true
            }
        }
    ]
}
```