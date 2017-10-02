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
	/**
	 * BEM block.
	 */
	block: string,
	/**
	 * BEM element.
	 */
	element: string,
	/**
	 * Appears between the BEM block and element (e.g., block__element).
	 */
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
	/**
	 * BEM block or element.
	 */
	blockOrElement: string,
	/**
	 * BEM modifiers.
	 */
	modifiers: string[] = [],
	/**
	 * Appears between the BEM block or element and each modifier
	 * (e.g., block--modifier, block__element--modifier).
	 */
	separator: string = '--',
) {
	return !modifiers
		? [blockOrElement]
		: [blockOrElement].concat(modifiers.map(
			m => [blockOrElement, m].join(separator),
		))
}

/**
 * Creates a flat string array from a potentially deeply nested structure of
 * modifiers.
 */
export function resolveBEMModifiers(
	/**
	 * BEM modifiers (supports nested structures).
	 */
	modifiers?: BEMModifiers,
	{
		unique = false,
	}: {
		/**
		 * Removes duplicates.
		 */
		unique?: boolean
	} = {}): string[] {
	return truthyStringsKeys(modifiers, { unique })
}

/**
 * Joins a BEM block or element with any number of modifiers.
 * @param blockOrElement BEM block or element name.
 * @param modifiers BEM modifiers (nested structure supported).
 */
export function deepJoinBEMModifiers(
	/**
	 * BEM block or element.
	 */
	blockOrElement: string,
	/**
	 * BEM modifiers.
	 */
	modifiers?: BEMModifiers,
	{
		separator,
		unique = false,
	}: {
		/**
		 * Appears between the BEM block or element and each modifier
		 * (e.g., block--modifier, block__element--modifier).
		 */
		separator?: string
		/**
		 * Removes duplicates.
		 */
		unique?: boolean
	} = {},
) {
	return joinBEMModifiers(
		blockOrElement,
		resolveBEMModifiers(modifiers, { unique }),
		separator,
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
