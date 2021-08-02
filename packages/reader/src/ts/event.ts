/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 12:37:26
 * @LastEditTime: 2021-08-02 11:37:38
 * @FilePath: /packages/reader/src/ts/event.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

// 需要一个拖拽容器
// 需要一个放置容器
// 拖拽的dom节点
// 绑定相关事件
// 拖拽函数

import { downLoadImage, dataURLToBlob, uploadFile, copyText } from '@tiny/utils';
window.onload = () => {
    console.log('加载完了么?', document.designMode);

    // 定义绑定事件函数
    function bindEvent(ele: any, eventType: string, handler: Function): void {
        function getEventTarget(e: any) {
            e = window.event || e;
            return e.srcElement || e.target;
        }
        var _handler = function (e: Element) {
            var _node = getEventTarget(e);
            handler.bind(_node)(e);
        };
        ele = typeof ele === 'string' ? document.querySelector(ele) : ele;
        if (ele.attachEvent) {
            ele.attachEvent('on' + eventType, _handler);
        } else if (ele.addEventListener) {
            ele.addEventListener(eventType, _handler, false);
        }
    }

    var dargBox = document.querySelector('.drag-source-box');
    bindEvent(dargBox, 'drag', function (this: HTMLElement, e: Event) {
        // console.log(this, 'drag', '拖拽中')
    });
    bindEvent(dargBox, 'dragstart', function (this: HTMLElement, e: Event) {
        console.log(this === e.target, 'dragstart', '开始拖拽', e.target);
    });
    bindEvent(dargBox, 'dragend', function (this: HTMLElement, e: Event) {
        console.log(this, 'dragend', '拖拽结束');
    });

    const dragTargetBox = dargBox; // document.querySelector('.drag-target-box');

    bindEvent(dragTargetBox, 'dragenter', function (this: HTMLElement, e: Event) {
        // e.preventDefault();
        // console.log(this, 'dragenter', '进入目标元素')
    });

    bindEvent(dragTargetBox, 'dragover', function (this: HTMLElement, e: Event) {
        e.preventDefault();
        // console.log(this, 'dragover', '在目标元素中拖拽')
    });

    bindEvent(dragTargetBox, 'dragleave', function (this: HTMLElement, e: Event) {
        console.log(this, 'dragleave', '拖放离开目标元素');
    });

    bindEvent(dragTargetBox, 'drop', function (this: HTMLElement, e: Event) {
        console.log(this, 'drop', '拖放');
    });

    const downloadBtn: HTMLButtonElement = document.querySelector('#download') as HTMLButtonElement;

    bindEvent(downloadBtn, 'click', async () => {
        console.log('点击下载');
        const files: FileList | null = await uploadFile();
        console.log(files);
        const dataURL: string = await downLoadImage(
            'https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9lWENTUmp5TlljWnlNaE9nQ1pQSlhmQWliakZ1YklzTzdSd3VwdHBmeU9iVDBBNjFWZk5JWHJOSHM2eDY4OWliMndEUFBKTURjcW96RVhEd1J4cXBBUTN3LzY0MA?x-oss-process=image/format,png',
        );
        const file: Blob | null = dataURLToBlob(dataURL);
        console.log(file, '文件');
    });

    const copyTextBtn: HTMLButtonElement = document.querySelector('#copy') as HTMLButtonElement;
    bindEvent(copyTextBtn, 'click', () => {
        copyText('hjskdflasjdfljsalkdjflasjldfjl');
    });

    const computedBtn: HTMLButtonElement = document.querySelector('#computed') as HTMLButtonElement;
    bindEvent(computedBtn, 'click', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 88, 99];

        const map = new Map();

        for (let it of array) {
            if (map.has(it)) {
                map.set(it, map.get(it) + 1);
            } else {
                map.set(it, 1);
            }
        }

        return [...map].filter(([k, v]) => v <= 1).reduce((prev, next) => {
            return parseInt(prev) + parseInt(next[0])
        });
    });
};
