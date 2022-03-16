import * as t from 'io-ts';
import { ValueOf } from './core';
export declare const isEnumValue: <T extends {
    [k: string]: string | number;
}>(enumObject: T) => (value: unknown) => value is ValueOf<T>;
export declare const enumCodec: <T extends string, TEnumValue extends string | number>(enumName: string, enumType: { [k in T]: TEnumValue; }) => t.Type<TEnumValue, TEnumValue, unknown>;
