// Ejercicio 08: Strings y metodos - musica
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 08: Strings y metodos");

// Escribe tu solucion aqui.

console.log("========== Ejercicio 08: Strings y metodos - musica ==========");

const fragmentoLetra = `He recorrido tanto mundo y me he sentido tan pequeño Ya no sé diferenciar entre la realidad y el sueño
    He visto paisajes y he descubierto lenguajes
    He encontrado mi lado animal, mi parte más salvaje
    He parado el tiempo para recordar la imagen
    Y estoy exprimiendo el jugo de la vida y su mensaje
    Gente que me anima y otros que dicen que baje
    De la estrella en la que vivo y que por fin me relaje
    Que guarde dinero pa lo que vendrá mañana, ah
    Tengo salud y ganas
    Fuerza, inquietudes y personas que me aman
    Así que hoy es el mejor día pa ponerme las alas
    Y volar y volar y volar
    Porque siento que puedo
    Y volar y volar y volar
    Despegar los pies del suelo
    Y volar y volar y volar
    Porque siento que puedo
    Y volar y volar y volar
    Despegar los pies del suelo`

console.log(fragmentoLetra);

console.log("Cantidad de caracteres: " + fragmentoLetra.length)
console.log(fragmentoLetra.slice(0, 50))
console.log(fragmentoLetra.includes("volar"))

console.log(fragmentoLetra.toLowerCase())
console.log(fragmentoLetra.toUpperCase())

console.log(fragmentoLetra.trim())

let reemplazo = fragmentoLetra.replace(/volar/g, "nadar")
console.log(reemplazo)
