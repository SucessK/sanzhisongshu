import React, { Component } from 'react'
import MyRouter from "../components/common/MyRouter";
import '../App.scss';
import {
  NavLink
} from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  render() {
    return (
      <div>
        <nav>
          {
            this.props.childrends.map(v=>(
            <NavLink key={v.path} exact={v.exact} className={"App-link"} activeClassName={"App-active"} to={v.path}><p className="nav_top"><i className={v.iconClass}></i></p><p className="nav_bottom">{v.navname}</p></NavLink>
          ))
          }
        </nav>
        <MyRouter router={this.props.childrends}></MyRouter>
      </div>
    )
  }
}
