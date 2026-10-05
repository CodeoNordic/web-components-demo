# Icons
Each field in an [event component](./event-components.md) can have an icon beside it.
This can be done in various ways, but the best solution is to make the icons reusable,
by defining them once in the `icons` array:

```json
{
    // Config
    "icons": [
        {
            "name": "announcement",
            "html": "<svg>...</svg>"
        },

        {
            "name": "person",
            "html": "<svg>...</svg>"
        }
    ],

    "events": [
        {
            "id": "1",
            // ...

            "Title": "Just Another Calendar",
            "Speaker": "Andreas Haandlykken"
        }
    ],

    // Usage in a component
    "eventComponents": [
        {
            "value": "Title",
            "icon": "announcement"
        },

        {
            "value": "Speaker",
            "icon": "person"
        }
    ]
}
```

---

You can also write the icon directly in the field:
```json
{
    // Config
    "eventComponents": [
        {
            "value": "Title",
            "icon": "<svg>...</svg>"
        },

        {
            "value": "Speaker",
            "icon": "<svg>...</svg>"
        }
    ]
}
```

---

## Dynamically displaying Icons
You may use the `eval:` prefix to dynamically set a specific icon,
based on the event's data and the config.

Identical to the `eval:` rule for [event components](./event-components.md#3-eval-javascript-code),
the JavaScript code **must be a callable function.**

> If a false-like value is returned, the icon will not be displayed.

```json
{
    // Config
    "icons": [
        {
            "name": "announcement",
            "html": "<svg>...</svg>"
        },

        {
            "name": "sponsor",
            "html": "<svg>...</svg>"
        }
    ],

    "events": [
        {
            "id": "1",
            // ...

            "Title": "An interesting title",
            "Category": "Announcement_Category",
            "Speaker": "Name Lastname"
        },

        {
            "id": "2",
            // ...

            "Title": "Just Another Calendar",
            "Category": "Sponsor_Category",
            "Speaker": "Andreas Haandlykken"
        }
    ],

    "eventComponents": [
        {
            "value": "Title",
            "icon": "eval:(event) => event.Category === 'Announcement_Category'? 'announcement':'sponsor'"
        },

        // You can also return the icon object or plain HTML
        {
            "value": "Speaker",
            "icon": "eval:(event, config) => event.Category === 'Announcement_Category'? config.icons.find(icon => icon.name === 'sponsor'): '<svg>...</svg>'"
        }
    ]
}
```