import{a as k,Q as M}from"./QMarkupTable.15fa33f3.js";import{Q as _}from"./QPage.e48a5bf1.js";import{_ as T,a3 as z,k as R,r as D,n as i,a9 as f,p,q as t,ac as m,ab as h,t as n,s as e,aa as L,a6 as u,u as a,v as l,a5 as w,a4 as S,O as v,a8 as C,a0 as Q,ad as $}from"./index.28d8620d.js";import{Q as A}from"./QSpace.8e83e7b2.js";import{Q as b,b as r,a as d}from"./QItemLabel.33142631.js";import{Q as q}from"./QList.d79ddb0a.js";import{Q as x}from"./QBtnDropdown.17f9dc82.js";import{Q as I,a as y,b as B}from"./QStepper.dc5c5ddb.js";import{Q as g}from"./touch.eae83678.js";import{C as U}from"./ClosePopup.4dcfa0cd.js";import{u as F}from"./bitkopaStore.600a674b.js";import"./selection.2a43666f.js";import"./QSlideTransition.2ab3aae9.js";import"./use-panel.78ac1833.js";import"./axios.2efb2bd9.js";const N=z({setup(){const o=F();return R(()=>{o.stopListener()}),{bitkopaStore:o,step:D(1)}}}),P={class:"q-pa-xs row justify-center"},j={class:"col-10 q-pt-xl q-mt-xl"},W={class:"q-pa-md"},Y={class:"text-left",style:{width:"150px"}},E={class:"text-right"},O={class:"text-right"},G={class:"text-right"},H={class:"text-right"},J={class:"text-right"},K={class:"text-left"},X={class:"text-right"},Z={class:"text-right"},ee={class:"text-right"},te={class:"text-right"},oe={class:"text-right"},ae={class:"gt-md q-pa-xs row justify-center"},le={key:0,class:"col-12 col-md-6 q-pt-xl q-mt-xl q-px-md"},ne={class:"row items-center no-wrap"},se={class:"text-center"},ie={class:"row items-center no-wrap"},de={class:"text-center"},re={key:1,class:"col-12 col-md-6 q-pt-xl q-mt-xl q-px-md text-dark"},pe={class:"lt-lg q-pa-xs row justify-center"},ue={key:0,class:"col-12 col-md-9 q-pt-md q-mt-xs q-px-md q-mb-md"},ce={class:"row items-center no-wrap"},me={class:"text-center"},ke={class:"row items-center no-wrap"},be={class:"text-center"},fe={key:1,class:"col-12 col-md-6 q-pt-xl q-mt-xl q-px-md text-dark"};function ge(o,c,ye,he,Se,ve){return i(),f(h,null,[!o.bitkopaStore.connected||!o.bitkopaStore.verified?(i(),p(_,{key:0},{default:t(()=>[n("div",P,[n("div",j,[n("div",W,[e(M,null,{default:t(()=>[n("thead",null,[n("tr",null,[n("th",Y,[e(k,{animation:"blink",type:"text"})]),n("th",E,[e(k,{animation:"blink",type:"text"})]),n("th",O,[e(k,{animation:"blink",type:"text"})]),n("th",G,[e(k,{animation:"blink",type:"text"})]),n("th",H,[e(k,{animation:"blink",type:"text"})]),n("th",J,[e(k,{animation:"blink",type:"text"})])])]),n("tbody",null,[(i(),f(h,null,L(5,s=>n("tr",{key:s},[n("td",K,[e(k,{animation:"blink",type:"text",width:"85px"})]),n("td",X,[e(k,{animation:"blink",type:"text",width:"50px"})]),n("td",Z,[e(k,{animation:"blink",type:"text",width:"35px"})]),n("td",ee,[e(k,{animation:"blink",type:"text",width:"65px"})]),n("td",te,[e(k,{animation:"blink",type:"text",width:"25px"})]),n("td",oe,[e(k,{animation:"blink",type:"text",width:"85px"})])])),64))])]),_:1})])])])]),_:1})):m("",!0),o.bitkopaStore.connected&&o.bitkopaStore.verified?(i(),p(_,{key:1},{default:t(()=>[n("div",ae,[o.bitkopaStore.loans.active.length?(i(),f("div",le,[e(B,{modelValue:o.step,"onUpdate:modelValue":c[3]||(c[3]=s=>o.step=s),ref:"stepper",color:"primary",animated:""},{navigation:t(()=>[e(I,null,{default:t(()=>[o.step===3&&o.bitkopaStore.topUpCollateralAmount>0?(i(),p(u,{key:0,onClick:o.bitkopaStore.topUpCollateral,color:"indigo",outline:"",label:"Submit"},null,8,["onClick"])):m("",!0),o.step===1||o.step===2&&o.bitkopaStore.topUpCollateralAmount>0?(i(),p(u,{key:1,onClick:c[1]||(c[1]=s=>o.$refs.stepper.next()),color:"indigo",outline:"",label:"Continue"})):m("",!0),o.step>1?(i(),p(u,{key:2,flat:"",color:"secondary",onClick:c[2]||(c[2]=s=>o.$refs.stepper.previous()),label:"Back",class:"q-ml-sm"})):m("",!0)]),_:1})]),message:t(()=>[o.step===1?(i(),p(g,{key:0,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" Managing Active Loan: "+l(o.bitkopaStore.selectedLoan.loanId),1)]),_:1})):o.step===2?(i(),p(g,{key:1,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" Wallet Balance: "+l(o.bitkopaStore.tokenBalances[o.bitkopaStore.selectedLoan.id])+" "+l(o.bitkopaStore.selectedLoan.symbol),1)]),_:1})):o.step===3?(i(),p(g,{key:2,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" A pop will appear in your wallet ")]),_:1})):m("",!0)]),default:t(()=>[e(y,{name:1,title:"Select Loan",icon:"payments",done:o.step>1,style:{"min-height":"200px"}},{default:t(()=>[e(w,{class:"section-1"},{default:t(()=>[e(S,null,{default:t(()=>[e(x,{split:"",color:"dark",flat:"","no-caps":""},{label:t(()=>[n("div",ne,[e(v,{left:"",name:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`},null,8,["name"]),n("div",se,[e(A),a(l(o.bitkopaStore.selectedLoan.loanId),1)])])]),default:t(()=>[(i(!0),f(h,null,L(o.bitkopaStore.loans.active,s=>(i(),p(q,{key:s.loanId},{default:t(()=>[Q((i(),p(b,{clickable:"",onClick:V=>o.bitkopaStore.changeSelectedLoan(s)},{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e($,{icon:`img:tokens/${s.icon}`,color:"white","text-color":"white"},null,8,["icon"])]),_:2},1024),e(r,null,{default:t(()=>[e(d,null,{default:t(()=>[a("Collateral: "+l(s.symbol),1)]),_:2},1024),e(d,{caption:""},{default:t(()=>[a("Loan Balance: "+l(s.balance)+" "+l(o.bitkopaStore.paymentMethods[s.paymentMethodId-1].symbol),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[U]])]),_:2},1024))),128))]),_:1})]),_:1}),e(S,null,{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"details",size:"15px",flat:"",class:"text-dark q-ml-lg q-px-xl",rounded:"",color:"indigo",label:"Loan Details For Selected Loan","no-caps":""}),e(q,null,{default:t(()=>[e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:`img:countries/${o.bitkopaStore.paymentMethods[o.bitkopaStore.selectedLoan.paymentMethodId-1].currencyIcon}`,size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Loan Balance","no-caps":""},null,8,["icon"])]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-xl"},{default:t(()=>[a("Balance Remaining ")]),_:1}),e(d,{overline:"",class:"q-px-xl"},{default:t(()=>[a(l(parseInt(o.bitkopaStore.selectedLoan.balance).toLocaleString())+" "+l(o.bitkopaStore.paymentMethods[o.bitkopaStore.selectedLoan.paymentMethodId-1].symbol),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"av_timer",size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Duration Remaining","no-caps":""})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-sm"},{default:t(()=>[a("Time Remaining")]),_:1}),e(d,{overline:"",class:"q-px-sm"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.countdown),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`,size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Collateral Amount","no-caps":""},null,8,["icon"])]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"q-px-md text-bold"},{default:t(()=>[a("Collateral supplied")]),_:1}),e(d,{overline:"",class:"q-px-md"},{default:t(()=>[a(l(parseFloat(o.bitkopaStore.selectedLoan.collateralAmount/10**o.bitkopaStore.selectedLoan.decimals).toFixed(6))+" "+l(o.bitkopaStore.selectedLoan.symbol),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"warning",size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Liquidation Risk","no-caps":""})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"q-px-lg q-ml-xs text-bold"},{default:t(()=>[a("LTV")]),_:1}),e(d,{overline:"",class:"q-px-lg"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.ltv)+"%",1)]),_:1})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-xs"},{default:t(()=>[a("Liquidation Price")]),_:1}),e(d,{overline:"",class:"q-px-xs"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.liquidationPrice)+" USD",1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["done"]),e(y,{name:2,title:"Top Up Amount",icon:"payments",done:o.step>2,style:{"min-height":"200px"}},{default:t(()=>[e(C,{outlined:"",modelValue:o.bitkopaStore.topUpCollateralAmount,"onUpdate:modelValue":c[0]||(c[0]=s=>o.bitkopaStore.topUpCollateralAmount=s),"label-color":"dark",label:"Collateral Amount","input-class":"text-dark text-bold text-h6",clearable:"","stack-label":"",dense:o.dense},{append:t(()=>[e(x,{split:"",color:"dark",style:{"pointer-events":"none"},flat:"","no-caps":""},{label:t(()=>[n("div",ie,[e(v,{left:"",name:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`},null,8,["name"]),n("div",de,l(o.bitkopaStore.selectedLoan.symbol),1)])]),_:1})]),_:1},8,["modelValue","dense"])]),_:1},8,["done"]),e(y,{name:3,title:"Submit Transaction",icon:"assignment",style:{"min-height":"200px"}},{default:t(()=>[a(" Complete the transaction with your wallet. ")]),_:1})]),_:1},8,["modelValue"])])):m("",!0),o.bitkopaStore.loans.active.length?m("",!0):(i(),f("div",re,[e(g,{"inline-actions":"",rounded:"",class:"bg-white text-dark"},{action:t(()=>[e(u,{outline:"",align:"right",color:"indigo",to:"/request",label:"Request Loan Now"})]),default:t(()=>[a(" You currently don't have any active loans. ")]),_:1})]))]),n("div",pe,[o.bitkopaStore.loans.active.length?(i(),f("div",ue,[e(B,{modelValue:o.step,"onUpdate:modelValue":c[7]||(c[7]=s=>o.step=s),ref:"stepper",color:"primary",animated:""},{navigation:t(()=>[e(I,null,{default:t(()=>[o.step===3&&o.bitkopaStore.topUpCollateralAmount>0?(i(),p(u,{key:0,onClick:o.bitkopaStore.topUpCollateral,color:"indigo",outline:"",label:"Submit"},null,8,["onClick"])):m("",!0),o.step===1||o.step===2&&o.bitkopaStore.topUpCollateralAmount>0?(i(),p(u,{key:1,onClick:c[5]||(c[5]=s=>o.$refs.stepper.next()),color:"indigo",outline:"",label:"Continue"})):m("",!0),o.step>1?(i(),p(u,{key:2,flat:"",color:"secondary",onClick:c[6]||(c[6]=s=>o.$refs.stepper.previous()),label:"Back",class:"q-ml-sm"})):m("",!0)]),_:1})]),message:t(()=>[o.step===1?(i(),p(g,{key:0,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" Managing Active Loan: "+l(o.bitkopaStore.selectedLoan.loanId),1)]),_:1})):o.step===2?(i(),p(g,{key:1,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" Wallet Balance: "+l(o.bitkopaStore.tokenBalances[o.bitkopaStore.selectedLoan.id])+" "+l(o.bitkopaStore.selectedLoan.symbol),1)]),_:1})):o.step===3?(i(),p(g,{key:2,class:"bg-indigo text-white q-px-lg"},{default:t(()=>[a(" A pop will appear in your wallet ")]),_:1})):m("",!0)]),default:t(()=>[e(y,{name:1,title:"Select Loan",icon:"payments",done:o.step>1,style:{"min-height":"200px"}},{default:t(()=>[e(w,{class:"section-1"},{default:t(()=>[e(S,null,{default:t(()=>[e(x,{split:"",color:"dark",flat:"","no-caps":""},{label:t(()=>[n("div",ce,[e(v,{left:"",name:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`},null,8,["name"]),n("div",me,[e(A),a(l(o.bitkopaStore.selectedLoan.loanId),1)])])]),default:t(()=>[(i(!0),f(h,null,L(o.bitkopaStore.loans.active,s=>(i(),p(q,{key:s.loanId},{default:t(()=>[Q((i(),p(b,{clickable:"",onClick:V=>o.bitkopaStore.changeSelectedLoan(s)},{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e($,{icon:`img:tokens/${s.icon}`,color:"white","text-color":"white"},null,8,["icon"])]),_:2},1024),e(r,null,{default:t(()=>[e(d,null,{default:t(()=>[a("Collateral: "+l(s.symbol),1)]),_:2},1024),e(d,{caption:""},{default:t(()=>[a("Loan Balance: "+l(s.balance)+" "+l(o.bitkopaStore.paymentMethods[s.paymentMethodId-1].symbol),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[U]])]),_:2},1024))),128))]),_:1})]),_:1}),e(S,null,{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"details",size:"15px",flat:"",class:"text-dark q-ml-lg q-px-xl",rounded:"",color:"indigo",label:"Loan Details For Selected Loan","no-caps":""}),e(q,null,{default:t(()=>[e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:`img:countries/${o.bitkopaStore.paymentMethods[o.bitkopaStore.selectedLoan.paymentMethodId-1].currencyIcon}`,size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Loan Balance","no-caps":""},null,8,["icon"])]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-xl"},{default:t(()=>[a("Balance Remaining ")]),_:1}),e(d,{overline:"",class:"q-px-xl"},{default:t(()=>[a(l(parseInt(o.bitkopaStore.selectedLoan.balance).toLocaleString())+" "+l(o.bitkopaStore.paymentMethods[o.bitkopaStore.selectedLoan.paymentMethodId-1].symbol),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"av_timer",size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Duration Remaining","no-caps":""})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-sm"},{default:t(()=>[a("Time Remaining")]),_:1}),e(d,{overline:"",class:"q-px-sm"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.countdown),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`,size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Collateral Amount","no-caps":""},null,8,["icon"])]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"q-px-md text-bold"},{default:t(()=>[a("Collateral supplied")]),_:1}),e(d,{overline:"",class:"q-px-md"},{default:t(()=>[a(l(parseFloat(o.bitkopaStore.selectedLoan.collateralAmount/10**o.bitkopaStore.selectedLoan.decimals).toFixed(6))+" "+l(o.bitkopaStore.selectedLoan.symbol),1)]),_:1})]),_:1})]),_:1}),e(b,null,{default:t(()=>[e(r,{avatar:""},{default:t(()=>[e(u,{style:{"pointer-events":"none"},icon:"warning",size:"15px",flat:"",class:"text-dark q-mr-xs",rounded:"",color:"indigo",label:"Liquidation Risk","no-caps":""})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"q-px-lg q-ml-xs text-bold"},{default:t(()=>[a("LTV")]),_:1}),e(d,{overline:"",class:"q-px-lg"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.ltv)+"%",1)]),_:1})]),_:1}),e(r,{side:""},{default:t(()=>[e(d,{class:"text-bold q-px-xs"},{default:t(()=>[a("Liquidation Price")]),_:1}),e(d,{overline:"",class:"q-px-xs"},{default:t(()=>[a(l(o.bitkopaStore.selectedLoan.liquidationPrice)+" USD",1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["done"]),e(y,{name:2,title:"Top Up Amount",icon:"payments",done:o.step>2,style:{"min-height":"200px"}},{default:t(()=>[e(C,{outlined:"",modelValue:o.bitkopaStore.topUpCollateralAmount,"onUpdate:modelValue":c[4]||(c[4]=s=>o.bitkopaStore.topUpCollateralAmount=s),"label-color":"dark",label:"Collateral Amount","input-class":"text-dark text-bold text-h6",clearable:"","stack-label":"",dense:o.dense},{append:t(()=>[e(x,{split:"",color:"dark",style:{"pointer-events":"none"},flat:"","no-caps":""},{label:t(()=>[n("div",ke,[e(v,{left:"",name:`img:tokens/${o.bitkopaStore.selectedLoan.icon}`},null,8,["name"]),n("div",be,l(o.bitkopaStore.selectedLoan.symbol),1)])]),_:1})]),_:1},8,["modelValue","dense"])]),_:1},8,["done"]),e(y,{name:3,title:"Submit Transaction",icon:"assignment",style:{"min-height":"200px"}},{default:t(()=>[a(" Complete the transaction with your wallet. ")]),_:1})]),_:1},8,["modelValue"])])):m("",!0),o.bitkopaStore.loans.active.length?m("",!0):(i(),f("div",fe,[e(g,{"inline-actions":"",rounded:"",class:"bg-white text-dark"},{action:t(()=>[e(u,{outline:"",align:"right",color:"indigo",to:"/request",label:"Request Loan Now"})]),default:t(()=>[a(" You currently don't have any active loans. ")]),_:1})]))])]),_:1})):m("",!0)],64)}var ze=T(N,[["render",ge]]);export{ze as default};
