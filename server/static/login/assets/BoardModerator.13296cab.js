import{_ as o,U as n,o as a,c,a as e,t as r}from"./index.19a3f5ba.js";const d={name:"User",data(){return{content:""}},mounted(){n.getModeratorBoard().then(t=>{this.content=t.data},t=>{this.content=t.response&&t.response.data||t.message||t.toString()})}},i={class:"container"},_={class:"jumbotron"};function p(t,l,h,m,s,u){return a(),c("div",i,[e("header",_,[e("h3",null,r(s.content),1)])])}const B=o(d,[["render",p]]);export{B as default};
