import{r as o,e as E,j as n,f as g,o as Ee}from"./index-3d8791b8.js";import{c as K,u as Te,r as L,a as $e,o as je}from"./useMergedRefs-ffb77068.js";import{u as ke}from"./useCallbackRef-8cbe87ce.js";import{u as z}from"./Col-c2024357.js";import{A as Be,u as be,M as Ae,B as xe,g as De}from"./AbstractModalHeader-14d7211d.js";import{e as Oe}from"./TransitionWrapper-ec82a515.js";import{F as q}from"./NoopTransition-ab7d619d.js";import{c as T,d as Fe}from"./createWithBsPrefix-36be1bdf.js";var M;function _(t){if((!M&&M!==0||t)&&K){var a=document.createElement("div");a.style.position="absolute",a.style.top="-9999px",a.style.width="50px",a.style.height="50px",a.style.overflow="scroll",document.body.appendChild(a),M=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return M}const Ie=T("modal-body"),G=o.forwardRef(({bsPrefix:t,className:a,contentClassName:i,centered:c,size:l,fullscreen:s,children:y,scrollable:w,...R},v)=>{t=E(t,"modal");const u=`${t}-dialog`,r=typeof s=="string"?`${t}-fullscreen-${s}`:`${t}-fullscreen`;return n.jsx("div",{...R,ref:v,className:g(u,a,l&&`${t}-${l}`,c&&`${u}-centered`,w&&`${u}-scrollable`,s&&r),children:n.jsx("div",{className:g(`${t}-content`,i),children:y})})});G.displayName="ModalDialog";const J=G,He=T("modal-footer"),Q=o.forwardRef(({bsPrefix:t,className:a,closeLabel:i="Close",closeButton:c=!1,...l},s)=>(t=E(t,"modal-header"),n.jsx(Be,{ref:s,...l,className:g(a,t),closeLabel:i,closeButton:c})));Q.displayName="ModalHeader";const Ue=Q,We=Fe("h4"),Le=T("modal-title",{Component:We});function ze(t){return n.jsx(q,{...t,timeout:null})}function _e(t){return n.jsx(q,{...t,timeout:null})}const V=o.forwardRef(({bsPrefix:t,className:a,style:i,dialogClassName:c,contentClassName:l,children:s,dialogAs:y=J,"aria-labelledby":w,"aria-describedby":R,"aria-label":v,show:u=!1,animation:r=!0,backdrop:h=!0,keyboard:X=!0,onEscapeKeyDown:$,onShow:Y,onHide:p,container:Z,autoFocus:P=!0,enforceFocus:ee=!0,restoreFocus:te=!0,restoreFocusOptions:ae,onEntered:oe,onExit:j,onExiting:ne,onEnter:k,onEntering:B,onExited:b,backdropClassName:A,manager:x,...se},re)=>{const[le,de]=o.useState({}),[ie,D]=o.useState(!1),S=o.useRef(!1),C=o.useRef(!1),f=o.useRef(null),[m,ce]=ke(),ue=Te(re,ce),O=z(p),fe=Ee();t=E(t,"modal");const me=o.useMemo(()=>({onHide:O}),[O]);function F(){return x||De({isRTL:fe})}function I(e){if(!K)return;const d=F().getScrollbarWidth()>0,W=e.scrollHeight>je(e).documentElement.clientHeight;de({paddingRight:d&&!W?_():void 0,paddingLeft:!d&&W?_():void 0})}const N=z(()=>{m&&I(m.dialog)});be(()=>{L(window,"resize",N),f.current==null||f.current()});const ge=()=>{S.current=!0},he=e=>{S.current&&m&&e.target===m.dialog&&(C.current=!0),S.current=!1},H=()=>{D(!0),f.current=Oe(m.dialog,()=>{D(!1)})},pe=e=>{e.target===e.currentTarget&&H()},Me=e=>{if(h==="static"){pe(e);return}if(C.current||e.target!==e.currentTarget){C.current=!1;return}p==null||p()},ye=e=>{X?$==null||$(e):(e.preventDefault(),h==="static"&&H())},we=(e,d)=>{e&&I(e),k==null||k(e,d)},Re=e=>{f.current==null||f.current(),j==null||j(e)},ve=(e,d)=>{B==null||B(e,d),$e(window,"resize",N)},Se=e=>{e&&(e.style.display=""),b==null||b(e),L(window,"resize",N)},Ce=o.useCallback(e=>n.jsx("div",{...e,className:g(`${t}-backdrop`,A,!r&&"show")}),[r,A,t]),U={...i,...le};U.display="block";const Ne=e=>n.jsx("div",{role:"dialog",...e,style:U,className:g(a,t,ie&&`${t}-static`,!r&&"show"),onClick:h?Me:void 0,onMouseUp:he,"aria-label":v,"aria-labelledby":w,"aria-describedby":R,children:n.jsx(y,{...se,onMouseDown:ge,className:c,contentClassName:l,children:s})});return n.jsx(Ae.Provider,{value:me,children:n.jsx(xe,{show:u,ref:ue,backdrop:h,container:Z,keyboard:!0,autoFocus:P,enforceFocus:ee,restoreFocus:te,restoreFocusOptions:ae,onEscapeKeyDown:ye,onShow:Y,onHide:p,onEnter:we,onEntering:ve,onEntered:oe,onExit:Re,onExiting:ne,onExited:Se,manager:F(),transition:r?ze:void 0,backdropTransition:r?_e:void 0,renderBackdrop:Ce,renderDialog:Ne})})});V.displayName="Modal";const Ze=Object.assign(V,{Body:Ie,Header:Ue,Title:Le,Footer:He,Dialog:J,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150});export{Ze as M};