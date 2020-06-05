import React, {Component} from 'react'
import {NavLink, Route,Switch,Redirect} from "react-router-dom";
import "../assets/css/fangdan/index.scss"
import Header from "../components/fangdan/header";
export default class Index extends Component {
    render() {
        return (
            <div>
                <header>
                    <NavLink to={"/"}>推荐</NavLink>|
                    <NavLink to={"/categories"}>坚果/果干</NavLink>|
                    <NavLink to={"/categories"}>量贩组合</NavLink>|
                    <NavLink to={"/categories"}>肉脯/海鲜</NavLink>|
                    <NavLink to={"/categories"}>休闲零食</NavLink>|
                    <NavLink to={"/categories"}>潮礼</NavLink>|
                    <NavLink to={"/categories"}>茶饮</NavLink>|
                    <NavLink to={"/categories"}>周边</NavLink>|
                </header>
                     <Route path={"/"} component={Header}></Route>
            </div>

        )
    }
}
