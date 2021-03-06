import _isEmpty from "lodash/isEmpty";
import _assign from "lodash/assign";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { PropTypes as CustomPropTypes, Helpers, VictoryLabel, CommonProps, VictoryContainer, VictoryTheme, LineSegment, addEvents, Arc, Axis } from "victory-core";
import { getScale, getStyles, getBaseProps } from "./helper-methods";
var fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};
var options = {
  components: [{
    name: "axis",
    index: 0
  }, {
    name: "axisLabel",
    index: 0
  }, {
    name: "grid"
  }, {
    name: "parent",
    index: "parent"
  }, {
    name: "ticks"
  }, {
    name: "tickLabels"
  }]
};

var VictoryPolarAxis =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VictoryPolarAxis, _React$Component);

  function VictoryPolarAxis() {
    _classCallCheck(this, VictoryPolarAxis);

    return _possibleConstructorReturn(this, (VictoryPolarAxis.__proto__ || Object.getPrototypeOf(VictoryPolarAxis)).apply(this, arguments));
  }

  _createClass(VictoryPolarAxis, [{
    key: "renderAxisLine",
    value: function renderAxisLine(props) {
      var dependentAxis = props.dependentAxis;
      var axisComponent = dependentAxis ? props.axisComponent : props.circularAxisComponent;
      var axisProps = this.getComponentProps(axisComponent, "axis", 0);
      return React.cloneElement(axisComponent, axisProps);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(props) {
      var axisLabelComponent = props.axisLabelComponent,
          dependentAxis = props.dependentAxis,
          label = props.label;

      if (!label || !dependentAxis) {
        return null;
      }

      var axisLabelProps = this.getComponentProps(axisLabelComponent, "axisLabel", 0);
      return React.cloneElement(axisLabelComponent, axisLabelProps);
    }
  }, {
    key: "renderAxis",
    value: function renderAxis(props) {
      var _this = this;

      var tickComponent = props.tickComponent,
          tickLabelComponent = props.tickLabelComponent,
          name = props.name;

      var shouldRender = function (componentProps) {
        var _componentProps$style = componentProps.style,
            style = _componentProps$style === void 0 ? {} : _componentProps$style,
            _componentProps$event = componentProps.events,
            events = _componentProps$event === void 0 ? {} : _componentProps$event;
        var visible = style.stroke !== "transparent" && style.stroke !== "none" && style.strokeWidth !== 0;
        return visible || !_isEmpty(events);
      };

      var axisType = props.dependentAxis ? "radial" : "angular";
      var gridComponent = axisType === "radial" ? props.circularGridComponent : props.gridComponent;
      var tickComponents = this.dataKeys.map(function (key, index) {
        var tickProps = _assign({
          key: "".concat(name, "-tick-").concat(key)
        }, _this.getComponentProps(tickComponent, "ticks", index));

        var TickComponent = React.cloneElement(tickComponent, tickProps);
        return shouldRender(TickComponent.props) ? TickComponent : undefined;
      }).filter(Boolean);
      var gridComponents = this.dataKeys.map(function (key, index) {
        var gridProps = _assign({
          key: "".concat(name, "-grid-").concat(key)
        }, _this.getComponentProps(gridComponent, "grid", index));

        var GridComponent = React.cloneElement(gridComponent, gridProps);
        return shouldRender(GridComponent.props) ? GridComponent : undefined;
      }).filter(Boolean);
      var tickLabelComponents = this.dataKeys.map(function (key, index) {
        var tickLabelProps = _assign({
          key: "".concat(name, "-tick-").concat(key)
        }, _this.getComponentProps(tickLabelComponent, "tickLabels", index));

        return React.cloneElement(tickLabelComponent, tickLabelProps);
      });
      var axis = this.renderAxisLine(props);
      var axisLabel = this.renderLabel(props);
      var children = [axis, axisLabel].concat(_toConsumableArray(tickComponents), _toConsumableArray(gridComponents), _toConsumableArray(tickLabelComponents));
      return this.renderGroup(props, children);
    } // Overridden in victory-native

  }, {
    key: "renderGroup",
    value: function renderGroup(props, children) {
      var groupComponent = props.groupComponent;
      var groupComponentProps = groupComponent.props || {};
      var origin = Helpers.getPolarOrigin(props);
      var transform = groupComponentProps.transform || "translate(".concat(origin.x, ", ").concat(origin.y, ")");
      return React.cloneElement(groupComponent, {
        transform: transform
      }, children);
    }
  }, {
    key: "shouldAnimate",
    value: function shouldAnimate() {
      return !!this.props.animate;
    }
  }, {
    key: "render",
    value: function render() {
      var animationWhitelist = VictoryPolarAxis.animationWhitelist;
      var props = Axis.modifyProps(this.props, fallbackProps);

      if (this.shouldAnimate()) {
        return this.animateComponent(props, animationWhitelist);
      }

      var children = this.renderAxis(props);
      return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
    }
  }]);

  return VictoryPolarAxis;
}(React.Component);

