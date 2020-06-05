import React, {Component} from 'react'
import "../assets/css/fangdan/orderlist.scss"
import {NavLink} from "react-router-dom";
import MyRouter from "../components/common/MyRouter";

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <div className = {"head"}>
                    <p onClick = {() => {
                        this.props.history.push("/user")
                    }}>
                        <i className = {"iconfont icon-zuo"}></i>
                        <span className = {"name"}>我的订单</span>
                    </p>
                </div>
                <div className = {"select"}>
                    {
                        this.props.childrends.map(v => {
                            return (
                                <p>
                                    <NavLink key = {v.path} to = {v.path} exact = {v.exact} className = {"select-link"}
                                             activeClassName = {"select-active"}>{v.navname}</NavLink>
                                    {/*<span className={"bk"}></span>*/}
                                </p>

                            )
                        })
                    }


                </div>
                <MyRouter router = {this.props.childrends}></MyRouter>
            </div>
        )
    }
}
