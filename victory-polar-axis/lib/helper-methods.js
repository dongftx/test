"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseProps = exports.getStyles = exports.getScale = void 0;

var _defaults2 = _interopRequireDefault(require("lodash/defaults"));

var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var _victoryCore = require("victory-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPosition = function (r, angle, axis) {
  return axis === "x" ? r * Math.cos(angle) : -r * Math.sin(angle);
};

var getAxisType = function (props) {
  var typicalType = props.dependentAxis ? "radial" : "angular";
  var invertedType = typicalType === "angular" ? "radial" : "angular";
  return props.horizontal ? invertedType : typicalType;
};

var filterTicks = function (ticks, scale) {
  var compareTicks = function (t) {
    return scale(t) % (2 * Math.PI);
  };

  return (0, _uniqBy2.default)(ticks, compareTicks);
};

var getEvaluatedStyles = function (style, props) {
  return {
    tickStyle: _victoryCore.Helpers.evaluateStyle(style.ticks, props),
    labelStyle: _victoryCore.Helpers.evaluateStyle(style.tickLabels, props),
    gridStyle: _victoryCore.Helpers.evaluateStyle(style.grid, props)
  };
};

var getStyleObject = function (props) {
  var theme = props.theme,
      dependentAxis = props.dependentAxis;
  var generalAxisStyle = theme && theme.axis && theme.axis.style;
  var axisType = dependentAxis ? "dependentAxis" : "independentAxis";
  var specificAxisStyle = theme && theme[axisType] && theme[axisType].style;

  var mergeStyles = function () {
    var styleNamespaces = ["axis", "axisLabel", "grid", "parent", "tickLabels", "ticks"];
    return styleNamespaces.reduce(function (memo, curr) {
      memo[curr] = (0, _defaults2.default)({}, specificAxisStyle[curr], generalAxisStyle[curr]);
      return memo;
    }, {});
  };

  return generalAxisStyle && specificAxisStyle ? mergeStyles() : specificAxisStyle || generalAxisStyle;
};

var getRadius = function (props) {
  var _Helpers$getPadding = _victoryCore.Helpers.getPadding(props),
      left = _Helpers$getPadding.left,
      right = _Helpers$getPadding.right,
      top = _Helpers$getPadding.top,
      bottom = _Helpers$getPadding.bottom;

  var width = props.width,
      height = props.height;
  return Math.min(width - left - right, height - top - bottom) / 2;
};

var getRange = function (props, axis) {
  // Return the range from props if one is given.
  if (props.range && props.range[axis]) {
    return props.range[axis];
  } else if (props.range && Array.isArray(props.range)) {
    return props.range;
  }

  var axisType = getAxisType(props);

  if (axisType === "angular") {
    var startAngle = _victoryCore.Helpers.degreesToRadians(props.startAngle);

    var endAngle = _victoryCore.Helpers.degreesToRadians(props.endAngle);

    return [startAngle, endAngle];
  }

  var radius = getRadius(props);
  return [props.innerRadius || 0, radius];
}; // exposed for use by VictoryChart (necessary?)


var getScale = function (props) {
  var axis = _victoryCore.Axis.getAxis(props);

  var scale = _victoryCore.Scale.getBaseScale(props, axis);

  var domain = _victoryCore.Axis.getDomain(props, axis) || scale.domain();
  var range = getRange(props, axis);
  scale.range(range);
  scale.domain(domain);
  return scale;
};

exports.getScale = getScale;

var getStyles = function (props, styleObject) {
  var style = props.style || {};
  styleObject = styleObject || {};
  var parentStyleProps = {
    height: "auto",
    width: "100%"
  };
  return {
    parent: (0, _defaults2.default)(parentStyleProps, style.parent, styleObject.parent),
    axis: (0, _defaults2.default)({}, style.axis, styleObject.axis),
    axisLabel: (0, _defaults2.default)({}, style.axisLabel, styleObject.axisLabel),
    grid: (0, _defaults2.default)({}, style.grid, styleObject.grid),
    ticks: (0, _defaults2.default)({}, style.ticks, styleObject.ticks),
    tickLabels: (0, _defaults2.default)({}, style.tickLabels, styleObject.tickLabels)
  };
};

