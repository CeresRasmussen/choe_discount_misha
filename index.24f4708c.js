document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".animated");function t(e){const t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.top<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}!function n(){e.forEach((function(e){t(e)&&e.classList.add("animate")})),document.removeEventListener("scroll",n)}(),document.addEventListener("scroll",(function(){e.forEach((function(e){t(e)&&e.classList.add("animate")}))}))}));({el:document.querySelector(".btn-up"),scrolling:!1,show(){this.el.classList.contains("btn-up_hide")&&this.el.classList.remove("btn-up_hide")},hide(){this.el.classList.contains("btn-up_hide")||this.el.classList.add("btn-up_hide")},addEventListener(){window.addEventListener("scroll",(()=>{const e=window.scrollY||document.documentElement.scrollTop;this.scrolling&&e>0||(this.scrolling=!1,e>300?this.show():this.hide())})),document.querySelector(".btn-up").onclick=()=>{this.scrolling=!0,this.hide(),window.scrollTo({top:0,left:0,behavior:"smooth"})}}}).addEventListener();document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".info__promocode").forEach((function(e){e.addEventListener("click",(function(){!function(e){const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}(e.innerText),function(e){const t=document.createElement("span");t.innerText="Промокод скопійовано",t.className="info__copied-message",e.appendChild(t),setTimeout((function(){e.removeChild(t)}),2e3)}(e)}))}))}));
//# sourceMappingURL=index.24f4708c.js.map
