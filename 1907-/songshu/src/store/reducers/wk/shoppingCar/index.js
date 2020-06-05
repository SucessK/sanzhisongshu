import shopType from "../../../actionType/wk/shoppingCar/index"
import carInfo from "../../../state/wk/shoppingCar/index"
export default function (state=carInfo,{type,payload}) {
    state = JSON.parse(JSON.stringify(state));
    if(type===shopType.ADD_SHOPPING){
        state.carInfo = payload;
        state.isLoading = false
    }
    return state
}