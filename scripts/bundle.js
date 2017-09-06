(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/** 
  Direction aware content reveals.

  @param {Object} Options object.
  @param {string} selector Container element selector.
  @param {string} itemSelector Item element selector.
  @param {string} animationName Animation CSS class.
*/

var DirectionReveal = function DirectionReveal() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$selector = _ref.selector,
      selector = _ref$selector === undefined ? '.direction-reveal' : _ref$selector,
      _ref$itemSelector = _ref.itemSelector,
      itemSelector = _ref$itemSelector === undefined ? '.direction-reveal__card' : _ref$itemSelector,
      _ref$animationName = _ref.animationName,
      animationName = _ref$animationName === undefined ? 'swing' : _ref$animationName;

  var containers = document.querySelectorAll(selector);

  var _getDirection = function _getDirection(e, item) {
    // Width and height of current item
    var w = item.offsetWidth;
    var h = item.offsetHeight;

    // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
    var x = e.pageX - item.offsetLeft - w / 2 * (w > h ? h / w : 1);
    var y = e.pageY - item.offsetTop - h / 2 * (h > w ? w / h : 1);

    // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3).  See https://stackoverflow.com/a/3647634 for a full explanation.
    var d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

    return d;
  };

  var _translateDirection = switchcase({
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left'
  })('top');

  var _addClass = function _addClass(e, state) {
    var currentItem = e.currentTarget;
    var direction = _getDirection(e, currentItem);
    var directionString = _translateDirection(direction);

    // Remove current animation classes and add current one.
    var currentCssClasses = currentItem.className.split(' ');
    var filteredCssClasses = currentCssClasses.filter(function (cssClass) {
      return !cssClass.startsWith(animationName);
    }).join(' ');
    currentItem.className = filteredCssClasses;
    currentItem.classList.add(animationName + '--' + state + '-' + directionString);
  };

  var _bindEvents = function _bindEvents(containerItem) {
    var items = containerItem.querySelectorAll(itemSelector);

    items.forEach(function (item) {

      item.addEventListener('mouseenter', function (e) {
        _addClass(e, 'in');
      });

      item.addEventListener('mouseleave', function (e) {
        _addClass(e, 'out');
      });
    });
  };

  var init = function init() {

    if (containers.length) {
      containers.forEach(function (containerItem) {
        _bindEvents(containerItem);
      });
    } else {
      return;
    }
  };

  // Init is called by default
  init();

  // Reveal API
  return {
    init: init
  };
};

exports.default = DirectionReveal;

// Better switch cases - https://hackernoon.com/rethinking-javascript-eliminate-the-switch-statement-for-better-code-5c81c044716d

var switchcase = exports.switchcase = function switchcase(cases) {
  return function (defaultCase) {
    return function (key) {
      return key in cases ? cases[key] : defaultCase;
    };
  };
};

},{}],2:[function(require,module,exports){
'use strict';

var _directionReveal = require('./direction-reveal.js');

var _directionReveal2 = _interopRequireDefault(_directionReveal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Swing animation(Default)
var directionReveal = (0, _directionReveal2.default)({
  selector: '.direction-reveal--demo-swing'
});

// Swipe animation 
var directionRevealSlide = (0, _directionReveal2.default)({
  selector: '.direction-reveal--demo-slide',
  itemSelector: '.direction-reveal__card',
  animationName: 'slide'
});

},{"./direction-reveal.js":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
