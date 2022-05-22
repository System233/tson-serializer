// Copyright (c) 2022 System233
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
;
/**
    TSON - A Type-safe Serializer like JSON
*/
export class TSON {
    types = [];
    map = {};
    /** @hidden */
    refname = '$ref';
    constructor() {
        this.register(Object, x => x, x => x, null, true);
        this.register(String, x => new String(x), x => x.valueOf());
        this.register(Number, x => new Number(x), x => x.valueOf());
        this.register(Boolean, x => new Boolean(x), x => x.valueOf());
        this.register(RegExp, (x) => new RegExp(x.source, x.flags), x => ({ source: x.source, flags: x.flags }));
        this.register(Set, (x) => new Set(x), x => Array.from(x.values()), null, true);
        this.register(Map, (x) => new Map(x), x => Array.from(x.entries()), null, true);
        this.register(ArrayBuffer, (x) => new Uint8Array(x).buffer, x => Array.from(new Uint8Array(x)));
        [
            Int8Array, Uint8Array, Uint8ClampedArray,
            Int16Array, Uint16Array,
            Int32Array, Uint32Array,
            Float32Array, Float64Array,
            BigInt64Array, BigUint64Array
        ].forEach(constructor => this.register(constructor, (x) => new constructor(x.buffer, x.offset, x.length), (x) => ({ buffer: x.buffer, offset: x.byteOffset, length: x.length }), null, true));
        this.register(DataView, data => new DataView(data.buffer, data.offset, data.length), value => ({ buffer: value.buffer, offset: value.byteOffset, length: value.byteLength }), null, true);
        this.register('Array', x => x, x => x, x => Array.isArray(x), true);
        this.register('Date', x => new Date(x), x => x.toJSON(), x => x instanceof Date);
        this.register('NaN', () => NaN, () => void 0, x => Number.isNaN(x));
        this.register('Infinity', (x) => x ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY, (x) => x > 0, x => typeof x == 'number' && !Number.isNaN(x) && !Number.isFinite(x));
        this.register('symbol', x => Symbol(x), x => x.description, x => typeof x == 'symbol');
        this.register('bigint', x => BigInt(x), x => x.toString(), x => typeof x == 'bigint');
        this.register('undefined', () => void 0, () => void 0, x => typeof x == 'undefined');
        this.register('boolean', x => x, x => x, x => typeof x == 'boolean');
        this.register('string', x => x, x => x, x => typeof x == 'string');
        this.register('number', x => x, x => x, x => typeof x == 'number');
    }
    /** @hidden */
    referenceable(value) {
        return value != null && (typeof value == 'object' || typeof value == 'symbol');
    }
    /** @hidden */
    reference(path) {
        return {
            type: this.refname,
            data: path
        };
    }
    /** @hidden */
    dereference(data) {
        if (data.type == this.refname) {
            return data.data;
        }
        return null;
    }
    /**
     * Transform the value to a TSONData object.
     * The implementation of all `forward` overloads.
     * @param value A value to be transformed.
     * @returns The `TSONData` object of the `value`.
    */
    forward(value) {
        const map = new Map;
        const reference = (value, path) => {
            const ref = map.get(value);
            if (ref == null) {
                map.set(value, path);
                return null;
            }
            return this.reference(ref);
        };
        const iforward = (value, path) => {
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
                    };
                }
                return {
                    type,
                    data: Object.fromEntries(Object.entries(data).map(([key, value]) => {
                        return [key, iforward(value, [...path, key])];
                    }))
                };
            }
            return {
                type,
                data
            };
        };
        return iforward(value, []);
    }
    /**
     * Transform the `TSONData` back to the original object.
     * @param value A TSONData object or array of TSONData objects to be transformed.
     * @returns The original object of the `TSONData` object.
    */
    backward(value) {
        let refs = [];
        const map = {};
        const get = (path) => {
            const key = JSON.stringify(path);
            if (key in map) {
                return map[key];
            }
            return null;
        };
        const set = (path, value) => {
            if (this.referenceable(value)) {
                const key = JSON.stringify(path);
                map[key] = value;
            }
        };
        const ibackward = (value, path) => {
            const record = (value) => {
                set(path, value);
                return value;
            };
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
                        return [key, ibackward(value, [...path, key])];
                    }))));
                }
                return record(typeDef.load(data));
            }
            return record(data);
        };
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
    stringify(value, replacer, space) {
        return JSON.stringify(this.forward(value), replacer, space);
    }
    /**
     * Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
     * Converts a TSON string into an object.
     * @param text A valid TSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.
    */
    parse(text, reviver) {
        return this.backward(JSON.parse(text, reviver));
    }
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
    register(serializer, load, dump, match, recursive) {
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
    deregister(name) {
        if (name in this.map) {
            const index = this.types.findIndex(x => x.type == name);
            this.types.splice(index, 1);
            delete this.map[name];
            return true;
        }
        return false;
    }
}
export const module = new TSON;
/**Link to {@link TSON.forward}. */
export const forward = module.forward.bind(module);
/**Link to {@link TSON.backward}. */
export const backward = module.backward.bind(module);
/**Link to {@link TSON.stringify}. */
export const stringify = module.stringify.bind(module);
/**Link to {@link TSON.parse}. */
export const parse = module.parse.bind(module);
/**Link to {@link TSON.register}. */
export const register = module.register.bind(module);
/**Link to {@link TSON.deregister}. */
export const deregister = module.deregister.bind(module);
/**Default exported TSON instance.*/
export default module;
