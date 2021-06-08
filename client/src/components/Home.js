import { Fragment, useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { Link } from "react-router-dom";

import {getPokemons,getTypes, getPokemonName, pokeFilter, pokeOrder,deletePoke,cleanTypes } from '../redux/actions/actions.js'

import SearchBar from "./SearchBar";
import Cards from './Cards';
import Pagination from "./Pagination.js";
import Filter from './Filter';
import Order from './Order';
import Navbar from './NavBar';

import styleHome from './styles/home.module.css'



const Home = () => {

//Obtiene los datos del store a penas carga la pagina

//1 ejecutar los dispatch una unica vez para cargar el store
//2 una vez que el store tenga los datos colocarlos en el estado
//3 filtros >> utilizar el estado
const [types,setTypes] = useState([])
const [pokemons,setPokemons] = useState([]);//los datos que le paso a cards
const [currentPage,setCurrentPage] = useState(1);//datos que le paso a filter 
const [pokemonsPerPage] = useState(12);
//const [order,setOrder] = useState([])


const types2 = useSelector(store => store.types);//me carga los types que estan en el Store
let arrPokemons = useSelector(store => store.pokemons);//array de pokemons
const pokeName = useSelector(store => store.pokeName);
const pokemonsFilter = useSelector(store => store.dataFilter); 
const pokemonsOrder = useSelector(store => store.dataOrder); 

//const [filterTypePoke,setFilterTypePoke] = useState('all')
//const [filterFrom,setFilterFrom] = useState('all')
//debugger;
const dispatch = useDispatch();
console.log('pokemons',pokemons)
useEffect(() => {
    setPokemons([pokeName]);
}, [pokeName])

//Carga los pokes cuando se inicia la pagina por primera vez
useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    return ()=>{
        clearStates ();
    }
}, [])

//setea el estado cuando se carga el arrPokemons
//cambia cada vez que se agregan pokes a la base
useEffect(() => {
    setPokemons(arrPokemons);
}, [arrPokemons])

useEffect(() => {
    types2.push({id:21,name:'all'})
    setTypes(types2);
    // return ()=>{
    //     setTypes([]);
    // }
}, [types2])


useEffect(()=>{
    setPokemons(pokemonsFilter);
    setCurrentPage(1);//porque si estaba en otra pagina que no sea la 1era no me muestra datos
},[pokemonsFilter])

useEffect(()=>{

    setPokemons(pokemonsOrder);
    setCurrentPage(1);//porque si estaba en otra pagina que no sea la 1era no me muestra datos
},[pokemonsOrder])

// useEffect(()=>{
//     setPokemons(order);
//     setCurrentPage(1);
//     console.log('pase por use effect pokemons')
//     console.log('pokemons use effect order',pokemons)
// },[order])

//PAGINADO
const indexOfLastPokes = currentPage * pokemonsPerPage;
const indexOfFirstPokes = indexOfLastPokes - pokemonsPerPage;
//devuelve un array nuevo con los pokes a renderizar, maximo 12, se lo pasamos a Cards
const currentPokes = pokemons.slice(indexOfFirstPokes,indexOfLastPokes);
//cambio de pagina hundler componente hijo pagination
const paginate = pageNumber => setCurrentPage(pageNumber);

console.log('ESTADO pokemons fuera',pokemons)
//console.log('ESTADO order fuera',order)
//console.log('ESTADO pokemonsFilter fuera',pokemonsFilter)

//FUNCIONES
const clearStates = ()=>{
    dispatch(cleanTypes());
}
//HANDLERS

//BUSQUEDA POR NAME
//handlerSearch viene del componente SearchBar como prop
//despacha la accion >> carga el objeto con los datos en el store
//objeto lo tengo que asignarlo al estado pokemons

const handlerSearch = (value)=>{
    // if(!value){
    //     return(
    //         <Fragment>
    //             <p>Pokemon not found</p>
    //         </Fragment>
    //     )
    // }
    // else {
        if(!value) alert('Debe ingresar un dato en el input.')
        else {dispatch(getPokemonName(value.toLowerCase()));
            setCurrentPage(1);}
        //}
}

//arrPokemons siempre es lo que hay en el store


const handlerFilter = (value,typeFilter)=>{
    //fire, poke type          o  api, form
    /** crear estados de typepoke y from
     * const [filterTypePoke,setFilterTypePoke] = useState('all')
     * const [filterFrom,setFilterFrom] = useState('all')
     * pokefilter (arrPokemons,valueTypePoke,valueFrom,typeFilter)
     */
    // console.log('typeFilter',typeFilter)
    // console.log('value',value)
    // console.log('------------------')
    // console.log('filterTypePoke',filterTypePoke)
    // console.log('filterFrom',filterFrom)
    // console.log('------------------')
    // console.log('pokemons',pokemons)
    // console.log('arrPokemons',arrPokemons)


    // if(typeFilter==='poke Type'){      
    //     //setFilterTypePoke(value);
    //     //console.log('handlerFilter filterFrom',filterFrom)
    //     if(value === 'all') {dispatch( pokeFilter (arrPokemons,value,filterFrom));
    //     debugger;}
    //     else dispatch( pokeFilter (pokemons,value,filterFrom));
    // }else{
    //     //console.log('handlerFilter filterTypePoke',filterTypePoke)
    //     //setFilterFrom(value);
    //     if(value==='all') dispatch( pokeFilter (arrPokemons,filterTypePoke,value));
    //     else dispatch( pokeFilter (pokemons,filterTypePoke,value));
    // }

    dispatch( pokeFilter (arrPokemons,value,typeFilter) );
}


const handlerOrder = (value)=>{
    dispatch(deletePoke());
    dispatch(pokeOrder(pokemons,value));
}

//<button onClick={()=> dispatch( pokeFilter (arrPokemons,'all','all') )}>Clean filter</button>
    return ( 
        <Fragment>
            <Navbar/>
            <div className={styleHome.containar}>
                <div className={styleHome.render}>
                    
                    <div className={styleHome.pokes}>
                            <SearchBar handlerSearch={handlerSearch}/>

                            <Cards list={currentPokes} />
                            <Pagination 
                                    pokesPerPage = {pokemonsPerPage} 
                                    totalPokes = {pokemons.length}
                                    paginate = {paginate} 
                            /> 
                    </div>
                    <div className={styleHome.aside}>
                            <h4>FILTERS:</h4>
                            <Filter handlerFilter={handlerFilter} types={types} name='Type Poke' />
                            <Filter handlerFilter={handlerFilter} types={[{name:'all'},{name:'API'},{name:'Data Base'}]} name='From'/>
                            <h4>ORDER BY:</h4>
                            <Order handlerOrder={handlerOrder} 
                            orderType={
                                [{name:'Alphabetical-ASC'},{name:'Alphabetical-DES'},
                                {name:'Attack-ASC'},{name:'Attack-DES'},
                                {name:'ID-ASC'},{name:'ID-DES'}]
                            }/>
                        <div className={styleHome.divBtn}>
                            <Link   to={`/new`} >
                                <button className={styleHome.btnCreate}>
                                    Create Pokemon
                                </button>
                            </Link>
                        </div>
                        
                            
                    </div>
                </div>
                <footer className={styleHome.footer}>
                    <p>Sebasatin Sanchez Isame</p>
                </footer>
            </div>
        </Fragment>
    );
}
 
export default Home;