import{c as te,r,j as e,S as se,L}from"./index-3d8791b8.js";import{P as re}from"./PageBreadcrumb-9dd34a07.js";import"./Table-e312cd55.js";import{c as ae,d as ne}from"./index-e5c69e61.js";import"./httpClient-96fbf256.js";import{S as l}from"./sweetalert2.esm.all-dd0c4ce7.js";import{R as oe}from"./Row-10d1c5f5.js";import{C as le}from"./Col-c2024357.js";import{C as y}from"./Card-a8049602.js";import{B as u}from"./Button-21cae2d8.js";import{F as ie}from"./Form-70877923.js";import{T as ce}from"./Table-1d1464cf.js";import{B as p}from"./Pagination-ded171f0.js";import"./index-2400ada3.js";import"./iconBase-ce8e5803.js";import"./createWithBsPrefix-36be1bdf.js";const Ee=()=>{var A,U,P;const{user:x,permissions:f,isSuperUser:j}=te(),T=j||((A=f.Users)==null?void 0:A.Update),R=j||((U=f.Users)==null?void 0:U.Delete),F=j||((P=f.Users)==null?void 0:P.Create),[i,d]=r.useState([]),[N,$]=r.useState(""),[n,g]=r.useState(1),[c,_]=r.useState(15),[b,k]=r.useState(!0),[h,z]=r.useState("name"),[I,M]=r.useState(!1),[O,E]=r.useState(!1),[V,v]=r.useState(!1),[Y,G]=r.useState([]),C="https://backendapi.chase.boundlesstechnologies.net";r.useEffect(()=>{g(1),M(i.length>0)},[c,i]),r.useEffect(()=>{S()},[]);const S=async()=>{try{v(!0);const t=await fetch(`${C}/api/users`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x.token}`}});if(!t.ok)throw new Error("Failed to fetch user data");const o=(await t.json()).map((a,ee)=>({id_ui:ee+1,id:a._id,name:a.username||"No Name",email:a.email||"No Email",role:a.role?a.role.role_name:"No Role",phone:a.phone_number||"No Phone Number"}));G(o)}catch(t){console.error("Error fetching user data:",t),l.fire("Error!","Failed to fetch user data.","error")}finally{v(!1)}},B=Y.filter(t=>Object.values(t).some(s=>s.toString().toLowerCase().includes(N.toLowerCase()))).sort((t,s)=>{const o=t[h],a=s[h];return b?o.toString().localeCompare(a.toString()):a.toString().localeCompare(o.toString())}),D=Math.ceil(B.length/c),m=B.slice((n-1)*c,n*c),w=t=>g(t),H=t=>{E(t.target.checked),d(t.target.checked?m.map(s=>s.id):[])},J=t=>{d(s=>{const o=s.includes(t)?s.filter(a=>a!==t):[...s,t];return E(o.length===m.length),o})},q=t=>{t===h?k(!b):(z(t),k(!0))},K=t=>{$(t.target.value),g(1)},Q=async t=>{try{if(!(await fetch(`${C}/api/users/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x.token}`}})).ok)throw new Error("Failed to delete user");await S(),d([]),l.fire({title:"Deleted!",text:"User deleted successfully.",icon:"success",timer:1500})}catch{l.fire("Error!","User deletion failed.","error")}},W=async()=>{try{const t=await fetch(`${C}/api/users/bulk-delete`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x.token}`},body:JSON.stringify({ids:i})});if(await t.json()&&(d([]),l.fire({title:"Deleted!",text:"Users deleted successfully.",icon:"success",timer:1500}),S()),!t.ok)throw new Error("Failed to delete user")}catch{l.fire("Error!","User deletion failed.","error")}finally{}},X=()=>{l.fire({title:"Are you sure?",text:`All the ${i.length} selected users will be deleted!`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete them!"}).then(t=>{t.isConfirmed&&W()})},Z=t=>{l.fire({title:"Are you sure?",text:"This user will be deleted!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(s=>{s.isConfirmed&&Q(t)})};return V?e.jsx(se,{}):e.jsxs(e.Fragment,{children:[e.jsx(re,{title:"Employee List",subName:"User"}),e.jsx(oe,{children:e.jsx(le,{children:e.jsxs(y,{children:[e.jsxs(y.Header,{children:[e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"header-title",children:"User List"}),e.jsx("p",{className:"text-muted mb-0",children:"A list of all registered users."})]}),e.jsxs("div",{className:"mt-3 mt-lg-0",children:[I&&e.jsx(u,{variant:"danger",className:"me-2",onClick:X,children:"Delete Selected"}),e.jsx(u,{disabled:!F,style:{border:"none"},variant:"success",children:e.jsxs(L,{to:"/user/user-create",className:"text-white text-decoration-none",children:[e.jsx("i",{className:"bi bi-plus"})," Add New User"]})})]})]}),e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3",children:[e.jsx("div",{className:"app-search d-none d-lg-block",children:e.jsx("form",{children:e.jsxs("div",{className:"input-group",style:{backgroundColor:"rgba(255, 255, 255, 0.8)",borderRadius:"10px",border:"1px solid rgba(0, 0, 0, 0.1)"},children:[e.jsx("input",{type:"search",className:"form-control",placeholder:"Search User here...",value:N,onChange:K,style:{backgroundColor:"transparent",border:"none",paddingLeft:"10px",color:"#333"}}),e.jsx("span",{className:"ri-search-line search-icon text-muted",style:{marginRight:"10px",color:"#666"}})]})})}),e.jsxs(ie.Select,{value:c,style:{zIndex:1},onChange:t=>_(Number(t.target.value)),className:"w-auto mt-3 mt-lg-0",children:[e.jsx("option",{value:15,children:"15 items"}),e.jsx("option",{value:30,children:"30 items"}),e.jsx("option",{value:40,children:"40 items"})]})]})]}),e.jsx(y.Body,{children:e.jsxs("div",{className:"table-responsive",children:[e.jsxs(ce,{className:"table-striped table-centered mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("input",{type:"checkbox",onChange:H,checked:O})}),["Name","Email","Role","Phone Number","Action"].map(t=>e.jsx("th",{children:e.jsxs("span",{onClick:()=>q(t.toLowerCase().replace(" ","_")),style:{cursor:"pointer"},children:[t," ",h===t.toLowerCase().replace(" ","_")&&(b?"↑":"↓")]})},t))]})}),e.jsx("tbody",{children:m.length>0?m.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:i.includes(t.id),onChange:()=>J(t.id)})}),e.jsx("td",{children:t.name}),e.jsx("td",{children:t.email}),e.jsx("td",{children:t.role}),e.jsx("td",{children:t.phone}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex",children:[e.jsx(u,{variant:"secondary",disabled:!T,children:e.jsx(L,{to:`/user/update/${t.id}`,children:e.jsx(ae,{})})}),e.jsx(u,{variant:"danger",className:"ms-2",onClick:()=>Z(t.id),disabled:!R,children:e.jsx(ne,{})})]})})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:7,className:"text-center",children:"No users found"})})})]}),e.jsx("nav",{className:"d-flex justify-content-end mt-3",children:e.jsxs(p,{className:"pagination-rounded mb-0",children:[e.jsx(p.Prev,{onClick:()=>n>1&&w(n-1)}),Array.from({length:D},(t,s)=>e.jsx(p.Item,{active:s+1===n,onClick:()=>w(s+1),children:s+1},s+1)),e.jsx(p.Next,{onClick:()=>n<D&&w(n+1)})]})})]})})]})})})]})};export{Ee as default};
