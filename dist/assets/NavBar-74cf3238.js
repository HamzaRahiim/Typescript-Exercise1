import{r as i,d as g,j as a,R as h,L as j,C as y}from"./index-3d8791b8.js";import"./httpClient-96fbf256.js";import{f as w,a as f,b}from"./index-eebcf10f.js";import{C}from"./Collapse-d9661bb7.js";import"./index-e5c69e61.js";import"./iconBase-ce8e5803.js";import"./TransitionWrapper-ec82a515.js";import"./useMergedRefs-ffb77068.js";const N=({item:e,tag:r,linkClassName:c,className:m,subMenuClassNames:p,activeMenuItems:t,toggleMenu:d})=>{const x=r,[n,l]=i.useState(t.includes(e.key)),u=window.screen.width<=991&&n;i.useEffect(()=>{l(t.includes(e.key))},[t,e]);const o=s=>{s.preventDefault();const k=!n;return l(k),d&&d(e,k),!1};return a.jsxs(x,{className:`${m} ${t.includes(e.key)?"active":""}`,children:[a.jsxs(j,{to:"/#",onClick:o,"data-menu-key":e.key,className:`${c} ${t.includes(e.key)?"active":""}`,id:e.key,role:"button","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":n,children:[a.jsx("i",{className:e.icon}),e.label,a.jsx("div",{className:"arrow-down"})]}),a.jsx("div",{className:`${p} ${u?"show":""}`,"aria-labelledby":e.key,children:(e.children||[]).map((s,k)=>a.jsx(h.Fragment,{children:s.children?a.jsx(N,{item:s,tag:"div",linkClassName:`dropdown-item ${t.includes(s.key)?"active":""}`,activeMenuItems:t,className:"dropdown",subMenuClassNames:"dropdown-menu",toggleMenu:d}):a.jsx(v,{item:s,className:`dropdown-item ${t.includes(s.key)?"active":""}`})},k))})]})},M=({item:e,className:r,linkClassName:c})=>a.jsx("li",{className:r,children:a.jsx(v,{item:e,className:c})}),v=({item:e})=>a.jsx(j,{className:"dropdown-item",to:e.url,target:e.target,"data-menu-key":e.key,children:e.label}),$=({menuItems:e})=>{const[r]=i.useState(e),[c,m]=i.useState([]);let p=g();const t=i.useRef(null),d=(n,l)=>{l&&m([n.key,...f(r,n)])},x=i.useCallback(()=>{const n=document.getElementById("main-side-menu");let l=null;if(n){let u=n.getElementsByTagName("a");for(let o=0;o<u.length;++o)if(p.pathname===u[o].pathname){l=u[o];break}if(l){const o=l.getAttribute("data-menu-key"),s=w(e,o);s&&m([s.key,...f(e,s)])}}},[p.pathname,e]);return i.useEffect(()=>{r&&r.length>0&&x()},[x,r]),a.jsx("ul",{className:"navbar-nav",ref:t,id:"main-side-menu",children:(r||[]).map((n,l)=>a.jsx(h.Fragment,{children:n.children?a.jsx(N,{item:n,tag:"li",className:"nav-item dropdown",subMenuClassNames:"dropdown-menu",activeMenuItems:c,linkClassName:"nav-link dropdown-toggle arrow-none",toggleMenu:d}):a.jsx(M,{item:n,className:c.includes(n.key)?"active":"",linkClassName:c.includes(n.key)?"active":""})},l))})},z=({isMenuOpened:e})=>a.jsx("div",{className:"topnav",children:a.jsx(y,{fluid:!0,children:a.jsx("nav",{className:"navbar navbar-expand-lg",children:a.jsx(C,{in:e,children:a.jsx("div",{className:"collapse navbar-collapse",id:"topnav-menu-content",children:a.jsx($,{menuItems:b()})})})})})});export{z as default};