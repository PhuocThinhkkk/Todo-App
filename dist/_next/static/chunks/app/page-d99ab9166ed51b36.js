(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{91501:(e,t,s)=>{Promise.resolve().then(s.bind(s,19913))},19913:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>O});var n=s(95155),l=s(5331),r=s(880),a=s(92888),o=s(22734),i=s(34367),d=s(11536),c=s(8422),x=s(12115);function u(e){let{setWhat:t}=e,[s,c]=(0,x.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{isOpen:s,setIsOpen:()=>{c(!s)}}),(0,n.jsxs)("div",{className:"flex flex-col w-36 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-10\n     transform ".concat(s?"translate-x-0":"-translate-x-full"," \n      lg:translate-x-0 lg:static transition duration-700 ease-in-out"),children:[(0,n.jsx)("div",{className:"mt-14"}),(0,n.jsx)(h,{Icon:(0,n.jsx)(d.K9B,{}),onClick:()=>{t("User")}}),(0,n.jsx)(h,{Icon:(0,n.jsx)(i.pmv,{}),onClick:()=>{t("AddTask")}}),(0,n.jsx)(h,{Icon:(0,n.jsx)(o.ko0,{})}),(0,n.jsx)(h,{Icon:(0,n.jsx)(r.WJv,{})}),(0,n.jsx)(h,{Icon:(0,n.jsx)(a.eHT,{})}),(0,n.jsx)(h,{Icon:(0,n.jsx)(l.mLx,{})})]})]})}let g=e=>{let{isOpen:t,setIsOpen:s}=e;return(0,n.jsx)("div",{onClick:s,className:"lg:hidden flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer\n                hover:bg-green-500 hover:text-gray-800\n                transition duration-500 ease-in-out fixed top-4 left-4 z-30\n                transform ".concat(t?"rotate-90":"rotate-0"," "),children:(0,n.jsx)(c.TF4,{})})},h=e=>{let{Icon:t,onClick:s}=e;return(0,n.jsx)("div",{onClick:s,className:"flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer   hover:bg-green-500 hover:text-gray-800   transition delay-200 duration-400 ease-in-out",children:t})},f={src:"/Todo-App/_next/static/media/User.23ca3d6d.png"};var m=s(49904),p=s(76553),b=s(14565),j=s(27058);let w=(0,m.Wp)({apiKey:"AIzaSyAuEvkeGYwotOt4SiAUvrNqt5lqamfo2ZQ",authDomain:"my-todo-app-5aeb6.firebaseapp.com",projectId:"my-todo-app-5aeb6",storageBucket:"my-todo-app-5aeb6.firebasestorage.app",messagingSenderId:"315068838519",appId:"1:315068838519:web:3df50e8cc6bc67a25c8c72",measurementId:"G-LGSSJES0W6"});(0,p.TT)().then(e=>{e&&(0,p.P5)(w)});let v=(0,b.xI)(w),y=new b.HF,N=(0,j.aU)(w);var k=s(5494);let A=new k.A;function I(){let e=A.get("user-info");return console.log(e),(0,n.jsx)("div",{className:"flex justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen",style:{backgroundImage:"url(".concat(f.src,")")},children:(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center bg-white bg-opacity-50 p-4 rounded-lg shadow-lg    w-3/4 h-3/4",children:[(0,n.jsxs)("div",{className:"flex w-full h-32 bg-gray-300 m-4 items-center",children:[(0,n.jsx)("div",{className:"w-24 h-24 bg-gray-400 rounded-full m-4",style:{backgroundImage:"url(".concat(null==e?void 0:e.photoURL,")")}}),(0,n.jsx)("div",{className:"flex-1 text-2xl font-bold text-sky-950",children:(null==e?void 0:e.displayName)||"Guest"})]}),(0,n.jsx)("div",{className:"flex-1 text-2xl font-bold",children:"This is details"})]})})}var S=s(59506);let T=new k.A;function U(e){let{setWhat:t,setIsSignedIn:s}=e;return(0,n.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,n.jsx)(u,{setWhat:t}),(0,n.jsx)(I,{}),(0,n.jsx)("div",{className:"flex flex-col fixed inset-0 bg-white/70 backdrop-blur-sm items-center justify-center z-50 text-center",children:(0,n.jsxs)("div",{className:"bg-white p-4 rounded-lg shadow-lg",children:[(0,n.jsx)("p",{className:"text-gray-500",children:"You need to sign in to continue"}),(0,n.jsxs)("div",{className:"flex items-center justify-center space-x-4 m-10",children:[(0,n.jsx)("span",{className:"text-gray-500 text-4xl font-bold text-center",children:"Sign in with Google"}),(0,n.jsx)(S.F4b,{className:"text-6xl"})]}),(0,n.jsx)("button",{onClick:()=>D(s),className:"bg-green-500 text-white px-4 py-2 rounded-lg   hover:bg-green-600 transition-colors   duration-300 ease-linear",children:"Sign in"})]})})]})}let D=async e=>{let t=await (0,b.df)(v,y),s=new Date,n=v.currentUser;if(T.set("auth-token",t.user.stsTokenManager.refreshToken),!n){console.log("No user is signed in.");return}if(n.metadata.creationTime===n.metadata.lastSignInTime)await (0,j.BN)((0,j.H9)(N,"userInfor",t.user.uid),{email:t.user.email,photoURL:t.user.photoURL,displayName:t.user.displayName,uid:t.user.uid,createdAt:s,updatedAt:s}),T.set("user-info",JSON.stringify({email:t.user.email,photoURL:t.user.photoURL,displayName:t.user.displayName,uid:t.user.uid,createdAt:s,updatedAt:s})),console.log("New user just added to database.");else{let e=await (0,j.x7)((0,j.H9)(N,"userInfor",v.currentUser.uid));console.log("infor sigin: ",e.data());let t=e.data();t.taskArr&&delete t.taskArr,T.set("user-info",JSON.stringify(t)),console.log("old user")}e(!0)};var C=s(40842),L=s.n(C);s(35279);let R=new k.A;function _(e){let{InputRef:t,task:s,setTask:l,A_tasks:r,setA_tasks:a}=e,o=(0,x.useRef)(null),i=new Date,d=R.get("user-info"),c=new Date,u=async(e,s)=>{try{let t={task:e,description:s.current.value,uid:d.uid,createdAt:c,Deadline:i},n=[];n=r?[...r,t]:[t],await (0,j.BN)((0,j.H9)(N,"userInfor",d.uid),{email:d.email,photoURL:d.photoURL,displayName:d.displayName,uid:d.uid,createdAt:d.createdAt,updatedAt:d.updatedAt,taskArr:n}),t.newTask=!0,t.Deadline={seconds:i.getTime()/1e3};let l=[];r?(l=[...r,t].sort((e,t)=>e.Deadline.seconds-t.Deadline.seconds),console.log("pushed successfully")):l=[t],console.log("This is arr tasks",l),a(l)}catch(e){console.log("Error adding doc: ",e),alert("error: "+e.message)}l(""),t.current.value="",console.log("submitted")};return(0,n.jsx)("div",{className:"flex flex-col fixed inset-0 bg-white/70 backdrop-blur-sm items-center justify-center z-50 text-center w-screen h-screen",children:(0,n.jsxs)("div",{className:"flex flex-col bg-white p-4 rounded-lg shadow-lg w-1/2 h-2/5 border-2 border-green-500",children:[(0,n.jsx)("p",{className:" text-gray-800 overflow-hidden",children:s}),(0,n.jsx)("input",{type:"text",ref:o,className:" text-gray-800 text-wrap text-left text-xs w-full h-16 px-1 outline-none border-2 border-black-900",placeholder:"description"}),(0,n.jsx)(L(),{selected:i,onChange:e=>setSDate(e),className:"block w-48 text-gray-800 border-2 border-black-900 "}),(0,n.jsxs)("div",{className:"flex justify-end space-x-4",children:[(0,n.jsx)("button",{onClick:function(){l(""),t.current.value="",console.log("cancelled")},className:"w-20 h-10 bg-red-600 text-white rounded-lg mt-2 text-sm items-end ",children:"Cancel "}),(0,n.jsx)("button",{onClick:()=>{u(s,o)},className:"w-20 h-10 bg-blue-500 text-white rounded-lg mt-2 text-sm items-end ",children:"Add "})]})]})})}let W=new k.A;function z(){let[e,t]=(0,x.useState)(""),[s,l]=(0,x.useState)([]);(0,x.useEffect)(()=>{o()},[]);let r=(0,x.useRef)(null),a=W.get("user-info");s.length>0&&console.log("this is A_task: ",s);let o=async()=>{let e=(await (0,j.x7)((0,j.H9)(N,"userInfor",a.uid))).data().taskArr.sort((e,t)=>e.Deadline.seconds-t.Deadline.seconds);l(e),console.log("get db",e)};return(0,n.jsxs)("div",{className:"bg-cover bg-center bg-no-repeat w-full h-screen bg-gray-300",children:[(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen   ",children:[(0,n.jsxs)("div",{className:"flex justify-center items-center bg-white bg-opacity-50 p-3 rounded-lg shadow-lg w-3/4 h-12   fixed z-0 inset-0 left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 ",children:[(0,n.jsx)("input",{type:"text",className:"text-sm w-full h-full px-1 outline-none",placeholder:"Add a task",ref:r}),(0,n.jsx)(E,{Icon:(0,n.jsx)(i.pmv,{}),onClick:()=>{t(r.current.value)}})]}),(0,n.jsx)("div",{className:"flex flex-col gap-1 text-slate-950 bg-white bg-opacity-70 w-2/3 h-1/2 fixed top-1/2 left-1/2 z-0    inset-0 rounded-sm -translate-x-1/2 -translate-y-1/4 overflow-y-scroll no-scrollbar ",children:null==s?void 0:s.map((e,t)=>{let s=new Date(1e3*e.Deadline.seconds),l=s.getDate(),r=s.getMonth()+1,a=String(l)+"/"+String(r);return(0,n.jsxs)("div",{className:"flex items-center justify-between bg-white h-8 text-xs ",children:[(0,n.jsx)("div",{className:"w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.task}),(0,n.jsx)("div",{className:"m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.description||"no description"}),(0,n.jsx)("div",{className:"w-14 text-center",children:a||"Loading..."})]},t)})})]}),e?(0,n.jsx)(_,{InputRef:r,task:e,setTask:t,A_tasks:s,setA_tasks:l}):null]})}let E=e=>{let{Icon:t,onClick:s}=e;return(0,n.jsx)("div",{onClick:s,className:"flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer bg-green-400 text-white ml-3   hover:bg-green-500 hover:text-gray-800   transition duration-300 ease-in-out",children:t})},H=new k.A;function O(){let[e,t]=(0,x.useState)(!!H.get("auth-token")),[s,l]=(0,x.useState)(!1),[r,a]=(0,x.useState)(!1),[o,i]=(0,x.useState)("Home");console.log(o);let d=["User","AddTask","Settings","Logout"],c=()=>{l(!1),a(!1)};for(let e=0;e<d.length;e++)o!==d[0]||s?o!==d[1]||r||(c(),a(!0),console.log("add task is open")):(c(),l(!0),console.log("User is open"));return e?s?(0,n.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,n.jsx)(u,{setWhat:i}),(0,n.jsx)(I,{})]}):r?(0,n.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,n.jsx)(u,{setWhat:i}),(0,n.jsx)(z,{})]}):(0,n.jsx)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:(0,n.jsx)(u,{setWhat:i})}):(0,n.jsx)(U,{setWhat:i,setIsSignedIn:t})}}},e=>{var t=t=>e(e.s=t);e.O(0,[302,613,206,777,585,844,753,711,87,915,992,895,521,441,517,358],()=>t(91501)),_N_E=e.O()}]);