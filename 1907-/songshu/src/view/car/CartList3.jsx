import React, {Component} from 'react';
import style from "../../assets/css/wk/cartList.module.css"
import loading from "../../components/common/Loading"
import noGoods from "../../assets/img/noGoods.png"
import {
    connect
} from "react-redux"
import actionCreate from "../../store/actionCreator/wk/cartList/index"
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            isLoading:true,
            keyword:'',
            buyNum:localStorage.buyNum||null,
            selected:""
        };
    }
    componentWillUnmount() {
        this.setState = ()=>false;
    }
    //点击搜索
    getSearch(){
        // console.log(this.state.keyword.value)
        this.props.joinCarList(1,0,5,this.state.keyword.value)
    }
    //回到顶部
    handleScrollTop = () => {
        let timer = null;
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn () {
            const osTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (osTop > 0) {
                window.scrollTo(0, osTop - 90);
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer)
            }
        })
    }
    componentDidMount() {
        this.props.joinCarList.call(this,1,0,5,"")
        console.log(this.props)
    }
    // change (e){
    //     this.setState({
    //         selected:"bounceOut"
    //     })
    //
    //
    //
    // }
    // handleAnimationEnd = ()=>{
    //     this.setState({
    //         selected: ''
    //     });
    // }
    // changCar(v,e){
    //     e.stopPropagation()
    //     console.log(111)
    //     this.change()
    // }
    render() {
        let that = this;
        return (
            <>

                <div className={style.car_all}>
                    <div className={style.header_bar}>
                        <span onClick={()=>{this.props.history.go(-1)}} className={"iconfont icon-zuo"}></span>
                        <div className={style.search}>
                            <span className={"iconfont icon-sousuo"}></span>
                            <input ref={(ref)=>{this.state.keyword = ref}} type="text" placeholder={"好吃的零食都在这~"}/>
                        </div>
                        <p onClick={this.getSearch.bind(this)}>搜索</p>
                    </div>
                    <div className={style.list_filter}>
                        <button>
                            <span className={this.state.index===0?style.w_active:""} onClick={this.props.joinCarList.bind(this,1,0,5,"")}>新品</span>
                            <strong style={{display:this.state.index===0?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.state.index===1?style.w_active:""} onClick={this.props.joinCarList.bind(this,1,1,1,"")}>热卖</span>
                            <strong style={{display:this.state.index===1?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.state.index===2?style.w_active:""} onClick={this.props.joinCarList.bind(this,1,2,3,"")}>价格</span>
                            <div>
                                <i className={this.state.index===2?style.i1:''}></i>
                                <p ></p>
                            </div>
                            <strong style={{display:this.state.index===2?'block':'none'}}></strong>
                        </button>
                    </div>
                </div>

                {/*主体渲染内容*/}
                <div  className={style.product_block} >
                    <img src={this.props.items.length<=0?noGoods:''} alt=""/>
                    {
                        this.props.items.map((v)=>(

                            <div onClick={()=>{ this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}} style={{display:this.state.index===0?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{this.$filters.currency(v.salesPrice.value/1)}</span>
                                        <i>{this.$filters.currency(v.marketPrice.value/1)}</i>
                                    </p>
                                    <strong
                                        onClick={this.props.addCartList.bind(this,v)}
                                        onAnimationEnd={this.handleAnimationEnd}
                                        className={`iconfont icon-gouwuche animate__animated animate__${this.state.selected}` }></strong>
                                </div>
                            </div>
                        ))

                    }
                    {

                        this.props.items.map(v=>(
                            <div onClick={()=>{this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}}  style={{display:this.state.index===1?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{this.$filters.currency(v.salesPrice.value/1)}</span>
                                        <i>{this.$filters.currency(v.marketPrice.value/1)}</i>
                                    </p>
                                    <strong onClick={this.props.addCartList.bind(this,v)} className={"iconfont icon-gouwuche" }></strong>
                                </div>
                            </div>
                        ))

                    }
                    {

                        this.props.items.map(v=>(
                            <div onClick={()=>{this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}}  style={{display:this.state.index===2?'block':'none'}} className={style.item_cont} key={v.id}>
                                <div className={style.item_img}>
                                    <img src={v.pic} alt=""/>
                                </div>
                                <p>{v.name}</p>
                                <div className={style.item_price}>
                                    <p>
                                        <span>{this.$filters.currency(v.salesPrice.value/1)}</span>
                                        <i>{this.$filters.currency(v.marketPrice.value/1)}</i>
                                    </p>
                                    <strong onClick={this.props.addCartList.bind(this,v)} className={"iconfont icon-gouwuche" }></strong>
                                </div>
                            </div>
                        ))

                    }
                </div>

                <div className={style.button_car} onClick={()=>{this.props.history.push('/shoppingCart')}} >
                    <span className={"iconfont icon-gouwuche" }></span>

                    <i>{this.state.buyNum}</i>
                </div>
                <div className={style.button_btn}>
                    <div className={style.button_top} onClick={this.handleScrollTop.bind(this)}>
                        <p className={"iconfont icon-arrow-top"}></p>
                        <p >顶部</p>
                    </div>
                    <div className={style.button_section}>
                        <span className={"iconfont icon-zaixiankefu"}></span>
                    </div>
                </div>
            </>
        )
    }
}
function mapStateToProps({cartListInfo}) {
    // console.log(cartListInfo)
    return {
        items:cartListInfo.items,
        isLoading:cartListInfo.isLoading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        joinCarList(page=1,index=0,order=5,keyword=""){
            dispatch(actionCreate.joinCarList.call(this,page,index,order,keyword))
        },
        addCartList(goodsAll,e){
            e.stopPropagation();
            dispatch(actionCreate.addCarList.call(this,goodsAll))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(loading(CartList))