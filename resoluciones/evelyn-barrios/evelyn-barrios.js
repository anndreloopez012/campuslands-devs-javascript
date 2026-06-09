// Ejercicio 01: Variables y constantes - videojuegos shooter
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 01: Variables y constantes");


// Escribe tu solucion aqui.


//Solución Evelyn-Barrios
const nombreJugador = "Evelyn_Gamer";
const armaPrincipal = "Rifle de asalto";
let vida = 10;
let municion = 40;
let partidaActual = true;


console.log("Jugador:", nombreJugador);
console.log("Arma:", armaPrincipal);
console.log("vida actual:", vida);
console.log("munición disponible:", municion);
console.log("¿partida activa?", partidaActual);


if (vida < 20){
   console.log("Advertencia: te queda poca vida");
}else{
   console.log("estado de salud estable");
}
