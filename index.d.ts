/**
 * TSONSerializer interface
 */
export interface TSONSerializer<T = any, D = any> {
    /**A function to deserialize the data.
     * @param data A value to be deserialized.
     * @returns Deserialized data for `data`
    */
    load(data: D): T;
    /**A function to serialize the value.
     * @param value A value to be serialized.
     * @returns Serialized data for `value`
    */
    dump(value: T): D;
    /**A function to check the value matches this serializer.
     * @param value A value to be checked.
     * @returns Match if `true`, otherwise pass.
    */
    match(value: any): boolean;
    /**The name of the serializer*/
    readonly type: string;
    /**Whether to process `load()` input and `dump()` output recursively. */
    readonly recursive: boolean;
}
/**
 * TSONData interface
 */
export interface TSONData<T = any, D = any> {
    /**The name of the serializer that handles this data.*/
    type: T;
    /**Serialized data from serializer.*/
    data: D;
}
/**ArrayBuffer serialized data interface */
export interface ArrayBfferData {
    buffer: ArrayBuffer;
    offset: number;
    length: number;
}
/**
    TSON - A Type-safe Serializer like JSON
*/
export declare class TSON {
    private readonly types;
    private readonly map;
    /** @hidden */
    private readonly refname;
    constructor();
    /** @hidden */
    private referenceable;
    /** @hidden */
    private reference;
    /** @hidden */
    private dereference;
    /**
     * Transform the array of values to an array of TSONData objects.
     * @param value Array of values.
     * @returns The array of `TSONData` objects of the `value`.
    */
    forward(value: any[]): TSONData[];
    /**
     * Transform the value to a TSONData object.
     * @param value A value whose type can be object,number,boolean,or other type.
     * @returns The `TSONData` object of the `value`.
    */
    forward(value: any): TSONData;
    /**
     * Transform the `TSONData` back to the original object.
     * @param value A TSONData object or array of TSONData objects to be transformed.
     * @returns The original object of the `TSONData` object.
    */
    backward<T = any>(value: TSONData | TSONData[]): T;
    /**
     * Wrapper for `JSON.stringify(TSON.forward(value),replacer,space)`\
     * Converts a JavaScript value to a TSON string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
    */
    stringify(value: any, replacer?: ((this: any, key: string, value: any) => any) | null, space?: number): string;
    /**
     * Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
     * Converts a TSON string into an object.
     * @param text A valid TSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.
    */
    parse<T = any>(text: string, reviver?: (this: any, key: string, value: any) => any): T;
    /**
     * Register a TSON Serializer for Type.
     * @template T The original type.
     * @template D The serialized type.
     * @param serializer A TSONSerializer Object.
     * @returns `true` if register was successful, `false` otherwise.
     */
    register<T, D>(serializer: TSONSerializer<T, D>): boolean;
    /**
     * Register a TSON Serializer for Type.
     * @template T The original type.
     * @template D The serialized type.
     * @param name The name of the serializer.
     * @param load A function to deserialize the data.
     * @param dump A function to serialize the value.
     * @param match A function that checks the value matches this serializer.
     * @param recursive Whether to process `load()` input and `dump()` output recursively.
     * @returns `true` if register was successful, `false` otherwise.
     */
    register<T, D>(name: string, load: (data: D) => T, dump: (value: T) => D, match: (value: any) => boolean, recursive?: boolean): boolean;
    /**
     * Register a TSON Serializer for Type.
     * @template T The original type.
     * @template D The serialized type.
     * @param constructor Type constructor.
     * @param load A function to deserialize the data.
     * @param dump A function to serialize the value.
     * @param match A function that checks the value matches this serializer. If null, `value instanceof constructor` is used by default.
     * @param recursive Whether to process `load()` input and `dump()` output recursively.
     * @returns `true` if register was successful, `false` otherwise.
     */
    register<T, D>(constructor: {
        new (...data: any): T;
    }, load: (data: D) => T, dump: (value: T) => D, match?: ((value: any) => boolean) | null, recursive?: boolean): boolean;
    /**
     * Deregister a TSON Serializer.
     * @param name The name of the serializer.
     * @returns `true` if deregister was successful, `false` otherwise.
     */
    deregister(name: string): boolean;
    static readonly instance: TSON;
    /**Link to {@link TSON.forward}. */
    static readonly forward: {
        (value: any[]): TSONData[];
        (value: any): TSONData;
    };
    /**Link to {@link TSON.backward}. */
    static readonly backward: <T = any>(value: TSONData | TSONData[]) => T;
    /**Link to {@link TSON.stringify}. */
    static readonly stringify: (value: any, replacer?: ((this: any, key: string, value: any) => any) | null | undefined, space?: number | undefined) => string;
    /**Link to {@link TSON.parse}. */
    static readonly parse: <T = any>(text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => T;
    /**Link to {@link TSON.register}. */
    static readonly register: {
        <T, D>(serializer: TSONSerializer<T, D>): boolean;
        <T_1, D_1>(name: string, load: (data: D_1) => T_1, dump: (value: T_1) => D_1, match: (value: any) => boolean, recursive?: boolean | undefined): boolean;
        <T_2, D_2>(constructor: new (...data: any) => T_2, load: (data: D_2) => T_2, dump: (value: T_2) => D_2, match?: ((value: any) => boolean) | null | undefined, recursive?: boolean | undefined): boolean;
    };
    /**Link to {@link TSON.deregister}. */
    static readonly deregister: (name: string) => boolean;
}
export default TSON;
