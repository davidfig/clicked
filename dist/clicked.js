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
        element.addEventListener('click', this.events.mouseclick, { capture: options.capture });
        element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: options.capture });
        element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: options.capture });
        element.addEventListener('touchcancel', this.events.touchcancel, { capture: options.capture });
        element.addEventListener('touchend', this.events.touchend, { capture: options.capture });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWNrZWQuanMiXSwibmFtZXMiOlsiY2xpY2tlZCIsImVsZW1lbnQiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJDbGlja2VkIiwidGhyZXNoaG9sZCIsInRocmVzc2hvbGQiLCJldmVudHMiLCJtb3VzZWNsaWNrIiwiZSIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGNhbmNlbCIsInRvdWNoZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcHR1cmUiLCJwYXNzaXZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRvdWNoZXMiLCJsZW5ndGgiLCJsYXN0WCIsImNoYW5nZWRUb3VjaGVzIiwic2NyZWVuWCIsImxhc3RZIiwic2NyZWVuWSIsImRvd24iLCJ4IiwieSIsIk1hdGgiLCJhYnMiLCJwYXN0VGhyZXNoaG9sZCIsInByZXZlbnREZWZhdWx0IiwiYXJncyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxPQUFULENBQWlCQyxPQUFqQixFQUEwQkMsUUFBMUIsRUFBb0NDLE9BQXBDLEVBQ0E7QUFDSSxXQUFPLElBQUlDLE9BQUosQ0FBWUgsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLE9BQS9CLENBQVA7QUFDSDs7SUFFS0MsTztBQUVGLHFCQUFZSCxPQUFaLEVBQXFCQyxRQUFyQixFQUErQkMsT0FBL0IsRUFDQTtBQUFBOztBQUFBOztBQUNJLGFBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGFBQUtFLFVBQUwsR0FBa0IsS0FBS0YsT0FBTCxDQUFhRyxVQUFiLElBQTJCLEVBQTdDO0FBQ0EsYUFBS0MsTUFBTCxHQUFjO0FBQ1ZDLHdCQUFZLG9CQUFDQyxDQUFEO0FBQUEsdUJBQU8sTUFBS0QsVUFBTCxDQUFnQkMsQ0FBaEIsQ0FBUDtBQUFBLGFBREY7QUFFVkMsd0JBQVksb0JBQUNELENBQUQ7QUFBQSx1QkFBTyxNQUFL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RixDQUFpQixDQUFqQixFQUFvQkMsT0FBNUI7QUFDQSxnQkFBSUssSUFBSWxCLEVBQUVZLGNBQUYsQ0FBaUIsQ0FBakIsRUFBb0JHLE9BQTVCO0FBQ0EsZ0JBQUksS0FBS00sY0FBTCxDQUFvQkosQ0FBcEIsRUFBdUJDLENBQXZCLENBQUosRUFDQTtBQUNJLHFCQUFLZixXQUFMO0FBQ0g7QUFDSjs7O3NDQUdEO0FBQ0ksaUJBQUthLElBQUwsR0FBWSxLQUFaO0FBQ0g7OztpQ0FFUWhCLEMsRUFDVDtBQUNJLGdCQUFJLEtBQUtnQixJQUFULEVBQ0E7QUFDSWhCLGtCQUFFc0IsY0FBRjtBQUNBLHFCQUFLN0IsUUFBTCxDQUFjTyxDQUFkLEVBQWlCLEtBQUtOLE9BQUwsQ0FBYTZCLElBQTlCO0FBQ0g7QUFDSjs7O21DQUVVdkIsQyxFQUNYO0FBQ0ksaUJBQUtQLFFBQUwsQ0FBY08sQ0FBZCxFQUFpQixLQUFLTixPQUFMLENBQWE2QixJQUE5QjtBQUNIOzs7Ozs7QUFHTEMsT0FBT0MsT0FBUCxHQUFpQmxDLE9BQWpCIiwiZmlsZSI6ImNsaWNrZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEphdmFzY3JpcHQ6IGNyZWF0ZSBjbGljayBldmVudCBmb3IgYm90aCBtb3VzZSBhbmQgdG91Y2hcbiAqIEBleGFtcGxlXG4gKlxuICogY29uc3QgY2xpY2tlZCA9IHJlcXVpcmUoJ2NsaWNrZWQnKVxuICpcbiAqIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKClcbiAqIHtcbiAqICAgIGNvbnNvbGUubG9nKCdJIHdhcyBjbGlja2VkLicpXG4gKiB9XG4gKlxuICogY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWNrbWUnKVxuICogY29uc3QgYyA9IGNsaWNrZWQoZGl2LCBoYW5kbGVDbGljaywge3RocmVzc2hvbGQ6IDE1fSlcbiAqXG4gKiAvLyBjaGFuZ2UgY2FsbGJhY2tcbiAqIGMuY2FsbGJhY2sgPSAoKSA9PiBjb25zb2xlLmxvZygnZGlmZmVyZW50IGNsaWNrZXInKVxuICpcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGNhbGxlZCBhZnRlciBjbGljazogY2FsbGJhY2soZXZlbnQsIG9wdGlvbnMuYXJncylcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy50aHJlc3Nob2xkPTEwXSBpZiB0b3VjaCBtb3ZlcyB0aHJlc2hob2xkLXBpeGVscyB0aGVuIHRoZSB0b3VjaC1jbGljayBpcyBjYW5jZWxsZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY2FwdHVyZV0gIGV2ZW50cyB3aWxsIGJlIGRpc3BhdGNoZWQgdG8gdGhpcyByZWdpc3RlcmVkIGxpc3RlbmVyIGJlZm9yZSBiZWluZyBkaXNwYXRjaGVkIHRvIGFueSBFdmVudFRhcmdldCBiZW5lYXRoIGl0IGluIHRoZSBET00gdHJlZVxuICogQHBhcmFtIHsqfSBbb3B0aW9ucy5hcmdzXSBhcmd1bWVudHMgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Q2xpY2tlZH1cbiAqL1xuZnVuY3Rpb24gY2xpY2tlZChlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucylcbntcbiAgICByZXR1cm4gbmV3IENsaWNrZWQoZWxlbWVudCwgY2FsbGJhY2ssIG9wdGlvbnMpXG59XG5cbmNsYXNzIENsaWNrZWRcbntcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucylcbiAgICB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICAgICAgdGhpcy50aHJlc2hob2xkID0gdGhpcy5vcHRpb25zLnRocmVzc2hvbGQgfHwgMTBcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7XG4gICAgICAgICAgICBtb3VzZWNsaWNrOiAoZSkgPT4gdGhpcy5tb3VzZWNsaWNrKGUpLFxuICAgICAgICAgICAgdG91Y2hzdGFydDogKGUpID0+IHRoaXMudG91Y2hzdGFydChlKSxcbiAgICAgICAgICAgIHRvdWNobW92ZTogKGUpID0+IHRoaXMudG91Y2htb3ZlKGUpLFxuICAgICAgICAgICAgdG91Y2hjYW5jZWw6IChlKSA9PiB0aGlzLnRvdWNoY2FuY2VsKGUpLFxuICAgICAgICAgICAgdG91Y2hlbmQ6IChlKSA9PiB0aGlzLnRvdWNoZW5kKGUpXG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRzLm1vdXNlY2xpY2ssIHsgY2FwdHVyZTogb3B0aW9ucy5jYXB0dXJlIH0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZXZlbnRzLnRvdWNoc3RhcnQsIHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogb3B0aW9ucy5jYXB0dXJlIH0pXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudHMudG91Y2htb3ZlLCB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IG9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ldmVudHMudG91Y2hjYW5jZWwsIHsgY2FwdHVyZTogb3B0aW9ucy5jYXB0dXJlfSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuZXZlbnRzLnRvdWNoZW5kLCB7IGNhcHR1cmU6IG9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGFkZGVkIGJ5IENsaWNrZWRcbiAgICAgKi9cbiAgICBkZXN0cm95KClcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRzLm1vdXNlY2xpY2spXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ldmVudHMudG91Y2hzdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmV2ZW50cy50b3VjaG1vdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmV2ZW50cy50b3VjaGNhbmNlbClcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ldmVudHMudG91Y2hlbmQpXG4gICAgfVxuXG4gICAgdG91Y2hzdGFydChlKVxuICAgIHtcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblhcbiAgICAgICAgICAgIHRoaXMubGFzdFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlbllcbiAgICAgICAgICAgIHRoaXMuZG93biA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3RUaHJlc2hob2xkKHgsIHkpXG4gICAge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5sYXN0WCAtIHgpID4gdGhpcy50aHJlc2hob2xkIHx8IE1hdGguYWJzKHRoaXMubGFzdFkgLSB5KSA+IHRoaXMudGhyZXNoaG9sZFxuICAgIH1cblxuICAgIHRvdWNobW92ZShlKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd24gfHwgZS50b3VjaGVzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50b3VjaGNhbmNlbCgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWFxuICAgICAgICB2YXIgeSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWVxuICAgICAgICBpZiAodGhpcy5wYXN0VGhyZXNoaG9sZCh4LCB5KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50b3VjaGNhbmNlbCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b3VjaGNhbmNlbCgpXG4gICAge1xuICAgICAgICB0aGlzLmRvd24gPSBmYWxzZVxuICAgIH1cblxuICAgIHRvdWNoZW5kKGUpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kb3duKVxuICAgICAgICB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soZSwgdGhpcy5vcHRpb25zLmFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZWNsaWNrKGUpXG4gICAge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHRoaXMub3B0aW9ucy5hcmdzKVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGlja2VkIl19