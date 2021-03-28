(function(e){function t(t){for(var o,a,l=t[0],c=t[1],s=t[2],u=0,f=[];u<l.length;u++)a=l[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},r={viewer:0,"chunk-2d0d7e72":0},i=[];function a(e){return l.p+"js/"+({"authentication-inrupt":"authentication-inrupt","authentication-legacy":"authentication-legacy"}[e]||e)+"."+{"authentication-inrupt":"70698afd","authentication-legacy":"3766d032","chunk-2d0a3756":"bc27c308","chunk-2d0aa213":"e649bc6e","chunk-2d0c77ae":"be8b5484","chunk-2d0e57f0":"dc85955e","chunk-2d0e68d7":"6d5ed953","chunk-2d229d4e":"c53f9410"}[e]+".js"}function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=a(e);var s=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,n[1](s)}r[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/media-kraken/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=s;i.push([4,"chunk-vendors","chunk-common"]),n()})({4:function(e,t,n){e.exports=n("53a0")},"53a0":function(e,t,n){"use strict";n.r(t);var o=n("f3f3"),r=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),i=(n("8820"),n("a88a")),a=n("c64a"),l=(n("d81d"),n("d3b7"),n("07ac"),n("3ca3"),n("ddb0"),n("96cf"),n("c964")),c=n("b04e"),s=n("a180"),u=n("08ba"),d=n("60ad"),f=n("6f2f");function p(e){return h.apply(this,arguments)}function h(){return h=Object(l["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={$app:new c["a"](!1),$browser:new s["a"],$ui:new d["a"],$viewer:new f["a"](!0)},u["b"]["$store"]=t.$store,Object.assign(u["b"],n),Object.assign(r["a"].prototype,n),e.next=6,Promise.all(Object.values(n).map((function(e){return e.launch()})));case 6:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}u["b"];var v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"font-montserrat antialiased font-normal text-base text-gray-900 leading-tight bg-gray-100 max-h-screen"},[n("div",{staticClass:"flex flex-col min-h-screen"},[n("header",{staticClass:"flex justify-center p-4 desktop:pt-12"},[n(e.$viewer.loaded?"button":"div",{tag:"component",on:{click:function(t){return e.$viewer.setMovie(null)}}},[n("BaseIcon",{staticClass:"w-auto h-16",attrs:{name:"media-kraken"}})],1)],1),n("main",{staticClass:"flex flex-col flex-grow mx-auto max-w-content w-full px-4"},[e.$viewer.loaded?[e.$viewer.movie?n("MovieDetails",{attrs:{movie:e.$viewer.movie}}):n("CollectionBrowser",{attrs:{title:e.collectionTitle,description:e.collectionDescription,"search-index":e.$viewer.searchIndex}})]:n("NoCollection")],2),n("AppFooter")],1),n("AppOverlay"),n("AppModals")],1)},m=[],w=(n("a4d3"),n("e01a"),n("b0c0"),n("f657")),b=n("af7e"),g=n("d16a"),y=n("aaac"),x=n("5982"),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex flex-col items-center max-w-readable self-center"},[n("BasePageHeader",[e._v(" Media Kraken Viewer ")]),n("MarkdownContent",{staticClass:"markdown-content--typography",attrs:{content:e.info}}),n("form",{staticClass:"flex flex-col items-center max-w-lg w-full mt-4",on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.collectionUrl,expression:"collectionUrl"}],ref:"collection-url-input",staticClass:"\n                flex-grow self-stretch shadow p-2 rounded-lg border border-gray-300\n                focus:border-primary-500\n            ",attrs:{placeholder:"Movies collection url"},domProps:{value:e.collectionUrl},on:{input:function(t){t.target.composing||(e.collectionUrl=t.target.value)}}}),n("BaseButton",{staticClass:"\n                flex-grow self-stretch h-10 shadow text-white mt-4\n                text-sm justify-center font-medium tracking-wide\n                bg-brand-solid-500 hover:bg-brand-solid-700\n            ",attrs:{submit:""}},[e._v(" Load collection ")]),e.$viewer.collectionUrl?n("p",{staticClass:"text-gray-700 text-sm mt-4 text-center"},[e._v(" I couldn't find any movies at "),n("BaseLink",{attrs:{url:e.$viewer.collectionUrl}},[e._v(" "+e._s(e.$viewer.collectionUrl)+" ")]),e._v(", please try with a different url. ")],1):e._e()],1)],1)},$=[],j=(n("8a79"),n("2ca0"),n("7993")),C=n("a865"),O=r["a"].extend({components:{MarkdownContent:C["a"]},data:function(){return{collectionUrl:null}},computed:{info:function(){return j["default"]}},created:function(){this.collectionUrl=this.$viewer.collectionUrl},mounted:function(){var e;null===(e=this.$refs["collection-url-input"])||void 0===e||e.focus()},methods:{submit:function(){var e=this;this.collectionUrl&&(this.collectionUrl.startsWith("http")||(this.collectionUrl="https://"+this.collectionUrl),this.collectionUrl.endsWith("/")||(this.collectionUrl+="/"),this.$ui.loading((function(){return e.$viewer.view(e.collectionUrl)}),"Loading collection..."))}}}),U=O,_=n("2877"),M=Object(_["a"])(U,k,$,!1,null,null,null),P=M.exports,A=r["a"].extend({components:{AppFooter:w["a"],AppModals:b["a"],AppOverlay:g["a"],CollectionBrowser:y["a"],MovieDetails:x["a"],NoCollection:P},computed:{collectionTitle:function(){var e;return(null===(e=this.$viewer.moviesContainer)||void 0===e?void 0:e.name)||"Collection"},collectionDescription:function(){var e;return(null===(e=this.$viewer.moviesContainer)||void 0===e?void 0:e.description)||void 0}}}),B=A,T=(n("4abd"),Object(_["a"])(B,v,m,!1,null,null,null)),D=T.exports,S=(n("1903"),n("5ef4")),E={store:S["a"]};Object(a["a"])(window),r["a"].config.productionTip=!1,r["a"].instance=new r["a"](Object(o["a"])({},E,{render:function(e){return e(D)}})),p(r["a"].instance).then((function(){r["a"].instance.$mount("#app"),Object(i["a"])()}))},7993:function(e,t,n){"use strict";n.r(t),t["default"]="Hi there!\n\nUsing this secret tool, you'll be able to share some movies from your collection with others!\n\nWhy do I call it \"secret\"? Well, using this requires some advanced Solid skills, and I don't think this is ready for prime-time yet. But [it could be useful for advanced users](https://github.com/NoelDeMartin/media-kraken/issues/7), so give it a try and let me know what you think.\n\nAll you need to do is create a container with movies that is publicly readable and use the form below to share it.\n"}});
//# sourceMappingURL=viewer.dd4fe20e.js.map