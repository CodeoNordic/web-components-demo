# Initialising the Web Viewer in FileMaker Pro
**Make sure you've followed the steps for [uploading the HTML to FileMaker](./uploading-to-filemaker.md).**

---

Setting up the web viewer can be done in three simple steps:

1. Fetch the HTML-code, for instance through a text field in a record
2. Use the `[Set Web Viewer]` step, and set the URL to the source code
3. Use the `[Perform JavaScript In Web Viewer]` step, calling the [init function](./init.md) function with the [JSON-configuration](./init.md#json-structure)

Upon loading the HTML-code itself, the web viewer will be blank until the configuration has been passed using the [init function](./init.md) in step 3.

---

The module has several functions designed to prevent the need for a full refresh. Check the [function list](./functions.md) for more information on this.