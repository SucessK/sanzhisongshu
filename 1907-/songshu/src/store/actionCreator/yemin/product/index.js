import productsListType from "../../../actionType/yemin/index"
import axios from "axios";
export function changeProductList(payload1,payload2) {
  return {
      type:productsListType.CAHNGE_PRODUCT_LIST,
      payload1,
      payload2
  }
}

export default{
getProduct(){
    return async (dispatch)=>{
        const {data} = await axios({
          url:"/songshu/mobile/api/integral/index/info",
          headers:{"appkey":"ef1fc57c13007e33"}
        });
        dispatch(changeProductList(data.floors[0].products,data.floors[1].products))

    }
  }
}