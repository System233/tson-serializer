// Copyright (c) 2022 System233
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
};
/**
    TSON - A Type-safe Serializer like JSON
*/
export class TSON {
    private readonly types: TSONSerializer[] = [];
    private readonly map: Record<string, TSONSerializer> = {};

    /** @hidden */
    private readonly refname = '$ref';
    constructor() {
        this.register(Object, x => x, x => x, null, true);
        this.register(String, x => new String(x), x => x.valueOf());
        this.register(Number, x => new Number(x), x => x.valueOf());
        this.register(Boolean, x => new Boolean(x), x => x.valueOf());
        this.register(RegExp, (x: { source: string, flags: string }) => new RegExp(x.source, x.flags), x => ({ source: x.source, flags: x.flags }));
        this.register(Set, (x: any[]) => new Set(x), x => Array.from(x.values()), null, true);
        this.register(Map, (x: [any, any][]) => new Map(x), x => Array.from(x.entries()), null, true);

        this.register(ArrayBuffer, (x: ArrayLike<number>) => new Uint8Array(x).buffer, x => Array.from(new Uint8Array(x)));
        [
            Int8Array, Uint8Array, Uint8ClampedArray,
            Int16Array, Uint16Array,
            Int32Array, Uint32Array,
            Float32Array, Float64Array,
            BigInt64Array, BigUint64Array
        ].forEach(constructor => this.register(constructor,
            (x: ArrayBfferData) => new constructor(x.buffer, x.offset, x.length),
            (x): ArrayBfferData => ({ buffer: x.buffer, offset: x.byteOffset, length: x.length }),
            null, true));
        this.register<DataView, ArrayBfferData>(DataView,
            data => new DataView(data.buffer, data.offset, data.length),
            value => ({ buffer: value.buffer, offset: value.byteOffset, length: value.byteLength }),
            null, true)

        this.register<Array<any>, Array<any>>('Array', x => x, x => x, x => Array.isArray(x), true);
        this.register<Date, string>('Date', x => new Date(x), x => x.toJSON(), x => x instanceof Date);
        this.register<Number, void>('NaN', () => NaN, () => void 0, x => Number.isNaN(x));
        this.register<Number, boolean>('Infinity', (x) => x ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY, (x) => x > 0, x => typeof x == 'number' && !Number.isNaN(x) && !Number.isFinite(x));
        const builtins=Object.values(Object.getOwnPropertyDescriptors(Symbol)).filter(value => typeof value.value == 'symbol').map(x=>x.value as symbol);
        const n2smap= Object.fromEntries(builtins.map(symbol=>[symbol.description,symbol]));
        const s2nmap= Object.fromEntries(builtins.map(symbol=>[symbol,symbol.description]));
        this.register<symbol, { description: string | undefined, builtin:boolean , shared: boolean }>('symbol',
            data => {
                if (!data.description) {
                    return Symbol();
                }
                if (data.builtin) {
                    return n2smap[data.description];
                }
                if(data.shared){
                    return Symbol.for(data.description);
                }
                return Symbol(data.description);
            },
            value => ({
                description: value.description,
                    builtin:value in s2nmap,
                    shared: value.description!=null&&!!Symbol.for(value.description)
                }),
            value => typeof value == 'symbol');


        this.register<bigint, string>('bigint', x => BigInt(x), x => x.toString(), x => typeof x == 'bigint');
        this.register<undefined, undefined>('undefined', () => void 0, () => void 0, x => typeof x == 'undefined');
        this.register<boolean, boolean>('boolean', x => x, x => x, x => typeof x == 'boolean');
        this.register<string, string>('string', x => x, x => x, x => typeof x == 'string');
        this.register<number, number>('number', x => x, x => x, x => typeof x == 'number'&&!Number.isNaN(x)&&Number.isFinite(x));

    }
    /** @hidden */
    private referenceable(value: any) {
        return value != null && (typeof value == 'object' || typeof value == 'symbol')
    }
    /** @hidden */
    private reference(path: any[]): TSONData {
        return {
            type: this.refname,
            data: path
        }
    }
    /** @hidden */
    private dereference(data: TSONData) {
        if (data.type == this.refname) {
            return data.data;
        }
        return null;
    }
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
     * Transform the value to a TSONData object.
     * The implementation of all `forward` overloads.
     * @param value A value to be transformed.
     * @returns The `TSONData` object of the `value`.
    */
    forward(value: any): TSONData | TSONData[] | null {
        const map: Map<any, any[]> = new Map;
        const reference = (value: any, path: any[]) => {
            const ref = map.get(value);
            if (ref == null) {
                map.set(value, path);
                return null;
            }
            return this.reference(ref);
        }
        const iforward = (value: any, path: any[]): TSONData | TSONData[] | null => {
            if (value === null) {
                return null;
            }
            if (this.referenceable(value)) {
                const ref = reference(value, path);
                if (ref) {
                    return ref;
                }
            }
            const typeDef = this.types.find(d => d.match(value));
            if (!typeDef) {
                return value;
            }
            const data = typeDef.dump(value);
            const type = typeDef.type;
            if (typeDef.recursive && data != null && typeof data == 'object') {
                if (Array.isArray(data)) {
                    return {
                        type,
                        data: data.map((item, index) => iforward(item, [...path, index]))
                    }
                }
                return {
                    type,
                    data: Object.fromEntries(
                        Object.entries(data).map(([key, value]) => {
                            return [key, iforward(value, [...path, key])];
                        }))
                }
            }
            return {
                type,
                data
            }
        }
        return iforward(value, []);
    }
    /**
     * Transform the `TSONData` back to the original object.
     * @param value A TSONData object or array of TSONData objects to be transformed.
     * @returns The original object of the `TSONData` object.
    */
    backward<T = any>(value: TSONData | TSONData[]): T {
        let refs: [TSONData, string[]][] = [];
        const map: Record<string, any> = {};
        const get = (path: any[]) => {
            const key = JSON.stringify(path);
            if (key in map) {
                return map[key];
            }
            return null;
        }
        const set = (path: any[], value: any) => {
            if (this.referenceable(value)) {
                const key = JSON.stringify(path);
                map[key] = value;
            }
        }
        const ibackward = (value: TSONData | TSONData[], path: any[]): any => {
            const record = (value: any) => {
                set(path, value);
                return value;
            }
            if (value === null) {
                return null;
            }
            if (Array.isArray(value)) {
                return record(value.map((item, index) => ibackward(item, [...path, index])));
            }
            const ref = this.dereference(value);
            if (ref != null) {
                const obj = get(ref);
                if (!obj) {
                    refs.push([value, path]);
                }
                return obj;
            }
            const { type, data } = value;
            const typeDef = this.map[type];
            if (typeDef != null) {
                if (typeDef.recursive && data != null && typeof data == 'object') {
                    if (Array.isArray(data)) {
                        return record(typeDef.load(data.map((item, index) => ibackward(item, [...path, index]))));
                    }
                    return record(typeDef.load(Object.fromEntries(Object.entries(data).map(([key, value]) => {
                        return [key, ibackward(value as any, [...path, key])]
                    }))));
                }
                return record(typeDef.load(data));
            }
            return record(data);
        }
        const data = ibackward(value, []);
        while (refs.length) {
            const cached = refs;
            refs = [];
            cached.forEach(([value, path]) => {
                const distKey = path[path.length - 1];
                const distObj = get(path.slice(0, -1));
                distObj[distKey] = ibackward(value, path);
            });
        }
        return data;
    }
    /** 
     * Wrapper for `JSON.stringify(TSON.forward(value),replacer,space)`\
     * Converts a JavaScript value to a TSON string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
    */
    stringify(value: any, replacer?: ((this: any, key: string, value: any) => any) | null, space?: number): string {
        return JSON.stringify(this.forward(value), replacer as any, space);
    }
    /**
     * Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
     * Converts a TSON string into an object.
     * @param text A valid TSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. 
    */
    parse<T = any>(text: string, reviver?: (this: any, key: string, value: any) => any) {
        return this.backward<T>(JSON.parse(text, reviver));
    }

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
    register<T, D>(constructor: { new(...data: any): T }, load: (data: D) => T, dump: (value: T) => D, match?: ((value: any) => boolean) | null, recursive?: boolean): boolean;
    /**
     * Register a TSON Serializer for Type.
     * The implementation of all `register` overloads.
     * @param serializer TSONSerializer object or string name or type constructor.
     * @param load A function to deserialize the data.
     * @param dump A function to serialize the value.
     * @param match A function that checks the value matches this serializer. If null, `value instanceof constructor` is used by default.
     * @param recursive Whether to process `load()` input and `dump()` output recursively.
     * @returns `true` if register was successful, `false` otherwise.
     */
    register(serializer: TSONSerializer | string | Function, load?: (data: any) => any, dump?: (value: any) => any, match?: (value: any) => boolean, recursive?: boolean): boolean {
        if (typeof serializer == 'string') {
            if (!load || !dump || !match) {
                return false;
            }
            return this.register({
                type: serializer,
                load,
                dump,
                match,
                recursive: !!recursive
            });
        }
        if (typeof serializer == 'function') {
            if (!load || !dump) {
                return false;
            }
            return this.register({
                type: serializer.name,
                load,
                dump,
                match: match || (x => x instanceof serializer),
                recursive: !!recursive
            });
        }
        if (serializer.type in this.map) {
            return false;
        }
        this.types.splice(0, 0, serializer);
        this.map[serializer.type] = serializer;
        return true;
    }

