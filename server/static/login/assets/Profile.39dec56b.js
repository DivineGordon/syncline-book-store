import{_ as o,o as n,c,a as e,t as s,b as t,F as a,r as i}from"./index.c2bc40d1.js";const _={name:"Profile",computed:{currentUser(){return this.$store.state.auth.user}},mounted(){this.currentUser||this.$router.push("/login")}},d={class:"container"},h={class:"jumbotron"},m=e("strong",null,"Token:",-1),f=e("strong",null,"Id:",-1),g=e("strong",null,"Email:",-1),U=e("strong",null,"Authorities:",-1);function k(p,T,b,x,B,r){return n(),c("div",d,[e("header",h,[e("h3",null,[e("strong",null,s(r.currentUser.username),1),t(" Profile ")])]),e("p",null,[m,t(" "+s(r.currentUser.accessToken.substring(0,20))+" ... "+s(r.currentUser.accessToken.substr(r.currentUser.accessToken.length-20)),1)]),e("p",null,[f,t(" "+s(r.currentUser.id),1)]),e("p",null,[g,t(" "+s(r.currentUser.email),1)]),U,e("ul",null,[(n(!0),c(a,null,i(r.currentUser.roles,(l,u)=>(n(),c("li",{key:u},s(l),1))),128))])])}const y=o(_,[["render",k]]);export{y as default};