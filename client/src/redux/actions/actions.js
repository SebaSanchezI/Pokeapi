//const
import axios from 'axios';
const GET_POKEMONS = 'GET_POKEMONS';
const GET_TYPES = 'GET_TYPES';
const GET_POKEMON_ID = 'GET_POKEMON_ID';
const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
const POKEMONS_FILTER = 'POKEMONS_FILTER';
const POKEMONS_ORDER ='POKEMONS_ORDER'; 
const CLEAN_POKEMON_DETAILS = 'CLEAN_POKEMON_DETAILS';
const CLEAN_TYPES = 'CLEAN_TYPES';
const DELETE = 'DELETE';


//******CONSULTAS API*******/
export const getPokemons = () => async (dispatch)=>{
    try {
        const res = await axios(`http://localhost:3001/pokemons`);
        dispatch({
            type:GET_POKEMONS,
            payload:res.data})
    } catch (error) {
        console.log('Error de getPokemons',error)
        //hacer type Error(error)
    }
}

export const getTypes = () => async (dispatch)=>{
    try {
        const res = await axios(`http://localhost:3001/types`);
        dispatch({
            type:GET_TYPES,
            payload:res.data
        })
    } catch (error) {
        console.log('Error de GetTypes',error);
    }
}

export const getPokemonId = (id) => async (dispatch) => {
        try {
            const res = await axios(`http://localhost:3001/pokemons/${id}`);
            dispatch({
                type:GET_POKEMON_ID,
                payload: res.data
            })
        } catch (error) {
            console.log('Error de GetPokemonId',error);
        }

}

export const getPokemonName = (name)=> async (dispatch)=>{
    try {
        const res = await axios(`http://localhost:3001/pokemons?name=${name}`);
        dispatch({
            type:GET_POKEMON_NAME,
            payload: res.data
        })
    } catch (error) {
        console.log('Error de GetPokemonId',error);
        //error en la pagina >> crear pagina de error
    }
}


//******FILTROS*******/
export const pokeOrder = (arrPokemons,value)=>(dispatch)=>{
    let arrNew = [];
    switch(value){
        case 'Alphabetical-ASC':
            arrNew = compare(arrPokemons,'asc','name');
        break;
        case 'Alphabetical-DES':
            arrNew = compare(arrPokemons,'des','name');
        break;
        case 'Attack-ASC':
            arrNew = compare(arrPokemons,'asc','attack');
        break;
        case 'Attack-DES':
            arrNew = compare(arrPokemons,'des','attack');
        break;
        case 'ID-ASC':
            arrNew = compare(arrPokemons,'asc','id');
        break;
        case 'ID-DES':
            arrNew = compare(arrPokemons,'des','id');
        break;
        
        default:
            arrNew = arrPokemons;
    }
    dispatch({
        type:POKEMONS_ORDER,
        payload: arrNew
    })
}
//filtrado me va a depositar en un array filter los datos 
//arrFilter es el array que tengo que filtrar
//typeFilter=Type poke o from
//name valor por el que se filtra >> fire 
// (arrPokemons, fire, type poke,from)
// (arrPokemons, fire, type poke,'')
// (arrPokemons, fire, '',from)
// (arrPokemons, fire, ,'')

export const pokeFilter = (arrFilter,value,typeFilter)=>(dispatch)=>{
    let filterPoke;
    if(value==='all'){
        filterPoke = {};
    }else{
        if(typeFilter === 'Type Poke'){
            filterPoke = arrFilter.filter( poke => poke.types.some(item=>item.name === value ))
        }else{
            if(value==='API'){
                filterPoke = arrFilter.filter(poke => typeof poke.id ==='number' )
            }else{//DATA BASE
                filterPoke = arrFilter.filter(poke => typeof poke.id !=='number' );
            }
        }
    }
    dispatch({
        type:POKEMONS_FILTER,
        payload: filterPoke
    })
}


// export const pokeFilter = ({arrFilter, valueType , valueFrom})=>(dispatch)=>{
//     //console.log('arrFilter action',arrFilter)
//     debugger;
//     console.log('valueType action',valueType)
//     console.log('valueFrom action',valueFrom)
//     let filterPoke;
//     if(valueType === 'all' && valueFrom === 'all'){//SIN FILTRO
//         console.log('pase por all')
//         filterPoke = {};
//     }
    
//     if(valueType !== 'all' && valueFrom === 'all'){//FILTRO POR TYPE
//         console.log('pase por filtro por tipo')
//             filterPoke = arrFilter.filter( poke => poke.types.some(item=>item.name === valueType ))
//             console.log('filterPoke',filterPoke)
//     }
    
//     if(valueType === 'all' && valueFrom !== 'all' ){//FILTRO POR FROM
//         console.log('pase por from')
//         if(valueFrom === 'API'){
//             filterPoke = arrFilter.filter(poke => typeof poke.id ==='number' )
//         }else
//             filterPoke = arrFilter.filter(poke => typeof poke.id ==='number' )
//     }
//     dispatch({
//             type:POKEMONS_FILTER,
//             payload: filterPoke
//     })
// }    

//******FUNCIONES EXTRAS*******/
const compare = (array,form,prop)=>{
    //comparo la primer propiedad, si son iguales comparo con la segunda, el mayor va hacia atras
    if(form === 'asc'){
        for(let i=0;i<array.length;i++){
            for(let j=0;j<array.length-1;j++){
            //de mas chico a mas grande
                if(array[j][prop] > array[j+1][prop]){
                    //hago el swap 
                    let aux = array[j];
                    array[j]=array[j+1];
                    array[j+1]=aux;
                }
            } 
        }
    }else{
        for(let i=0;i<array.length;i++){
            for(let j=0;j<array.length-1;j++){
            //de mas grande a mas chico
                if(array[j][prop] < array[j+1][prop]){
                    //hago el swap 
                    let aux = array[j];
                    array[j]=array[j+1];
                    array[j+1]=aux;
                  //pregunto si son iguales
                }
            } 
        }
    }
    return array;
}

//******LIMPIEZA DE ESTADOS*******/
export const deletePoke = () => (dispatch) => {
    dispatch({
        type: DELETE,
    });
};

  export const  cleanDetails = ()=>(dispatch)=>{
    let objEmpty = {};
    dispatch({
        type:CLEAN_POKEMON_DETAILS,
        payload: objEmpty
    })
}

export const cleanTypes = () => (dispatch) => {
    dispatch({
        type: CLEAN_TYPES,
    });
};