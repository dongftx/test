import _isNil from "lodash/isNil";
import _values from "lodash/values";
import _assign from "lodash/assign";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

var getSymbol = function (data, props) {
  if (props.bubbleProperty) {
    return "circle";
  }

  return data.symbol || props.symbol;
};

var getBubbleSize = function (datum, props) {
  var data = props.data,
      z = props.z,
      maxBubbleSize = props.maxBubbleSize,
      minBubbleSize = props.minBubbleSize;
  var zData = data.map(function (point) {
    return point[z];
  });
  var zMin = Math.min.apply(Math, _toConsumableArray(zData));
  var zMax = Math.max.apply(Math, _toConsumableArray(zData));

  var getMaxRadius = function () {
    var minPadding = Math.min.apply(Math, _toConsumableArray(_values(Helpers.getPadding(props))));
    return Math.max(minPadding, 5); // eslint-disable-line no-magic-numbers
  };

  var maxRadius = maxBubbleSize || getMaxRadius();
  var minRadius = minBubbleSize || maxRadius * 0.1; // eslint-disable-line no-magic-numbers

  if (zMax === zMin) {
    return Math.max(minRadius, 1);
  }

  var maxArea = Math.PI * Math.pow(maxRadius, 2);
  var minArea = Math.PI * Math.pow(minRadius, 2);
  var pointArea = (datum[z] - zMin) / (zMax - zMin) * maxArea;
  var area = Math.max(pointArea, minArea);
  var radius = Math.sqrt(area / Math.PI);
  return Math.max(radius, 1);
};

var getSize = function (datum, props) {
  var size = props.size,
      z = props.z;

  if (datum.size) {
    return typeof datum.size === "function" ? datum.size : Math.max(datum.size, 1);
  } else if (typeof props.size === "function") {
    return size;
  } else if (datum[z]) {
    return getBubbleSize(datum, props);
  } else {
    return Math.max(size || 0, 1);
  }
};

var getCalculatedValues = function (props) {
  var defaultStyles = props.theme && props.theme.scatter && props.theme.scatter.style ? props.theme.scatter.style : {};
  var style = Helpers.getStyles(props.style, defaultStyles);
  var data = Data.getData(props);
  var range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  var domain = {
    x: Domain.getDomain(props, "x"),
    y: Domain.getDomain(props, "y")
  };
  var scale = {
    x: Scale.getBaseScale(props, "x").domain(domain.x).range(props.horizontal ? range.y : range.x),
    y: Scale.getBaseScale(props, "y").domain(domain.y).range(props.horizontal ? range.x : range.y)
  };
  var origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  var z = props.bubbleProperty || "z";
  return {
    domain: domain,
    data: data,
    scale: scale,
    style: style,
    origin: origin,
    z: z
  };
};

var getBaseProps = function (props, fallbackProps) {
  var modifiedProps = Helpers.modifyProps(props, fallbackProps, "scatter");
  props = _assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  var _props = props,
      data = _props.data,
      domain = _props.domain,
      events = _props.events,
      height = _props.height,
      origin = _props.origin,
      padding = _props.padding,
      polar = _props.polar,
      scale = _props.scale,
      name = _props.name,
      sharedEvents = _props.sharedEvents,
      standalone = _props.standalone,
      style = _props.style,
      theme = _props.theme,
      width = _props.width,
      labels = _props.labels,
      horizontal = _props.horizontal;
  var initialChildProps = {
    parent: {
      style: style.parent,
      scale: scale,
      domain: domain,
      data: data,
      height: height,
      width: width,
      standalone: standalone,
      theme: theme,
      origin: origin,
      polar: polar,
      padding: padding,
      name: name,
      horizontal: horizontal
    }
  };
  return data.reduce(function (childProps, datum, index) {
    var eventKey = !_isNil(datum.eventKey) ? datum.eventKey : index;

    var _Helpers$scalePoint = Helpers.scalePoint(props, datum),
        x = _Helpers$scalePoint.x,
        y = _Helpers$scalePoint.y;

    var dataProps = {
      x: x,
      y: y,
      datum: datum,
      data: data,
      index: index,
      scale: scale,
      polar: polar,
      origin: origin,
      horizontal: horizontal,
      size: getSize(datum, props),
      symbol: getSymbol(datum, props),
      style: style.data
    };
    childProps[eventKey] = {
      data: dataProps
    };
    var text = LabelHelpers.getText(props, datum, index);

    if (text !== undefined && text !== null || labels && (events || sharedEvents)) {
      childProps[eventKey].labels = LabelHelpers.getProps(props, index);
    }

    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getSize, getBubbleSize, getSymbol };