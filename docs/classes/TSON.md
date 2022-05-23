[TSON - A Type-safe Serializer](../README.md) / [Exports](../modules.md) / TSON

# Class: TSON

TSON - A Type-safe Serializer like JSON

## Table of contents

### Constructors

- [constructor](TSON.md#constructor)

### Properties

- [map](TSON.md#map)
- [types](TSON.md#types)
- [backward](TSON.md#backward)
- [deregister](TSON.md#deregister)
- [forward](TSON.md#forward)
- [instance](TSON.md#instance)
- [parse](TSON.md#parse)
- [register](TSON.md#register)
- [stringify](TSON.md#stringify)

### Methods

- [backward](TSON.md#backward-1)
- [deregister](TSON.md#deregister-1)
- [forward](TSON.md#forward-1)
- [parse](TSON.md#parse-1)
- [register](TSON.md#register-1)
- [stringify](TSON.md#stringify-1)

## Constructors

### constructor

• **new TSON**()

#### Defined in

[index.ts:55](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L55)

## Properties

### map

• `Private` `Readonly` **map**: `Record`<`string`, [`TSONSerializer`](../interfaces/TSONSerializer.md)<`any`, `any`\>\> = `{}`

#### Defined in

[index.ts:51](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L51)

___

### types

• `Private` `Readonly` **types**: [`TSONSerializer`](../interfaces/TSONSerializer.md)<`any`, `any`\>[] = `[]`

#### Defined in

[index.ts:50](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L50)

___

### backward

▪ `Static` `Readonly` **backward**: <T\>(`value`: [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\> \| [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[]) => `T`

#### Type declaration

▸ <`T`\>(`value`): `T`

Transform the `TSONData` back to the original object.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\> \| [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[] | A TSONData object or array of TSONData objects to be transformed. |

##### Returns

`T`

The original object of the `TSONData` object.

#### Defined in

[index.ts:382](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L382)

___

### deregister

▪ `Static` `Readonly` **deregister**: (`name`: `string`) => `boolean`

#### Type declaration

▸ (`name`): `boolean`

Deregister a TSON Serializer.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the serializer. |

##### Returns

`boolean`

`true` if deregister was successful, `false` otherwise.

#### Defined in

[index.ts:390](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L390)

___

### forward

▪ `Static` `Readonly` **forward**: (`value`: `any`[]) => [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[](`value`: `any`) => [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>

#### Type declaration

▸ (`value`): [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[]

Transform the array of values to an array of TSONData objects.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any`[] | Array of values. |

##### Returns

[`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[]

The array of `TSONData` objects of the `value`.

▸ (`value`): [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>

Transform the value to a TSONData object.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | A value whose type can be object,number,boolean,or other type. |

##### Returns

[`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>

The `TSONData` object of the `value`.

#### Defined in

[index.ts:380](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L380)

___

### instance

▪ `Static` `Readonly` **instance**: [`TSON`](TSON.md)

#### Defined in

[index.ts:378](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L378)

___

### parse

▪ `Static` `Readonly` **parse**: <T\>(`text`: `string`, `reviver?`: (`this`: `any`, `key`: `string`, `value`: `any`) => `any`) => `T`

#### Type declaration

▸ <`T`\>(`text`, `reviver?`): `T`

Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
Converts a TSON string into an object.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | A valid TSON string. |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. |

##### Returns

`T`

#### Defined in

[index.ts:386](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L386)

___

### register

▪ `Static` `Readonly` **register**: <T, D\>(`serializer`: [`TSONSerializer`](../interfaces/TSONSerializer.md)<`T`, `D`\>) => `boolean`<T, D\>(`name`: `string`, `load`: (`data`: `D`) => `T`, `dump`: (`value`: `T`) => `D`, `match`: (`value`: `any`) => `boolean`, `recursive?`: `boolean`) => `boolean`<T, D\>(`constructor`: (...`data`: `any`) => `T`, `load`: (`data`: `D`) => `T`, `dump`: (`value`: `T`) => `D`, `match?`: ``null`` \| (`value`: `any`) => `boolean`, `recursive?`: `boolean`) => `boolean`

#### Type declaration

▸ <`T`, `D`\>(`serializer`): `boolean`

Register a TSON Serializer for Type.

##### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serializer` | [`TSONSerializer`](../interfaces/TSONSerializer.md)<`T`, `D`\> | A TSONSerializer Object. |

##### Returns

`boolean`

`true` if register was successful, `false` otherwise.

▸ <`T`, `D`\>(`name`, `load`, `dump`, `match`, `recursive?`): `boolean`

Register a TSON Serializer for Type.

##### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the serializer. |
| `load` | (`data`: `D`) => `T` | A function to deserialize the data. |
| `dump` | (`value`: `T`) => `D` | A function to serialize the value. |
| `match` | (`value`: `any`) => `boolean` | A function that checks the value matches this serializer. |
| `recursive?` | `boolean` | Whether to process `load()` input and `dump()` output recursively. |

##### Returns

`boolean`

`true` if register was successful, `false` otherwise.

▸ <`T`, `D`\>(`constructor`, `load`, `dump`, `match?`, `recursive?`): `boolean`

Register a TSON Serializer for Type.

##### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The original type. |
| `D` | The serialized type. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructor` | (...`data`: `any`) => `T` | Type constructor. |
| `load` | (`data`: `D`) => `T` | A function to deserialize the data. |
| `dump` | (`value`: `T`) => `D` | A function to serialize the value. |
| `match?` | ``null`` \| (`value`: `any`) => `boolean` | A function that checks the value matches this serializer. If null, `value instanceof constructor` is used by default. |
| `recursive?` | `boolean` | Whether to process `load()` input and `dump()` output recursively. |

##### Returns

`boolean`

`true` if register was successful, `false` otherwise.

#### Defined in

[index.ts:388](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L388)

___

### stringify

▪ `Static` `Readonly` **stringify**: (`value`: `any`, `replacer?`: ``null`` \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any`, `space?`: `number`) => `string`

#### Type declaration

▸ (`value`, `replacer?`, `space?`): `string`

Wrapper for `JSON.stringify(TSON.forward(value),replacer,space)`\
Converts a JavaScript value to a TSON string.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | A JavaScript value, usually an object or array, to be converted. |
| `replacer?` | ``null`` \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. |
| `space?` | `number` | Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read. |

##### Returns

`string`

#### Defined in

[index.ts:384](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L384)

## Methods

### backward

▸ **backward**<`T`\>(`value`): `T`

Transform the `TSONData` back to the original object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\> \| [`TSONData`](../interfaces/TSONData.md)<`any`, `any`\>[] | A TSONData object or array of TSONData objects to be transformed. |

#### Returns

`T`

The original object of the `TSONData` object.

#### Defined in

[index.ts:205](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L205)

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

[index.ts:369](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L369)

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

[index.ts:138](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L138)

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

[index.ts:145](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L145)

___

### parse

▸ **parse**<`T`\>(`text`, `reviver?`): `T`

Wrapper for `TSON.backward(JSON.parse(text, reviver))`\
Converts a TSON string into an object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | A valid TSON string. |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` | A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is. |

#### Returns

`T`

#### Defined in

[index.ts:283](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L283)

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

[index.ts:294](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L294)

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

[index.ts:307](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L307)

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

[index.ts:320](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L320)

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

[index.ts:274](https://github.com/System233/tson-serializer/blob/1e88e2c/index.ts#L274)
