/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 07:54:31
 * @LastEditTime: 2021-07-21 08:01:49
 * @FilePath: /packages/shared/__tests__/is-type.test.ts
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import { isArray } from '../src';

describe('shared/is-type', () => {
    test('测试类型检测正确性', () => {
        expect(isArray([])).toBe(true);
        expect(isArray(false)).toBe(false);
    });
});
