import states from "../../../state/yemin";
import productListtType from "../../../actionType/yemin"
export default function (state=states.productList,{type,payload1,payload2}) {
    state = JSON.parse(JSON.stringify(state));
    if(type === productListtType.CAHNGE_PRODUCT_LIST){
        state.productList= payload1
        state.goodsList= payload2
    }
    return state;
}