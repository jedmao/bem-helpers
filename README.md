# bem-helpers

[![NPM version](http://img.shields.io/npm/v/bem-helpers.svg?style=flat)](https://www.npmjs.org/package/bem-helpers)
[![npm license](http://img.shields.io/npm/l/bem-helpers.svg?style=flat-square)](https://www.npmjs.org/package/bem-helpers)
[![Travis Build Status](https://img.shields.io/travis/jedmao/bem-helpers.svg)](https://travis-ci.org/jedmao/bem-helpers)
[![codecov](https://codecov.io/gh/jedmao/bem-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/bem-helpers)
[![Dependency Status](https://gemnasium.com/badges/github.com/jedmao/bem-helpers.svg)](https://gemnasium.com/github.com/jedmao/bem-helpers)

[![npm](https://nodei.co/npm/bem-helpers.svg?downloads=true)](https://nodei.co/npm/bem-helpers/)

BEM helper functions for resolving and joining blocks to elements and modifiers.

## Introduction

What is BEM? See [MindBEMding – getting your head ’round BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
for a primer.

These BEM helper functions help you to join block names to elements and any
number of modifiers. Modifers can be a deeply nested structure of strings,
arrays of strings or objects where the keys are the modifier names and the
values determine whether the modifier name is activated or not.

Why would you want to do this? You might want to build tools to translate
custom HTML BEM properties into actual class names. These helpers make no
assumptions about what frameworks you might be using and has only one hard
dependency on [`classnames`](https://www.npmjs.com/package/classnames). This
means it shouldn't kill your footprint.

## Installation

```
$ npm install bem-helpers
```

## Usage

### `joinBEMElement`

Joins a BEM block to an element.

```ts
joinBEMElement('foo', 'bar');
// "foo__bar"

joinBEMElement('foo', 'bar', '__custom__');
// "foo__custom__bar"
```

### `joinBEMModifiers`

Joins a BEM block or element to any number of modifiers.

```ts
joinBEMModifiers('foo__bar', ['baz', 'qux']);
// "foo__bar foo__bar--baz foo__bar--qux"

joinBEMModifiers('foo', ['bar'], '--custom--');
// foo foo--custom--bar
```

### `resolveBEMModifiers`

Resolves a simple string or a potentially deeply nested structure of modifier
values into a simple string array.

```ts
resolveBEMModifiers([
	'foo', [
		{
			bar: true,
			baz: null,
		},
	],
	'qux',
	[
		[
			[
				{
					corge: undefined,
					garpley: -1,
				},
			],
		],
	],
]);
// ["foo", "bar", "qux", "garpley"]
```

### `toBEMClassNames`

```ts
toBEMClassNames(
	'foo',
	[
		'bar',
		[
			{
				baz: true,
			},
		],
	],
	'qux',
);
// "foo foo--bar foo--baz qux"
```

See [the tests](https://github.com/jedmao/bem-helpers/blob/master/src/index.test.ts)
for more examples.
