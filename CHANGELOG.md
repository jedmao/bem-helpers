## v1.0.0
- **Breaking:** Remove support for deeply nested modifiers (decided this limitation was actually a good thing).
  - Removed `resolveBEMModifiers`
  - Removed `deepJoinBEMModifiers`
- **Breaking:** Changed modifiers argument to receive an object hash instead of a string array.
  - before: `joinBEMModifiers('foo__bar', ['baz', 'qux']);`
  - after: `joinBEMModifiers('foo__bar', { baz: true, qux: true });`
- **Breaking:** No longer exporting `BEMModifier` and `BEMModifiersHash` interfaces. Instead, use the new `BEMModifiers` interface, which represents a shallow hash object.

## v0.9.1
- Disable sourcemaps for distribution.
- Fix tslint.

## v0.9.0
- Clean up dependencies.
- Export options interfaces.
- **Breaking change:** Stop exporting helper functions from `truthy-strings-keys` (`compact`, `flatten`, `identity`, `isArray`, `isString`, `uniq`). Sorry to be wishy washy about this one, but you should probably just import `truthy-strings-keys` directly if you want access to them.

## v0.8.1
- Update docs.

## v0.8.0
- Add `separator` option to `deepJoinBEMModifiers`.
- Add more jsdoc comments.

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
