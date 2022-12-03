import{c as i,R as d,S as u,d as r,f as s,A as c,g as q}from"./index.28d8620d.js";const k=["text","rect","circle","QBtn","QBadge","QChip","QToolbar","QCheckbox","QRadio","QToggle","QSlider","QRange","QInput","QAvatar"],g=["wave","pulse","pulse-x","pulse-y","fade","blink","none"];var h=i({name:"QSkeleton",props:{...d,tag:{type:String,default:"div"},type:{type:String,validator:e=>k.includes(e),default:"rect"},animation:{type:String,validator:e=>g.includes(e),default:"wave"},animationSpeed:{type:[String,Number],default:1500},square:Boolean,bordered:Boolean,size:String,width:String,height:String},setup(e,{slots:a}){const t=q(),l=u(e,t.proxy.$q),n=r(()=>{const o=e.size!==void 0?[e.size,e.size]:[e.width,e.height];return{"--q-skeleton-speed":`${e.animationSpeed}ms`,width:o[0],height:o[1]}}),b=r(()=>`q-skeleton q-skeleton--${l.value===!0?"dark":"light"} q-skeleton--type-${e.type}`+(e.animation!=="none"?` q-skeleton--anim q-skeleton--anim-${e.animation}`:"")+(e.square===!0?" q-skeleton--square":"")+(e.bordered===!0?" q-skeleton--bordered":""));return()=>s(e.tag,{class:b.value,style:n.value},c(a.default))}});const m=["horizontal","vertical","cell","none"];var Q=i({name:"QMarkupTable",props:{...d,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>m.includes(e)}},setup(e,{slots:a}){const t=q(),l=u(e,t.proxy.$q),n=r(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(l.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>s("div",{class:n.value},[s("table",{class:"q-table"},c(a.default))])}});export{Q,h as a};
