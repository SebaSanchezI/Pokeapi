

const initialState = {
    pokemons: [],
    pokeName:[],
    dataFilter:[],
    dataOrder:[],
    dataDB: {},//guardo NumPokemons y NumPokemonsApi de getPokemons
    pokeDetails: {},//para cuando busco por ID y NAME
    types: []
}

export const pokeReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload.pokes,
                dataDB: action.payload.numPokemonsApi
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case 'GET_POKEMON_ID':
            return{
                ...state,
                pokeDetails: action.payload
            }
        case 'GET_POKEMON_NAME':
            return{
                ...state,
                pokeName: action.payload
            }
        case 'CLEAN_POKEMON_DETAILS':
            return{
                ...state,
                pokeDetails: action.payload
            }
        case 'POKEMONS_FILTER':
            if(Object.keys(action.payload).length === 0){
                return {
                    ...state,
                    dataFilter: state.pokemons
                }
            }else{
                return {
                ...state,
                dataFilter: action.payload
                }
            }
            case 'POKEMONS_ORDER':
                    return {
                    ...state,
                    dataOrder: action.payload
                    }
            case 'DELETE':
                    return {
                    ...state,
                    dataOrder:[]
                    }; 
            case 'CLEAN_TYPES':
                return{
                    ...state,
                    types:[]
                    }; 
        default:{
            return state
        }
    }

}