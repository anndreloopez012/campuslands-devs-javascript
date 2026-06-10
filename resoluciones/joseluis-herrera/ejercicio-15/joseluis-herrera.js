const scene = document.querySelector('.scene')
const tower = document.querySelector('.tower')
const cube = document.querySelector('.cube')
const button = document.querySelector('#toggle')

button.addEventListener('click',() => {
    scene.style.backgroundColor = 'black';
    tower.style.backgroundColor = "white";
    cube.style.backgroundColor = "blue"; 
    button.style.backgroundColor = "green";

    tower.style.animation = "giro 5s";
    cube.style.animation = "desaparecer 5s";
})