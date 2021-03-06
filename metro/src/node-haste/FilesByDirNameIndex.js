/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

const path = require('path');

/**
                               * This is a way to find files quickly given a RegExp, in a specific directory.
                               * This is must faster than iterating over all the files and matching both
                               * directory and RegExp at the same time.
                               *
                               * This was first implemented to support finding assets fast, for which we know
                               * the directory, but we want to identify all variants (ex. @2x, @1x, for
                               * a picture's different definition levels).
                               */
class FilesByDirNameIndex {


  constructor(allFilePaths) {
    this._filesByDirName = new Map();
    for (let i = 0; i < allFilePaths.length; ++i) {
      const filePath = allFilePaths[i];
      const dirName = path.dirname(filePath);
      let dir = this._filesByDirName.get(dirName);
      if (dir === undefined) {
        dir = [];
        this._filesByDirName.set(dirName, dir);
      }
      dir.push(path.basename(filePath));
    }
  }

  getAllFiles(dirPath) {
    return this._filesByDirName.get(dirPath) || [];
  }}


module.exports = FilesByDirNameIndex;