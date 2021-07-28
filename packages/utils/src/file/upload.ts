/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:33:48
 * @LastEditTime: 2021-07-28 21:45:50
 * @FilePath: /packages/utils/src/file/upload.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const cssText: string = `visibility: hidden; height: 0px; z-index: -9999;`;

export const uploadFile = () =>
    new Promise(resolve => {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.style.cssText = cssText;
        input.type = 'file';
        input.onchange = e => {
            console.log(e, input.files);
            resolve(input.files);
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
        // input.remove();
    });
