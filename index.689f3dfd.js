document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelectorAll(".animated");function e(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}!function n(){t.forEach((function(t){e(t)&&t.classList.add("animate")})),document.removeEventListener("scroll",n)}(),document.addEventListener("scroll",(function(){t.forEach((function(t){e(t)&&t.classList.add("animate")}))}))}));({el:document.querySelector(".btn-up"),scrolling:!1,show(){this.el.classList.contains("btn-up_hide")&&this.el.classList.remove("btn-up_hide")},hide(){this.el.classList.contains("btn-up_hide")||this.el.classList.add("btn-up_hide")},addEventListener(){window.addEventListener("scroll",(()=>{const t=window.scrollY||document.documentElement.scrollTop;this.scrolling&&t>0||(this.scrolling=!1,t>300?this.show():this.hide())})),document.querySelector(".btn-up").onclick=()=>{this.scrolling=!0,this.hide(),window.scrollTo({top:0,left:0,behavior:"smooth"})}}}).addEventListener();
//# sourceMappingURL=index.689f3dfd.js.map