import { Fragment, useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { getPokemonId, cleanDetails } from '../redux/actions/actions.js'
import stylePokeDetails from './styles/pokeDetails.module.css'
import NavBar from "./NavBar.js";
import Loading from "./Loading.js";

const CardDetails = () => {
//con el id de la pagina despacho la accion 
//tomo el dato del store
//obtener el valor del store, despachar la accion en app 

const [details,setDetails] = useState({})
const dispatch = useDispatch();
const pokeDetails = useSelector(store => store.pokeDetails);
const {id} = useParams();//obtengo el valor del id de la ruta

useEffect(() => {
    getDetails();
    return ()=>{
        clear();
    }
},[])

useEffect(() => {
    setDetails(pokeDetails);
}, [pokeDetails])

const getDetails = ()=>{
    if(Object.keys(details).length === 0) dispatch(getPokemonId(id))
}
const clear = ()=>{
    dispatch(cleanDetails());
}
//<h1>Details</h1>
    return ( 
        <Fragment>
            <NavBar/>
            <div className={stylePokeDetails.ctn}>
                        {   
                            Object.keys(details).length === 0 ?
                            <Loading/>
                            :
                            
                        <div className={stylePokeDetails.card}>
                            
                            
                                <div className={stylePokeDetails.divImg}>
                                    <img src={details.image} alt="pokefoto" width='300' height='300'/>
                                </div>
                                <div className={stylePokeDetails.data}>
                                    <div className={stylePokeDetails.name}>
                                        <p>{details.name.toUpperCase()}</p>
                                    </div>
                                    <div className={stylePokeDetails.id}>
                                            <p>ID: {details.id}</p>
                                    </div>
                                    <div className={stylePokeDetails.details}>
                                        <div className={stylePokeDetails.abilities}>
                                            <div className={stylePokeDetails.abiName}>ABILITIES</div>
                                            <div className={stylePokeDetails.abiData}>
                                                <div className={stylePokeDetails.abiDataLife}>
                                                    <div className={stylePokeDetails.text}><label>Life:</label></div>
                                                    <div className={stylePokeDetails.text}><p >{details.hp}</p></div>
                                                </div>
                                                <div className={stylePokeDetails.abiDataAttack}>
                                                    <div><label>Attack:</label></div>
                                                    <div><p >{details.attack}</p></div>
                                                </div>
                                                <div className={stylePokeDetails.abiDataDefense}>
                                                    <div><label>Defense:</label></div>
                                                    <div><p >{details.defense}</p></div>
                                                </div>
                                                <div className={stylePokeDetails.abiDataSpeed}>
                                                    <div><label>Speed:</label></div>
                                                    <div><p >{details.speed}</p></div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className={stylePokeDetails.abilities}>
                                            <div>FEATURES</div>
                                            <div className={stylePokeDetails.abiData}>
                                                <div className={stylePokeDetails.abiDataHeight}>
                                                    <div><label>Height:</label></div>
                                                    <div><p >{details.height}</p></div>
                                                </div>
                                                <div className={stylePokeDetails.abiDataWeight}>
                                                    <div><label>Weight:</label></div>
                                                    <div><p>{details.weight}</p></div>
                                                </div>
                                                <div className={stylePokeDetails.abiDataTypes}>
                                                <div><label>Type:</label></div>
                                                    <div>
                                                        {
                                                        details.types.map((item,i) => <p key={i}>{item.name}</p>)
                                                        }
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        }
            </div>
        </Fragment>
    )
}
 
export default CardDetails;