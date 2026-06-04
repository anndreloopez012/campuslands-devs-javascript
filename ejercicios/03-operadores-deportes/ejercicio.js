// Ejercicio 03: Operadores matematicos - deportes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 03: Operadores matematicos");

// Escribe tu solucion aqui.

// Puntuaje promedio de rendimiento de los judadores sobre 100

let jugador1 = 85;
let jugador2 = 90;
let jugador3 = 78;
let jugador4 = 92;
let jugador5 = 88;

let promedio_rendimiento = (jugador1 + jugador2 + jugador3 + jugador4 + jugador5) / 5;

console.log("Promedio de rendimiento: " + promedio_rendimiento);


//calcular tiempo perdido en la partida para objetener el tiempo extra a jugar 
let equipo1 = 5; 
let equipo2 = 7; 

let Diferencia = (equipo2 - equipo1) ;

console.log("Diferencia: " + Diferencia );

//precision de tiro al arco 

let tiros_arco = 7;
let tiros_acertados = 5;

let precision_arco = (tiros_acertados / tiros_arco) * 100;

console.log("Precision de tiro al arco: " + precision_arco + "%");

//saber si estan en la primera o segunda mitad del partido

let minuto = 60; 

const mitad = minuto % 45;  
console.log("Minuto en la mitad del partido: " + mitad);
