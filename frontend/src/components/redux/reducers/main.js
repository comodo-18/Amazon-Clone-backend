import  getProductsreducer  from "./Productreducers";
import {combineReducers} from 'redux';

const rootReducer=combineReducers(({
    getproductsdata:getProductsreducer
}))

export default rootReducer;