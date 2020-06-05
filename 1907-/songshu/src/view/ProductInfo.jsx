import React, { Component } from 'react'
import  "../assets/css/wk/productInfo.css"
import loading from "../components/common/Loading"
import Swiper from "swiper"
import "swiper/css/swiper.css"
class ProductInfo extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            pics: [],
            saleCount: null,
            marketPrice: null,
            salesPrice: null,
            goodsMatch: [],
            isLoading: true,
            //评价
            eval: [],
            buyNum: localStorage.buyNum || null,
        }
    }
    async joinCar() {
        const abc = await this.$axios.get("/api/getCarList", {
            params: {
                defaultGoodsId: this.props.match.params.goodsId,
                productId: this.props.match.params.productId
            }
        })
        console.log(abc)
        const joinList = await this.$axios.get('/api/joinCar', {
            params: {
                goodsAll: abc.carInfo,
                userName: localStorage.userName
            }
        })
        // console.log(joinList)
        if (joinList.ok === 1) {
            let total = 0;
            joinList.carList.forEach(v => {
                total += v.buyNum
            })
            this.setState({
                buyNum: total
            })
            localStorage.buyNum = total;
        }
    }
    //商品详情
    async getDetail(goodsId=this.props.match.params.goodsId,productId=this.props.match.params.productId){
        this.setState({
            isLoading: true
        })
        // const goodsId = ;
        // const productId = ;
        //商品详情
        const { data } = await this.$axios({
            url: "/songshu/mobile/api/product/baseInfo",
            headers: { "appkey": "ef1fc57c13007e33" },
            params: {
                param: { "goodsId": goodsId, "productId": productId }
            }
        })
        console.log(data)
        this.setState({
            name: data.name,
            pics: data.pics,
            isLoading: false
        },()=>{
            //轮播
            new Swiper ('.swiper-container', {
                direction: 'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay:{
                    disableOnInteraction: false,
                },
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        })
    }
    //点击推荐商品显示详情
    async tuijian(id){
        this.getDetail(id)
        this.getGoodsmatch(id)
    }
    //推荐
    async getGoodsmatch(goodsId=this.props.match.params.goodsId,productId=this.props.match.params.productId){
        const res2 = await this.$axios({
            url: "/songshu/mobile/api/product/getGoodsMatch",
            headers: { "appkey": "ef1fc57c13007e33" },
            params: {
                param: { "goodsId": goodsId, "productId": productId }
            }
        })
        // console.log(res2)
        this.setState({
            goodsMatch: res2.data,
        })
    }
    async componentDidMount() {

        const goodsId = this.props.match.params.goodsId;
        const productId = this.props.match.params.productId;
        this.getDetail();
        // console.log(this.props.match.params)
        // 商品价格销量
        const res = await this.$axios({
            url: "/songshu/mobile/api/product/getGoods",
            headers: { "appkey": "ef1fc57c13007e33" },
            params: {
                param: { "goodsId": goodsId, "productId": productId }
            }
        });
        // console.log(res.data)
        this.setState({
            saleCount: res.data.saleCount,
            marketPrice: res.data.marketPrice.value,
            salesPrice: res.data.salesPrice.value
        });

        //松鼠推荐
        this.getGoodsmatch();
        //评价
        const res3 = await this.$axios({
            url: "/songshu/mobile/api/remark/list",
            headers: { "appkey": "ef1fc57c13007e33" },
            params: {
                param: { "type": 0, "productId": productId, "page": 1, "pageCount": 3 }
            }
        })
        // console.log(res3.data.items)
        if (res3.data.items) {
            this.setState({
                eval: res3.data.items,
            })
        } else {
            this.setState({
                eval: [],
            })
        }
    }
    //收藏
    async joinCollect() {
        const goodsId = this.props.match.params.goodsId
        const collect = await this.$axios.post("/api/joinCollect", {
            goodsId,
            userName:localStorage.userName
        });
        // console.log(collect)
        if(collect.ok===1){
            alert(collect.msg)
        }else{
            alert(collect.msg)
        }
    }

    render() {
        return (
            <>
                <div className={"w_product_all"}>
                    <div className={"w_header_top"}>
            <span onClick={() => { this.props.history.go(-1) }} className={" iconfont icon-zuo"} >
            </span>
                        <p>商品详情</p>
                        <span></span>
                    </div>
                    <div className={"w_product_info"}>
                        <div  className="swiper-container">
                            <div className="swiper-wrapper">

                                {
                                    this.state.pics.map((v,i)=>(
                                        <div className="swiper-slide" key={i}>
                                            <img  src={v} alt=""/>
                                        </div>
                                    ))
                                }
                            </div>
                            {/*{ 如果需要分页器 }*/}
                            <div className="swiper-pagination"></div>

                        </div>
                        {/*<div className={style.slider_box}>*/}
                        {/*  <img src={this.state.pics[0]} alt="" />*/}
                        {/* */}
                        {/*</div>*/}
                        <div className={"w_info_box"}>
                            <p>{this.state.name}</p>
                            <div>
                                <span>{this.$filters.currency(this.state.salesPrice/1)}<i>{this.$filters.currency(this.state.marketPrice/1)}</i></span>
                                <strong>总销量&nbsp;&nbsp;{this.state.saleCount}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                {/*评价*/}
                <div style={{ display: this.state.eval.length > 0 ? 'block' : 'none' }} className={"w_comment_lsit"}>

                    <div className={"w_comment_top"} >
                        <p>主人说</p>
                        <div className={"w_comment_right"} >
                            <p>好评率</p>
                            <p>99%</p>
                            <span className={"iconfont icon-zuo1"}></span>
                        </div>
                    </div>
                    <div className={"w_info_total"}>
                        <ul>
                            {

                                this.state.eval.map(v => (
                                    <li key={v.id}>
                                        <div className={"w_info_top"}>
                                            <img src={v.userPic} alt="" />
                                            <div className={"w_info_row"}>
                                                <div className={"w_info_use"}>
                                                    <p>{v.userName}</p>
                                                    <span>{v.time}</span>
                                                </div>
                                                <div>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                    <i className={"iconfont icon-xingxing1"}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={"w_info_p"}>{v.content}</p>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
                {/*  松鼠推荐*/}
                <div className={"w_product_tui"}>
                    <p className={"w_recommend_title"}>松鼠推荐</p>
                    <div className={"w_recommendGoods"}>
                        <ul className={"w_item_cont"}>
                            {
                                this.state.goodsMatch.map(v => (
                                    <li onClick={this.tuijian.bind(this,v.id)}  key={v.id}>
                                        <div className={"w_item_img"}>
                                            <img src={v.thumbUrl} alt="" />
                                        </div>
                                        <p className={"w_item_title"}>{v.productName}</p>
                                        <p className={"w_item_title_ng"}>{v.alias}</p>
                                        <p className={"w_item_price"}><span>{v.matchPrice}</span><i>{v.marketPrice}</i></p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {/*底部导航*/}
                <div className={"w_footer_nav"}>
                    <ul className={"w_footer_bar1"}>
                        <li onClick={() => { this.props.history.push('/shoppingCart') }}>
              <span className={"iconfont icon-gouwuche"}>
                <i> {this.state.buyNum}</i>
              </span>
                            <p>购物车</p>
                        </li>
                        <li  onClick={this.joinCollect.bind(this)}>
                            <span className={"iconfont icon-shoucang"}></span>
                            <p>收藏</p>
                        </li>
                        <li onClick={this.joinCar.bind(this)}>
                            加入购物车
                        </li>
                        <li>
                            立即购买
                        </li>
                    </ul>
                </div>

            </>
        )
    }
}
export default loading(ProductInfo)
