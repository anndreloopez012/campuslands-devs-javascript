# 02. Inventario tactico battle royale

## Nivel

Intermedio

## Tematica

videojuegos battle royale

## Enfoque tecnico

filtros combinados y busquedas

## Contexto

Organizar armas por rareza, tipo, dano y disponibilidad para decidir el mejor equipamiento.

## Objetivo

Resolver un problema intermedio de JavaScript aplicando analisis, organizacion de datos, funciones y validaciones. El ejercicio debe sentirse como una situacion real de trabajo y no como una practica aislada.

## Instrucciones paso a paso

1. Modelar armas con tipo, rareza, dano, municion y disponible.
2. Filtrar armas disponibles por tipo.
3. Encontrar el arma de mayor dano por rareza.
4. Generar una recomendacion final.
5. Muestra resultados claros con `console.log` o en el DOM si decides crear una interfaz.
6. Prueba al menos dos casos diferentes antes de entregar.

## Archivo base

Trabaja a partir de `ejercicio.js`. Puedes crear archivos extra solo si el ejercicio lo necesita, pero manten todo dentro de tu carpeta de entrega.

## Forma correcta de entregar

No edites los archivos base del ejercicio. Tu solucion debe ir en:

```text
intermedio/ejercicios/02-inventario-armas-battle-royale/resoluciones/nombre-apellido/
```

Ejemplo:

```text
intermedio/ejercicios/02-inventario-armas-battle-royale/resoluciones/juan-perez/juan-perez.js
```

## Reglas

- No subas tu solucion fuera de `resoluciones/nombre-apellido/`.
- No modifiques `README.md` ni `ejercicio.js` base.
- Usa nombres descriptivos para variables y funciones.
- Evita resolver todo en una sola funcion gigante.
- Valida entradas o datos incompletos cuando aplique.
- No uses frameworks ni librerias externas.

## Pistas

- Lee primero los datos y define que resultado necesitas.
- Escribe funciones pequenas: calcular, filtrar, ordenar, renderizar o validar.
- Usa `map`, `filter`, `reduce`, `sort`, `find` o `some` cuando ayuden a expresar mejor la solucion.
- Prueba con datos normales y con casos limite.

## Errores comunes

- Mutar datos originales cuando no es necesario.
- Ordenar numeros como texto.
- No validar arreglos vacios.
- Mezclar calculos, validaciones y salida en una sola seccion dificil de leer.
- Subir la respuesta en la carpeta del enunciado en vez de `resoluciones/nombre-apellido/`.

## Reto extra

Agrega una mejora pequena que haga mas realista el ejercicio: un filtro adicional, un resumen estadistico, una validacion extra, persistencia en `localStorage` si aplica, o una presentacion mas clara del resultado.

## Resultado esperado

Al finalizar, tu solucion debe mostrar datos procesados de forma clara, con funciones separadas, validaciones basicas y una salida que permita comprobar rapidamente si el problema quedo resuelto. La respuesta debe poder revisarse sin tocar los archivos base del ejercicio.

## Conceptos que practica

- filter
- find
- reduce
- objetos

## Como validar tu solucion

- Ejecuta `node ejercicio.js` si trabajas en consola.
- Si agregas HTML, abre el archivo en el navegador y revisa la consola.
- Confirma que no hay errores.
- Confirma que el resultado corresponde al contexto del ejercicio.
- Confirma que tu entrega esta dentro de tu carpeta personal en `resoluciones`.
