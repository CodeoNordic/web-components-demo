# Script Names
This module uses various key names for scripts, and in order to
map the right script to the right event, this object must be defined.

The following example uses Codeo's script name format:
```json
{
    "scriptNames": {
        "onJsError": "[TRG] = JavaScript Error", // Runs when an unhandled JS error occurs

        "onEventClick": "[TRG] = EVNT Edit", // Runs when an event is clicked
        "onRangeSelected": "[TRG] = EVNT Create", // Runs when a time/date range is selected in the calendar. Codeo uses this for event creation.
        "onEventCreated": "[TRG] = EVNT Create Popup", // Runs when an event is created wither with the built-in popup or by dragging a template

        "onSearch": "[TRG] = EVNT Search", // Runs when a search is performed
        "onDynamicSearch": "[TRG] = EVNT Dynamic Search", //

        "dateSelected": "[TRG] = Date Select", // Runs when a date is clicked in the side-menu's date picker.

        "onEventChange": "[TRG] = EVNT Change", // Runs when an event changes, E.G dragged to another time range
        "onEventFilterChange": "[TRG] = Filter Change", // Runs when an event filter is clicked

        "poll": "[TRG] = Poll Changes", // Runs multiple times depending on the polling values set in the config

        "onSideMenuOpened": "[TRG] = SideMenu Opened", // Runs when the side menu is opened
        "onSideMenuClosed": "[TRG] = SideMenu Closed", // Runs when the side menu is closed

        "onEventFilterAreaOpened": "[TRG] = EVNT Filter Area Opened", // Runs when an event filter area is opened
        "onEventFilterAreaClosed": "[TRG] = EVNT Filter Area Closed", // Runs when an event filter area is closed

        "onEventTemplateAreaOpened": "[TRG] = EVNT Template Area Opened", // Runs when an event template area is opened
        "onEventTemplateAreaClosed": "[TRG] = EVNT Template Area Closed" // Runs when an event template area is closed
    }
}
```