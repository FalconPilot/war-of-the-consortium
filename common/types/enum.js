"use strict";
exports.__esModule = true;
exports.enumCodec = exports.isEnumValue = void 0;
var t = require("io-ts");
var isEnumValue = function (enumObject) { return function (value) {
    return (typeof value === 'string' || typeof value === 'number')
        && Object.values(enumObject).includes(value);
}; };
exports.isEnumValue = isEnumValue;
var enumCodec = function (enumName, enumType) {
    var isEnumValueFromParam = (0, exports.isEnumValue)(enumType);
    return new t.Type(enumName, isEnumValueFromParam, function (input, context) {
        return isEnumValueFromParam(input)
            ? t.success(input)
            : t.failure(input, context);
    }, t.identity);
};
exports.enumCodec = enumCodec;
