/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-07-22 11:08:38
 * @LastEditTime: 2021-07-30 14:08:25
 * @FilePath: /packages/shared/index.js
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/shared.cjs.js')
} else {
  module.exports = require('./dist/shared.cjs.js')
}
