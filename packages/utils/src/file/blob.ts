/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-26 08:46:34
 * @LastEditTime: 2021-07-26 09:01:31
 * @FilePath: /packages/utils/src/file/blob-file.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const regexp: RegExp = /:(.*?);/;
/**
 * @Author: yourname
 * @Date: 2021-07-26 08:52:45
 * @description:
 * @param {string} urlData
 * @param {*} type
 * @return {*}
 */
export const dataURLToBlob = (dataurl: string) => {
    const arr: string[] = dataurl.split(',');
    const mimeRegexp = arr[0].match(regexp);
    if (!mimeRegexp) return null;
    const mime: string = mimeRegexp[1];
    const bytes = window.atob(arr[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
};

/**
 * @Author: yourname
 * @Date: 2021-07-26 08:51:55
 * @description:
 * @param {Blob} blob
 * @param {string} fileName: 文件名
 * @return {*}
 */
export const blobToFile = (blob: Blob, fileName: string): File => new File([blob], fileName);
