import React, { Component } from 'react'
import '../assets/css/yemin/shopping.scss'
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import productCreator from '../store/actionCreator/yemin/product'


 class IntegraIIndex extends Component {
  constructor(props){
    super(props)
    this.state={
      productList:[]
    }
  }

  componentDidMount() {
    this.props.getProduct();

}

  render() {
    return (
      <div className="shoping">
        <div className="shop_header">松鼠币商城</div>
        <div className="user-content">
          <p className="my_money">我的松鼠币</p>
          <p className="my_money_number">
            <span className="my_money_span1">0</span>
            <span className="my_money_span2"></span>
          </p>
          <button className="getmoney">赚松鼠币</button>
        </div>
        <div className="my_shop">
          <div className="my_shop_content shop_content">
            <img src="http://m.3songshu.com/resources/images/icon-bag@2x.709b32f7.png" alt=""/>
            <p className="my_shop_content_inner">
              <span className="my_shop_content_top">购物袋</span>
              <span className="my_shop_content_bottom">想要的都在这</span>
            </p>
          </div>
          <div className="my_shop_content">
            <img src="http://m.3songshu.com/resources/images/icon-change-list@2x.d419099a.png" alt=""/>
            <p className="my_shop_content_inner">
              <span className="my_shop_content_top">我的兑换</span>
              <span className="my_shop_content_bottom">查看松鼠币兑换订单</span>
            </p>
          </div>
        </div>
        <div className="floor-item-title">兑换中心1</div>
        <div className="dui_goods">      
          {(this.props.productList)&&(this.props.productList).map(v=>(
             <li  className="dui_goods_content" key={v.id}>
             <img src={v.pic} alt=""/>
              -<p className="title sl">{v.name}</p>
             <p className="rules sl">每人限兑{v.limit} 件</p>
          <p className="number sl"><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>{v.integralAmout}</p>
         </li>
          ))}
        </div>
          <div className="newGoods">
            <img src="http://pic10.cdn.3songshu.com:81//assets/upload/adv/59946be4ef6fec8bfd0e072e2c5f364b.jpg" alt=""/>
          </div>
          <div className=" dui_goods newgoods_content">
          {(this.props.goodsList)&&(this.props.goodsList).map(v=>(
             <li  className="dui_goods_content" key={v.id}>
             <img src={v.pic} alt=""/>
              -<p className="title sl">{v.name}</p>
             <p className="rules sl">数量有限，兑完为止</p>
          <p className="number sl"><span style={{marginLeft:".2rem"}}>{this.$filters.currency(v.price)}</span><img src="http://m.3songshu.com/resources/images/icon-privilege-active@2x.42428eaa.png"/>{v.integralAmout}</p>
         </li>
          ))}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    productList:state.product.productList,
    goodsList:state.product.goodsList
  }
}

export default connect(mapStateToProps,dispatch=>bindActionCreators(productCreator,dispatch))(IntegraIIndex);