import{k,c as q,r as u,j as e,l as x,L as D}from"./index-3d8791b8.js";import{P as L}from"./PageBreadcrumb-9dd34a07.js";import{F as n}from"./FormInput-5189d08c.js";import{u as I}from"./index.esm-f7d27dc8.js";import"./Table-e312cd55.js";import{c as V,a as l,o as Y}from"./index.esm-229abc95.js";import"./httpClient-96fbf256.js";import{S as _}from"./sweetalert2.esm.all-dd0c4ce7.js";import{C as f}from"./Card-a8049602.js";import{B as S}from"./Button-21cae2d8.js";import{F as z}from"./Form-70877923.js";import{R as b}from"./Row-10d1c5f5.js";import{C as i}from"./Col-c2024357.js";import"./createWithBsPrefix-36be1bdf.js";import"./InputGroupContext-c86885e2.js";import"./index-2400ada3.js";const G=V().shape({username:l().required("Please enter Username"),email:l().email("Please enter a valid email").required("Please enter Email"),password:l().min(8,"Password must be at least 8 characters").required("Please enter Password"),phone_number:l().matches(/^03\d{2}\d{7}$/,"Please enter a valid mobile number e.g 03xx xxxxxxx").required("Please enter Phone Number"),role_name:l().required("Please select a Role")}),ie=()=>{var U,E;const{id:p}=k(),{user:N,isSuperUser:j,permissions:g}=q(),{token:m}=N,h="https://backendapi.chase.boundlesstechnologies.net",v=j||((U=g.Users)==null?void 0:U.Update),C=j||((E=g.Users)==null?void 0:E.View),[R,$]=u.useState([]),[F,w]=u.useState(!1),[y,P]=u.useState(!1),A=I({resolver:Y(G),defaultValues:{username:"",email:"",phone_number:"",role_name:"",password:""}}),{handleSubmit:B,register:a,setValue:t,formState:{errors:o}}=A;u.useEffect(()=>{(async()=>{w(!0);try{const c=await(await fetch(`${h}/api/users/role/`,{method:"GET",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"}})).json();$(c);const d=await(await fetch(`${h}/api/users/${p}`,{method:"GET",headers:{Authorization:`Bearer ${m}`}})).json();t("username",d.username),t("email",d.email),t("phone_number",d.phone_number),t("role_name",d.role._id)}catch(r){console.error("Error fetching data:",r)}finally{w(!1)}})()},[p,m,t]);const T=async s=>{try{P(!0),console.log("data direct  from form ",s);const r={username:s.username,email:s.email,password:s.password,phone_number:s.phone_number,userRoleId:s.role_name};console.log("data before sending to api ",r);const c=await fetch(`${h}/api/users/${p}`,{method:"PUT",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify(r)});if(!c.ok)throw new Error("Failed to update user.");console.log("User updated successfully:",await c.json()),_.fire({title:"Success!",text:"User updated successfully",icon:"success",confirmButtonText:"OK",timer:1500})}catch(r){console.error("Error updating user:",r),_.fire({title:"Error!",text:"Failed to update user",icon:"error",timer:1500})}finally{P(!1)}};return F?e.jsxs("div",{className:"d-flex justify-content-center align-items-center",style:{height:"100vh"},children:[e.jsx(x,{animation:"grow",style:{margin:"0 5px"}}),e.jsx(x,{animation:"grow",style:{margin:"0 5px"}}),e.jsx(x,{animation:"grow",style:{margin:"0 5px"}})]}):e.jsxs(e.Fragment,{children:[e.jsx(L,{title:"Update User Info",subName:"User"}),e.jsxs(f,{children:[e.jsx(f.Header,{children:e.jsxs("div",{className:"d-flex flex-column flex-lg-row justify-content-between align-items-lg-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"header-title",children:"User Account"}),e.jsx("p",{className:"text-muted mb-0",children:"Fill in the information below to add a new user account"})]}),e.jsx("div",{className:"mt-3 mt-lg-0",children:e.jsx(S,{style:{border:"none"},variant:"none",disabled:!C,children:e.jsx(D,{to:"/user/user-all",className:"btn btn-danger",children:"See All Users"})})})]})}),e.jsx(z,{onSubmit:B(T),children:e.jsxs(f.Body,{children:[e.jsxs(b,{children:[e.jsx(i,{lg:6,children:e.jsx(n,{label:"Name",type:"text",name:"username",placeholder:"Enter Your Name",containerClass:"mb-3",register:a,errors:o})}),e.jsx(i,{lg:6,children:e.jsx(n,{label:"Email",type:"email",name:"email",placeholder:"Enter Your Email",register:a,containerClass:"mb-3",errors:o})})]}),e.jsxs(b,{children:[e.jsx(i,{lg:6,children:e.jsx(n,{label:"Phone Number",type:"number",name:"phone_number",placeholder:"Enter Your Phone Number",register:a,containerClass:"mb-3",errors:o})}),e.jsx(i,{lg:6,children:e.jsxs(n,{label:"Role",name:"role_name",type:"select",register:a,containerClass:"mb-3",errors:o,children:[e.jsx("option",{value:"",children:"Select a Role"}),R.map(s=>e.jsx("option",{value:s._id,children:s.role_name},s._id))]})})]}),e.jsx(b,{children:e.jsx(i,{lg:6,children:e.jsx(n,{label:"Password",type:"password",name:"password",placeholder:"Enter Your Password",register:a,containerClass:"mb-3",errors:o})})}),e.jsx(S,{type:"submit",variant:"success",disabled:y||!v,children:y?"Updating..":"Update User"})]})})]})]})};export{ie as default};