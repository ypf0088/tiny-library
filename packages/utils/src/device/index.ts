/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-02 09:28:22
 * @LastEditTime: 2021-08-02 10:49:11
 * @FilePath: /packages/utils/src/device/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const androidOrIOS = (): string => {
    const agent: string = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|ios/.test(agent)) return 'IOS';
    return 'Android';
};

const isAndroid = (): boolean => androidOrIOS() === 'Android';

const isIOS = (): boolean => androidOrIOS() === 'IOS';
