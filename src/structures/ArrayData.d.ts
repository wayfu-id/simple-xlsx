/**
 * Extended Built-in Array
 * @class ArrayData
 * @classdesc An custom array extends built in array
 * @augments {Array}
 */
export default class ArrayData<T extends Object> extends Array<T> {
    
    /** Create an array by spliting a string with a delimiter */
    static split(string: string, delimiter: string): ArrayData<String>;


    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: T[]);

    /** Get empty status current array */
    get isEmpty(): boolean;

    /** Get all non epmty array items */
    get nonEmptyValue(): ArrayData<T>;

    /**
     * Change index order of an items, and return this array.
     * `Carefull: This function will override old array.`
     */
    changeIndex(oldIndex: number, newIndex: number): ArrayData<T>;

    
    /** Count number of a value in current array */
    countValue(val: any): number;

    /** Check given value is on this array or not */
    isOnArray(item: any): boolean;
}