TSON - A Type-safe Serializer / [Exports](modules.md)

<!--
 Copyright (c) 2022 System233
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

## Features

* Type Safety
* Reference Relationship
* Referenced ArrayBuffer in ArrayBufferView
* Circular Reference
* Extensible

## Supported Types

The types listed below are supported by default.

### Primitive values 

* [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#boolean_type)
* [number](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#number_type)
* [bigint](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#bigint_type)
* [string](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#string_type)
* [symbol](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#symbol_type)
* [null](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#null_type)
* [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures#undefined_type)

###  Value properties
* [Infinity](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Infinity)
* [NaN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/NaN)
* [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)

### Fundamental objects
* [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [Symbol](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
* [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### Numbers & dates
* [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [BigInt](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
* [Date](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Text processing
* [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
* [RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### Indexed Collections

* [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [Int8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
* [Uint8Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
* [Uint8ClampedArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
* [Int16Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)
* [Uint16Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)
* [Int32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)
* [Uint32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)
* [Float32Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
* [Float64Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)
* [BigInt64Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
* [BigUint64Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)

### Keyed collections
* [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)

### Structured data
* [ArrayBuffer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [DataView](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)

### Custom Types
```js
const TSON=require('..');
class SuperMaxUltraBigUnlimitedNumber{
    constructor(x,y){
        this.x=BigInt(x);
        this.y=BigInt(y);
    }
};
const dumper=(value)=>value.x+'.'+value.y;
const loader=(data)=>new SuperMaxUltraBigUnlimitedNumber(...data.split('.'));
const matcher=(value)=>value instanceof SuperMaxUltraBigUnlimitedNumber;
const recursive=false;
TSON.register(SuperMaxUltraBigUnlimitedNumber, loader, dumper, matcher, recursive);

const raw=new SuperMaxUltraBigUnlimitedNumber("1234567891012345678910111","98765432109876543210222");
const tson=TSON.stringify(raw);
const result=TSON.parse(tson);
console.log('RAW',raw);
console.log('Result',result);
console.log('Text',tson);

// RAW SuperMaxUltraBigUnlimitedNumber {
//   x: 1234567891012345678910111n,
//   y: 98765432109876543210222n
// }
// Result SuperMaxUltraBigUnlimitedNumber {
//   x: 1234567891012345678910111n,
//   y: 98765432109876543210222n
// }
// Text {"type":"SuperMaxUltraBigUnlimitedNumber","data":"1234567891012345678910111.98765432109876543210222"}
```

## Examples

```typescript
const arrayBuffer=new ArrayBuffer(5);
const uint8Array=new Uint8Array(arrayBuffer,1,4);
uint8Array[0]=0x66;
uint8Array[1]=0xCC;
uint8Array[2]=0xFF;

const circle={
    circle:null as any,
    date:new Date(),
    arrayBuffer,
    uint8Array,
    set:new Set([arrayBuffer,uint8Array]),
    map:new Map([[arrayBuffer,uint8Array]])
}
circle.circle=circle;
const text=TSON.stringify(circle,null,2);
const result=TSON.parse(text);
console.log('Raw',circle);
console.log('Result',result);
console.log('Text',text);
```
* Raw
```json
Raw <ref *1> {
  circle: [Circular *1],
  date: 2022-05-22T04:37:07.505Z,
  arrayBuffer: ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 },
  uint8Array: Uint8Array(4) [ 102, 204, 255, 0 ],
  set: Set(2) {
    ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 },
    Uint8Array(4) [ 102, 204, 255, 0 ]
  },
  map: Map(1) {
    ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 } => Uint8Array(4) [ 102, 204, 255, 0 ]
  }
}
```
* Result
```json
Result <ref *1> {
  circle: [Circular *1],
  date: 2022-05-22T04:37:07.505Z,
  arrayBuffer: ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 },
  uint8Array: Uint8Array(4) [ 102, 204, 255, 0 ],
  set: Set(2) {
    ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 },
    Uint8Array(4) [ 102, 204, 255, 0 ]
  },
  map: Map(1) {
    ArrayBuffer { [Uint8Contents]: <00 66 cc ff 00>, byteLength: 5 } => Uint8Array(4) [ 102, 204, 255, 0 ]
  }
}
```
* Text
```json
Text {
  "type": "Object",
  "data": {
    "circle": {
      "type": "$ref",
      "data": []
    },
    "date": {
      "type": "Date",
      "data": "2022-05-22T04:37:07.505Z"
    },
    "arrayBuffer": {
      "type": "ArrayBuffer",
      "data": [
        0,
        102,
        204,
        255,
        0
      ]
    },
    "uint8Array": {
      "type": "Uint8Array",
      "data": {
        "buffer": {
          "type": "$ref",
          "data": [
            "arrayBuffer"
          ]
        },
        "offset": {
          "type": "number",
          "data": 1
        },
        "length": {
          "type": "number",
          "data": 4
        }
      }
    },
    "set": {
      "type": "Set",
      "data": [
        {
          "type": "$ref",
          "data": [
            "arrayBuffer"
          ]
        },
        {
          "type": "$ref",
          "data": [
            "uint8Array"
          ]
        }
      ]
    },
    "map": {
      "type": "Map",
      "data": [
        {
          "type": "Array",
          "data": [
            {
              "type": "$ref",
              "data": [
                "arrayBuffer"
              ]
            },
            {
              "type": "$ref",
              "data": [
                "uint8Array"
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## License

[MIT License](LICENSE)
