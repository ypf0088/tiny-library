/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 10:42:58
 * @LastEditTime: 2021-07-22 11:34:47
 * @FilePath: /packages/shared/rollup.config.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import path from 'path';
import ts from 'rollup-plugin-typescript2';

const packageDir = __dirname;
const resolve = p => path.resolve(packageDir, p);

const tsPlugin = ts({
    tsconfig: resolve('tsconfig.json'),
    tsconfigOverride: {
        compilerOptions: {
            sourceMap: false,
            declaration: false,
            declarationMap: false,
        },
        exclude: ['**/__tests__', 'test-dts'],
    },
});
const commonConf = {
    plugins: [tsPlugin],
};
// 需要打包出来的格式
const defaultFormats = ['amd', 'cjs', 'esm', 'iife', 'umd', 'system'];

// 配置文件生成
const packageConfigs = defaultFormats.map(format =>
    Object.assign({}, commonConf, {
        input: resolve('src/index.ts'),
        output: {
            file: `dist/tiny-shared.${format}.js`,
            format: format,
            name: 'TinyShared',
        },
    }),
);

export default packageConfigs;
