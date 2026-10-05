# Uploading to FileMaker Pro
**Make sure you've followed the steps for [building the module](./for-javascript-developers/building.md).**

---

[widget.json](../source-code/widget.json) is by default configured to run a script named "UploadHTML" on the
currently selected FileMaker file. The [demo file](../Demo.fmp12) includes an example on how this script can be set up.

**Make sure you have [NodeJS](https://nodejs.org/en/download) installed. (check by running `node -v` and `npm -v`)**

To upload the module, open a terminal in the same directory as [upload.js](../upload.js) directory, and run the following commands:
```sh
npm i open@8.2.1    # 'open' from NPM is used for the fmp protocol
node upload.js
```

---

To make the HTML-file easy to access from FileMaker, it should be written to a text field in a record.
Ideally, each module should have its own name, to prevent confusion, while also granting functionality to store
multiple types of modules in the same FileMaker table.

> The advantage of being able to store the HTML-code in FileMaker, is that the module can be loaded incredibly fast, even without internet access!

### Script parameters (JSON) sent during upload:
- `name: JSONString` - The name of the web component
- `filePath: JSONString` - The location of the HTML-file (parsed using node.js `path`)