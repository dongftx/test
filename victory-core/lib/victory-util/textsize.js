"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaults2 = _interopRequireDefault(require("lodash/defaults"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fontDictionary = {
  "American Typewriter": 2.09,
  Baskerville: 2.51,
  Georgia: 2.27,
  "Hoefler Text": 2.39,
  Palatino: 2.26,
  "Times New Roman": 2.48,
  Arial: 2.26,
  "Gill Sans": 2.47,
  "Gill Sans 300": 2.58,
  "Helvetica Neue": 2.24,
  "Lucida Grande": 2.05,
  Tahoma: 2.25,
  "Trebuchet MS": 2.2,
  Verdana: 1.96,
  "Courier New": 1.67,
  cursive: 1.84,
  fantasy: 2.09,
  monospace: 1.81,
  serif: 2.04,
  "sans-serif": 1.89
}; //https://developer.mozilla.org/en/docs/Web/CSS/length
// Absolute sizes in pixels for obsolete measurement units.

var absoluteMeasurementUnitsToPixels = {
  mm: 3.8,
  sm: 38,
  pt: 1.33,
  pc: 16,
  in: 96,
  px: 1
};
var relativeMeasurementUnitsCoef = {
  em: 1,
  ex: 0.5
};
var coefficients = {
  averageFontConstant: 2.1675,
  // Average pixels per glyph in existing font.
  widthOverlapCoef: 1.25,
  // Coefficient for width value to prevent overlap.
  heightOverlapCoef: 1.05,
  // Coefficient for height value to prevent overlap.
  lineCapitalCoef: 1.15,
  // Coefficient for height value. Reserve space for capital chars.
  lineSpaceHeightCoef: 0.2 // Coefficient for height value. Reserve space between lines.

};
var defaultStyle = {
  lineHeight: 1,
  letterSpacing: "0px",
  fontSize: 0,
  angle: 0,
  fontFamily: ""
};

var _degreeToRadian = function (angle) {
  return angle * Math.PI / 180;
};

var _getFontCharacterConstant = function (fontFamily) {
  var firstFont = fontFamily.split(",")[0].replace(/'|"/g, "");
  return fontDictionary[firstFont] || coefficients.averageFontConstant;
};

var _splitToLines = function (text) {
  return Array.isArray(text) ? text : text.toString().split(/\r\n|\r|\n/g);
};

var _getSizeWithRotate = function (axisSize, dependentSize, angle) {
  var angleInRadian = _degreeToRadian(angle);

  return Math.abs(Math.cos(angleInRadian) * axisSize) + Math.abs(Math.sin(angleInRadian) * dependentSize);
};
/**
 * Convert length-type parameters from specific measurement units to pixels
 * @param  {string} length Css length string value.
 * @param  {number} fontSize Current text font-size.
 * @returns {number} Approximate Css length in pixels.
 */


var convertLengthToPixels = function (length, fontSize) {
  var attribute = length.match(/[a-zA-Z%]+/)[0];
  var value = length.match(/[0-9.,]+/);
  var result;

  if (absoluteMeasurementUnitsToPixels.hasOwnProperty(attribute)) {
    result = value * absoluteMeasurementUnitsToPixels[attribute];
  } else if (relativeMeasurementUnitsCoef.hasOwnProperty(attribute)) {
    result = (fontSize ? value * fontSize : value * defaultStyle.fontSize) * relativeMeasurementUnitsCoef[attribute];
  } else {
    result = value;
  }

  return result;
};

var _prepareParams = function (inputStyle, index) {
  var lineStyle = Array.isArray(inputStyle) ? inputStyle[index] : inputStyle;
  var style = (0, _defaults2.default)({}, lineStyle, defaultStyle);
  return (0, _assign2.default)({}, style, {
    characterConstant: style.characterConstant || _getFontCharacterConstant(style.fontFamily),
    letterSpacing: convertLengthToPixels(style.letterSpacing, style.fontSize),
    fontSize: typeof style.fontSize === "number" ? style.fontSize : convertLengthToPixels(String(style.fontSize))
  });
};

var _approximateTextWidthInternal = function (text, style) {
  if (text === undefined || text === "") {
    return 0;
  }

  var widths = _splitToLines(text).map(function (line, index) {
    var len = line.toString().length;

    var _prepareParams2 = _prepareParams(style, index),
        fontSize = _prepareParams2.fontSize,
        characterConstant = _prepareParams2.characterConstant,
        letterSpacing = _prepareParams2.letterSpacing;

    return len * fontSize / characterConstant + letterSpacing * Math.max(len - 1, 0);
  });

  return Math.max.apply(Math, _toConsumableArray(widths));
};

var _approximateTextHeightInternal = function (text, style) {
  if (text === undefined || text === "") {
    return 0;
  }

  return _splitToLines(text).reduce(function (total, line, index) {
    var lineStyle = _prepareParams(style, index);

    var containsCaps = line.toString().match(/[(A-Z)(0-9)]/);
    var height = containsCaps ? lineStyle.fontSize * coefficients.lineCapitalCoef : lineStyle.fontSize;
    var emptySpace = index === 0 ? 0 : lineStyle.fontSize * coefficients.lineSpaceHeightCoef;
    return total + lineStyle.lineHeight * (height + emptySpace);
  }, 0);
};
/**
 * Predict text size by font params.
 * @param {string} text Content for width calculation.
 * @param {Object} style Text styles, ,fontFamily, fontSize, etc.
 * @param {string} style.fontFamily Text fontFamily.
 * @param {(number|string)} style.fontSize Text fontSize.
 * @param {number} style.angle Text rotate angle.
 * @param {string} style.letterSpacing Text letterSpacing(space between letters).
 * @param {number} style.characterConstant Average pixels per glyph.
 * @param {number} style.lineHeight Line height coefficient.
 * @returns {number} Approximate text label height.
 */


var approximateTextSize = function (text, style) {
  var angle = Array.isArray(style) ? style[0] && style[0].angle : style && style.angle;

  var height = _approximateTextHeightInternal(text, style);

  var width = _approximateTextWidthInternal(text, style);

  var widthWithRotate = angle ? _getSizeWithRotate(width, height, angle) : width;
  var heightWithRotate = angle ? _getSizeWithRotate(height, width, angle) : height;
  return {
    width: widthWithRotate * coefficients.widthOverlapCoef,
    height: heightWithRotate * coefficients.heightOverlapCoef
  };
};

var _default = {
  approximateTextSize: approximateTextSize,
  convertLengthToPixels: convertLengthToPixels
};
exports.default = _default;