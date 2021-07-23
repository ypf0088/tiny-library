/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-23 15:21:48
 * @LastEditTime: 2021-07-23 17:42:41
 * @FilePath: /packages/algorithm/src/data-structure/tree/avl-tree.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

import { DataNode } from '../public';

export class TreeNode extends DataNode<any> {
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(value: any) {
        super(value);
    }

    rightHeight(): number {
        return this.right?.height() || 0;
    }

    leftHeight(): number {
        return this.left?.height() || 0;
    }

    height(): number {
        const leftHeight: number = !this.left ? 0 : this.left.height();
        const rightHeight: number = !this.right ? 0 : this.right.height();
        return Math.max(leftHeight, rightHeight) + 1;
    }

    find(value: any): TreeNode | null {
        if (value === this.value) return this;

        const findNode: TreeNode | null = value >= this.value ? this.right : this.left;

        if (!findNode) return null;
        return findNode.find(value);
    }
}

export class AVLTreeNode extends TreeNode {
    constructor(value: any) {
        super(value);
    }

    insert(node: TreeNode): void {
        if (!node) return;
        // 添加节点
        if (node.value >= this.value) {
            if (this.right) {
                (this.right as AVLTreeNode).insert(node);
            } else {
                this.right = node;
            }
        } else {
            if (this.left) {
                (this.left as AVLTreeNode).insert(node);
            } else {
                this.left = node;
            }
        }

        // 摇树，保持平衡
        // 当添加完一个节点后，如果右子树的高度-左子树的高度>1，左选择
        if (this.rightHeight() - this.leftHeight() > 1) {
            // 如果的它的右子树的左子树大于它的右子树的右子树的高度
            if (this.right && this.right.leftHeight() > this.right.rightHeight()) {
                // 先对其当前节点的右子树进行右旋转
                (this.right as AVLTreeNode).rightRotate();
            }
            // 左旋转
            this.leftRotate();
            return; // 阻止继续判断
        }
        // 当添加完后，如果左子树的高度-右子树的高度>1,右旋转
        if (this.leftHeight() - this.rightHeight() > 1) {
            // 如果它的左子树的右子树大于它的左子树的左子树的高度
            if (this.left && this.left.rightHeight() > this.left.leftHeight()) {
                // 先对其当前节点的左节点进行左旋转
                (this.left as AVLTreeNode).leftRotate();
            }
            this.rightRotate();
        }
    }

    leftRotate(): void {
        //创建新的节点，以当前根节点的值
        let newNode: AVLTreeNode = new AVLTreeNode(this.value);
        //把新的节点的左子树设置成当前节点的左子树
        newNode.left = this.left;
        //把新的节点的右子树设置成过去节点的右子树的左子树
        newNode.right = this.right?.left || null; // ? this.right.left : null;
        //把当前节点的值替换成右子节点的值
        this.value = this.right?.value || null;
        //把当前节点的右子树设置成当前节点右子树的右子树
        this.right = this.right?.right || null;
        //把当前节点的左子树设置成新的节点
        this.left = newNode;
    }

    rightRotate(): void {
        let newNode: AVLTreeNode = new AVLTreeNode(this.value);
        newNode.right = this.right;
        newNode.left = this.left?.right || null;
        this.value = this.left?.value || null;
        this.left = this.left?.left || null;
        this.right = newNode;
    }

    print(): void {
        console.log(this.left?.value, this.right?.value);
    }
}

export class AVLTree {
    root: AVLTreeNode | null;
    constructor(node?: AVLTreeNode) {
        this.root = node ?? null;
    }

    insert(value: any): AVLTree {
        const node: AVLTreeNode = new AVLTreeNode(value);
        if (!this.root) {
            this.root = node;
            return this;
        }

        this.root.insert(node);
        return this;
    }

    find(value: any): AVLTreeNode | null {
        if (!this.root) {
            return null;
        }
        return this.root.find(value) as AVLTreeNode;
    }

    travel(type = 'pre') {
        switch (type) {
            case 'pre':
                return this.preTravel();
                // return this.preTravel(this.root);
        }
    }

    private preTravel() {
        if (!this.root) return;
        const stack = [this.root];
        while(stack.length > 0) {
            const node = stack.pop();
            if(!node) return;
            console.log(node.value)
            if(node.right){
                stack.push(node.right as AVLTreeNode)
            }
            if(node.left) {
                stack.push(node.left as AVLTreeNode)
            }

        }
    }

    // private preTravel(node: AVLTreeNode | null) {
    //     if (!node) return;
    //     console.log(node.value);
    //     this.preTravel(node.left as AVLTreeNode);
    //     this.preTravel(node.right as AVLTreeNode);
    // }

    toString(): string {
        console.log(this.root);
        console.log(this.root?.height());
        // if(!this.root) return '[]'
        return '';
    }

    print() {
        if (!this.root) return;
        this.root.print();
    }
}
