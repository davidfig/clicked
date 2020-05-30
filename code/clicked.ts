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

export interface IClickedOptions
{
    threshold?: number
    clicked?: boolean
    mouse?: boolean | MouseButtons
    touch?: boolean | number
    doubleClicked?: boolean
    doubleClickedTime?: number
    longClicked?: boolean
    longClickedTime?: number
    clickDown?: boolean
    capture?: boolean
}

export type MouseButtons = 'left' | 'right' | 'middle' | 'left-or-middle' | 'right-or-middle' | 'left-or-right'

export interface IClickedCallback
{
    type: 'clicked' | 'double-clicked' | 'long-clicked' | 'click-down'
    event: MouseEvent | TouchEvent
}

const defaultOptions: IClickedOptions = {
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
}

type SetTimeoutHandle = number

interface IListeners
{
    mousedown: EventListenerOrEventListenerObject
    mouseup: EventListenerOrEventListenerObject
    mousemove: EventListenerOrEventListenerObject
    touchstart: EventListenerOrEventListenerObject
    touchmove: EventListenerOrEventListenerObject
    touchcancel: EventListenerOrEventListenerObject
    touchend: EventListenerOrEventListenerObject
}

/**
 * @param element element or querySelector entry (e.g., #id-name or .class-name)
 * @param callback called after a click, double click, or long click is registered
 * @param [options]
 * @param [options.clicked=true] dispatch event for clicked
 * @param [options.threshold=10] threshold of movement to cancel all events
 * @param [options.mouse=true] whether to listen for mouse events; can also be used to set which mouse buttons are active
 * @param [options.touch=1] whether to listen for touch events; can also be used to set the number of touch points to accept
 * @param [options.doubleClicked] dispatch event for double click
 * @param [options.doubleClickedTime=500] wait time in millseconds for double click
 * @param [options.longClicked] dispatch event for long click
 * @param [options.longClickedTime=500] wait time for long click
 * @param [options.clickDown] dispatch event for click down
 * @param [options.capture]  events will be dispatched to this registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 */
export function clicked(element: HTMLElement | string, callback: (data: IClickedCallback) => void, options?: IClickedOptions): Clicked
{
    return new Clicked(element, callback, options)
}

export class Clicked
{
    readonly options: IClickedOptions
    protected element: Element
    protected events: IListeners
    protected callback: Function
    protected down: boolean
    protected lastX: number
    protected lastY: number
    protected doubleClickedTimeout: SetTimeoutHandle
    protected longClickedTimeout: SetTimeoutHandle

    constructor(element: HTMLElement | string, callback: (data: IClickedCallback) => void, options?: IClickedOptions)
    {
        if (typeof element === 'string')
        {
            element = document.querySelector(element) as HTMLElement
            if (!element)
            {
                console.warn(`Unknown element: document.querySelector(${element}) in clicked()`)
                return
            }
        }
        this.element = element
        this.callback = callback
        this.options = { ...defaultOptions, ...options }
        this.createListeners()
    }

