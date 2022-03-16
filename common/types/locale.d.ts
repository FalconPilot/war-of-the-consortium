import * as t from 'io-ts';
import { locales } from '../constants/locale';
export declare type Locale = keyof typeof locales;
export declare const TranslationCodec: t.TypeC<{
    [k in Locale]: t.StringC;
}>;
export declare type Translation = t.TypeOf<typeof TranslationCodec>;
export declare const isLocale: (x: unknown) => x is "fr" | "en";
