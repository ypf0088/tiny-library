/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:36:23
 * @LastEditTime: 2021-07-28 18:18:33
 * @FilePath: /packages/utils/src/copy/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { hideDomCssText as cssText } from '../public';

export const copyText = (str: string, fn?: Function): void => {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.style.cssText = cssText;
    textarea.value = str;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    fn && fn();
};
