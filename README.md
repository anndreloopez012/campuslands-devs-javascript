# Campuslands Devs JavaScript

<table>
  <tr>
    <td><strong>📖 LÉEME</strong></td>
    <td><strong>👥 Contribuyendo</strong>: ver <a href="CONTRIBUTING.md">CONTRIBUTING.md</a></td>
    <td><strong>⚖️ Licencia del MIT</strong>: ver <a href="LICENSE">LICENSE</a></td>
  </tr>
</table>

Repositorio base para estudiantes de JavaScript en Campuslands. Contiene 15 ejercicios progresivos con temas cercanos a videojuegos, motos, deportes, comida, viajes, ropa, musica, autos, paracaidismo, libros, peliculas y proyectos visuales.

## Proposito

Practicar JavaScript basico sin frameworks usando archivos pequenos, instrucciones claras y soluciones separadas. La rama estable es `main`; la rama de trabajo principal del curso es `dev`; las respuestas oficiales viven solo en la rama `respuestas`.

## Clonar el proyecto

```bash
git clone https://github.com/anndreloopez012/campuslands-devs-javascript.git
cd campuslands-devs-javascript
```

## Entrar a la rama dev

```bash
git checkout dev
git pull origin dev
```

## Flujo completo de trabajo en Git para estudiantes

1. Baja el repositorio y entra a `dev`.
2. Crea tu rama personal con tu nombre.
3. Resuelve el ejercicio indicado dentro de `ejercicios/`.
4. Prueba tu codigo en navegador o con Node.js segun corresponda.
5. Guarda cambios con commit.
6. Sube tu rama al remoto.
7. Abre un Pull Request hacia `dev`.
8. Espera revision y aprobacion del administrador/owner.

Ejemplo:

```bash
git checkout dev
git pull origin dev
git checkout -b juan-perez

# trabajar el ejercicio
git status
git add ejercicios/01-variables-videojuegos-shooter/ejercicio.js
git commit -m "feat: solve variables exercise"
git push -u origin juan-perez
```

Luego abre el Pull Request en GitHub seleccionando:

- Base: `dev`
- Compare: tu rama personal

## Como crear una rama con tu nombre

Usa nombre y apellido en minusculas, sin espacios y con guiones:

```bash
git checkout -b nombre-apellido
```

Ejemplos validos: `maria-gomez`, `carlos-rojas`, `ana-martinez`.

## Como trabajar un ejercicio

Cada carpeta de `ejercicios/` incluye un `README.md` con objetivo, instrucciones, pistas, reglas, reto extra y resultado esperado. Edita principalmente `ejercicio.js`; si el ejercicio incluye `index.html` o `style.css`, abre el HTML en el navegador.

## Commit y push

```bash
git add .
git commit -m "feat: solve exercise 01"
git push -u origin nombre-apellido
```

## Pull Request hacia dev

En GitHub, crea un Pull Request desde tu rama personal hacia `dev`. Describe que ejercicio resolviste, que probaste y si tuviste dudas. No abras PR directo hacia `main`.

## Ramas protegidas

- `main` esta protegida como rama estable.
- `dev` esta protegida como rama principal de trabajo.
- `respuestas` es una rama separada solo para consulta de soluciones oficiales.
- Los estudiantes no deben hacer push directo a `main` ni a `dev`.
- Los estudiantes trabajan solo en ramas propias.
- El administrador/owner del repositorio puede subir directo a `main` y `dev` cuando sea necesario.

Si GitHub no permite automatizar la excepcion del administrador, configurala manualmente en:

`Settings -> Branches -> Branch protection rules -> main/dev -> Allow specified actors to bypass required pull requests`

Agrega el usuario owner/administrador como actor autorizado para bypass.

## Estructura del proyecto

```text
/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── .gitignore
└── ejercicios/
    └── 01...15 carpetas de ejercicios
```

## Rama de respuestas oficiales

Las respuestas no estan en `main` ni en `dev`. Estan en una rama separada llamada `respuestas`.

Para consultarlas despues de resolver los ejercicios:

```bash
git fetch origin
git checkout respuestas
```

Para volver al trabajo normal:

```bash
git checkout dev
```

Esta rama es solo de consulta del profesor. Los estudiantes no deben trabajar ni abrir Pull Request desde `respuestas`.

## Buenas practicas basicas de JavaScript

- Usa nombres claros para variables y funciones.
- Declara con `const` por defecto y usa `let` cuando el valor cambie.
- Evita repetir codigo; usa funciones cuando una accion se repita.
- Prueba tu codigo antes de subirlo.
- Lee los errores de consola con calma.
- Mantén las soluciones fuera de los enunciados de ejercicios.
