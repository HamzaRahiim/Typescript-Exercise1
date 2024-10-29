import{r as j,j as e,L as m,u as k,a as y,b as D,c as T,T as u}from"./index-3d8791b8.js";import"./httpClient-96fbf256.js";import{l as C}from"./logo-92e11ba8.js";import{l as b}from"./logo-sm-c9ea58e0.js";import{l as M}from"./logo-dark-25ffad07.js";import{p as w}from"./avatar-1-48b80b48.js";import{a as A,b as S,c as B}from"./avatar-4-c4d6cd1f.js";import{a as z}from"./avatar-5-ae8e2774.js";import"./Table-e312cd55.js";import{S as N}from"./index-ee2a81b4.js";import{D as i}from"./Dropdown-e05b03ed.js";import{R as L}from"./Row-10d1c5f5.js";import{C as O}from"./Col-c2024357.js";import{C as E}from"./Card-a8049602.js";import{I as f}from"./Image-8a789d10.js";import{G as H}from"./iconBase-ce8e5803.js";import{u as I}from"./useThemeCustomizer-54386b0f.js";import"./index-2400ada3.js";import"./DataKey-e12315fd.js";import"./useMergedRefs-ffb77068.js";import"./NavContext-1798dc11.js";import"./useWindow-a78371ce.js";import"./useCallbackRef-8cbe87ce.js";import"./InputGroupContext-c86885e2.js";import"./NavbarContext-4ad790bc.js";import"./Button-21cae2d8.js";import"./createWithBsPrefix-36be1bdf.js";const R=({messages:t})=>{const[r,l]=j.useState(!1),p=()=>{l(!r)};function d(s){typeof s!="object"&&(s=new Date(s));var o=Math.floor((new Date().valueOf()-s.valueOf())/1e3),n,a=Math.floor(o/31536e3);return a>=1?n="year":(a=Math.floor(o/2592e3),a>=1?n="month":(a=Math.floor(o/86400),a>=1?n="day":(a=Math.floor(o/3600),a>=1?n="hour":(a=Math.floor(o/60),a>=1?n="minute":(a=o,n="second"))))),(a>1||a===0)&&(n+="s"),a+" "+n+" ago"}return e.jsx(e.Fragment,{children:e.jsxs(i,{show:r,onToggle:p,children:[e.jsxs(i.Toggle,{as:"a",className:"nav-link dropdown-toggle arrow-none",role:"button",onClick:p,children:[e.jsx("i",{className:"ri-mail-line fs-22"}),e.jsx("span",{className:"noti-icon-badge badge text-bg-purple",children:"4"})]}),e.jsxs(i.Menu,{align:"end",className:"dropdown-menu-animated dropdown-lg py-0",children:[e.jsx("div",{className:"p-2 border-top-0 border-start-0 border-end-0 border-dashed border",onClick:p,children:e.jsxs(L,{className:"align-items-center",children:[e.jsx(O,{children:e.jsx("h6",{className:"m-0 fs-16 fw-semibold",children:" Messages"})}),e.jsx("div",{className:"col-auto",children:e.jsx(m,{to:"#",className:"text-dark text-decoration-underline",children:e.jsx("small",{children:"Clear All"})})})]})}),e.jsx(N,{style:{maxHeight:300},children:(t||[]).map((s,o)=>e.jsx(m,{to:"",className:"dropdown-item p-0 notify-item read-noti card m-0 shadow-none",children:e.jsx(E.Body,{children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"notify-icon",children:e.jsx(f,{src:s.avatar,className:"img-fluid rounded-circle",alt:""})})}),e.jsxs("div",{className:"flex-grow-1 text-truncate ms-2",children:[e.jsxs("h5",{className:"noti-item-title fw-semibold fs-14",children:[s.name," ",e.jsx("small",{className:"fw-normal text-muted float-end ms-1",children:d(s.createdAt)})]}),e.jsx("small",{className:"noti-item-subtitle text-muted",children:s.subText})]})]})})},o))}),e.jsx(m,{to:"#",className:"dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2",children:"View All"})]})]})})},$=({notifications:t})=>{const[r,l]=j.useState(!1);function p(s){typeof s!="object"&&(s=new Date(s));var o=Math.floor((new Date().valueOf()-s.valueOf())/1e3),n,a=Math.floor(o/31536e3);return a>=1?n="year":(a=Math.floor(o/2592e3),a>=1?n="month":(a=Math.floor(o/86400),a>=1?n="day":(a=Math.floor(o/3600),a>=1?n="hour":(a=Math.floor(o/60),a>=1?n="minute":(a=o,n="second"))))),(a>1||a===0)&&(n+="s"),a+" "+n+" ago"}const d=()=>{l(!r)};return e.jsxs(i,{show:r,onToggle:d,children:[e.jsxs(i.Toggle,{as:"a",className:"nav-link arrow-none","data-bs-toggle":"dropdown",role:"button",onClick:d,children:[e.jsx("i",{className:"ri-notification-3-line fs-22"}),e.jsx("span",{className:"noti-icon-badge badge text-bg-pink",children:"3"})]}),e.jsxs(i.Menu,{align:"end",className:"dropdown-menu-animated dropdown-lg py-0",children:[e.jsx("div",{className:"p-2 border-top-0 border-start-0 border-end-0 border-dashed border",onClick:d,children:e.jsxs("div",{className:"row align-items-center",children:[e.jsx("div",{className:"col",children:e.jsx("h6",{className:"m-0 fs-16 fw-semibold",children:" Notification"})}),e.jsx("div",{className:"col-auto",children:e.jsx(m,{to:"#",className:"text-dark text-decoration-underline",children:e.jsx("small",{children:"Clear All"})})})]})}),e.jsx(N,{style:{maxHeight:300},children:(t||[]).map((s,o)=>e.jsxs(m,{to:"",className:"dropdown-item notify-item",children:[e.jsx("div",{className:`notify-icon bg-${s.variant}-subtle`,children:e.jsx("i",{className:`${s.icon} text-${s.variant}`})}),e.jsxs("p",{className:"notify-details",children:[s.title,e.jsx("small",{className:"noti-time",children:p(s.createdAt)})]})]},o))}),e.jsx(m,{to:"#",className:"dropdown-item text-center text-primary text-decoration-underline fw-bold notify-item border-top border-light py-2",children:"View All"})]})]})};function F(t){return H({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",clipRule:"evenodd"},child:[]}]})(t)}const P=({menuItems:t,userImage:r,username:l})=>{const[p,d]=k();return e.jsxs(i,{show:p,onToggle:d,children:[e.jsxs(i.Toggle,{className:"nav-link dropdown-toggle arrow-none nav-user",to:"#",role:"button",as:m,onClick:d,children:[e.jsx("span",{className:"account-user-avatar",children:e.jsx(F,{size:24})}),e.jsx("span",{className:"d-lg-block d-none",children:e.jsxs("h5",{className:"my-0 fw-normal",children:[l," ",e.jsx("i",{className:"ri-arrow-down-s-line d-none d-sm-inline-block align-middle"})]})})]}),e.jsx(i.Menu,{align:"end",className:"dropdown-menu-animated profile-dropdown",children:e.jsxs("div",{onClick:d,children:[e.jsx("div",{className:" dropdown-header noti-title",children:e.jsx("h6",{className:"text-overflow m-0",children:"Welcome !"})}),(t||[]).map((s,o)=>e.jsxs(m,{to:s.redirectTo,className:"dropdown-item",children:[e.jsx("i",{className:`${s.icon} fs-18 align-middle me-1`}),e.jsx("span",{children:s.label})]},o))]})})]})},W=()=>{const[t,r]=j.useState(!1),l=()=>{r(!t)};return e.jsxs(i,{show:t,onToggle:l,children:[e.jsx(i.Toggle,{as:"a",className:"nav-link dropdown-toggle arrow-none",role:"button",children:e.jsx("i",{className:"ri-search-line fs-22"})}),e.jsx(i.Menu,{className:"dropdown-menu-animated dropdown-lg p-0",children:e.jsx("form",{className:"p-3",children:e.jsx("input",{type:"search",className:"form-control",placeholder:"Search ...","aria-label":"Recipient's username"})})})]})};function c(t,r){return t.setMinutes(t.getMinutes()-r),t}const G=[{id:1,name:"Cristina Pride",subText:"Hi, How are you? What about our next meeting",avatar:w,createdAt:c(new Date,1440)},{id:2,name:"Sam Garret",subText:"Yeah everything is fine",avatar:A,createdAt:c(new Date,2880)},{id:3,name:"Karen Robinson",subText:"Wow that's great",avatar:S,createdAt:c(new Date,2880)},{id:4,name:"Sherry Marshall",subText:"Hi, How are you? What about our next meeting",avatar:B,createdAt:c(new Date,4320)},{id:5,name:"Shawn Millard",subText:"Yeah everything is fine",avatar:z,createdAt:c(new Date,5760)}],V=[{id:1,title:"Caleb Flakelar commented on Admin",icon:"mdi mdi-comment-account-outline",variant:"primary",createdAt:c(new Date,1)},{id:2,title:"New user registered.",icon:"mdi mdi-account-plus",variant:"warning",createdAt:c(new Date,300)},{id:3,title:"Carlos Crouch liked",icon:"mdi mdi-heart",variant:"danger",createdAt:c(new Date,4320)},{id:4,title:"Caleb Flakelar commented on Admi",icon:"mdi mdi-comment-account-outline",variant:"pink",createdAt:c(new Date,5760)},{id:5,title:"New user registered.",icon:"mdi mdi-account-plus",variant:"purple",createdAt:c(new Date,10960)},{id:6,title:"Carlos Crouch liked Admin",icon:"mdi mdi-heart",variant:"success",createdAt:c(new Date,10960)}],Y=[{label:"My Account",icon:"ri-account-circle-line",redirectTo:"/pages/profile"},{label:"Settings",icon:"ri-settings-4-line",redirectTo:"/pages/profile"},{label:"Support",icon:"ri-customer-service-2-line",redirectTo:"/pages/faq"},{label:"Lock Screen",icon:"ri-lock-password-line",redirectTo:"/auth/lock-screen"},{label:"Logout",icon:"ri-logout-box-line",redirectTo:"/auth/logout"}],be=({toggleMenu:t,navOpen:r})=>{const{sideBarType:l}=I(),{width:p}=y(),d=()=>{p<768?l==="full"?(s(),document.getElementsByTagName("html")[0].classList.add("sidebar-enable")):x({size:u.sidebar.size.full}):l==="condensed"?x({size:u.sidebar.size.default}):l==="full"?(s(),document.getElementsByTagName("html")[0].classList.add("sidebar-enable")):l==="fullscreen"?(x({size:u.sidebar.size.default}),document.getElementsByTagName("html")[0].classList.add("sidebar-enable")):x({size:u.sidebar.size.condensed})};function s(){const h=document.createElement("div");h.id="custom-backdrop",h.className="offcanvas-backdrop fade show",document.body.appendChild(h),h.addEventListener("click",function(){document.getElementsByTagName("html")[0].classList.remove("sidebar-enable"),o()})}function o(){const h=document.getElementById("custom-backdrop");h&&(document.body.removeChild(h),document.body.style.removeProperty("overflow"))}const{settings:n,updateSettings:a,updateSidebar:x}=D(),{user:g}=T(),v=()=>{n.theme==="dark"?a({theme:u.theme.light}):a({theme:u.theme.dark})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"navbar-custom",children:e.jsxs("div",{className:"topbar container-fluid",children:[e.jsxs("div",{className:"d-flex align-items-center gap-1",children:[e.jsxs("div",{className:"logo-topbar",children:[e.jsxs(m,{to:"/",className:"logo-light",children:[e.jsx("span",{className:"logo-lg",children:e.jsx(f,{src:C,alt:"logo"})}),e.jsx("span",{className:"logo-sm",children:e.jsx(f,{src:b,alt:"small logo"})})]}),e.jsxs(m,{to:"/",className:"logo-dark",children:[e.jsx("span",{className:"logo-lg",children:e.jsx("img",{src:M,alt:"dark logo"})}),e.jsx("span",{className:"logo-sm",children:e.jsx("img",{src:b,alt:"small logo"})})]})]}),e.jsx("button",{className:"button-toggle-menu",onClick:d,children:e.jsx("i",{className:"ri-menu-line"})}),e.jsx("button",{className:`navbar-toggle ${r?"open":""}`,"data-bs-toggle":"collapse","data-bs-target":"#topnav-menu-content",onClick:t,children:e.jsxs("div",{className:"lines",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsx("div",{className:"app-search d-none d-lg-block",children:e.jsx("form",{children:e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:"search",className:"form-control",placeholder:"Search..."}),e.jsx("span",{className:"ri-search-line search-icon text-muted"})]})})})]}),e.jsxs("ul",{className:"topbar-menu d-flex align-items-center gap-3",children:[e.jsx("li",{className:"dropdown d-lg-none",children:e.jsx(W,{})}),e.jsx("li",{className:"dropdown notification-list",children:e.jsx(R,{messages:G})}),e.jsx("li",{className:"dropdown notification-list",children:e.jsx($,{notifications:V})}),e.jsx("li",{className:"d-none d-sm-inline-block",children:e.jsx("div",{className:"nav-link",id:"light-dark-mode",onClick:v,children:e.jsx("i",{className:"ri-moon-line fs-22"})})}),e.jsx("li",{className:"dropdown",children:e.jsx(P,{menuItems:Y,userImage:w,username:g==null?void 0:g.username})})]})]})})})};export{be as default};
