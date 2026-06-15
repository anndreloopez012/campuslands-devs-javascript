# 79. Visor de assets 3D

## Nivel

Intermedio

## Tematica

animacion 3D

## Enfoque tecnico

componentes sin framework

## Contexto

Crear listado de assets con filtros por estado y departamento.

## Objetivo

Resolver un problema intermedio de JavaScript aplicando analisis, organizacion de datos, funciones y validaciones. El ejercicio debe sentirse como una situacion real de trabajo y no como una practica aislada.

## Instrucciones paso a paso

1. Renderizar assets.
2. Filtrar por etapa.
3. Mostrar progreso.
4. Marcar asset como aprobado.
5. Muestra resultados claros con `console.log` o en el DOM si decides crear una interfaz.
6. Prueba al menos dos casos diferentes antes de entregar.

## Archivo base

Trabaja a partir de `ejercicio.js`. Puedes crear archivos extra solo si el ejercicio lo necesita, pero manten todo dentro de tu carpeta de entrega.

## Forma correcta de entregar

No edites los archivos base del ejercicio. Tu solucion debe ir en:

```text
intermedio/ejercicios/79-visor-modelos-3d/resoluciones/nombre-apellido/
```

Ejemplo:

```text
intermedio/ejercicios/79-visor-modelos-3d/resoluciones/juan-perez/juan-perez.js
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

- DOM
- componentes simples
- filter
- estado

## Como validar tu solucion

- Ejecuta `node ejercicio.js` si trabajas en consola.
- Si agregas HTML, abre el archivo en el navegador y revisa la consola.
- Confirma que no hay errores.
- Confirma que el resultado corresponde al contexto del ejercicio.
- Confirma que tu entrega esta dentro de tu carpeta personal en `resoluciones`.
