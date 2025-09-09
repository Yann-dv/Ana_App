(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{2898:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var o=r(2265),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),s=(e,t)=>{let r=(0,o.forwardRef)(({color:r="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:l,className:d="",children:c,...u},m)=>(0,o.createElement)("svg",{ref:m,...i,width:s,height:s,stroke:r,strokeWidth:l?24*Number(n)/Number(s):n,className:["lucide",`lucide-${a(e)}`,d].join(" "),...u},[...t.map(([e,t])=>(0,o.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return r.displayName=`${e}`,r}},5817:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r(2898).Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]])},2549:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r(2898).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},9887:function(e,t,r){Promise.resolve().then(r.bind(r,5925)),Promise.resolve().then(r.t.bind(r,3385,23)),Promise.resolve().then(r.t.bind(r,9766,23)),Promise.resolve().then(r.t.bind(r,6892,23)),Promise.resolve().then(r.bind(r,6364)),Promise.resolve().then(r.bind(r,3779)),Promise.resolve().then(r.bind(r,4895)),Promise.resolve().then(r.bind(r,1638)),Promise.resolve().then(r.bind(r,5409))},6364:function(e,t,r){"use strict";let o;r.r(t),r.d(t,{default:function(){return g}});var i=r(7437),a=r(2265);let s=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})})},n=()=>window.matchMedia("(display-mode: standalone)").matches||!0===window.navigator.standalone,l=()=>{window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),o=e})},d=async()=>{if(o){o.prompt();let{outcome:e}=await o.userChoice;return o=null,"accepted"===e}return!1},c=(e,t)=>(window.addEventListener("online",e),window.addEventListener("offline",t),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",t)});var u=r(5925),m=r(5817),p=r(2549);function f(){let[e,t]=(0,a.useState)(!1),[r,o]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e="true"===localStorage.getItem("pwa-install-dismissed");if(!n()&&!e){let e=setTimeout(()=>{t(!0)},3e3);return()=>clearTimeout(e)}},[]);let s=async()=>{await d()&&t(!1)};return!e||r?null:(0,i.jsx)("div",{className:"fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-lg shadow-lg",children:(0,i.jsxs)("div",{className:"flex items-center justify-between",children:[(0,i.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,i.jsx)("div",{className:"w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center",children:(0,i.jsx)(m.Z,{className:"w-5 h-5"})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"font-semibold text-sm",children:"Install Ana Fitness"}),(0,i.jsx)("p",{className:"text-xs opacity-90",children:"Get the full app experience with offline access"})]})]}),(0,i.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,i.jsx)("button",{onClick:s,className:"bg-white text-primary-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors",children:"Install"}),(0,i.jsx)("button",{onClick:()=>{t(!1),o(!0),localStorage.setItem("pwa-install-dismissed","true")},className:"p-1 hover:bg-white/20 rounded transition-colors",children:(0,i.jsx)(p.Z,{className:"w-4 h-4"})})]})]})})}function g(e){let{children:t}=e,[r,o]=(0,a.useState)(!0),[n,d]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{s(),l();let e=c(()=>{o(!0),u.toast.success("Connection restored!")},()=>{o(!1),u.toast.error("You are offline. Some features may be limited.")});return"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("controllerchange",()=>{d(!0),u.toast.success("App updated! Refresh to see changes.",{duration:5e3})}),o(navigator.onLine),e},[]),(0,i.jsxs)(i.Fragment,{children:[t,(0,i.jsx)(f,{}),!r&&(0,i.jsx)("div",{className:"fixed bottom-4 left-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg text-center",children:(0,i.jsx)("span",{className:"text-sm font-medium",children:"You're offline. Some features may be limited."})}),n&&(0,i.jsxs)("div",{className:"fixed bottom-4 left-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-center",children:[(0,i.jsx)("span",{className:"text-sm font-medium",children:"App update available! "}),(0,i.jsx)("button",{onClick:()=>window.location.reload(),className:"underline font-semibold ml-1",children:"Refresh now"})]})]})}},3779:function(e,t,r){"use strict";r.r(t),r.d(t,{AuthProvider:function(){return s},useAuth:function(){return n}});var o=r(7437),i=r(2265);let a=(0,i.createContext)(void 0);function s(e){let{children:t}=e,[r,s]=(0,i.useState)(null),[n,l]=(0,i.useState)(!0);(0,i.useEffect)(()=>{d()},[]);let d=async()=>{try{let e=localStorage.getItem("auth_token");if(e){if(e.startsWith("demo_token_")){let e={id:"1",name:"Demo User",email:"demo@example.com",subscription:"free",createdAt:new Date().toISOString()};s(e)}else localStorage.removeItem("auth_token")}}catch(e){console.error("Auth check failed:",e)}finally{l(!1)}},c=async(e,t)=>{try{if(!e||!t)return{success:!1,error:"Please enter email and password"};{let t={id:"1",name:"Demo User",email:e,subscription:"free",createdAt:new Date().toISOString()},r="demo_token_"+Date.now();return localStorage.setItem("auth_token",r),s(t),{success:!0}}}catch(e){return{success:!1,error:"Login failed"}}},u=async(e,t,r)=>{try{if(!e||!t||!r)return{success:!1,error:"Please fill in all fields"};{let r={id:"1",name:e,email:t,subscription:"free",createdAt:new Date().toISOString()},o="demo_token_"+Date.now();return localStorage.setItem("auth_token",o),s(r),{success:!0}}}catch(e){return{success:!1,error:"Registration failed"}}};return(0,o.jsx)(a.Provider,{value:{user:r,loading:n,login:c,register:u,logout:()=>{localStorage.removeItem("auth_token"),s(null)},updateSubscription:e=>{r&&s({...r,subscription:e})}},children:t})}function n(){let e=(0,i.useContext)(a);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},4895:function(e,t,r){"use strict";r.r(t),r.d(t,{ProgressProvider:function(){return n},useProgress:function(){return l}});var o=r(7437),i=r(2265);let a=[{id:"first_video",title:"First Steps",description:"Complete your first workout video",icon:"\uD83C\uDFAF",category:"milestone",requirement:{type:"videos_completed",value:1},points:50,isUnlocked:!1},{id:"five_videos",title:"Getting Started",description:"Complete 5 workout videos",icon:"\uD83D\uDD25",category:"workout",requirement:{type:"videos_completed",value:5},points:100,isUnlocked:!1},{id:"ten_videos",title:"Dedicated Learner",description:"Complete 10 workout videos",icon:"\uD83D\uDCAA",category:"workout",requirement:{type:"videos_completed",value:10},points:200,isUnlocked:!1},{id:"first_hour",title:"Time Keeper",description:"Watch 1 hour of content",icon:"⏰",category:"time",requirement:{type:"total_time",value:3600},points:75,isUnlocked:!1},{id:"five_hours",title:"Committed Student",description:"Watch 5 hours of content",icon:"\uD83D\uDCDA",category:"time",requirement:{type:"total_time",value:18e3},points:250,isUnlocked:!1},{id:"three_day_streak",title:"Consistency",description:"Maintain a 3-day workout streak",icon:"\uD83D\uDD25",category:"streak",requirement:{type:"streak_days",value:3},points:150,isUnlocked:!1},{id:"week_streak",title:"Weekly Warrior",description:"Maintain a 7-day workout streak",icon:"⚡",category:"streak",requirement:{type:"streak_days",value:7},points:300,isUnlocked:!1},{id:"first_program",title:"Program Pioneer",description:"Complete your first program",icon:"\uD83C\uDFC6",category:"milestone",requirement:{type:"programs_completed",value:1},points:500,isUnlocked:!1}],s=(0,i.createContext)(void 0),n=e=>{let{children:t}=e,[r,n]=(0,i.useState)({totalPoints:0,level:1,experiencePoints:0,experienceToNextLevel:100,totalVideosCompleted:0,totalWatchTime:0,currentStreak:0,longestStreak:0,programsCompleted:0,weeklyGoal:{target:150,current:0,weekStart:new Date},monthlyStats:{videosCompleted:0,timeWatched:0,programsStarted:0,month:new Date().getMonth(),year:new Date().getFullYear()}}),[l,d]=(0,i.useState)(a),[c,u]=(0,i.useState)([]),[m,p]=(0,i.useState)([]);(0,i.useEffect)(()=>{let e=localStorage.getItem("userProgress");if(e)try{let t=JSON.parse(e);n({...t,lastActivityDate:t.lastActivityDate?new Date(t.lastActivityDate):void 0,weeklyGoal:{...t.weeklyGoal,weekStart:new Date(t.weeklyGoal.weekStart)}})}catch(e){console.error("Failed to load user progress:",e)}let t=localStorage.getItem("achievements");if(t)try{let e=JSON.parse(t);d(e.map(e=>({...e,unlockedAt:e.unlockedAt?new Date(e.unlockedAt):void 0})))}catch(e){console.error("Failed to load achievements:",e)}let r=localStorage.getItem("dailyActivities");if(r)try{u(JSON.parse(r))}catch(e){console.error("Failed to load daily activities:",e)}let o=localStorage.getItem("pointsHistory");if(o)try{p(JSON.parse(o))}catch(e){console.error("Failed to load points history:",e)}},[]),(0,i.useEffect)(()=>{localStorage.setItem("userProgress",JSON.stringify(r))},[r]),(0,i.useEffect)(()=>{localStorage.setItem("achievements",JSON.stringify(l))},[l]),(0,i.useEffect)(()=>{localStorage.setItem("dailyActivities",JSON.stringify(c))},[c]),(0,i.useEffect)(()=>{localStorage.setItem("pointsHistory",JSON.stringify(m))},[m]);let f=()=>{let e=new Date().toISOString().split("T")[0];return c.find(t=>t.date===e)||{date:e,videosCompleted:0,timeWatched:0,programsStarted:0,points:0}},g=()=>{let e=[...c].sort((e,t)=>t.date.localeCompare(e.date)),t=0,r=new Date;for(let o of e){let e=new Date(o.date);if(Math.floor((r.getTime()-e.getTime())/864e5)===t&&o.videosCompleted>0)t++,r=e;else break}return t},h=(e,t)=>{n(t=>({...t,totalPoints:t.totalPoints+e,experiencePoints:t.experiencePoints+e})),p(r=>[...r,{date:new Date().toISOString(),points:e,reason:t}])},v=l.filter(e=>e.isUnlocked);return(0,o.jsx)(s.Provider,{value:{userProgress:r,updateProgress:e=>{let t=new Date().toISOString().split("T")[0],r={...f(),...e,date:t};u(e=>[...e.filter(e=>e.date!==t),r]),n(t=>{let r={...t};e.videosCompleted&&(r.totalVideosCompleted+=e.videosCompleted,r.monthlyStats.videosCompleted+=e.videosCompleted),e.timeWatched&&(r.totalWatchTime+=e.timeWatched,r.monthlyStats.timeWatched+=e.timeWatched,r.weeklyGoal.current+=Math.floor(e.timeWatched/60)),e.programsStarted&&(r.monthlyStats.programsStarted+=e.programsStarted),r.lastActivityDate=new Date,r.currentStreak=g();let o=r.experiencePoints+(e.points||0),i=Math.floor(o/100)+1;return r.experiencePoints=o,r.level=i,r.experienceToNextLevel=100*i-o,r})},achievements:l,unlockedAchievements:v,checkAndUnlockAchievements:()=>{let e=[];return d(t=>t.map(t=>{if(t.isUnlocked)return t;let o=!1;switch(t.requirement.type){case"videos_completed":o=r.totalVideosCompleted>=t.requirement.value;break;case"total_time":o=r.totalWatchTime>=t.requirement.value;break;case"streak_days":o=r.currentStreak>=t.requirement.value;break;case"programs_completed":o=r.programsCompleted>=t.requirement.value}if(o){let r={...t,isUnlocked:!0,unlockedAt:new Date};return e.push(r),h(t.points,"Achievement: ".concat(t.title)),r}return t})),e},dailyActivities:c,getTodayActivity:f,getWeeklyActivity:()=>{let e=new Date;return e.setDate(e.getDate()-e.getDay()),c.filter(t=>new Date(t.date)>=e)},getMonthlyActivity:()=>{let e=new Date;return e.setDate(1),c.filter(t=>new Date(t.date)>=e)},updateWeeklyGoal:e=>{n(t=>({...t,weeklyGoal:{...t.weeklyGoal,target:e}}))},calculateStreak:g,getProgressStats:()=>{let e=r.totalVideosCompleted,t=e>0?r.totalWatchTime/e:0;return{totalWorkouts:e,averageSessionTime:t,favoriteCategory:"Yoga",improvementRate:15}},addPoints:h,getPointsHistory:()=>m},children:t})},l=()=>{let e=(0,i.useContext)(s);if(void 0===e)throw Error("useProgress must be used within a ProgressProvider");return e};t.default=s},1638:function(e,t,r){"use strict";r.r(t),r.d(t,{SubscriptionProvider:function(){return n},useSubscription:function(){return l}});var o=r(7437),i=r(2265);let a=(0,i.createContext)(void 0),s=[{id:"free",name:"Free",price:0,features:["Access to 5 basic workout programs","Limited progress tracking","Community access","Basic nutrition tips","Standard video quality"],limits:{programs:5,liveClasses:0,downloads:0,support:"basic"}},{id:"standard",name:"Standard",price:19.99,features:["Access to 50+ workout programs","Full progress tracking & analytics","Live classes (5 per month)","Personalized meal plans","HD video quality","Priority customer support","Offline video downloads"],limits:{programs:50,liveClasses:5,downloads:10,support:"priority"}},{id:"premium",name:"Premium",price:39.99,features:["Unlimited access to all programs","Advanced analytics & insights","Unlimited live classes","Personal trainer consultations","4K video quality","24/7 priority support","Exclusive premium content","Custom workout creation","Nutrition coaching","Achievement badges & rewards"],limits:{programs:"unlimited",liveClasses:"unlimited",downloads:"unlimited",support:"24/7"}}],n=e=>{let{children:t}=e,[r,n]=(0,i.useState)(null),[l,d]=(0,i.useState)(null),[c,u]=(0,i.useState)(!0),[m,p]=(0,i.useState)({programsAccessed:0,liveClassesAttended:0,downloadsUsed:0});(0,i.useEffect)(()=>{(()=>{let e=s.find(e=>"free"===e.id);e&&(n(e),d({planId:"free",status:"active",startDate:new Date,endDate:new Date(Date.now()+31536e6),autoRenew:!1})),u(!1)})()},[]);let f=async(e,t)=>{try{u(!0),await new Promise(e=>setTimeout(e,1e3));let r=s.find(t=>t.id===e);if(!r)return!1;let o=new Date;return"monthly"===t?o.setMonth(o.getMonth()+1):o.setFullYear(o.getFullYear()+1),n(r),d({planId:e,status:"active",startDate:new Date,endDate:o,autoRenew:!0}),p({programsAccessed:0,liveClassesAttended:0,downloadsUsed:0}),!0}catch(e){return console.error("Subscription error:",e),!1}finally{u(!1)}},g=async()=>{try{return u(!0),await new Promise(e=>setTimeout(e,1e3)),l&&d({...l,status:"cancelled",autoRenew:!1}),!0}catch(e){return console.error("Cancellation error:",e),!1}finally{u(!1)}},h=async e=>{try{u(!0),await new Promise(e=>setTimeout(e,1e3));let t=s.find(t=>t.id===e);if(!t||!l)return!1;return n(t),d({...l,planId:e}),!0}catch(e){return console.error("Update error:",e),!1}finally{u(!1)}};return(0,o.jsx)(a.Provider,{value:{currentPlan:r,subscription:l,availablePlans:s,isLoading:c,subscribeToPlan:f,cancelSubscription:g,updateSubscription:h,checkAccess:e=>{if(!r)return!1;switch(e){case"programs":if("unlimited"===r.limits.programs)return!0;return m.programsAccessed<r.limits.programs;case"liveClasses":if("unlimited"===r.limits.liveClasses)return!0;return m.liveClassesAttended<r.limits.liveClasses;case"downloads":if("unlimited"===r.limits.downloads)return!0;return m.downloadsUsed<r.limits.downloads;case"premiumContent":case"personalTrainer":case"customWorkouts":return"premium"===r.id;default:return!0}},getRemainingUsage:e=>{if(!r)return 0;switch(e){case"programs":if("unlimited"===r.limits.programs)return"unlimited";return Math.max(0,r.limits.programs-m.programsAccessed);case"liveClasses":if("unlimited"===r.limits.liveClasses)return"unlimited";return Math.max(0,r.limits.liveClasses-m.liveClassesAttended);case"downloads":if("unlimited"===r.limits.downloads)return"unlimited";return Math.max(0,r.limits.downloads-m.downloadsUsed);default:return 0}}},children:t})},l=()=>{let e=(0,i.useContext)(a);if(void 0===e)throw Error("useSubscription must be used within a SubscriptionProvider");return e}},5409:function(e,t,r){"use strict";r.r(t),r.d(t,{VideoProvider:function(){return s},useVideo:function(){return n}});var o=r(7437),i=r(2265);let a=(0,i.createContext)(void 0),s=e=>{let{children:t}=e,[r,s]=(0,i.useState)([]),[n,l]=(0,i.useState)({isPlaying:!1,isMuted:!1,volume:1,playbackRate:1,quality:"auto",subtitles:!1,fullscreen:!1}),[d,c]=(0,i.useState)(null);(0,i.useEffect)(()=>{let e=localStorage.getItem("videoProgress");if(e)try{let t=JSON.parse(e);s(t.map(e=>({...e,lastWatched:new Date(e.lastWatched)})))}catch(e){console.error("Failed to load video progress:",e)}let t=localStorage.getItem("videoState");if(t)try{l(JSON.parse(t))}catch(e){console.error("Failed to load video state:",e)}},[]),(0,i.useEffect)(()=>{localStorage.setItem("videoProgress",JSON.stringify(r))},[r]),(0,i.useEffect)(()=>{localStorage.setItem("videoState",JSON.stringify(n))},[n]);let u=e=>{s(t=>{let r=t.findIndex(t=>t.videoId===e.videoId&&t.programId===e.programId),o={currentTime:0,duration:0,completed:!1,lastWatched:new Date,...r>=0?t[r]:{},...e};if(!(r>=0))return[...t,o];{let e=[...t];return e[r]=o,e}})};return(0,o.jsx)(a.Provider,{value:{videoProgress:r,updateVideoProgress:u,getVideoProgress:(e,t)=>r.find(r=>r.videoId===e&&r.programId===t)||null,markVideoComplete:(e,t)=>{u({videoId:e,programId:t,completed:!0,lastWatched:new Date})},videoState:n,updateVideoState:e=>{l(t=>({...t,...e}))},currentVideo:d,setCurrentVideo:c,getTotalWatchTime:()=>r.reduce((e,t)=>e+(t.completed?t.duration:t.currentTime),0),getCompletedVideosCount:()=>r.filter(e=>e.completed).length,getProgramProgress:e=>{let t=r.filter(t=>t.programId===e),o=t.filter(e=>e.completed).length,i=t.length;return{completed:o,total:i,percentage:i>0?o/i*100:0}}},children:t})},n=()=>{let e=(0,i.useContext)(a);if(void 0===e)throw Error("useVideo must be used within a VideoProvider");return e};t.default=a},3385:function(){},9766:function(e){e.exports={style:{fontFamily:"'__Inter_e8ce0c', '__Inter_Fallback_e8ce0c'",fontStyle:"normal"},className:"__className_e8ce0c",variable:"__variable_e8ce0c"}},6892:function(e){e.exports={style:{fontFamily:"'__Poppins_51684b', '__Poppins_Fallback_51684b'",fontStyle:"normal"},className:"__className_51684b",variable:"__variable_51684b"}},622:function(e,t,r){"use strict";var o=r(2265),i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,n=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(e,t,r){var o,a={},d=null,c=null;for(o in void 0!==r&&(d=""+r),void 0!==t.key&&(d=""+t.key),void 0!==t.ref&&(c=t.ref),t)s.call(t,o)&&!l.hasOwnProperty(o)&&(a[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===a[o]&&(a[o]=t[o]);return{$$typeof:i,type:e,key:d,ref:c,props:a,_owner:n.current}}t.Fragment=a,t.jsx=d,t.jsxs=d},7437:function(e,t,r){"use strict";e.exports=r(622)},5925:function(e,t,r){"use strict";let o,i;r.r(t),r.d(t,{CheckmarkIcon:function(){return K},ErrorIcon:function(){return G},LoaderIcon:function(){return Z},ToastBar:function(){return el},ToastIcon:function(){return er},Toaster:function(){return em},default:function(){return ep},resolveValue:function(){return _},toast:function(){return M},useToaster:function(){return R},useToasterStore:function(){return L}});var a,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",o="",i="";for(let a in e){let s=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+s+";":o+="f"==a[1]?m(s,a):a+"{"+m(s,"k"==a[1]?"":t)+"}":"object"==typeof s?o+=m(s,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=s&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(a,s):a+":"+s+";")}return r+(t&&i?t+"{"+i+"}":i)+o},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,o,i)=>{var a;let s=f(e),n=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[n]){let t=s!==e?e:(e=>{let t,r,o=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?o.shift():t[3]?(r=t[3].replace(u," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(u," ").trim();return o[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),a=p[n],l?t.data=t.data.replace(l,a):-1===t.data.indexOf(a)&&(t.data=o?a+t.data:t.data+a),n},h=(e,t,r)=>e.reduce((e,o,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+o+(null==a?"":a)},"");function v(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}v.bind({g:1});let y,w,b,x=v.bind({k:1});function k(e,t){let r=this||{};return function(){let o=arguments;function i(a,s){let n=Object.assign({},a),l=n.className||i.className;r.p=Object.assign({theme:w&&w()},n),r.o=/ *go\d+/.test(l),n.className=v.apply(r,o)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),y(d,n)}return t?t(i):i}}var S=e=>"function"==typeof e,_=(e,t)=>S(e)?e(t):e,C=(o=0,()=>(++o).toString()),D=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},P="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:o}=t;return E(e,{type:e.toasts.find(e=>e.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},A=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},N={},j=(e,t=P)=>{N[t]=E(N[t]||I,e),A.forEach(([e,r])=>{e===t&&r(N[t])})},O=e=>Object.keys(N).forEach(t=>j(e,t)),T=e=>Object.keys(N).find(t=>N[t].toasts.some(t=>t.id===e)),W=(e=P)=>t=>{j(t,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={},t=P)=>{let[r,o]=(0,s.useState)(N[t]||I),i=(0,s.useRef)(N[t]);(0,s.useEffect)(()=>(i.current!==N[t]&&o(N[t]),A.push([t,o]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let a=r.toasts.map(t=>{var r,o,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(o=e[t.type])?void 0:o.duration)||(null==e?void 0:e.duration)||F[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:a}},U=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),$=e=>(t,r)=>{let o=U(t,e,r);return W(o.toasterId||T(o.id))({type:2,toast:o}),o.id},M=(e,t)=>$("blank")(e,t);M.error=$("error"),M.success=$("success"),M.loading=$("loading"),M.custom=$("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?W(t)(r):O(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?W(t)(r):O(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let o=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?_(t.success,e):void 0;return i?M.success(i,{id:o,...r,...null==r?void 0:r.success}):M.dismiss(o),e}).catch(e=>{let i=t.error?_(t.error,e):void 0;i?M.error(i,{id:o,...r,...null==r?void 0:r.error}):M.dismiss(o)}),e};var q=1e3,R=(e,t="default")=>{let{toasts:r,pausedAt:o}=L(e,t),i=(0,s.useRef)(new Map).current,a=(0,s.useCallback)((e,t=q)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(o)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let o=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(o<0){r.visible&&M.dismiss(r.id);return}return setTimeout(()=>M.dismiss(r.id,t),o)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,o,t]);let n=(0,s.useCallback)(W(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{o&&n({type:6,time:Date.now()})},[o,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:o=!1,gutter:i=8,defaultPosition:a}=t||{},s=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)a(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},z=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,H=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Z=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${H} 1s linear infinite;
`,Y=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,X=k("div")`
  position: absolute;
`,Q=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,er=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?s.createElement(et,null,t):t:"blank"===r?null:s.createElement(Q,null,s.createElement(Z,{...o}),"loading"!==r&&s.createElement(X,null,"error"===r?s.createElement(G,{...o}):s.createElement(K,{...o})))},eo=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=k("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,es=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[o,i]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[eo(r),ei(r)];return{animation:t?`${x(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=s.memo(({toast:e,position:t,style:r,children:o})=>{let i=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},a=s.createElement(er,{toast:e}),n=s.createElement(es,{...e.ariaProps},_(e.message,e));return s.createElement(ea,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof o?o({icon:a,message:n}):s.createElement(s.Fragment,null,a,n))});a=s.createElement,m.p=void 0,y=a,w=void 0,b=void 0;var ed=({id:e,className:t,style:r,onHeightUpdate:o,children:i})=>{let a=s.useCallback(t=>{if(t){let r=()=>{o(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return s.createElement("div",{ref:a,className:t,style:r},i)},ec=(e,t)=>{let r=e.includes("top"),o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...o}},eu=v`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:i,toasterId:a,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=R(r,a);return s.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let a=r.position||t,n=ec(a,c.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return s.createElement(ed,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?_(r.message,r):i?i(r):s.createElement(el,{toast:r,position:a}))}))},ep=M}},function(e){e.O(0,[971,938,744],function(){return e(e.s=9887)}),_N_E=e.O()}]);