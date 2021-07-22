/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 12:37:26
 * @LastEditTime: 2021-07-22 11:16:09
 * @FilePath: /packages/reader/src/ts/event.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import { isArray } from '@tiny/shared';

window.onload = () => {
    console.log('加载完了么?', isArray(false));
    console.timeLog('dddd');
};
