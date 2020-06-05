const currency = function (v) {
  // console.log(v)
  if(typeof(v)=='undefined'){
    return v
  }else{
    var s=Number(v)
    return s.toFixed(2)
  }
}
const date = function (v){
  if(v){
      const time = new Date(v);
      return time.getFullYear() + "-" +
          ((time.getMonth() + 1)).toString().padStart(2, 0) + "-" +
          (time.getDate()).toString().padStart(2, 0) + " " +
          (time.getHours()).toString().padStart(2, 0) + ":" +
          (time.getMinutes()).toString().padStart(2, 0) + ":" +
          (time.getSeconds()).toString().padStart(2, 0);
  }else{
      return "无"
  }

}
export default {
  date,
  currency
}