exports.getStyles = getStyles;

var getAxisAngle = function (props) {
  var axisAngle = props.axisAngle,
      startAngle = props.startAngle,
      dependentAxis = props.dependentAxis;

  var axis = _victoryCore.Axis.getAxis(props);

  var axisValue = _victoryCore.Axis.getAxisValue(props, axis);

  if (axisValue === undefined || !dependentAxis) {
    return axisAngle === undefined ? startAngle : axisAngle;
  }

  return _victoryCore.Helpers.radiansToDegrees(axisValue);
}; //eslint-disable-next-line max-params


var getTickProps = function (props, calculatedValues, tickValue, index) {
  var axisType = calculatedValues.axisType,
      radius = calculatedValues.radius,
      scale = calculatedValues.scale,
      style = calculatedValues.style,
      stringTicks = calculatedValues.stringTicks,
      ticks = calculatedValues.ticks,
      tickFormat = calculatedValues.tickFormat;
  var text = tickFormat(tickValue, index, ticks);
  var tick = stringTicks ? stringTicks[index] : tickValue;

  var _getEvaluatedStyles = getEvaluatedStyles(style, {
    tick: tick,
    tickValue: tickValue,
    index: index,
    ticks: ticks,
    stringTicks: stringTicks,
    radius: radius,
    scale: scale,
    axisType: axisType,
    text: text
  }),
      tickStyle = _getEvaluatedStyles.tickStyle;

  var tickPadding = tickStyle.padding || 0;
  var angularPadding = tickPadding; // TODO: do some geometry

  var axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  return axisType === "angular" ? {
    index: index,
    datum: tick,
    style: tickStyle,
    x1: radius * Math.cos(scale(tickValue)),
    y1: -radius * Math.sin(scale(tickValue)),
    x2: (radius + tickPadding) * Math.cos(scale(tickValue)),
    y2: -(radius + tickPadding) * Math.sin(scale(tickValue))
  } : {
    style: style,
    index: index,
    datum: tick,
    x1: scale(tickValue) / 2 * Math.cos(axisAngle - angularPadding),
    x2: scale(tickValue) / 2 * Math.cos(axisAngle + angularPadding),
    y1: -(scale(tickValue) / 2) * Math.sin(axisAngle - angularPadding),
    y2: -(scale(tickValue) / 2) * Math.sin(axisAngle + angularPadding)
  };
}; //eslint-disable-next-line max-params


var getTickLabelProps = function (props, calculatedValues, tickValue, index) {
  var axisType = calculatedValues.axisType,
      radius = calculatedValues.radius,
      tickFormat = calculatedValues.tickFormat,
      style = calculatedValues.style,
      scale = calculatedValues.scale,
      ticks = calculatedValues.ticks,
      stringTicks = calculatedValues.stringTicks;
  var text = tickFormat(tickValue, index, ticks);
  var tick = stringTicks ? stringTicks[index] : tickValue;

  var _getEvaluatedStyles2 = getEvaluatedStyles(style, {
    text: text,
    tick: tick,
    tickValue: tickValue,
    index: index,
    ticks: ticks,
    stringTicks: stringTicks,
    radius: radius,
    scale: scale,
    axisType: axisType
  }),
      labelStyle = _getEvaluatedStyles2.labelStyle;

  var tickLabelComponent = props.tickLabelComponent;
  var labelPlacement = tickLabelComponent.props && tickLabelComponent.props.labelPlacement ? tickLabelComponent.props.labelPlacement : props.labelPlacement;
  var tickPadding = labelStyle.padding || 0;
  var angularPadding = 0; // TODO: do some geometry

  var axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  var labelAngle = axisType === "angular" ? _victoryCore.Helpers.radiansToDegrees(scale(tickValue)) : axisAngle + angularPadding;
  var textAngle = labelStyle.angle === undefined ? _victoryCore.LabelHelpers.getPolarAngle((0, _assign2.default)({}, props, {
    labelPlacement: labelPlacement
  }), labelAngle) : labelStyle.angle;
  var labelRadius = axisType === "angular" ? radius + tickPadding : scale(tickValue);

  var textAnchor = labelStyle.textAnchor || _victoryCore.LabelHelpers.getPolarTextAnchor((0, _assign2.default)({}, props, {
    labelPlacement: labelPlacement
  }), labelAngle);

  return {
    index: index,
    datum: tick,
    style: labelStyle,
    angle: textAngle,
    textAnchor: textAnchor,
    text: text,
    x: labelRadius * Math.cos(_victoryCore.Helpers.degreesToRadians(labelAngle)),
    y: -labelRadius * Math.sin(_victoryCore.Helpers.degreesToRadians(labelAngle))
  };
}; //eslint-disable-next-line max-params


