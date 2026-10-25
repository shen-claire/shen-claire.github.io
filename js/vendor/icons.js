(()=>{var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var A=([e,a,o])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(t=>{r.setAttribute(t,String(a[t]))}),o?.length&&o.forEach(t=>{let s=A(t);r.appendChild(s)}),r},M=(e,a={})=>{let r={...u,...a};return A(["svg",r,e])};var B=(...e)=>e.filter((a,o,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===o).join(" ").trim();var D=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var L=e=>{let a="",o=!1;for(let r of e){if(r==="-"||r==="_"||r<=" "){o=a.length>0;continue}a.length===0?a+=r.toLowerCase():a+=o?r.toUpperCase():r,o=!1}return a};var F=e=>{let a=L(e);return a.charAt(0).toUpperCase()+a.slice(1)};var U=e=>Array.from(e.attributes).reduce((a,o)=>(a[o.name]=o.value,a),{}),R=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",p=(e,{nameAttr:a,icons:o,attrs:r})=>{let t=e.getAttribute(a);if(t==null)return;let s=F(t),f=o[s];if(!f)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let l=U(e),y=D(l)?{}:{"aria-hidden":"true"},w={...u,"data-lucide":t,...y,...r,...l},T=R(l),q=R(r),P=B("lucide",`lucide-${t}`,...T,...q);P&&Object.assign(w,{class:P});let b=M(f,w);return e.parentNode?.replaceChild(b,e)};var m=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var x=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var n=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var c=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"}]];var C=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"}]];var d=[["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{d:"M16.47214 7.52786 A 5 10 0 1 0 13 21.79796"}],["path",{d:"M21.79796 11 A 10 5 0 1 0 19 15.57071"}]];var h=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var S=[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],["path",{d:"m16.5 14.5 5-5"}],["path",{d:"m16.5 9.5 5 5"}]];var g=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var k=({icons:e={},nameAttr:a="data-lucide",attrs:o={},root:r=document,inTemplates:t}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${a}]`)).forEach(f=>p(f,{nameAttr:a,icons:e,attrs:o})),t&&Array.from(r.querySelectorAll("template")).forEach(l=>k({icons:e,nameAttr:a,attrs:o,root:l.content,inTemplates:t})),a==="data-lucide"){let f=r.querySelectorAll("[icon-name]");f.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(f).forEach(l=>p(l,{nameAttr:"icon-name",icons:e,attrs:o})))}};var v={Volume2:h,VolumeX:S,Maximize:c,Minimize:C,LayoutGrid:n,Rotate3d:d,ArrowLeft:m,ArrowRight:x,X:g,Info:i};window.lucide={createIcons:()=>k({icons:v})};})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide/dist/esm/replaceElement.mjs:
lucide/dist/esm/icons/arrow-left.mjs:
lucide/dist/esm/icons/arrow-right.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/layout-grid.mjs:
lucide/dist/esm/icons/maximize.mjs:
lucide/dist/esm/icons/minimize.mjs:
lucide/dist/esm/icons/rotate-3d.mjs:
lucide/dist/esm/icons/volume-2.mjs:
lucide/dist/esm/icons/volume-x.mjs:
lucide/dist/esm/icons/x.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.61.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
