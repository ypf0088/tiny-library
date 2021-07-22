/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 17:37:27
 * @LastEditTime: 2021-07-22 20:45:04
 * @FilePath: /packages/algorithm/__tests__/data-structure/list.test.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { SingleList, SingleListNode } from '../../src';

describe('algorithm/data-structure/list', () => {
    test('测试类型检测正确性', () => {
        const node1: SingleListNode<number> = new SingleListNode(12);
        const list = new SingleList<any>();
        // 空链表删除
        expect(list.delete({ value: 12 }).toString()).toBe('[]');

        // 空链表插入
        list.insert(node1);

        expect(list.find(node1.value)).toBe(node1);

        const newNode: SingleListNode<string> = new SingleListNode('123');
        // 追加新节点
        expect(list.append(newNode).find(newNode.value)).toBe(newNode);
        expect(list.toString()).toBe('[12,"123"]');

        // 第二个参数在链表中不存在
        expect(list.insert(new SingleListNode(true), '1234').toString()).toBe('[12,"123",true]');
        // 不传第二个参数
        expect(list.insert(new SingleListNode(true)).toString()).toBe('[true,12,"123",true]');
        // 插入到第二个参数前面
        expect(list.insert(new SingleListNode({ name: '小明' }), 12).toString()).toBe(
            '[true,{"name":"小明"},12,"123",true]',
        );

        // 非空链表，删除存在的value
        expect(list.delete({ value: '123' }).toString()).toBe('[true,{"name":"小明"},12,true]');
        // 非空链表，删除不在数据
        expect(list.delete({ value: 1244 }).toString()).toBe('[true,{"name":"小明"},12,true]');
         // 非空链表，删除存在的node
        expect(list.delete({ node: node1 }).toString()).toBe('[true,{"name":"小明"},true]');
        // list.insert(new SingleListNode(true), '1234');
        // console.log(list.delete({ value: 12 }).toString());
    });
});
