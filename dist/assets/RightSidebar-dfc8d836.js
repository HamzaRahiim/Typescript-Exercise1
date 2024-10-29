import{r as u,e as C,j as e,f as w,T as b,b as ie,L as de}from"./index-3d8791b8.js";import{u as U}from"./useThemeCustomizer-54386b0f.js";import{R as k}from"./Row-10d1c5f5.js";import{u as me,C as m}from"./Col-c2024357.js";import{F as r}from"./Form-70877923.js";import{I as f}from"./Image-8a789d10.js";import{S as he}from"./index-ee2a81b4.js";import{u as ue}from"./useWindow-a78371ce.js";import{A as fe,M as xe,B as pe,a as je,g as be}from"./AbstractModalHeader-14d7211d.js";import{F as ge}from"./NoopTransition-ab7d619d.js";import{c as G,d as ke}from"./createWithBsPrefix-36be1bdf.js";import{T as Ne,t as ve,E as A,a as ye,b as we}from"./TransitionWrapper-ec82a515.js";import{N as Ce}from"./NavbarContext-4ad790bc.js";import{B as Le}from"./Button-21cae2d8.js";import"./index-2400ada3.js";import"./useMergedRefs-ffb77068.js";import"./DataKey-e12315fd.js";const Q=u.forwardRef(({bsPrefix:a,size:c,vertical:t=!1,className:s,role:d="group",as:o="div",...h},n)=>{const l=C(a,"btn-group");let i=l;return t&&(i=`${l}-vertical`),e.jsx(o,{...h,ref:n,role:d,className:w(s,i,c&&`${l}-${c}`)})});Q.displayName="ButtonGroup";const Fe=Q,S=new WeakMap,D=(a,c)=>{if(!a||!c)return;const t=S.get(c)||new Map;S.set(c,t);let s=t.get(a);return s||(s=c.matchMedia(a),s.refCount=0,t.set(s.media,s)),s};function Be(a,c=typeof window>"u"?void 0:window){const t=D(a,c),[s,d]=u.useState(()=>t?t.matches:!1);return ue(()=>{let o=D(a,c);if(!o)return d(!1);let h=S.get(c);const n=()=>{d(o.matches)};return o.refCount++,o.addListener(n),n(),()=>{o.removeListener(n),o.refCount--,o.refCount<=0&&(h==null||h.delete(o.media)),o=void 0}},[a]),s}function ze(a){const c=Object.keys(a);function t(n,l){return n===l?l:n?`${n} and ${l}`:l}function s(n){return c[Math.min(c.indexOf(n)+1,c.length-1)]}function d(n){const l=s(n);let i=a[l];return typeof i=="number"?i=`${i-.2}px`:i=`calc(${i} - 0.2px)`,`(max-width: ${i})`}function o(n){let l=a[n];return typeof l=="number"&&(l=`${l}px`),`(min-width: ${l})`}function h(n,l,i){let x;typeof n=="object"?(x=n,i=l,l=!0):(l=l||!0,x={[n]:l});let y=u.useMemo(()=>Object.entries(x).reduce((p,[N,v])=>((v==="up"||v===!0)&&(p=t(p,o(N))),(v==="down"||v===!0)&&(p=t(p,d(N))),p),""),[JSON.stringify(x)]);return Be(y,i)}return h}const Se=ze({xs:0,sm:576,md:768,lg:992,xl:1200,xxl:1400}),Ee=G("offcanvas-body"),Re={[A]:"show",[we]:"show"},W=u.forwardRef(({bsPrefix:a,className:c,children:t,in:s=!1,mountOnEnter:d=!1,unmountOnExit:o=!1,appear:h=!1,...n},l)=>(a=C(a,"offcanvas"),e.jsx(Ne,{ref:l,addEndListener:ve,in:s,mountOnEnter:d,unmountOnExit:o,appear:h,...n,childRef:t.ref,children:(i,x)=>u.cloneElement(t,{...x,className:w(c,t.props.className,(i===A||i===ye)&&`${a}-toggling`,Re[i])})})));W.displayName="OffcanvasToggling";const Oe=W,J=u.forwardRef(({bsPrefix:a,className:c,closeLabel:t="Close",closeButton:s=!1,...d},o)=>(a=C(a,"offcanvas-header"),e.jsx(fe,{ref:o,...d,className:w(c,a),closeLabel:t,closeButton:s})));J.displayName="OffcanvasHeader";const Te=J,Me=ke("h5"),Ie=G("offcanvas-title",{Component:Me});function $e(a){return e.jsx(Oe,{...a})}function He(a){return e.jsx(ge,{...a})}const K=u.forwardRef(({bsPrefix:a,className:c,children:t,"aria-labelledby":s,placement:d="start",responsive:o,show:h=!1,backdrop:n=!0,keyboard:l=!0,scroll:i=!1,onEscapeKeyDown:x,onShow:y,onHide:p,container:N,autoFocus:v=!0,enforceFocus:X=!0,restoreFocus:_=!0,restoreFocusOptions:V,onEntered:Y,onExit:Z,onExiting:P,onEnter:E,onEntering:q,onExited:R,backdropClassName:O,manager:T,renderStaticNode:ee=!1,...ae},te)=>{const L=u.useRef();a=C(a,"offcanvas");const{onToggle:M}=u.useContext(Ce)||{},[I,se]=u.useState(!1),$=Se(o||"xs","up");u.useEffect(()=>{se(o?h&&!$:h)},[h,o,$]);const F=me(()=>{M==null||M(),p==null||p()}),ce=u.useMemo(()=>({onHide:F}),[F]);function re(){return T||(i?(L.current||(L.current=new je({handleContainerOverflow:!1})),L.current):be())}const le=(j,...B)=>{j&&(j.style.visibility="visible"),E==null||E(j,...B)},oe=(j,...B)=>{j&&(j.style.visibility=""),R==null||R(...B)},ne=u.useCallback(j=>e.jsx("div",{...j,className:w(`${a}-backdrop`,O)}),[O,a]),H=j=>e.jsx("div",{...j,...ae,className:w(c,o?`${a}-${o}`:a,`${a}-${d}`),"aria-labelledby":s,children:t});return e.jsxs(e.Fragment,{children:[!I&&(o||ee)&&H({}),e.jsx(xe.Provider,{value:ce,children:e.jsx(pe,{show:I,ref:te,backdrop:n,container:N,keyboard:l,autoFocus:v,enforceFocus:X&&!i,restoreFocus:_,restoreFocusOptions:V,onEscapeKeyDown:x,onShow:y,onHide:F,onEnter:le,onEntering:q,onEntered:Y,onExit:Z,onExiting:P,onExited:oe,manager:re(),transition:$e,backdropTransition:He,renderBackdrop:ne,renderDialog:H})})]})});K.displayName="Offcanvas";const z=Object.assign(K,{Body:Ee,Header:Te,Title:Ie}),De=({handleChangeLayoutPosition:a,layoutPosition:c,layoutConstants:t})=>e.jsxs("div",{id:"layout-position",children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Layout Position"}),e.jsxs(Fe,{className:"radio",role:"group",children:[e.jsx("input",{type:"radio",className:"btn-check",name:"data-layout-position",id:"layout-position-fixed",value:t.fixed,onChange:s=>a(s.target.value),checked:c===t.fixed}),e.jsx("label",{className:"btn btn-soft-primary w-sm",htmlFor:"layout-position-fixed",children:"Fixed"}),e.jsx("input",{type:"radio",className:"btn-check",name:"data-layout-position",id:"layout-position-scrollable",value:t.scrollable,onChange:s=>a(s.target.value),checked:c===t.scrollable}),e.jsx("label",{className:"btn btn-soft-primary w-sm ms-0",htmlFor:"layout-position-scrollable",children:"Scrollable"})]})]}),g=""+new URL("light-9122f81f.png",import.meta.url).href,Ue=""+new URL("dark-176a48b1.png",import.meta.url).href,Ge=({handleChangeLayoutTheme:a,layoutTheme:c,layoutConstants:t})=>e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Color Scheme"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-bs-theme",id:"layout-color-light",value:t.light,onChange:s=>a(s.target.value),checked:c===t.light}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"layout-color-light",children:e.jsx(f,{src:g,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Light"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"checkbox",name:"data-bs-theme",id:"layout-color-dark",value:t.dark,onChange:s=>a(s.target.value),checked:c===t.dark}),e.jsx(r.Check.Label,{htmlFor:"layout-color-dark",children:e.jsx(f,{src:Ue,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Dark"})]})]})]}),Ae=""+new URL("horizontal-afbc072f.png",import.meta.url).href,Qe=({handleChangeLayoutType:a,layoutConstants:c,layoutType:t})=>e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"mb-3 fs-16 fw-bold",children:"Choose Layout"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-layout",id:"customizer-layout01",value:c.vertical,onChange:s=>a(s.target.value),checked:t===c.vertical}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"customizer-layout01",children:e.jsx(f,{src:g,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Vertical"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"checkbox",name:"data-layout",id:"customizer-layout02",value:c.horizontal,onChange:s=>a(s.target.value),checked:t===c.horizontal}),e.jsx(r.Check.Label,{htmlFor:"customizer-layout02",children:e.jsx(f,{src:Ae,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Horizontal"})]})]})]}),We=""+new URL("boxed-05be880c.png",import.meta.url).href,Je=({handleChangeLayoutWidth:a,layoutWidth:c,layoutConstants:t})=>e.jsxs("div",{id:"layout-width",children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Layout Mode"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-check form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-layout-mode",id:"layout-mode-fluid",value:t.fluid,onChange:s=>a(s.target.value)}),e.jsx("label",{className:"form-check-label",htmlFor:"layout-mode-fluid",children:e.jsx("img",{src:g,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Fluid"})]}),e.jsx(m,{xs:4,children:e.jsxs("div",{id:"layout-boxed",children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-layout-mode",id:"layout-mode-boxed",value:t.boxed,onChange:s=>a(s.target.value),checked:c===t.boxed}),e.jsx("label",{className:"form-check-label",htmlFor:"layout-mode-boxed",children:e.jsx("img",{src:We,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Boxed"})]})})]})]}),Ke=""+new URL("sidebar-light-0f3d717e.png",import.meta.url).href,Xe=({handleChangeSideBarTheme:a,sideBarTheme:c,layoutConstants:t})=>e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Menu Color"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-menu-color",id:"leftbar-color-light",value:t.light,onChange:s=>a(s.target.value),checked:c===t.light}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-color-light",children:e.jsx(f,{fluid:!0,src:g,alt:""})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Light"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-menu-color",id:"leftbar-color-dark",value:t.dark,onChange:s=>a(s.target.value),checked:c===t.dark}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-color-dark",children:e.jsx(f,{fluid:!0,src:Ke,alt:""})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Dark"})]})]})]}),_e=""+new URL("compact-52597e0d.png",import.meta.url).href,Ve=""+new URL("sm-9f07587b.png",import.meta.url).href,Ye=""+new URL("full-54f239cd.png",import.meta.url).href,Ze=({handleChangeSideBarType:a,sideBarType:c,layoutConstants:t})=>e.jsxs("div",{id:"sidebar-size",children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Sidebar Size"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-sidenav-size",id:"leftbar-size-default",value:t.default,onChange:s=>a(s.target.value),checked:c===t.default}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-size-default",children:e.jsx(f,{fluid:!0,src:g,alt:""})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Default"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"checkbox",name:"data-sidenav-size",id:"leftbar-size-compact",value:t.compact,onChange:s=>a(s.target.value),checked:c===t.compact}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-size-compact",children:e.jsx(f,{fluid:!0,src:_e,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Compact"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"checkbox",name:"data-sidenav-size",id:"leftbar-size-small",value:t.condensed,onChange:s=>a(s.target.value),checked:c===t.condensed}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-size-small",children:e.jsx(f,{fluid:!0,src:Ve,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Condensed"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"checkbox",name:"data-sidenav-size",id:"leftbar-size-full",value:t.full,onChange:s=>a(s.target.value),checked:c===t.full}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"leftbar-size-full",children:e.jsx(f,{fluid:!0,src:Ye,alt:"",className:"img-fluid"})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Full Layout"})]})]})]}),Pe=({handleChangeTopBarTheme:a,topBarTheme:c,layoutConstants:t})=>e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"my-3 fs-16 fw-bold",children:"Topbar Color"}),e.jsxs(k,{children:[e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-topbar-color",id:"topbar-color-light",value:t.light,onChange:s=>a(s.target.value),checked:c===t.light}),e.jsx(r.Check.Label,{htmlFor:"topbar-color-light",children:e.jsx(f,{fluid:!0,src:g,alt:""})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Light"})]}),e.jsxs(m,{xs:4,children:[e.jsxs(r.Check,{className:"form-switch card-switch mb-1",children:[e.jsx(r.Check.Input,{className:"form-check-input",type:"radio",name:"data-topbar-color",id:"topbar-color-dark",value:t.dark,onChange:s=>a(s.target.value),checked:c===t.dark}),e.jsx(r.Check.Label,{className:"form-check-label",htmlFor:"topbar-color-dark",children:e.jsx(f,{fluid:!0,src:g,alt:""})})]}),e.jsx("h5",{className:"font-14 text-center text-muted mt-2",children:"Dark"})]})]})]}),qe=()=>{const{layoutType:a,layoutTheme:c,layoutWidth:t,topBarTheme:s,sideBarTheme:d,sideBarType:o,layoutPosition:h,handleChangeLayoutType:n,handleChangeLayoutTheme:l,handleChangeLayoutWidth:i,handleChangeTopBarTheme:x,handleChangeSideBarTheme:y,handleChangeSideBarType:p,handleChangeLayoutPosition:N}=U();return e.jsxs("div",{className:"p-3",children:[e.jsx(Qe,{handleChangeLayoutType:n,layoutType:a,layoutConstants:b.layout.type}),e.jsx(Ge,{handleChangeLayoutTheme:l,layoutTheme:c,layoutConstants:b.theme}),e.jsx(Je,{handleChangeLayoutWidth:i,layoutWidth:t,layoutConstants:b.layout.mode}),e.jsx(Pe,{handleChangeTopBarTheme:x,topBarTheme:s,layoutConstants:b.topbar.theme}),e.jsx(Xe,{handleChangeSideBarTheme:y,sideBarTheme:d,layoutConstants:b.sidebar.theme}),e.jsx(Ze,{handleChangeSideBarType:p,sideBarType:o,layoutConstants:b.sidebar.size}),e.jsx(De,{handleChangeLayoutPosition:N,layoutPosition:h,layoutConstants:b.layout.menuPosition})]})},ja=()=>{const{updateSettings:a,settings:c}=ie(),{reset:t}=U(),s=c.rightSidebar,d=()=>{a({rightSidebar:b.rightSidebar.hidden})};return e.jsxs(z,{show:s,onHide:d,placement:"end",id:"theme-settings-offcanvas",children:[e.jsx(z.Header,{className:"d-flex align-items-center bg-primary p-3",closeVariant:"white",closeButton:!0,children:e.jsx("h5",{className:"text-white m-0",children:"Theme Settings"})}),e.jsx(z.Body,{className:"p-0",children:e.jsx(he,{scrollbarMaxSize:320,className:"h-100",children:e.jsx(qe,{})})}),e.jsx("div",{className:"offcanvas-footer border-top p-3 text-center",children:e.jsxs(k,{children:[e.jsx(m,{xs:6,children:e.jsx(Le,{type:"button",variant:"light",className:"w-100",id:"reset-layout",onClick:t,children:"Reset"})}),e.jsx("div",{className:"col-6",children:e.jsx(de,{to:"https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/",target:"_blank",role:"button",className:"btn btn-primary w-100",children:"Buy Now"})})]})})]})};export{ja as default};
