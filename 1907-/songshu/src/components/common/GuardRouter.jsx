import React, { Component } from 'react'
import {
  withRouter
} from "react-router-dom"
 class GuardRouter extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  componentDidMount(){
      // console.log(this.props.childrends)
    if(this.props.isAuthorization){
      if(!localStorage.userName){
          this.props.history.push("/login");
      }
  }
  }
  render() {
    return (
      <div>
         <this.props.component {...this.props}/>
      </div>
    )
  }
}
export default withRouter(GuardRouter);