import React, {Component} from 'react';

class Payment extends Component {
    render() {
        return (
            <div>
                <div className={"shop"}>
                    <img src = "http://m.3songshu.com/resources/images/empty.5cc63a32.png" alt = "" />
                    <span>主人，还没有付款商品哦 ~</span>
                </div>
            </div>
        );
    }
}

export default Payment;