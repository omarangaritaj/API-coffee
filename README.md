# API para tienda o cafetería

Es una  de API en NodeJS, usando mongoDB. Sirve para crear los productos y los usuarios que manejarían un sistema dentro de una tienda o cafetería.

Para iniciar verifique que tiene NodeJS instalado en su máquina con el comando:

`node --version`

Si tiene NodeJS instalado puede ejecutar el siguiente comando para iniciar el proyecto:

`npm install`

Debe tener una base de datos con MongoDB y crear la ruta de conexión dentro de las variables de entorno

`process.env.MONGO_CNN_ATLAS=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

Y debe configurar el puerto en la variable de entorno

`process.env.PORT=XXXXX`

Para iniciar el proceso puede arrancarlo en desarrollo con el comando:

`npm run dev`
