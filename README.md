# clicked
Javascript handler for clicks, double-clicks, and/or long-clicks that works for both mouse and touch

## changes in version 4
* ported code to typescript
* added options.mouse to select which mouse buttons are active (if any)
* added options.touch to select whether touch is active and how many touch points are allowed
* removed rollup and compiled using tsc
* improved demo

## usage
```import { clicked } from 'clicked'```

or

```const clicked = require('clicked').clicked```

## demo
[]

## rationale

I wanted to create a vanilla javascript way to handle mouse and touch clicks, double-clicks, and long-clicks.

## example
```js
import { clicked } from 'clicked'

function handleClick()
{
   console.log('I was clicked.')
}
const div = document.getElementById('clickme')
const c = clicked(div, handleClick, { threshold: 15 })

// change callback
c.callback = () => console.log('different clicker')

// destroy
c.destroy()

// using built-in querySelector
clicked('#clickme', handleClick2)

// support for all types of clicks
function handleAllClicks(e) {
    switch (e.type)
    {
        case 'clicked': ...
        case 'double-clicked': ...
        case 'long-clicked': ...
    }
    // view UIEvent that caused callback
    console.log(e.event)
}
clicked('#clickme', handleAllClicks, { doubleClick: true, longClick: true })
```

## API

### clicked(element, callback, options) : Clicked
creates Clicked object for element

|name|type|default|description
|---|---|---|---|
|element|HTMLElement or string||element or querySelector entry (e.g., #id-name or .class-name)|
|callback|ClickedCallback||callback called after clicked
|[options]|object||optional options|
|[options].clicked|boolean|true|dispatch event for clicked
|[options].threshold|number|10|threshold of movement to cancel all events
|[options.mouse]|boolean or 'left' or 'right' 'middle' or 'left-right' or 'left-middle' or 'right-middle'|true|whether to listen for mouse events; can also be used to set which mouse buttons are active
|[options.touch]|boolean or number|1|whether to listen for touch events; can also be used to set the number of touch points to accept
|[options.doubleClick]|boolean|false|dispatch events for double click
|[options.doubleClickTime]]|number|500|wait time in millseconds for double click
|[options.longClick]]|boolean|false|enable watcher for long click
|[options.longClickTime]]|boolean|500|wait time for long click
|[options.clickDown]|boolean|dispatch event for click down (ie, after touchstart or mousedown callback will be called with type 'click-down')
|[options.capture]|boolean|false|events will be dispatched to this registered listener before being dispatched to any EventTarget beneath it in the DOM tree

### Clicked
returned by clicked(...)

### Clicked.destroy()
removes event listeners on element

### Clicked.callback (function): ClickedCallback

|name|type|description
|---|---|---|
|event|MouseEvent or TouchEvent|mouse or touch event that triggered callback|
|type|'clicked' or 'double-clicked' or 'long-clicked' or 'click-down'|type of click|

### Clicked.cancel()
cancel any outstanding events

## demo
```yarn demo```

Open browser to https://localhost:1234/

## license  
MIT License  
(c) 2020 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](mailto://david@yopeyopey.com)
