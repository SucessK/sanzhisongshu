import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/user.scss'
import style from "../assets/css/wk/collection.module.css"

export default class Article extends Component {
    constructor() {
        super();
        this.state={
            collectInfo:[]
        }
    }
    render() {
        const {collectInfo} = this.state;
        const collectList = collectInfo.map(v=>(
            <li key={v._id}>
                <div >
                    <img src={v.pic} alt=""/>
                </div>
                <div className={style.item_goods}>
                    <p>{v.name}</p>
                    <p>{v.price}</p>
                    <div>
                        <p>有货</p>
                        <div className={style.icon}>
                            <span className={"iconfont icon-iconset0213"}></span>
                            <span className={"iconfont icon-gouwuche"}></span>
                        </div>

                    </div>
                </div>
            </li>
        ))
        const goodsImg = (
            <div  className="my_love_box">
                <img src={require('../assets/img/noGoods.png')} alt=""/>
            </div>
        )
        return (
            <div>
                <Header title="我的收藏"></Header>

                <div className="my_love">
                    <ul className={style.collection_item}>
                        {
                            collectInfo.length>0?collectList:goodsImg
                        }

                    </ul>

                </div>


            </div>
        )
    }
    async componentDidMount() {
        const data = await this.$axios.get("/api/getCollect");
        console.log(data)
        this.setState({
            collectInfo:data.collectList
        })
    }

}
