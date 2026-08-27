const body=document.body, menuBtn=document.getElementById("menuBtn"), nav=document.getElementById("mainNav");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));

document.querySelectorAll(".drop-btn").forEach(btn=>{
  btn.addEventListener("click",e=>{
    if(window.innerWidth<=700){
      e.preventDefault();
      btn.parentElement.classList.toggle("open");
    }
  });
});

const themeToggle=document.getElementById("themeToggle");
if(localStorage.getItem("lifepath-theme")==="dark") body.classList.add("dark");
themeToggle.addEventListener("click",()=>{
  body.classList.toggle("dark");
  localStorage.setItem("lifepath-theme",body.classList.contains("dark")?"dark":"light");
});

const searchPanel=document.getElementById("searchPanel");
document.getElementById("searchBtn").addEventListener("click",()=>searchPanel.classList.add("show"));
document.getElementById("closeSearch").addEventListener("click",()=>searchPanel.classList.remove("show"));
searchPanel.addEventListener("click",e=>{if(e.target===searchPanel) searchPanel.classList.remove("show")});

document.querySelectorAll(".audio-play").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.textContent=btn.textContent==="▶"?"Ⅱ":"▶";
  });
});

document.querySelectorAll(".dot").forEach((dot,i)=>{
  dot.addEventListener("click",()=>{
    document.querySelectorAll(".dot").forEach(d=>d.classList.remove("active"));
    dot.classList.add("active");
  });
});
