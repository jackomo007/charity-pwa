(()=>{"use strict";var e=[,(e,t,o)=>{function n(){console.log("Hello from util."),console.log("es6+ syntax test:");let e={message:"working"};console.log(null==e?void 0:e.message)}o.r(t),o.d(t,{util:()=>n})}],t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};o.r(n),(0,o(1).util)(),self.addEventListener("message",(e=>{console.log(null==e?void 0:e.data)})),self.addEventListener("push",(e=>{const t=JSON.parse((null==e?void 0:e.data.text())||"{}");null==e||e.waitUntil(self.registration.showNotification(t.title,{body:t.message,icon:"/icons/android-chrome-192x192.png"}))})),self.addEventListener("notificationclick",(e=>{null==e||e.notification.close(),null==e||e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(e){if(e.length>0){let t=e[0];for(let o=0;o<e.length;o++)e[o].focused&&(t=e[o]);return t.focus()}return self.clients.openWindow("/")})))}))})();