/*
 * @Author: your name
 * @Date: 2020-11-13 19:54:18
 * @LastEditTime: 2021-07-21 16:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /packages/reader/webpack.config.js
 */
//entry
const entry = require('./webpack-config/entry');
//output
const output = require('./webpack-config/output');
//loaders
const rules = require('./webpack-config/rules');
//resolve
const resolve = require('./webpack-config/resolve');
//optimization
const optimization = require('./webpack-config/optimization');

module.exports = projectInfo => {
    return {
        mode: projectInfo.mode,
        target: ['web', 'es5'],
        entry: entry(projectInfo),
        output: output(projectInfo),
        module: {
            rules: rules(projectInfo),
        },
        resolve: resolve(projectInfo),
        optimization: optimization(projectInfo),
        devtool: projectInfo.mode == 'production' ? false : 'eval-cheap-module-source-map',
    };
};
