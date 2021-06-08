<p align='left'>
    <img src='https://images.wikidexcdn.net/mwuploads/esssbwiki/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png' </img>
</p>

# Proyecto Individual - PokeapiWebApp

<p align="left">
    PokeapiWebApp es un proyecto diseñado y desarrollado como Single Page Application dentro del marco del bootcamp de <a href="https://www.soyhenry.com/" target='_blank'>soyHenry</a> con el objetivo de utilizar las tecnologias aprendidas.
<ul>
    <li> Combina el consumo de datos a una <a href='https://pokeapi.co/' target='_blank'>API externa</a> y una base de datos local.</li>
    <li> Ofrece como característica extra un CRUD de personajes.</li>
    <li> Los datos de estos nuevos personajes son los que consume la base de datos local.</li>
    <li> Presenta un cache de búsqueda, filtros, ordenamientos y un formulario controlado.</li>
</ul>    
</p>

## TECNOLOGIAS
- [ ] FRONTEND
- React 
- Redux 
- CSS3 puro
- [ ] BACKEND
- Node JS
- Express JS
- Sequelize ORM.
- PostgresSQL

## UTILIZACION DE APP
<ol>
    <li>Clonar el repositorio</li>
    <li>Instalar las dependencias: desde la consola de comandos, ubicado en la carpeta principal ejecutar  <b>`npm install`</b>.</br>
        IMPORTANTE: es necesario contar minimamente con la última versión estable de Node y NPM.</br>
        Para verificar que versión tienen instalada:</br>
        > node -v </br>
        > npm -v
    </li>
    <li>Crear una base de datos en Postgres con el nombre <b>`pokemon`</b> e importar el archivo <b>.env</b> con los siguientes datos: </li>
    </br>
     <ul>
        <li>DB_NAME=pokemon</li>
        <li>DB_USER=tuUsuarioPostgres</li>
        <li>DB_PASSWORD=tuContraseñaPostgres</li>
        <li>DB_HOST=localhost</li>
    </ul>
    </br>
    <li> Ejecutar el comando <b>npm start</b> en la carpeta <b>api</b> y en la carpeta <b>client</b></li>
</ol>


<!--## DEPLOY DE APP

Para probar la version deployada hace clic en este <a href='https://pokeapi-web-app.herokuapp.com/'>link</a>

