'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Javascript: create click event for both mouse and touch
 * @example
 *
 * const clicked = require('clicked')
 *
 * function handleClick()
 * {
 *    console.log('I was clicked.')
 * }
 *
 * const div = document.getElementById('clickme')
 * const c = clicked(div, handleClick, {thresshold: 15})
 *
 * // change callback
 * c.callback = () => console.log('different clicker')
 *
 */

/**
 * @param {HTMLElement} element
 * @param {function} callback called after click: callback(event, options.args)
 * @param {object} [options]
 * @param {number} [options.thresshold=10] if touch moves threshhold-pixels then the touch-click is cancelled
 * @param {boolean} [options.capture]  events will be dispatched to this registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 * @param {*} [options.args] arguments for callback function
 * @returns {Clicked}
 */
function clicked(element, callback, options) {
    return new Clicked(element, callback, options);
}

var Clicked = function () {
    function Clicked(element, callback, options) {
        var _this = this;

        _classCallCheck(this, Clicked);

        this.options = options || {};
        this.threshhold = this.options.thresshold || 10;
        this.events = {
            mouseclick: function mouseclick(e) {
                return _this.mouseclick(e);
            },
            touchstart: function touchstart(e) {
                return _this.touchstart(e);
            },
            touchmove: function touchmove(e) {
                return _this.touchmove(e);
            },
            touchcancel: function touchcancel(e) {
                return _this.touchcancel(e);
            },
            touchend: function touchend(e) {
                return _this.touchend(e);
            }
        };
        element.addEventListener('click', this.events.mouseclick, { capture: this.options.capture });
        element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: this.options.capture });
        element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: this.options.capture });
        element.addEventListener('touchcancel', this.events.touchcancel, { capture: this.options.capture });
        element.addEventListener('touchend', this.events.touchend, { capture: this.options.capture });
        this.element = element;
        this.callback = callback;
    }

    /**
     * removes event listeners added by Clicked
     */


    _createClass(Clicked, [{
        key: 'destroy',
        value: function destroy() {
            this.element.removeEventListener('click', this.events.mouseclick);
            this.element.removeEventListener('touchstart', this.events.touchstart, { passive: true });
            this.element.removeEventListener('touchmove', this.events.touchmove, { passive: true });
            this.element.removeEventListener('touchcancel', this.events.touchcancel);
            this.element.removeEventListener('touchend', this.events.touchend);
        }
    }, {
        key: 'touchstart',
        value: function touchstart(e) {
            if (e.touches.length === 1) {
                this.lastX = e.changedTouches[0].screenX;
                this.lastY = e.changedTouches[0].screenY;
                this.down = true;
            }
        }
    }, {
        key: 'pastThreshhold',
        value: function pastThreshhold(x, y) {
            return Math.abs(this.lastX - x) > this.threshhold || Math.abs(this.lastY - y) > this.threshhold;
        }
    }, {
        key: 'touchmove',
        value: function touchmove(e) {
            if (!this.down || e.touches.length !== 1) {
                this.touchcancel();
                return;
            }
            var x = e.changedTouches[0].screenX;
            var y = e.changedTouches[0].screenY;
            if (this.pastThreshhold(x, y)) {
                this.touchcancel();
            }
        }
    }, {
        key: 'touchcancel',
        value: function touchcancel() {
            this.down = false;
        }
    }, {
        key: 'touchend',
        value: function touchend(e) {
            if (this.down) {
                e.preventDefault();
                this.callback(e, this.options.args);
            }
        }
    }, {
        key: 'mouseclick',
        value: function mouseclick(e) {
            this.callback(e, this.options.args);
        }
    }]);

    return Clicked;
}();

