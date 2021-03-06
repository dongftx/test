"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseProps = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _defaults2 = _interopRequireDefault(require("lodash/defaults"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var d3Shape = _interopRequireWildcard(require("d3-shape"));

var _victoryCore = require("victory-core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkForValidText = function (text) {
  if (text === undefined || text === null || (0, _isFunction2.default)(text)) {
    return text;
  } else {
    return "".concat(text);
  }
};

var getColor = function (style, colors, index) {
  if (style && style.data && style.data.fill) {
    return style.data.fill;
  }

  return colors && colors[index % colors.length];
};

var getRadius = function (props, padding) {
  if (typeof props.radius === "number") {
    return props.radius;
  }

  return Math.min(props.width - padding.left - padding.right, props.height - padding.top - padding.bottom) / 2;
};

var getOrigin = function (props, padding) {
  var width = props.width,
      height = props.height;
  var origin = (0, _isPlainObject2.default)(props.origin) ? props.origin : {};
  return {
    x: origin.x !== undefined ? origin.x : (padding.left - padding.right + width) / 2,
    y: origin.y !== undefined ? origin.y : (padding.top - padding.bottom + height) / 2
  };
};

var getSlices = function (props, data) {
  var padAngle = (0, _isFunction2.default)(props.padAngle) ? 0 : props.padAngle;
  var layoutFunction = d3Shape.pie().sort(null).startAngle(_victoryCore.Helpers.degreesToRadians(props.startAngle)).endAngle(_victoryCore.Helpers.degreesToRadians(props.endAngle)).padAngle(_victoryCore.Helpers.degreesToRadians(padAngle)).value(function (datum) {
    return datum._y;
  });
  return layoutFunction(data);
};

var getCalculatedValues = function (props) {
  var theme = props.theme,
      colorScale = props.colorScale;
  var styleObject = theme && theme.pie && theme.pie.style ? theme.pie.style : {};

  var style = _victoryCore.Helpers.getStyles(props.style, styleObject, "auto", "100%");

  var colors = Array.isArray(colorScale) ? colorScale : _victoryCore.Style.getColorScale(colorScale);

  var padding = _victoryCore.Helpers.getPadding(props);

  var defaultRadius = getRadius(props, padding);
  var origin = getOrigin(props, padding);

  var data = _victoryCore.Data.getData(props);

  var slices = getSlices(props, data);
  return (0, _assign2.default)({}, props, {
    style: style,
    colors: colors,
    padding: padding,
    defaultRadius: defaultRadius,
    data: data,
    slices: slices,
    origin: origin
  });
};

var getSliceStyle = function (index, calculatedValues) {
  var style = calculatedValues.style,
      colors = calculatedValues.colors;
  var fill = getColor(style, colors, index);
  return (0, _assign2.default)({
    fill: fill
  }, style.data);
};

var getLabelText = function (props, datum, index) {
  var text;

  if (datum.label) {
    text = datum.label;
  } else if (Array.isArray(props.labels)) {
    text = props.labels[index];
  } else {
    text = (0, _isFunction2.default)(props.labels) ? props.labels : datum.xName || datum._x;
  }

  return checkForValidText(text);
};

var getLabelArc = function (radius, labelRadius, style) {
  var padding = style && style.padding || 0;
  var arcRadius = labelRadius || radius + padding;
  return d3Shape.arc().outerRadius(arcRadius).innerRadius(arcRadius);
};

var getLabelPosition = function (arc, slice, position) {
  var construct = {
    startAngle: position === "startAngle" ? slice.endAngle : slice.startAngle,
    endAngle: position === "endAngle" ? slice.startAngle : slice.endAngle
  };
  var clonedArc = (0, _assign2.default)({}, slice, construct);
  return arc.centroid(clonedArc);
};

var getLabelOrientation = function (slice) {
  var radiansToDegrees = function (radians) {
    return radians * (180 / Math.PI);
  };

  var start = radiansToDegrees(slice.startAngle);
  var end = radiansToDegrees(slice.endAngle);
  var degree = start + (end - start) / 2;

  if (degree < 45 || degree > 315) {
    return "top";
  } else if (degree >= 45 && degree < 135) {
    return "right";
  } else if (degree >= 135 && degree < 225) {
    return "bottom";
  } else {
    return "left";
  }
};

