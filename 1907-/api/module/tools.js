module.exports={
  getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  json(res,ok=-1,msg="网络连接错误"){
    res.json({
        ok,
        msg
    })
  }
}