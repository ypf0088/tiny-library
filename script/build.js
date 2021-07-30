/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 11:20:59
 * @LastEditTime: 2021-07-30 13:02:33
 * @FilePath: /script/build.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */

const fs = require('fs');
const execa = require('execa');
const chalk = require('chalk');
const path = require('path');
const { targets: allTargets } = require('./utils');

function getTargetInfo(target) {}

async function build(target) {
    const pkgDir = path.resolve(`packages/${target}`);
    const pkgJson = require(`${pkgDir}/package.json`);
    // 清理目录
    fs.rmdirSync(`${pkgDir}/dist`, {
        recursive: true,
    });
    // 执行rollup打包
    await execa(
        'rollup',
        ['-c', '--environment', [`NODE_ENV: development`, `TARGET:${target}`].filter(Boolean).join(',')],
        { stdio: 'inherit' },
    );

    // 执行生成types
    if (!pkgJson.types) return;

    console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)));
    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
    const extractorResult = Extractor.invoke(extractorConfig, {
        localBuild: true,
        showVerboseMessages: true,
    });
    if (extractorResult.succeeded) {
        // concat additional d.ts to rolled-up dts
        const typesDir = path.resolve(pkgDir, 'types');
        if (fs.existsSync(typesDir)) {
            const dtsPath = path.resolve(pkgDir, pkg.types);
            const existing = await fs.readFile(dtsPath, 'utf-8');
            const typeFiles = await fs.readdir(typesDir);
            const toAdd = await Promise.all(
                typeFiles.map(file => {
                    return fs.readFile(path.resolve(typesDir, file), 'utf-8');
                }),
            );
            await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'));
        }
        console.log(chalk.bold(chalk.green(`${target}'s API Extractor completed successfully.`)));
    } else {
        console.error(
            `API Extractor completed with ${extractorResult.errorCount} errors` +
                ` and ${extractorResult.warningCount} warnings`,
        );
        process.exitCode = 1;
    }

    // 清理目录
    fs.rmdirSync(`${pkgDir}/dist/packages`, {
        recursive: true,
    });
}

async function buildTypes(target) {}
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
}
// 开始执行
run();
