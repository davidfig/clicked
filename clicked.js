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
function clicked(element, callback, options)
{
    return new Clicked(element, callback, options)
}

class Clicked
{
    constructor(element, callback, options)
    {
        this.options = options || {}
        this.threshhold = this.options.thresshold || 10
        this.events = {
            mouseclick: (e) => this.mouseclick(e),
            touchstart: (e) => this.touchstart(e),
            touchmove: (e) => this.touchmove(e),
            touchcancel: (e) => this.touchcancel(e),
            touchend: (e) => this.touchend(e)
        }
        element.addEventListener('click', this.events.mouseclick, { capture: options.capture })
        element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: options.capture })
        element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: options.capture })
        element.addEventListener('touchcancel', this.events.touchcancel, { capture: options.capture})
        element.addEventListener('touchend', this.events.touchend, { capture: options.capture })
        this.element = element
        this.callback = callback
    }

    /**
     * removes event listeners added by Clicked
     */
    destroy()
    {
        this.element.removeEventListener('click', this.events.mouseclick)
        this.element.removeEventListener('touchstart', this.events.touchstart, { passive: true })
        this.element.removeEventListener('touchmove', this.events.touchmove, { passive: true })
        this.element.removeEventListener('touchcancel', this.events.touchcancel)
        this.element.removeEventListener('touchend', this.events.touchend)
    }

    touchstart(e)
    {
        if (e.touches.length === 1)
        {
            this.lastX = e.changedTouches[0].screenX
            this.lastY = e.changedTouches[0].screenY
            this.down = true
        }
    }

    pastThreshhold(x, y)
    {
        return Math.abs(this.lastX - x) > this.threshhold || Math.abs(this.lastY - y) > this.threshhold
    }

    touchmove(e)
    {
        if (!this.down || e.touches.length !== 1)
        {
            this.touchcancel()
            return
        }
        var x = e.changedTouches[0].screenX
        var y = e.changedTouches[0].screenY
        if (this.pastThreshhold(x, y))
        {
            this.touchcancel()
        }
    }

    touchcancel()
    {
        this.down = false
    }

    touchend(e)
    {
        if (this.down)
        {
            e.preventDefault()
            this.callback(e, this.options.args)
        }
    }

    mouseclick(e)
    {
        this.callback(e, this.options.args)
    }
}

module.exports = clicked