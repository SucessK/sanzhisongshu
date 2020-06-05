import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/user.scss'
export default class UserSetting extends Component {
  tui=()=>{
    localStorage.removeItem("username")
    this.props.history.push("/login")
  }
  render() {
    return (
      <div className="user_setting">
         <Header title="设置"></Header>
         <div className="setting">
           <li className="myOrder_title"><span className="myOrder_icon">关于三只松鼠</span><span className="myOrder_name" onClick={()=>{this.props.history.push("/article")}}>4.0.6<i className="iconfont icon-zuo1"></i></span></li>
         </div>
         <button className="tui_button" onClick={this.tui}>退出当前账号</button>
      </div>
    )
  }
}
