# Event Components
Most developers will want their events to be displayed differently
from the default setting. This is what **event components** are
responsible for.

Each event component defined in the [config](./init.md#eventcomponents-array)
should have a list of fields to display, along with optional criteria to describe
when they should be displayed.

## Field Definition
Each field can be defined in three separate ways:

### 1. Value
Reads the specified key from the event.

```json
{
    "value": "FirstName"
}
```

### 2. Template
Parse a string template where anything wrapper in curly brackets `{` and `}`
will inject the event's field values.

```json
{
    "template": "Full name: {FirstName} {LastName}"
}
```

There is also built-in support for converting timestamps into a readable
format:

```json
{
    "template": "Meeting start: {time:start}"
}
```

If the date and time is separated, you may (if required) use a `+` to combine them:

```json
{
    "template": "Meeting start: {time:startDate+startTime}"
}
```

### 3. Eval (JavaScript Code)
Run your own code to dynamically display a certain value.

The passed JavaScript **must be a callable function.**

The first parameter is the event itself, and the second parameter is the config.

```json
{
    // You can pass custom values to both the config and the events
    "eval": "(event, config) => config.HidePersonalInfo? event.PatientReference: event.PatientName"
}
```

Because the evaluated code does not include any user input, the use of eval
should not induce a risk of code injection, granted that the developer verifies
that the JavaScript code passed is correct.

## Complete Example
```json
{
    // Config
    "resources": [
        {
            "id": "room6",
            "title": "Room 6"
        }
    ],

    "events": {
        "id": "abcd-efgh-ijkl-mnop",
        "resourceId": "room6",

        "start": "2024-11-19T07:00:00.000Z",
        "end": "2024-11-19T08:00:00.000Z",

        // Additional custom fields to be used in an event component
        "title": "Just Another Calendar",
        "sponsor": "Andreas Haandlykken"
    },

    "defaultEventComponent": "CustomEventComponent", // The component to use by default
    "eventComponents": [
        {
            "name": "CustomEventComponent",
            "fields": [
                {
                    "value": "title",
                    "icon": "mug", // Key reference to an icon in the 'icons' array (not defined here). Alternatively write the SVG code here.
                    "fullWidth": true, // Makes the field take up the full width of the event

                    "marginBottom": "12px" // If this is a number, it will count as pixels
                },

                {
                    "template": "- {sponsor}",

                    // Optional style object, identical structure to textStyles in config
                    "textStyle": {
                        "style": "italic"
                    }
                }
            ]
        }
    ]
}
```

Each field may include a [`_filter`](./_filter.md). Codeo uses this to dynamically display
patient names/references based on a boolean which decides if personal info may be shown or not,
making the solution highly GDPR-compliant.

**Tip:** If you have multiple types of events displayed at once, each component may include its
own [`_filter`](./_filter.md) that determines which events should use it. If an event matches more
than one component, the first match will be used.