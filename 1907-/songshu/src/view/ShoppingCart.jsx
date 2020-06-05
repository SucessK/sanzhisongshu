import React, { Component } from 'react'
import "../assets/css/wk/w_shopCar.css"
import yes from "../assets/img/wk/true.png";
import no from "../assets/img/wk/false.png";
import noGoods from "../assets/img/noGoods.png"
import loading from "../components/common/Loading"
import getCartList from "../store/actionCreator/wk/shoppingCar/index"
import filters from "../filters/index"
import {
    connect
} from "react-redux"
class ShoppingCart extends Component {

    constructor() {
        super();
        this.isChecked = true;
        this.state = {
            divBlock:"none",
            divPay:'none'
        };
    };

    componentDidMount() {
        this.props.getCart.call(this)
        // console.log(this.props)

    }
    componentWillUnmount() {
        if (this.props.carInfo.length <= 0) {
            localStorage.removeItem("buyNum")
        }
    }

    render() {
        let sumPrice = 0;
        this.isChecked = true;
        const carListArr = this.props.carInfo.map(v => {
            if (v.isChecked) {
                sumPrice += v.buyNum * v.salesPrice.value;
            } else {
                this.isChecked = false;
            }
            return (

                <div onClick={() => { this.props.history.push('/productInfo/' + v.defaultGoodsId + "/" + v.id + '.html') }} className={"w_item_common"} key={v._id}>
                    <div>
                        <img onClick={this.props.changeChecked.bind(this, v._id)} src={(v.isChecked ? yes : no)} alt="" />
                    </div>
                    <div className={"w_item_content"}>
                        <div className={"imgbox"}>
                            <img src={v.pic} alt="" />
                        </div>
                        <div className={"w_item2"}>
                            <p>{v.name}</p>
                            <p>{this.$filters.currency(v.salesPrice.value/1)}</p>
                            <div className={"w_inp"}>
                                <input onClick={this.props.removeGoods.bind(this, v.defaultGoodsId)} className={v.buyNum <= 1 ? "button button1" : "button"} type="button" value={"-"} />
                                <input type="text" value={v.buyNum} onClick={(e) => e.stopPropagation()} readOnly />
                                <input onClick={this.props.addGoods.bind(this, v)} className={"button"} type="button" value={"+"} />

                            </div>
                        </div>
                    </div>
                </div>

            )
        })
        let carListRender = (
            <>
                <div className={"w_header_top"}>
                    <span onClick={() => { this.props.history.go(-1) }} className={" iconfont icon-zuo"}>

                    </span>
                    <p>购物车</p>
                    <span>编辑</span>
                </div>
                <div className="w_rule">
                    {
                        39.00 - sumPrice <= 0 ? <p>满39元免运费</p> : <p>满39元免运费，还差{(39 - sumPrice).toFixed(2)}元</p>
                    }
                    {
                        39.00 - sumPrice <= 0 ?
                            (<p onClick={()=>this.setState({divBlock:'block'})} style={{ color: '#262626' }}>已免运费
                                <span className={"iconfont icon-gantanhao"}></span>
                            </p>) :
                            (<p onClick={() => { this.props.history.push('/carList') }}>
                                去凑单
                                <span className={"iconfont icon-gantanhao"}></span>
                            </p>)
                    }

                </div>
                <div className={"w_item_count"}>
                    {
                        this.props.carInfo.length > 0 ? carListArr : <img src={noGoods} alt="" />
                    }
                </div>
                {/*免运费*/}
                <div className={"w_prop"} style={{display:this.state.divBlock}}>
                    <div className={"w_prop_show"}>
                        <p>运费规则说明</p>
                        <p>运费与配送地址相关，最终运费以填写结算页为准</p>
                        <p><button onClick={()=>this.setState({divBlock:'none'})}>我知道了</button></p>
                    </div>
                </div>
                <div className={"w_footer_bar"}>
                    <div>
                        {
                            this.props.carInfo.length > 0 ? <img onClick={this.props.changeAllChecked.bind(this)} src={this.isChecked ? yes : no} alt="" /> : <img src={no} alt="" />
                        }
                        全选
                    </div>
                    <div className={"w_foot_right"}>
                        <div className={"w_foot_total"}>
                            <p>应付:<strong>{sumPrice.toFixed(2)}</strong>   </p>
                            <p>总价:<i>{sumPrice.toFixed(2)}</i> <span>优惠:<i>0.00</i></span></p>
                        </div>
                    </div>
                    <div onClick={()=>{if(this.isChecked){this.setState({divPay:'block'})}else{this.setState({divPay:'none'})}}} className={this.isChecked ? "w_foot_pay2" : "w_foot_pay"}>
                        去结算
                    </div>

                </div>
                <div className={"w_goingback"} style={{display:this.state.divPay}}>
                    <div className={"w_gopay"}>
                        <p>结算 <span onClick={()=>this.setState({divPay:'none'})}>X</span></p>
                        <p>收获地址 <span className={"iconfont icon-up2"}></span></p>
                        <p>优惠券<span className={"iconfont icon-up2"}></span></p>
                        <p>松鼠币抵现 <span className={"iconfont icon-up2"}></span></p>
                        <p>发票 <span className={"iconfont icon-up2"}></span></p>
                        <p>商品清单 <span className={"iconfont icon-up2"}></span></p>
                        <p>留言 <span className={"iconfont icon-up2"}></span></p>
                        <p>支付方式 <span className={"iconfont icon-up2"}></span></p>
                        <p>应付总额 <span className={"iconfont icon-up2"}></span><span><i>{sumPrice.toFixed(2)}</i>(含运费0.00)</span></p>
                        <button>确认付款</button>
                    </div>
                </div>
            </>

        )

        return (
            <>
                {
                    carListRender
                }
            </>

        )
    }
}
function mapStateToProps({shoppingCar}) {
    // console.log(shoppingCar)
    return {
        carInfo:shoppingCar.carInfo,
        isLoading: shoppingCar.isLoading
    }
}
function mapDispatchToPros(dispatch) {
    return {
        getCart(){
            dispatch(getCartList.getCart.call(this))
        },
        changeAllChecked(){
            dispatch(getCartList.changeAllChecked.call(this))
        },
        changeChecked(carId,e){
            e.stopPropagation()
            dispatch(getCartList.changeChecked.call(this,carId))
        },
        addGoods(goodsAll,e){
            e.stopPropagation()
            dispatch(getCartList.joinGoods.call(this,goodsAll))
        },
        removeGoods(defaultGoodsId,e){
            e.stopPropagation()
            dispatch(getCartList.removeGoods.call(this,defaultGoodsId))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToPros)(loading(ShoppingCart))