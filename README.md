# clicked
Create click event for both mouse and touch

## rationale

To create a simple way to handle mouse and touch click events without any external dependencies.

## example

    var clicked = require('clicked')

    function handleClick()
    {
        console.log('I was clicked.');
    }

    var div = document.getElementById('clickme');
    clicked(div, handleClick, {thresshold: 15});

## API

### function clicked(element, handler, options)

- {htmlElement} element to listen for mouse and touch events
- {function} handler to call after a click: callback(event, options.args)
- {object} [options]
- {number} [options.threshhold] maximum number of pixels that the touch may move before cancelling click
- {*} [options.args] arguments for callback