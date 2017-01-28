# clicked
Create click event for both mouse and touch

## rationale

To create a simple way to handle mouse and touch click events without any external dependencies.

## example

    import clicked from 'clicked';

    function handleClick()
    {
        console.log('I was clicked.');
    }

    const div = document.getElementById('clickme');
    clicked(div, handleClick, {thresshold: 15});

## API

### export default function clicked(element, handler, options)

{htmlElement} element to attach the mouse and touch handlers
{function} handler to call after a click
{object} [options]
{number} [options.threshhold] maximum number of pixels that the touch may move before cancelling click