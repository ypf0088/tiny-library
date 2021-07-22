/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 12:37:26
 * @LastEditTime: 2021-07-22 16:54:54
 * @FilePath: /packages/reader/src/ts/event.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

// 需要一个拖拽容器
// 需要一个放置容器
// 拖拽的dom节点
// 绑定相关事件
// 拖拽函数
window.onload = () => {
    console.log('加载完了么?');
    

    // 定义绑定事件函数
    function bindEvent(ele: any, eventType: string, handler: Function): void{
        function getEventTarget(e: any) {
            e = window.event || e;
            return e.srcElement || e.target; 
        }
        var _handler = function(e: Element) {
            var _node = getEventTarget(e)
            handler.bind(_node)(e)
        }
        ele = typeof ele ==='string' ? document.querySelector(ele) : ele;
        if(ele.attachEvent) {
            ele.attachEvent("on" + eventType, _handler);
        } else if(ele.addEventListener) {
            ele.addEventListener(eventType, _handler, false);
        }
    }

    var dargBox = document.querySelector('.drag-source-box');
    bindEvent(dargBox, 'drag', function(this: HTMLElement, e: Event) {
        // console.log(this, 'drag', '拖拽中')
    });
    bindEvent(dargBox, 'dragstart', function(this: HTMLElement, e: Event) {
        console.log(this === e.target, 'dragstart', '开始拖拽', e.target)
    });
    bindEvent(dargBox, 'dragend', function(this: HTMLElement, e: Event) {
        console.log(this, 'dragend', '拖拽结束')
    });

    const dragTargetBox = dargBox // document.querySelector('.drag-target-box');

    bindEvent(dragTargetBox, 'dragenter', function(this: HTMLElement, e: Event) {
        // e.preventDefault();
        // console.log(this, 'dragenter', '进入目标元素')
    })

    bindEvent(dragTargetBox, 'dragover', function(this: HTMLElement ,e: Event) {
        e.preventDefault();
        // console.log(this, 'dragover', '在目标元素中拖拽')
    })

    bindEvent(dragTargetBox, 'dragleave', function(this: HTMLElement, e: Event) {
        console.log(this, 'dragleave', '拖放离开目标元素')
    })

    bindEvent(dragTargetBox, 'drop', function(this: HTMLElement, e: Event) {
        console.log(this, 'drop', '拖放')
    })
};
