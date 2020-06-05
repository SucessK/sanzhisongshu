import cartType from "../../../actionType/wk/cartList"
export function CreateCartList(payload) {
    return {
        type:cartType.GET_CARTLIST,
        payload
    }
}
export function CreateResert(payload) {
    return {
        type:cartType.RESET_PAGE,
        payload
    }
}
export default {
    resetPage(){
        return async(dispatch)=>{
            dispatch(CreateResert(1))
        }

    },
    joinCarList(page=1,index=0,order=5,keyword=""){
        return async(dispatch)=>{
            this.setState({
                // isLoading:true
            })
            const {data} = await this.$axios({
                url:"/songshu/mobile/api/product/search",
                headers:{"appkey":"ef1fc57c13007e33"},
                params:{
                    param:{"keyword":keyword,"order":order,"pageCount":12,"page":this.props.page}
                }
            });
                data.index = index;
                data.order = order;
                dispatch(CreateCartList(data))
                // console.log(data)
            let waterfallLeft = [];
            let waterfallRight= [];
            this.props.items.forEach((v,i)=>{
                if(i%2===0){
                    waterfallLeft.push(v);
                }else{
                    waterfallRight.push(v);
                }
            })
            this.setState({
                isLoading:false,
                waterfallLeft,
                waterfallRight,
            },()=>{
                this.switch = true;
            })

        }

    },
    addCarList(goodsAll){
        return async()=>{
            const goods = await this.$axios.get("/api/joinCar",{
                params:{
                    goodsAll,
                    userName:localStorage.userName
                }
            })
            // console.log(goods)
            if(goods.ok===1){
                let total = 0;
                goods.carList.forEach(v=>{
                    total+= v.buyNum
                })
                this.setState({
                    buyNum:total
                })
                localStorage.buyNum = total;
            }else{
                alert("库存不足")
            }
        }
    }
}