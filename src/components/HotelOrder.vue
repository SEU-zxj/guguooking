<template>
    <div class="hotelorder-layout">
        <el-container >
            <el-aside style="width: 33%;">
                    <el-card class="aside-card" shadow="never">
                        <template #header>
                            <div><el-text tag="b" style="color: black;font-size: large;">订单详情</el-text></div>
                        </template>
                        <el-row :gutter="30">
                            <el-col :span="12"><el-text style="color: black;">入住时间</el-text></el-col>
                            <el-col :span="12"><el-text style="color: black;">退房时间</el-text></el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="12" style="border-right: solid 1px var(--el-border-color);border-radius: 0%;">
                                <el-text tag="b" style="font-size: medium;color: black;">{{ order.checkinTime }}</el-text><br>
                                <el-image style="width: 16px;vertical-align: middle;" :src="require('@/assets/order/time.svg')"/>
                                <el-text>15:00起</el-text>
                            </el-col>
                            <el-col :span="12">
                                <el-text tag="b" style="font-size: medium;color: black;">{{ order.checkoutTime }}</el-text><br>
                                <el-image style="width: 16px;vertical-align: middle;" :src="require('@/assets/order/time.svg')"/>
                                <el-text>11:00前</el-text>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" style="border-bottom: solid 1px var(--el-border-color);border-radius: 0%;padding-bottom: 2%;">
                                <el-text style="color: black;">入住总天数：</el-text><br>
                                <el-text style="color: black;" tag="b">
                                    {{ dateDifference(order.checkinTime, order.checkoutTime) + " 天" }}
                                </el-text>
                            </el-col>
                        </el-row>
                        <el-row><el-text tag="b">已选择：</el-text></el-row>
                        <div v-for="room in roomsInfo(order.Rooms)" :key="room">
                            <el-row :gutter="0">
                                <el-col :span="12">
                                    <el-text style="color: black;">{{ room.roomName }}</el-text>
                                </el-col>
                                <el-col :span="12">
                                    <el-text style="color: black;">{{ "× " + room.roomNumber + " 间"}}</el-text>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-card class="aside-card" shadow="never">
                        <template #header>
                            <div><el-text tag="b" style="color: black;font-size: large;">价格汇总</el-text></div>
                        </template>
                        <div style="background-color: #ebf3ff;margin-left: -20px;margin-right: -20px;margin-top: -20px;">
                            <el-row 
                                :gutter="0" 
                                style="
                                    border-bottom: solid 1px var(--el-border-color);
                                    padding: 20px;">
                            <el-col :span="6" >
                                <el-text tag="b" style="font-size: x-large;color: black;">价格</el-text>
                            </el-col>
                            <el-col :span="18" style="text-align: right;">
                                <el-text tag="b" style="font-size: x-large;color: black;">{{ order.totalPrice + "元" }}</el-text>
                            </el-col>
                        </el-row>
                        </div>
                        
                        <el-row><el-text tag="b" style="color: black;margin-top: 20px;">价格信息</el-text></el-row>
                        <el-row>
                            <el-col :span="3">
                                <el-image style="width: 20px;vertical-align: middle;" :src="require('@/assets/price/price1.png')"/>
                            </el-col>
                            <el-col :span="15">
                                <el-text style="color: black;">损毁押金 (可全额退还)</el-text>
                            </el-col>
                            <el-col :span="6" style="text-align: right;">
                                <el-text style="color: black;margin-right: 0%;" tag="b">0元</el-text>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <el-image style="width: 22px;vertical-align: middle;" :src="require('@/assets/price/price2.png')"/>
                            </el-col>
                            <el-col :span="21">
                                <el-text style="color: black;">支付时，汇率可能会有所变动。</el-text>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <el-image style="width: 22px;vertical-align: middle;" :src="require('@/assets/price/price3.png')"/>
                            </el-col>
                            <el-col :span="21">
                                <el-text style="color: black;">请注意，您的发卡行可能会收取境外交易手续费。</el-text>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="aside-card" shadow="never">
                        <template #header>
                            <div><el-text tag="b" style="color: black;font-size: large;">付款安排</el-text></div>
                        </template>
                        <el-text style="color: black;"><el-text style="color: black;">住宿提供方将随时向你收取预付款。</el-text></el-text>
                    </el-card>
            </el-aside>
            <el-container style="margin-top: -20px;">
                <el-main>
                    <div >
                    <el-card class="main-card" shadow="never">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <el-image style="width: 160px;vertical-align: middle;" :src = "order.figURL"/>
                            </el-col>
                            <el-col :span="18">
                                <el-text tag="b" style="font-size: large;color: black;">{{ order.hotelName }}</el-text>
                                <br><el-text style="color: black;">{{ order.hotelPostion }}</el-text>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="main-card" shadow="never">
                        <el-row><el-text style="color: black;font-size: large;" tag="b">输入个人信息</el-text></el-row>
                        <el-alert 
                            type="info"
                            :closable="false"
                            show-icon
                            style="min-height: 65px;margin-bottom: 10px;"
                        >
                        <div style="vertical-align: middle;">
                            <el-text>快完成啦！将带</el-text><el-text style="color: red;">*</el-text>
                            <el-text>的必填项填写完整即可</el-text><br><el-text>请以英文或酒店所使用的语言输入您的全部资料。</el-text>
                        </div>
                        </el-alert>
                        <el-form 
                            :rules="rules"
                            ref="ruleForms"
                            :model="orderForm"
                            label-position="top"
                            label-width="200px"
                            style="width: 80%;"
                        >
                            <el-form-item label="电话号码" prop="phoneNumber">
                                <el-input v-model="orderForm.phoneNumber" placeholder="请输入电话号码">
                                    <template #prepend>+86</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱地址" prop="userEmail">
                                <el-input v-model="orderForm.userEmail" placeholder="温馨提示:填写后检查一下, 避免拼写错误"/>
                            </el-form-item>

                        </el-form>
                    </el-card>
                    <el-card class="main-card" shadow="never">
                        <el-row><el-text style="color: black;font-size: large;" tag="b">您还有什么特别要求？</el-text></el-row>
                        <el-row style="margin-bottom: 15px;margin-top: 15px;">
                            <el-text style="color: black;">特殊要求无法保证满足，但住宿将尽力为你提供所需。你始终可以在预订完成后提出特殊要求。</el-text>
                        </el-row>
                        <el-row style="margin-bottom: 3px;">
                            <el-text style="color: black;" tag="b">请使用英语或中文填写您的请求 &nbsp;</el-text>
                            <el-text style="color:grey;">(可选)</el-text>
                        </el-row>
                        <el-row><el-input
                                    v-model="orderForm.otherNeed"
                                    :autosize="{ minRows: 2, maxRows: 8 }"
                                    type="textarea"
                                    placeholder="Please input"
                                />
                        </el-row>
                    </el-card>
                    <el-card class="main-card" shadow="never">
                        <el-row><el-text style="color: black;font-size: large;" tag="b">到店时间</el-text></el-row>
                        <el-row style="margin-top: 20px;margin-bottom: 20px;" :gutter="15">
                            <el-col :span="2" style="text-align:right;">
                                <el-image style="width: 25px;vertical-align: middle;" :src="require('@/assets/price/price5.png')"/>
                            </el-col>
                            <el-col :span="22">
                                <el-text style="color: black;vertical-align: middle;">客房随时可办理入住</el-text>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px;margin-bottom: 20px;" :gutter="15">
                            <el-col :span="2" style="text-align:right;">
                                <el-image style="width: 25px;vertical-align: middle;" :src="require('@/assets/price/price4.png')"/>
                            </el-col>
                            <el-col :span="22">
                                <el-text style="color: black;vertical-align: middle;">24小时前台 - 随时提供帮助！</el-text>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom: 3px;">
                            <el-text style="color: black;" tag="b">添加预计到店时间 &nbsp;</el-text>
                            <el-text style="color:grey;">(可选)</el-text>
                        </el-row>
                        <el-select v-model="orderForm.arriveTime" clearable placeholder="Select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                        <el-row style="margin-top: 3px;"><el-text style="color: grey;">该时间为北京时间</el-text></el-row>
                    </el-card>
                </div>
                </el-main>
                <el-footer style="text-align: right;">
                    <el-button style="width: 200px;height: 50px;" color="#006ce4" @click="confirmOrder_Pre()">
                        <el-text style="font-size: large;vertical-align: middle;color: white;" tag="b">完成预定</el-text>
                    </el-button>
                </el-footer>
            </el-container>
        </el-container>
    </div>

    <div class="BottomInfoBox">
        <div class="BottomInfoBox-sub1">
            <div class="bottomBox-row">
            <el-row>&nbsp;</el-row>
            <el-row :gutter="1" style="margin-top: -5px;">
                <el-col :span="3.5" style="border-radius: 0%;border-right: solid 1.5px  grey;"><el-text style="color: #006ce4;" tag="b">关于Guguooking.com&nbsp;</el-text></el-col>
                <el-col :span="1.8" style="border-radius: 0%;border-right: solid 1.5px  grey;"><el-text style="color: #006ce4;" tag="b">&nbsp;客服帮助&nbsp;</el-text></el-col>
                <el-col :span="1.9" style="border-radius: 0%;border-right: solid 1.5px  grey;"><el-text style="color: #006ce4;" tag="b">&nbsp;条款与条件&nbsp;</el-text></el-col>
                <el-col :span="2.9" style="border-radius: 0%;border-right: solid 1.5px  grey;"><el-text style="color: #006ce4;" tag="b">&nbsp;隐私和Cookie声明&nbsp;</el-text></el-col>
            </el-row>
            </div>
        </div>
    </div>
    <div class="BottomInfoBox-sub2">
        <div class="bottomBox-row">
        <el-row :gutter="0" style="margin-top: 20px;">
            <el-col :span="1">
                <el-image style="width: 45px;" :src="require('@/assets/phoneFilled_yellow.svg')"/>
            </el-col>
            <el-col :span="8" style="padding-left: 25px;">
                <el-text style="color: #000000;font-size: x-large;" tag="b">24小时客服助您安心出行</el-text><br>
                <p style="color: #91979e;">订单有问题？我们来帮您！</p>
            </el-col>
            <el-col :span="5" style="padding-top: 16px;">
                <el-text><el-text size="large">中文客服热线</el-text><br><el-text size="large" style="color: #127ce8;">点击了解更多客服帮助</el-text></el-text>
            </el-col>
            <el-col :span="5" style="padding-top: 16px;">
                <el-text><el-text size="large">常见问题</el-text><br><el-text size="large">去</el-text><el-text size="large" style="color: #127ce8;">帮助中心</el-text><el-text size="large">看看</el-text></el-text>
            </el-col>
        </el-row>
        </div>
    </div>
    <div class="BottomInfoBox-sub3">
         <div class="bottomBox-row">
            <el-row style="height: 30px;vertical-align: bottom;">
                <p style="font-size: small;">版权 © 2023 Guguooking.com. 版权所有</p>
            </el-row>
            
         </div>
    </div>

    <div>
        <el-dialog v-model="payforDialogVisible" style="width: 40%;margin-top: 30px;">
            <template #header>
                <el-text style="color: black;font-size: x-large;" tag="b">支付</el-text>
            </template>
            <span style="font-size: large;">
            请扫码支付：
            </span>
            <el-image
                style="width: 70%;margin-left: 15%;margin-top: 10px;"
                :src="require('@/assets/payfor.png')"
            />
            <template #footer>
            <span style="margin-top: 10px;">
                <el-button @click="payforDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmOrder()">
                确认支付
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>



