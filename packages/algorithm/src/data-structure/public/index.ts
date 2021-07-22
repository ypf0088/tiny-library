/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 17:25:31
 * @LastEditTime: 2021-07-22 17:25:32
 * @FilePath: /packages/algorithm/src/data-structure/public/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
export class DataNode<T> {
    public value: T;
    constructor(value: T) {
        this.value = value;
    }
}