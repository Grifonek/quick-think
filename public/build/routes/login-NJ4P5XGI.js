import{a as s,b as k}from"/build/_shared/chunk-XCJPTF5P.js";import{d as f,n as D}from"/build/_shared/chunk-DLPA6FWQ.js";import{a as F,g as i,l as g,p as n}from"/build/_shared/chunk-CU65WYAZ.js";import{b as N,c as e}from"/build/_shared/chunk-Q3IECNXJ.js";var u=N((C,p)=>{p.exports={}});var E=e(u(),1);var a=e(F(),1);var t=e(n(),1);function A({actionData:o}){let[m]=(0,a.useState)(o?.errors||{}),[l]=(0,a.useState)(o?.error||""),[d,b]=(0,a.useState)({email:o?.fields?.email||"",password:o?.fields?.password||""});function c(r,y){b(L=>({...L,[y]:r.target.value}))}return(0,t.jsx)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700",children:(0,t.jsxs)("div",{className:"w-full max-w-md bg-white shadow-2xl rounded-2xl p-8",children:[(0,t.jsxs)("h1",{className:"text-3xl font-extrabold text-center text-gray-800 mb-8",children:["Login to start earning"," ",(0,t.jsx)("span",{className:"text-indigo-500",children:"Thinkies!"})]}),(0,t.jsxs)("form",{method:"POST",className:"space-y-6",children:[l&&(0,t.jsx)("div",{className:"text-sm font-semibold text-center text-red-500",children:l}),(0,t.jsx)(s,{htmlFor:"email",label:"Email",value:d.email,onChange:r=>c(r,"email"),error:m?.email}),(0,t.jsx)(s,{htmlFor:"password",label:"Password",type:"password",value:d.password,onChange:r=>c(r,"password"),error:m?.password}),(0,t.jsx)("button",{type:"submit",name:"login",className:"w-full px-5 py-3 bg-indigo-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition focus:outline-none focus:ring-4 focus:ring-indigo-400",children:"Login"})]}),(0,t.jsxs)("p",{className:"text-center mt-6 text-sm text-gray-600",children:["Don't have an account?"," ",(0,t.jsx)(i,{to:"/signup",className:"text-indigo-500 font-medium hover:underline",children:"Sign Up"})]}),(0,t.jsxs)("p",{className:"flex items-center justify-center space-x-2 mt-2",children:[(0,t.jsx)(f,{className:"h-5 w-5 text-indigo-500 hover:text-indigo-700 transition-transform transform hover:-translate-x-1"}),(0,t.jsx)(i,{to:"/",className:"text-indigo-500 font-medium hover:underline hover:text-indigo-700 transition duration-200",children:"Quick Think"})]})]})})}var x=A;var w=e(D(),1),h=e(k(),1),v=e(n(),1);function I(){let o=g();return(0,v.jsx)(x,{actionData:o})}var S=I;export{S as default};
