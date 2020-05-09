// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../clicked.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clicked = clicked;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Watcher for click, double-click, or long-click event for both mouse and touch
 * @example
 * import { clicked } from 'clicked'
 *
 * function handleClick()
 * {
 *    console.log('I was clicked.')
 * }
 *
 * const div = document.getElementById('clickme')
 * const c = clicked(div, handleClick, { threshold: 15 })
 *
 * // change callback
 * c.callback = () => console.log('different clicker')
 *
 * // destroy
 * c.destroy()
 *
 * // using built-in querySelector
 * clicked('#clickme', handleClick2)
 *
 * // watching for all types of clicks
 * function handleAllClicks(e) {
 *     switch (e.type)
 *     {
 *         case 'clicked': ...
 *         case 'double-clicked': ...
 *         case 'long-clicked': ...
 *     }
 *
 *     // view UIEvent that caused callback
 *     console.log(e.event)
 * }
 * clicked('#clickme', handleAllClicks, { doubleClicked: true, longClicked: true })
 */

/** @type {object} */
var defaultOptions = {
  threshold: 10,
  clicked: true,
  doubleClicked: false,
  doubleClickedTime: 300,
  longClicked: false,
  longClickedTime: 500,
  capture: false,
  clickDown: false
};
/**
 * @param {HTMLElement|string} element or querySelector entry (e.g., #id-name or .class-name)
 * @param {ClickedCallback} callback called after a click, double click, or long click is registered
 * @param {object} [options]
 * @param {number} [options.threshold=10] if touch moves threshhold-pixels then the touch-click is cancelled
 * @param {boolean} [options.clicked=true] disable watcher for default clicked event
 * @param {boolean} [options.doubleClicked] enable watcher for double click
 * @param {number} [options.doubleClickedTime=500] wait time in millseconds for double click
 * @param {boolean} [options.longClicked] enable watcher for long click
 * @param {number} [options.longClickedTime=500] wait time for long click
 * @param {boolean} [options.clickDown] enable watcher for click start
 * @param {boolean} [options.capture]  events will be dispatched to this registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 * @returns {Clicked}
 */

function clicked(element, callback, options) {
  return new Clicked(element, callback, options);
}