var getTextAnchor = function (orientation) {
  if (orientation === "top" || orientation === "bottom") {
    return "middle";
  }

  return orientation === "right" ? "start" : "end";
};

var getVerticalAnchor = function (orientation) {
  if (orientation === "left" || orientation === "right") {
    return "middle";
  }

  return orientation === "bottom" ? "start" : "end";
};

var getLabelProps = function (text, dataProps, calculatedValues) {
  var index = dataProps.index,
      datum = dataProps.datum,
      data = dataProps.data,
      slice = dataProps.slice;
  var style = calculatedValues.style,
      defaultRadius = calculatedValues.defaultRadius,
      origin = calculatedValues.origin,
      width = calculatedValues.width,
      height = calculatedValues.height,
      labelPosition = calculatedValues.labelPosition;

  var labelRadius = _victoryCore.Helpers.evaluateProp(calculatedValues.labelRadius, (0, _assign2.default)({
    text: text
  }, dataProps));

  var labelStyle = (0, _assign2.default)({
    padding: 0
  }, style.labels);

  var evaluatedStyle = _victoryCore.Helpers.evaluateStyle(labelStyle, (0, _assign2.default)({
    labelRadius: labelRadius,
    text: text
  }, dataProps));

  var labelArc = getLabelArc(defaultRadius, labelRadius, evaluatedStyle);
  var position = getLabelPosition(labelArc, slice, labelPosition);
  var orientation = getLabelOrientation(slice);
  return {
    width: width,
    height: height,
    index: index,
    datum: datum,
    data: data,
    slice: slice,
    orientation: orientation,
    text: text,
    style: labelStyle,
    x: Math.round(position[0]) + origin.x,
    y: Math.round(position[1]) + origin.y,
    textAnchor: labelStyle.textAnchor || getTextAnchor(orientation),
    verticalAnchor: labelStyle.verticalAnchor || getVerticalAnchor(orientation),
    angle: labelStyle.angle
  };
};

var getBaseProps = function (props, fallbackProps) {
  props = _victoryCore.Helpers.modifyProps(props, fallbackProps, "pie");
  var calculatedValues = getCalculatedValues(props);
  var slices = calculatedValues.slices,
      style = calculatedValues.style,
      data = calculatedValues.data,
      origin = calculatedValues.origin,
      defaultRadius = calculatedValues.defaultRadius,
      labels = calculatedValues.labels,
      events = calculatedValues.events,
      sharedEvents = calculatedValues.sharedEvents,
      height = calculatedValues.height,
      width = calculatedValues.width,
      standalone = calculatedValues.standalone,
      name = calculatedValues.name,
      innerRadius = calculatedValues.innerRadius,
      cornerRadius = calculatedValues.cornerRadius,
      padAngle = calculatedValues.padAngle;
  var radius = props.radius || defaultRadius;
  var initialChildProps = {
    parent: {
      standalone: standalone,
      height: height,
      width: width,
      slices: slices,
      name: name,
      style: style.parent
    }
  };
  return slices.reduce(function (childProps, slice, index) {
    var datum = (0, _defaults2.default)({}, data[index], {
      startAngle: _victoryCore.Helpers.radiansToDegrees(slice.startAngle),
      endAngle: _victoryCore.Helpers.radiansToDegrees(slice.endAngle),
      padAngle: _victoryCore.Helpers.radiansToDegrees(slice.padAngle)
    });
    var eventKey = !(0, _isNil2.default)(datum.eventKey) ? datum.eventKey : index;
    var dataProps = {
      index: index,
      slice: slice,
      datum: datum,
      data: data,
      origin: origin,
      innerRadius: innerRadius,
      radius: radius,
      cornerRadius: cornerRadius,
      padAngle: padAngle,
      style: getSliceStyle(index, calculatedValues)
    };
    childProps[eventKey] = {
      data: dataProps
    };
    var text = getLabelText(props, datum, index);

    if (text !== undefined && text !== null || labels && (events || sharedEvents)) {
      var evaluatedText = _victoryCore.Helpers.evaluateProp(text, dataProps);

      childProps[eventKey].labels = getLabelProps(evaluatedText, dataProps, calculatedValues);
    }

    return childProps;
  }, initialChildProps);
};

exports.getBaseProps = getBaseProps;