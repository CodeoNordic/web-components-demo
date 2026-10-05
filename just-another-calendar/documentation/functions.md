# Callable Functions from FileMaker Pro
This is a list of all the callable functions in the calendar module. The purpose of all these functions is to prevent the need for a complete refresh of the module, improving performance, whilst also making the experience more seamless.

### init (config)
Initialise the calendar with one singular configuration object. (JSON)

Check the [init documentation](./init.md) for more information.

### setConfigValue(key, value, [type]) (alias: setConfigProp)
Change a specific value in the config. The key can be any of the values mentioned in the [configuration](./init.md#json-structure). This function should be used when changing e.g the `date` or `view` of the calendar.

The passed type is compatible with FileMaker's JSON-types, meaning you can pass E.G `JSONBoolean` to ensure that the passed value is parsed as a boolean.

```js
// Change the displayed date to November 19th 2024
setConfigValue('date', '2024-11-19'); // The European date format can also be passed here (19.11.2024)

// Change the FullCalendar view
setConfigValue('view', 'resourceTimeGridDay');

// Set 'eventResourceEditable' to false
setConfigValue('eventResourceEditable', 0, JSONBoolean); // JSONBoolean is naturally only available in FileMaker
```

### addEvents(events) (alias: addEvent)
Add one or more events to the calendar.

An optional [`_filter`](./_filter.md) can be added to specify a criteria
that other events must not match in order for the event to be added.

The event ID is checked by default, so you don't need to add a filter for this.

```js
// Add one event to the calendar
addEvents(
    JSON.stringify({
        id: "abcd-efgh-ijkl-mnop",
        start: "2024-11-19T07:00:00.000Z",
        end: "2024-11-19T08:00:00.000Z",

        // Additional fields not used by the calendar
        PatientName: "Joakim Isaksen"
    })
)

// Add two events
addEvents(
    JSON.stringify([
        {
            id: "abcd-efgh-ijkl-mnop",
            start: "2024-11-19T07:00:00.000Z",
            end: "2024-11-19T08:00:00.000Z",

            PatientName: "Joakim Isaksen"
        },

        {
            id: "ponm-lkji-hgfe-dcba",
            start: "2024-11-19T07:00:00.000Z",
            end: "2024-11-19T08:00:00.000Z",

            PatientName: "Andreas Haandlykken",

            // Only add this event if no other event has the 'PatientName' as 'Andreas Haandlykken'
            _filter: {
                PatientName: "Andreas Haandlykken"
            }
        }
    ])
)
```

### removeEvents(search, [limit])
Remove one or more events from the calendar, specified by one or more searches, with an optional limit on how many events can be removed at once.

- If a limit is not defined, the function will remove any event that matches the search.
- If a single string is passed, it is considered an event ID, and a limit of 1 will automatically be set.

```js
// Removes a specific event ID
removeEvents("abcd-efgh-ijkl-mnop");

// Removes any event where the 'dateStart' is before November 19th 2024
removeEvents(
    JSON.stringify({
        dateStart: "<2024-11-19"
    })
);

// Removes the events with the matching id's
removeEvents(
    JSON.stringify([
        "==abcd-efgh-ijkl-mnop",
        "==ponm-lkji-hgfe-dcba"
    ]),
    2
);

// Removes any event where the value 'FirstName' is either 'Joakim' or 'Vetle'
removeEvents(
    JSON.stringify([
        { FirstName: "==Joakim" },
        { FirstName: "==Vetle" }
    ])
)
```

### setEvents(events)
Overwrite the list of events.

Alternatively, you may use [`setConfigValue('events', ...)`](#setconfigvaluekey-value).

```js
// Overwrite with a list of events
setEvents(
    JSON.stringify([
        { id: "abcd-efgh-ijkl-mnop", /* ... */ },
        { id: "ponm-lkji-hgfe-dcba", /* ... */ }
    ])
);
```

### updateEvent(search, data, autocreate)
Update a specific event in the calendar, specified by a search, and the data to set. Optionally, a boolean can be passed to automatically create the event, in case it is not found in the list.

If the passed search is a string, it will be considered as the Event ID.

```js
// Update the event with the matching id, changing the time
updateEvent(
    "==abcd-efgh-ijkl-mnop",
    JSON.stringify({
        timeStart: "10:00",
        timeEnd: "11:30"
    })
);

// Update the event with the matching id, changing the tooltip
updateEvent(
    JSON.stringify({ id: "==abcd-efgh-ijkl-mnop" }),
    JSON.stringify({
        tooltip: "Updated tooltip"
    })
);
```

If the search returns more than one event, a warning will be logged to the console, and the change will not be performed.

**The entire event's JSON can be passed as the second parameter**, meaning that updating an event in the calendar is very simple.

### updateEventFilter(search, data)
Update a specific [event filter](./event-filters.md). Useful when you want to lock/unlock a filter.

The search parameter can be either the filter's index in the array (number), the event filter's ID (string),
or an object which matches one or more of the filter's values.

```js
// Lock the first event filter
updateEventFilter(0, JSON.stringify({ locked: true }));
```

### revert(id)
Revert/undo an action made in the web viewer, such as moving an event.

This method has limited functionality.

```js
// After moving an event
revert('abcd-efgh-ijkl-mnop'); // revert id sent to FileMaker
```

### scrollToTime(time)
Scroll the calendar view to a specific time.

```js
scrollToTime('16:00');
```

### getEvent(id)
This is only meant to be used in the browser devtools. It returns an event's object from the ID.