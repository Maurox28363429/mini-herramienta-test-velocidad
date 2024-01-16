const inquirer = require('inquirer');
const fs = require('fs');
const clear = require('clear');
// Ruta y nombre del archivo
const rutaArchivo = './ultima_configuracion.json';
let defaultData = {
  url: '',
  token: '',
  peticionesNumber: 1
};

// Función para leer el archivo JSON de forma asíncrona
async function leerArchivoJSON() {
  return new Promise((resolve, reject) => {
    fs.readFile(rutaArchivo, 'utf8', (error, contenido) => {
      if (error) {
        resolve(null);
      } else {
        resolve(JSON.parse(contenido));
      }
    });
  });
}

// Función para guardar el archivo JSON de forma asíncrona
async function guardarArchivoJSON(datos) {
  return new Promise((resolve, reject) => {
    fs.writeFile(rutaArchivo, JSON.stringify(datos), 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

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
  try {
    await guardarArchivoJSON(respuestas);
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
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
}

// Función para iniciar el programa
async function iniciarPrograma() {
  //limpiar pantalla
  clear();
  // Leer el archivo JSON
  const datosGuardados = await leerArchivoJSON();
  if (datosGuardados) {
    defaultData = datosGuardados;
  }

  // Definir una lista de preguntas
  const preguntas = [
    {
      type: 'input',
      name: 'url',
      message: 'Copie su URL',
      default: defaultData.url
    },
    {
      type: 'input',
      name: 'token',
      message: 'Introduzca su token (opcional)',
      default: defaultData.token
    },
    {
      type: 'list',
      name: 'peticionesNumber',
      message: 'Indique el número de peticiones para el test',
      choices: [1, 5, 10, 100, 1000, 10000],
      default: defaultData.peticionesNumber
    },
  ];

  // Hacer uso de inquirer para mostrar las preguntas y obtener respuestas
  inquirer.prompt(preguntas).then(manejarRespuestas);
}

// Iniciar el programa
iniciarPrograma();