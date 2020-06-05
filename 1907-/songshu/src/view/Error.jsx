import React, { Component } from 'react'

export default class Error extends Component {
  render() {
    return (
      <div className="error">
        <img src={require('../assets/img/error.jpg')} alt=""/>
      </div>
    )
  }
}
