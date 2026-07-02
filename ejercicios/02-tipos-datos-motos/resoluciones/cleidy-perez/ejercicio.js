const moto={

    marca: "Yamaha",
    precio: 15000,
    estado: true,
    fabricante: null,
    hecho: undefined,
    coloresDisponibles: ["rojo", "negro", "azul"],
    descripcion:{
        modelo: "2024",
        cilindraje: "250cc"
    }
}
console.log("Datos sobre la moto:", moto.marca, moto.descripcion.modelo, moto.descripcion.cilindraje);

if (typeof moto.precio ==="number" && moto.precio > 0){
    console.log("El precio de la moto es valido y es de :" + moto.precio);

}else{
    console.log("El precio de la moto no es valido");
}

if (Array.isArray(moto.coloresDisponibles)){
    console.log("Colores disponibles para la moto:" +moto.coloresDisponibles.join(","));
}else {
    console.log("No hay colores disponibles para la moto");
}

if (moto.estado===true){
    console.log("La moto esta disponible para la venta");
}else{
    console.log("La moto no se encuentra disponible para la venta");
}