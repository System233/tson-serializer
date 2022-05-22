[TSON - A Type-safe Serializer](README.md) / Exports

# TSON - A Type-safe Serializer

## Table of contents

### References

- [default](modules.md#default)

### Classes

- [TSON](classes/TSON.md)

### Interfaces

- [ArrayBfferData](interfaces/ArrayBfferData.md)
- [TSONData](interfaces/TSONData.md)
- [TSONSerializer](interfaces/TSONSerializer.md)

### Variables

- [module](modules.md#module)

### Functions

- [backward](modules.md#backward)
- [deregister](modules.md#deregister)
- [forward](modules.md#forward)
- [parse](modules.md#parse)
- [register](modules.md#register)
- [stringify](modules.md#stringify)

## References

### default

Renames and re-exports [module](modules.md#module)

## Variables

### module

• `Const` **module**: [`TSON`](classes/TSON.md)

#### Defined in

index.ts:356

## Functions

### backward

▸ **backward**(`value`): `any`

Link to [TSON.backward](classes/TSON.md#backward).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TSONData`](interfaces/TSONData.md)<`any`, `any`\> \| [`TSONData`](interfaces/TSONData.md)<`any`, `any`\>[] |

#### Returns

`any`

#### Defined in

index.ts:361

___

### deregister

▸ **deregister**(`name`): `boolean`

Link to [TSON.deregister](classes/TSON.md#deregister).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

index.ts:369

___

### forward

▸ **forward**(`value`): [`TSONData`](interfaces/TSONData.md)<`any`, `any`\>[]

Link to [TSON.forward](classes/TSON.md#forward).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any`[] |

#### Returns

[`TSONData`](interfaces/TSONData.md)<`any`, `any`\>[]

#### Defined in

index.ts:359

▸ **forward**(`value`): [`TSONData`](interfaces/TSONData.md)<`any`, `any`\>

Link to [TSON.forward](classes/TSON.md#forward).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`TSONData`](interfaces/TSONData.md)<`any`, `any`\>

#### Defined in

index.ts:359

___

### parse

▸ **parse**(`text`, `reviver?`): `any`

Link to [TSON.parse](classes/TSON.md#parse).

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `reviver?` | (`this`: `any`, `key`: `string`, `value`: `any`) => `any` |

#### Returns

`any`

#### Defined in

index.ts:365

___

### register

▸ **register**<`T`, `D`\>(`serializer`): `boolean`

Link to [TSON.register](classes/TSON.md#register).

#### Type parameters

| Name |
| :------ |
| `T` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serializer` | [`TSONSerializer`](interfaces/TSONSerializer.md)<`T`, `D`\> |

#### Returns

`boolean`

#### Defined in

index.ts:367

▸ **register**<`T`, `D`\>(`name`, `load`, `dump`, `match`, `recursive?`): `boolean`

Link to [TSON.register](classes/TSON.md#register).

#### Type parameters

| Name |
| :------ |
| `T` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `load` | (`data`: `D`) => `T` |
| `dump` | (`value`: `T`) => `D` |
| `match` | (`value`: `any`) => `boolean` |
| `recursive?` | `boolean` |

#### Returns

`boolean`

#### Defined in

index.ts:367

▸ **register**<`T`, `D`\>(`constructor`, `load`, `dump`, `match?`, `recursive?`): `boolean`

Link to [TSON.register](classes/TSON.md#register).

#### Type parameters

| Name |
| :------ |
| `T` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructor` | (...`data`: `any`) => `T` |
| `load` | (`data`: `D`) => `T` |
| `dump` | (`value`: `T`) => `D` |
| `match?` | ``null`` \| (`value`: `any`) => `boolean` |
| `recursive?` | `boolean` |

#### Returns

`boolean`

#### Defined in

index.ts:367

___

### stringify

▸ **stringify**(`value`, `replacer?`, `space?`): `string`

Link to [TSON.stringify](classes/TSON.md#stringify).

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `replacer?` | ``null`` \| (`this`: `any`, `key`: `string`, `value`: `any`) => `any` |
| `space?` | `number` |

#### Returns

`string`

#### Defined in

index.ts:363
