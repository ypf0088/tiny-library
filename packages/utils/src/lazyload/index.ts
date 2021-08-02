/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-29 09:47:45
 * @LastEditTime: 2021-08-02 10:31:49
 * @FilePath: /packages/utils/src/lazyload/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const clientHeight: number = document.body.clientHeight;

type LazyLoadOptions = {};
const defaultOptions = {
    src: 'data-src',
    srcset: 'data-srcset',
    selector: '.lazyload',
    root: null,
    rootMargin: '0px',
    threshold: 0,
};

export class Lazyload {
    static instance: Lazyload;
    constructor(options: LazyLoadOptions) {
        return this.init(options);
    }

    init(options: LazyLoadOptions) {
        if (!Lazyload.instance) {
            // this.observer = null
            Lazyload.instance = this;
        }
        return Lazyload.instance;
    }

    // 需要一个更新执行器
    upload() {}

    //
}
