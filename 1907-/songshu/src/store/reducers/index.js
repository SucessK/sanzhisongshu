import {
    combineReducers
} from "redux";
import product from './yemin/product'
import shoppingCar from "./wk/shoppingCar/index"
import cartListInfo from "./wk/cartList/index"
export default combineReducers({
    product,
    shoppingCar,
    cartListInfo
})