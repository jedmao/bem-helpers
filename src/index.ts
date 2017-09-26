import * as classNames from 'classnames'

import { BEMModifiers } from './types'

/**
 * Joins a BEM block with an element.
 * @param block The BEM block on the left side of the join.
 * @param element The BEM element on the right side of the join.
 */
export function joinBEMElement(
	block: string,
	element: string,
	separator: string = '__',
) {
	if (!block) {
		throw new Error('Required BEM block is missing or empty')
	}
	if (!element) {
		throw new Error('Required BEM element is missing or empty')
	}
	return [block, element].join(separator)
}

/**
 * Joins a block or element with any number of modifiers.
 * @param blockOrElement The block or element on the left side of each join.
 * @param modifiers The modifiers on the right side of each join.
 * @return Returns at least 2 values (e.g., ['foo', 'foo--bar'] for a single
 * "bar" modifier. The first value is always the block or element by itself.
 */
export function joinBEMModifiers(
	blockOrElement: string,
	modifiers: string[] = [],
	separator: string = '--',
) {
	return !modifiers
		? [blockOrElement]
		: [blockOrElement].concat(modifiers.map(
			m => [blockOrElement, m].join(separator),
		))
}

/**
 * Resolves a simple string or a potentially deeply nested structure of
 * modifier values into a simple string array.
 * @return Returns a simple string array of modifiers that passed resolution.
 */
export function resolveBEMModifiers(modifiers?: BEMModifiers): string[] {
	return uniq(compact(isArray(modifiers)
		? flatten(modifiers.map(m => resolveBEMModifiers(m)))
		: isString(modifiers)
			? modifiers.split(/\s+/)
			: keys(pickBy(modifiers)),
	))
}

/**
 * Joins a BEM block or element with any number of modifiers. Preserves
 * existing className, if provided.
 * @param blockOrElement BEM block or element name.
 * @param modifiers BEM modifiers (nested structure supported).
 * @param className Existing class name.
 */
export function toBEMClassNames(
	blockOrElement: string,
	modifiers?: BEMModifiers,
	className: string = '',
) {
	const joined = joinBEMModifiers(
		blockOrElement,
		resolveBEMModifiers(modifiers),
	)
	return classNames(compact(
		joined.concat(className.split(/\s+/)),
	).join(' '))
}

export function compact<T>(arr: T[]) {
	return isArray(arr) ? arr.filter(identity) : []
}

export function flatten<T>(arr: T[]) {
	// tslint:disable-next-line:no-any
	return (arr || []).reduce((a, b) => a.concat(b as any), [])
}

export function identity<T>(value: T) {
	return value
}

// tslint:disable-next-line:no-any
export function isArray(x: any): x is any[] {
	return Array.isArray(x)
}

// tslint:disable-next-line:no-any
export function isString(x: any): x is string {
	return typeof x === 'string'
}

export function keys<T>(obj: T) {
	return Object.keys(obj || {})
}

export function pickBy<T>(obj: T) {
	const result = {}
	keys(obj).filter(key => !!obj[key]).forEach(key => {
		result[key] = obj[key]
	})
	return result
}

export function uniq<T>(arr: T[]) {
	return arr.filter(
		// tslint:disable-next-line:no-any
		function(this: any, a: T) {
			return !this[a] ? this[a] = true : false
		},
		{},
	)
}

export {
	BEMModifier,
	BEMModifiers,
	BEMModifiersHash,
} from './types'
