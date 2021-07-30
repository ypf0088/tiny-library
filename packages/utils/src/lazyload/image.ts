/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-29 09:47:45
 * @LastEditTime: 2021-07-29 15:48:57
 * @FilePath: /packages/utils/src/lazyload/image.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const clientHeight: number = document.body.clientHeight;

type LazyLoadOptions = {};

class Lazyload {
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
