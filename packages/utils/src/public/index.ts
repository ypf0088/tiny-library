/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-28 18:13:54
 * @LastEditTime: 2021-08-06 15:28:57
 * @FilePath: /packages/utils/src/public/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { hasOwn, isObject, isBoolean } from '@tiny/shared';
export const hideDomCssText: string =
    'postion: absolute;width: 0px;height: 0px;opacity: 0;z-index: -1;';

interface extendedType {
    [key: string]: object;
}
export const extend = (...args: any[]) => {
    let extended: extendedType = {};
    let i: number = 0;
    let deep: boolean = false;

    /* Check if a deep merge */
    if (isBoolean(args[0])) {
        deep = args[0];
        i++;
    }

    const merge = (obj: object) => {
        for (let prop in obj) {
            if (hasOwn(obj, prop)) {
                if (isObject(obj[prop])) {
                    extended[prop] = extend(deep, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    /* Loop through each object and conduct a merge */
    for (; i < length; i++) {
        let obj = args[i];
        merge(obj);
    }

    return extended;
};