Object.defineProperty(VictoryPolarAxis, "animationWhitelist", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: ["style", "domain", "range", "tickCount", "tickValues", "padding", "width", "height"]
});
Object.defineProperty(VictoryPolarAxis, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "VictoryAxis"
});
Object.defineProperty(VictoryPolarAxis, "role", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "axis"
});
Object.defineProperty(VictoryPolarAxis, "defaultTransitions", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    onExit: {
      duration: 500
    },
    onEnter: {
      duration: 500
    }
  }
});
Object.defineProperty(VictoryPolarAxis, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _objectSpread({}, CommonProps.baseProps, {
    axisAngle: PropTypes.number,
    axisComponent: PropTypes.element,
    axisLabelComponent: PropTypes.element,
    axisValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    categories: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string)
    })]),
    circularAxisComponent: PropTypes.element,
    circularGridComponent: PropTypes.element,
    containerComponent: PropTypes.element,
    dependentAxis: PropTypes.bool,
    endAngle: PropTypes.number,
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["axis", "axisLabel", "grid", "ticks", "tickLabels"]),
      eventKey: PropTypes.oneOfType([PropTypes.array, CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]), PropTypes.string]),
      eventHandlers: PropTypes.object
    })),
    gridComponent: PropTypes.element,
    innerRadius: CustomPropTypes.nonNegative,
    labelPlacement: PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
    startAngle: PropTypes.number,
    stringMap: PropTypes.object,
    style: PropTypes.shape({
      parent: PropTypes.object,
      axis: PropTypes.object,
      axisLabel: PropTypes.object,
      grid: PropTypes.object,
      ticks: PropTypes.object,
      tickLabels: PropTypes.object
    }),
    tickComponent: PropTypes.element,
    tickCount: CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.greaterThanZero]),
    tickFormat: PropTypes.oneOfType([PropTypes.func, CustomPropTypes.homogeneousArray]),
    tickLabelComponent: PropTypes.element,
    tickValues: CustomPropTypes.homogeneousArray
  })
});
Object.defineProperty(VictoryPolarAxis, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    axisComponent: React.createElement(LineSegment, {
      type: "axis"
    }),
    axisLabelComponent: React.createElement(VictoryLabel, null),
    circularAxisComponent: React.createElement(Arc, {
      type: "axis"
    }),
    circularGridComponent: React.createElement(Arc, {
      type: "grid"
    }),
    containerComponent: React.createElement(VictoryContainer, null),
    endAngle: 360,
    gridComponent: React.createElement(LineSegment, {
      type: "grid"
    }),
    groupComponent: React.createElement("g", {
      role: "presentation"
    }),
    labelPlacement: "parallel",
    startAngle: 0,
    standalone: true,
    theme: VictoryTheme.grayscale,
    tickComponent: React.createElement(LineSegment, {
      type: "tick"
    }),
    tickLabelComponent: React.createElement(VictoryLabel, null)
  }
});
Object.defineProperty(VictoryPolarAxis, "getDomain", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: Axis.getDomain
});
Object.defineProperty(VictoryPolarAxis, "getAxis", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: Axis.getAxis
});
Object.defineProperty(VictoryPolarAxis, "getScale", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: getScale
});
Object.defineProperty(VictoryPolarAxis, "getStyles", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (props) {
    return getStyles(props, fallbackProps.style);
  }
});
Object.defineProperty(VictoryPolarAxis, "getBaseProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (props) {
    return getBaseProps(props, fallbackProps);
  }
});
Object.defineProperty(VictoryPolarAxis, "expectedComponents", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: ["axisComponent", "circularAxisComponent", "groupComponent", "containerComponent", "tickComponent", "tickLabelComponent", "gridComponent", "circularGridComponent"]
});
export default addEvents(VictoryPolarAxis, options);