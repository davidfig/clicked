# clicked
Create click event for both mouse and touch

## rationale

To create a simple way to handle mouse and touch click events without any external dependencies.

## example
```js
var clicked = require('clicked')

function handleClick()
{
    console.log('I was clicked.');
}

const div = document.getElementById('clickme')
const c = clicked(div, handleClick, { thresshold: 15 })

// using built-in querySelector
const c2 = clicked('#clickme', handleClick)

// change callback
c2.callback = () => console.log('different clicker')

// destroy
c.destroy()
```

## API

### clicked(element, callback, options)
creates Clicked object for element

|name|type|description
|---|---|---|
|element|HTMLElement or string|element or querySelector entry (e.g., #id-name or .class-name)|
|callback|function|callback called after clicked: callback(event: InputEvent, args: Object)
|options|object|optional options|
|threshold|number|default=10; cancels click event when touch moves more than thresshold
|args|*|arguments for callback function
returns Clicked

### Clicked.destroy()
removes event listeners on element

### Clicked.callback : function
use to change callback

## license  
MIT License  
(c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
