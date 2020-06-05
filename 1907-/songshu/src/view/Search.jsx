import React, { Component } from "react";
import Header  from "../components/wangjie/Header"
import search from "../assets/css/wangjie/search.module.scss";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotSearch: [],
    };
  }
  async componentDidMount() {
    const formData = new FormData();
    formData.append("param", '{"count":20}');
    const data = await this.$axios.post(
      "/songshu/mobile/api/keyword/listNew",
      formData,
      {
        headers: {
          appkey: "ef1fc57c13007e33",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    console.log(data);
    this.setState({
      hotSearch: data.data,
    });
  }

  render() {
    return (
      <div className={search.view}>
        {/* 头部 */}
        <Header {...this.props}></Header>
        {/* 内容 */}
        <div className={search.content}>
          {/* 热门搜索 */}
          <div className={search.hot}>
            <h3>热门搜索</h3>
            <div>
              {this.state.hotSearch.map((v, i) => (
                <button className={v.keyWordType===1?search.isRed:""} key={i}>{v.content}</button>
              ))}
            </div>
          </div>
          {/* 历史记录 */}
          <div className={search.history}>
            <h3>历史记录</h3>
            <div>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
              <p>我是搜索内容</p>
            </div>
          </div>
          <button className={search.clear}>清空历史记录</button>
        </div>
      </div>
    );
  }
}
