import React, {Component} from 'react';
import timg from "../../assets/img/wk/timg.gif"
import style from "../../assets/css/wk/cartList.module.css"
export default function (MyCom) {
    class My extends MyCom{
        render(){
            return (
                <React.Fragment>
                    {
                        (this.props.isLoading||this.state.isLoading)?<div className={style.w_div}><img className={style.w_loading} src={timg} alt=""/></div>:super.render()
                    }
                </React.Fragment>
            )
        }
    }
    return My
}
// export default class Loading extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     render() {
//         return (
//             <div>
//              加载中....
//             </div>
//         )
//     }
// }