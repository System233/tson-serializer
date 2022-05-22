[TSON - A Type-safe Serializer](../README.md) / [Exports](../modules.md) / TSON

# Class: TSON

TSON - A Type-safe Serializer like JSON

## Table of contents

### Constructors

- [constructor](TSON.md#constructor)

### Properties

- [map](TSON.md#map)
- [types](TSON.md#types)

### Methods

- [backward](TSON.md#backward)
- [deregister](TSON.md#deregister)
- [forward](TSON.md#forward)
- [parse](TSON.md#parse)
- [register](TSON.md#register)
- [stringify](TSON.md#stringify)

## Constructors

### constructor

• **new TSON**()

#### Defined in

index.ts:55

## Properties

### map

• `Private` **map**: `Record`<`string`, [`TSONSerializer`](../interfaces/TSONSerializer.md)<`any`, `any`\>\> = `{}`

#### Defined in

index.ts:51

___

### types

• `Private` **types**: [`TSONSerializer`](../interfaces/TSONSerializer.md)<`any`, `any`\>[] = `[]`

#### Defined in

index.ts:50

## Methods

### backward

▸ **backward**(`value`): `any`

Transform the `TSONData` back to the original object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\> \| [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[] | A TSONData object or array of TSONData objects to be transformed. |

#### Returns

`any`

The original object of the `TSONData` object.

#### Defined in

index.ts:182

___

### deregister

▸ **deregister**(`name`): `boolean`

Deregister a TSON Serializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the serializer. |

#### Returns

`boolean`

`true` if deregister was successful, `false` otherwise.

#### Defined in

index.ts:346

___

### forward

▸ **forward**(`value`): [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[]

Transform the array of values to an array of TSONData objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any`[] | Array of values. |

#### Returns

[`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[]

The array of `TSONData` objects of the `value`.

#### Defined in

index.ts:115

▸ **forward**(`value`): [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>

Transform the value to a TSONData object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | A value whose type can be object,number,boolean,or other type. |

#### Returns

[`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>

The `TSONData` object of the `value`.

#### Defined in

index.ts:122

___

### parse

▸ **parse**(`text`, `reviver?`): `any`

Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
Converts a TSON string into an object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | A valid TSON string. |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. |

#### Returns

`any`

#### Defined in

index.ts:260

___

### register

▸ **register**<`T`, `D`\>(`serializer`): `boolean`

Register a TSON Serializer for Type.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serializer` | [`TSONSerializer`](../interfaces/TSONSerializer.md)<`T`, `D`\> | A TSONSerializer Object. |

#### Returns

`boolean`

`true` if register was successful, `false` otherwise.

#### Defined in

index.ts:271

▸ **register**<`T`, `D`\>(`name`, `load`, `dump`, `match`, `recursive?`): `boolean`

Register a TSON Serializer for Type.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the serializer. |
| `load` | (`data`: `D`) => `T` | A function to deserialize the data. |
| `dump` | (`value`: `T`) => `D` | A function to serialize the value. |
| `match` | (`value`: `any`) => `boolean` | A function that checks the value matches this serializer. |
| `recursive?` | `boolean` | Whether to process `load()` input and `dump()` output recursively. |

#### Returns

`boolean`

`true` if register was successful, `false` otherwise.

#### Defined in

index.ts:284

▸ **register**<`T`, `D`\>(`constructor`, `load`, `dump`, `match?`, `recursive?`): `boolean`

Register a TSON Serializer for Type.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructor` | (...`data`: `any`) => `T` | Type constructor. |
| `load` | (`data`: `D`) => `T` | A function to deserialize the data. |
| `dump` | (`value`: `T`) => `D` | A function to serialize the value. |
| `match?` | ``null`` \| (`value`: `any`) => `boolean` | A function that checks the value matches this serializer. If null, `value instanceof constructor` is used by default. |
| `recursive?` | `boolean` | Whether to process `load()` input and `dump()` output recursively. |

#### Returns

`boolean`

`true` if register was successful, `false` otherwise.

#### Defined in

index.ts:297

___

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`): `string`

Wrapper for `JSON.stringify(TSON.forward(value),replacer,space)`\
Converts a JavaScript value to a TSON string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | A JavaScript value, usually an object or array, to be converted. |
| `replacer?` | ``null`` \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. |
| `space?` | `number` | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. |

#### Returns

`string`

#### Defined in

index.ts:251
