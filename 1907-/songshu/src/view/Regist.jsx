import React, { Component } from 'react'
import Header from '../components/yemin/Hader'
import '../assets/css/yemin/yemin.scss'
export default class Regist extends Component {
  constructor(props) {
    super(props);
    this.state={
      userTel:"请输入手机号",
      userCode:"请输入验证码",
      userPwd:"请输入密码",
      userNeedCode:"获取验证码",
      usertip:"",
      flag:true,
      isUse:true,
    }
  }

  isBut=()=>{
    const {userTel,userCode,userPwd,isUse}=this.state
    if(userTel&&userCode&&userPwd){
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

  isShow=()=>{
    this.setState({
      flag:true,
    })
  }

  async regist(){
    const {userTel,userCode,userPwd,userNeedCode,usertip,flag}=this.state
    var phoneReg=/^1[3456789]\d{9}$/;
    var pwdReg = /^[\w$]{6,20}$/;
    var codeReg = new RegExp(userNeedCode, "ig");
    if(userNeedCode=="获取验证码"){
      this.setState({
        flag:false,
        usertip:"请获取验证码"
      })
    }else{
      if(phoneReg.test(userTel)){
        if(codeReg.test(userCode)){
          if(pwdReg.test(userPwd)){
            const data=await this.$axios.post("/api/regist",{
              userTel,
              userPwd
            });
            if(data.ok===1){
              this.props.history.push("/login")
            }else{
              this.setState({
                flag:false,
                usertip:data.msg
              })
            }
          }else{
            this.setState({
              flag:false,
              usertip:"密码为长度需要在6-12位之间的任意字符"
            })
          }
        }else{
          this.setState({
            flag:false,
            usertip:"验证码输入错误"
          })
        }
      }else{
        this.setState({
          flag:false,
          usertip:"您输入的手机格式不正确"
        })
      }
    }
  }

  async getCode(){
    const data=await this.$axios.get("/api/sentCode");
    this.setState({
      userNeedCode:data.code
    })
  }

  async componentDidMount(){
   
  }
  render() {
    const {userTel,userCode,userPwd,userNeedCode,usertip,flag,isUse}=this.state
    return (
      <div>
        <Header title="快速注册" ></Header>
        <div className="regist">
          <div className="regist_input">
           <p><label htmlFor="">手机号 </label><input type="text" name="userTel" id="" value={userTel} onChange={this.changeHander} onFocus={this.change}/></p>
    <p><label htmlFor="">验证码 </label><input type="text" name="userCode" id="" value={userCode} onChange={this.changeHander}  onFocus={this.change}/><span className="my_code" onClick={this.getCode.bind(this)}>{userNeedCode}</span></p>
           <p><label htmlFor="">密码 </label><input type="type" name="userPwd" id="" value={userPwd} onChange={this.changeHander} onFocus={this.change1}/></p>
          </div>
          <button className="btn_regist" onClick={this.regist.bind(this)} disabled={isUse} style={{backgroundColor:isUse?"#cecece":"#77bc1f"}}>注册</button>
        </div>

        <div className="tip" style={{display:flag?"none":"block"}} onClick={this.isShow}>
          <span className="usertip">{usertip}</span>
        </div>
      </div>
    )
  }
}
