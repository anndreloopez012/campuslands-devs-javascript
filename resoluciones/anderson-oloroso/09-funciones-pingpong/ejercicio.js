// Ejercicio 09: Funciones - pingpong
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 09: Funciones");

// Escribe tu solucion aqui.

console.log("========== Funciones - pingpong ==========")

let puntosJ1 = 10
let puntosJ2 = 9

function puntos(jugador){

    if (jugador == "J1"){
        puntosJ1 +=1
    }else if (jugador == "J2"){
        puntosJ2 +=1
    }

    return puntosJ1, puntosJ2

}

function ganador(n1, n2){

    if (n1 <= 11 && n1 > n2){
        mensaje = "El jugador 1 es el ganador"
    }else if(n2 <= 11 && n2 > n1){
        mensaje = "El jugador 2 es el ganador"
    }else{
        mensaje = "Empates"
    }

    return mensaje
}

function mensajeFinal(mensaje){
    console.log(mensaje)
}


mensajeFinal(ganador(puntosJ1, puntosJ2))