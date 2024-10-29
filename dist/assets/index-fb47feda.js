import{r as u,g as p,c as x,j as e,L as g}from"./index-3d8791b8.js";import{A as h}from"./AuthLayout-6c7a5ff8.js";import{o as f,c as b,a as n}from"./index.esm-229abc95.js";import{H as s}from"./httpClient-96fbf256.js";import{P as j}from"./PageBreadcrumb-9dd34a07.js";import{F as a}from"./FormInput-5189d08c.js";import{V as y}from"./VerticalForm-205d4ba2.js";import"./Table-e312cd55.js";import{B as w}from"./Button-21cae2d8.js";import{R as P}from"./Row-10d1c5f5.js";import{C as v}from"./Col-c2024357.js";import"./auth-img-4538a299.js";import"./logo-92e11ba8.js";import"./Card-a8049602.js";import"./createWithBsPrefix-36be1bdf.js";import"./Image-8a789d10.js";import"./index-2400ada3.js";import"./index.esm-f7d27dc8.js";import"./Form-70877923.js";import"./InputGroupContext-c86885e2.js";function E(){return{login:r=>s.post("/login",r),logout(){return s.post("/logout",{})},register:r=>s.post("/register",r),forgetPassword:r=>s.post("/forget-password",r)}}const k=E();function C(){const[r,t]=u.useState(!1),o=p(),{isAuthenticated:l}=x();return{loading:r,register:async({name:m,email:c,password1:d})=>{t(!0);try{const{data:i}=await k.register({name:m,email:c,password:d});i!=null&&i.id&&o("/account/login")}finally{t(!1)}},isAuthenticated:l}}const L=()=>e.jsx(P,{children:e.jsx(v,{xs:12,className:"text-center",children:e.jsxs("p",{className:"text-dark-emphasis",children:["Already have account?"," ",e.jsx(g,{to:"/auth/login",className:"text-dark fw-bold ms-1 link-offset-3 text-decoration-underline",children:e.jsx("b",{children:"Log In"})})]})})}),W=()=>{const{loading:r,register:t}=C(),o=f(b().shape({fullname:n().required("Please enter Fullname"),email:n().required("Please enter Email").email("Please enter valid Email"),password:n().required("Please enter Password")}));return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"Register"}),e.jsx(h,{authTitle:"Free Sign Up",helpText:"Enter your email address and password to access account.",bottomLinks:e.jsx(L,{}),hasThirdPartyLogin:!0,children:e.jsxs(y,{onSubmit:t,resolver:o,children:[e.jsx(a,{label:"Full Name",type:"text",name:"fullname",placeholder:"Enter your name",containerClass:"mb-3",required:!0}),e.jsx(a,{label:"Email address",type:"text",name:"email",placeholder:"Enter your email",containerClass:"mb-3",required:!0}),e.jsx(a,{label:"Password",type:"password",name:"password",placeholder:"Enter your password",containerClass:"mb-3"}),e.jsx(a,{isTerms:!0,type:"checkbox",name:"checkbox",containerClass:"mb-3"}),e.jsx("div",{className:"mb-0 d-grid text-center",children:e.jsx(w,{variant:"primary",disabled:r,className:"fw-semibold",type:"submit",children:"Sign Up"})})]})})]})};export{W as default};