var getGridProps = function (props, calculatedValues, tickValue, index) {
  var axisType = calculatedValues.axisType,
      radius = calculatedValues.radius,
      style = calculatedValues.style,
      scale = calculatedValues.scale,
      stringTicks = calculatedValues.stringTicks,
      ticks = calculatedValues.ticks,
      tickFormat = calculatedValues.tickFormat;
  var text = tickFormat(tickValue, index, ticks);
  var startAngle = props.startAngle,
      endAngle = props.endAngle,
      _props$innerRadius = props.innerRadius,
      innerRadius = _props$innerRadius === void 0 ? 0 : _props$innerRadius;
  var tick = stringTicks ? stringTicks[index] : tickValue;

  var _getEvaluatedStyles3 = getEvaluatedStyles(style, {
    tick: tick,
    tickValue: tickValue,
    index: index,
    ticks: ticks,
    stringTicks: stringTicks,
    radius: radius,
    scale: scale,
    axisType: axisType,
    text: text
  }),
      gridStyle = _getEvaluatedStyles3.gridStyle;

  var angle = scale(tickValue);
  return axisType === "angular" ? {
    index: index,
    datum: tick,
    style: gridStyle,
    x1: getPosition(radius, angle, "x"),
    y1: getPosition(radius, angle, "y"),
    x2: getPosition(innerRadius, angle, "x"),
    y2: getPosition(innerRadius, angle, "y")
  } : {
    style: gridStyle,
    index: index,
    datum: tick,
    cx: 0,
    cy: 0,
    r: scale(tickValue),
    startAngle: startAngle,
    endAngle: endAngle
  };
};

var getAxisLabelProps = function (props, calculatedValues) {
  var axisType = calculatedValues.axisType,
      radius = calculatedValues.radius,
      style = calculatedValues.style,
      scale = calculatedValues.scale;
  var axisLabelComponent = props.axisLabelComponent;

  if (axisType !== "radial") {
    return {};
  }

  var labelPlacement = axisLabelComponent.props && axisLabelComponent.props.labelPlacement ? axisLabelComponent.props.labelPlacement : props.labelPlacement;
  var labelStyle = style && style.axisLabel || {};
  var axisAngle = axisType === "radial" ? getAxisAngle(props, scale) : undefined;
  var textAngle = labelStyle.angle === undefined ? _victoryCore.LabelHelpers.getPolarAngle((0, _assign2.default)({}, props, {
    labelPlacement: labelPlacement
  }), axisAngle) : labelStyle.angle;
  var labelRadius = radius + (labelStyle.padding || 0);

  var textAnchor = labelStyle.textAnchor || _victoryCore.LabelHelpers.getTextPolarAnchor((0, _assign2.default)({}, props, {
    labelPlacement: labelPlacement
  }), axisAngle);

  var verticalAnchor = labelStyle.verticalAnchor || _victoryCore.LabelHelpers.getPolarVerticalAnchor((0, _assign2.default)({}, props, {
    labelPlacement: labelPlacement
  }), axisAngle);

  return {
    style: labelStyle,
    angle: textAngle,
    textAnchor: textAnchor,
    verticalAnchor: verticalAnchor,
    text: props.label,
    x: getPosition(labelRadius, _victoryCore.Helpers.degreesToRadians(axisAngle), "x"),
    y: getPosition(labelRadius, _victoryCore.Helpers.degreesToRadians(axisAngle), "y")
  };
};

