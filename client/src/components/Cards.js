import { Fragment } from "react";
import Card from './Card';
import Loading from "./Loading";
import styleCards from './styles/cards.module.css'

const Cards = ({list}) => {
//<div key={item.id}> </div>
    return ( 
        <Fragment>
            <div className={styleCards.ctn}>
                { list.length<1?
                        <Loading/>
                    :
                    list.map((item,i)=>
                        
                            <Card   key={i}
                                    name={item.name}
                                    image={item.image}
                                    types={item.types}
                                    id={item.id}
                            />
                        
                    )
                    }
            </div>
                    
        </Fragment>
     );
}
 
export default Cards;