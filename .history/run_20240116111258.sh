#!/bin/bash

echo " _______  _______  ______    _______           _______  _______  _______  _______ "
echo "(  ____ \(  ___  )(  __  \  (  ___  )|\     /|(  ____ \(  ____ )(  ____ \(  ____ )"
echo "| (    \/| (   ) || (  \  ) | (   ) || )   ( || (    \/| (    )|| (    \/| (    )|"
echo "| (_____ | |   | || |   ) | | (___) || |   | || (_____ | (____)|| (__    | (____)|"
echo "(_____  )| |   | || |   | | |  ___  || |   | |(_____  )(_____ \|  __)   |     __)"
echo "      ) || |   | || |   ) | | (   ) || |   | |      ) |      ) ) (      | (\ (   "
echo "/\____) || (___) || (__/  ) | )   ( || (___) |/\____) )/\____) ) (____/\| ) \ \__
echo "\_______)(_______)(______/  |/     \|(_______)\______/ \______/ (_______/|/   \__/"
echo ""

# Verificar si npm está disponible
if command -v npm >/dev/null 2>&1; then
  echo "Ejecutando 'npm i'..."
  npm i
  echo "Ejecutando 'npm run start'..."
  npm run start
else
  echo "npm no está disponible. Por favor, descarga e instala Node.js desde la siguiente URL:"
  echo "https://nodejs.org"
fi