/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 07:56:00
 * @LastEditTime: 2021-08-09 11:05:50
 * @FilePath: /packages/shared/src/is-type.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

// 原型方法
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const objectToString = Object.prototype.toString;

export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key);
export const toTypeString = (value: unknown): string => objectToString.call(value);

// 判断类型
export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';

export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isNumber = (val: unknown): val is string => typeof val === 'number';
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
