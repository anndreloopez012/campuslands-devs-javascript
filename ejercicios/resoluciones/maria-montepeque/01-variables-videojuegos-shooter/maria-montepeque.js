// Ejercicio 01: Variables y constantes - videojuegos shooter
console.log("Ejercicio 01: Variables y constantes");

const jugador = "Majo_Sniper",
  vidaMax = 100,
  municionMax = 30;
let arma = "Rifle",
  vida = vidaMax,
  municion = municionMax,
  estado = "en curso";

console.log(
  `${jugador} | ${arma} | Vida ${vida}/${vidaMax} | Municion ${municion}/${municionMax} | ${estado}`,
);

vida -= 35;
municion -= 12;
arma = "Escopeta"; // combate

if (vida <= 0) {
  estado = "perdida";
  vida = 0;
}
if (municion < 10) municion = municionMax; // recarga

console.log(
  `${jugador} | ${arma} | Vida ${vida}/${vidaMax} | Municion ${municion}/${municionMax} | ${estado}`,
);
