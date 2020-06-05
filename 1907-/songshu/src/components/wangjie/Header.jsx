import React, { Component } from "react";
import header from "../../assets/css/wangjie/header.module.scss";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  changeHandler(e) {
    let bindValue = e.target.value;
    if (e.target.type === "checkbox") {
      const index = this.state.hobby.findIndex((v) => v == e.target.value);
      if (index > -1) this.state[e.target.name].splice(index, 1);
      else this.state[e.target.name].push(e.target.value);
      bindValue = this.state[e.target.name];
    }
    this.setState({
      [e.target.name]: bindValue,
    });
  }
  render() {
    return (
      <div className={header.header}>
        <ul>
          <li>
            <button
              className={header.btn_l}
              onClick={() => {
                this.props.history.go(-1);
              }}
            >
              <i className={"iconfont icon-zuo"}></i>
            </button>
          </li>
          <li>
            <i className={"iconfont icon-sousuo"}></i>
            <input
              type="text"
              name={"keyword"}
              value={this.state.keyword}
              onChange={this.changeHandler.bind(this)}
              placeholder={"好吃的零食都在这~"}
            />
          </li>
          <li>
            <button
              className={header.btn_r}
              onClick={() => {
                const keyword = this.state.keyword;
                this.props.getGoodsList({ keyword });
              }}
            >
              搜索
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
