import { Fragment, useState, useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {getTypes,cleanTypes} from '../redux/actions/actions.js'
import styleForm from './styles/form.module.css'
import NavBar from "./NavBar";
import logo from '../image/logo.png'


const Form = () => {
//controlar que los campos obligatorios no esten vacios
//los campos numericos poner por defecto 0

    const validate = (input) => {
        let error;
        //controla que username NO este vacio y tenga formato email
        if (!input.name) {
            error = 'Name is required';
        }
        return error;
    }

    async function postPokemon (obj){    
        const res = await axios.post(`http://localhost:3001/pokemons`,obj);
        return res;
    }
    
    const [valueTypes,setValueTypes]=useState([]);
    const [pokeData,setPokeData] = useState({
        name:'',
        image:logo,
        hp:0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        types:[]
    })
    const [errorName,setErrorName] = useState('');
    const [messageSubmitSuccess,setMessageSubmitSuccess] = useState('');
    const [messageSubmitError,setMessageSubmitError] = useState('');
    const [types,setTypes]= useState([]);
    const types2 = useSelector(store => store.types);
    const pokes = useSelector(store => store.types);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        return ()=>{
            clear();
        }
    },[])

    useEffect(()=>{
        setTypes(types2);
    },[types2])

    useEffect(()=>{
        setPokeData({...pokeData,types:valueTypes});
    },[valueTypes])
    
    //FUNCIONES
    const clear = ()=>{
        dispatch(cleanTypes());
    }

    const sendData = (data,e)=>{
        // let bandera = false;
        // if(pokes.find(poke=>poke.name === data.name)) {
        //     bandera = true;}
        if(data.name !== '' ){

            let res =  handlerSubmit(e);
            //aparecer msj de success VERDE>> <p
            setMessageSubmitSuccess('success');
            console.log('res',res)

        }else {
            //if(!bandera) alert (`Ya existe un pokemon con el nombre ${data.name}`)
            e.preventDefault();
            setMessageSubmitError('error'); 
        }
    }

    //HANDLERS
    const handlerChangeTypes = (e)=>{
        if(e.target.checked){//si se selecciona
            setValueTypes([e.target.value, ...valueTypes]);
        }else {
            setValueTypes(valueTypes.filter(t => t !== e.target.value ))
        }
    }
    const handlerChangeName = (e)=>{
        setMessageSubmitSuccess('');
        setMessageSubmitError(''); 
        setPokeData({...pokeData,name:e.target.value});
        setErrorName(validate({...pokeData,name:e.target.value}));
        
    }
    const handlerChangeLife = (e)=>{
        setPokeData({...pokeData,hp:e.target.value});
    }
    const handlerChangeAttack = (e)=>{
        setPokeData({...pokeData,attack:e.target.value});
    }
    const handlerChangeDefense = (e)=>{
        setPokeData({...pokeData,defense:e.target.value});
    }
    const handlerChangeSpeed = (e)=>{
        setPokeData({...pokeData,speed:e.target.value});
    }
    const handlerChangeHeight = (e)=>{
        setPokeData({...pokeData,height:e.target.value});
    }
    const handlerChangeWeight = (e)=>{
        setPokeData({...pokeData,weight:e.target.value});
    }
    const handlerChangeImage = (e)=>{
        setPokeData({...pokeData,image:e.target.value});
    }
    const handlerSubmit =  (e)=>{
        e.preventDefault();
            let res = postPokemon(pokeData);
            console.log('res',res)
            //limpiar todos los inputs
            setPokeData({
                name:'',
                image:'',
                hp:0,
                attack:0,
                defense:0,
                speed:0,
                height:0,
                weight:0,
                types:[]
            });
        e.target.reset();
        return res;
}
/*
{messageSubmitError && <p >ERROR</p>}
{messageSubmitSuccess && <p >SUCCESS</p>}
*/
    
    return ( 
        <Fragment>
            <NavBar/>
            <form onSubmit={(e)=> sendData(pokeData,e) } className={styleForm.ctn}>
                <p className={styleForm.title}>CREATE YOUR POKEMON</p>
                <div className={styleForm.data}>
                    <div className={styleForm.features}>
                        <div className={styleForm.dataGroup}>  
                            <p>DATA</p>  
                            <div><label>Name:</label><input type='text' name='name'
                                                            onChange={handlerChangeName}
                                                            placeholder='enter pokemon name'
                                                            value={pokeData.name}
                                                            ></input>
                            {errorName && (<p className={styleForm.danger}>{errorName}</p>)}                                
                            </div>               
                            <div><label>Life:</label><input type='number' name='life' min='0'
                                                            onChange={handlerChangeLife}></input></div>
                            <div><label>Attack:</label><input type='number' name='attack' min='0'
                                                            onChange={handlerChangeAttack}></input></div>
                            <div><label>Defense:</label><input type='number' name='defense' min='0'
                                                                onChange={handlerChangeDefense}></input></div>
                            <div><label>Speed:</label><input type='number' name='speed' min='0'
                                                            onChange={handlerChangeSpeed}></input></div>
                            <div><label>Height:</label><input type='number' name='height' min='0'
                                                        onChange={handlerChangeHeight}></input></div>
                            <div><label>Weight:</label><input type='number' name='weight' min='0'
                                                        onChange={handlerChangeWeight}></input></div>
                            <label>Image:</label><input type='text' name='image' 
                                                    onChange={handlerChangeImage}
                                                    placeholder='enter url image'></input><br></br>
                        </div>
                        <div className={styleForm.dataImg}>
                            <img src={pokeData.image} alt='' height='100' width='100'/>
                        </div>
                    </div>
                    <div className={styleForm.types}>
                    <p>TYPES</p>
                    {   
                        types.map((type,i)=>
                            <div>
                                <input type='checkbox' onChange={handlerChangeTypes} id={type.id} value={type.id} key={i}></input>
                                {type.name}
                            </div>
                        )
                    }
                    </div>
                </div>
                <div className={styleForm.success}>
                    {messageSubmitSuccess && (<p >POKEMON CREATED WITH SUCCESS</p>)}
                </div>
                <div className={styleForm.error}>
                    {messageSubmitError && (<p>POKEMON WAS NOT CREATED</p>)}
                </div>
                <div className={styleForm.btn}>
                    <input type='submit' value='submit'></input>
                    
                </div>
            </form>
        </Fragment>
    );
}
export default Form;