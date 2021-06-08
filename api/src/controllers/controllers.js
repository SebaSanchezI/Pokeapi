const axios = require('axios');
const {Pokemon, Type} = require('../db');

//hacer validaciones en cada funcion
const getPokemons = async (req,res)=>{
    const name = req.query.name;
    try {
    //cuando es /pokemons name es undefined
    //lo hice separado porque traen datos distintos cada consulta
        if(name !== undefined){
            //refactorizar esto, ponerlo en una funcion
            if(name && name !== '' ) {
                    let pokeWanted = {};
                    pokeWanted = await Pokemon.findOne({
                    where: {name},
                    attributes: {exclude:['createdAt','updatedAt']},
                    include:{
                        model: Type,
                        attributes:['name']
                        }
                    })
                if(pokeWanted) {
                    return res.json(pokeWanted);
                }
                else{ 
                    const pokeAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        if(pokeAPI){
                        //** CREAR FUNCION PARA NO REPETIR **
                        pokeWanted = {  id:pokeAPI.data.id, 
                                        image: pokeAPI.data.sprites.other.dream_world.front_default,//imagen
                                        name: pokeAPI.data.name,
                                        hp: pokeAPI.data.stats[0].base_stat,
                                        attack: pokeAPI.data.stats[1].base_stat,
                                        defense: pokeAPI.data.stats[2].base_stat,
                                        speed: pokeAPI.data.stats[5].base_stat,
                                        height: pokeAPI.data.height,
                                        weight: pokeAPI.data.weight,
                                    }
                        let types = pokeAPI.data.types.map(type => type.type.name);         
                        pokeWanted = {...pokeWanted,types:types };
                        return res.json(pokeWanted);
                        }
                }
            }    
        }    
        //array de name y urlDetails
        const pokemonsApi = await axios(`https://pokeapi.co/api/v2/pokemon?limit=40`);
        const pokemonsDB = await Pokemon.findAll({
            attributes: ['id','name','image','attack'],
            include:{
                        model: Type,
                        attributes:['name']
                    }
        });

        //** ELIMINAR CAMPO POKEMON_TYPE**
        // if(pokemonsDB.length > 0){
        //     pokemonsDB.map(poke => {  poke.types.map(type => delete type.pokemon_type)
        // })       
            
        // }
console.log('pokemonsDB',pokemonsDB.dataValues)

        //guardo todos los pokes con sus detalles
        let pokeDetails = await Promise.all(
            pokemonsApi.data.results.map(async poke => await axios(poke.url))
        )
        //seteo los objetos con las prop que necesito
        pokeDetails = pokeDetails.map( poke => {
                let newPoke = {}
                //por cada poke
                newPoke = { id:poke.data.id,
                            image: poke.data.sprites.other.dream_world.front_default,//imagen
                            attack: poke.data.stats[1].base_stat,
                            name: poke.data.name}
                let types = poke.data.types.map(type =>  type.type); 
                //nesecito un obj con propiedad name para hacer filtros en el front
                types.map(type => delete type.url);       
                return newPoke = {...newPoke,types:types };
        })

        pokeDetails = pokeDetails.concat(pokemonsDB);
        return res.json( {  numPokemons:pokeDetails.length,
                            pokes: pokeDetails} );    
    }catch (error) {
            console.log('Error en la consulta de getPokemons',error);
            //se puede usar un switch para saber que error en con la propiedad status error.response.status
            if(error.response.status == 404) return res.status(404).json({message:`El pokemon con nombre ${name.toUpperCase()} no se encontro. Intente nuevamente.`});
            res.status(500).json({message: 'Hubo un problema en el servidor'});
    }
    
}

//si no hago getPokemons antes da error porque no tengo ningun ID
const getPokemonId = async (req,res)=>{
    const id = req.params.id;
    if(!id || Number(id) < 0) return res.status(400).json({message: 'El ID es invalido 99999.'}); 
    try {
    //determino si es de la API o la BD 
        ///pasa igual
    
    if(!id.includes('-')){
        //traigo el detalle de un poke de la API
        const pokeDetails = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //en un obj seteo los datos que necesito enviar
        let pokemon = {};
        //id\ - img\ -  type\ - height\ - weight\ -  stats [hp attack defense speed] 
        pokemon = {     id: pokeDetails.data.id,
                        name: pokeDetails.data.name,
                        image: pokeDetails.data.sprites.other.dream_world.front_default,//imagen
                        hp: pokeDetails.data.stats[0].base_stat,
                        attack: pokeDetails.data.stats[1].base_stat,
                        defense: pokeDetails.data.stats[2].base_stat,
                        speed: pokeDetails.data.stats[5].base_stat,
                        height: pokeDetails.data.height,
                        weight: pokeDetails.data.weight,
                        }
                        //***los types extaerlos de la BD***
                        let types = pokeDetails.data.types.map(type => {
                            let obj={};
                            return obj={name:type.type.name}
                        });
                        pokemon = {...pokemon,types:types };
                        res.json(pokemon);

    }else {
        const pokemon = await Pokemon.findByPk(String(id),{
            attributes: {exclude:['createdAt','updatedAt']},
                    include:{
                        model: Type,
                        attributes:['name']
                            }
        });
        pokemon?res.json(pokemon):res.status(400).json({message: 'El ID es invalido.'});
    }
    //validar lo que viene response.status
    }catch (error) {
        console.log('Error en la consulta de getPokemonID',error)
        res.sendStatus(500,{message: 'Hubo un problema en el servidor'})
    }
}


const postNewPokemon =  async (req,res)=>{
    //validar lo que viene
    let {name,image,hp,attack,defense,speed,height,weight,types} = req.body;
    console.log('body',req.body);
    //|| !hp || !attack || !defense || !speed || !height || !weight
    if(!name ) {
        return res.status(400).json({message: 'Los datos enviados no son correctos.'});}
    name = name.toLowerCase();
    let pokeNew = await Pokemon.create({
        image,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
    });
    pokeNew.addType(types);//agrega el dato en la tabla intermedia
    //console.log('POKENEW',pokeNew);
    res.json(`${pokeNew.name}`);
}

const getTypes = async (req,res)=>{

    try {
        const typesDB = await Type.findAll(
           { attributes: ['id','name']}
        );
        //la primera vez solamente se consulta a la API
        if (typesDB.length === 0) {
            let typesRes = await axios(`https://pokeapi.co/api/v2/type`);
            var types = typesRes.data.results.map(type => {return {name: type.name}} );
            //guardar types en la BD
            Type.bulkCreate(types);
            return res.json(types)
        }
    res.json(typesDB)
    } catch (error) {
        console.log('Error en la consulta de Types',error)
        res.sendStatus(500,{message: 'Hubo un problema en el servidor'})
    }
}


module.exports = {
    getPokemons,
    getPokemonId,
    postNewPokemon,
    getTypes
}