import * as classNames from 'classnames'
import truthyKeys from 'truthy-keys'
import truthyStringsKeys, {
	compact,
	Primitives,
} from 'truthy-strings-keys'

/**
 * BEM modifiers for blocks and elements (supports nested structures).
 */
export type BEMModifiers = Primitives

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
	return truthyStringsKeys(modifiers)
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

export function pickBy<T>(obj: T) {
	const result = {}
	truthyKeys(obj).forEach(key => {
		result[key] = obj[key]
	})
	return result
}

export {
	compact,
	flatten,
	identity,
	isArray,
	isString,
	Primitive as BEMModifier,
	PrimitiveHash as BEMModifiersHash,
	uniq,
} from 'truthy-strings-keys'
