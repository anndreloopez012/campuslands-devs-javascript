# Resolución Ejercicio 05 - Arrays (Vectores)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en la gestión de colecciones de datos mediante el uso de Arreglos (Arrays) en JavaScript, utilizando una lista de comidas favoritas para demostrar la manipulación de elementos.

## Justificación Técnica

En la solución se han aplicado métodos y propiedades fundamentales de los arreglos para organizar la información:

1.  **Declaración e Inicialización**: Se utilizó una constante (`const`) para definir el arreglo `misComidas`, asegurando que la referencia al arreglo se mantenga estable.
2.  **Método `.push()`**: Se empleó para agregar dinámicamente un nuevo elemento ("Hamburguesa") al final de la colección, demostrando la naturaleza mutable de los arreglos.
3.  **Propiedad `.length`**: Se utilizó para obtener de forma automática la cantidad de elementos presentes en la lista, facilitando la comunicación de datos estadísticos al usuario.
4.  **Método `.forEach()`**: Se implementó para recorrer el arreglo de forma eficiente. Este método permite ejecutar una función por cada elemento, lo cual es una práctica más moderna y limpia que los ciclos tradicionales.

## Decisiones de Diseño

*   **Acceso por Índice**: Se demostró el acceso directo al primer elemento de la lista mediante el índice `[0]`.
*   **Lógica Condicional**: Se integró una validación basada en el tamaño del arreglo (`length > 3`) para mostrar mensajes personalizados según la cantidad de platos registrados.
*   **Legibilidad**: La estructura del menú en consola se diseñó para ser clara, separando la información general del listado detallado de platos.

Este ejercicio consolida el conocimiento sobre estructuras de datos lineales y la capacidad de iterar sobre ellas para procesar información de manera masiva.