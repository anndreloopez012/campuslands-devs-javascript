
//Datos principales del personaje
let vida = 100; 
const nombre_personaje = "Dani";
let arma = "K47";

//Dato de muertes o kills
let kill = 4;

if(vida == 50){
    console.log("El personaje cuenta con la mitad de vida",);
}else if (vida <= 0){
    console.log("El personaje esta muerto");
}else{
    console.log("Bienvenido a la batalla es hora de ganar")
    console.log("El personaje",  nombre_personaje ,"esta vivo");
    console.log("El personaje lleva", kill, "kills");
}