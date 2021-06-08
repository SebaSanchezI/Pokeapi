const { Router } = require('express');
const router = Router();
//const {getPokemonName} = require('../controllers/controllers.js')

const routesPokemons = require('../routes/pokemons')
const routesTypes = require('../routes/types')

//JUNTA TODAS LAS RUTAS

router.use('/pokemons',routesPokemons);
//router.use('/',getPokemonName);

router.use('/types',routesTypes);



module.exports = router;
