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

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const VERSION = require('../../package.json').version;

/**
                                                        * Returns a function that will return the transform cache key based on some
                                                        * passed transform options.
                                                        */
function getTransformCacheKeyFn(opts)





{
  const transformModuleHash = crypto.
  createHash('sha1').
  update(fs.readFileSync(opts.transformModulePath)).
  digest('hex');

  const stableProjectRoots = opts.projectRoots.map(p => {
    return path.relative(path.join(__dirname, '../../../..'), p);
  });

  const cacheKeyParts = [
  'metro-cache',
  VERSION,
  opts.cacheVersion,
  stableProjectRoots.
  join(',').
  split(path.sep).
  join('-'),
  transformModuleHash,
  opts.asyncRequireModulePath,
  opts.dynamicDepsInPackages];


  const transformCacheKey = crypto.
  createHash('sha1').
  update(cacheKeyParts.join('$')).
  digest('hex');

  /* $FlowFixMe: dynamic requires prevent static typing :'(  */
  const transformer = require(opts.transformModulePath);

  const getCacheKey =
  typeof transformer.getCacheKey !== 'undefined' ?
  transformer.getCacheKey :
  options => '';

  return function (options) {
    return transformCacheKey + getCacheKey(options);
  };
}

module.exports = getTransformCacheKeyFn;