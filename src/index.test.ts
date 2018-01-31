import test from 'ava'

import {
	BEMBlock,
	joinBEMElement,
	joinBEMModifiers,
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
		joinBEMModifiers('foo', { bar: true }),
		['foo', 'foo--bar'],
	)
})

test('joinBEMModifiers joins with a custom separator', t => {
	t.deepEqual(
		joinBEMModifiers('foo', { bar: true }, '--custom--'),
		['foo', 'foo--custom--bar'],
	)
})

test('joinBEMModifiers joins two modifiers to the same block or element', t => {
	t.deepEqual(
		joinBEMModifiers('foo', { bar: true, baz: true }),
		['foo', 'foo--bar', 'foo--baz'],
	)
})

const b = BEMBlock('foo')

test('BEMBlock returns a function', t => {
	t.is(
		typeof b,
		'function',
	)
})

test('BEMBlock function returns a block selector', t => {
	t.is(
		b(),
		'foo',
	)
})

test('BEMBlock function constructs a block selector with modifiers', t => {
	t.is(
		b({ bar: true, baz: true, qux: false }),
		'foo foo--bar foo--baz',
	)
})

test('BEMBlock function constructs an element selector', t => {
	t.is(
		b('bar'),
		'foo__bar',
	)
})

test('BEMBlock function constructs an element selector with modifiers', t => {
	t.is(
		b('bar', { baz: true, qux: true, quux: false }),
		'foo__bar foo__bar--baz foo__bar--qux',
	)
})

test('BEMBlock function constructs an element selector with modifiers', t => {
	const b2 = BEMBlock('foo', {
		elementSeparator: 'xx',
		modifierSeparator: 'yy',
	})
	t.is(
		b2('bar', { baz: true, qux: true, quux: false }),
		'fooxxbar fooxxbaryybaz fooxxbaryyqux',
	)
})
