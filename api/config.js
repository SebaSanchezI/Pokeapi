//en este archivo defino las variables de entorno
//en el .env las seteo >> les pongo el valor que necesito
//la objeto process.env es el que le da acceso a todas las variables de entorno cuando inicia el proceso de NODE 

const dotenv = require('dotenv').config();

module.exports = {
    //si no esta definida la variable de entorno toma,por defecto, el valor de la derecha
    NODE_ENV: process.env.NODE_ENV || 'development',//puede ser Development o Production
    DB_USER: process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST 
}