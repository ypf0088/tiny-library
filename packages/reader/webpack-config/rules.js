/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 16:22:27
 * @LastEditTime: 2021-07-21 16:55:30
 * @FilePath: /packages/reader/webpack-config/rules.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const path = require('path');
module.exports = projectInfo => {
    return [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader?cacheDirectory',
                },
                {
                    loader: 'thread-loader',
                    options: {
                        workers: 4,
                    },
                },
            ],
        },
    ];
};
