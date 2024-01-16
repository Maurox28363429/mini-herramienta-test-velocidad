const inquirer = require('inquirer');

// Definir una lista de preguntas
const preguntas = [
  {
    type: 'input',
    name: 'nombre',
    message: '¿Cuál es tu nombre?'
  },
  {
    type: 'list',
    name: 'color',
    message: '¿Cuál es tu color favorito?',
    choices: ['Rojo', 'Azul', 'Verde', 'Amarillo']
  },
  {
    type: 'confirm',
    name: 'confirmacion',
    message: '¿Estás seguro?',
    default: true
  }
];

// Función para manejar las respuestas
function manejarRespuestas(respuestas) {
  console.log('Respuestas:');
  console.log(respuestas);
}

// Hacer uso de inquirer para mostrar las preguntas y obtener respuestas
inquirer.prompt(preguntas).then(manejarRespuestas);