// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura

console.log("Ejercicio 15: Proyecto integrador basico");

// Escribe tu solucion aqui.

const cube = document.querySelector(".cube");
const boton = document.querySelector("#toggle");

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
  @keyframes girar { to { transform: rotateX(20deg) rotateY(395deg); } }
  .cube.animando { animation: girar 2s linear infinite; }
</style>`,
);

const colores = ["#19a974", "#1463ff", "#ff5c5c"];
let i = 0,
  animando = false;

boton.addEventListener("click", () => {
  animando = !animando;
  cube.classList.toggle("animando", animando);
  boton.textContent = animando ? "Detener" : "Animar";
});

cube.addEventListener("click", () => {
  i = (i + 1) % colores.length;
  cube.style.background = colores[i];
});
