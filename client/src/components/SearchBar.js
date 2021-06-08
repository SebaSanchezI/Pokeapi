import { Fragment, useState } from "react";
import styleSearchBar from './styles/searchBar.module.css'

const SearchBar = ({handlerSearch}) => {

    const [value,setValue] = useState('');
    //me cambia el estado desde input
    function handleChange(event) {
        //event.preventDefault()
        
        if(!event.target.value){
            console.log('Input limpio');
            setValue('limpio');
        }
        setValue(event.target.value);
        
        

    }
    
    return ( 
        <Fragment>
            <div className={styleSearchBar.ctn}>
                <div className={styleSearchBar.name}>
                    <label>Name:</label>
                </div>
                <div className={styleSearchBar.input}>
                    <input 
                    type='text' 
                    placeholder='Search a Pokemon'
                    value={value} 
                    onChange={handleChange}/> 
                </div>
                <div>
                    <button onClick = {()=>handlerSearch(value)}
                            className={styleSearchBar.btn}
                    >Search</button>
                </div>
            </div>
        </Fragment>
    );
}

export default SearchBar;