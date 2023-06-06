import{C as g,u as v,j as a,a as e,L as x}from"./app.830e7626.js";import{I as m}from"./InputError.532675f2.js";import{I as n}from"./InputLabel.ad6594d9.js";import{P as C}from"./PrimaryButton.39ac4ad6.js";import{T as l}from"./TextInput.ca29ae85.js";import{W as y}from"./transition.bef330c6.js";function I({mustVerifyEmail:o,status:c,className:d}){const u=g().props.auth.user,{data:r,setData:i,patch:f,errors:s,processing:h,recentlySuccessful:p}=v({name:u.name,email:u.email});return a("section",{className:d,children:[a("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u60C5\u5831"}),e("p",{className:"mt-1 text-sm text-gray-600",children:"\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u60C5\u5831\u3068\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u66F4\u65B0\u3059\u308B\u3002"})]}),a("form",{onSubmit:t=>{t.preventDefault(),f(route("profile.update"))},className:"mt-6 space-y-6",children:[a("div",{children:[e(n,{for:"name",value:"\u6C0F\u540D"}),e(l,{id:"name",className:"mt-1 block w-full",value:r.name,handleChange:t=>i("name",t.target.value),required:!0,autofocus:!0,autocomplete:"name"}),e(m,{className:"mt-2",message:s.name})]}),a("div",{children:[e(n,{for:"email",value:"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"}),e(l,{id:"email",type:"email",className:"mt-1 block w-full",value:r.email,handleChange:t=>i("email",t.target.value),required:!0,autocomplete:"email"}),e(m,{className:"mt-2",message:s.email})]}),o&&u.email_verified_at===null&&a("div",{children:[a("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",e(x,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),c==="verification-link-sent"&&e("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),a("div",{className:"flex items-center gap-4",children:[e(C,{processing:h,children:"\u66F4\u65B0"}),e(y,{show:p,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:e("p",{className:"text-sm text-gray-600",children:"\u66F4\u65B0\u5B8C\u4E86"})})]})]})]})}export{I as default};
