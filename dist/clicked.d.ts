export interface IClickedOptions {
    threshold?: number;
    clicked?: boolean;
    mouse?: boolean | MouseButtons;
    touch?: boolean | number;
    doubleClicked?: boolean;
    doubleClickedTime?: number;
    longClicked?: boolean;
    longClickedTime?: number;
    clickDown?: boolean;
    capture?: boolean;
}
export declare type MouseButtons = 'left' | 'right' | 'middle' | 'left-or-middle' | 'right-or-middle' | 'left-or-right';
export interface IClickedCallback {
    type: 'clicked' | 'double-clicked' | 'long-clicked' | 'click-down';
    event: MouseEvent | TouchEvent;
}
declare type SetTimeoutHandle = number;
interface IListeners {
    mousedown: EventListenerOrEventListenerObject;
    mouseup: EventListenerOrEventListenerObject;
    mousemove: EventListenerOrEventListenerObject;
    touchstart: EventListenerOrEventListenerObject;
    touchmove: EventListenerOrEventListenerObject;
    touchcancel: EventListenerOrEventListenerObject;
    touchend: EventListenerOrEventListenerObject;
}
export declare function clicked(element: HTMLElement | string, callback: (data: IClickedCallback) => void, options?: IClickedOptions): Clicked;
export declare class Clicked {
    readonly options: IClickedOptions;
    protected element: Element;
    protected events: IListeners;
    protected callback: Function;
    protected down: boolean;
    protected lastX: number;
    protected lastY: number;
    protected doubleClickedTimeout: SetTimeoutHandle;
    protected longClickedTimeout: SetTimeoutHandle;
    constructor(element: HTMLElement | string, callback: (data: IClickedCallback) => void, options?: IClickedOptions);
    protected createListeners(): void;
    destroy(): void;
    protected touchstart(e: TouchEvent): void;
    protected pastThreshold(x: number, y: number): boolean;
    protected touchmove(e: TouchEvent): void;
    cancel(): void;
    protected touchend(e: TouchEvent): void;
    protected handleClicks(e: UIEvent): void;
    protected handleDown(e: MouseEvent | TouchEvent, x?: number, y?: number): void;
    protected longClicked(e: UIEvent): void;
    protected doubleClickedCancel(e: UIEvent): void;
    protected checkMouseButtons(e: MouseEvent): boolean;
    protected mousedown(e: MouseEvent): void;
    protected mousemove(e: MouseEvent): void;
    protected mouseup(e: MouseEvent): void;
    protected setTimeout(callback: Function, time: number): SetTimeoutHandle;
}
export {};
