/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 16:22:27
 * @LastEditTime: 2021-07-21 16:34:29
 * @FilePath: /packages/reader/webpack-config/resolve.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const path = require('path');
module.exports = projectInfo => {
    return {
        extensions: ['.js', '.ts', '.scss', '.css'],
        alias: {},
    };
};
