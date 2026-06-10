
const menu = ["pizza", "shuco", "churrascos", "pollo-frito"];

//agregar elemento 
menu.push("Cafe", "Coca-Cola", "Fanta")
console.log(menu)

//consultar posicion
let posicion = menu[0]
console.log(posicion)

//Longitud del array 
console.log(menu.length)

//recorrido
menu.forEach((comida) => {
  console.log(comida)
})
