<template>
  <el-row style="width: 100%; margin-top: 2%" :gutter="30">
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span><h1>订单详情</h1></span>
          </div>
        </template>
        <div class="orderTetxs">
          <p>入住时间：{{ selectedTime.checkinTime }}</p>
          <p>离店时间：{{ selectedTime.checkoutTime }}</p>
          <el-divider />
          <h3>房间详情</h3>
          <div v-for="o in chooseRoomInfo.length" :key="o">
            <el-text>
              {{ chooseRoomInfo[o - 1].roomName }}
              &nbsp; * &nbsp;
              {{ chooseRoomInfo[o - 1].roomChooseNum }}
              间
            </el-text>
            <div></div>
            <el-text size="small">
              {{ chooseRoomInfo[o - 1].roomPrice }}
              &nbsp; * &nbsp;
              {{ chooseRoomInfo[o - 1].roomChooseNum }}
              元
            </el-text>
            <el-divider />
          </div>
          <h3>合计</h3>
          <el-text>￥{{ totalPrice }}</el-text>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16"></el-col>
  </el-row>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "BookRoom",
  setup() {
    var selectedTime = reactive({
      checkinTime: "2023年12月13日",
      checkoutTime: "2023年12月23日",
    });

    //由上一个组件进行跨组件传值
    var chooseRoomInfo = reactive([
      {
        roomName: "大床房",
        roomId: 1,
        roomChooseNum: 3,
        roomPrice: 222.22,
      },
      {
        roomName: "标间",
        roomId: 2,
        roomChooseNum: 1,
        roomPrice: 333.33,
      },
    ]);

    var totalPrice = 888777.88;

    return {
      selectedTime,
      chooseRoomInfo,
      totalPrice,
    };
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  margin-left: 2%;
}
.orderTetxs {
  margin-left: 2%;
}
</style>
