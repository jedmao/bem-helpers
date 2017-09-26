import test from 'ava'

import {
	joinBEMElement,
	joinBEMModifiers,
	resolveBEMModifiers,
	toBEMClassNames,
} from './'

test('joinBEMElement throws if no block is provided', t => {
	t.throws(
		() => {
			// tslint:disable-next-line:no-any
			joinBEMElement(undefined as any, undefined as any)
		},
		'Required BEM block is missing or empty',
	)
})

test('joinBEMElement throws if no element is provided', t => {
	t.throws(
		() => {
			// tslint:disable-next-line:no-any
			joinBEMElement('block', undefined as any)
		},
		'Required BEM element is missing or empty',
	)
})

test('joinBEMElement joins a block to an element with "__" by default', t => {
	t.is(
		joinBEMElement('block', 'element'),
		'block__element',
	)
})

test('joinBEMElement joins a block to an element with a custom separator', t => {
	t.is(
		joinBEMElement('block', 'element', '__custom__'),
		'block__custom__element',
	)
})

test('joinBEMModifiers joins with "--" by default', t => {
	t.deepEqual(
		joinBEMModifiers('foo', ['bar']),
		['foo', 'foo--bar'],
	)
})

test('joinBEMModifiers joins with a custom separator', t => {
	t.deepEqual(
		joinBEMModifiers('foo', ['bar'], '--custom--'),
		['foo', 'foo--custom--bar'],
	)
})

test('joinBEMModifiers joins two modifiers to the same block or element', t => {
	t.deepEqual(
		joinBEMModifiers('foo', ['bar', 'baz']),
		['foo', 'foo--bar', 'foo--baz'],
	)
})

test('resolveBEMModifiers returns an empty array by default', t => {
	t.deepEqual(
		resolveBEMModifiers(),
		[],
	)
})

test('resolveBEMModifiers returns input string wrapped in an array', t => {
	t.deepEqual(
		resolveBEMModifiers('foo'),
		['foo'],
	)
})

test('resolveBEMModifiers splits input string by multiple spaces and newlines', t => {
	t.deepEqual(
		resolveBEMModifiers(' \n  foo \r\n  bar   '),
		['foo', 'bar'],
	)
})

test('resolveBEMModifiers returns a flat array from a nested string array', t => {
	t.deepEqual(
		resolveBEMModifiers([
			'foo',
			['bar', [
				'baz', [
					'qux',
				],
			]],
		]),
		['foo', 'bar', 'baz', 'qux'],
	)
})

test('resolveBEMModifiers returns a list of keys for which their values are truthy', t => {
	t.deepEqual(
		resolveBEMModifiers({
			foo: true,
			bar: false,
			baz: 42,
			qux: 0,
		}),
		['foo', 'baz'],
	)
})

test('resolveBEMModifiers returns unique values', t => {
	t.deepEqual(
		resolveBEMModifiers(['foo', 'bar', 'foo']),
		['foo', 'bar'],
	)
})

test('resolveBEMModifiers omits falsey and non-string values', t => {
	const values = [
		'',
		[],
		'foo',
		true,
		false,
		42,
		undefined,
		void 0,
	]
	t.deepEqual(
		// tslint:disable-next-line:no-any
		resolveBEMModifiers(values as any),
		['foo'],
	)
})

test('resolveBEMModifiers returns a simple flat array from a complex nested structure', t => {
	const nested = [
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
	]
	t.deepEqual(
		// tslint:disable-next-line:no-any
		resolveBEMModifiers(nested as any),
		['foo', 'bar', 'qux', 'garpley'],
	)
})

test('toBEMClassNames returns block (first arg) when only block is provided', t => {
	t.is(
		toBEMClassNames('foo'),
		'foo',
	)
})

test('toBEMClassNames returns joined BEM class names', t => {
	t.is(
		toBEMClassNames('foo', ['bar']),
		'foo foo--bar',
	)
})

test('toBEMClassNames returns joined BEM class names combined with existing class names', t => {
	t.is(
		toBEMClassNames('foo', ['bar'], 'baz'),
		'foo foo--bar baz',
	)
})

test('toBEMClassNames resolves nested modifiers structure', t => {
	t.is(
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
		),
		'foo foo--bar foo--baz qux',
	)
})
