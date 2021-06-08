import { Fragment } from "react";
import styleFilter from './styles/filter.module.css'

const Filter = ({types, name, handlerFilter}) => {

    function handleChange(event) {
        handlerFilter(event.target.value,event.target.name);
        
    }
    

    return ( 
        <Fragment>
            <div className={styleFilter.ctn}>
                <h5 className={styleFilter.name}> {name}:</h5>
            {
                !types? <p>Loading...</p>
                :
            <select key={name} name={name} 
                    id='types' onChange={handleChange}
                    className={styleFilter.select}>
                {
                    types.map((item,i) => <option 
                                            key={i} 
                                            value={item.name}
                                            >{item.name}</option>)
                }
            </select>
            } 
            </div>
            
        </Fragment>
    );
}
 
export default Filter;