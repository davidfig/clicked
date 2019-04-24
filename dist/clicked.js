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
 * const c = clicked(div, handleClick, { thresshold: 15 })
 *
 * // using built-in querySelector
 * const c2 = clicked('#clickme', handleClick)
 *
 * // change callback
 * c.callback = () => console.log('different clicker')
 *
 * // destroy
 * c.destroy()
 */

/**
 * @param {HTMLElement|string} element or querySelector entry (e.g., #id-name or .class-name)
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

        if (typeof element === 'string') {
            element = document.querySelector(element);
            if (!element) {
                console.warn('Unknown element: document.querySelector(' + element + ') in clicked()');
                return;
            }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWNrZWQuanMiXSwibmFtZXMiOlsiY2xpY2tlZCIsImVsZW1lbnQiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJDbGlja2VkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsIndhcm4iLCJ0aHJlc2hob2xkIiwidGhyZXNzaG9sZCIsImV2ZW50cyIsIm1vdXNlY2xpY2siLCJlIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoY2FuY2VsIiwidG91Y2hlbmQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FwdHVyZSIsInBhc3NpdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidG91Y2hlcyIsImxlbmd0aCIsImxhc3RYIiwiY2hhbmdlZFRvdWNoZXMiLCJzY3JlZW5YIiwibGFzdFkiLCJzY3JlZW5ZIiwiZG93biIsIngiLCJ5IiwiTWF0aCIsImFicyIsInBhc3RUaHJlc2hob2xkIiwicHJldmVudERlZmF1bHQiLCJhcmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEJDLFFBQTFCLEVBQW9DQyxPQUFwQyxFQUNBO0FBQ0ksV0FBTyxJQUFJQyxPQUFKLENBQVlILE9BQVosRUFBcUJDLFFBQXJCLEVBQStCQyxPQUEvQixDQUFQO0FBQ0g7O0lBRUtDLE87QUFFRixxQkFBWUgsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLE9BQS9CLEVBQ0E7QUFBQTs7QUFBQTs7QUFDSSxZQUFJLE9BQU9GLE9BQVAsS0FBbUIsUUFBdkIsRUFDQTtBQUNJQSxzQkFBVUksU0FBU0MsYUFBVCxDQUF1QkwsT0FBdkIsQ0FBVjtBQUNBLGdCQUFJLENBQUNBLE9BQUwsRUFDQTtBQUNJTSx3QkFBUUMsSUFBUiw4Q0FBd0RQLE9BQXhEO0FBQ0E7QUFDSDtBQUNKO0FBQ0QsYUFBS0UsT0FBTCxHQUFl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LEtBQUtDLEdBQUwsQ0FBUyxLQUFLVCxLQUFMLEdBQWFNLENBQXRCLElBQTJCLEtBQUtyQixVQUFoQyxJQUE4Q3VCLEtBQUtDLEdBQUwsQ0FBUyxLQUFLTixLQUFMLEdBQWFJLENBQXRCLElBQTJCLEtBQUt0QixVQUFyRjtBQUNIOzs7a0NBRVNJLEMsRUFDVjtBQUNJLGdCQUFJLENBQUMsS0FBS2dCLElBQU4sSUFBY2hCLEVBQUVTLE9BQUYsQ0FBVUMsTUFBVixLQUFxQixDQUF2QyxFQUNBO0FBQ0kscUJBQUtQLFdBQUw7QUFDQTtBQUNIO0FBQ0QsZ0JBQUljLElBQUlqQixFQUFFWSxjQUFGLENBQWlCLENBQWpCLEVBQW9CQyxPQUE1QjtBQUNBLGdCQUFJSyxJQUFJbEIsRUFBRVksY0FBRixDQUFpQixDQUFqQixFQUFvQkcsT0FBNUI7QUFDQSxnQkFBSSxLQUFLTSxjQUFMLENBQW9CSixDQUFwQixFQUF1QkMsQ0FBdkIsQ0FBSixFQUNBO0FBQ0kscUJBQUtmLFdBQUw7QUFDSDtBQUNKOzs7c0NBR0Q7QUFDSSxpQkFBS2EsSUFBTCxHQUFZLEtBQVo7QUFDSDs7O2lDQUVRaEIsQyxFQUNUO0FBQ0ksZ0JBQUksS0FBS2dCLElBQVQsRUFDQTtBQUNJaEIsa0JBQUVzQixjQUFGO0FBQ0EscUJBQUtqQyxRQUFMLENBQWNXLENBQWQsRUFBaUIsS0FBS1YsT0FBTCxDQUFhaUMsSUFBOUI7QUFDSDtBQUNKOzs7bUNBRVV2QixDLEVBQ1g7QUFDSSxpQkFBS1gsUUFBTCxDQUFjVyxDQUFkLEVBQWlCLEtBQUtWLE9BQUwsQ0FBYWlDLElBQTlCO0FBQ0g7Ozs7OztBQUdMQyxPQUFPQyxPQUFQLEdBQWlCdEMsT0FBakIiLCJmaWxlIjoiY2xpY2tlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSmF2YXNjcmlwdDogY3JlYXRlIGNsaWNrIGV2ZW50IGZvciBib3RoIG1vdXNlIGFuZCB0b3VjaFxuICogQGV4YW1wbGVcbiAqXG4gKiBjb25zdCBjbGlja2VkID0gcmVxdWlyZSgnY2xpY2tlZCcpXG4gKlxuICogZnVuY3Rpb24gaGFuZGxlQ2xpY2soKVxuICoge1xuICogICAgY29uc29sZS5sb2coJ0kgd2FzIGNsaWNrZWQuJylcbiAqIH1cbiAqXG4gKiBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpY2ttZScpXG4gKiBjb25zdCBjID0gY2xpY2tlZChkaXYsIGhhbmRsZUNsaWNrLCB7IHRocmVzc2hvbGQ6IDE1IH0pXG4gKlxuICogLy8gdXNpbmcgYnVpbHQtaW4gcXVlcnlTZWxlY3RvclxuICogY29uc3QgYzIgPSBjbGlja2VkKCcjY2xpY2ttZScsIGhhbmRsZUNsaWNrKVxuICpcbiAqIC8vIGNoYW5nZSBjYWxsYmFja1xuICogYy5jYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdkaWZmZXJlbnQgY2xpY2tlcicpXG4gKlxuICogLy8gZGVzdHJveVxuICogYy5kZXN0cm95KClcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8c3RyaW5nfSBlbGVtZW50IG9yIHF1ZXJ5U2VsZWN0b3IgZW50cnkgKGUuZy4sICNpZC1uYW1lIG9yIC5jbGFzcy1uYW1lKVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGVkIGFmdGVyIGNsaWNrOiBjYWxsYmFjayhldmVudCwgb3B0aW9ucy5hcmdzKVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRocmVzc2hvbGQ9MTBdIGlmIHRvdWNoIG1vdmVzIHRocmVzaGhvbGQtcGl4ZWxzIHRoZW4gdGhlIHRvdWNoLWNsaWNrIGlzIGNhbmNlbGxlZFxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jYXB0dXJlXSAgZXZlbnRzIHdpbGwgYmUgZGlzcGF0Y2hlZCB0byB0aGlzIHJlZ2lzdGVyZWQgbGlzdGVuZXIgYmVmb3JlIGJlaW5nIGRpc3BhdGNoZWQgdG8gYW55IEV2ZW50VGFyZ2V0IGJlbmVhdGggaXQgaW4gdGhlIERPTSB0cmVlXG4gKiBAcGFyYW0geyp9IFtvcHRpb25zLmFyZ3NdIGFyZ3VtZW50cyBmb3IgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtDbGlja2VkfVxuICovXG5mdW5jdGlvbiBjbGlja2VkKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxue1xuICAgIHJldHVybiBuZXcgQ2xpY2tlZChlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucylcbn1cblxuY2xhc3MgQ2xpY2tlZFxue1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKVxuICAgIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudClcbiAgICAgICAgICAgIGlmICghZWxlbWVudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVua25vd24gZWxlbWVudDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcigke2VsZW1lbnR9KSBpbiBjbGlja2VkKClgKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICAgICAgdGhpcy50aHJlc2hob2xkID0gdGhpcy5vcHRpb25zLnRocmVzc2hvbGQgfHwgMTBcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7XG4gICAgICAgICAgICBtb3VzZWNsaWNrOiAoZSkgPT4gdGhpcy5tb3VzZWNsaWNrKGUpLFxuICAgICAgICAgICAgdG91Y2hzdGFydDogKGUpID0+IHRoaXMudG91Y2hzdGFydChlKSxcbiAgICAgICAgICAgIHRvdWNobW92ZTogKGUpID0+IHRoaXMudG91Y2htb3ZlKGUpLFxuICAgICAgICAgICAgdG91Y2hjYW5jZWw6IChlKSA9PiB0aGlzLnRvdWNoY2FuY2VsKGUpLFxuICAgICAgICAgICAgdG91Y2hlbmQ6IChlKSA9PiB0aGlzLnRvdWNoZW5kKGUpXG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXZlbnRzLm1vdXNlY2xpY2ssIHsgY2FwdHVyZTogdGhpcy5vcHRpb25zLmNhcHR1cmUgfSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ldmVudHMudG91Y2hzdGFydCwgeyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0aGlzLm9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuZXZlbnRzLnRvdWNobW92ZSwgeyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0aGlzLm9wdGlvbnMuY2FwdHVyZSB9KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ldmVudHMudG91Y2hjYW5jZWwsIHsgY2FwdHVyZTogdGhpcy5vcHRpb25zLmNhcHR1cmV9KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ldmVudHMudG91Y2hlbmQsIHsgY2FwdHVyZTogdGhpcy5vcHRpb25zLmNhcHR1cmUgfSlcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBhZGRlZCBieSBDbGlja2VkXG4gICAgICovXG4gICAgZGVzdHJveSgpXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmV2ZW50cy5tb3VzZWNsaWNrKVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuZXZlbnRzLnRvdWNoc3RhcnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5ldmVudHMudG91Y2htb3ZlLCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5ldmVudHMudG91Y2hjYW5jZWwpXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuZXZlbnRzLnRvdWNoZW5kKVxuICAgIH1cblxuICAgIHRvdWNoc3RhcnQoZSlcbiAgICB7XG4gICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxhc3RYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YXG4gICAgICAgICAgICB0aGlzLmxhc3RZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZXG4gICAgICAgICAgICB0aGlzLmRvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0VGhyZXNoaG9sZCh4LCB5KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubGFzdFggLSB4KSA+IHRoaXMudGhyZXNoaG9sZCB8fCBNYXRoLmFicyh0aGlzLmxhc3RZIC0geSkgPiB0aGlzLnRocmVzaGhvbGRcbiAgICB9XG5cbiAgICB0b3VjaG1vdmUoZSlcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5kb3duIHx8IGUudG91Y2hlcy5sZW5ndGggIT09IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hjYW5jZWwoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblhcbiAgICAgICAgdmFyIHkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlbllcbiAgICAgICAgaWYgKHRoaXMucGFzdFRocmVzaGhvbGQoeCwgeSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hjYW5jZWwoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG91Y2hjYW5jZWwoKVxuICAgIHtcbiAgICAgICAgdGhpcy5kb3duID0gZmFsc2VcbiAgICB9XG5cbiAgICB0b3VjaGVuZChlKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZG93bilcbiAgICAgICAge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHRoaXMub3B0aW9ucy5hcmdzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW91c2VjbGljayhlKVxuICAgIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB0aGlzLm9wdGlvbnMuYXJncylcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xpY2tlZCJdfQ==