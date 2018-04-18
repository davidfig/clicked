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
        element.addEventListener('click', this.events.mouseclick);
        element.addEventListener('touchstart', this.events.touchstart, { passive: true });
        element.addEventListener('touchmove', this.events.touchmove, { passive: true });
        element.addEventListener('touchcancel', this.events.touchcancel);
        element.addEventListener('touchend', this.events.touchend);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWNrZWQuanMiXSwibmFtZXMiOlsiY2xpY2tlZCIsImVsZW1lbnQiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJDbGlja2VkIiwidGhyZXNoaG9sZCIsInRocmVzc2hvbGQiLCJldmVudHMiLCJtb3VzZWNsaWNrIiwiZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGNhbmNlbCIsInRvdWNoZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidG91Y2hlcyIsImxlbmd0aCIsImxhc3RYIiwiY2hhbmdlZFRvdWNoZXMiLCJzY3JlZW5YIiwibGFzdFkiLCJzY3JlZW5ZIiwiZG93biIsIngiLCJ5IiwiTWF0aCIsImFicyIsInBhc3RUaHJlc2hob2xkIiwicHJldmVudERlZmF1bHQiLCJhcmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7Ozs7Ozs7O0FBUUEsU0FBU0EsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEJDLFFBQTFCLEVBQW9DQyxPQUFwQyxFQUNBO0FBQ0ksV0FBTyxJQUFJQyxPQUFKLENBQVlILE9BQVosRUFBcUJDLFFBQXJCLEVBQStCQyxPQUEvQixDQUFQO0FBQ0g7O0lBRUtDLE87QUFFRixxQkFBWUgsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLE9BQS9CLEVBQ0E7QUFBQTs7QUFBQTs7QUFDSSxhQUFLQSxPQUFMLEdBQWVBLFdBQVcsRUFBMUI7QUFDQSxhQUFLRSxVQUFMLEdBQWtCLEtBQUtGLE9BQUwsQ0FBYUcsVUFBYixJQUEyQixFQUE3QztBQUNBLGFBQUtDLE1BQUwsR0FBYztBQUNWQyx3QkFBWSxvQkFBQ0MsQ0FBRDtBQUFBLHVCQUFPLE1BQUtELFVBQUwsQ0FBZ0JDLENBQWhCLENBQVA7QUFBQSxhQURGO0FBRVZDLHdCQUFZLG9CQUFDRCxDQUFEO0FBQUEsdUJBQU8sTUFBS0MsVUFBTCxDQUFn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QUNJLGlCQUFLWSxJQUFMLEdBQVksS0FBWjtBQUNIOzs7aUNBRVFmLEMsRUFDVDtBQUNJLGdCQUFJLEtBQUtlLElBQVQsRUFDQTtBQUNJZixrQkFBRXFCLGNBQUY7QUFDQSxxQkFBSzVCLFFBQUwsQ0FBY08sQ0FBZCxFQUFpQixLQUFLTixPQUFMLENBQWE0QixJQUE5QjtBQUNIO0FBQ0o7OzttQ0FFVXRCLEMsRUFDWDtBQUNJLGlCQUFLUCxRQUFMLENBQWNPLENBQWQsRUFBaUIsS0FBS04sT0FBTCxDQUFhNEIsSUFBOUI7QUFDSDs7Ozs7O0FBR0xDLE9BQU9DLE9BQVAsR0FBaUJqQyxPQUFqQiIsImZpbGUiOiJjbGlja2VkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBKYXZhc2NyaXB0OiBjcmVhdGUgY2xpY2sgZXZlbnQgZm9yIGJvdGggbW91c2UgYW5kIHRvdWNoXG4gKiBAZXhhbXBsZVxuICpcbiAqIGNvbnN0IGNsaWNrZWQgPSByZXF1aXJlKCdjbGlja2VkJylcbiAqXG4gKiBmdW5jdGlvbiBoYW5kbGVDbGljaygpXG4gKiB7XG4gKiAgICBjb25zb2xlLmxvZygnSSB3YXMgY2xpY2tlZC4nKVxuICogfVxuICpcbiAqIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGlja21lJylcbiAqIGNvbnN0IGMgPSBjbGlja2VkKGRpdiwgaGFuZGxlQ2xpY2ssIHt0aHJlc3Nob2xkOiAxNX0pXG4gKlxuICogLy8gY2hhbmdlIGNhbGxiYWNrXG4gKiBjLmNhbGxiYWNrID0gKCkgPT4gY29uc29sZS5sb2coJ2RpZmZlcmVudCBjbGlja2VyJylcbiAqXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsZWQgYWZ0ZXIgY2xpY2s6IGNhbGxiYWNrKGV2ZW50LCBvcHRpb25zLmFyZ3MpXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGhyZXNzaG9sZD0xMF0gaWYgdG91Y2ggbW92ZXMgdGhyZXNoaG9sZC1waXhlbHMgdGhlbiB0aGUgdG91Y2gtY2xpY2sgaXMgY2FuY2VsbGVkXG4gKiBAcGFyYW0geyp9IFtvcHRpb25zLmFyZ3NdIGFyZ3VtZW50cyBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDbGlja2VkfVxuICovXG5mdW5jdGlvbiBjbGlja2VkKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxue1xuICAgIHJldHVybiBuZXcgQ2xpY2tlZChlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucylcbn1cblxuY2xhc3MgQ2xpY2tlZFxue1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICB0aGlzLnRocmVzaGhvbGQgPSB0aGlzLm9wdGlvbnMudGhyZXNzaG9sZCB8fCAxMFxuICAgICAgICB0aGlzLmV2ZW50cyA9IHtcbiAgICAgICAgICAgIG1vdXNlY2xpY2s6IChlKSA9PiB0aGlzLm1vdXNlY2xpY2soZSksXG4gICAgICAgICAgICB0b3VjaHN0YXJ0OiAoZSkgPT4gdGhpcy50b3VjaHN0YXJ0KGUpLFxuICAgICAgICAgICAgdG91Y2htb3ZlOiAoZSkgPT4gdGhpcy50b3VjaG1vdmUoZSksXG4gICAgICAgICAgICB0b3VjaGNhbmNlbDogKGUpID0+IHRoaXMudG91Y2hjYW5jZWwoZSksXG4gICAgICAgICAgICB0b3VjaGVuZDogKGUpID0+IHRoaXMudG91Y2hlbmQoZSlcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ldmVudHMubW91c2VjbGljaylcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ldmVudHMudG91Y2hzdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudHMudG91Y2htb3ZlLCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuZXZlbnRzLnRvdWNoY2FuY2VsKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ldmVudHMudG91Y2hlbmQpXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgYWRkZWQgYnkgQ2xpY2tlZFxuICAgICAqL1xuICAgIGRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ldmVudHMubW91c2VjbGljaylcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmV2ZW50cy50b3VjaHN0YXJ0LCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuZXZlbnRzLnRvdWNobW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuZXZlbnRzLnRvdWNoY2FuY2VsKVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmV2ZW50cy50b3VjaGVuZClcbiAgICB9XG5cbiAgICB0b3VjaHN0YXJ0KGUpXG4gICAge1xuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sYXN0WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWFxuICAgICAgICAgICAgdGhpcy5sYXN0WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWVxuICAgICAgICAgICAgdGhpcy5kb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzdFRocmVzaGhvbGQoeCwgeSlcbiAgICB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLmxhc3RYIC0geCkgPiB0aGlzLnRocmVzaGhvbGQgfHwgTWF0aC5hYnModGhpcy5sYXN0WSAtIHkpID4gdGhpcy50aHJlc2hob2xkXG4gICAgfVxuXG4gICAgdG91Y2htb3ZlKGUpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuZG93biB8fCBlLnRvdWNoZXMubGVuZ3RoICE9PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoY2FuY2VsKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YXG4gICAgICAgIHZhciB5ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZXG4gICAgICAgIGlmICh0aGlzLnBhc3RUaHJlc2hob2xkKHgsIHkpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoY2FuY2VsKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvdWNoY2FuY2VsKClcbiAgICB7XG4gICAgICAgIHRoaXMuZG93biA9IGZhbHNlXG4gICAgfVxuXG4gICAgdG91Y2hlbmQoZSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmRvd24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB0aGlzLm9wdGlvbnMuYXJncylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdXNlY2xpY2soZSlcbiAgICB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgdGhpcy5vcHRpb25zLmFyZ3MpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsaWNrZWQiXX0=