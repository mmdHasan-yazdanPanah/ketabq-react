"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import { ReactComponent as StarOutline } from '../images/icons/star-outline.svg';
// import { ReactComponent as StarFull } from '../images/icons/star-full.svg';
var StarFull = function StarFull(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10.787",
    height: "10.787",
    viewBox: "0 0 10.787 10.787"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M10.5,3.874,7.185,3.367,5.7.2a.351.351,0,0,0-.61,0L3.6,3.367.286,3.874a.338.338,0,0,0-.19.569L2.505,6.917l-.569,3.5a.337.337,0,0,0,.5.35L5.394,9.123l2.962,1.64a.337.337,0,0,0,.5-.35l-.569-3.5,2.409-2.473a.338.338,0,0,0-.19-.57Z",
    transform: "translate(0 -0.018)",
    fill: "#ffc107"
  }));
};

var StarOutline = function StarOutline(props) {
  return /*#__PURE__*/_react.default.createElement("svg", _extends({}, props, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "10.79",
    height: "10.79",
    viewBox: "0 0 10.79 10.79"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M2.416,11.282a.556.556,0,0,1-.336-.114.612.612,0,0,1-.223-.618L2.551,7.36.2,5.205A.615.615,0,0,1,.029,4.57a.579.579,0,0,1,.493-.411l3.115-.3L4.868.856a.564.564,0,0,1,1.055,0L7.154,3.863l3.114.3a.578.578,0,0,1,.494.411.615.615,0,0,1-.168.636L8.241,7.359l.694,3.191a.611.611,0,0,1-.223.618.553.553,0,0,1-.63.029L5.4,9.522,2.71,11.2a.557.557,0,0,1-.294.085ZM5.4,8.8a.557.557,0,0,1,.294.085l2.535,1.582L7.569,7.455a.614.614,0,0,1,.182-.583L9.974,4.838,7.033,4.559A.576.576,0,0,1,6.556,4.2L5.4,1.359,4.233,4.2a.574.574,0,0,1-.475.361L.817,4.837,3.04,6.871a.613.613,0,0,1,.182.584l-.655,3.011L5.1,8.885A.557.557,0,0,1,5.4,8.8ZM3.613,3.921h0Zm3.564,0h0Zm0,0",
    transform: "translate(-0.001 -0.492)",
    fill: "#ffc107"
  }));
};

var RateboxStar = function RateboxStar(_ref) {
  var className = _ref.className,
      rate = _ref.rate,
      sizeClass = _ref.sizeClass,
      clickable = _ref.clickable,
      onChangeRateHandler = _ref.onChangeRateHandler;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isClicked = _useState2[0],
      setClicked = _useState2[1];

  var _useState3 = (0, _react.useState)(rate),
      _useState4 = _slicedToArray(_useState3, 2),
      rateState = _useState4[0],
      setRateState = _useState4[1];

  (0, _react.useEffect)(function () {
    setRateState(rate);
  }, [rate]);
  (0, _react.useEffect)(function () {
    if (onChangeRateHandler) {
      console.log(rate);
      onChangeRateHandler(rateState);
    }
  }, [rateState]);
  var allStarsRef = (0, _react.useRef)(); // THE SIZE OF SVGs MUST SET WITH className Prop.

  var hoverHandler = function hoverHandler(e) {
    var allStarSvg = allStarsRef.current.querySelectorAll('.ratebox-star');
    allStarSvg.forEach(function (star, index) {
      if (star === e.currentTarget) {
        setRateState(index + 1);
      }
    });
  };

  var clickHandler = function clickHandler(e) {
    if (!isClicked) {
      setClicked(true);
    } else {
      var allStarSvg = allStarsRef.current.querySelectorAll('.ratebox-star');
      allStarSvg.forEach(function (star, index) {
        if (star === e.currentTarget) {
          if (index + 1 === rateState) {
            setClicked(false);
            setRateState(0);
          } else {
            setRateState(index + 1);
          }
        }
      });
    }
  };

  if (rateState > 5) {
    setRateState(5);
  }

  var maxRate = 5;
  var full = Math.floor(rateState);
  var empty = Math.floor(maxRate - rateState);
  var half = 0;

  if (full + empty !== maxRate) {
    half = rateState - full;
  }

  var fullItems = [];

  for (var i = 0; i < full; i++) {
    fullItems.push( /*#__PURE__*/_react.default.createElement("span", {
      key: i,
      className: "ratebox-star ".concat(clickable ? 'is-clickable' : ''),
      onMouseEnter: clickable && !isClicked ? function (e) {
        return hoverHandler(e);
      } : null,
      onClick: clickable ? function (e) {
        return clickHandler(e);
      } : null
    }, /*#__PURE__*/_react.default.createElement(StarFull, {
      className: sizeClass ? sizeClass : ''
    })));
  }

  var outlineItems = [];

  for (var _i2 = 0; _i2 < empty; _i2++) {
    outlineItems.push( /*#__PURE__*/_react.default.createElement("span", {
      key: _i2,
      className: "ratebox-star ".concat(clickable ? 'is-clickable' : ''),
      onMouseEnter: clickable && !isClicked ? function (e) {
        return hoverHandler(e);
      } : null,
      onClick: clickable ? function (e) {
        return clickHandler(e);
      } : null
    }, /*#__PURE__*/_react.default.createElement(StarOutline, {
      className: sizeClass ? sizeClass : ''
    })));
  }

  var halfItem;

  if (half > 0) {
    halfItem = /*#__PURE__*/_react.default.createElement("div", {
      className: "ratebox-star is-relative ".concat(clickable ? 'is-clickable' : '')
    }, /*#__PURE__*/_react.default.createElement(StarOutline, {
      onMouseEnter: clickable && !isClicked ? function (e) {
        return hoverHandler(e);
      } : null,
      onClick: clickable ? function (e) {
        return clickHandler(e);
      } : null,
      className: "ratebox-star_outline ".concat(sizeClass ? sizeClass : '')
    }), /*#__PURE__*/_react.default.createElement(StarFull, {
      onMouseEnter: clickable && !isClicked ? function (e) {
        return hoverHandler(e);
      } : null,
      onClick: clickable ? function (e) {
        return clickHandler(e);
      } : null,
      className: "ratebox-star_full ".concat(sizeClass ? sizeClass : ''),
      style: {
        clipPath: "polygon(0 0, ".concat(half * 100, "% 0, ").concat(half * 100, "% 100%, 0 100%)")
      }
    }));
  }

  return /*#__PURE__*/_react.default.createElement("section", {
    onMouseLeave: clickable && !isClicked ? function () {
      return setRateState(0);
    } : null,
    ref: allStarsRef,
    className: "is-inline-flex ".concat(className),
    style: {
      direction: 'ltr'
    }
  }, fullItems, halfItem ? halfItem : null, outlineItems);
};

var _default = RateboxStar;
exports.default = _default;
RateboxStar.propTypes = {
  className: _propTypes.default.string,
  rate: _propTypes.default.number.isRequired
};

//# sourceMappingURL=ratebox-star.js.map