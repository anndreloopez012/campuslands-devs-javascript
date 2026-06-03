const abrircofre = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const llave = true
            if(llave){
                resolve("¡¡ abriendo cofre !!")
            }else{
                reject("¡¡ sin la llave del cofre !!")
            }
        },2000)
    })
}

const obtenerRecurso = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const abierto = true
            if(abierto){
                resolve("¡¡ obtuvistes 50 monedas de oro !!")
            }else{
                reject("¡¡ sin la llave del cofre !!")
            }
        },3000)
    })
}

const ejecutar = async () =>{
    try {
        console.log("PJ1 intenta abrir cofre")
        const abrir = await abrircofre()
        const recurso = await obtenerRecurso()
        console.log(abrir)
        console.log(recurso)
        
    } catch (error) {
        console.error(error)
    }
}
ejecutar();