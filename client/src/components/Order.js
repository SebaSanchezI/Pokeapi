import { Fragment } from "react";
import styleOrder from './styles/order.module.css'

const Order = ({orderType,handlerOrder}) => {

    function handleChange(event) {
        handlerOrder(event.target.value);  
    }
    return ( 
        <Fragment>
            <div className={styleOrder.ctn}>
            {
                !orderType? <p>Loading...</p>
                :
            <select key={orderType.name} name={orderType.name} 
                    onChange={handleChange} className={styleOrder.select}>
                {
                    orderType.map((item,i) => <option 
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

export default Order;