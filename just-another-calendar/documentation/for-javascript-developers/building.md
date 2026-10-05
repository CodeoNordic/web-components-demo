# Building the HTML-file
The built version of the module must be one singular HTML-file in order to work with the intended workflow. [Jump to instructions](#ensuring-a-single-html-file-output)

## Creating the distribution version
Create a distribution version by running the following command:
```sh
npm run build   # or bun run b:build
```

The terminal should print out something similar to the following:
```sh
> npm run build

> build
> rimraf .parcel-cache dist && parcel build --no-cache --no-scope-hoist

✨ Built in 6.40s

dist\index.html    701.71 KB    2.08s
```

If the result prints out more than just the `dist\index.html` file, the result contains more than a single file, meaning the intended workflow will not work, such as:

```sh
> npm run build

> build
> rimraf .parcel-cache dist && parcel build --no-cache --no-scope-hoist

✨ Built in 6.40s

dist\index.html                 701.71 KB    2.08s
dist\codeo_logo.27960b70.png    13.14  KB    262ms    # <-  Additional file, will not work
```

## Ensuring a single HTML-file output
To make sure the module can be loaded as efficiently as possible, the distribution file should be only one HTML-file, meaning no additional JavaScript, CSS or even image-files.

Parcel includes a smart feature to parse various types of files into text formats that can be encoded into the HTML, such as base64 for images. This feature is called [Transformers](https://parceljs.org/plugin-system/transformer).

By default, this module comes with parsing for images and SVG-icons.
```tsx
// Import the Codeo logo
import codeoLogo from 'data-url:@assets/png/codeo-logo.png'; // Requires a png in 'src/assets/png'

// Import a calendar SVG-icon
import CalendarIcon from 'jsx:@assets/svg/calendar.svg' // Requires an svg in 'src/assets/svg'

const Example = () => {
    return <div>
        <img src={codeoLogo} width="100" height="100" />
        
        <CalendarIcon width="100" height="100" />
    </div>
}

export default Example;
```
In this example, the `data-url:` prefix transforms the png-file into base64, while the `jsx:` prefix will convert the svg into a React-component for easy use, which will return an `<svg>` element.

The `data-url:` will by default also support jpg-files. Check the [.parcelrc](../source-code/.parcelrc) configuration.