const equiposDeFutbol=[
    {id: 1, equipo: "barcelona", ganados: 5, perdidos: 2, empates:0},
    {id: 2, equipo: "Real madrid", ganados: 3, perdidos:2, empates:2},
    {id: 3, equipo: "Los cremas", ganados: 1, perdidos: 3, empates:3}
];

function calcularEstadisticaDeportiva(equipos){

    if (!equipos || equipos.length === 0){
        console.log("No hay equpos para realizar el proceso")
        return ;
    }
    let suma =0;
    let resta= 0;
    let multiplicacion=0;
    let division=0;
    let modulo=0;

    for (let i = 0 ; i<equipos.length; i++ ){
        suma+=equipos[i].ganados;

        resta += equipos[i].ganados-equipos[i].perdidos;

        multiplicacion += equipos[i].ganados * equipos[i].empates;

        division += equipos[i].ganados / equipos[i].empates;

        if (equipos[i].perdidos !== 0){
            division +=equipos[i].ganados / equipos[i].perdidos;
        }
        modulo += equipos[i].ganados % 2;
    }

    console.log(suma);
    console.log(resta);
    console.log(multiplicacion);
    console.log(division);
    console.log(modulo);

}


