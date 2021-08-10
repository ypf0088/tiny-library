/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-10 09:54:35
 * @LastEditTime: 2021-08-10 11:28:55
 * @FilePath: /packages/shared/src/to-type.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

export const objectToString = Object.prototype.toString;

export const toTypeString = (value: unknown): string => objectToString.call(value);

export const toNumber = (val: any): number => {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
};

export const toInt = (val: any): number => {
    const n = parseInt(val);
    return isNaN(n) ? 0 : n;
};

export const toRawType = (value: unknown): string => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
};
