!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=2)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={},r=function(){function e(){var t=this;this.log=document.querySelector("#log"),this.options={root:null,rootMargin:"0px",threshold:.75},e.ads=document.querySelectorAll(".gamwrapper-ad"),window.addEventListener("load",function(e){window.googletag&&window.googletag.apiReady&&(t.setGpt(),t.setupAd(window.adConfig||!1))})}return e.prototype.setGpt=function(){n=window.googletag},e.prototype.handleIntersect=function(t,o){t.forEach(function(e){.75<e.intersectionRatio?(this.renderAd(e.target.id),this.setTimer(e.target.id)):this.resetTimer(e.target.id)},new e)},e.prototype.setupAd=function(t){var o=this;t&&n.cmd.push(function(){e.ads.forEach(function(r){if(t[r.id]){var i=n.defineSlot(t[r.id].path,t[r.id].size,r.id).addService(n.pubads());if(t[r.id].targeting)for(var s in t[r.id].targeting)i.setTargeting(s,t[r.id].targeting[s]);e.adSlots[r.id]=i,e.adSlots[r.id].isLoaded=!1,e.adSlots[r.id].canRefresh=!1,e.adSlots[r.id].screenTime=0,e.adSlots[r.id].timerId=0,o.bindEvent(e.adSlots[r.id]),n.enableServices();var d=document.querySelector("#"+r.id);new IntersectionObserver(o.handleIntersect,o.options).observe(d)}})})},e.prototype.renderAd=function(e){var t=this.getAdSlot(e);n.cmd.push(function(){t&&!1===t.isLoaded&&n.display(e)})},e.prototype.bindEvent=function(e){n.pubads().addEventListener("slotRequested",function(t){t.slot===e&&console.log("Slot has been requested:")}),n.pubads().addEventListener("slotRenderEnded",function(t){t.slot===e&&(e.isLoaded=!0,console.log("Slot Render Ended"))}),n.pubads().addEventListener("impressionViewable",function(t){t.slot==e&&(console.log("Slot Impresssion Viewable"),e.canRefresh=!0)})},e.prototype.refreshAd=function(e){n.cmd.push(function(){e&&!0===e.canRefresh&&(n.pubads().refresh([e]),e.screenTime=0,console.log("Ad refreshed"))})},e.prototype.setTimer=function(e){var t=this,o=this.getAdSlot(e);o&&0===o.timerId&&(o.timerId=setInterval(function(){o.screenTime+=1,console.log(e+" Screen Time: "+o.screenTime),30<o.screenTime&&(console.log(e+" Screen Time > 30s"),t.refreshAd(o))},1e3),console.log("Timer set: "+e))},e.prototype.resetTimer=function(e){var t=this.getAdSlot(e);t&&0!==t.timerId&&(clearInterval(t.timerId),t.timerId=0,console.log("Timer Reset: "+e))},e.prototype.getAdSlot=function(t){return!(!t||!e.adSlots[t])&&e.adSlots[t]},e.adSlots={},e}();t.default=new r},function(e,t){e.exports=React},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),r=o(3);o(0);var i=o(4);r.render(n.createElement(i.Hello,{compiler:"TypeScript",framework:"React"}),document.getElementById("example"))},function(e,t){e.exports=ReactDOM},function(e,t,o){"use strict";var n=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=o(1),i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){return r.createElement("h1",null,"Hello from ",this.props.compiler," and ",this.props.framework,"!")},t}(r.Component);t.Hello=i}]);
//# sourceMappingURL=example.bundle.js.map