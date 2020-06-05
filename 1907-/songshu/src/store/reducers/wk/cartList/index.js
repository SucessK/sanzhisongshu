import cartType from "../../../actionType/wk/cartList"
import cartList from "../../../state/wk/cartList"
export default function (state=cartList,{type,payload}) {
    state = JSON.parse(JSON.stringify(state));
    if(type===cartType.GET_CARTLIST){

            if(state.page<2){
                state.items = payload.items;
            }else{

                state.items = [
                    ...state.items,
                    ...payload.items
                ]
            }
            state.page++;
            state.order = payload.order;
            state.index = payload.index;

    }
    if(type===cartType.RESET_PAGE){
          state.page = payload
    }
    return state
}