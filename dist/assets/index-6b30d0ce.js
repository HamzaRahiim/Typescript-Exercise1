import{j as r,L as o}from"./index-3d8791b8.js";import{o as a,c as i,a as m}from"./index.esm-229abc95.js";import{A as n}from"./AuthLayout-6c7a5ff8.js";import{P as l}from"./PageBreadcrumb-9dd34a07.js";import{F as c}from"./FormInput-5189d08c.js";import{V as p}from"./VerticalForm-205d4ba2.js";import"./Table-e312cd55.js";import{p as d}from"./avatar-1-48b80b48.js";import{B as x}from"./Button-21cae2d8.js";import{R as h}from"./Row-10d1c5f5.js";import{C as u}from"./Col-c2024357.js";import"./index.esm-f7d27dc8.js";import"./auth-img-4538a299.js";import"./logo-92e11ba8.js";import"./Card-a8049602.js";import"./createWithBsPrefix-36be1bdf.js";import"./Image-8a789d10.js";import"./index-2400ada3.js";import"./Form-70877923.js";import"./InputGroupContext-c86885e2.js";const f=()=>r.jsx(h,{children:r.jsx(u,{xs:12,className:"text-center",children:r.jsxs("p",{className:"text-dark-emphasis",children:["Back To"," ",r.jsx(o,{to:"/auth/login",className:"text-dark fw-bold ms-1 link-offset-3 text-decoration-underline",children:r.jsx("b",{children:"Log In"})})]})})}),q=()=>{const s=a(i().shape({password:m().required("Please enter Password")})),e=({data:t})=>{console.log(t)};return r.jsxs(r.Fragment,{children:[r.jsx(l,{title:"Lock Screen"}),r.jsx(n,{authTitle:"Hi ! Thomson",helpText:"Enter your password to access the admin.",starterClass:!0,userImage:d,bottomLinks:r.jsx(f,{}),hasThirdPartyLogin:!0,children:r.jsxs(p,{onSubmit:e,resolver:s,children:[r.jsx(c,{label:"Password",type:"password",name:"password",labelContainerClassName:"text-start",placeholder:"Enter your password",containerClass:"mb-3"}),r.jsx("div",{className:"mb-0 text-start",children:r.jsxs(x,{variant:"soft-primary",className:"w-100",type:"submit",children:[r.jsx("i",{className:"ri-login-circle-fill me-1"})," ",r.jsx("span",{className:"fw-bold",children:"Log In"})," "]})})]})})]})};export{q as default};