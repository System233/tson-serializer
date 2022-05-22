// Copyright (c) 2022 System233
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const TSON = require('..');
const arrayBuffer=new ArrayBuffer(5);
const uint8Array=new Uint8Array(arrayBuffer,1,4);
uint8Array[0]=0x66;
uint8Array[1]=0xCC;
uint8Array[2]=0xFF;

const circle={
    circle:null,
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
