/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * React Native CLI configuration file
 *
 * @format
 * 
 */
'use strict';

const blacklist = require('./blacklist');
const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetExts() {
    return [];
  },

  getSourceExts() {
    return [];
  },

  getBlacklistRE() {
    return blacklist();
  },

  _getRoots() {
    // match on either path separator
    if (__dirname.match(/node_modules[\/\\]metro(-bundler)?$/)) {
      // Metro Bundler is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else if (__dirname.match(/Pods\/React\/packager$/)) {
      // Metro Bundler is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else {
      return [path.resolve(__dirname, '..')];
    }
  },

  getTransformModulePath() {
    return require.resolve('./transformer');
  } };