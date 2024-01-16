const axios = require('axios');

async function runPerformanceTest() {
  // Obtener la URL y la cantidad de peticiones a través de un prompt
  const url = prompt('Ingrese la URL de la API:');
  const cantidadPeticiones = parseInt(prompt('Ingrese la cantidad de peticiones:'));

  console.log(`Realizando ${cantidadPeticiones} peticiones GET a ${url}`);

  const start = Date.now();

  // Realizar las peticiones GET en paralelo utilizando Promise.all
  const requests = [];
  for (let i = 0; i < cantidadPeticiones; i++) {
    requests.push(axios.get(url));
  }

  try {
    await Promise.all(requests);

    const end = Date.now();
    const tiempoTotal = end - start;
    const promedioTiempo = tiempoTotal / cantidadPeticiones;

    console.log(`Peticiones completadas: ${cantidadPeticiones}`);
    console.log(`Tiempo total: ${tiempoTotal} ms`);
    console.log(`Tiempo promedio por petición: ${promedioTiempo} ms`);
  } catch (error) {
    console.error('Error al realizar las peticiones:', error);
  }
}

runPerformanceTest();
