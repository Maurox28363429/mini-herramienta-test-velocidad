const inquirer = require('inquirer');

// Definir una lista de preguntas
const preguntas = [
  {
    type: 'input',
    name: 'url',
    message: 'Copie su URL'
  },
  {
    type: 'list',
    name: 'peticionesNumber',
    message: 'Indique el numero de peticiones para el test',
    choices: [1,5,10,100,1000,10000]
  },
];

// Función para manejar las respuestas
function manejarRespuestas(respuestas) {
  console.log(`Realizando ${respuestas.peticionesNumber} peticiones GET a ${respuestas.url}`);

}

// Hacer uso de inquirer para mostrar las preguntas y obtener respuestas
inquirer.prompt(preguntas).then(manejarRespuestas);