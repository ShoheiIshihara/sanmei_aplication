import{u as w,r as C,j as a,a as s,H as h}from"./app.3efd4b7e.js";import{G as F}from"./GuestLayout.b11a5464.js";import{I as u}from"./InputError.165e2af7.js";import{I as m}from"./InputLabel.2799d607.js";import{P as v}from"./PrimaryButton.30b2d5c6.js";import{T as n}from"./TextInput.36396546.js";function x({token:l,email:i}){const{data:r,setData:p,post:d,processing:c,errors:t,reset:f}=w({token:l,email:i,password:"",password_confirmation:""});C.exports.useEffect(()=>()=>{f("password","password_confirmation")},[]);const o=e=>{p(e.target.name,e.target.value)};return a(F,{children:[s(h,{title:"Reset Password"}),a("form",{onSubmit:e=>{e.preventDefault(),d(route("password.store"))},children:[a("div",{children:[s(m,{forInput:"email",value:"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"}),s(n,{type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:o}),s(u,{message:t.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(m,{forInput:"password",value:"\u30D1\u30B9\u30EF\u30FC\u30C9"}),s(n,{type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,handleChange:o}),s(u,{message:t.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(m,{forInput:"password_confirmation",value:"\u30D1\u30B9\u30EF\u30FC\u30C9\uFF08\u78BA\u8A8D\u7528\uFF09"}),s(n,{type:"password",name:"password_confirmation",value:r.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o}),s(u,{message:t.password_confirmation,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(v,{className:"ml-4",processing:c,children:"\u30D1\u30B9\u30EF\u30FC\u30C9\u518D\u8A2D\u5B9A"})})]})]})}export{x as default};