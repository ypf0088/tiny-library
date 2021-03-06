/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:33:48
 * @LastEditTime: 2021-08-06 15:28:13
 * @FilePath: /packages/utils/src/file/upload-download.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { hideDomCssText as cssText } from '../public';

const DefaultOptions = {
    multiple: false,
    accept: 'image/png,image/jpg,image/jpeg,image/gif',
};
/**
 * @Author: yourname
 * @Date: 2021-07-28 17:04:21
 * @description: 从本地获取文件
 * @param {*}
 * @return {Promise<FileList | null>} 获取到的文件列表
 */
export const uploadFile = (options: object): Promise<FileList | null> => {
    const opts = Object.assign(DefaultOptions, options);
    return new Promise(resolve => {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.style.cssText = cssText;
        input.multiple = opts.multiple;
        input.accept = opts.accept;
        input.onchange = e => {
            resolve(input.files);
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
};

/**
 * @Author: yourname
 * @Date: 2021-07-28 17:01:34
 * @description: 下载图片
 * @param {string} src: 图片地址
 * @return {Promise<string>} 图片canvas裁剪dataURl 的 Promise
 */
export const downLoadImage = (src: string): Promise<string> =>
    new Promise(resolve => {
        const image: HTMLImageElement = document.createElement(
            'img',
        ) as HTMLImageElement;
        image.style.cssText = cssText;
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = e => {
            const canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx: CanvasRenderingContext2D = canvas.getContext(
                '2d',
            ) as CanvasRenderingContext2D;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL('image/png'));
        };
        document.body.appendChild(image);
        image.setAttribute('src', src);
        document.body.removeChild(image);
        // image.remove();
    });
