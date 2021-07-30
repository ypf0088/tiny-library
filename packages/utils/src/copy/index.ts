/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:36:23
 * @LastEditTime: 2021-07-30 10:50:34
 * @FilePath: /packages/utils/src/copy/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { hideDomCssText as cssText } from '../public';

export const copyText = (str: string): boolean => {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.style.cssText = cssText;
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    const result: boolean = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
};
