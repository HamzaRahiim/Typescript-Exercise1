import{c as be,r,u as Ce,j as e,S as Se}from"./index-3d8791b8.js";import{P as we}from"./PageBreadcrumb-9dd34a07.js";import{F as Y}from"./FormInput-5189d08c.js";import{u as Ne}from"./index.esm-f7d27dc8.js";import"./Table-e312cd55.js";import{c as Ee,d as ve}from"./index-e5c69e61.js";import"./httpClient-96fbf256.js";import{S as i}from"./sweetalert2.esm.all-dd0c4ce7.js";import{S as Pe}from"./SingleFileUploader-c9e26641.js";import{C as T}from"./Card-a8049602.js";import{B as u}from"./Button-21cae2d8.js";import{F as n}from"./Form-70877923.js";import{T as Ae}from"./Table-1d1464cf.js";import{B as y}from"./Pagination-ded171f0.js";import{M as b}from"./Modal-9ed1e250.js";import"./Row-10d1c5f5.js";import"./Col-c2024357.js";import"./createWithBsPrefix-36be1bdf.js";import"./InputGroupContext-c86885e2.js";import"./index-2400ada3.js";import"./iconBase-ce8e5803.js";import"./useMergedRefs-ffb77068.js";import"./useCallbackRef-8cbe87ce.js";import"./AbstractModalHeader-14d7211d.js";import"./useWindow-a78371ce.js";import"./NoopTransition-ab7d619d.js";import"./TransitionWrapper-ec82a515.js";import"./DataKey-e12315fd.js";const at=()=>{var V,J,K;const{isSuperUser:C,permissions:S,user:W}=be(),$=C||((V=S.Products)==null?void 0:V.Update),q=C||((J=S.Products)==null?void 0:J.Delete),U=C||((K=S.Products)==null?void 0:K.Create),[l,w]=r.useState([]),[L,Q]=r.useState(""),[d,M]=r.useState(1),[h,X]=r.useState(15),[N,Z]=r.useState(!0),[ee,te]=r.useState(!1),[f,I]=r.useState(null),[se,j]=r.useState(!1),[_,ae]=r.useState([]),[re,m]=r.useState(!1),[E,oe]=r.useState([]),[o,v]=r.useState(null),c="https://backendapi.chase.boundlesstechnologies.net",p=W.token,{handleSubmit:ne,register:P,control:z,reset:A,setValue:B,formState:{errors:G}}=Ne();r.useEffect(()=>{M(1),te(l.length>0)},[h,l]);const ie=async()=>{try{if(console.log(" selected Rows ",l),!(await fetch(`${c}/api/categories/subcategories`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({ids:l})})).ok)throw new Error("Failed to delete category");x(),i.fire({title:"Deleted!",text:`All the selected ${l.length} SubCategory deleted successfully.`,icon:"success",timer:1500})}catch{i.fire("Oops!","SubCategory deletion failed.","error")}},le=()=>{i.fire({title:"Are you sure?",text:`All the ${l.length} selected items will be deleted!`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(t=>{t.isConfirmed&&ie()})},ce=t=>{t.target.checked?w(E.map(s=>s._id)):w([])},de=t=>{w(s=>s.includes(t)?s.filter(a=>a!==t):[...s,t])},me=async t=>{try{if(m(!0),!(await fetch(`${c}/api/categories/subcategory/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`}})).ok)throw new Error("Failed to delete category");i.fire({title:"Deleted!",text:"Sub-Category deleted successfully.",icon:"success",timer:1500}),x()}catch(s){console.error("Error deleting user:",s),i.fire({title:"Oops!",text:s.message,icon:"error",timer:1500})}finally{m(!1)}},pe=t=>{i.fire({title:"Are you sure?",text:"This Items will be deleted!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Remove!"}).then(s=>{s.isConfirmed&&me(t)})},ue=t=>{Q(t.target.value)},he=()=>{Z(!N)},O=E.filter(t=>t.name.toLowerCase().includes(L.toLowerCase())).sort((t,s)=>N?t.name.localeCompare(s.name):s.name.localeCompare(t.name)),k=t=>{M(t)},R=Math.ceil(O.length/h),H=O.slice((d-1)*h,d*h),[D,g]=Ce(),ge=t=>{v(t),B("name",t.name),B("description",t.description||""),B("parentCategory",t.parentCategory._id),g()},xe=async t=>{console.log("Sub Category Data:",t);const s=new FormData;s.append("name",t.name),s.append("description",t.description),s.append("parentCategory",t.parentCategory),f&&s.append("image",f);try{m(!0);const a=await fetch(`${c}/api/categories/subcategory`,{method:"POST",headers:{Authorization:`Bearer ${p}`},body:s});if(!a.ok){const F=await a.json();throw new Error(F.message||"Failed to add new Sub-category")}await a.json()&&(i.fire({title:"ADDED!",text:"Sub-Category added successfully!",icon:"success",confirmButtonText:"OK",timer:1500}),x())}catch(a){console.error("Error adding sub-category:",a),i.fire({title:"Oops!",text:a.message,icon:"error",timer:1500})}finally{m(!1)}},x=async()=>{try{j(!0);const t=await fetch(`${c}/api/categories/subcategory`,{method:"GET",headers:{Authorization:`Bearer ${p}`,"Content-Type":"application/json"}});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to get subcategories")}const s=await t.json();console.log("data from sub-category ",s),s&&oe(s)}catch(t){console.error("Error getting category data :",t)}finally{j(!1)}},fe=async()=>{try{j(!0);const t=await fetch(`${c}/api/categories/category`,{method:"GET",headers:{Authorization:`Bearer ${p}`,"Content-Type":"application/json"}});if(!t.ok){const a=await t.json();throw new Error(a.message||"Failed to get Category")}const s=await t.json();s.length>0&&ae(s),console.log(" data from api of categories get ",s)}catch(t){console.error("Error getting category data :",t)}finally{j(!1)}},je=async t=>{const s=new FormData;s.append("name",t.name),s.append("description",t.description),s.append("parentCategory",t.parentCategory),f&&s.append("image",f);try{m(!0);const a=await fetch(`${c}/api/categories/subcategory/${o==null?void 0:o._id}`,{method:"PUT",headers:{Authorization:`Bearer ${p}`},body:s});if(!a.ok){const F=await a.json();throw new Error(F.message||"Failed to Update Sub-Category")}await a.json()&&(i.fire({title:"Updated!",text:"Sub-Category updated successfully!",icon:"success",confirmButtonText:"OK",timer:1500}),x(),A(),v(null),g())}catch(a){console.error("Error Updating Sub-Category:",a),i.fire({title:"Oops!",text:a.message,icon:"error",timer:1500})}finally{m(!1)}};return r.useEffect(()=>{D||(A(),I(null),v(null))},[D,A]),r.useEffect(()=>{x(),fe()},[]),se?e.jsx(Se,{}):e.jsxs(e.Fragment,{children:[e.jsx(we,{title:"Sub-Category",subName:"Products"}),e.jsxs(T,{children:[e.jsxs(T.Header,{children:[e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"header-title",children:"Sub-Category Management"}),e.jsx("p",{className:"text-muted mb-0",children:"Add and Manage your all Product sub-categories here."})]}),e.jsxs("div",{className:"mt-3 mt-lg-0",children:[" ",e.jsxs(u,{disabled:!U,style:{border:"none"},variant:"success",onClick:()=>g(),children:[e.jsx("i",{className:"bi bi-plus"})," Add New Sub-Category"]}),ee&&e.jsx(u,{variant:"danger",className:"ms-2",onClick:le,children:"Delete All Selected"})]})]}),e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3",children:[e.jsx("div",{className:"app-search d-none d-lg-block",children:e.jsx("form",{children:e.jsxs("div",{className:"input-group",style:{backgroundColor:"rgba(255, 255, 255, 0.8)",borderRadius:"10px",border:"1px solid rgba(0, 0, 0, 0.1)"},children:[e.jsx("input",{type:"search",className:"form-control",placeholder:"Search SubCategory...",value:L,onChange:ue,style:{backgroundColor:"transparent",border:"none",paddingLeft:"10px",color:"#333"}}),e.jsx("span",{className:"ri-search-line search-icon text-muted",style:{marginRight:"10px",color:"#666"}})]})})}),e.jsxs(n.Select,{value:h,style:{zIndex:1},onChange:t=>X(Number(t.target.value)),className:"w-auto mt-3 mt-lg-0",children:[e.jsx("option",{value:15,children:"15 items"}),e.jsx("option",{value:30,children:"30 items"}),e.jsx("option",{value:40,children:"40 items"})]})]})]}),e.jsx(T.Body,{children:e.jsxs("div",{className:"table-responsive-sm",children:[e.jsxs(Ae,{className:"table-striped table-centered mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsxs("th",{children:[e.jsx("input",{type:"checkbox",onChange:ce,checked:l.length===E.length})," "]}),e.jsx("th",{children:"Image"}),e.jsx("th",{children:"Parent Category"}),e.jsx("th",{children:e.jsxs("span",{onClick:he,style:{cursor:"pointer"},children:["SubCategory ",N?"↑":"↓"]})}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:H.length>0?(H||[]).map((t,s)=>{const a=l.includes(t._id);return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:a,onChange:()=>de(t._id)})}),e.jsx("td",{className:"table-user",children:t!=null&&t.image?e.jsx("img",{src:`${c}/uploads/images/${t.image}`,alt:"category",className:"me-2 rounded-circle"}):""}),e.jsx("td",{children:t.parentCategory.name}),e.jsx("td",{children:t.name}),e.jsx("td",{children:t.description}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex",children:[e.jsx(u,{variant:"secondary",disabled:!$,onClick:()=>ge(t),children:e.jsx(Ee,{})}),e.jsx(u,{variant:"danger",className:"ms-2",onClick:()=>pe(t._id.toString()),disabled:!q,children:e.jsx(ve,{})})]})})]},s)}):e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No records found"})})})]}),e.jsx("nav",{className:"d-flex justify-content-end mt-3",children:e.jsxs(y,{className:"pagination-rounded mb-0",children:[e.jsx(y.Prev,{onClick:()=>d>1&&k(d-1)}),Array.from({length:R},(t,s)=>e.jsx(y.Item,{active:s+1===d,onClick:()=>k(s+1),children:s+1},s+1)),e.jsx(y.Next,{onClick:()=>d<R&&k(d+1)})]})})]})}),e.jsxs(b,{show:D,onHide:g,dialogClassName:"modal-dialog-centered",children:[e.jsx(b.Header,{closeButton:!0,children:e.jsx("h4",{className:"modal-title",children:o?"Update Sub-Category":"Add New Sub-Category"})}),e.jsxs(n,{onSubmit:ne(o?je:xe),children:[e.jsxs(b.Body,{children:[e.jsxs(n.Group,{className:"mb-3",children:[e.jsx(n.Label,{children:"Parent Category"}),e.jsxs(n.Select,{...P("parentCategory"),defaultValue:"",children:[e.jsx("option",{value:"",disabled:!0,children:"Select Parent Category"}),_?_.map(t=>e.jsx("option",{value:t._id,children:t.name},t._id)):e.jsx("option",{children:"No Parent Categories Available"})]})]}),e.jsx(n.Group,{className:"mb-3",children:e.jsx(Y,{label:"SubCategory Name",type:"text",name:"name",containerClass:"mb-3",register:P,placeholder:"Enter Sub-Category Name here..",errors:G,control:z})}),e.jsxs(n.Group,{className:"mb-2",children:[e.jsx(n.Label,{children:"Description"}),e.jsx("p",{style:{fontSize:"0.8rem"},className:"mb-2",children:"You may write a description of up to 15 words."}),e.jsx(Y,{type:"textarea",name:"description",containerClass:"mb-3",register:P,placeholder:"Enter Description here..",errors:G,control:z})]}),e.jsxs(n.Group,{className:"mb-2",children:[e.jsx(n.Label,{children:"Image"}),e.jsxs("div",{className:"mb-2",children:[e.jsx("p",{style:{fontSize:"0.8rem"},className:"text-danger mb-0",children:"File Size: Upload images up to 5 MB."}),e.jsx("p",{style:{fontSize:"0.8rem"},className:"text-danger mb-0",children:"Supported Formats: JPEG (.jpg, .jpeg), PNG (.png), GIF(.gif), WebP (.webp), and SVG (.svg)."}),e.jsx("p",{style:{fontSize:"0.8rem"},className:"text-danger mb-0",children:"Upload Limit: Only 1 image can be uploaded."})]}),e.jsx(Pe,{icon:"ri-upload-cloud-2-line",text:"Drop file here or click to upload a product image.",onFileUpload:t=>I(t)}),(o==null?void 0:o.image)&&e.jsxs("div",{className:"mt-3 d-flex flex-column",children:[e.jsx(n.Label,{children:"Current Image"}),e.jsx("img",{src:`${c}/uploads/images/${o.image}`,alt:"Sub-Category",className:"img-thumbnail mb-3",style:{width:"100px",height:"100px"}})]})]})]}),e.jsxs(b.Footer,{children:[e.jsx(u,{variant:"light",onClick:g,children:"Close"}),e.jsx(u,{variant:"soft-success",type:"submit",disabled:o?!$:!U,children:re?o?"Updating...":"Adding...":o?"Update Sub-Category":"Save Sub-Category"})]})]})]})]})]})};export{at as default};