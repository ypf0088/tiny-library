/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 10:42:58
 * @LastEditTime: 2021-07-30 13:08:21
 * @FilePath: /rollup.config.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import path from 'path';

if (!process.env.TARGET) {
    throw new Error('TARGET package must be specified via --environment flag.');
}
const TARGET = process.env.TARGET;

const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, TARGET);
const resolve = p => path.resolve(packageDir, p);
const packageJson = require(resolve('package.json'));
const buildOptions = packageJson.buildOptions;

const plugins = format => {
    const { terser } = require('rollup-plugin-terser');
    const ts = require('rollup-plugin-typescript2');
    const commonjs = require('@rollup/plugin-commonjs');
    const { nodeResolve } = require('@rollup/plugin-node-resolve');

    const shouldEmitDeclarations = !!packageJson.types;

    const tsPlugin = ts({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: false,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations,
            },
            exclude: ['**/__tests__', 'test-dts'],
        },
    });
    return [
        tsPlugin,
        commonjs({
            sourceMap: true,
        }),
        require('rollup-plugin-polyfill-node')(),
        nodeResolve(),
        terser({
            module: /^esm/.test(format),
            compress: {
                ecma: 2015,
                pure_getters: true,
            },
            safari10: true,
            ie8: true,
        }),
    ];
};
// 需要打包出来的格式
const defaultFormats = ['amd', 'cjs', 'esm', 'iife', 'umd', 'system'];

// 配置文件生成
const packageConfigs = defaultFormats.map(format => ({
    input: resolve('src/index.ts'),
    output: {
        file: resolve(`dist/${TARGET}.${format}.js`),
        format: format,
        name: `Tiny${TARGET}`,
    },
    plugins: plugins(format),
}));

export default packageConfigs;
