# bem-helpers

[![NPM version](http://img.shields.io/npm/v/bem-helpers.svg?style=flat)](https://www.npmjs.org/package/bem-helpers)
[![npm license](http://img.shields.io/npm/l/bem-helpers.svg?style=flat-square)](https://www.npmjs.org/package/bem-helpers)
[![Travis Build Status](https://img.shields.io/travis/jedmao/bem-helpers.svg)](https://travis-ci.org/jedmao/bem-helpers)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/bem-helpers.svg)](https://gemnasium.com/github.com/jedmao/bem-helpers)

[![npm](https://nodei.co/npm/bem-helpers.svg?downloads=true)](https://nodei.co/npm/bem-helpers/)

BEM helper functions for resolving and joining blocks to elements,
blocks to modifiers and elements to modifiers.

## Introduction

What is BEM? See [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
for a primer.

These BEM helper functions help you to join block names to elements and any
number of modifiers. Modifers are defined as objects where the keys are the
modifier names and the values determine whether the modifier name is activated
or not.

## Installation

```
$ npm install bem-helpers
```

## `BEMBlock( blockName [, options] )`

Returns a function that can be used to construct BEM class names. For example,
in React, you might have a component that supports a dark theme as well as
an expandable content area. This could be achieved like so:

```jsx
const b = BEMBlock('section')
export const Section = ({ heading, isDark, isExpanded, children }) => (
  <section className={b({ dark: isDark })}>
    <h1 className={b('heading')}>
      {heading}
    </h1>
    <div className={b('body', { expanded: isExpanded })}>
      {children}
    </div>
  </section>
)
```

If `isDark` and `isExpanded` props were both truthy, the result would be the
following HTML:

```html
<section class="section section--dark">
  <h1 class="section__heading">
    Heading
  </h1>
  <div class="section__body section__body--expanded">
    children
  </div>
</section>
```

Of course, if `isDark` and `isExpanded` were false, no `--dark` or `--expanded`
modifiers would be constructed for them.

### options

If you want more control over the separators that are used to construct BEM
selectors, the following options are available to you:

#### `elementSeparator`

A string that stands between the block and element names (i.e., the `__` in
`foo__bar`). The default value is `__`.

#### `modifierSeparator`

A string that separates a block or element from a modifier (i.e., the `--` in
`foo--bar` or `foo__bar--baz`). The default value is `--`.

## `joinBEMElement( block, element [, separator] )`

Joins a BEM block to an element.

```ts
joinBEMElement('foo', 'bar');
// "foo__bar"

joinBEMElement('foo', 'bar', '__custom__');
// "foo__custom__bar"
```

## `joinBEMModifiers( blockOrElement, modifiers [, separator] )`

Joins a BEM block or element to any number of modifiers.

```ts
joinBEMModifiers('foo__bar', { baz: true, qux: true });
// "foo__bar foo__bar--baz foo__bar--qux"

joinBEMModifiers('foo', { bar: true }, '--custom--');
// foo foo--custom--bar
```

See [the tests](https://github.com/jedmao/bem-helpers/blob/master/src/index.test.ts)
for more examples.

## Testing

Run the following command:

```
$ npm test
```

This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

### Watching

For much faster development cycles, run the following commands in 2 separate processes:

```
$ npm run build:watch
```

Compiles TypeScript source into the `./dist` folder and watches for changes.

```
$ npm run watch
```

Runs the tests in the `./dist` folder and watches for changes.
