(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{42:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),a=n(17),s=n.n(a),o=n(6),u=n(2),i=n.n(u),l=n(4),b=n(3),d=n(0),j=function(e){var t=e.handleLogin,n=e.username,r=e.setUsername,c=e.password,a=e.setPassword;return Object(d.jsxs)("form",{onSubmit:t,children:[Object(d.jsxs)("div",{children:["username",Object(d.jsx)("input",{type:"text",value:n,name:"Username",onChange:function(e){var t=e.target;return r(t.value)}})]}),Object(d.jsxs)("div",{children:["password",Object(d.jsx)("input",{type:"text",value:c,name:"Password",onChange:function(e){var t=e.target;return a(t.value)}})]}),Object(d.jsx)("button",{type:"submit",children:"login"})]})},f=function(e){var t=e.blog,n=e.user,c=e.likeBlog,a=e.removeBlog,s=Object(r.useState)(!1),o=Object(b.a)(s,2),u=o[0],j=o[1],f=function(){var e=Object(l.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,c(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(l.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!window.confirm("Remove blog ".concat(t.title," by ").concat(t.author))){e.next=4;break}return e.next=4,a(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v={display:u?"":"none"},g={display:u&&n.username===t.user.username?"":"none"};return Object(d.jsxs)("div",{style:{paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5},children:[Object(d.jsxs)("div",{className:"basicBlogInfo",children:[t.title," ",t.author,Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),j(!u)},children:u?"hide":"view"})]}),Object(d.jsxs)("div",{style:v,className:"detailedBlogInfo",children:[Object(d.jsx)("div",{children:t.url}),Object(d.jsxs)("div",{children:["likes ",t.likes,Object(d.jsx)("button",{onClick:f,children:"like"})]}),Object(d.jsx)("div",{children:t.user.name}),Object(d.jsx)("div",{style:g,children:Object(d.jsx)("button",{onClick:p,children:"remove"})})]})]})},p=function(e){var t=e.user,n=e.logout;return Object(d.jsx)("div",{children:Object(d.jsxs)("p",{children:[t.name," logged in",Object(d.jsx)("button",{onClick:n,children:"logout"})]})})},v=function(e){var t=e.user,n=e.blogs,r=e.logout,c=e.likeBlog,a=e.removeBlog;return Object(d.jsxs)("div",{children:[Object(d.jsx)(p,{user:t,logout:r}),n.map((function(e){return Object(d.jsx)(f,{blog:e,user:t,likeBlog:c,removeBlog:a},e.id)}))]})},g=c.a.forwardRef((function(e,t){var n=e.submitBlog,c=Object(r.useState)(""),a=Object(b.a)(c,2),s=a[0],o=a[1],u=Object(r.useState)(""),i=Object(b.a)(u,2),l=i[0],j=i[1],f=Object(r.useState)(""),p=Object(b.a)(f,2),v=p[0],g=p[1];return Object(r.useImperativeHandle)(t,(function(){return{title:s,setTitle:o,author:l,setAuthor:j,url:v,setUrl:g}})),Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n({title:s,author:l,url:v,likes:0})},children:[Object(d.jsxs)("div",{children:["title:",Object(d.jsx)("input",{type:"text",value:s,name:"title",onChange:function(e){var t=e.target;return o(t.value)}})]}),Object(d.jsxs)("div",{children:["author:",Object(d.jsx)("input",{type:"text",value:l,name:"author",onChange:function(e){var t=e.target;return j(t.value)}})]}),Object(d.jsxs)("div",{children:["url:",Object(d.jsx)("input",{type:"text",value:v,name:"url",onChange:function(e){var t=e.target;return g(t.value)}})]}),Object(d.jsx)("button",{type:"submit",children:"create"})]})}));g.displayName="NewBlogForm";var h=g,O=function(e){var t=e.contents,n=e.isShowing,r=t.text;return n?Object(d.jsx)("div",{children:r}):Object(d.jsx)("div",{})},x=n(7),m=n.n(x),k="/api/blogs",w=null,y={getAll:function(){return m.a.get(k).then((function(e){return e.data}))},setToken:function(e){return w="bearer ".concat(e)},submit:function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:w}},e.next=3,m.a.post(k,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),like:function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:w}},r=Object(o.a)(Object(o.a)({},t),{},{likes:t.likes+1}),e.next=4,m.a.put("".concat(k,"/").concat(t.id),r,n);case 4:return c=e.sent,e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(l.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:w}},e.next=3,m.a.delete("".concat(k,"/").concat(t.id),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},B={login:function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},S=c.a.forwardRef((function(e,t){var n=Object(r.useState)(!1),c=Object(b.a)(n,2),a=c[0],s=c[1],o={display:a?"none":""},u={display:a?"":"none"},i=function(){s(!a)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:i}})),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{style:o,children:Object(d.jsx)("button",{onClick:i,children:e.buttonLabel})}),Object(d.jsxs)("div",{style:u,children:[e.children,Object(d.jsx)("button",{onClick:i,children:"cancel"})]})]})}));S.displayName="Togglable";var C=S,I=function(){var e=Object(r.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(b.a)(a,2),u=s[0],f=s[1],p=Object(r.useState)(""),g=Object(b.a)(p,2),x=g[0],m=g[1],k=Object(r.useState)(null),w=Object(b.a)(k,2),S=w[0],I=w[1],T=Object(r.useState)({}),U=Object(b.a)(T,2),A=U[0],N=U[1],D=Object(r.useState)(!1),L=Object(b.a)(D,2),R=L[0],J=L[1],z=function(e){c(e.sort((function(e,t){return t.likes-e.likes})))},P=Object(r.useRef)(),E=Object(r.useRef)();Object(r.useEffect)((function(){var e=window.localStorage.getItem("currentBloglistUser");if(e){var t=JSON.parse(e);I(t),y.setToken(t.token),console.log("user found:",t.username)}else console.log("user not found");y.getAll().then((function(e){return z(e)}))}),[]);var H=function(e){N(e),J(!0),setTimeout((function(){J(!1),N({})}),2500)},F=function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,B.login({username:u,password:x});case 4:n=e.sent,window.localStorage.setItem("currentBloglistUser",JSON.stringify(n)),I(n),y.setToken(n.token),f(""),m(""),H({success:!0,text:"logged in as ".concat(n.username)}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.log("login failed"),H({success:!1,text:"wrong username or password"});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(l.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.submit(t);case 3:r=e.sent,console.log("blog submitted",r),z(n.concat(Object(o.a)(Object(o.a)({},r),{},{user:S}))),H(r?{success:!0,text:"".concat(r.title," added")}:{success:!1,text:"blog creation failed"}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("blog submission failed"),H({success:!1,text:"blog creation failed"});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(l.a)(i.a.mark((function e(t){var r,c,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.user,e.next=4,y.like(t);case 4:c=e.sent,a=n.map((function(e){return e===t?Object(o.a)(Object(o.a)({},c),{},{user:r}):e})),z(a),H(c?{success:!0,text:"".concat(t.title," liked")}:{success:!1,text:"blog cannot be liked"}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("blog cannot be liked"),H({success:!1,text:"blog cannot be liked"});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=Object(l.a)(i.a.mark((function e(t){var r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.deleteBlog(t);case 3:r=e.sent,c=n.filter((function(e){return e!==t})),z(c),H(r?{success:!0,text:"".concat(t.title," liked")}:{success:!1,text:"blog cannot be liked"}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("blog cannot be liked"),H({success:!1,text:"blog cannot be liked"});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}();return S?Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Blogs"}),Object(d.jsx)(O,{contents:A,isShowing:R}),Object(d.jsxs)(C,{buttonLabel:"create new blog",ref:P,children:[Object(d.jsx)("h3",{children:"Create new"}),Object(d.jsx)(h,{submitBlog:V,ref:E})]}),Object(d.jsx)(v,{user:S,blogs:n,logout:function(e){e.preventDefault(),I(null),E.current.setTitle(""),E.current.setAuthor(""),E.current.setUrl(""),window.localStorage.removeItem("currentBloglistUser"),H({success:!0,text:"logged out"})},likeBlog:W,removeBlog:q})]}):Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Login"}),Object(d.jsx)(O,{contents:A,isShowing:R}),Object(d.jsx)(j,{handleLogin:F,username:u,setUsername:f,password:x,setPassword:m})]})};s.a.render(Object(d.jsx)(I,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.729e06c4.chunk.js.map