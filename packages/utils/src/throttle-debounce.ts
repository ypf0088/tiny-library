/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 22:16:25
 * @LastEditTime: 2021-08-06 11:09:58
 * @FilePath: /packages/utils/src/throttle-debounce.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

export function debounce<C, T extends unknown[]>(
    fn: (this: C, ...args: T) => unknown,
    interval: number = 200,
) {
    let timer: any;
    return function (this: C, ...args: T) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args);
        }, interval);
    };
}

export function throttle<C, T extends unknown[]>(
    fn: (this: C, ...args: T) => unknown,
    interval: number = 200,
) {
    let canRun: boolean = true;
    return function (this: C, ...args: T): void {
        if (!canRun) {
            canRun = true;
            setTimeout(() => {
                canRun = false;
                fn.call(this, ...args); // this 报语法错误，先用 null
            }, interval);
        }
    };
}
