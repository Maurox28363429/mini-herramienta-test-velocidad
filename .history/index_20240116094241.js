import axios from 'axios';
import inquirer from 'inquirer';

async function runPerformanceTest() {
  // Crear prompts interactivos con inquirer
  const prompts = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Ingrese la URL de la API:',
    },
    {
      type: 'number',
      name: 'cantidadPeticiones',
      message: 'Ingrese la cantidad de peticiones:',
    },
  ]);

  const { url, cantidadPeticiones } = prompts;

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