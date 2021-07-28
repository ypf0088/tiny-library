/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-20 23:33:48
 * @LastEditTime: 2021-07-28 12:14:58
 * @FilePath: /packages/utils/src/file/upload-download.ts
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
            resolve(input.files);
        };
        document.body.append(input);
        input.click();
        input.remove();
    });

export const downLoadImage = (src: string) => {
    return new Promise(resolve => {
        const image: HTMLImageElement = document.createElement('image') as HTMLImageElement;
        image.style.cssText = cssText;
        image.setAttribute('crossorigin', 'anonymous');
        image.onload = (...e) => {
            console.log(e, image);
            const canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL('image/png'));
        };
        document.body.append(image);
        image.setAttribute('src', src);
        // image.onload();
        image.remove();
    });
};
