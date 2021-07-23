/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 22:25:08
 * @LastEditTime: 2021-07-23 10:07:37
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
        node = node ?? this.find(value);
        // 节点不存在、链表为空，直接返回
        if (!node || !this.head) return this;

        const preNode = node.prev;
        const nextNode = node.next;

        // 如果前节点不存在，表示找到的就是头节点
        if (!preNode) {
            if (!nextNode) {
                this.head = this.last = null;
            } else {
                nextNode.prev = null;
                this.head = nextNode;
            }
            return this;
        }

        // 如果后节点不存在，表示找到的就是尾节点
        if (!nextNode) {
            preNode.next = null;
            this.last = preNode;
            return this;
        }

        // 如果两个节点都存在
        preNode.next = nextNode;
        nextNode.prev = preNode;
        return this;
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
