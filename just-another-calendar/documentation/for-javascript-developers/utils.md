# Utils
The project includes various useful functions that can be imported with the `@utils` alias.

Other smaller functions are also available, but are not significant enough to be included here.

Table of contents:
- [Utils](#utils)
  - [`calendarDates(date, firstDayOfWeek)`](#calendardatesdate-firstdayofweek)
  - [`capitalize(string)`](#capitalizestring)
  - [`clamp(number, min, max)`](#clampnumber-min-max)
  - [`combineClasses(...values)`](#combineclassesvalues)
  - [`calculateContrast(color, background, [minContrast])`](#calculatecontrastcolor-background-mincontrast)
  - [`createMethod(name, function)`](#createmethodname-function)
  - [`dateFromString(string)`](#datefromstringstring)
  - [`datesFromEvent(event)`](#datesfromeventevent)
  - [`dateToObject(date)`](#datetoobjectdate)
  - [`fetchFromFilemaker(key, [param], [timeoutInMs], [option])`](#fetchfromfilemakerkey-param-timeoutinms-option)
  - [`filemakerFindEquivalent(string, find)`](#filemakerfindequivalentstring-find)
  - [`getEventsFromObject(object)`](#geteventsfromobjectobject)
  - [`getFieldValue(event, field)`](#getfieldvalueevent-field)
  - [`isDevMode()`](#isdevmode)
  - [`performScript(key, [param], [option])`](#performscriptkey-param-option)
  - [`searchArray(array, search)`](#searcharrayarray-search)
  - [`searchObject(object, search)`](#searchobjectobject-search)

## `calendarDates(date, firstDayOfWeek)`
Returns a list of dates to display for a date picker, based on the passed date
and the first day of the week. Creates a selection identical to the Windows calendar.

The `firstDayOfWeek` argument can be either the name of a weekday given in English (mon, tue, etc,)
But it can also be an index number, where 0 = sunday, 1 = monday, etc.

Returns three arrays of dates: `start`, `middle` and `end`.
The start and end dates are dates from the previous and next month, used to fill in the blank spaces
of the date picker, to ensure a perfect square of dates.

```ts
import calendarDates from '@utils/calendarDates';

const dates = calendarDates(new Date('2024-11-19'), 'mon');

console.log(dates.start); // [Mon Oct 28, Tue Oct 29, Wed Oct 30, Thu Oct 31]
console.log(dates.middle); // [Fri Nov 1, Sat Nov 2, ..., Fri Nov 29, Sat Nov 30]
console.log(dates.end); // [Sun Dec 1]
```

## `capitalize(string)`
Capitalizes the first letter of each word in a string.

```ts
import capitalize from '@utils/capitalize';

capitalize('hello world'); // 'Hello World'
```

## `clamp(number, min, max)`
Constrains a number to be within the minimum and maximum range.

- If the number is less than the minimum, the minimum value is returned.
- If the number is greater than the maximum, the maximum value is returned.

```ts
import clamp from '@utils/clamp';

const number = 25;
const min = 0;
const max = 10;

clamp(number, min, max); // 10
```

## `combineClasses(...values)`
Combines all string parameters sent into one string. Used for CSS classes.

Any value passed that is NOT a string will be ignored.

```ts
import combineClasses from '@utils/combineClasses';

const useExtraClass = false;
const result = combineClasses('jac-wrapper', useExtraClass && 'extra-class','just-another-calendar');

console.log(result); // 'jac-wrapper just-another-calendar'
```

## `calculateContrast(color, background, [minContrast])`
Returns a boolean value based on the contrast of the color and background color.
Used for automatic color adjustment.

An optional value for the minimum required contrast can be passed here, in the
form of a number.

```ts
import calculateContrast from '@utils/contrast';

calculateContrast('#000', '#fff'); // true
calculateContrast('rgb(0, 0, 0)', '#000'); // false
```

## `createMethod(name, function)`
Makes the passed function available to be used by FileMaker, with the given function name.

This function is useful, because it will automatically try to parse valid JSON data.

```ts
import createMethod from '@utils/createMethod';

createMethod('helloworld', (message) => {
    console.log('helloworld message: ' + message);
});
```

This example means that you can run `helloworld` using the `[Perform JavaScript In Web Viewer]` script step.

## `dateFromString(string)`
Parses a string into a JavaScript Date Object.

The function parses most date formats, and automatically converts dashes `-` into slashes `/`, as Safari
appears to not parse the date properly when dashes are used.

It will also automatically parse European date formats, which normally doesn't get parsed properly in JavaScript.

```ts
import dateFromString from '@utils/dateFromString';

dateFromString('19.11.2024'); // 19 Nov 2024
```

## `datesFromEvent(event)`
Returns the start and end dates of an event, including the event's time if available.

```ts
import datesFromEvent from '@utils/datesFromEvent';

const event = {
    id: 'abcd-efgh-ijkl-mnop',

    dateStart: '2024-11-19',
    dateEnd: '2024-11-19',

    timeStart: '09:00',
    timeEnd: '10:00'
};

datesFromEvent(event); // { start: 19 Nov 2024 09:00:00 GMT+0100, end: 19 Nov 2024 10:00:00 GMT+0100 }
```

## `dateToObject(date)`
Returns an object containing various formats of the passed date. Used when sending a date to FileMaker
to ensure a proper developer experience.

```ts
import dateToObject from '@utils/dateToObject';

const result = dateToObject('2024-11-19T08:00:00.000Z'); // ISO Timestamp

console.log(result.year); // 2024
console.log(result.month); // 11
console.log(result.day); // 19
console.log(result.iso); // '2024-11-19T08:00:00.000Z'
console.log(result.unix); // 1732003200
console.log(result.utc); // 'Tue, 19 Nov 2024 08:00:00 GMT'
```

## `fetchFromFilemaker(key, [param], [timeoutInMs], [option])`
A smart solution to fetch data from FileMaker. Returns a promise.

This function requires that the `onJsRequest` script key is defined in the config, as
this script will run when the `fetchFromFilemaker` function is called.

It also requires an additional script key in the config for the script you wish to call.

The `onJsRequest` script should be able to run the requested script, along with the
passed parameter, then use the `[Perform JavaScript In Web Viewer]` step to call the
`onScriptResult` function. This function uses a `uuid` system, to prevent depending
on order of operations. As such, the first parameter passed to this function, should
be the uuid of the request, and the second parameter should be the result itself.

The following parameters are passed to the `onJsRequest` script in JSON:
- scriptName `string` - The name of the script to run
- scriptParameter `any` - The script parameter to pass
- uuid `string` - The uuid to pass to the `onScriptResult` function

```ts
import fetchFromFilemaker from '@utils/fetchFromFilemaker';

fetchFromFilemaker('getExampleData', { exampleValue: 10 }, 10000) // 10 second timeout (30 seconds by default if none is passed)
    .then(data => {
        console.log(data);
    });
```

## `filemakerFindEquivalent(string, find)`
Returns a boolean if the passed string passes criteria of the find string.

This function is not a perfect equivalent, but aims at providing close to identical functionality.

```ts
import filemakerFindEquivalent from '@utils/filemakerFindEquivalent';

const string = 'Hello World, this is a string!';
const date = '2024-19-11';

filemakerFindEquivalent(string, 'this'); // true
filemakerFindEquivalent(string, '==this'); // false

filemakerFindEquivalent(date, '<2024-19-10'); // false
filemakerFindEquivalent(date, '<=10.19.2024'); // true
filemakerFindEquivalent(date, '>2024-19-12'); // false
```

## `getEventsFromObject(object)`
Attempts to convert an object that contains events into an array of events.
Primarily used to dynamically get the events, even if E.G an entire data API result is passed.

## `getFieldValue(event, field)`
Parses the JAC [field definition](../event-components.md#field-definition) based on the passed event.

```ts
import getFieldValue from '@utils/getFieldValue';

const event = {
    id: 'abcd-efgh-ijkl-mnop',

    start: '2024-19-11T07:00:00.000Z',
    end: '2024-19-11T08:00:00.000Z',

    CustomValue: 'Hello World!'
};

const field = {
    template: 'Custom Value: {CustomValue}'
};

getFieldValue(event, field); // 'Custom Value: Hello World!'
```

## `isDevMode()`
Returns a boolean based on whether the web viewer is hosted at localhost or not.

```ts
import isDevMode from '@utils/isDevMode';

isDevMode(); // true
```

## `performScript(key, [param], [option])`
Performs a FileMaker script, using a [scriptName](../script-names.md) from the config.

Automatically stringifies JSON data passed in the script parameter.

You can also pass an `option` to run a script with. (number)

```ts
import performScript from '@utils/performScript';

// After config has loaded
performScript('poll');
```

## `searchArray(array, search)`
Filters the passed array based on the string or object search passed.

- If a string search is passed, it will use [`filemakerFindEquivalent`](#filemakerfindequivalentstring-find).
- If an object is passed, it will have the same functionality as [`_filter`](../_filter.md).

## `searchObject(object, search)`
Returns a boolean if the passed object fulfills the criteria of the search.
Used in [`searchArray`](#searcharrayarray-search).

- If a string search is passed, it will use [`filemakerFindEquivalent`](#filemakerfindequivalentstring-find).
- If an object is passed, it will have the same functionality as [`_filter`](../_filter.md).