var Clicked =
/*#__PURE__*/
function () {
  function Clicked(element, callback, options) {
    var _this = this;

    _classCallCheck(this, Clicked);

    if (typeof element === 'string') {
      element = document.querySelector(element);

      if (!element) {
        console.warn("Unknown element: document.querySelector(".concat(element, ") in clicked()"));
        return;
      }
    }

    this.options = Object.assign({}, defaultOptions, options);
    this.events = {
      mousedown: function mousedown(e) {
        return _this.mousedown(e);
      },
      mouseup: function mouseup(e) {
        return _this.mouseup(e);
      },
      mousemove: function mousemove(e) {
        return _this.mousemove(e);
      },
      touchstart: function touchstart(e) {
        return _this.touchstart(e);
      },
      touchmove: function touchmove(e) {
        return _this.touchmove(e);
      },
      touchcancel: function touchcancel(e) {
        return _this.cancel(e);
      },
      touchend: function touchend(e) {
        return _this.touchend(e);
      }
    };
    element.addEventListener('mousedown', this.events.mousedown, {
      capture: this.options.capture
    });
    element.addEventListener('mouseup', this.events.mouseup, {
      capture: this.options.capture
    });
    element.addEventListener('mousemove', this.events.mousemove, {
      capture: this.options.capture
    });
    element.addEventListener('touchstart', this.events.touchstart, {
      passive: true,
      capture: this.options.capture
    });
    element.addEventListener('touchmove', this.events.touchmove, {
      passive: true,
      capture: this.options.capture
    });
    element.addEventListener('touchcancel', this.events.touchcancel, {
      capture: this.options.capture
    });
    element.addEventListener('touchend', this.events.touchend, {
      capture: this.options.capture
    });
    this.element = element;
    this.callback = callback;
  }
  /**
   * removes event listeners added by Clicked
   */


  _createClass(Clicked, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('mousedown', this.events.mousedown);
      this.element.removeEventListener('mouseup', this.events.mouseup);
      this.element.removeEventListener('mousemove', this.events.mousemove);
      this.element.removeEventListener('touchstart', this.events.touchstart, {
        passive: true
      });
      this.element.removeEventListener('touchmove', this.events.touchmove, {
        passive: true
      });
      this.element.removeEventListener('touchcancel', this.events.touchcancel);
      this.element.removeEventListener('touchend', this.events.touchend);
    }
  }, {
    key: "touchstart",
    value: function touchstart(e) {
      if (this.down === true) {
        this.cancel();
      } else {
        if (e.touches.length === 1) {
          this.handleDown(e.changedTouches[0].screenX, e.changedTouches[0].screenY);
        }
      }
    }
  }, {
    key: "pastThreshold",
    value: function pastThreshold(x, y) {
      return Math.abs(this.lastX - x) > this.options.threshold || Math.abs(this.lastY - y) > this.options.threshold;
    }
  }, {
    key: "touchmove",
    value: function touchmove(e) {
      if (this.down) {
        if (e.touches.length !== 1) {
          this.cancel();
        } else {
          var x = e.changedTouches[0].screenX;
          var y = e.changedTouches[0].screenY;

          if (this.pastThreshold(x, y)) {
            this.cancel();
          }
        }
      }
    }
    /** cancel current event */

  }, {
    key: "cancel",
    value: function cancel() {
      this.down = false;

      if (this.doubleClickedTimeout) {
        clearTimeout(this.doubleClickedTimeout);
        this.doubleClickedTimeout = null;
      }

      if (this.longClickedTimeout) {
        clearTimeout(this.longClickedTimeout);
        this.longClickedTimeout = null;
      }
    }
  }, {
    key: "touchend",
    value: function touchend(e) {
      if (this.down) {
        e.preventDefault();
        this.handleClicks(e, e.pointerId);
      }
    }
  }, {
    key: "handleClicks",
    value: function handleClicks(e) {
      var _this2 = this;

      if (this.options.doubleClicked) {
        this.doubleClickedTimeout = setTimeout(function () {
          return _this2.doubleClicked(e);
        }, this.options.doubleClickedTime);
      } else if (this.options.clicked) {
        this.callback({
          event: e,
          type: 'clicked'
        });
      }

      if (this.longClickedTimeout) {
        clearTimeout(this.longClickedTimeout);
        this.longClickedTimeout = null;
      }

      this.down = false;
    }
  }, {
    key: "handleDown",
    value: function handleDown(e, x, y) {
      var _this3 = this;

      if (this.doubleClickedTimeout) {
        if (this.pastThreshold(x, y)) {
          if (this.options.clicked) {
            this.callback({
              event: e,
              type: 'clicked'
            });
          }

          this.cancel();
        } else {
          this.callback({
            event: e,
            type: 'double-clicked'
          });
          this.cancel();
        }
      } else {
        this.lastX = x;
        this.lastY = y;
        this.down = true;

        if (this.options.longClicked) {
          this.longClickedTimeout = setTimeout(function () {
            return _this3.longClicked(e);
          }, this.options.longClickedTime);
        }

        if (this.options.clickDown) {
          this.callback({
            event: e,
            type: 'click-down'
          });
        }
      }
    }
  }, {
    key: "longClicked",
    value: function longClicked(e) {
      this.longClikedTimeout = null;
      this.down = false;
      this.callback({
        event: e,
        type: 'long-clicked'
      });
    }
  }, {
    key: "doubleClicked",
    value: function doubleClicked(e) {
      this.doubleClickedTimeout = null;
      this.callback({
        event: e,
        type: 'clicked'
      });
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      if (this.down === true) {
        this.down = false;
      } else {
        this.handleDown(e, e.screenX, e.screenY);
      }
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      if (this.down) {
        var x = e.screenX;
        var y = e.screenY;

        if (this.pastThreshold(x, y)) {
          this.cancel();
        }
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(e) {
      if (this.down) {
        e.preventDefault();
        this.handleClicks(e);
      }
    }
  }]);

  return Clicked;
}();
/**
 * Callback for
 * @callback Clicked~ClickedCallback
 * @param {UIEvent} event
 * @param {('clicked'|'double-clicked'|'long-clicked'|'click-down')} type
 */
},{}],"code.js":[function(require,module,exports) {
"use strict";

var _clicked = require("../clicked.js");

function el(query) {
  return document.querySelector(query);
}

window.onload = function () {
  (0, _clicked.clicked)('.element-1', function (e) {
    return el('.response-1').innerHTML = e.type;
  });
  (0, _clicked.clicked)('.element-2', function (e) {
    return el('.response-2').innerHTML = e.type;
  }, {
    doubleClicked: true
  });
  (0, _clicked.clicked)('.element-3', function (e) {
    return el('.response-3').innerHTML = e.type;
  }, {
    longClicked: true
  });
  (0, _clicked.clicked)('.element-4', function (e) {
    return el('.response-4').innerHTML = e.type;
  }, {
    doubleClicked: true,
    longClicked: true
  });
  (0, _clicked.clicked)('.element-5', function (e) {
    return el('.response-5').innerHTML = e.type;
  }, {
    doubleClicked: true,
    doubleClickedTime: 1000
  });
  (0, _clicked.clicked)('.element-6', function (e) {
    return el('.response-6').innerHTML = e.type;
  }, {
    longClicked: true,
    longClickedTime: 1000
  });
};
},{"../clicked.js":"../clicked.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34909" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","code.js"], null)
//# sourceMappingURL=/code.7f948419.js.map