const pelota = document.getElementById("pelota");
const btn = document.getElementById("btnSalto");

btn.addEventListener("click", () => {
  pelota.style.transform = "translateY(-150px) scale(1.2)";  
  setTimeout(() => {
    pelota.style.transform = "translateY(0px) scale(1)";
  }, 600);
});