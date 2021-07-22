/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 22:25:08
 * @LastEditTime: 2021-07-22 23:48:11
 * @FilePath: /packages/algorithm/src/data-structure/list/doubly-linked-list.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import { DataNode } from '../public';

export class DoublyLinkedListNode<T> extends DataNode<T> {
    prev: DoublyLinkedListNode<T> | null = null;
    next: DoublyLinkedListNode<T> | null = null;

    constructor(value: T) {
        super(value);
    }
}

export class DoublyLinkedList<T> {
    head: DoublyLinkedListNode<T> | null;
    last: DoublyLinkedListNode<T> | null;

    constructor(head?: DoublyLinkedListNode<T>) {
        this.last = this.head = head ?? null;
    }

    insert(node: DoublyLinkedListNode<T>, value?: T) {
        if (!this.head || !this.last) {
            this.last = this.head = node;
            return this;
        }
        // 如果查找不到，就插入头部
        const currentNode: DoublyLinkedListNode<T> | null = this.find(value);
        if (!currentNode || this.head.value === value) {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
            return this;
        }
        const prevNode = currentNode.prev;
        if (prevNode) {
            node.next = currentNode;
            node.prev = prevNode;

            prevNode.next = node;
            currentNode.prev = node;
        }
        return this;
    }

    append(node: DoublyLinkedListNode<T>) {
        if (this.last) {
            node.prev = this.last;
            this.last.next = node;
            this.last = node;
            return this;
        }
        this.head = this.last = node;
        return this;
    }

    delete({ node, value }: { node?: DoublyLinkedListNode<T> | null; value?: T }) {
    }

    find(value?: T) {
        let node: DoublyLinkedListNode<T> | null = this.head;
        while (node && node.value !== value) {
            node = node.next;
        }
        return node;
    }

    toString() {
        const vals: Array<T> = [];
        let node = this.head;
        while (node) {
            vals.push(node.value);
            node = node.next;
        }
        return JSON.stringify(vals);
    }
}
