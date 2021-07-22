/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 11:35:57
 * @LastEditTime: 2021-07-22 11:41:46
 * @FilePath: /script/utils.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const fs = require('fs');

// 获取包
const targets = fs.readdirSync('packages').filter(f => {
    // 如果不是包，过滤
    if (!fs.statSync(`packages/${f}`).isDirectory()) return false;

    // 如果不需要打包，过滤
    const pkg = require(`../packages/${f}/package.json`);
    if (pkg.private || !pkg.buildOptions) {
        return false;
    }
    // 其他的，作为目标打包
    return true;
});

module.exports = {
    targets,
};
