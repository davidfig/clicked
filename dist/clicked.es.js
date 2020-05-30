const defaultOptions = {
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
export function clicked(element, callback, options) {
    return new Clicked(element, callback, options);
}
export class Clicked {
    constructor(element, callback, options) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
            if (!element) {
                console.warn(`Unknown element: document.querySelector(${element}) in clicked()`);
                return;
            }
        }
        this.element = element;
        this.callback = callback;
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        this.createListeners();
    }
    createListeners() {
        this.events = {
            mousedown: (e) => this.mousedown(e),
            mouseup: (e) => this.mouseup(e),
            mousemove: (e) => this.mousemove(e),
            touchstart: (e) => this.touchstart(e),
            touchmove: (e) => this.touchmove(e),
            touchcancel: () => this.cancel(),
            touchend: (e) => this.touchend(e)
        };
        this.element.addEventListener('mousedown', this.events.mousedown, { capture: this.options.capture });
        this.element.addEventListener('mouseup', this.events.mouseup, { capture: this.options.capture });
        this.element.addEventListener('mousemove', this.events.mousemove, { capture: this.options.capture });
        this.element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchcancel', this.events.touchcancel, { capture: this.options.capture });
        this.element.addEventListener('touchend', this.events.touchend, { capture: this.options.capture });
    }
    destroy() {
        this.element.removeEventListener('mousedown', this.events.mousedown);
        this.element.removeEventListener('mouseup', this.events.mouseup);
        this.element.removeEventListener('mousemove', this.events.mousemove);
        this.element.removeEventListener('touchstart', this.events.touchstart);
        this.element.removeEventListener('touchmove', this.events.touchmove);
        this.element.removeEventListener('touchcancel', this.events.touchcancel);
        this.element.removeEventListener('touchend', this.events.touchend);
    }
    touchstart(e) {
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
    }
    pastThreshold(x, y) {
        return Math.abs(this.lastX - x) > this.options.threshold || Math.abs(this.lastY - y) > this.options.threshold;
    }
    touchmove(e) {
        if (this.down) {
            if (e.touches.length !== 1) {
                this.cancel();
            }
            else {
                const x = e.changedTouches[0].screenX;
                const y = e.changedTouches[0].screenY;
                if (this.pastThreshold(x, y)) {
                    this.cancel();
                }
            }
        }
    }
    cancel() {
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
    touchend(e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    }
    handleClicks(e) {
        if (this.options.doubleClicked) {
            this.doubleClickedTimeout = this.setTimeout(() => this.doubleClickedCancel(e), this.options.doubleClickedTime);
        }
        else if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked' });
        }
        if (this.longClickedTimeout) {
            clearTimeout(this.longClickedTimeout);
            this.longClickedTimeout = null;
        }
        this.down = false;
    }
    handleDown(e, x, y) {
        if (this.doubleClickedTimeout) {
            if (this.pastThreshold(x, y)) {
                if (this.options.clicked) {
                    this.callback({ event: e, type: 'clicked' });
                }
                this.cancel();
            }
            else {
                this.callback({ event: e, type: 'double-clicked' });
                this.cancel();
            }
        }
        else {
            this.lastX = x;
            this.lastY = y;
            this.down = true;
            if (this.options.longClicked) {
                this.longClickedTimeout = this.setTimeout(() => this.longClicked(e), this.options.longClickedTime);
            }
            if (this.options.clickDown) {
                this.callback({ event: e, type: 'click-down' });
            }
        }
    }
    longClicked(e) {
        this.longClickedTimeout = null;
        this.down = false;
        this.callback({ event: e, type: 'long-clicked' });
    }
    doubleClickedCancel(e) {
        this.doubleClickedTimeout = null;
        if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked' });
        }
    }
    checkMouseButtons(e) {
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
    }
    mousedown(e) {
        if (this.checkMouseButtons(e)) {
            if (this.down === true) {
                this.down = false;
            }
            else {
                this.handleDown(e, e.screenX, e.screenY);
            }
        }
    }
    mousemove(e) {
        if (this.down) {
            const x = e.screenX;
            const y = e.screenY;
            if (this.pastThreshold(x, y)) {
                this.cancel();
            }
        }
    }
    mouseup(e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    }
    setTimeout(callback, time) {
        return setTimeout(callback, time);
    }
}
//# sourceMappingURL=clicked.js.map