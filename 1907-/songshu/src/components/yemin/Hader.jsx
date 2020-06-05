import React, { Component } from 'react'
import '../../assets/css/yemin/yemin.scss'
import {withRouter} from "react-router-dom"
class Hader extends Component {
  render() {
    return (
      <div className="header">
        <i className="print iconfont icon-zuo" onClick={()=>{this.props.history.go(-1)}}></i><h2>{this.props.title}</h2>
      </div>
    )
  }
}
export default withRouter(Hader)