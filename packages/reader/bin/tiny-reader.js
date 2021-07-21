#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');
const { argv } = require('yargs');

// 工作空间
const workspace = path.join(__dirname, '../')

// 给node环境添加运行参数条件
process.env.NODE_ENV = argv._.join(',')

// 切换目录执行
shell.exec(`cd ${workspace}; gulp;`);
