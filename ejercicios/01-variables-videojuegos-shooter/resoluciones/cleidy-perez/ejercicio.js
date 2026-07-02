const jugador = "Master_01";

let arma= "pistola";
let municion = 10;
let vida= 100;
let estado ="vivo";

console.log("Nombre del jugador:"+ jugador, "tipo de arma:"+ arma, "cantidad de munición:"+ municion);
console.log("Estado del jugador:"+ estado, "vidad que tiene el jugador:"+vida);

let escudo= 50;

if (municion == 0 && vida){
    console.log("Sin municion! "+ arma + "...");
    municion=30;

} else if (vida <=0){
    estado="muerto";
    console.log("El jugdor esta muerto, fin del juego")
}else {
    console.log("Sigue jugando, tienes vida y municion para combatir")