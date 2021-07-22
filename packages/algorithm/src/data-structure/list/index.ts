/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 17:16:37
 * @LastEditTime: 2021-07-22 20:41:47
 * @FilePath: /packages/algorithm/src/data-structure/list/index.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import { DataNode } from '../public';
export class SingleListNode<T> extends DataNode<T> {
    public next: SingleListNode<T> | null = null;
    constructor(value: T) {
        super(value);
    }
}

export class SingleList<T> {
    public head: SingleListNode<T> | null;
    private last: SingleListNode<T> | null = null;
    constructor(node?: SingleListNode<T>) {
        this.head = node ?? null;
        this.last = this.head;
    }

    insert(node: SingleListNode<T>, value?: T) {
        // 如果头节点不存在，直接放头节点就好
        if (!this.head) {
            this.head = node;
            this.last = this.head;
            return this;
        }
        // value 不存在 或者 头节点的值等于value 的时候，直接插入到头节点即可
        if (!value || this.head.value === value) {
            node.next = this.head;
            this.head = node;
            return this;
        }
        //
        let current = this.head;
        let next = current.next;
        while (next && next.value !== value) {
            current = next;
            next = next.next;
        }

        // 插入节点
        current.next = node;
        if (next) {
            node.next = next;
            return this;
        }
        // 最后一个节点，需要修改一下末尾标记
        this.last = node;
        return this;
    }

    append(node: SingleListNode<T>) {
        if (this.last) {
            this.last.next = node;
            return this;
        }
        this.head = node;
        this.last = this.head;
        return this;
    }

    find(value?: T) {
        let node: SingleListNode<T> | null = this.head;
        while (node && node.value !== value) {
            node = node.next;
        }
        return node;
    }

    delete({ node, value }: { node?: SingleListNode<T> | null; value?: T }) {
        // 节点存在的时候，优先节点，不存在的时候，先根据value找到节点
        node = node || this.find(value);
        if (!node || !this.head) return this;
        if (node === this.head) {
            this.last = this.head = null;
            return this;
        }

        let prevNode: SingleListNode<T> = this.head;
        while (prevNode.next && prevNode.next !== node) {
            prevNode = prevNode.next;
        }

        if (node.next === null) {
            // 如果目标是尾节点
            prevNode.next = null;
            this.last = prevNode;
        } else {
            // 如果不是末尾节点
            prevNode.next = node.next;
        }
        return this;
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
