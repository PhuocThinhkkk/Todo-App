(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{9767:(e,t,s)=>{Promise.resolve().then(s.bind(s,9599))},9599:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>V});var l=s(5155),n=s(5331),a=s(880),r=s(2888),o=s(2734),i=s(4367),c=s(1536),d=s(8422),x=s(2115);function u(e){let{setWhat:t}=e,[s,d]=(0,x.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(h,{isOpen:s,setIsOpen:()=>{d(!s)}}),(0,l.jsxs)("div",{className:"flex flex-col w-36 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-10\n     transform ".concat(s?"translate-x-0":"-translate-x-full"," \n      lg:translate-x-0 lg:static transition duration-700 ease-in-out"),children:[(0,l.jsx)("div",{className:"mt-14"}),(0,l.jsx)(f,{Icon:(0,l.jsx)(c.K9B,{}),onClick:()=>t("User")}),(0,l.jsx)(f,{Icon:(0,l.jsx)(i.pmv,{}),onClick:()=>t("AddTask")}),(0,l.jsx)(f,{Icon:(0,l.jsx)(o.ko0,{}),onClick:()=>t("SuccessTask")}),(0,l.jsx)(f,{Icon:(0,l.jsx)(a.WJv,{})}),(0,l.jsx)(f,{Icon:(0,l.jsx)(r.eHT,{})}),(0,l.jsx)(f,{Icon:(0,l.jsx)(n.mLx,{})})]})]})}let h=e=>{let{isOpen:t,setIsOpen:s}=e;return(0,l.jsx)("div",{onClick:s,className:"lg:hidden flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer\n                hover:bg-green-500 hover:text-gray-800\n                transition duration-500 ease-in-out fixed top-4 left-4 z-30\n                transform ".concat(t?"rotate-90":"rotate-0"," "),children:(0,l.jsx)(d.TF4,{})})},f=e=>{let{Icon:t,onClick:s}=e;return(0,l.jsx)("div",{onClick:s,className:"flex items-center justify-center w-12 h-12 bg-gray-700 rounded-xl mb-4 cursor-pointer   hover:bg-green-500 hover:text-gray-800   transition delay-200 duration-400 ease-in-out",children:t})};var m=s(9904),g=s(6553),j=s(4565),w=s(7058);let p=(0,m.Wp)({apiKey:"AIzaSyAuEvkeGYwotOt4SiAUvrNqt5lqamfo2ZQ",authDomain:"my-todo-app-5aeb6.firebaseapp.com",projectId:"my-todo-app-5aeb6",storageBucket:"my-todo-app-5aeb6.firebasestorage.app",messagingSenderId:"315068838519",appId:"1:315068838519:web:3df50e8cc6bc67a25c8c72",measurementId:"G-LGSSJES0W6"});(0,g.TT)().then(e=>{e&&(0,g.P5)(p)});let b=(0,j.xI)(p),v=new j.HF,k=(0,w.aU)(p);var N=s(5494);let y=new N.A;function A(){let e=y.get("user-info");return console.log(e),(0,l.jsx)("div",{className:"flex justify-center items-center bg-white bg-center w-full h-screen",children:(0,l.jsxs)("div",{className:"flex flex-col  bg-white bg-opacity-50 p-4 rounded-lg shadow-lg    w-full h-5/6",children:[(0,l.jsxs)("span",{className:"text-xl lg:text-2xl text-black font-bold font-sans",children:["Welcome back, ",null==e?void 0:e.displayName]}),(0,l.jsx)("div",{className:"flex w-11/12 h-32 m-4 items-center",children:(0,l.jsx)("span",{className:"text-xl",children:" "})})]})})}var I=s(5565);let S=new N.A;function T(e){let{setWhat:t,setIsSignedIn:s}=e;return(0,l.jsx)("div",{className:"full min-h-screen bg-white text-black flex items-center justify-center p-4 md:p-8",children:(0,l.jsxs)("div",{className:"max-w-6xl  w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-36  ",children:[(0,l.jsxs)("div",{className:"",children:[(0,l.jsx)("h1",{className:"text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6",children:"Manage your tasks with My-todo"}),(0,l.jsx)("p",{className:"text-lg text-gray-700 mb-4",children:"Stay organized and boost your productivity with ease. Manage your tasks, set reminders, and achieve your goals—one step at a time."}),(0,l.jsx)("p",{className:"mb-4 text-xl font-bold",children:" Sign in with Google "}),(0,l.jsx)("div",{className:"flex flex-wrap gap-4",children:(0,l.jsx)("button",{className:"w-32 h-11 rounded-xl font-extrabold duration-300 bg-green-600 cursor-pointer hover:bg-green-700",onClick:()=>D(s),children:"Sign In"})})]}),(0,l.jsx)("div",{className:"w-full md:w-1/2 flex justify-center",children:(0,l.jsx)(I.default,{src:"../img/to-do-list-img.png",alt:"to do list img",width:500,height:500,priority:!0,className:"max-w-full h-full  "})})]})})}let D=async e=>{let t=await (0,j.df)(b,v),s=new Date,l=b.currentUser;if(S.set("auth-token",t.user.stsTokenManager.refreshToken),!l){console.log("No user is signed in.");return}if(l.metadata.creationTime===l.metadata.lastSignInTime)await (0,w.BN)((0,w.H9)(k,"userInfor",t.user.uid),{email:t.user.email,photoURL:t.user.photoURL,displayName:t.user.displayName,uid:t.user.uid,createdAt:s,updatedAt:s}),S.set("user-info",JSON.stringify({email:t.user.email,photoURL:t.user.photoURL,displayName:t.user.displayName,uid:t.user.uid,createdAt:s,updatedAt:s})),console.log("New user just added to database.");else{let e=await (0,w.x7)((0,w.H9)(k,"userInfor",b.currentUser.uid));console.log("infor sigin: ",e.data());let t=e.data();t.taskArr&&delete t.taskArr,S.set("user-info",JSON.stringify(t)),console.log("old user")}e(!0)};var C=s(8144),U=s(6847),H=s(44),_=s(8613),M=s(1455),L=s.n(M);let W=new N.A;function E(e){let{InputRef:t,task:s,setTask:n,A_tasks:a,setA_tasks:r}=e,[o,i]=(0,x.useState)(L()("2024-03-23")),c=(0,x.useRef)(null),d=W.get("user-info"),u=new Date,h=async(e,s)=>{try{let t=new Date(o),l={task:e,description:s.current.value,uid:d.uid,createdAt:u,Deadline:t},n=[];n=a?[...a,l]:[l],await (0,w.mZ)((0,w.H9)(k,"userInfor",d.uid),{taskArr:n}),l.newTask=!0,l.Deadline={seconds:t.getTime()/1e3};let i=[];a?(i=[...a,l].sort((e,t)=>e.Deadline.seconds-t.Deadline.seconds),console.log("pushed successfully")):i=[l],console.log("This is arr tasks",i),r(i)}catch(e){console.log("Error adding doc: ",e),alert("error: "+e.message)}n(""),t.current.value="",console.log("submitted")};return(0,l.jsx)("div",{className:"flex flex-col gap-y-1 fixed inset-0 bg-white/70 backdrop-blur-sm items-center justify-center z-50 text-center w-screen h-screen",children:(0,l.jsxs)("div",{className:"flex flex-col gap-y-4 bg-white p-4 rounded-lg shadow-lg w-3/4 lg:w-1/2 h-2/5 border-2 border-green-500",children:[(0,l.jsx)("p",{className:" text-gray-800 overflow-hidden",children:s}),(0,l.jsx)("input",{type:"text",ref:c,className:" text-gray-800 text-wrap text-left text-xs w-full h-16 px-1 outline-none border-2 border-black-900",placeholder:"description"}),(0,l.jsx)(H.$,{dateAdapter:U.R,children:(0,l.jsx)(C.j,{components:["DatePicker"],children:(0,l.jsx)(_.l,{label:"when this task is due",value:o,onChange:e=>i(e)})})}),(0,l.jsxs)("div",{className:"flex justify-end space-x-4",children:[(0,l.jsx)("button",{onClick:function(){n(""),t.current.value="",console.log("cancelled")},className:"w-20 h-10 bg-red-600 text-white rounded-lg mt-2 text-sm items-end    hover:cursor-pointer hover:bg-red-800",children:"Cancel "}),(0,l.jsx)("button",{onClick:()=>{h(s,c)},className:"w-20 h-10 bg-blue-500 text-white rounded-lg mt-2 text-sm items-end    hover:cursor-pointer hover:bg-blue-800",children:"Add "})]})]})})}var R=s(648),z=s(6280);let O=new N.A;function G(){let[e,t]=(0,x.useState)(""),[s,n]=(0,x.useState)([]);(0,x.useEffect)(()=>{(async()=>{n(await F(r))})()},[]);let a=(0,x.useRef)(null),r=O.get("user-info");return s.length>0&&console.log("this is A_task: ",s),(0,l.jsxs)("div",{className:" w-full h-screen  bg-white ",children:[(0,l.jsxs)("div",{className:" flex justify-center items-center bg-white bg-opacity-50 p-3 rounded-lg shadow-lg w-3/4 h-12   fixed z-0 inset-0 left-1/2 lg:top-10 bottom-20 transform -translate-x-1/2 translate-y-1/2 ",children:[(0,l.jsx)("input",{type:"text",className:"text-sm w-full h-full px-1 outline-none",placeholder:"Add a task",ref:a}),(0,l.jsx)(J,{Icon:(0,l.jsx)(i.pmv,{}),onClick:()=>{t(a.current.value)}})]}),(0,l.jsx)("div",{className:"flex flex-col justify-center items-center w-full h-screen",children:(0,l.jsx)("div",{className:"flex flex-col gap-1 text-slate-950 bg-white bg-opacity-70 w-2/3 h-1/2 fixed top-1/2 left-1/2 z-0    inset-0 rounded-sm -translate-x-1/2 -translate-y-1/4 overflow-y-scroll no-scrollbar ",children:(0,l.jsx)(B,{A_tasks:s,setA_tasks:n,currentUser:r})})}),e?(0,l.jsx)(E,{InputRef:a,task:e,setTask:t,A_tasks:s,setA_tasks:n}):null]})}let F=async e=>(await (0,w.x7)((0,w.H9)(k,"userInfor",e.uid))).data().taskArr.sort((e,t)=>e.Deadline.seconds-t.Deadline.seconds),J=e=>{let{Icon:t,onClick:s}=e;return(0,l.jsx)("div",{onClick:s,className:"flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer bg-green-400 text-white ml-3   hover:bg-green-500 hover:text-gray-800   transition duration-300 ease-in-out",children:t})},Z=async(e,t,s)=>{try{let l=await F(s);l.splice(e,1),t(l);let n=(0,w.H9)(k,"userInfor",s.uid);await (0,w.mZ)(n,{taskArr:l})}catch(e){console.error(e)}},B=e=>{let{A_tasks:t,setA_tasks:s,currentUser:n}=e,a=async e=>{let t=(await (0,w.x7)((0,w.H9)(k,"userInfor",n.uid))).data();console.log("userdb: ",t);let l=t.taskArr.sort((e,t)=>e.Deadline.seconds-t.Deadline.seconds),a=l[e];l.splice(e,1);let r=[];if(null==t?void 0:t.successTaskArr)for(let e=0;e<t.successTaskArr.length;e++)r[e]=t.successTaskArr[e],console.log("hello",t.successTaskArr[e]);r[r.length]=a,console.log("successTask:",r);let o=(0,w.H9)(k,"userInfor",n.uid);await (0,w.mZ)(o,{taskArr:l,successTaskArr:r}),console.log("add task successfully to successTask"),s(l)};return(0,l.jsx)(l.Fragment,{children:null==t?void 0:t.map((e,t)=>{let r=new Date(1e3*e.Deadline.seconds),o="".concat(r.getDate(),"/").concat(r.getMonth()+1),i=new Date,c=!1;return(i.getMonth()>r.getMonth()||i.getMonth()===r.getMonth()&&i.getDate()>=r.getDate())&&(c=!0),(0,l.jsxs)("div",{className:"flex items-center bg-white h-8 text-xs border-t border-y-neutral-500",children:[c?(0,l.jsx)(P,{onClick:()=>a(t)}):(0,l.jsx)("div",{className:"w-8"}),(0,l.jsx)("div",{className:"w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.task}),(0,l.jsx)("div",{className:"hidden lg:block flex-2 m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.description||"no description"}),(0,l.jsx)("div",{className:"flex-1 text-center",children:o||"Loading..."}),(0,l.jsxs)("button",{className:"flex justify-center items-center rounded-lg border-4 w-20 border-red-900 bg-red-600 hover:cursor-pointer",onClick:()=>Z(t,s,n),children:[(0,l.jsx)(R.b6i,{className:"text-2xl text-black rounded-t-full shadow-2xl"}),(0,l.jsx)("span",{className:"text-amber-50 font-medium hover:font-bold text-center",children:"Delete"})]})]},t)})})},P=e=>{let{onClick:t}=e;return(0,l.jsx)("div",{className:"flex justify-center items-center w-8",onClick:t,children:(0,l.jsx)(z.GIU,{className:"text-2xl hover:cursor-pointer hover:text-green-700 "})})},q=new N.A,K=async e=>{let t=(await (0,w.x7)((0,w.H9)(k,"userInfor",e.uid))).data();return(null==t?void 0:t.successTaskArr)?t.successTaskArr:[]},Y=e=>{let{successTasks:t}=e;return(0,l.jsx)("div",{className:"flex-col w-5/6",children:null==t?void 0:t.map((e,t)=>{let s=new Date(1e3*e.Deadline.seconds),n="".concat(s.getDate(),"/").concat(s.getMonth()+1);return(0,l.jsxs)("div",{className:"flex items-center bg-white hover:bg-neutral-100 transition-all duration-300 h-16 text-xs border-t border-y-neutral-500 text-black ",children:[(0,l.jsx)(c.A7C,{className:"text-3xl hover:text-4xl transition-all duration-300 absolute m-2 rounded-full"}),(0,l.jsx)("div",{className:"w-10"}),(0,l.jsxs)("div",{className:"flex-col flex-2",children:[(0,l.jsx)("div",{className:"w-1/3 m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.task}),(0,l.jsx)("div",{className:"hidden lg:block m-3 overflow-hidden overflow-x-hidden text-nowrap",children:e.description||"no description"})]}),(0,l.jsx)("div",{className:"flex-1 text-center",children:n||"Loading..."})]},t)})})},Q=()=>{let[e,t]=(0,x.useState)([]);(0,x.useEffect)(()=>{(async()=>{let e=await K(s);console.log("taskdb :",e),t(e)})()},[]);let s=q.get("user-info");return(0,l.jsxs)("div",{className:"flex-col w-full",children:[(0,l.jsx)("div",{className:"h-16"}),(0,l.jsx)("span",{className:"mx-16 font-bold underline-offset-2 font-sans text-2xl lg:text-4xl text-black",children:"Your activity in 2025 "}),(0,l.jsx)("div",{className:"flex justify-center items-center my-10",children:(0,l.jsx)(Y,{successTasks:e})})]})},$=new N.A;function V(){let[e,t]=(0,x.useState)(!!$.get("auth-token")),[s,n]=(0,x.useState)(!1),[a,r]=(0,x.useState)(!1),[o,i]=(0,x.useState)(!1),[c,d]=(0,x.useState)("Home");console.log(c);let h=["User","AddTask","SuccessTask","Settings","Logout"],f=()=>{n(!1),r(!1),i(!1)};for(let e=0;e<h.length;e++)c!==h[0]||s?c!==h[1]||a?c!==h[2]||o||(f(),i(!0),console.log("success task component is open")):(f(),r(!0),console.log("add task is open")):(f(),n(!0),console.log("User is open"));return e?s?(0,l.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,l.jsx)(u,{setWhat:d}),(0,l.jsx)(A,{})]}):a?(0,l.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,l.jsx)(u,{setWhat:d}),(0,l.jsx)(G,{})]}):o?(0,l.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,l.jsx)(u,{setWhat:d}),(0,l.jsx)(Q,{})]}):(0,l.jsxs)("div",{className:"flex bg-white h-screen  text-green-500 font-bold text-4xl ",children:[(0,l.jsx)(u,{setWhat:d}),(0,l.jsx)(A,{})]}):(0,l.jsx)(T,{setWhat:d,setIsSignedIn:t})}}},e=>{var t=t=>e(e.s=t);e.O(0,[479,613,206,512,777,585,844,711,87,992,895,849,441,517,358],()=>t(9767)),_N_E=e.O()}]);