const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const tools = require("./module/tools");
const app = express();
app.use(bodyParser.json());

app.get("/sentCode", async (req, res) => {
    const code = tools.getRandom(100000, 999999);
    res.json({
        ok: 1,
        code,
        msg: "验证码发送成功"
    })
})

app.post("/regist", async (req, res) => {
    const userTel = req.body.userTel;
    const userPwd = req.body.userPwd;
    const userInfo = await db.findOne("userList", { userTel });
    if (userInfo) {
        res.json({
            ok: -1,
            msg: "该用户名已存在"
        })
    } else {
        await db.insertOne("userList", {
            userTel,
            userPwd,
            sendTime: Date.now()
        });
        res.json({
            ok: 1,
            msg: "注册成功"
        })
    }
})

app.post("/login", async (req, res) => {
    const { userTel, userPwd } = req.body
    const userInfo = await db.findOne("userList", {
        userTel,
        userPwd
    })
    if (userInfo) {
        await db.updateOne("userList", { userTel }, { $set: { lastTime: Date.now() } })
        res.json({
            ok: 1,
            userInfo,
            msg: "登陆成功"
        })
    } else {
        tools.json(res, -1, "该用户不存在或密码错误")
    }
})

app.post("/upPwd", async (req, res) => {
    try {
        const userTel = req.body.userTel;
        const userPwd = req.body.userPwd;
        const userInfo = await db.findOne("userList", { userTel });
        if (userInfo) {
            await db.updateOne("userList", { userTel }, {
                $set: {
                    userPwd,
                    sendTime: Date.now()
                }
            });
            res.json({
                ok: 1,
                msg: "密码更新成功"
            })
        } else {
            tools.json(res, -1, "该用户不存在")
        }
    } catch (msg) {
        tools.json(res, -1, msg)
    }
})

app.get("/remList", async (req, res) => {
    const remList = await db.find("remList", {
        sort: {
            price: -1
        }
    })
    res.json({
        ok: 1,
        remList
    })
})
//根据商品id获取商品详情
app.get("/ProductInfo/:id", async (req, res) => {
    const id = req.params.id;
    const ProductInfo = await db.findOneById("remList", id);
    res.json({
        ok: 1,
        ProductInfo
    })
})

/****************购物车api*****************************/
// 加入购物车
app.get("/joinCar",async(req,res)=>{
    const goodsAll =  JSON.parse(req.query.goodsAll) ;
    const userName = req.query.userName;
    // console.log(goodsAll,userName,)
    const goodsInfo = await db.findOne("carList",{
        defaultGoodsId:goodsAll.defaultGoodsId,
        id:goodsAll.id
    });
    // console.log(goodsInfo)
    // 曾经加入过购物车
    if(goodsInfo){
        await db.updateOne("carList",{
            defaultGoodsId:goodsInfo.defaultGoodsId
        },{
            $inc:{
                buyNum:1
            }
        })
    }else{
        // 第一次加入购物车
        await db.insertOne("carList",{
            userName,
            name:goodsAll.name,
            defaultGoodsId:goodsAll.defaultGoodsId,
            id: goodsAll.id,
            salesPrice:{
                value:goodsAll.salesPrice.value,
            },
            pic:goodsAll.pic,
            buyNum:1,
            isChecked:true,
            addTime:Date.now()
        })
    }
    const carList  = await db.find("carList",{
        whereObj: {
            userName
        },
        sort:{
            addTime:-1
        }
    })
    res.json({
        ok:1,
        msg:"加入购物车成功",
        carList,
    })

})
//购物车减操作
app.get("/moveCar",async (req,res)=>{
    const defaultGoodsId =  JSON.parse(req.query.defaultGoodsId) ;
    const userName = req.query.userName;
    const carInfo = await db.findOne("carList",{
        userName,
        defaultGoodsId
    });
    // console.log(carInfo)
    // 如果购买数量大于1，减1
    if(carInfo.buyNum>1){
        await db.updateOne("carList",{
            _id:carInfo._id
        },{
            $inc:{
                buyNum:-1
            }
        })
    }else{// 如果购买数量等于1，删除操作
        await db.deleteOneById("carList",
            carInfo._id
        )
    }
    // 获得最新的购物车信息，并返回
    const carList =await db.find("carList",{
        whereObj: {
            userName
        },
    })
    res.json({
        ok:1,
        msg:"成功",
        carList
    })

})
app.get('/getCar',async (req,res)=>{
    const {userName} = req.query;
    const carInfo = await db.find("carList",{
        whereObj:{
            userName
        }
    })
    res.json({
        ok:1,
        carInfo
    })
})

// 更新购物车当中的选中状态
app.get("/changeIsChecked",async (req,res)=>{
    // carId:购物车的ID, isChecked：要更改的值
    const {carId} = req.query;
    // console.log(carId,typeof isChecked);
    const carInfo = await db.findOneById("carList",carId);
    // console.log(carInfo)
    await db.updateOneById("carList",carId,{
        $set:{
            isChecked:!carInfo.isChecked//isChecked==="true"?true:false
        }
    })
    const carList = await db.find("carList",{
        whereObj:{
            userName:carInfo.userName
        },
    })
    res.json({
        ok:1,
        carList
    })
})
//全选和反选
app.get("/changeAllIsChecked",async (req,res)=>{
    const {userName,isChecked} = req.query;
    // console.log(userName, isChecked)
    await db.updateMany("carList",{
        userName
    },{
        $set:{
            isChecked:isChecked==="true"?true:false
        }
    })
    const carList = await db.find("carList",{
        whereObj:{
            userName
        },
    })
    res.json({
        ok:1,
        carList
    })
})
//根据defaultGoodsId,productId查找数据
app.get("/getCarList",async(req,res)=>{
    const {defaultGoodsId,productId} = req.query;
    // console.log( defaultGoodsId,productId)
    const carInfo = await db.findOne("carList",{
        defaultGoodsId:defaultGoodsId/1,
        id:productId/1
    })
    // console.log(carInfo)
    res.json({
        ok:1,
        carInfo
    })
})
//加入收藏
app.post("/joinCollect",async(req,res)=>{
    const {goodsId} = req.body;
    // console.log(goodsId)
    const carInfo = await db.findOne("carList",{
        defaultGoodsId:goodsId/1
    })
    const goodsInfo = await db.findOne("collect",{
        goodsId
    })
    // console.log(carInfo,goodsInfo)
    //如果收藏夹有该商品则进行删除操作
    if(goodsInfo){
        await db.deleteOneById("collect",goodsInfo._id);
        res.json({
            ok:-1,
            msg:"取消收藏成功"
        })
    }else{
        //没有收藏
        await db.insertOne("collect",{
            goodsId,
            name:carInfo.name,
            price:carInfo.salesPrice.value,
            pic:carInfo.pic
        })
        res.json({
            ok:1,
            msg:"收藏成功"
        })
    }
})
//获取收藏
app.get("/getCollect",async(req,res)=>{
    const collectList  = await db.find("collect");
    res.json({
        ok:1,
        collectList
    })
})
app.listen(8089, function () {
    console.log("success");
})