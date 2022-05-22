// Copyright (c) 2022 System233
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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