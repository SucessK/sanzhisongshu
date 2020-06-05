import React, { Component } from 'react'
import '../assets/css/yemin/user.scss'
export default class User extends Component {
  constructor(props){
    super(props)
    this.state={
      src:'http://pic10.cdn.3songshu.com:81//assets/upload/avatar/672249f8e6f6bb9f8db9dd8a501a34dc.jpg',
      userName:"请登录"
    }
  }
  componentDidMount(){
    if(localStorage.userName){
      let tempname="";
      let username=localStorage.userName.split("").splice(0,3);
      tempname=username.push("****")
      console.log(username.concat(localStorage.userName.split("").splice(7,4)).join(""))
      this.setState({
        userName:username.concat(localStorage.userName.split("").splice(7,4)).join("")
      })
    }
  }
  render() {
    return (
      <div className="user">
        <div className="user_box">
          <div className="usercontent">
            <div className="user_img">
              <img src={this.state.src} alt=""/>
            </div>
            <p >{this.state.userName}</p>
            <p>账户管理，收货地址<i className="iconfont icon-zuo1"></i></p>
          </div>
          <div className="user_like">
              <p><span>0</span><span className="user_like_content" onClick={()=>{this.props.history.push("/collectionList")}}>我的收藏夹</span></p>
              <p><span><i className="iconfont icon-jifenshangchengb"></i>0</span><span className="user_like_content">我的松鼠币</span></p>
          </div>
        </div>

        <div className="myOrder">
          <li className="myOrder_title"><span className="myOrder_icon"><i className="iconfont icon-dingdan"></i>我的订单</span><span className="myOrder_name"  onClick={()=>{this.props.history.push("/orderList")}}>查看全部订单<i className="iconfont icon-zuo1"></i></span></li>
          <ul  className="myOrder_content">
            <li  onClick={()=>{this.props.history.push("/orderList")}}><span className="iconfont icon-daifukuan"></span><span>待付款</span></li>
            <li  onClick={()=>{this.props.history.push("/orderList")}}><span className="iconfont icon-daifahuo"></span><span>待发货</span></li>
            <li  onClick={()=>{this.props.history.push("/orderList")}}><span className="iconfont icon-daishouhuo"></span><span>待收货</span></li>
            <li  onClick={()=>{this.props.history.push("/orderList")}}><span className="iconfont icon-daipingjiab"></span><span>待评价</span></li>
            <li  onClick={()=>{this.props.history.push("/orderList")}}><span className="iconfont icon-querentuikuan"></span><span>退款/售后</span></li>
          </ul>
        </div>

        <div className="my_money">
          <div className="my_money_content">
            <li className="myOrder_title"><span className="myOrder_icon"><i className="iconfont icon-youhuiquan"></i>我的优惠券</span><span className="myOrder_name" >0张<i className="iconfont icon-zuo1"></i></span></li>
            <li className="myOrder_title"><span className="myOrder_icon"><i className="iconfont icon-tuijianyoujiang2-copy"></i>推荐有奖</span><span className="myOrder_name"><i className="iconfont icon-zuo1"></i></span></li>
          </div>
          <div className="my_money_content">
            <li className="myOrder_title"><span className="myOrder_icon"><i className="iconfont icon-zaixiankefu"></i>在线客服</span><span className="myOrder_name" >0张<i className="iconfont icon-zuo1"></i></span></li>
            <li className="myOrder_title"><span className="myOrder_icon"><i className="iconfont icon-bangzhuyufankui"></i>帮助与反馈</span><span className="myOrder_name"><i className="iconfont icon-zuo1"></i></span></li>
            <li className="myOrder_title myOrder_title_last"><span className="myOrder_icon"><i className="iconfont icon-shezhi"></i>设置</span><span className="myOrder_name" onClick={()=>{this.props.history.push("/userSetting")}}>关于我们<i className="iconfont icon-zuo1"></i></span></li>
          </div>
        </div>
      </div>
    )
  }
}