    protected createListeners()
    {
        this.events = {
            mousedown: (e: MouseEvent) => this.mousedown(e),
            mouseup: (e: MouseEvent) => this.mouseup(e),
            mousemove: (e: MouseEvent) => this.mousemove(e),
            touchstart: (e: TouchEvent) => this.touchstart(e),
            touchmove: (e: TouchEvent) => this.touchmove(e),
            touchcancel: () => this.cancel(),
            touchend: (e: TouchEvent) => this.touchend(e)
        }
        this.element.addEventListener('mousedown', this.events.mousedown, { capture: this.options.capture })
        this.element.addEventListener('mouseup', this.events.mouseup, { capture: this.options.capture })
        this.element.addEventListener('mousemove', this.events.mousemove, { capture: this.options.capture })
        this.element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: this.options.capture })
        this.element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: this.options.capture })
        this.element.addEventListener('touchcancel', this.events.touchcancel, { capture: this.options.capture})
        this.element.addEventListener('touchend', this.events.touchend, { capture: this.options.capture })
    }

    /** removes event listeners added by Clicked */
    destroy()
    {
        this.element.removeEventListener('mousedown', this.events.mousedown)
        this.element.removeEventListener('mouseup', this.events.mouseup)
        this.element.removeEventListener('mousemove', this.events.mousemove)
        this.element.removeEventListener('touchstart', this.events.touchstart)
        this.element.removeEventListener('touchmove', this.events.touchmove)
        this.element.removeEventListener('touchcancel', this.events.touchcancel)
        this.element.removeEventListener('touchend', this.events.touchend)
    }

    protected touchstart(e: TouchEvent)
    {
        if (this.options.touch)
        {
            if (this.down === true)
            {
                this.cancel()
            }
            else
            {
                if (this.options.touch === true || e.touches.length <= this.options.touch)
                {
                    this.handleDown(e, e.changedTouches[0].screenX, e.changedTouches[0].screenY)
                }
            }
        }
    }

    protected pastThreshold(x: number, y: number): boolean
    {
        return Math.abs(this.lastX - x) > this.options.threshold || Math.abs(this.lastY - y) > this.options.threshold
    }

    protected touchmove(e: TouchEvent)
    {
        if (this.down)
        {
            if (e.touches.length !== 1)
            {
                this.cancel()
            }
            else
            {
                const x = e.changedTouches[0].screenX
                const y = e.changedTouches[0].screenY
                if (this.pastThreshold(x, y))
                {
                    this.cancel()
                }
            }
        }
    }

    /** cancel current event */
    cancel()
    {
        this.down = false
        if (this.doubleClickedTimeout)
        {
            clearTimeout(this.doubleClickedTimeout)
            this.doubleClickedTimeout = null
        }
        if (this.longClickedTimeout)
        {
            clearTimeout(this.longClickedTimeout)
            this.longClickedTimeout = null
        }
    }

    protected touchend(e: TouchEvent)
    {
        if (this.down)
        {
            e.preventDefault()
            this.handleClicks(e)
        }
    }

    protected handleClicks(e: UIEvent)
    {
        if (this.options.doubleClicked)
        {
            this.doubleClickedTimeout = this.setTimeout(() => this.doubleClickedCancel(e), this.options.doubleClickedTime)
        }
        else if (this.options.clicked)
        {
            this.callback({ event: e, type: 'clicked' })
        }
        if (this.longClickedTimeout)
        {
            clearTimeout(this.longClickedTimeout)
            this.longClickedTimeout = null
        }
        this.down = false
    }

    protected handleDown(e: MouseEvent | TouchEvent, x?: number, y?: number)
    {
        if (this.doubleClickedTimeout)
        {
            if (this.pastThreshold(x, y))
            {
                if (this.options.clicked)
                {
                    this.callback({ event: e, type: 'clicked' })
                }
                this.cancel()
            }
            else
            {
                this.callback({ event: e, type: 'double-clicked' })
                this.cancel()
            }
        }
        else
        {
            this.lastX = x
            this.lastY = y
            this.down = true
            if (this.options.longClicked)
            {
                this.longClickedTimeout = this.setTimeout(() => this.longClicked(e), this.options.longClickedTime)
            }
            if (this.options.clickDown)
            {
                this.callback({ event: e, type: 'click-down' })
            }
        }
    }

    protected longClicked(e: UIEvent)
    {
        this.longClickedTimeout = null
        this.down = false
        this.callback({ event: e, type: 'long-clicked' })
    }

    protected doubleClickedCancel(e: UIEvent)
    {
        this.doubleClickedTimeout = null
        if (this.options.clicked)
        {
            this.callback({ event: e, type: 'clicked' })
        }
    }

    protected checkMouseButtons(e: MouseEvent): boolean
    {
        if (this.options.mouse === false)
        {
            return false
        }
        else if (this.options.mouse === true)
        {
            return true
        }
        else if (e.button === 0)
        {
            return (this.options.mouse as string).indexOf('left') !== -1
        }
        else if (e.button === 1)
        {
            return (this.options.mouse as string).indexOf('middle') !== -1
        }
        else if (e.button === 2)
        {
            return (this.options.mouse as string).indexOf('right') !== -1
        }
    }

    protected mousedown(e: MouseEvent)
    {
        if (this.checkMouseButtons(e))
        {
            if (this.down === true)
            {
                this.down = false
            }
            else
            {
                this.handleDown(e, e.screenX, e.screenY)
            }
        }
    }

    protected mousemove(e: MouseEvent)
    {
        if (this.down)
        {
            const x = e.screenX
            const y = e.screenY
            if (this.pastThreshold(x, y))
            {
                this.cancel()
            }
        }
    }

    protected mouseup(e: MouseEvent)
    {
        if (this.down)
        {
            e.preventDefault()
            this.handleClicks(e)
        }
    }

    protected setTimeout(callback: Function, time: number): SetTimeoutHandle
    {
        return setTimeout(callback, time)
    }
}

/**
 * Callback for
 * @callback Clicked~ClickedCallback
 * @param {UIEvent} event
 * @param {('clicked'|'double-clicked'|'long-clicked'|'click-down')} type
 */