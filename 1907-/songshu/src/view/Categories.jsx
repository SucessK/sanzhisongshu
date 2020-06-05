import React, { Component } from "react";
import categories from "../assets/css/wangjie/categories.module.scss";
// import MyRouter from "../components/common/MyRouter"

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      num: 0,
      discoverList: [],
      categoryList: [],
      categoryData: [],
    };
    this.navScroll = "";
  }
  //获取页面数据请求函数
  async getDataList({ id = 0, depth, type } = {}) {
    const { data } = await this.$axios.get(
      "/songshu/mobile/api/navigation/listNew",
      {
        params: {
          param: { id, depth, type },
        },
        headers: {
          appkey: "ef1fc57c13007e33",
        },
      }
    );
    if (id == 0) {
      return data;
    } else {
      this.setState({ categoryData: data });
    }
  }
  //设置分类列表
  async setCategory() {
    const categoryList = await this.getDataList({ depth: 0, type: 1 });
    this.setState({ categoryList });
  }
  //设置发现列表
  async setDiscover() {
    const discoverList = await this.getDataList({ depth: 1, type: 2 });
    this.setState({ discoverList });
  }
  async componentDidMount() {
    const categoryList = await this.getDataList({ depth: 0, type: 1 });
    this.setState({ categoryList }, async () => {
      const categoryData = await this.getDataList({
        id: "100100010",
        depth: 1,
        type: 1,
      });
    });
  }
  render() {
    return (
      <div className={categories.root}>
        {/* 顶部导航 */}
        <div className={categories.nav}>
          <ul>
            <li
              className={this.state.index === 0 ? categories.activeLi : ""}
              onClick={() => {
                this.setState({ index: 0 });
                this.setCategory();
              }}
            >
              分类
            </li>
            <li
              className={this.state.index === 1 ? categories.activeLi : ""}
              onClick={() => {
                this.setState({ index: 1 });
                this.setDiscover();
              }}
            >
              发现
            </li>
          </ul>
          <button
            onClick={() => {
              this.props.history.push("/categories/search");
            }}
          ></button>
        </div>
        {/* 分类分页 */}
        <div
          style={{ display: this.state.index === 0 ? "block" : "none" }}
          className={categories.tab1}
        >
          {/* 左侧导航栏 */}
          <div className={categories.nav_L} ref={(el) => (this.navScroll = el)}>
            <ul>
              {this.state.categoryList.map((v, i) => (
                <li
                  key={v.id}
                  className={this.state.num === i ? categories.activeLi : ""}
                  onClick={() => {
                    this.setState({ num: i });
                    this.getDataList({ id: v.id, depth: 1, type: 1 });
                  }}
                >
                  <div>{v.name}</div>
                </li>
              ))}
            </ul>
          </div>
          {/* 右侧产品栏 */}
          <div className={categories.content}>
            <ul>
              {this.state.categoryData.map((v) => (
                <li
                  key={v.id}
                  // onClick={()=>{this.props.history.push("/productList/"+v.name+v.params.url)}}
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/productList",
                      state: {
                        title: v.name,
                        url: v.params.url,
                      },
                    });
                  }}
                >
                  <div>
                    <img src={v.pic} alt="" />
                  </div>
                  <p>{v.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 发现页面 */}
        <div
          style={{ display: this.state.index === 1 ? "block" : "none" }}
          className={categories.tab2}
        >
          <ul>
            {this.state.discoverList.map((v) => (
              <li
                key={v.id}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/productList",
                    state: {
                      title: v.name,
                      url: v.params.url,
                    },
                  });
                }}
              > 
                <img src={v.pic} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
