/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-05 15:56:23
 * @LastEditTime: 2021-08-09 10:41:01
 * @FilePath: /packages/utils/src/canvas/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { dataURLToBlob } from '../file';

export const captureImage = (url: string) => {
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.autoplay = true;
        video.src = url;
        video.addEventListener('loadeddata', e => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (!context) return;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const file = dataURLToBlob(canvas.toDataURL());
            video.pause();
            resolve(file);
        });
    });
};
