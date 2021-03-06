"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _uniqueId2 = _interopRequireDefault(require("lodash/uniqueId"));

var _defaults2 = _interopRequireDefault(require("lodash/defaults"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propTypes2 = _interopRequireDefault(require("../victory-util/prop-types"));

var _portal = _interopRequireDefault(require("../victory-portal/portal"));

var _timer = _interopRequireDefault(require("../victory-util/timer"));

var _helpers = _interopRequireDefault(require("../victory-util/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var VictoryContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VictoryContainer, _React$Component);

  function VictoryContainer(props) {
    var _this;

    _classCallCheck(this, VictoryContainer);

    _this = _possibleConstructorReturn(this, (VictoryContainer.__proto__ || Object.getPrototypeOf(VictoryContainer)).call(this, props));
    _this.getTimer = _this.getTimer.bind(_assertThisInitialized(_this));
    _this.containerId = !(0, _isObject2.default)(props) || props.containerId === undefined ? (0, _uniqueId2.default)("victory-container-") : props.containerId;

    _this.savePortalRef = function (portal) {
      _this.portalRef = portal;
      return portal;
    };

    _this.portalUpdate = function (key, el) {
      return _this.portalRef.portalUpdate(key, el);
    };

    _this.portalRegister = function () {
      return _this.portalRef.portalRegister();
    };

    _this.portalDeregister = function (key) {
      return _this.portalRef.portalDeregister(key);
    };

    _this.saveContainerRef = props && (0, _isFunction2.default)(props.containerRef) ? props.containerRef : function (container) {
      _this.containerRef = container;
      return container;
    };
    _this.shouldHandleWheel = props && props.events && props.events.onWheel;

    if (_this.shouldHandleWheel) {
      _this.handleWheel = function (e) {
        return e.preventDefault();
      };
    }

    return _this;
  }

  _createClass(VictoryContainer, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        portalUpdate: this.portalUpdate,
        portalRegister: this.portalRegister,
        portalDeregister: this.portalDeregister,
        getTimer: this.getTimer
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.shouldHandleWheel && this.containerRef) {
        this.containerRef.addEventListener("wheel", this.handleWheel);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.context.getTimer) {
        this.getTimer().stop();
      }

      if (this.shouldHandleWheel && this.containerRef) {
        this.containerRef.removeEventListener("wheel", this.handleWheel);
      }
    }
  }, {
    key: "getTimer",
    value: function getTimer() {
      if (this.context.getTimer) {
        return this.context.getTimer();
      }

      if (!this.timer) {
        this.timer = new _timer.default();
      }

      return this.timer;
    }
  }, {
    key: "getIdForElement",
    value: function getIdForElement(elementName) {
      return "".concat(this.containerId, "-").concat(elementName);
    } // overridden in custom containers

  }, {
    key: "getChildren",
    value: function getChildren(props) {
      return props.children;
    }
  }, {
    key: "renderContainer",
    value: function renderContainer(props, svgProps, style) {
      var title = props.title,
          desc = props.desc,
          portalComponent = props.portalComponent,
          className = props.className,
          width = props.width,
          height = props.height,
          portalZIndex = props.portalZIndex,
          responsive = props.responsive;
      var children = this.getChildren(props);
      var dimensions = responsive ? {
        width: "100%",
        height: "auto"
      } : {
        width: width,
        height: height
      };
      var divStyle = (0, _assign2.default)({
        pointerEvents: "none",
        touchAction: "none",
        position: "relative"
      }, dimensions);
      var portalDivStyle = (0, _assign2.default)({
        zIndex: portalZIndex,
        position: "absolute",
        top: 0,
        left: 0
      }, dimensions);
      var svgStyle = (0, _assign2.default)({
        pointerEvents: "all"
      }, dimensions);
      var portalSvgStyle = (0, _assign2.default)({
        overflow: "visible"
      }, dimensions);
      var portalProps = {
        width: width,
        height: height,
        viewBox: svgProps.viewBox,
        style: portalSvgStyle
      };
      return _react.default.createElement("div", {
        style: (0, _defaults2.default)({}, style, divStyle),
        className: className,
        ref: this.saveContainerRef
      }, _react.default.createElement("svg", _extends({}, svgProps, {
        style: svgStyle
      }), title ? _react.default.createElement("title", {
        id: this.getIdForElement("title")
      }, title) : null, desc ? _react.default.createElement("desc", {
        id: this.getIdForElement("desc")
      }, desc) : null, children), _react.default.createElement("div", {
        style: portalDivStyle
      }, _react.default.cloneElement(portalComponent, _objectSpread({}, portalProps, {
        ref: this.savePortalRef
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          responsive = _props.responsive,
          events = _props.events,
          title = _props.title,
          desc = _props.desc,
          tabIndex = _props.tabIndex;
      var style = responsive ? this.props.style : _helpers.default.omit(this.props.style, ["height", "width"]);
      var svgProps = (0, _assign2.default)({
        width: width,
        height: height,
        tabIndex: tabIndex,
        role: "img",
        "aria-labelledby": title ? this.getIdForElement("title") : undefined,
        "aria-describedby": desc ? this.getIdForElement("desc") : undefined,
        viewBox: responsive ? "0 0 ".concat(width, " ").concat(height) : undefined
      }, events);
      return this.renderContainer(this.props, svgProps, style);
    }
  }]);

  return VictoryContainer;
}(_react.default.Component);

exports.default = VictoryContainer;
Object.defineProperty(VictoryContainer, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "VictoryContainer"
});
Object.defineProperty(VictoryContainer, "role", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "container"
});
Object.defineProperty(VictoryContainer, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
    className: _propTypes.default.string,
    containerId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    containerRef: _propTypes.default.func,
    desc: _propTypes.default.string,
    events: _propTypes.default.object,
    height: _propTypes2.default.nonNegative,
    name: _propTypes.default.string,
    origin: _propTypes.default.shape({
      x: _propTypes2.default.nonNegative,
      y: _propTypes2.default.nonNegative
    }),
    polar: _propTypes.default.bool,
    portalComponent: _propTypes.default.element,
    portalZIndex: _propTypes2.default.integer,
    responsive: _propTypes.default.bool,
    style: _propTypes.default.object,
    tabIndex: _propTypes.default.number,
    theme: _propTypes.default.object,
    title: _propTypes.default.string,
    width: _propTypes2.default.nonNegative
  }
});
Object.defineProperty(VictoryContainer, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    className: "VictoryContainer",
    portalComponent: _react.default.createElement(_portal.default, null),
    portalZIndex: 99,
    responsive: true
  }
});
Object.defineProperty(VictoryContainer, "contextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    getTimer: _propTypes.default.func
  }
});
Object.defineProperty(VictoryContainer, "childContextTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    portalUpdate: _propTypes.default.func,
    portalRegister: _propTypes.default.func,
    portalDeregister: _propTypes.default.func,
    getTimer: _propTypes.default.func
  }
});