var getAxisProps = function (modifiedProps, calculatedValues) {
  var style = calculatedValues.style,
      axisType = calculatedValues.axisType,
      radius = calculatedValues.radius,
      scale = calculatedValues.scale;
  var startAngle = modifiedProps.startAngle,
      endAngle = modifiedProps.endAngle,
      _modifiedProps$innerR = modifiedProps.innerRadius,
      innerRadius = _modifiedProps$innerR === void 0 ? 0 : _modifiedProps$innerR;
  var axisAngle = axisType === "radial" ? _victoryCore.Helpers.degreesToRadians(getAxisAngle(modifiedProps, scale)) : undefined;
  return axisType === "radial" ? {
    style: style.axis,
    x1: getPosition(innerRadius, axisAngle, "x"),
    x2: getPosition(radius, axisAngle, "x"),
    y1: getPosition(innerRadius, axisAngle, "y"),
    y2: getPosition(radius, axisAngle, "y")
  } : {
    style: style.axis,
    cx: 0,
    cy: 0,
    r: radius,
    startAngle: startAngle,
    endAngle: endAngle
  };
};

var getCalculatedValues = function (props) {
  props = (0, _assign2.default)({
    polar: true
  }, props);
  var defaultStyles = getStyleObject(props);
  var style = getStyles(props, defaultStyles);

  var padding = _victoryCore.Helpers.getPadding(props);

  var axis = _victoryCore.Axis.getAxis(props);

  var axisType = getAxisType(props);
  var stringTicks = _victoryCore.Axis.stringTicks(props) ? props.tickValues : undefined;

  var domain = _victoryCore.Axis.getDomain(props, axis);

  var range = getRange(props, axis);
  var scale = getScale(props);

  var initialTicks = _victoryCore.Axis.getTicks(props, scale);

  var ticks = axisType === "angular" ? filterTicks(initialTicks, scale) : initialTicks;

  var tickFormat = _victoryCore.Axis.getTickFormat(props, scale);

  var radius = getRadius(props);
  return {
    axis: axis,
    style: style,
    padding: padding,
    stringTicks: stringTicks,
    axisType: axisType,
    scale: scale,
    ticks: ticks,
    tickFormat: tickFormat,
    domain: domain,
    range: range,
    radius: radius
  };
};

var getBaseProps = function (props, fallbackProps) {
  props = _victoryCore.Axis.modifyProps(props, fallbackProps);
  var calculatedValues = getCalculatedValues(props);
  var style = calculatedValues.style,
      scale = calculatedValues.scale,
      ticks = calculatedValues.ticks,
      domain = calculatedValues.domain;
  var _props = props,
      width = _props.width,
      height = _props.height,
      standalone = _props.standalone,
      theme = _props.theme,
      name = _props.name;
  var axisProps = getAxisProps(props, calculatedValues);
  var axisLabelProps = getAxisLabelProps(props, calculatedValues);
  var initialChildProps = {
    parent: {
      style: style.parent,
      ticks: ticks,
      scale: scale,
      width: width,
      height: height,
      domain: domain,
      standalone: standalone,
      theme: theme,
      name: name
    }
  };
  return ticks.reduce(function (childProps, tick, index) {
    childProps[index] = {
      axis: axisProps,
      axisLabel: axisLabelProps,
      ticks: getTickProps(props, calculatedValues, tick, index),
      tickLabels: getTickLabelProps(props, calculatedValues, tick, index),
      grid: getGridProps(props, calculatedValues, tick, index)
    };
    return childProps;
  }, initialChildProps);
};

exports.getBaseProps = getBaseProps;