# Import Aliasing
To simplify the importing of reusable components, functions and values,
this project uses import aliasing, which is defined in [tsconfig.json](../../source-code/tsconfig.json).

For instance, the [performScript](../../source-code/src/utils/performScript.ts) util can be imported as such:
```ts
import performScript from '@utils/performScript';
```