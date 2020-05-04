!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).clicked={})}(this,(function(e){"use strict";const t={threshold:10,clicked:!0,doubleClicked:!1,doubleClickedTime:300,longClicked:!1,longClickedTime:500,capture:!1,clickDown:!1};class s{constructor(e,s,i){"string"!=typeof e||(e=document.querySelector(e))?(this.options=Object.assign({},t,i),this.events={mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),mousemove:e=>this.mousemove(e),touchstart:e=>this.touchstart(e),touchmove:e=>this.touchmove(e),touchcancel:e=>this.cancel(e),touchend:e=>this.touchend(e)},e.addEventListener("mousedown",this.events.mousedown,{capture:this.options.capture}),e.addEventListener("mouseup",this.events.mouseup,{capture:this.options.capture}),e.addEventListener("mousemove",this.events.mousemove,{capture:this.options.capture}),e.addEventListener("touchstart",this.events.touchstart,{passive:!0,capture:this.options.capture}),e.addEventListener("touchmove",this.events.touchmove,{passive:!0,capture:this.options.capture}),e.addEventListener("touchcancel",this.events.touchcancel,{capture:this.options.capture}),e.addEventListener("touchend",this.events.touchend,{capture:this.options.capture}),this.element=e,this.callback=s):console.warn(`Unknown element: document.querySelector(${e}) in clicked()`)}destroy(){this.element.removeEventListener("mousedown",this.events.mousedown),this.element.removeEventListener("mouseup",this.events.mouseup),this.element.removeEventListener("mousemove",this.events.mousemove),this.element.removeEventListener("touchstart",this.events.touchstart,{passive:!0}),this.element.removeEventListener("touchmove",this.events.touchmove,{passive:!0}),this.element.removeEventListener("touchcancel",this.events.touchcancel),this.element.removeEventListener("touchend",this.events.touchend)}touchstart(e){!0===this.down?this.cancel():1===e.touches.length&&this.handleDown(e.changedTouches[0].screenX,e.changedTouches[0].screenY)}pastThreshold(e,t){return Math.abs(this.lastX-e)>this.options.threshold||Math.abs(this.lastY-t)>this.options.threshold}touchmove(e){if(this.down)if(1!==e.touches.length)this.cancel();else{const t=e.changedTouches[0].screenX,s=e.changedTouches[0].screenY;this.pastThreshold(t,s)&&this.cancel()}}cancel(){this.down=!1,this.doubleClickedTimeout&&(clearTimeout(this.doubleClickedTimeout),this.doubleClickedTimeout=null),this.longClickedTimeout&&(clearTimeout(this.longClickedTimeout),this.longClickedTimeout=null)}touchend(e){this.down&&(e.preventDefault(),this.handleClicks(e,e.pointerId))}handleClicks(e){this.options.doubleClicked?this.doubleClickedTimeout=setTimeout(()=>this.doubleClicked(e),this.options.doubleClickedTime):this.options.clicked&&this.callback({event:e,type:"clicked"}),this.longClickedTimeout&&(clearTimeout(this.longClickedTimeout),this.longClickedTimeout=null),this.down=!1}handleDown(e,t,s){this.doubleClickedTimeout?this.pastThreshold(t,s)?(this.options.clicked&&this.callback({event:e,type:"clicked"}),this.cancel()):(this.callback({event:e,type:"double-clicked"}),this.cancel()):(this.lastX=t,this.lastY=s,this.down=!0,this.options.longClicked&&(this.longClickedTimeout=setTimeout(()=>this.longClicked(e),this.options.longClickedTime)),this.options.clickDown&&this.callback({event:e,type:"click-down"}))}longClicked(e){this.longClikedTimeout=null,this.down=!1,this.callback({event:e,type:"long-clicked"})}doubleClicked(e){this.doubleClickedTimeout=null,this.callback({event:e,type:"double-clicked"})}mousedown(e){!0===this.down?this.down=!1:this.handleDown(e,e.screenX,e.screenY)}mousemove(e){if(this.down){const t=e.screenX,s=e.screenY;this.pastThreshold(t,s)&&this.cancel()}}mouseup(e){this.down&&(e.preventDefault(),this.handleClicks(e))}}e.clicked=function(e,t,i){return new s(e,t,i)},Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=clicked.js.map
