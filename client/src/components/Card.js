import { Fragment } from "react";
import { Link } from "react-router-dom";
import styleCard from './styles/card.module.css'
import imgDefault from '../image/pokeball.png'



const Card = ({name,image,types,id}) => {
if(!image) image = imgDefault;
    return ( 
        <Fragment>
            <div className={styleCard.card}>
                <div className={styleCard.headerCard}>
                    <Link to={`/pokemon/${id}`} >  
                        <img    src={image} alt="pokefoto" 
                            className={styleCard.cardImg}
                            width='110px' height='110px'/>
                    </Link>
                </div>
                <div className={styleCard.detail}></div>
                <div className={styleCard.cardBody}>
                        <div className={styleCard.top}>
                            <p>{name.toUpperCase()}</p>
                        </div>    
                        <div className={styleCard.bottom}>
                                {
                                types.map((item,i) =><div key={i}> <p key={item.name}>{item.name}</p></div>)
                                }
                        </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Card;