import React, {Component} from 'react';
import "../../assets/css/fangdan/index.scss"
import bn from "../../assets/img/banner.jpg"
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            remList: []
        }
    }
    handleScrollTop() {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    }
    async componentDidMount() {
        const data = await this.$axios.get("/api/remList")
        console.log(data.remList)
        this.setState({
            remList: data.remList
        })
    }

    render() {
        return (
            <div className={"indexlist"}>
                <div className = {"banner"}>
                    <img className = {"bn"} src = {bn} alt = "" />
                    <img className = {"manjian"}
                         src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/472ddf516d29401fc7ff4d5cdcdda515.jpg"
                         alt = "" />
                </div>
                <div className = {"youhui"}>
                    <li>
                        <img className = {"yhone"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/d7e09f9abd0c0d7196c761ac2b2fa96c.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhtwo"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/5985ab764a5b894b1d14e8ec52f9735b.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhthree"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/f2b4fc7aa0de5cba81a075bd5b7764e1.jpg"
                             alt = "" />
                    </li>
                    <li>
                        <img className = {"yhfour"}
                             src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/990100831e16f3eb403fa3aeddc52b90.jpg"
                             alt = "" />
                    </li>

                </div>
                <div className = {"banner-two"}>
                    <img
                        src = "http://pic10.cdn.3songshu.com:81//assets/upload/article/1a4e5de62be2eb4ffc902094affb3c4d.jpg"
                        alt = "" />
                </div>
                <div className = {"product"}>
                    {
                        this.state.remList.map((v) => {
                            return <Link to={"/categories"} key = {v._id} >
                                <img src = {v.picture} alt = "" />
                            </Link>
                        })
                    }
                </div>
                <div className={"dh"}
                     onClick={this.handleScrollTop}>
                    <img src = "http://m.3songshu.com/resources/images/icon-stick@2x.e197d1fd.png" alt = "" /><i className = "icon cm-icon icon-search"></i>
                </div>
                <div className={"sh"} onClick={()=>{
                    this.props.history.push("/categories/search");
                }}>
                    <img src = "http://m.3songshu.com/resources/images/icon-search-black@2x.d236cbe5.png" alt = "" />
                </div>
                <div className={"wx"}>
                    <img src = "http://m.3songshu.com/resources/images/icon-chat-black@2x.a4950c6d.png" alt = "" />
                </div>
            </div>
        );
    }


}

export default Header;