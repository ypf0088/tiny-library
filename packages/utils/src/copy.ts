/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:36:23
 * @LastEditTime: 2021-07-20 23:47:24
 * @FilePath: /packages/utils/src/copy.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const cssText: string = `postion: absolute;width: 0px;height: 0px;opacity: 0;z-index: -1;`;

export const copyText = (str: string, fn: Function): void => {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.style.cssText = cssText;
    textarea.value = str;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    fn && fn();
};
