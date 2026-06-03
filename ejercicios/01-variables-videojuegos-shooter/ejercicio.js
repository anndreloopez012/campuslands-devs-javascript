// Ejercicio 01: Variables y constantes - videojuegos shooter
console.log("Ejercicio 01: Variables y constantes");

//-----Declaracion de variables----
//Datos que no cambiaran
const jugador="Goldenboy";
const arma="AK-47";
//Datos que cambiaran durante el juego
let vida =100;
let municion=30;
let estado= "En combate";
console.log("\n--INICIO DE LA PARTIDA--\n");
console.log("Bienvenido " , jugador);
console.log("Tu arma es: " , arma);
console.log("Tu vida actual es: " , vida);
console.log("Tu municion es: " , municion, " balas");
console.log("El estado de tu partida es: " , estado);

 console.log("\nEntrando en combate..\n");
 municion=municion-25;
 vida=vida-80;
 console.log("Disparaste tu arma, te quedan " , municion , " balas");
 console.log("Has sido atacado, tu vida actual es: " , vida);
 estado="En peligro";
console.log("El estado de tu partida es: " , estado);
console.log("\n--COMBATE FINALIZADO--\n");