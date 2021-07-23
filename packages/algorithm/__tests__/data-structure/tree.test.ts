/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-23 16:36:50
 * @LastEditTime: 2021-07-23 17:23:15
 * @FilePath: /packages/algorithm/__tests__/data-structure/tree.test.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { AVLTree } from '../../src';

describe('algorithm/data-structure/single-linked-list', () => {
    test('测试单向链表', () => {
        const tree = new AVLTree();
        // 空链表删除
        Array.from({ length: 10 }).forEach((value, index) => {
            tree.insert(index)
        });
        Array.from({ length: 10 }).forEach((value, index) => {
            tree.insert(index + 9)
        });
        tree.travel()
        expect(tree.insert(5).toString()).toBe('');
        expect(tree.insert(12).toString()).toBe('');
    });
});

describe('algorithm/data-structure/doubly-linked-list', () => {
    test('测试双向链表', () => {});
});
