# Resolución Ejercicio 09 - Funciones (Ping-pong)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega consiste en la implementación de funciones reutilizables para gestionar marcadores y determinar el ganador en una partida de ping-pong (tenis de mesa).

## Justificación Técnica

En la solución se han aplicado los conceptos fundamentales de modularización en JavaScript:

1.  **Declaración de Funciones**: Se definieron bloques de código independientes (`calcularMarcador`, `definirGanador`) para encapsular tareas específicas, mejorando la organización del programa.
2.  **Parámetros y Argumentos**: Se implementó el paso de datos hacia las funciones para que estas operen de forma dinámica sobre diferentes valores de puntaje.
3.  **Retorno de Valores (`return`)**: Las funciones procesan la lógica interna y devuelven un resultado al flujo principal, permitiendo almacenar datos como el nombre del ganador en constantes para su posterior visualización.
4.  **Ámbito (Scope)**: Se demuestra el manejo de variables locales dentro de las funciones y su interacción con el entorno global del script.

## Decisiones de Diseño

*   **Lógica de Competencia**: Se diseñó una estructura que simula un torneo real, incluyendo la impresión del marcador final y la mención de un trofeo para el ganador.
*   **Reto Extra**: Se integró una validación externa para verificar si el Jugador A alcanzó el puntaje máximo reglamentario de un set (21 puntos), demostrando el uso de condicionales sobre resultados de funciones.
*   **Código Limpio**: Se priorizó una sintaxis clara y nombres de funciones semánticos que explican por sí mismos la acción que realizan.

Este ejercicio consolida el conocimiento sobre la creación de código escalable y reutilizable mediante el uso de funciones y el flujo de datos a través de parámetros.