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



function formatFileCandidates(candidates) {
  if (candidates.type === 'asset') {
    return candidates.name;
  }
  return `${candidates.filePathPrefix}(${candidates.candidateExts.join('|')})`;
}

module.exports = formatFileCandidates;