## v0.7.0
- **Breaking change:** Rename `toBEMClassNames` to `deepJoinBEMModifiers` and have it return an array instead of a string. Follow with `.join(' ')` to preserve previous functionality.

## v0.6.2
- Remove dependency on [`classnames`](https://www.npmjs.com/package/classnames) and [`truthy-keys`](https://www.npmjs.com/package/truthy-keys).

## v0.6.0
- Export `BEMModifiers`, `BEMModifier` and `BEMModifiersHash` types.

## v0.5.0
- Restore `resolveBEMModifiers` function as alias to `truthyStringsKeys`.
- Restore other previously-exported functions (`compact`, `flatten`, `identity`, `isArray`, `isString`, `uniq`).

## v0.4.0
- Defer `resolveBEMModifiers` to `truthyStringsKeys`.
- **Breaking change:** Remove exported `resolveBEMModifiers` function.

## v0.3.0
- Install [`truthy-keys`](https://www.npmjs.com/package/truthy-keys) dependency.
- **Breaking change:** Remove exported `keys` function.
