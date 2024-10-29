import{c as te,r,j as e,l as w,L}from"./index-3d8791b8.js";import"./httpClient-96fbf256.js";import{c as se,d as re}from"./index-e5c69e61.js";import{P as oe}from"./PageBreadcrumb-9dd34a07.js";import"./Table-e312cd55.js";import{S as l}from"./sweetalert2.esm.all-dd0c4ce7.js";import{C}from"./Card-a8049602.js";import{B as h}from"./Button-21cae2d8.js";import{T as le}from"./Table-1d1464cf.js";import{B as m}from"./Pagination-ded171f0.js";import"./iconBase-ce8e5803.js";import"./Row-10d1c5f5.js";import"./Col-c2024357.js";import"./index-2400ada3.js";import"./createWithBsPrefix-36be1bdf.js";const we=()=>{var A,P,T;const{user:S,permissions:u,isSuperUser:x}=te(),$=x||((A=u.Users)==null?void 0:A.Update),N=x||((P=u.Users)==null?void 0:P.Delete),U=x||((T=u.Users)==null?void 0:T.Create),[n,a]=r.useState([]),[k,I]=r.useState(""),[o,R]=r.useState(1),[i,z]=r.useState(15),[p,F]=r.useState(!0),[M,Y]=r.useState(!1),[G,v]=r.useState(!1),[H,E]=r.useState(!1),[_,J]=r.useState([]),f="https://backendapi.chase.boundlesstechnologies.net",{token:B}=S;r.useEffect(()=>{R(1),Y(n.length>0)},[i,n]),r.useEffect(()=>{b()},[]);const D=_.filter(t=>t.role_name.toLowerCase().includes(k.toLowerCase())).sort((t,s)=>p?t.role_name.localeCompare(s.role_name):s.role_name.localeCompare(t.role_name)),j=Math.ceil(D.length/i),g=D.slice((o-1)*i,o*i),y=t=>{R(t)},O=t=>{E(t.target.checked),t.target.checked?a(_.map(s=>s._id)):a([])},q=t=>{a(s=>{const c=s.includes(t)?s.filter(d=>d!==t):[...s,t];return E(c.length===g.length),c})},K=t=>{I(t.target.value)},Q=()=>{F(!p)},V=t=>{l.fire({title:"Are you sure?",text:"This Role will be deleted!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(s=>{s.isConfirmed&&Z(t)})},W=async()=>{try{const t=await fetch(`${f}/api/users/roles/bulk-delete`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S.token}`},body:JSON.stringify({ids:n})});if(await t.json()&&(a([]),l.fire({title:"Deleted!",text:"Roles deleted successfully.",icon:"success",timer:1500}),b()),!t.ok)throw new Error("Failed to delete user")}catch{l.fire("Error!","Role deletion failed.","error")}},X=()=>{l.fire({title:"Are you sure?",text:`All the ${n.length} selected roles will be deleted!`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete them!"}).then(t=>{t.isConfirmed&&W()})},b=async()=>{try{v(!0);const t=await fetch(`${f}/api/users/role`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${B}`}});if(!t.ok)throw new Error("Failed to fetch user roles data.");const c=(await t.json()).map((d,ee)=>({_id:d._id,role_name:d.role_name,id_ui:ee+1}));J(c)}catch(t){console.error("Error fetching roles:",t),l.fire({title:"Error!",text:t.message,icon:"error",timer:1500})}finally{v(!1)}},Z=async t=>{try{if(!(await fetch(`${f}/api/users/role/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${B}`}})).ok)throw new Error("Failed to delete role(s)");l.fire({title:"Deleted!",text:"Role(s) deleted successfully.",icon:"success",timer:1500}),b(),a([])}catch(s){console.error("Error deleting role(s):",s),l.fire({title:"Error!",text:s.message,icon:"error",timer:1500})}};return G?e.jsxs("div",{className:"d-flex justify-content-center align-items-center",style:{height:"100vh"},children:[e.jsx(w,{animation:"grow",style:{margin:"0 5px"}}),e.jsx(w,{animation:"grow",style:{margin:"0 5px"}}),e.jsx(w,{animation:"grow",style:{margin:"0 5px"}})]}):e.jsxs(e.Fragment,{children:[e.jsx(oe,{title:"Roles List",subName:"User"}),e.jsxs(C,{children:[e.jsxs(C.Header,{children:[e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"header-title",children:"Roles List"}),e.jsx("p",{className:"text-muted mb-0",children:"A list of all Roles in the system"})]}),e.jsxs("div",{className:"mt-3 mt-lg-0",children:[e.jsx(h,{disabled:!U,style:{border:"none"},variant:"success",children:e.jsxs(L,{to:"/user/roles",className:"text-white text-decoration-none",children:[e.jsx("i",{className:"bi bi-plus"})," Add New Role"]})}),M&&e.jsx(h,{variant:"danger",className:"ms-2",onClick:X,disabled:!N,children:"Delete Selected"})]})]}),e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3",children:[e.jsx("div",{className:"app-search d-none d-lg-block",children:e.jsx("form",{children:e.jsxs("div",{className:"input-group",style:{backgroundColor:"rgba(255, 255, 255, 0.8)",borderRadius:"10px",border:"1px solid rgba(0, 0, 0, 0.1)"},children:[e.jsx("input",{type:"search",className:"form-control",placeholder:"Search Role here...",value:k,onChange:K,style:{backgroundColor:"transparent",border:"none",paddingLeft:"10px",color:"#333"}}),e.jsx("span",{className:"ri-search-line search-icon text-muted",style:{marginRight:"10px",color:"#666"}})]})})}),e.jsxs("select",{className:"form-select w-auto mt-3 mt-lg-0",value:i,style:{zIndex:1},onChange:t=>z(Number(t.target.value)),children:[e.jsx("option",{value:15,children:"15 items"}),e.jsx("option",{value:25,children:"25 items"}),e.jsx("option",{value:30,children:"30 items"})]})]})]}),e.jsx(C.Body,{children:e.jsxs("div",{className:"table-responsive-sm",children:[e.jsxs(le,{className:"table-striped table-centered mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("input",{type:"checkbox",onChange:O,checked:H})}),e.jsx("th",{children:"ID"}),e.jsx("th",{children:e.jsxs("span",{onClick:Q,style:{cursor:"pointer"},children:["Role Name ",p?"↑":"↓"]})}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:g.length>0?g.map(t=>{const s=n.includes(t._id);return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:s,onChange:()=>q(t._id)})}),e.jsx("td",{children:t.id_ui}),e.jsx("td",{children:t.role_name}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex",children:[e.jsx(h,{variant:"secondary",disabled:!$,children:e.jsx(L,{to:`/user/update/role/${t._id}`,className:"text-white",children:e.jsx(se,{})})}),e.jsx(h,{variant:"danger",className:"ms-2",onClick:()=>V(t._id),disabled:!N,children:e.jsx(re,{})})]})})]},t._id)}):e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center",children:"No roles found"})})})]}),e.jsx("nav",{className:"d-flex justify-content-end mt-3",children:e.jsxs(m,{className:"pagination-rounded mb-0",children:[e.jsx(m.Prev,{onClick:()=>o>1&&y(o-1),disabled:o===1}),Array.from({length:j},(t,s)=>e.jsx(m.Item,{active:s+1===o,onClick:()=>y(s+1),children:s+1},s+1)),e.jsx(m.Next,{onClick:()=>o<j&&y(o+1),disabled:o===j})]})})]})})]})]})};export{we as default};
