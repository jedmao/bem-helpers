/**
 * BEM modifiers for blocks and elements.
 */
export type BEMModifiers = {
	[modifierName: string]: boolean
}

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

export interface JoinBlockToModifiers {
	(
		/**
		 * The BEM block on the left side of each join.
		 */
		block: string,
		/**
		 * If specified, the last class names returned will be the BEM block name followed by any number of modifiers provided (e.g., foo--mod1 foo--mod2).
		 */
		modifiers: BEMModifiers,
		/**
		 * Appears between the BEM block or element and each modifier (i.e., the "--" in foo--mod).
		 */
		separator?: string,
	): string[]
}

export interface JoinElementToModifiers {
	(
		/**
		 * The BEM element on the left side of each join.
		 */
		element: string,
		/**
		 * If specified, the last class names returned will be the BEM element name followed by any number of modifiers provided (e.g., foo__bar--mod1 foo__bar--mod2).
		 */
		modifiers: BEMModifiers,
		/**
		 * Appears between the BEM element and each modifier (i.e., the "--" in foo__bar--mod).
		 */
		separator?: string,
	): string[]
}

/**
 * Joins a BEM block or element with any number of modifiers.
 */
export const joinBEMModifiers: JoinBlockToModifiers & JoinElementToModifiers = (
	blockOrElement: string,
	modifiers: BEMModifiers = {},
	separator: string = '--',
) => (
	[blockOrElement]
		.concat(Object.keys(modifiers)
			.filter(m => modifiers[m])
			.map(m => [blockOrElement, m].join(separator)),
		)
)
