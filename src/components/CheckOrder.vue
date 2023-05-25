<template>
  <div class="checkorder-layout">
    <el-container>
      <el-main class="ordermain">
        <!-- 没有账单时 -->
        <div v-if="numOfOrder === 0" style="margin-top: 7%">
          <el-empty
            description=" "
            :image="require('@/assets/orderEmpty.png')"
            image-size="200"
          >
            <el-text>
              <el-text style="color: #000000; font-size: x-large" tag="b"
                >个人行程将在此显示</el-text
              ><br /><br />
              <el-text size="large" style="color: #000000"
                >本页将显示您的所有订单。如果您有订单，但本页没有显示，可使用订单确认号和PIN码导入订单。</el-text
              >
            </el-text>
          </el-empty>
        </div>

        <!-- 有账单时 -->
        <div v-if="numOfOrder > 0">
          <el-text style="color: #000000; font-size: xx-large" tag="b"
            >订单和行程</el-text
          >
          <div
            v-for="(order, index) in orders.data"
            :key="order"
            style="margin-top: 10px"
          >
            <el-card shadow="hover">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-text style="color: #000000; font-size: large" tag="b">{{
                    order.hotelName
                  }}</el-text
                  ><br />
                  <el-text size="large">{{ order.hotelLocation }}</el-text>
                  <!-- <el-text style="color: #000000;font-size: large;" tag="b">{{ order.hotelId }}</el-text> -->
                </el-col>
                <el-col :span="9" style="text-align: right">
                  <el-text>
                    {{ "创建时间：" + order.createTime }}
                  </el-text>
                </el-col>
                <el-col :span="3" :offset="21">
                  <el-tooltip
                    effect="dark"
                    content="删除该预订"
                    placement="bottom-end"
                    ><el-button
                      style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 50px;
                        height: 50px;
                      "
                      @click="removeOrder(index)"
                    >
                      <el-image
                        style="width: 25px; vertical-align: middle"
                        :src="require('@/assets/order/delete.svg')"
                      />
                    </el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: -5px">
                <el-col :span="6">
                  <el-image
                    :src="order.figURL"
                    :fit="contain"
                    style="height: 160px; width: 100%"
                    class="orderImg"
                  /><!-- :src="order.figURL" -->
                </el-col>
                <el-col :span="18">
                  <el-row
                    :gutter="0"
                    style="text-align: center; margin-bottom: 40px"
                  >
                    <el-col
                      :span="5"
                      style="
                        border-right: solid 1px var(--el-border-color);
                        border-radius: 0%;
                      "
                    >
                      <el-text>入住时间</el-text><br />
                      <el-text
                        style="color: #000000; font-size: xx-large"
                        tag="b"
                      >
                        {{
                          time2time(order.checkinTime).getDate().toString()
                        }} </el-text
                      ><br />
                      <el-text tag="b" style="color: #000000; font-size: large">
                        {{
                          (
                            time2time(order.checkinTime).getMonth() + 1
                          ).toString() + "月"
                        }} </el-text
                      ><br />
                      <el-image
                        style="width: 16px; vertical-align: middle"
                        :src="require('@/assets/order/time.svg')"
                      />
                      <el-text>
                        {{
                          (
                            time2time(order.checkinTime).getHours() - 1
                          ).toString() +
                          ":00至" +
                          (
                            time2time(order.checkinTime).getHours() + 1
                          ).toString() +
                          ":00"
                        }}
                      </el-text>
                    </el-col>
                    <el-col
                      :span="5"
                      style="
                        border-right: solid 1px var(--el-border-color);
                        border-radius: 0%;
                      "
                    >
                      <el-text>退房时间</el-text><br />
                      <el-text
                        style="color: #000000; font-size: xx-large"
                        tag="b"
                      >
                        {{
                          time2time(order.checkoutTime).getDate().toString()
                        }} </el-text
                      ><br />
                      <el-text tag="b" style="color: #000000; font-size: large">
                        {{
                          (
                            time2time(order.checkoutTime).getMonth() + 1
                          ).toString() + "月"
                        }} </el-text
                      ><br />
                      <el-image
                        style="width: 16px; vertical-align: middle"
                        :src="require('@/assets/order/time.svg')"
                      />
                      <el-text>07:00至11:00</el-text>
                    </el-col>
                    <el-col
                      :span="6"
                      style="
                        border-right: solid 1px var(--el-border-color);
                        border-radius: 0%;
                      "
                    >
                      <el-row>
                        <el-col :span="11">
                          <el-text>客房数</el-text><br />
                          <el-text
                            style="color: #000000; font-size: xx-large"
                            tag="b"
                          >
                            {{ order.numOfroom }}
                          </el-text>
                        </el-col>
                        <el-col :span="2"
                          ><br /><el-text style="font-size: xx-large"
                            >/</el-text
                          ></el-col
                        >
                        <el-col :span="11">
                          <el-text>入住夜数</el-text><br />
                          <el-text
                            style="color: #000000; font-size: xx-large"
                            tag="b"
                          >
                            {{
                              dateDifference(
                                order.checkinTime,
                                order.checkoutTime
                              )
                            }}
                            <!-- {{ dateDifference(order.startTime, order.endTime) }} -->
                          </el-text>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="8">
                      <el-text>总价(含所有费用)</el-text><br /><el-text
                        >约&nbsp;&nbsp;</el-text
                      >
                      <el-text
                        style="color: #000000; font-size: xx-large"
                        tag="b"
                      >
                        {{ order.totalPrice + "元" }}
                        <!-- {{ order.amount + "元" }} --> </el-text
                      ><br />
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"
                      ><el-button
                        style="
                          height: 40px;
                          vertical-align: middle;
                          position: absolute;
                          top: 0;
                          left: 0;
                          right: 0;
                          bottom: 0;
                          margin: auto;
                        "
                        :disabled="order.commentWrited"
                        @click="WriteComment(order.hotelId, index)"
                      >
                        <el-image
                          style="width: 25px; height: 25px"
                          :src="require('@/assets/menu_icon/my_icon/order.svg')"
                        />
                        <el-text
                          v-show="!order.commentWrited"
                          style="font-size: medium"
                        >
                          &nbsp;&nbsp;撰写评论</el-text
                        >
                        <el-text
                          v-show="order.commentWrited"
                          style="font-size: medium"
                        >
                          &nbsp;&nbsp;您已完成评论！</el-text
                        >
                      </el-button></el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
            <!-- 撰写评论 对话框 -->
          </div>
          <el-dialog v-model="dialogCommentVisible" title="撰写评论">
            <el-row :gutter="5">
              <el-col :span="3"><span>评分</span></el-col>
              <el-col :span="12">
                <el-rate
                  v-model="rateValue"
                  allow-half
                  :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                  show-text
                  style="vertical-align: middle"
                />
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="3"><span>点评</span></el-col>
              <el-col :span="21">
                <el-input
                  v-model="commentText"
                  :rows="2"
                  type="textarea"
                  placeholder="请在这里输入您的评论"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="text-align: right">
                <el-button
                  style="color: black; width: 100%; height: 100%"
                  @click="SubmitComment()"
                  >提交评论</el-button
                >
              </el-col>
            </el-row>
          </el-dialog>
        </div>
      </el-main>

      <el-footer>
        <el-row :gutter="0">
          <el-col :span="1">
            <el-image
              style="width: 45px"
              :src="require('@/assets/phoneFilled_yellow.svg')"
            />
          </el-col>
          <el-col :span="8" style="padding-left: 25px">
            <el-text style="color: #000000; font-size: x-large" tag="b"
              >24小时客服助您安心出行</el-text
            ><br />
            <p style="color: #91979e">订单有问题？我们来帮您！</p>
          </el-col>
          <el-col :span="5" style="padding-top: 16px">
            <el-text
              ><el-text size="large">中文客服热线</el-text><br /><el-text
                size="large"
                style="color: #127ce8"
                >点击了解更多客服帮助</el-text
              ></el-text
            >
          </el-col>
          <el-col :span="5" style="padding-top: 16px">
            <el-text
              ><el-text size="large">常见问题</el-text><br /><el-text
                size="large"
                >去</el-text
              ><el-text size="large" style="color: #127ce8">帮助中心</el-text
              ><el-text size="large">看看</el-text></el-text
            >
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>

  <div class="BottomInfoBox">
    <el-row :gutter="30" style="width: 100%; height: 100%">
      <el-col :span="14" :offset="1" class="linkInfoBox">
        <el-link type="primary" href="https://element-plus.org" target="_blank"
          >GitHub仓库</el-link
        >
        <el-link type="primary" href="https://element-plus.org" target="_blank"
          >做的不错? 老板v一杯coffee?</el-link
        >
      </el-col>
      <el-col :span="8">
        <el-image
          :src="require('@/assets/logo-remove-white.png')"
          :fit="imgFitContain"
        ></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import http from "@/plugins/axiosInstance";
