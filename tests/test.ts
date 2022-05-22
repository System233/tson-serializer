// Copyright (c) 2022 System233
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import TSON from "..";
const u8array=new Uint8Array(10).map((x,i)=>i);
const b64array=new BigInt64Array(10).map((x,i)=>0x100000n*BigInt(i));
const array=[6,5,4,3,2,1];
const deepRef={
    data:'deepRefData'
};
const circle={
    circle:null as any,
    circle2:null as any,
}
circle.circle=circle;
circle.circle2={circle};
const arrayBuffer=new ArrayBuffer(10);
const u8arrayRef=new Uint8Array(arrayBuffer);
const u16arrayRef=new Uint16Array(arrayBuffer,2,2);
const u32arrayRef=new Uint16Array(arrayBuffer,4,1);
const dataViewRef=new DataView(arrayBuffer,1,6);
u8arrayRef[0]=8;
u16arrayRef[0]=16;
u32arrayRef[0]=32;
const data={
    deepRef1:{
        deepRef2:{
            deepRef3:[
                1,
                2,
                3,
                deepRef,
                {
                    deepRef4:{
                        deepRef
                    }
                }
            ]
        }
    },
    
    deepRef,
    deepRef2:{
        deepRef,
        ref2:[
            deepRef
        ]
    },
    // circle,
    nested:[
        [
            [
                {
                    nested:"nestedData"
                }
            ]
        ]
    ],

    array,
    u8array,
    b64array,
    ref:{
        array,
        u8array,
        b64array,
    },
    arrays:[
        array,
        u8array,
        b64array,
    ],
    booleanT:true,
    booleanF:false,
    booleanObjectT:new Boolean(true),
    booleanObjectF:new Boolean(false),
    number:123,
    numberObject:new Number(100),
    string:"string",
    stringObject:new String("stringObject"),
    date:new Date(),
    object:{
        key1:1111,
        date:new Date()
    },
    null:null,
    nullSymbol:Symbol(),
    symbol:Symbol('symbol'),
    undefined:undefined,
    regexp:/123456/gi,
    set:new Set([1,2,3,4,5,array,u8array,circle]),
    map:new Map<any,any>([
        ['A','A'],
        ['B','B'],
        [1,1],
        [{},{}],
        [circle,circle],
        [array,'ObjKey'],
        [u8array,'U8 ObjKey'],
        ['U8 ObjVal',u8array],
        ['circleVal',circle]
    ]),
    circle,
    u8arrayRef,
    u16arrayRef,
    u32arrayRef,
    arrayBuffer,
    u32array:new Uint32Array(10).map((_,i)=>i*10),
    dataViewRef,
    NaN:NaN,
    Infinity:Infinity,
    NegativeInfinity:-Infinity
}
console.log(TSON.forward(data));
const tson=TSON.stringify(data,null,2);
console.log(tson);
const result=TSON.parse(tson);
console.log(result);
console.log(result.map.get(result.circle));
console.log(result.set.has(result.circle));


// console.log(TSON.forward(new Number(10)))
console.log(TSON.forward("123"))
// console.log(TSON.forward(123))
// console.log(TSON.forward(1n))
// console.log(TSON.forward(new BigUint64Array(10)))
// console.log(TSON.forward(/123/gi))
// console.log(TSON.forward([]))
// console.log(TSON.backward(TSON.forward([])))
// console.log(TSON.stringify({
//     arrayBuffer,
//     u8arrayRef,
//     offsetedU8:new Uint8Array(arrayBuffer,5,2),
//     offsetedU32:new Uint32Array(arrayBuffer,4,1),
// },null,2
//     // new Set([circle,{circle}]),
//     // new Map([[circle,circle]])
    
// ))
// console.log(TSON.forward(new Map<any,any>([['A','A'],['B','B'],[1,1],[{},{}]])));