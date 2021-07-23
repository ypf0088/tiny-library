/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 17:37:27
 * @LastEditTime: 2021-07-23 16:37:23
 * @FilePath: /packages/algorithm/__tests__/data-structure/list.test.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { SingleLinkedList, SingleLinkedListNode, DoublyLinkedListNode, DoublyLinkedList } from '../../src';

describe('algorithm/data-structure/single-linked-list', () => {
    test('测试单向链表', () => {
        const node1: SingleLinkedListNode<number> = new SingleLinkedListNode(12);
        const list = new SingleLinkedList<any>();
        // 空链表删除
        expect(list.delete({ value: 12 }).toString()).toBe('[]');

        // 空链表插入
        list.insert(node1);

        expect(list.find(node1.value)).toBe(node1);

        const newNode: SingleLinkedListNode<string> = new SingleLinkedListNode('123');
        // 追加新节点
        expect(list.append(newNode).find(newNode.value)).toBe(newNode);
        expect(list.toString()).toBe('[12,"123"]');

        // 第二个参数在链表中不存在
        expect(list.insert(new SingleLinkedListNode(true), '1234').toString()).toBe('[true,12,"123"]');
        // 不传第二个参数
        expect(list.insert(new SingleLinkedListNode(true)).toString()).toBe('[true,true,12,"123"]');
        // 插入到第二个参数前面
        expect(list.insert(new SingleLinkedListNode({ name: '小明' }), 12).toString()).toBe(
            '[true,true,{"name":"小明"},12,"123"]',
        );

        // 非空链表，删除存在的value
        expect(list.delete({ value: '123' }).toString()).toBe('[true,true,{"name":"小明"},12]');
        // 非空链表，删除不在数据
        expect(list.delete({ value: 1244 }).toString()).toBe('[true,true,{"name":"小明"},12]');
        // 非空链表，删除存在的node
        expect(list.delete({ node: node1 }).toString()).toBe('[true,true,{"name":"小明"}]');
    });
});

describe('algorithm/data-structure/doubly-linked-list', () => {
    test('测试双向链表', () => {
        const node1: DoublyLinkedListNode<number> = new DoublyLinkedListNode(12);
        const list = new DoublyLinkedList<any>();
        // 空链表删除
        expect(list.delete({ value: 12 }).toString()).toBe('[]');

        // // 空链表插入
        list.insert(node1);

        expect(list.find(node1.value)).toBe(node1);

        const newNode: DoublyLinkedListNode<string> = new DoublyLinkedListNode('123');
        // // 追加新节点
        expect(list.append(newNode).find(newNode.value)).toBe(newNode);
        expect(list.toString()).toBe('[12,"123"]');

        // // 第二个参数在链表中不存在
        expect(list.insert(new DoublyLinkedListNode(true), '1234').toString()).toBe('[true,12,"123"]');
        // // 不传第二个参数
        expect(list.insert(new DoublyLinkedListNode(true)).toString()).toBe('[true,true,12,"123"]');
        // 插入到第二个参数前面
        expect(list.insert(new DoublyLinkedListNode({ name: '小明' }), 12).toString()).toBe(
            '[true,true,{"name":"小明"},12,"123"]',
        );

        // 非空链表，删除存在的value
        expect(list.delete({ value: '123' }).toString()).toBe('[true,true,{"name":"小明"},12]');
        // 非空链表，删除不在数据
        expect(list.delete({ value: 1244 }).toString()).toBe('[true,true,{"name":"小明"},12]');
        // 非空链表，删除存在的node
        expect(list.delete({ node: node1 }).toString()).toBe('[true,true,{"name":"小明"}]');
    });
});
