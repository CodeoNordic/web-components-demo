# Event Filters
In a calendar with a lot of events, it may be difficult to find what you
are looking for. Event filters allow the user to only display the events
they want, based on developer-defined criteria.

Each filter requires criteria for which events should be affected by it.

> If an event isn't included in any filter, it will still be shown.

Each time a filter is clicked, the filter will use one of the following values to determine if an event is included in the filter:
- `script` - Runs a FileMaker script. Falls back to the `onEventFilterChange` script, if defined in [`scriptNames`](./script-names.md)
- `id` - ID of the filter. Checks an event's `filterId` field, which can be a string, or an array of strings
- `eval` - JavaScript code which returns a boolean determining whether or not an event is included in the filter
- `_filter` - [`_filter`](./_filter.md) object determining whether or not an event is included in the filter

Filters can also have an `enabled` value. This value tells
the calendar whether or not the filter is currently switched on. (defaults to true)

A `locked` value controls whether or not the user can turn this filter on/off,
indicated by a padlock icon for locked filters. This can be used to temporarily
or permanently disable the user's access to control the filters, E.G whenever
changes are being made, or the calendar is fetching data.

The filters can also have a `sort` value. This controls the order that the filters appear, with the lowest numbers being placed first,
and the highest at the end. Filters without a sort value will be placed at the bottom. 

To organize filters, you may also pass an empty object with a `divider` boolean value. This will render a dividing line, separating
the filters above and below. If a filter includes this value, the divider will be placed above.

## Client-only filters
For filters that should be handled in the browser, a [`_filter`](./_filter.md) value should be passed to specify which events
should be affected by the filter. An event will be displayed if any of the currently
enabled filters' criteria are fulfilled.