<script>
import { ref, reactive } from 'vue';
import { ElMessage } from "element-plus";
import { InfoFilled, Coin, Money } from '@element-plus/icons-vue';
import http from "@/plugins/axiosInstance";
import store from "@/store/index";
import router from "@/router"

export default ({
    setup() {
        const payforDialogVisible =ref(false)
        const ruleForms = ref(null);
        // const order = ref({
        //     hotelName: "Hotel Duminy-Vendome", hotelPostion: "3/5 rue du Mont-Thabor, 1区 - 卢浮宫, 75001 巴黎, 法国",
        //     checkinTime: "2023年6月22日周四",
        //     checkoutTime: "2023年6月25日周六",
        //     totalDays: "2",
        //     Rooms: [
        //         { roomName: "大床房", roomNumber: "1" },
        //         { roomName: "舒适单人房", roomNumber: "2" },
        //     ],
        //     totalPrice: "1,340",
        // })

        //计算两个日期之间的天数
        const dateDifference = (sDate1, sDate2) => {    //sDate1和sDate2是2006-12-18格式
            let dateSpan, iDays
            sDate1 = Date.parse(sDate1)
            sDate2 = Date.parse(sDate2)
            dateSpan = sDate2 - sDate1
            dateSpan = Math.abs(dateSpan)
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
            return iDays
        }
        store.state.totalPrice *= dateDifference(store.state.CurrentSelectTime[0], store.state.CurrentSelectTime[1])
        const order = ref({
            hotelName: store.state.CurrentHotelName, hotelPostion: store.state.CurrentHotelLocation,
            figURL: store.state.CurrentHotelFigURL,
            checkinTime: store.state.CurrentSelectTime[0],
            checkoutTime: store.state.CurrentSelectTime[1],
            Rooms: store.state.bookRoomInfo,
            totalPrice: store.state.totalPrice,
        })
        const roomsInfo =(bookRoomInfo)=>{//去除房间数为0的
            let rooms = []
            for(let i in bookRoomInfo){
                if(bookRoomInfo[i].roomNumber>0){
                    rooms.push(bookRoomInfo[i])
                }
            }
            return rooms
        }
        const orderForm = reactive({
            phoneNumber: store.userPhoneNumber,
            userEmail: "",
            arriveTime: "",
            otherNeed: "",
        })

        const rules = ref({
            phoneNumber: [{ 
                required: true, 
                pattern: /^1\d{10}$/,
                message: "请输入有效的手机号码", 
                trigger: "blur" }],
            userEmail: [{ 
                required: true,
                pattern: /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
                message: "请输入有效的邮箱地址", 
                trigger: "blur" }],
        })

        const options = [
            { value: -1, label: "不确定"},
            { value: 0, label: "00:00 - 01:00" },
            { value: 1, label: "02:00 - 03:00" },
            { value: 3, label: "03:00 - 04:00" },
            { value: 4, label: "04:00 - 05:00" },
            { value: 5, label: "05:00 - 06:00" },
            { value: 6, label: "06:00 - 07:00" },
            { value: 7, label: "07:00 - 08:00" },
            { value: 8, label: "08:00 - 09:00" },
            { value: 9, label: "09:00 - 10:00" },
            { value: 10, label: "10:00 - 11:00" },
            { value: 11, label: "11:00 - 12:00" },
            { value: 12, label: "12:00 - 13:00" },
            { value: 13, label: "13:00 - 14:00" },
            { value: 14, label: "14:00 - 15:00" },
            { value: 15, label: "15:00 - 16:00" },
            { value: 16, label: "16:00 - 17:00" },
            { value: 17, label: "17:00 - 18:00" },
            { value: 18, label: "18:00 - 19:00" },
            { value: 19, label: "19:00 - 20:00" },
            { value: 20, label: "20:00 - 21:00" },
            { value: 21, label: "21:00 - 22:00" },
            { value: 22, label: "22:00 - 23:00" },
            { value: 23, label: "23:00 - 24:00" },
        ]

        const confirmOrder_Pre =()=>{
             ruleForms.value.validate((valid) => {
                if (valid) {
                    payforDialogVisible.value = true
                }
             })
        }
        /* 获取当前时间 */
        const getCreationTime = () =>{
            //获取当前时间并打印
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            var gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            console.log("订单创建时间 = " + gettime)
            return gettime
        }
        /* 获取用户选择的时间 */
        function getCurrentSelectTime(selectTime){
            let time = "12:00:00"
            if(orderForm.arriveTime === "" || orderForm.arriveTime === "不确定"){
                time = "12:00:00"
            }else{
                console.log(orderForm.arriveTime)
                // time = orderForm.arriveTime.slice(0,2) + ":00:00"
            }

            let startTime = selectTime[0] + " " + time
            let endTime = selectTime[0] + " 12:00:00"
            return {startTime,endTime}
        }
        const confirmOrder = () =>{
            ruleForms.value.validate((valid) => {
                if (valid) {//通过表单验证
                    console.log("通过");
                    //触发成功验证表单，调用接口
                    for(let i in store.state.bookRoomInfo){
                        if(store.state.bookRoomInfo[i].roomNumber>0){
                            http.post(
                                store.state.serverAddr2 + "/orderGenerate",
                                {
                                    hotelId: store.state.searchHotelId,
                                    roomId: store.state.bookRoomInfo[i].roomId,
                                    creationTime: getCreationTime(),
                                    amount: store.state.bookRoomInfo[i].roomPrice * store.state.bookRoomInfo[i].roomNumber,//该种房间总价
                                    number: store.state.bookRoomInfo[i].roomNumber,
                                    startTime: getCurrentSelectTime(store.state.CurrentSelectTime).startTime,
                                    endTime: getCurrentSelectTime(store.state.CurrentSelectTime).endTime,
                                    email: orderForm.userEmail,
                                    specialAsk: orderForm.otherNeed,
                                },
                                {
                                    headers: { token: store.state.userToken }
                                }
                            ).then(
                                (res) => {
                                    console.log(res)
                                    if(res.data.code === "0"){
                                        console.log("电话号码：" + orderForm.phoneNumber)
                                        console.log("邮箱地址：" + orderForm.userEmail)
                                        console.log("到店时间：" + orderForm.arriveTime)
                                        console.log("其他要求：" + orderForm.otherNeed)

                                        ElMessage({
                                            showClose: true,
                                            type: "success",
                                            message: "行程预定成功！",
                                        });

                                        /* 跳转到查看订单页面 */
                                        router.push("/CheckOrder")
                                    }else{
                                        ElMessage({
                                            showClose: true,
                                            type: "error",
                                            message: "行程预定失败",
                                        });
                                    }
                                },
                                (err) => {
                                    console.log(err)
                                    ElMessage({
                                        showClose: true,
                                        message: "出错了，请联系管理员处理（提交订单）",
                                        type: "error",
                                    });
                                }
                            )
                        }
                    }
                } else {//未通过表单验证
                    console.log("未通过");
                    ElMessage({
                        showClose: true,
                        message: "请先将个人信息填写完整哦",
                        type: "warning",
                    });
                }
            });   
            payforDialogVisible.value = false         
        }

        return{
            payforDialogVisible,
            ruleForms, rules,
            order,
            orderForm,
            InfoFilled, Coin, Money,
            options,

            confirmOrder_Pre,
            confirmOrder,
            roomsInfo,
            dateDifference,
        }
    },
    mounted() {
        console.log("房间：")
        console.log(store.state.bookRoomInfo)
        console.log("价格：")
        console.log(store.state.totalPrice)
    }
})
</script>



<style scoped>
.hotelorder-layout {
  margin-left: 11.5%;
  margin-right: 11.5%;
  margin-top: 20px;
  margin-bottom: 50px;
}
.aside-card {
    width: 97%;
    border-radius: 8px;
    margin-bottom: 10px;
}
.main-card {
    width: 100%;
    border-radius: 8px;
    margin-left: 0%;
    margin-right: 0%;
    margin-bottom: 10px;
}
.BottomInfoBox {
  width: 100%;
}
.BottomInfoBox-sub1{
    height: 6vh;
    background-color:#f5f5f5;
    text-align: center;
}
.BottomInfoBox-sub2{
    height: 10vh;
}
.BottomInfoBox-sub3{
    height: 6vh;
    background-color:#f5f5f5;
}
.bottomBox-row {
    margin-left: 11.5%;
    margin-right: 11.5%;
}
</style>