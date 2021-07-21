/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 16:22:27
 * @LastEditTime: 2021-07-21 16:58:21
 * @FilePath: /packages/reader/webpack-config/optimization.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const TerserPlugin = require('terser-webpack-plugin');
module.exports = projectInfo => {
    return {
        minimizer: [
            new TerserPlugin({
                parallel: true, //开启并行压缩
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    // 去掉console
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log'], // 移除console
                    },
                },
            }),
        ],
    };
};