    /**
     * Deregister a TSON Serializer.
     * @param name The name of the serializer.
     * @returns `true` if deregister was successful, `false` otherwise.
     */
    deregister(name: string) {
        if (name in this.map) {
            const index = this.types.findIndex(x => x.type == name);
            this.types.splice(index, 1);
            delete this.map[name];
            return true;
        }
        return false;
    }
    static readonly instance = new TSON;
    /**Link to {@link TSON.forward}. */
    static readonly forward = this.instance.forward.bind(this.instance);
    /**Link to {@link TSON.backward}. */
    static readonly backward = this.instance.backward.bind(this.instance);
    /**Link to {@link TSON.stringify}. */
    static readonly stringify = this.instance.stringify.bind(this.instance);
    /**Link to {@link TSON.parse}. */
    static readonly parse = this.instance.parse.bind(this.instance);
    /**Link to {@link TSON.register}. */
    static readonly register = this.instance.register.bind(this.instance);
    /**Link to {@link TSON.deregister}. */
    static readonly deregister = this.instance.deregister.bind(this.instance);
}

/**Link to {@link TSON.forward}. */
export const forward = TSON.forward;
/**Link to {@link TSON.backward}. */
export const backward = TSON.backward;
/**Link to {@link TSON.stringify}. */
export const stringify = TSON.stringify;
/**Link to {@link TSON.parse}. */
export const parse = TSON.parse;
/**Link to {@link TSON.register}. */
export const register = TSON.register;
/**Link to {@link TSON.deregister}. */
export const deregister = TSON.deregister;
export default TSON;