import React, { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import indexStyle from './styles/index.module.css'
import pokebola from '../image/pokeball.png'
const Index = () => {

/*
<button className='btn'>
                       
                    </button>

<div className={indexStyle.pokeballTop}>
                    </div>
                    <div className={indexStyle.pokeballCenter}>
                            <h5>START</h5>
                    </div>
                    <div className={indexStyle.pokeballBottom}>
                            
                    </div>
                    
                    
                </div>
*/
    return (
        <Fragment>
         <div className={indexStyle.ctn}>
            <div>
                <NavLink   to={`/home`} >
                <img src={pokebola} alt='' className={indexStyle.pokeball}
                width='300px' height='300px'/>
                </NavLink>
            </div>
         </div>
         
                    
            
        </Fragment>
    );
}

export default Index;