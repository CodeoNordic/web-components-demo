# Typescript
This project uses TypeScript to improve debugging and type-safety.

- Type definitions are created in the [types](../../source-code/src/types) folder.
- All types related to "Just Another Calendar" is under the JAC namespace.

To ignore type checks, you may add the following line at the top of a `.ts` file:
```ts
// @ts-nocheck
```

## Creating new types
To make a type definition globally available in the project, a `.d.ts` file must be made,
and types must be inside a `declare global` statement.

Type definition files must also have an `export` statement at the end. Exporting an empty
object suffices here.

```ts
declare global {
    namespace JAC {
        interface YourCustomType {
            value: string
        }
    }
}

export {}
```