/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 16:22:27
 * @LastEditTime: 2021-07-21 16:34:09
 * @FilePath: /packages/reader/webpack-config/entry.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const path = require('path');
const fs = require('fs');
module.exports = projectInfo => {
    let jsPath = path.join(projectInfo.entry, 'ts');
    let files = fs.readdirSync(jsPath);
    let result = {};
    files.forEach(fileName => {
        if (/.ts$/.test(fileName)) {
            let name = fileName.replace(/.ts/, '');
            result[name] = path.join(jsPath, fileName);
        }
    });
    return result;
};
