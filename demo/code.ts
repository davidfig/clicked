import { clicked, IClickedCallback } from '../code/clicked'

interface ICountTypes
{
    clicked: number
    doubleClicked: number
    longClicked: number
}

function el(query: string) : HTMLElement
{
    return document.querySelector(query)
}

function countTypes(e: IClickedCallback, count: ICountTypes): string
{
    if (e.type === 'clicked') count.clicked++
    else if (e.type === 'double-clicked') count.doubleClicked++
    else if (e.type === 'long-clicked') count.longClicked++
    return `clicked (${count.clicked}), double-clicked (${count.doubleClicked}), long-clicked (${count.longClicked})`
}

window.onload = () =>
{
    let element1Count = 0
    clicked('.element-1', (e: IClickedCallback) =>
    {
        el('.response-1').innerHTML = `${e.type} (${++element1Count})`
    })

    let element2Count = 0
    clicked('.element-2', (e: IClickedCallback) =>
    {
        el('.response-2').innerHTML = `${e.type} (${++element2Count})`
    }, { doubleClicked: true, clicked: false })

    let element3Count = 0
    clicked('.element-3', (e: IClickedCallback) =>
    {
        el('.response-3').innerHTML = `${e.type} (${++element3Count})`
    }, { longClicked: true, clicked: false })

    const element4Count: ICountTypes = { clicked: 0, longClicked: 0, doubleClicked: 0}
    clicked('.element-4', (e: IClickedCallback) =>
    {
        el('.response-4').innerHTML = countTypes(e, element4Count)
    }, { doubleClicked: true, longClicked: true })

    let element5Count = 0
    clicked('.element-5', (e: IClickedCallback) =>
    {
        el('.response-5').innerHTML = `${e.type} (${++element5Count})`
    }, { doubleClicked: true, doubleClickedTime: 1000, clicked: false })

    let element6Count = 0
    clicked('.element-6', (e: IClickedCallback) =>
    {
        el('.response-6').innerHTML = `${e.type} (${++element6Count})`
    }, { longClicked: true, longClickedTime: 1000, clicked: false })

    let element7Count: ICountTypes = { clicked: 0, longClicked: 0, doubleClicked: 0 }
    clicked('.element-7', (e: IClickedCallback) =>
    {
        el('.response-7').innerHTML = countTypes(e, element7Count)
    }, { mouse: 'right', longClicked: true, doubleClicked: true })

    let element8Count: ICountTypes = { clicked: 0, longClicked: 0, doubleClicked: 0 }
    clicked('.element-8', (e: IClickedCallback) =>
    {
        el('.response-8').innerHTML = countTypes(e, element8Count)
    }, { mouse: false, doubleClicked: true, longClicked: true })

    let element9Count = 0
    clicked('.element-9', (e: IClickedCallback) =>
    {
        el('.response-9').innerHTML = `${e.type} (${++element9Count})`
    }, { touch: false })

    // hide context menu during right click
    window.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault())
}