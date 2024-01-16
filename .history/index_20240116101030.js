const inquirer = require('inquirer');
const fs = require('fs');
// Ruta y nombre del archivo
const rutaArchivo = './ultima_configuracion.json';
let defaultData={
  url:"",
  token:"",
  peticionesNumber:1

};
// Recuperar la información del archivo
fs.readFile(rutaArchivo, 'utf8', (error, contenido) => {
  if (error) {
    
  } else {
    defaultData = JSON.parse(contenido);
  }
});
// Definir una lista de preguntas
const preguntas = [
  {
    type: 'input',
    name: 'url',
    message: 'Copie su URL'
  },
  {
    type: 'input',
    name: 'token',
    message: 'Introduzca su token (opcional)'
  },
  {
    type: 'list',
    name: 'peticionesNumber',
    message: 'Indique el número de peticiones para el test',
    choices: [1, 5, 10, 100, 1000, 10000]
  },
];

// Función para realizar una petición GET
async function hacerPeticionGet(url, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const respuesta = await fetch(url, { headers });
  const datos = await respuesta.json();
  return datos;
}

// Función para manejar las respuestas
async function manejarRespuestas(respuestas) {
  fs.writeFile(rutaArchivo, JSON.stringify(respuestas), 'utf8', (error) => {
    if (error) {
      
    } else {
      
    }
  });
  console.log(`Realizando ${respuestas.peticionesNumber} peticiones GET a ${respuestas.url}`);

  const startTime = new Date().getTime();

  for (let i = 0; i < respuestas.peticionesNumber; i++) {
    const startTimeBucle = new Date().getTime();
    const resultado = await hacerPeticionGet(respuestas.url, respuestas.token);
    const endTimeBucle = new Date().getTime();
    const tiempoTotalBucle = endTimeBucle - startTimeBucle;
    console.log(`Peticion ${i + 1}: ${tiempoTotalBucle} ms`);
  }

  const endTime = new Date().getTime();
  const tiempoTotal = endTime - startTime;
  console.log(`Tiempo total de ejecución: ${tiempoTotal} ms`);
}

// Hacer uso de inquirer para mostrar las preguntas y obtener respuestas
inquirer.prompt(preguntas).then(manejarRespuestas);