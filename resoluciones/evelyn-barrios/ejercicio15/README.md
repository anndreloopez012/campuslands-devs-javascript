# Resolución Ejercicio 15 - Proyecto Integrador Básico (Animación 3D)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega final consiste en la creación de una escena visual interactiva básica, simulando la activación y desactivación de energía en un cristal levitante, utilizando HTML, CSS y JavaScript.

## Justificación Técnica

En la solución se han integrado los siguientes conceptos fundamentales de JavaScript y la interacción con el DOM:

1.  **Manipulación del DOM**: Se utilizaron `document.getElementById()` y `document.querySelector()` para acceder a elementos específicos del HTML (un botón y un elemento visual de cristal).
2.  **Escucha de Eventos (`addEventListener`)**: Se implementó un evento `click` en el botón para detectar la interacción del usuario y desencadenar la lógica de la animación.
3.  **Gestión de Clases CSS (`classList.toggle()`)**: Se utilizó el método `toggle()` para añadir o remover dinámicamente una clase CSS (`active-crystal`) al elemento del cristal. Esto permite controlar la animación y el estado visual del cristal de forma eficiente.
4.  **Lógica Condicional (Operador Ternario)**: Se empleó el operador ternario para cambiar el texto del botón y el mensaje en consola de forma dinámica, dependiendo del estado actual del cristal (activo/inactivo).

## Decisiones de Diseño

*   **Contexto Visual**: Se eligió una temática de "cristal levitante" para dar un contexto claro y atractivo a la animación, evocando una escena de fantasía o ciencia ficción.
*   **Interactividad Simple**: La animación se controla con un único botón, lo que simplifica la interacción del usuario y permite enfocarse en la lógica del evento.
*   **Feedback al Usuario**: Se proporcionan mensajes claros en la consola y se actualiza el texto del botón para informar al usuario sobre el estado actual de la animación.
*   **Separación de Responsabilidades**: La lógica de la animación visual (levitación, brillo) se gestiona a través de CSS, mientras que JavaScript se encarga de la interacción y el cambio de estado.

Este ejercicio consolida el conocimiento sobre la interacción entre JavaScript y el DOM, permitiendo crear experiencias de usuario dinámicas y visualmente atractivas.