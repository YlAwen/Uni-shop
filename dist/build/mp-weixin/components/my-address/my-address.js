(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-address/my-address"],{"0a41":function(t,e,r){"use strict";r.r(e);var n=r("3af8"),o=r("434b");for(var u in o)["default"].indexOf(u)<0&&function(t){r.d(e,t,(function(){return o[t]}))}(u);r("18ec");var a,c=r("f0c5"),i=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=i.exports},"18ec":function(t,e,r){"use strict";var n=r("b204"),o=r.n(n);o.a},"3af8":function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return u})),r.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,r=(t._self._c,JSON.stringify(t.address));t.$mp.data=Object.assign({},{$root:{g0:r}})},u=[]},"434b":function(t,e,r){"use strict";r.r(e);var n=r("b721"),o=r.n(n);for(var u in n)["default"].indexOf(u)<0&&function(t){r.d(e,t,(function(){return n[t]}))}(u);e["default"]=o.a},b204:function(t,e,r){},b721:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(r("a34a")),o=r("26cb");function u(t){return t&&t.__esModule?t:{default:t}}function a(t,e){return d(t)||f(t,e)||i(t,e)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){if(t){if("string"===typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function f(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,u=[],a=!0,c=!1;try{for(r=r.call(t);!(a=(n=r.next()).done);a=!0)if(u.push(n.value),e&&u.length===e)break}catch(i){c=!0,o=i}finally{try{a||null==r["return"]||r["return"]()}finally{if(c)throw o}}return u}}function d(t){if(Array.isArray(t))return t}function l(t,e,r,n,o,u,a){try{var c=t[u](a),i=c.value}catch(s){return void r(s)}c.done?e(i):Promise.resolve(i).then(n,o)}function p(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var u=t.apply(e,r);function a(t){l(u,n,o,a,c,"next",t)}function c(t){l(u,n,o,a,c,"throw",t)}a(void 0)}))}}function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){v(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function v(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var y={props:{},data:function(){return{}},computed:h(h({},(0,o.mapState)("m_user",["address"])),(0,o.mapGetters)("m_user",["addstr"])),methods:h(h({},(0,o.mapMutations)("m_user",["updateAddress"])),{},{chooseAddress:function(){var e=this;return p(n.default.mark((function r(){var o,u,c,i;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.chooseAddress().catch((function(t){return t}));case 2:o=r.sent,u=a(o,2),c=u[0],i=u[1],null===c&&"chooseAddress:ok"===i.errMsg&&e.updateAddress(i),c&&"chooseAddress:fail auth deny"===c.errMsg&&e.reAuth(),c&&"chooseAddress:fail authorize no response"===c.errMsg&&e.reAuth();case 9:case"end":return r.stop()}}),r)})))()},reAuth:function(){t.showModal({content:"检测到您没打开地址权限，是否去设置打开？",success:function(e){if(e.confirm)t.openSetting({success:function(e){return e.authSetting["scope.address"]?t.$showMsg("授权成功！请选择地址"):e.authSetting["scope.address"]?void 0:t.$showMsg("您取消了地址授权！")}});else if(e.cancel)return t.$showMsg("您取消了地址授权！")}})}}),watch:{},mounted:function(){},beforeUpdate:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){}};e.default=y}).call(this,r("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-address/my-address-create-component',
    {
        'components/my-address/my-address-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0a41"))
        })
    },
    [['components/my-address/my-address-create-component']]
]);
