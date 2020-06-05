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
            isLoading:true,
            keyword:'',
            buyNum:localStorage.buyNum||null,
            waterfallLeft:[],
            waterfallRight:[]
        };
        this.switch = true;
        this.reLeft = null;
        this.reRight = null;
        this.divCar = null;
    }
    componentWillUnmount() {
        // window.removeEventListener('scroll', this.handleScroll);

        this.props.resetPage();
        this.setState = (state, callback) => {
            return
        }
    }
    //点击搜索
    getSearch(){
        // console.log(this.state.keyword.value)
        this.props.joinCarList(this.props.page,this.props.index,this.props.order,this.state.keyword.value)
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

    goCssAnimate(e){
        e.stopPropagation()
        //起始点
        var startPoint = {
            x: e.pageX ,
            y: e.pageY
        }
        // console.log(startPoint.y)
        //结束点

        var endPoint = {
            x: this.divCar.offsetLeft +10,
            y: this.divCar.offsetTop+10
        }
        console.log(this.divCar.style)
        //最高点
        var topPoint = {
            x: startPoint.x -50 ,
            y: startPoint.y -50
        }
        //y=a*x^2+b*x+c;依据上述三点求出系数
        var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x)
            - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x))
            /
            ((startPoint.x * startPoint.x - endPoint.x * endPoint.x)
                * (startPoint.x - topPoint.x)
                - (startPoint.x * startPoint.x - topPoint.x * topPoint.x)
                * (startPoint.x - endPoint.x));
        var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x))
            / (endPoint.x - startPoint.x);
        var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
        //创建一个商品
        function drawBall() {
            var ballDom = document.createElement("div");
            ballDom.style.fontSize = "0.5rem";
            ballDom.style.color = "rgb(0,128,0)";

            ballDom.style.position = "absolute";
            return ballDom;
        }
        var ballDom = drawBall();
        var x = startPoint.x;
        var y = startPoint.y;
        // console.log(x,y,endPoint.x,)
        ballDom.style.top = y + "px";
        ballDom.style.left = x + "px";
        ballDom.classList.add('iconfont','icon-gouwuche')
        document.body.appendChild(ballDom);
        // console.log(ballDom.style)
        var timer = setInterval(function () {
            if (x < endPoint.x) {
                clearInterval(timer);
                ballDom.remove();
            } else {

                x -= 5;
                ballDom.style.left = x + 'px';
                ballDom.style.top = a * x * x + b * x + c + 'px';
            }

        }, 35)
        // this.props.addCartList.bind(this,v)
    }
    componentDidMount() {
        console.log(this.props)
        // window.addEventListener('scroll', this.handleScroll,);
            this.props.joinCarList.call(this,this.props.page,this.props.index,this.props.order,"")

        window.onscroll = ()=>{
            let maxScrollHeight = document.documentElement.scrollTop||document.body.scrollTop; //滚动高度
            let clientHeight = document.documentElement.clientHeight||document.body.clientHeight;//可视高度
            //假设左边盒子高度最小
            let minDiv = this.reLeft;
            if(minDiv){
                let minDivHeight = this.reLeft.scrollHeight;
                if(this.reLeft.scrollHeight>this.reRight.scrollHeight){
                    minDivHeight = this.reRight.scrollHeight;
                }
                if(maxScrollHeight > minDivHeight - clientHeight){
                    if(this.switch){
                        this.switch = false; //满足条件，先关闭开关，
                       this.props.joinCarList.call(this,this.props.page,this.props.index,this.props.order,"")

                    }
                }
            }
        }
    }
    render() {
        let that = this;
        return (
            <>
                <div className={style.car_all}>
                    <div className={style.header_bar}>
                        <span onClick={()=>{this.props.history.go(-1)}} className={"iconfont icon-zuo"}></span>
                        <div className={style.search}>
                            <span className={"iconfont icon-sousuo"}></span>
                            <input  type="text" ref={(ref)=>{this.state.keyword = ref}} placeholder={"好吃的零食都在这~"}/>
                        </div>
                        <p onClick={this.getSearch.bind(this)}>搜索</p>
                    </div>
                    <div className={style.list_filter}>
                        <button>
                            <span className={this.props.index===0?style.w_active:""} onClick={async()=>{
                                await  this.props.resetPage.call(this)
                                this.setState({
                                    isLoading:true
                                })
                                await  this.props.joinCarList.call(this,this.props.page,0,5,"")
                            }}>新品</span>
                            <strong style={{display:this.props.index===0?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.props.index===1?style.w_active:""} onClick={async()=>{
                                await this.props.resetPage.call(this)
                                this.setState({
                                    isLoading:true
                                })
                                await this.props.joinCarList.call(this,this.props.page,1,1,"")
                            }}>热卖</span>
                            <strong style={{display:this.props.index===1?'block':'none'}}></strong>
                        </button>
                        <button>
                            <span className={this.props.index===2?style.w_active:""} onClick={async()=>{
                                await this.props.resetPage.call(this)
                                this.setState({
                                    isLoading:true
                                })
                                await this.props.joinCarList.call(this,this.props.page,2,3,"")
                            }}>价格</span>
                            <div>
                                <i className={this.props.index===2?style.i1:''}></i>
                                <p ></p>
                            </div>
                            <strong style={{display:this.props.index===2?'block':'none'}}></strong>
                        </button>
                    </div>
                </div>

                {/*主体渲染内容*/}
                <div className={style.product_content}>
                    {
                        this.props.items.length<=0?<img src={noGoods} alt=""/>:''
                    }
                    <div  className={style.product_block} ref={(dom)=>this.reLeft=dom}>

                        {
                            this.state.waterfallLeft.map((v)=>(

                                <div onClick={((v)=>{
                                    return function () {
                                        that.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')
                                    }
                                })(v)}  className={style.item_cont} key={v.id}>
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
                                            onClick={this.goCssAnimate.bind(this)}
                                            className="iconfont icon-gouwuche" ></strong>
                                    </div>
                                </div>
                            ))

                        }


                    </div>
                    <div  className={style.product_block} ref={(dom)=>this.reRight=dom}>
                        {
                            this.state.waterfallRight.map((v)=>(

                                <div onClick={()=>{ this.props.history.push('/productInfo/'+v.defaultGoodsId+'/'+v.id+'.html')}}  className={style.item_cont} key={v.id}>
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

                    </div>
                </div>

                <div
                    ref={(dom)=>{this.divCar = dom}}
                    className={style.button_car} onClick={()=>{this.props.history.push('/shoppingCart')}} >
                    <span  className={"iconfont icon-gouwuche" }></span>

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
        page:cartListInfo.page,
        index:cartListInfo.index,
        order:cartListInfo.order
    }
}
function mapDispatchToProps(dispatch) {
    return {
        resetPage(){
            dispatch(actionCreate.resetPage.call(this))
        },
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