module.exports = clicked;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWNrZWQuanMiXSwibmFtZXMiOlsiY2xpY2tlZCIsImVsZW1lbnQiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJDbGlja2VkIiwidGhyZXNoaG9sZCIsInRocmVzc2hvbGQiLCJldmVudHMiLCJtb3VzZWNsaWNrIiwiZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGNhbmNlbCIsInRvdWNoZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcHR1cmUiLCJwYXNzaXZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRvdWNoZXMiLCJsZW5ndGgiLCJsYXN0WCIsImNoYW5nZWRUb3VjaGVzIiwic2NyZWVuWCIsImxhc3RZIiwic2NyZWVuWSIsImRvd24iLCJ4IiwieSIsIk1hdGgiLCJhYnMiLCJwYXN0VGhyZXNoaG9sZCIsInByZXZlbnREZWZhdWx0IiwiYXJncyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxPQUFULENBQWlCQyxPQUFqQixFQUEwQkMsUUFBMUIsRUFBb0NDLE9BQXBDLEVBQ0E7QUFDSSxXQUFPLElBQUlDLE9BQUosQ0FBWUgsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLE9BQS9CLENBQVA7QUFDSDs7SUFFS0MsTztBQUVGLHFCQUFZSCxPQUFaLEVBQXFCQyxRQUFyQixFQUErQkMsT0FBL0IsRUFDQTtBQUFBOztBQUFBOztBQUNJLGFBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGFBQUtFLFVBQUwsR0FBa0IsS0FBS0YsT0FBTCxDQUFhRyxVQUFiLElBQTJCLEVBQTdDO0FBQ0EsYUFBS0MsTUFBTCxHQUFjO0FBQ1ZDLHdCQUFZLG9CQUFDQyxDQUFEO0FBQUEsdUJBQU8sTUFBS0QsVUFBTCxDQUFnQkMsQ0FBaEIsQ0FBUDtBQUFBLGFBREY7QUFFVkMsd0JBQVksb0JBQUNELENBQUQ7QUFBQSx1QkFBTyxNQUFL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cUJBQUtQLFdBQUw7QUFDQTtBQUNIO0FBQ0QsZ0JBQUljLElBQUlqQixFQUFFWSxjQUFGLENBQWlCLENBQWpCLEVBQW9CQyxPQUE1QjtBQUNBLGdCQUFJSyxJQUFJbEIsRUFBRVksY0FBRixDQUFpQixDQUFqQixFQUFvQkcsT0FBNUI7QUFDQSxnQkFBSSxLQUFLTSxjQUFMLENBQW9CSixDQUFwQixFQUF1QkMsQ0FBdkIsQ0FBSixFQUNBO0FBQ0kscUJBQUtmLFdBQUw7QUFDSDtBQUNKOzs7c0NBR0Q7QUFDSSxpQkFBS2EsSUFBTCxHQUFZLEtBQVo7QUFDSDs7O2lDQUVRaEIsQyxFQUNUO0FBQ0ksZ0JBQUksS0FBS2dCLElBQVQsRUFDQTtBQUNJaEIsa0JBQUVzQixjQUFGO0FBQ0EscUJBQUs3QixRQUFMLENBQWNPLENBQWQsRUFBaUIsS0FBS04sT0FBTCxDQUFhNkIsSUFBOUI7QUFDSDtBQUNKOzs7bUNBRVV2QixDLEVBQ1g7QUFDSSxpQkFBS1AsUUFBTCxDQUFjTyxDQUFkLEVBQWlCLEtBQUtOLE9BQUwsQ0FBYTZCLElBQTlCO0FBQ0g7Ozs7OztBQUdMQyxPQUFPQyxPQUFQLEdBQWlCbEMsT0FBakIiLCJmaWxlIjoiY2xpY2tlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSmF2YXNjcmlwdDogY3JlYXRlIGNsaWNrIGV2ZW50IGZvciBib3RoIG1vdXNlIGFuZCB0b3VjaFxuICogQGV4YW1wbGVcbiAqXG4gKiBjb25zdCBjbGlja2VkID0gcmVxdWlyZSgnY2xpY2tlZCcpXG4gKlxuICogZnVuY3Rpb24gaGFuZGxlQ2xpY2soKVxuICoge1xuICogICAgY29uc29sZS5sb2coJ0kgd2FzIGNsaWNrZWQuJylcbiAqIH1cbiAqXG4gKiBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpY2ttZScpXG4gKiBjb25zdCBjID0gY2xpY2tlZChkaXYsIGhhbmRsZUNsaWNrLCB7dGhyZXNzaG9sZDogMTV9KVxuICpcbiAqIC8vIGNoYW5nZSBjYWxsYmFja1xuICogYy5jYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdkaWZmZXJlbnQgY2xpY2tlcicpXG4gKlxuICovXG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGVkIGFmdGVyIGNsaWNrOiBjYWxsYmFjayhldmVudCwgb3B0aW9ucy5hcmdzKVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRocmVzc2hvbGQ9MTBdIGlmIHRvdWNoIG1vdmVzIHRocmVzaGhvbGQtcGl4ZWxzIHRoZW4gdGhlIHRvdWNoLWNsaWNrIGlzIGNhbmNlbGxlZFxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jYXB0dXJlXSAgZXZlbnRzIHdpbGwgYmUgZGlzcGF0Y2hlZCB0byB0aGlzIHJlZ2lzdGVyZWQgbGlzdGVuZXIgYmVmb3JlIGJlaW5nIGRpc3BhdGNoZWQgdG8gYW55IEV2ZW50VGFyZ2V0IGJlbmVhdGggaXQgaW4gdGhlIERPTSB0cmVlXG4gKiBAcGFyYW0geyp9IFtvcHRpb25zLmFyZ3NdIGFyZ3VtZW50cyBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDbGlja2VkfVxuICovXG5mdW5jdGlvbiBjbGlja2VkKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxue1xuICAgIHJldHVybiBuZXcgQ2xpY2tlZChlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucylcbn1cblxuY2xhc3MgQ2xpY2tlZFxue1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICB0aGlzLnRocmVzaGhvbGQgPSB0aGlzLm9wdGlvbnMudGhyZXNzaG9sZCB8fCAxMFxuICAgICAgICB0aGlzLmV2ZW50cyA9IHtcbiAgICAgICAgICAgIG1vdXNlY2xpY2s6IChlKSA9PiB0aGlzLm1vdXNlY2xpY2soZSksXG4gICAgICAgICAgICB0b3VjaHN0YXJ0OiAoZSkgPT4gdGhpcy50b3VjaHN0YXJ0KGUpLFxuICAgICAgICAgICAgdG91Y2htb3ZlOiAoZSkgPT4gdGhpcy50b3VjaG1vdmUoZSksXG4gICAgICAgICAgICB0b3VjaGNhbmNlbDogKGUpID0+IHRoaXMudG91Y2hjYW5jZWwoZSksXG4gICAgICAgICAgICB0b3VjaGVuZDogKGUpID0+IHRoaXMudG91Y2hlbmQoZSlcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ldmVudHMubW91c2VjbGljaywgeyBjYXB0dXJlOiB0aGlzLm9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmV2ZW50cy50b3VjaHN0YXJ0LCB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRoaXMub3B0aW9ucy5jYXB0dXJlIH0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudHMudG91Y2htb3ZlLCB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRoaXMub3B0aW9ucy5jYXB0dXJlIH0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmV2ZW50cy50b3VjaGNhbmNlbCwgeyBjYXB0dXJlOiB0aGlzLm9wdGlvbnMuY2FwdHVyZX0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmV2ZW50cy50b3VjaGVuZCwgeyBjYXB0dXJlOiB0aGlzLm9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGFkZGVkIGJ5IENsaWNrZWRcbiAgICAgKi9cbiAgICBkZXN0cm95KClcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRzLm1vdXNlY2xpY2spXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ldmVudHMudG91Y2hzdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmV2ZW50cy50b3VjaG1vdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmV2ZW50cy50b3VjaGNhbmNlbClcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ldmVudHMudG91Y2hlbmQpXG4gICAgfVxuXG4gICAgdG91Y2hzdGFydChlKVxuICAgIHtcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblhcbiAgICAgICAgICAgIHRoaXMubGFzdFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlbllcbiAgICAgICAgICAgIHRoaXMuZG93biA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3RUaHJlc2hob2xkKHgsIHkpXG4gICAge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5sYXN0WCAtIHgpID4gdGhpcy50aHJlc2hob2xkIHx8IE1hdGguYWJzKHRoaXMubGFzdFkgLSB5KSA+IHRoaXMudGhyZXNoaG9sZFxuICAgIH1cblxuICAgIHRvdWNobW92ZShlKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd24gfHwgZS50b3VjaGVzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50b3VjaGNhbmNlbCgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWFxuICAgICAgICB2YXIgeSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWVxuICAgICAgICBpZiAodGhpcy5wYXN0VGhyZXNoaG9sZCh4LCB5KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50b3VjaGNhbmNlbCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b3VjaGNhbmNlbCgpXG4gICAge1xuICAgICAgICB0aGlzLmRvd24gPSBmYWxzZVxuICAgIH1cblxuICAgIHRvdWNoZW5kKGUpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kb3duKVxuICAgICAgICB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soZSwgdGhpcy5vcHRpb25zLmFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZWNsaWNrKGUpXG4gICAge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHRoaXMub3B0aW9ucy5hcmdzKVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGlja2VkIl19