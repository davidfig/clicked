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
```js
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
function clicked(element, callback, options)

/**
 * removes event listeners added by Clicked
 */
Clicked.destroy()

```
## license  
MIT License  
(c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
