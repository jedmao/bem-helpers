export interface ListOfRecursiveArraysOrValues<T>
extends List<T | RecursiveArray<T>> {}
export type List<T> = ArrayLike<T>
export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

/**
 * BEM modifiers for blocks and elements (supports nested structures).
 */
export type BEMModifiers = (
	BEMModifier |
	ListOfRecursiveArraysOrValues<BEMModifier>
)

export type BEMModifier = string | BEMModifiersHash

/**
 * The key name become the modifiers only if their respective values
 * are truthy.
 */
export interface BEMModifiersHash {
	[modifierName: string]: string | boolean | number
}
