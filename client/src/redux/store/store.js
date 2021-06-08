import { createStore, applyMiddleware} from "redux";
import {pokeReducer} from "../reducer/reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";


const store = createStore(pokeReducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default function generateStore(){
//     const store = createStore(pokeReducer,composeEnhancers(applyMiddleware(thunk)))
// }


//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//(typeof window !== undefined &&
//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)