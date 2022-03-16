"use strict";
exports.__esModule = true;
exports.isLocale = exports.TranslationCodec = void 0;
var t = require("io-ts");
var locale_1 = require("../constants/locale");
exports.TranslationCodec = t.type({
    fr: t.string,
    en: t.string
});
var isLocale = function (x) {
    return typeof x === 'string' && Object.keys(locale_1.locales).includes(x);
};
exports.isLocale = isLocale;
