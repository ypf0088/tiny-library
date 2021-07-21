/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-21 09:51:15
 * @LastEditTime: 2021-07-21 16:50:31
 * @FilePath: /packages/reader/gulpfile.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
const path = require('path');
const { src, dest, series, parallel, watch } = require('gulp');
// parallel:并行任务,series:串行任务
const gulpClean = require('gulp-clean');
const gulpFileInclude = require('gulp-file-include');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const gulpAutoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack');

//项目信息
const projectInfo = (params => {
    let result = {
        dirname: path.join(__dirname),
        entry: path.join(__dirname, 'src'),
        output: path.join(__dirname, 'dist'),
        version: +new Date(),
    };
    params.split(',').forEach(item => {
        item = item.split(':');
        result[item[0]] = item[1];
    });
    return result;
})(process.env.NODE_ENV);

const webpackConfig = require('./webpack.config')(projectInfo);

// 清理打包
const clean = done => {
    return src(projectInfo.output, { allowEmpty: true }).pipe(gulpClean());
};

// html任务
const html = done => {
    return src(path.join(projectInfo.entry, 'html', '*.html'))
        .pipe(
            gulpFileInclude({
                prefix: '@@', //变量前缀 @@include
                basepath: 'src/html', //引用文件路径
                indent: true, //保留文件的缩进
                // context : {
                //     projectInfo
                // }
            }),
        )
        .pipe(dest(path.join(projectInfo.output, 'html')));
};

// js 任务
const js = done => {
    webpack(webpackConfig).run(function (err, status) {
        console.group('webpack-run');
        console.log(status.toString());
        console.groupEnd();
        done();
    });
};

// css任务
const css = done => {
    return src(path.join(projectInfo.entry, 'scss', '*.scss'))
        .pipe(gulpSass.sync().on('error', gulpSass.logError))
        .pipe(
            gulpAutoprefixer({
                // browsers: ['last 2 versions', 'Android >= 4.0'],
                overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 7'],
                cascade: true, //是否美化属性值 默认：true 像这样：-webkit-transform: rotate(45deg);transform: rotate(45deg);
                remove: true, //是否去掉不必要的前缀 默认：true
            }),
        )
        .pipe(dest(path.join(projectInfo.output, 'css')));
};

// 通用任务
const task = series(clean, parallel(html, css, js));

// 默认任务集
const defaultTask = series(task, done => {
    if (projectInfo.mode === 'development') {
        const watcher = watch(['src/**']);
        watcher.on('all', (staus, file) => {
            console.log(`File ${file} was changed`, staus);
            task();
        });
    }
    done();
});

exports.default = defaultTask;
