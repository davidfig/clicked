/**
 * Javascript: create click event for both mouse and touch
 * @example
 *
 *  import clicked from 'clicked';
 *
 *  function handleClick()
 *  {
 *      console.log('I was clicked.');
 *  }
 *
 *  const div = document.getElementById('clickme');
 *  clicked(div, handleClick, {thresshold: 15});
 *
 */

/**
 * @param {HTMLElement} element
 * @param {function} callback called after click
 * @param {object} [options]
 * @param {number} [options.thresshold=10] if touch moves threshhold-pixels then the touch-click is cancelled
 */
export default function clicked(element, callback, options)
{
    function touchstart(e)
    {
        if (e.touches.length === 1)
        {
            lastX = e.changedTouches[0].screenX;
            lastY = e.changedTouches[0].screenY;
            down = true;
        }
    }

    function pastThreshhold(x, y)
    {
        return Math.abs(lastX - x) > threshhold || Math.abs(lastY - y) > threshhold;
    }

    function touchmove(e)
    {
        if (!down || e.touches.length !== 1)
        {
            touchcancel();
            return;
        }
        const x = e.changedTouches[0].screenX;
        const y = e.changedTouches[0].screenY;
        if (pastThreshhold(x, y))
        {
            touchcancel();
        }
    }

    function touchcancel()
    {
        down = false;
    }

    function touchend(e)
    {
        if (down)
        {
            e.stopPropagation();
            callback(e);
        }
    }

    options = options || {};
    let down, lastX, lastY;
    let threshhold = options.thresshold || 10;

    element.addEventListener('click', callback);
    element.addEventListener('touchstart', touchstart);
    element.addEventListener('touchmove', touchmove);
    element.addEventListener('touchcancel', touchcancel);
    element.addEventListener('touchend', touchend);
}