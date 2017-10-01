import truthyStringsKeys, { Primitives } from 'truthy-strings-keys'

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
 * Alias of truthyStringsKeys. Resolves a simple string or a potentially deeply
 * nested structure of modifier values into a simple string array.
 * @return Returns a newly-created, flat string array of modifiers that
 * passed resolution.
 */
export function resolveBEMModifiers(
	modifiers?: BEMModifiers,
	options: {
		unique: boolean
	} = {
		unique: false,
	}): string[] {
	return truthyStringsKeys(modifiers, options)
}

/**
 * Joins a BEM block or element with any number of modifiers.
 * @param blockOrElement BEM block or element name.
 * @param modifiers BEM modifiers (nested structure supported).
 */
export function deepJoinBEMModifiers(
	blockOrElement: string,
	modifiers?: BEMModifiers,
	options: {
		/**
		 * Removes duplicates.
		 */
		unique: boolean
	} = {
		unique: false,
	},
) {
	return joinBEMModifiers(
		blockOrElement,
		resolveBEMModifiers(modifiers, options),
	)
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
