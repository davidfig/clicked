"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Clicked = exports.clicked = void 0;
var defaultOptions = {
    threshold: 10,
    clicked: true,
    mouse: true,
    touch: 1,
    doubleClicked: false,
    doubleClickedTime: 300,
    longClicked: false,
    longClickedTime: 500,
    capture: false,
    clickDown: false
};
function clicked(element, callback, options) {
    return new Clicked(element, callback, options);
}
exports.clicked = clicked;
var Clicked = (function () {
    function Clicked(element, callback, options) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
            if (!element) {
                console.warn("Unknown element: document.querySelector(" + element + ") in clicked()");
                return;
            }
        }
        this.element = element;
        this.callback = callback;
        this.options = __assign(__assign({}, defaultOptions), options);
        this.createListeners();
    }
    Clicked.prototype.createListeners = function () {
        var _this = this;
        this.events = {
            mousedown: function (e) { return _this.mousedown(e); },
            mouseup: function (e) { return _this.mouseup(e); },
            mousemove: function (e) { return _this.mousemove(e); },
            touchstart: function (e) { return _this.touchstart(e); },
            touchmove: function (e) { return _this.touchmove(e); },
            touchcancel: function () { return _this.cancel(); },
            touchend: function (e) { return _this.touchend(e); }
        };
        this.element.addEventListener('mousedown', this.events.mousedown, { capture: this.options.capture });
        this.element.addEventListener('mouseup', this.events.mouseup, { capture: this.options.capture });
        this.element.addEventListener('mousemove', this.events.mousemove, { capture: this.options.capture });
        this.element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchcancel', this.events.touchcancel, { capture: this.options.capture });
        this.element.addEventListener('touchend', this.events.touchend, { capture: this.options.capture });
    };
    Clicked.prototype.destroy = function () {
        this.element.removeEventListener('mousedown', this.events.mousedown);
        this.element.removeEventListener('mouseup', this.events.mouseup);
        this.element.removeEventListener('mousemove', this.events.mousemove);
        this.element.removeEventListener('touchstart', this.events.touchstart);
        this.element.removeEventListener('touchmove', this.events.touchmove);
        this.element.removeEventListener('touchcancel', this.events.touchcancel);
        this.element.removeEventListener('touchend', this.events.touchend);
    };
    Clicked.prototype.touchstart = function (e) {
        if (this.options.touch) {
            if (this.down === true) {
                this.cancel();
            }
            else {
                if (this.options.touch === true || e.touches.length <= this.options.touch) {
                    this.handleDown(e, e.changedTouches[0].screenX, e.changedTouches[0].screenY);
                }
            }
        }
    };
    Clicked.prototype.pastThreshold = function (x, y) {
        return Math.abs(this.lastX - x) > this.options.threshold || Math.abs(this.lastY - y) > this.options.threshold;
    };
    Clicked.prototype.touchmove = function (e) {
        if (this.down) {
            if (e.touches.length !== 1) {
                this.cancel();
            }
            else {
                var x = e.changedTouches[0].screenX;
                var y = e.changedTouches[0].screenY;
                if (this.pastThreshold(x, y)) {
                    this.cancel();
                }
            }
        }
    };
    Clicked.prototype.cancel = function () {
        this.down = false;
        if (this.doubleClickedTimeout) {
            clearTimeout(this.doubleClickedTimeout);
            this.doubleClickedTimeout = null;
        }
        if (this.longClickedTimeout) {
            clearTimeout(this.longClickedTimeout);
            this.longClickedTimeout = null;
        }
    };
    Clicked.prototype.touchend = function (e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    };
    Clicked.prototype.handleClicks = function (e) {
        var _this = this;
        if (this.options.doubleClicked) {
            this.doubleClickedTimeout = this.setTimeout(function () { return _this.doubleClickedCancel(e); }, this.options.doubleClickedTime);
        }
        else if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked', x: this.lastX, y: this.lastY });
        }
        if (this.longClickedTimeout) {
            clearTimeout(this.longClickedTimeout);
            this.longClickedTimeout = null;
        }
        this.down = false;
    };
    Clicked.prototype.handleDown = function (e, x, y) {
        var _this = this;
        if (this.doubleClickedTimeout) {
            if (this.pastThreshold(x, y)) {
                if (this.options.clicked) {
                    this.callback({ event: e, type: 'clicked', x: x, y: y });
                }
                this.cancel();
            }
            else {
                this.callback({ event: e, type: 'double-clicked', x: x, y: y });
                this.cancel();
            }
        }
        else {
            this.lastX = x;
            this.lastY = y;
            this.down = true;
            if (this.options.longClicked) {
                this.longClickedTimeout = this.setTimeout(function () { return _this.longClicked(e); }, this.options.longClickedTime);
            }
            if (this.options.clickDown) {
                this.callback({ event: e, type: 'click-down', x: x, y: y });
            }
        }
    };
    Clicked.prototype.longClicked = function (e) {
        this.longClickedTimeout = null;
        this.down = false;
        this.callback({ event: e, type: 'long-clicked', x: this.lastX, y: this.lastY });
    };
    Clicked.prototype.doubleClickedCancel = function (e) {
        this.doubleClickedTimeout = null;
        if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked', x: this.lastX, y: this.lastY });
        }
    };
    Clicked.prototype.checkMouseButtons = function (e) {
        if (this.options.mouse === false) {
            return false;
        }
        else if (this.options.mouse === true) {
            return true;
        }
        else if (e.button === 0) {
            return this.options.mouse.indexOf('left') !== -1;
        }
        else if (e.button === 1) {
            return this.options.mouse.indexOf('middle') !== -1;
        }
        else if (e.button === 2) {
            return this.options.mouse.indexOf('right') !== -1;
        }
    };
    Clicked.prototype.mousedown = function (e) {
        if (this.checkMouseButtons(e)) {
            if (this.down === true) {
                this.down = false;
            }
            else {
                this.handleDown(e, e.screenX, e.screenY);
            }
        }
    };
    Clicked.prototype.mousemove = function (e) {
        if (this.down) {
            var x = e.screenX;
            var y = e.screenY;
            if (this.pastThreshold(x, y)) {
                this.cancel();
            }
        }
    };
    Clicked.prototype.mouseup = function (e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    };
    Clicked.prototype.setTimeout = function (callback, time) {
        return setTimeout(callback, time);
    };
    return Clicked;
}());
exports.Clicked = Clicked;
//# sourceMappingURL=clicked.js.map