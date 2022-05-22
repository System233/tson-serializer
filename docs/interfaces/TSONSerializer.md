[TSON - A Type-safe Serializer](../README.md) / [Exports](../modules.md) / TSONSerializer

# Interface: TSONSerializer<T, D\>

TSONSerializer interface

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `D` | `any` |

## Table of contents

### Properties

- [recursive](TSONSerializer.md#recursive)
- [type](TSONSerializer.md#type)

### Methods

- [dump](TSONSerializer.md#dump)
- [load](TSONSerializer.md#load)
- [match](TSONSerializer.md#match)

## Properties

### recursive

• `Readonly` **recursive**: `boolean`

Whether to process `load()` input and `dump()` output recursively.

#### Defined in

[index.ts:29](https://github.com/System233/tson-serializer/blob/9e5d98c/index.ts#L29)

___

### type

• `Readonly` **type**: `string`

The name of the serializer

#### Defined in

[index.ts:27](https://github.com/System233/tson-serializer/blob/9e5d98c/index.ts#L27)

## Methods

### dump

▸ **dump**(`value`): `D`

A function to serialize the value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | A value to be serialized. |

#### Returns

`D`

Serialized data for `value`

#### Defined in

[index.ts:19](https://github.com/System233/tson-serializer/blob/9e5d98c/index.ts#L19)

___

### load

▸ **load**(`data`): `T`

A function to deserialize the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `D` | A value to be deserialized. |

#### Returns

`T`

Deserialized data for `data`

#### Defined in

[index.ts:14](https://github.com/System233/tson-serializer/blob/9e5d98c/index.ts#L14)

___

### match

▸ **match**(`value`): `boolean`

A function to check the value matches this serializer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | A value to be checked. |

#### Returns

`boolean`

Match if `true`, otherwise pass.

#### Defined in

[index.ts:25](https://github.com/System233/tson-serializer/blob/9e5d98c/index.ts#L25)
