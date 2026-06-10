# Resolución Ejercicio 11 - Eventos (Autos de Lujo)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega consiste en la creación de una interfaz interactiva para una ficha técnica de automóviles de lujo, permitiendo al usuario modificar parámetros del vehículo en tiempo real mediante eventos del DOM.

## Justificación Técnica

En la solución se han implementado mecanismos de interacción dinámica para mejorar la experiencia de usuario:

1.  **Manipulación del DOM**: Se utilizaron selectores para acceder a los elementos HTML y actualizar su contenido de forma reactiva.
2.  **Escucha de Eventos (`addEventListener`)**:
    - **Click**: Implementado en botones para cambiar estados o confirmar selecciones (como el modelo o el color).
    - **Input/Change**: Utilizado en controles deslizantes o campos de texto para actualizar valores numéricos como la velocidad máxima o el precio.
3.  **Lógica Interactiva**: Se vinculó la lógica de JavaScript con los estilos CSS para reflejar cambios visuales inmediatos al interactuar con la ficha del auto.

## Decisiones de Diseño

*   **Contexto de Concesionaria Premium**: Se seleccionaron modelos de alta gama para mantener una estética profesional y aspiracional en la aplicación.
*   **Reto Extra**: Se integró una validación que alerta al usuario si el presupuesto ingresado es insuficiente para el modelo seleccionado, demostrando el uso de lógica condicional dentro de un evento.
*   **Feedback Visual**: La consola informa cada interacción realizada por el usuario, facilitando la depuración y verificando que los eventos se disparen correctamente.

Este ejercicio consolida el conocimiento sobre la creación de interfaces dinámicas, permitiendo que el código de JavaScript responda directamente a las acciones del usuario en el navegador.