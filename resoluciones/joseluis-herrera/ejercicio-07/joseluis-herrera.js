let prendas = ["Pantalon", "Camisa", "Sudadero", "Calcetines", "Gorra", "Bufanda"]

for(let i = 0; i < prendas.length; i++){
  console.log(i + " Prendas "+ prendas[i])
}


let inventario = 6;
while (inventario > 0) {
   console.log("Procesando venta, Articulos Disponibles: " + inventario);
   inventario = inventario - 1
}