> If you are using the [`filterId`](#filtering-by-pre-determining-the-filter-id-optional) value,
a [`_filter`](./_filter.md) value is not needed, but passing it will still work.

In very specific cases, you may want to combine this with calls to a FileMaker script.
The way this works is that the client filter will run simultaneously whilst calling the
FileMaker script.

```json
{
    // Config
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "YourCustomEventType": "meeting"
        },

        {
            "id": "ponm-lkji-hgfe-dcba",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "YourCustomEventType": "consulting"
        }
    ],

    "eventFilters": [
        // "Client only" filter
        {
            "id": "filter1",
            "title": "Meeting",

            "color": "#aaeeaa",

            "enabled": true,
            "locked": false,

            "_filter": {
                "YourCustomEventType": "==meeting"
            }
        },

        // Runs a FileMaker script when clicked
        {
            "id": "filter2",
            "title": "Consulting",

            "color": "#4499cc",

            "enabled": true,
            "locked": false,

            "script": "[TRG] = Enable/Disable Consulting"
        }
    ]
}
```

### Linking two or more filters
Filters may include the `linkedTo` value. If this is set to another filter's ID, the filter may
be turned on/off in sync with the target filter. This is useful for improving UX, where a main
category and subcategory affect the same event, and you do not wish to use the `groupedAll` behavior.
```json
{
    "eventFilters": [
        {
            "id": "filter1",
            "title": "Meeting",

            "color": "#aaeeaa",

            "enabled": true,
            "locked": false,

            "_filter": {
                "YourCustomEventType": "==meeting"
            }
        },

        {
            "id": "filter2",
            "title": "Consulting",
            "linkedTo": "filter1", // enable/disable in sync with filter1

            "color": "#4499cc",

            "enabled": true,
            "locked": false,

            "_filter": {
                "YourCustomEventType": "==boardMeeting"
            }
        }
    ]
}
```

## Filtering by pre-determining the filter ID (optional)
Each event can have a `filterId` value. This can be either a string or an array which specifies
which filters the event is controlled by. The purpose of doing this, is that it eliminates the
need for complex [`_filter`](./_filter.md) objects.

---

In the following example, the first event will be hidden if `filter1` is disabled, whilst
the second event will be hidden only when both filters are disabled.

```json
{
    // Config
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "filterId": "filter1" // Can also be an array, E.G ["filter1"]
        },

        {
            "id": "ponm-lkji-hgfe-dcba",

            "start": "2024-11-19T07:00:00.000Z",
            "end": "2024-11-19T08:00:00.000Z",

            "filterId": ["filter1", "filter2"]
        }
    ],

    "eventFilters": [
        // Client-only
        {
            "id": "filter1",
            "title": "Filter 1",
            "color": "#aaeeaa",

            "clientOnly": true
        },

        // Not client-only, will run a FileMaker script
        {
            "id": "filter2",
            "title": "Filter 2",
            "color": "#4499cc",

            "script": "[TRG] = Enable/Disable Filter2"
        }
    ]
}
```

## Using a FileMaker Script to handle filters
If the handling of an event filter is complex, you may want to use a FileMaker Script instead.
This script should update the [`events`](./init.md#events-array) array.

As mentioned before, each filter can have an associated `script` value. This script will be ran
when the filter is clicked. Otherwise, the scriptName `onEventFilterChange` will be used.

For both of these scripts, the filter itself will be passed as a parameter, with the `enabled`
value being changed to the desired state, E.G if the user clicks to turn the filter off, the
value will be `false`.

**Note:** if you define a script to be ran when a filter changes, you must control the filter's state
in your FileMaker script. When a filter is clicked, its state will not change in the web viewer until
you've used the [`updateEventFilter`](./functions.md#updateeventfiltersearch-data) function.

```json
{
    "eventFilters": [
        // Runs "[TRG] = Filter 1 Change"
        {
            "title": "Filter 1",
            "color": "#aaeeaa",
            "script": "[TRG] = Filter 1 Change"
        },

        // Runs "[TRG] = EVNT Filter Change"
        {
            "title": "Filter 2",
            "color": "#4499cc"
        }
    ],

    "scriptNames": {
        "onEventFilterChange": "[TRG] = EVNT Filter Change"
    }
}
```

---

## Grouping event filters into areas
If you have many filters of varying categories, you may group these by specifying an `areaName` per filter.
These areas must already be defined in the [config](./init.md#eventfilterareas-array).

> If no event filter areas are specified, a default one will be created with the name "Filters", unless
the `eventFiltersHeader` translation is defined in the [`translations`](./init.md#translations-object) object.

By default, the filters will be ordered depending on their placement in the array, but this can be overwritten
by specifying a `sort` number for one or more filters.

```json
{
    "eventFilterAreas": [
        {
            "id": "meeting",
            "title": "Meeting",
            "open": true
        },

        {
            "id": "consulting",
            "title": "Consulting",
            "open": false
        }
    ],

    "eventFilters": [
        {
            "id": "filter1",
            "title": "Urgent Meetings",
            "color": "#ff4444",
            "enabled": true,

            "areaName": "meeting"
        },

        {
            "id": "filter2",
            "title": "Daily Meetings",
            "color": "#8888ff",
            "enabled": false,

            "areaName": "meeting"
        },

        {
            "id": "filter3",
            "title": "Customer Consulting",
            "color": "#aaff88",
            "enabled": true,
            
            "areaName": "consulting"
        },

        {
            "id": "filter4",
            "title": "Partner Consulting",
            "color": "#ffdd88",
            "enabled": true,

            "areaName": "consulting",
            "sort": 1 // Will be ordered before "Customer Consulting"
        }
    ]
}
```

## Altering the behavior of filters
In certain situations, you want your filters to behave differently. This value is
controlled by the `eventFilterBehavior` value in the config.

The calendar has four behavioral patterns that event filters can follow:

### 1. `any`
If ANY filter affecting an event is enabled, the event will be shown.
This is the least strict behavior.

### 2. `all`
ALL filters affecting an event MUST be enabled, otherwise the event will be hidden.
This is the most strict behavior.

### 3+4. `groupedAny` and `groupedAll`
These behaviors are related to [filter areas](#grouping-event-filters-into-areas).

- With the `groupedAny` behavior, at least ONE filter affecting the event must be enabled in EACH area
- With the `groupedAll` behavior, ALL filters in one or more areas must be enabled, excluding filters that don't affect the event

**The default behavior is `groupedAny`**

## Programmatically updating a filter
There are two main methods of updating a filter:
1. Setting the entire filter list using [`setConfigValue('eventFilters', ...)`](./functions.md#setconfigvaluekey-value-alias-setconfigprop)
2. Updating a specific filter using [`updateEventFilter(...)`]

The most optimal method is to use `updateEventFilter`, as it only changes a single object.

To find said filter, a search must be passed as the first function parameter. If the target
filter has an ID, pass this as a string. Otherwise, you may pass the filter's array index.

```js
// Disable the event filter with the ID 'filter1'
updateEventFilter('filter1', JSON.stringify({ enabled: false }));

// Lock the first event filter
updateEventFilter(0, JSON.stringify({ locked: true }));
```