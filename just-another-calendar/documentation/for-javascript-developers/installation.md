# Installation (For JavaScript developers)
This document provides the instructions to installing and setting
up the development environment, in order to modify and test the source code.

## Prerequisites
- [FileMaker Pro](https://www.claris.com/filemaker) (19.0 or later)
- [Node.js](https://nodejs.org) or [Bun](https://bun.sh) (Node is likely more stable)
- [Visual Studio Code](https://code.visualstudio.com) (recommended)

## Installation (For JavaScript developers)
To set up the development environment:
1. Open a terminal in the [source-code](../source-code) directory. (same directory as [package.json](../source-code/package.json))
2. Run the following commands
```sh
npm install     # or bun install
npm start       # or bun start
```
3. The module should be available at [localhost:1234](http://localhost:1234) by default.
4. Copy paste the command from [testdata.js](./testdata.js) into the browser console to verify.