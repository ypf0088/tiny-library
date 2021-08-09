/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-09 12:57:35
 * @LastEditTime: 2021-08-09 15:29:02
 * @FilePath: /packages/utils/src/cookie/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { isDate } from '@tiny/shared';

type Cookies = {
    [key: string]: string;
};

export function getCookie(key: string): string {
    const cookies = document.cookie.split(';');
    const cookieObj: Cookies = {};
    cookies.map(item => {
        const cookie = item.trim().split('=');
        cookieObj[cookie[0]] = cookie[1];
    });
    return unescape(cookieObj[key]);
}

export function setCookie(key: string, value: string, expires?: number) {
    if (isDate(expires)) {
        const date = new Date(+new Date() + expires);
        document.cookie = `${key}=${escape(
            value,
        )};expires=${date.toUTCString()}`;
    } else {
        document.cookie = `${key}=${escape(value)}`;
    }
}

export function delCookie(key: string) {
    setCookie(key, '', -1);
}
