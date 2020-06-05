import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/yemin.scss'
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      src1:"http://m.3songshu.com/resources/images/login-pwd-blur.5f488ea3.png",
      src2:"http://m.3songshu.com/resources/images/login-pwd-focus.6ed81267.png",
      src:"http://m.3songshu.com/resources/images/login-pwd-blur.5f488ea3.png",
      userTel:"手机号",
      userPwd:"请输入密码",
      usertip:"",
      flag:true,
      isUse:true,
    }
  }
  changeImg(){
    setInterval(()=>{
      if(this.state.src===this.state.src1){
        this.setState({
          src:this.state.src2
        })
      }else if(this.state.src===this.state.src2){
        this.setState({
          src:this.state.src1
        })
      }
    },3000)
  }
  
  isBut=()=>{
    const {userTel,userPwd,isUse}=this.state
    if(userTel&&userPwd){
      this.setState({
        isUse:false,
      })
    }else{
      this.setState({
        isUse:true,
      })
    }
  }

  changeHander=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    this.isBut()
  } 

  change=(e)=>{
    this.setState({
      [e.target.name]:""
    })
    this.isBut()
  }

  change1=(e)=>{
    e.target.type="password"
    this.setState({
      [e.target.name]:""
    })
    this.isBut()
  }

  async login(){
    const {userTel,userPwd,flag,usertip}=this.state
    const data=await this.$axios.post("/api/login",{
      userTel,
      userPwd
    })
  if(data.ok===1){
    localStorage.setItem("userName",data.userInfo.userTel);
    this.props.history.push("/user")
  }else{
    this.setState({
      flag:false,
      usertip:data.msg
    })
  }
}

  componentDidMount(){
    this.changeImg();
  }

  isShow=()=>{
    this.setState({
      flag:true,
    })
  }

  render() {
    const {src,userTel,userPwd,usertip,flag,isUse}=this.state
    return (
      <div>
        <Header title="登录" ></Header>
        <div className="login">
          <div className="header_img">
            <img src={src} alt=""/>
          </div>

          <div className="login_input">
           <p><i className="iconfont icon-wode"></i><input type="text" name="userTel" id="" value={userTel} onChange={this.changeHander} onFocus={this.change}/></p>
           <p><i className="iconfont icon-mima"></i><input type="type" name="userPwd" id="" value={userPwd} onChange={this.changeHander} onFocus={this.change1}/></p>
          </div>
          <button className="btn_login" onClick={this.login.bind(this)} disabled={isUse} style={{backgroundColor:isUse?"#cecece":"#77bc1f"}}>登录</button>
          <p className="login_bottom"><span className="login_bottom_span1" onClick={()=>{this.props.history.push("/regist")}}>快速注册</span><span className="login_bottom_span2" onClick={()=>{this.props.history.push("/loginRetrievePassword")}}>忘记密码？</span></p>
        </div>
        <div className="tip" style={{display:flag?"none":"block"}} onClick={this.isShow}>
          <span className="usertip">{usertip}</span>
        </div>
      </div>
    )
  }
}
