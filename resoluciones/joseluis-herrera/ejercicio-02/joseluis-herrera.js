const marca = "Yamaha"
let modelo = "XJ6"
let Altacc = true
let conductor = null
let placa;
let precio = 30000
const partes = ["Carburador", "Luces", "Ruedas"]

console.log("El modelo", modelo, "Y el tipo es", typeof modelo);
console.log("Es de alta cilindrada", Altacc, "Y el tipo es", typeof Altacc);
console.log("Conductor", conductor, "Y el tipo es", typeof conductor);
console.log("La placa", placa, "Y el tipo es", typeof placa);
console.log("El precio es de", precio, "Y el tipo es", typeof precio);
console.log("Algunas partes son", partes, "Y el tipo es", typeof partes);

if(conductor == null){
    console.log("El conductor es desconocido")
}