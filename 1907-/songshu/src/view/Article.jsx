import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/user.scss'

export default class Article extends Component {
  render() {
    return (
      <div>
         <Header title="设置"></Header>
         <div className="artical">
          <img src={require('../assets/img/artical.jpg')} alt=""/>
        </div>
      </div>
    )
  }
}
