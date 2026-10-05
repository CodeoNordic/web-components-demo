# Searching
Searching can be done in four ways, all using search fields. They are `searchBy`, `eval`, `script` and `dynamicDropdown`

- `searchBy` -  A list of values to use from an event when searching. Used for simple filtering like names, descriptions, etc.
- `eval` - A JS function to check if an event matches the search. Used for more advanced search filtering.
- `script` - A script name for a script to run when searching, can be used either to filter with the search yourself in FileMaker, or in adittion to the other fields.
- `dynamicDropdown` - A more advanced type of searching, using dropdowns and events as search results, more about it below. 

Search fields can either be client side, or call a script that should update the event list.
If a search field does not have either `searchBy`, `eval`, or `script`,
it will not be included in the list, and a warning will be issued to the console.

```json
{
    "events": [
        {
            "id": "abcd-efgh-ijkl-mnop",

            "Title": "Just Another Calendar",
            "Sponsor": "Andreas Haandlykken"
        }
    ],

    "searchFields": [
        {
            "searchBy": ["YourCustomName"], 

            "title": "Search by Name", // Optional text displayed above the search field, area is not collapsible if this field is empty
            "placeholder": "Type a name...", // Placeholder text shown when the field is empty

            "open": false, // Whether or not the area should be opened by default
            "value": "", // The current search value, not required

            "script": "[TRG] = EVNT Search", // Optional script to run when searching
            "sort": 3 // the order the area appears in the side menu
        },
        {
            "eval": "(input, event, config) => event.Title.toLowerCase() === input.toLowerCase()", // JS function to check if an event matches the search

            "title": "Search by title",
            "placeholder": "Type a title...",

            "open": true,
            "sort": 7
        }
    ]
}
```

## Dynamic Dropdown

If you use the `dynamicDropdown` field, you also need to define a `script` field, which will be run when the user searches. This script should return a list of `SearchResult` objects, which will be displayed in the dropdown, and can be clicked to either run a `script`, or get another list of `SearchResult` objects from said script. 

Example of a dynamic dropdown search field:
```json
{
    "searchFields": [
        {
            "dynamicDropdown": true, // This field will be a dynamic dropdown
            "script": "[TRG] = EVNT Dynamic Search", // Script to run when searching, required

            // Optional fields
            "title": "Search by Name", 
            "placeholder": "Type a name...",

            "noResults": "No results found", // Text displayed when no results are found
            "emptyScript": "[TRG] = EVNT Empty Search", // Script to run when the search field is emptied
            
            "open": false,
            "sort": 3
        }
    ]
}
```

Example of a script that returns a list of `SearchResult` objects, that when clicked runs a script to fetch more `SearchResult` objects:
```json
{
    "searchResults": [
        {
            "title": "Andreas Haandlykken", // Text displayed for the result, can be an array of strings
            "script": "[TRG] = EVNT Search", // Script to run when the result is clicked
            "id": "abcd-efgh-ijkl-mnop", // ID to send to the script
            "dynamicDropdown": true // if this is set to true, it will try to fetch more results when clicked. if not set or set to false, it will just run the script
        }
    ]
}
```

Example of a script that returns a list of `SearchResult` objects, that are displayed as events (you cannot mix events and search results in the same list):
```json
{
    "searchResults": [
        {
            "event": { // Event to display instead of the title
                "id": "abcd-efgh-ijkl-mnop",
                "Title": "Just Another Calendar",
                "Sponsor": "Andreas Haandlykken"
            },
            "eventEdit": "[TRG] = EVNT Edit", // Script for editing the event when clicking a button
            "eventShow": "[TRG] = EVNT Show", // Script for showing the event in the calendar when clicking a button
            "id": "abcd-efgh-ijkl-mnop"
        }
    ]
}
```