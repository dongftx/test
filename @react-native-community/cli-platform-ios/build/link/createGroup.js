"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGroup;

var _getGroup = _interopRequireDefault(require("./getGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const hasGroup = (pbxGroup, name) => pbxGroup.children.find(group => group.comment === name);
/**
 * Given project and path of the group, it deeply creates a given group
 * making all outer groups if necessary
 *
 * Returns newly created group
 */


function createGroup(project, path) {
  return path.split('/').reduce((group, name) => {
    if (!hasGroup(group, name)) {
      const uuid = project.pbxCreateGroup(name, '""');
      group.children.push({
        value: uuid,
        comment: name
      });
    }

    return project.pbxGroupByName(name);
  }, (0, _getGroup.default)(project));
}