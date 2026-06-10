# Resolución Ejercicio 14 - Promesas / async basico (videojuegos RPG)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en la implementación de operaciones asíncronas en JavaScript, utilizando Promesas y la sintaxis `async/await` para simular la carga de un personaje en un videojuego de rol (RPG).

## Justificación Técnica

En la solución se han aplicado los conceptos fundamentales para el manejo de la asincronía:

1.  **Objeto `Promise`**: Se utilizó para encapsular una operación asíncrona (`cargarPersonaje`), permitiendo manejar su éxito (`resolve`) o fracaso (`reject`) en el futuro.
2.  **Función `setTimeout`**: Se empleó para simular un retardo en la carga de los datos del personaje, emulando una llamada a un servidor o una operación que toma tiempo.
3.  **`async/await`**: Se implementó para consumir la Promesa de manera más legible y secuencial, haciendo que el código asíncrono se parezca más al síncrono.
4.  **Bloque `try...catch...finally`**: Se utilizó para manejar posibles errores durante la ejecución de la Promesa (`catch`) y para asegurar que ciertas acciones se ejecuten siempre al finalizar la operación (`finally`), independientemente del resultado.

## Decisiones de Diseño

*   **Contexto RPG**: Se eligió la carga de un personaje de RPG para dar un contexto claro y familiar al uso de la asincronía, con atributos como `nombre`, `clase`, `nivel` y `hp`.
*   **Simulación de Red**: El `setTimeout` simula la latencia de una red, haciendo el ejemplo más realista.
*   **Reto Extra (Validación de Nivel)**: Se incluyó una validación para detectar si el personaje cargado es un "jugador veterano" (nivel >= 10), demostrando la integración de lógica condicional con los datos asíncronos.
*   **Claridad en Consola**: La salida de datos se estructuró para mostrar el proceso de carga, los detalles del personaje y el estado final de la operación, facilitando la comprensión del flujo asíncrono.

Este ejercicio consolida el conocimiento sobre cómo manejar operaciones que no se ejecutan instantáneamente, un pilar fundamental en el desarrollo de aplicaciones web modernas.