import store from "@/store/index";

export default {
  name: "CheckOrder",
  setup() {
    var numOfOrder = ref(1);
    // var orders = ref([]);
    const orders = reactive({
      data: [
        {
          hotelId: "001",
          hotelName: "城市公园酒店",
          hotelLocation: "雷克亚威科",
          checkinTime: "",
          checkoutTime: "",
          totalPrice: "2,080",
          figURL:
            "https://img2.selfimg.com.cn/uedvoguecms/2020/08/18/1597736016_EEzaSy.jpg",
          commentWrited: false,
        },
        {
          hotelId: "002",
          hotelName: "Healing House GOD",
          hotelLocation: "仁川市，韩国",
          checkinTime: "",
          checkoutTime: "",
          totalPrice: "1,430",
          figURL:
            "https://youimg1.c-ctrip.com/target/100o0x000000l33nt6FCA.jpg",
          commentWrited: false,
        },
        {
          hotelId: "003",
          hotelName: "塞韦索旅馆",
          hotelLocation: "Via Ponte Seveso 18，中央车站，20125 米兰，意大利",
          checkinTime: "",
          checkoutTime: "",
          totalPrice: "1,258",
          figURL:
            "https://youimg1.c-ctrip.com/target/100o0x000000l33nt6FCA.jpg",
          commentWrited: false,
        },
      ],
    });

    const getOrders = () => {
      //获取订单
    };
    const removeOrder = (index) => {
      ElMessageBox.confirm("你确定要删除该行程吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(index);
          if (index >= 0) {
            orders.data.splice(index, 1);
            numOfOrder.value = orders.data.length;
            console.log(orders.data.length);
            //接口

            ElMessage({
              message: "删除行程和订单成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });

      console.log("用户订单：");
      console.log(orders);
    };
    //将yyyy-mm-dd格式的时间转化为数字
    const time2time = (timeStr) => {
      var time = new Date(timeStr);
      // console.log(timeStr)
      // console.log(time)
      // console.log(time.getFullYear() + " " + time.getMonth() + " " + time.getDate())
      return time;
    };
    //计算两个日期之间的天数
    const dateDifference = (sDate1, sDate2) => {
      //sDate1和sDate2是2006-12-18格式
      let dateSpan, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    };
    //计算预定的房间数
    const sumRoomNum = (selectedRoom) => {
      var sumRoomNum = 0;
      for (let i in selectedRoom) {
        sumRoomNum += selectedRoom[i].roomNumber;
      }
      return sumRoomNum;
    };

    var currentHotelId = ref(0);
    var dialogCommentVisible = ref(false);
    var rateValue = ref(0);
    var commentText = ref("");
    var currentIndex = ref(0);
    function WriteComment(hotelId, index) {
      dialogCommentVisible.value = true;
      currentHotelId.value = hotelId;
      currentIndex.value = index;
    }
    function SubmitComment() {
      dialogCommentVisible.value = false;
      http
        .post(
          store.state.serverAddr2 + "/commentSubmit",
          {
            orderId: currentIndex.value,
            hotelId: currentHotelId.value,
            level: 2*rateValue.value,
            comment: commentText.value,
          },
          {
            headers: { token: store.state.userToken },
          }
        )
        .then(
          (res) => {
            if (res.data.code === "0") {
              ElMessage({
                message: "撰写评论成功",
                type: "success",
              });
              console.log(currentIndex)
              orders.data[currentIndex.value].commentWrited = true;
            } else {
              ElMessage({
                message: "出错了",
                type: "warning",
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );

      rateValue.value = 0;
      commentText.value = "";
    }

    //************************************************************
    http
      .get(store.state.serverAddr2 + "/orderCheck", {
        params: {},
        headers: { token: store.state.userToken },
      })
      .then(
        (res) => {
          console.log("查看订单：电话=" + store.state.userPhoneNumber),
            console.log(res);

          /* 订单数量 */
          numOfOrder.value = res.data.length;

          let item = {
            hotelId: 0,
            hotelName: "",
            hotelLocation: "",
            createTime: "",
            checkinTime: "",
            checkoutTime: "",
            totalPrice: 0,
            roomId: 0,
            numOfroom: 0,
            figURL: "",
            commentWrited: false,
          };
          for (let i in res.data) {
            item.hotelId = res.data[i].hotelId;
            item.createTime = res.data[i].creationTime;
            item.checkinTime = res.data[i].startTime;
            item.checkoutTime = res.data[i].endTime;
            item.totalPrice = res.data[i].amount;
            item.roomId = res.data[i].roomId;
            item.numOfroom = res.data[i].number;
            item.commentWrited = res.data[i].has_comment;

            orders.value.push(item);
          }

          console.log("订单数量=" + numOfOrder.value);
          for (var i = 0; i < numOfOrder.value; i++) {
            console.log("订单-酒店" + i);
            http
              .get(store.state.serverAddr2 + "/getInformation", {
                params: {
                  hotelId: res.data[i].hotelId,
                },
                headers: { token: store.state.userToken },
              })
              .then(
                (res) => {
                  console.log(" 订单-酒店" + i);
                  console.log(res);

                  orders.value[i].hotelName = res.data[0].name;
                  orders.value[i].hotelLocation =
                    res.data[0].location + " " + res.data[0].address;
                  orders.value[i].figURL = res.data[0].pictures[0];

                  console.log(orders.value[i]);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          console.log("查看订单出错了!");
          console.log(err);
        }
      );

    console.log("用户订单：");
    console.log(orders.value);

    return {
      numOfOrder,
      orders,
      currentHotelId,
      dialogCommentVisible,
      rateValue,
      commentText,

      getOrders,
      removeOrder,
      time2time,
      dateDifference,
      sumRoomNum,
      WriteComment,
      SubmitComment,
    };
  },
  mounted() {
    // http
    //   .post(store.state.serverAddr + "/orderCheck", {
    //     phoneNumber: store.userPhoneNumber,
    //   })
    //   // http.get(store.state.serverAddr + "/orderCheck?phone=" + store.userPhoneNumber,)
    //   // http.get(store.state.serverAddr + "/orderCheck?userId=5")
    //   .then(
    //     (res) => {
    //       console.log("全局电话=" + store.userPhoneNumber), console.log(res);
    //       orders = res.data.orderList;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );

    let that = this;
    http
      .get(store.state.serverAddr2 + "/orderCheck", {
        params: {},
        headers: { token: store.state.userToken },
      })
      .then(
        (res) => {
          console.log("查看订单：电话=" + store.userPhoneNumber),
            console.log(res);

          /* 订单数量 */
          that.numOfOrder = res.data.length;

          that.orders.data = [];

          for (var i = 0; i < that.numOfOrder; i++) {
            that.orders.data.push({
              hotelId: res.data[i].hotelId,
              hotelName: "",
              hotelLocation: "",
              createTime: res.data[i].creationTime,
              checkinTime: res.data[i].startTime,
              checkoutTime: res.data[i].endTime,
              totalPrice: res.data[i].amount,
              roomId: res.data[i].roomId,
              numOfroom: res.data[i].number,
              figURL: "",
              commentWrited: res.data[i].has_comment,
            });

            console.log("用户订单：元素" + i);
            console.log(that.orders.data);
          }

          console.log("订单数量=" + that.numOfOrder);
          for (let i = 0; i < that.numOfOrder; i++) {
            console.log("订单-酒店" + i);
            http
              .get(store.state.serverAddr2 + "/getInformation", {
                params: {
                  hotelId: res.data[i].hotelId,
                },
                headers: { token: store.state.userToken },
              })
              .then(
                (res) => {
                  console.log(" 订单-酒店" + i);
                  console.log(res);

                  that.orders.data[i].hotelName = res.data[0].name;
                  that.orders.data[i].hotelLocation =
                    res.data[0].location + " " + res.data[0].address;
                  res.data[0].pictures = res.data[0].pictures.split(";");
                  that.orders.data[i].figURL = res.data[0].pictures;

                  console.log(i);
                  console.log(that.orders.data[i]);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
          console.log(that.orders.data.length);
        },
        (err) => {
          console.log("查看订单出错了!");
          console.log(err);
        }
      );
  },
};
</script>

<style scoped>
.checkorder-layout {
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 50px;
}
.ordermain {
  margin-top: 20px;
  margin-bottom: 50px;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  min-height: 600px;
}
.BottomInfoBox {
  width: 100%;
  background-color: black;
  height: 20vh;
}
.linkInfoBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
</style>
