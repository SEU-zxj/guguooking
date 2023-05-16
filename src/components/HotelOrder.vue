<template>
    <div class="hotelorder-layout">
        <el-container >
            <el-aside style="width: 33%;">
                <el-row>
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
                                <el-text style="color: black;" tag="b">{{ order.totalDays + " 天" }}</el-text>
                            </el-col>
                        </el-row>
                        <el-row><el-text tag="b">已选择：</el-text></el-row>
                        <div v-for="room in order.Rooms" :key="room">
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
                        <el-row :gutter="0" style="border-bottom: solid 1px var(--el-border-color);padding-bottom: 10px;">
                            <el-col :span="6" >
                                <el-text tag="b" style="font-size: x-large;color: black;">价格</el-text>
                            </el-col>
                            <el-col :span="18" style="text-align: right;">
                                <el-text tag="b" style="font-size: x-large;color: black;">{{ order.totalPrice + "元" }}</el-text>
                            </el-col>
                        </el-row>
                        <el-row><el-text tag="b" style="color: black;">价格信息</el-text></el-row>
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
                </el-row>
            </el-aside>
            <el-container style="margin-top: -20px;">
                <el-main>
                    <div >
                    <el-card class="main-card" shadow="never">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <el-image style="width: 160px;vertical-align: middle;" src="https://youimg1.c-ctrip.com/target/100o0x000000l33nt6FCA.jpg"/>
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
                            style="height: 65px;margin-bottom: 10px;"
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
                            label-width="120px"
                            style="width: 100%;"
                        >
                            <el-form-item label="电话号码" prop="phoneNumber">>
                                <el-input v-model="orderForm.phoneNumber" placeholder="请输入电话号码">
                                    <template #prepend>+86</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱地址" prop="userEmail">>
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
                    <el-button style="width: 200px;height: 50px;" color="#3c8dea" @click="confirmOrder">
                        <el-text style="font-size: large;vertical-align: middle;color: white;" tag="b">完成预定</el-text>
                    </el-button>
                </el-footer>
            </el-container>
        </el-container>
        
    </div>
</template>



<script>
import { ref, reactive } from 'vue'
import { InfoFilled, Coin, Money } from '@element-plus/icons-vue';

export default ({
    setup() {
        const ruleForms = ref(null);
        const order = ref({
            hotelName: "Hotel Duminy-Vendome", hotelPostion: "3/5 rue du Mont-Thabor, 1区 - 卢浮宫, 75001 巴黎, 法国",
            checkinTime: "2023年6月22日周四",
            checkoutTime: "2023年6月25日周六",
            totalDays: "2",
            Rooms: [
                { roomName: "大床房", roomNumber: "1" },
                { roomName: "舒适单人房", roomNumber: "2" },
            ],
            totalPrice: "1,340",
        })
        const orderForm = reactive({
            phoneNumber: "",
            userEmail: "",
            arriveTime: "",
            otherNeed: "",
        })

        const rules = ref({
            phoneNumber: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
            userEmail: [{ required: true, message: "请输入您的邮箱地址", trigger: "blur" }],
        })

        const options = [
            { value: "不确定", label: "不确定"},
            { value: "0:00 - 1:00", label: "0:00 - 1:00" },
            { value: "1:00 - 2:00", label: "1:00 - 2:00" },
            { value: "2:00 - 3:00", label: "2:00 - 3:00" },
            { value: "3:00 - 4:00", label: "3:00 - 4:00" },
            { value: "4:00 - 5:00", label: "4:00 - 5:00" },
            { value: "5:00 - 6:00", label: "5:00 - 6:00" },
            { value: "6:00 - 7:00", label: "6:00 - 7:00" },
            { value: "7:00 - 8:00", label: "7:00 - 8:00" },
            { value: "8:00 - 9:00", label: "8:00 - 9:00" },
            { value: "9:00 - 10:00", label: "9:00 - 10:00" },
            { value: "10:00 - 11:00", label: "10:00 - 11:00" },
            { value: "11:00 - 12:00", label: "11:00 - 12:00" },
            { value: "12:00 - 13:00", label: "12:00 - 13:00" },
            { value: "13:00 - 14:00", label: "13:00 - 14:00" },
            { value: "14:00 - 15:00", label: "14:00 - 15:00" },
            { value: "15:00 - 16:00", label: "15:00 - 16:00" },
            { value: "16:00 - 17:00", label: "16:00 - 17:00" },
            { value: "17:00 - 18:00", label: "17:00 - 18:00" },
            { value: "18:00 - 19:00", label: "18:00 - 19:00" },
            { value: "19:00 - 20:00", label: "19:00 - 20:00" },
            { value: "20:00 - 21:00", label: "20:00 - 21:00" },
            { value: "21:00 - 22:00", label: "21:00 - 22:00" },
            { value: "22:00 - 23:00", label: "22:00 - 23:00" },
            { value: "23:00 - 24:00", label: "23:00 - 24:00" },
        ]

        const confirmOrder = () =>{
            //接口
            console.log("电话号码："+orderForm.phoneNumber)
            console.log("邮箱地址：" + orderForm.userEmail)
            console.log("到店时间：" + orderForm.arriveTime)
            console.log("其他要求：" + orderForm.otherNeed)
        }
        return{
            ruleForms, rules,
            order,
            orderForm,
            InfoFilled, Coin, Money,
            options,

            confirmOrder,
        }
    },
})
</script>



<style scoped>
.hotelorder-layout {
  margin-left: 11.5%;
  margin-right: 11.5%;
  margin-top: 20px;
}
.aside-card {
    width: 100%;
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
</style>