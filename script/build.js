/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 11:20:59
 * @LastEditTime: 2021-07-22 14:12:53
 * @FilePath: /script/build.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const fs = require('fs');
const execa = require('execa');
const path = require('path');
const { targets: allTargets } = require('./utils');

async function build(target) {
    console.log('执行', target);
    const pkgDir = path.resolve(`packages/${target}`);
    const pkgJson = require(`${pkgDir}/package.json`);
    // 清理目录
    fs.rmdirSync(`${pkgDir}/dist`, {
        recursive: true,
    });
    // 执行rollup打包
    await execa(
        'rollup',
        [
            '-c',
            '--environment',
            [
                `NODE_ENV: development`, 
                `TARGET:${target}`
            ]
            .filter(Boolean)
            .join(',')
        ],
        { stdio: 'inherit' },
    );
}
async function buildAll(targets) {
    const cpus = require('os').cpus().length;

    const ret = [];
    const executing = [];

    for (const item of targets) {
        const p = Promise.resolve().then(() => build(item));
        ret.push(p);
        if (cpus <= targets.length) {
            const e = p.then(() => {
                return executing.splice(executing.indexOf(e), 1);
            });
            executing.push(e);
            if (executing.length >= cpus) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

async function run() {
    await buildAll(allTargets);
    // execa('pwd', ['-L'], { stdio: 'inherit' });
    // await execa('pwd', [
    //     '-L'
    // ]);
}
// 开始执行
run();
