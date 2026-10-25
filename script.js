(function(){
  "use strict";
  var burger=document.getElementById("burger"),mmenu=document.getElementById("mmenu");
  if(burger&&mmenu){
    var closeMenu=function(){mmenu.classList.remove("open");burger.setAttribute("aria-expanded","false");};
    burger.addEventListener("click",function(){var wasOpen=mmenu.classList.contains("open");if(wasOpen)closeMenu();else{mmenu.classList.add("open");burger.setAttribute("aria-expanded","true");}});
    mmenu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeMenu);});
    window.addEventListener("resize",function(){if(window.innerWidth>900)closeMenu();},{passive:true});
  }
  // Floating header — glass materialises on scroll
  var hdr=document.getElementById("top");
  if(hdr){
    var onHdrScroll=function(){if(window.scrollY>10)hdr.classList.add("scrolled");else hdr.classList.remove("scrolled");};
    window.addEventListener("scroll",onHdrScroll,{passive:true});
    onHdrScroll();
  }
  // Section fade — position-linked, reversible, both directions; off under reduced motion.
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero=document.getElementById("heroPanel"); if(hero)hero.classList.add("in");
  var sections=Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if(reduce){ sections.forEach(function(el){el.style.opacity="";el.style.transform="";}); }
  else if(sections.length){
    var FLOOR=0,ZONE=0.35,ticking=false;
    function paint(){ticking=false;var vh=window.innerHeight||document.documentElement.clientHeight,z=vh*ZONE;
      for(var i=0;i<sections.length;i++){var r=sections[i].getBoundingClientRect();
        var fin=(vh-r.top)/z;if(fin<0)fin=0;if(fin>1)fin=1;var fout=r.bottom/z;if(fout<0)fout=0;if(fout>1)fout=1;
        var p=fin<fout?fin:fout,dy=fin<fout?(1-fin)*30:-(1-fout)*20,st=sections[i].style;
        st.opacity=p.toFixed(3);st.transform="translate3d(0,"+dy.toFixed(1)+"px,0)";}}
    function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(paint);}}
    window.addEventListener("scroll",onScroll,{passive:true,capture:true});
    window.addEventListener("resize",onScroll,{passive:true});paint();
  }
  // FAQ accordion (one open at a time)
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q=item.querySelector(".faq-q");
    q.addEventListener("click",function(){
      var wasOpen=item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(o){o.classList.remove("open");o.querySelector(".faq-q").setAttribute("aria-expanded","false");});
      if(!wasOpen){item.classList.add("open");q.setAttribute("aria-expanded","true");}
    });
  });
  // CTA → focus the email action on arrival
  document.querySelectorAll('a[href="#beta"]').forEach(function(a){a.addEventListener("click",function(){setTimeout(function(){var b=document.getElementById("emailBtn");if(b)b.focus({preventScroll:true});},520);});});
  // Click-to-copy the application email (graceful fallback)
  var copyBtn=document.getElementById("copyAddr"), addr="sales@ugnaian.com";
  if(copyBtn){
    var tag=copyBtn.querySelector(".ctag");
    var ok=function(){if(tag){tag.textContent="Copied";setTimeout(function(){tag.textContent="Copy";},2000);}};
    var fallback=function(){try{var t=document.createElement("input");t.value=addr;document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);ok();}catch(e){if(tag)tag.textContent="Select & copy";}};
    copyBtn.addEventListener("click",function(){
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(addr).then(ok).catch(fallback);}else{fallback();}
    });
  }
})();
