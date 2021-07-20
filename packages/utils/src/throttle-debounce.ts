/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 22:16:25
 * @LastEditTime: 2021-07-20 23:31:03
 * @FilePath: /packages/utils/src/throttle-debounce.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

export const debounce = (fn: Function, timeout: number = 500) => {
    let timer: any = null;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(null, args);
        }, timeout);
    };
};

export const throttle = (fn: Function, timeout: number = 500) => {
    let canRun: boolean = true;
    return (...args: any[]) => {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(null, args);
            canRun = true;
        });
    };
};
