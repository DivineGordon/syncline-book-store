import{_ as n,U as o,o as a,c,a as t,t as r}from"./index.ff9ef087.js";const d={name:"User",data(){return{content:""}},mounted(){o.getUserBoard().then(e=>{this.content=e.data},e=>{this.content=e.response&&e.response.data||e.message||e.toString()})}},i={class:"container"},_={class:"jumbotron"};function p(e,l,h,m,s,u){return a(),c("div",i,[t("header",_,[t("h3",null,r(s.content),1)])])}const B=n(d,[["render",p]]);export{B as default};
