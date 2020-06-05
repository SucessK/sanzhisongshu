import shopType from "../../../actionType/wk/shoppingCar/index"
export function CreateShopCar(payload) {
    return {
        type:shopType.ADD_SHOPPING,
        payload
    }
}
export default {
    removeGoods(defaultGoodsId){
        return async(dispatch)=>{
            const data = await this.$axios.get("/api/moveCar", {
                params: {
                    userName: localStorage.userName,
                    defaultGoodsId
                }
            })
            if (data.ok === 1) {
                let total = 0;
                data.carList.forEach(v => {
                    total += v.buyNum
                })
                this.setState({
                    buyNum: total
                })
                localStorage.buyNum = total;
                dispatch(CreateShopCar(data.carList))
            }
        }
    },
    joinGoods(goodsAll){
        return async(dispatch)=>{
            const goods = await this.$axios.get("/api/joinCar", {
                params: {
                    goodsAll,
                    userName: localStorage.userName
                }
            })
            // console.log(goods)
            if (goods.ok === 1) {
                let total = 0;
                goods.carList.forEach(v => {
                    total += v.buyNum
                })
                this.setState({
                    buyNum: total
                })
                localStorage.buyNum = total;
            } else {
                alert("库存不足")
            }
            this.props.getCart.call(this)
        }
    },
    getCart(){
        return async(dispatch)=>{
            const data = await this.$axios.get("/api/getCar",{
                params:{
                    userName:localStorage.userName
                }
            })
            // console.log(data)
            if (data.ok === 1) {
               dispatch(CreateShopCar(data.carInfo))
            }
        }
    },
    changeAllChecked(){
        return async(dispatch)=>{
            const data3 = await this.$axios.get("/api/changeAllIsChecked", {
                params: {
                    userName: localStorage.userName,
                    isChecked: !this.isChecked
                }
            })
            if (data3.ok === 1) {
                dispatch(CreateShopCar(data3.carList))
            }
        }
    },
    changeChecked(carId){
        return async(dispatch)=>{
            const data2 = await this.$axios.get("/api/changeIsChecked", {
                params: {
                    carId
                }
            })
            if (data2.ok === 1) {
                dispatch(CreateShopCar(data2.carList))
            } else {
                alert("网络错误")
            }
        }
    },

}