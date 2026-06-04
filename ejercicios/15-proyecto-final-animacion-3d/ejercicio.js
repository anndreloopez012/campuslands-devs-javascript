// Ejercicio 15: Proyecto integrador basico - animacion 3D, MOBA o diseno 3D arquitectura
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 15: Proyecto integrador basico");

// Escribe tu solucion aqui.

let tower = document.querySelector(".tower")
let cube = document.querySelector(".cube")
let toggle = document.querySelector("#toggle")

toggle.addEventListener("click", () => {
    tower.classList.toggle("rotatingTower")
    cube.classList.toggle("rotatingCube")
})

