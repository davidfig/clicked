import { clicked } from '../clicked.js'

function el(query)
{
    return document.querySelector(query)
}

window.onload = () =>
{
    clicked('.element-1', e => el('.response-1').innerHTML = e.type)
    clicked('.element-2', e => el('.response-2').innerHTML = e.type, { doubleClicked: true })
    clicked('.element-3', e => el('.response-3').innerHTML = e.type, { longClicked: true })
    clicked('.element-4', e => el('.response-4').innerHTML = e.type, { doubleClicked: true, longClicked: true })
    clicked('.element-5', e => el('.response-5').innerHTML = e.type, { doubleClicked: true, doubleClickedTime: 1000})
    clicked('.element-6', e => el('.response-6').innerHTML = e.type, { longClicked: true, longClickedTime: 1000 })
}