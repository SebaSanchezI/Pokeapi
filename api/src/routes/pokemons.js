const {Router} = require('express');
const router = Router();

const {getPokemons,getPokemonId,postNewPokemon} = require('../controllers/controllers.js')


//          ruta   control
//cuando ingresan al home
router.get('/',getPokemons);

//cuando hacen clic en una card
router.get('/:id',getPokemonId);

//cuando buscan por name
//router.get('/nom',getPokemonName);

//cuando ingresan un poke nuevo
router.post('/',postNewPokemon);

module.exports = router;