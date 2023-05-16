<template>
  <div class="orderListBox">
    <div class="cardOutterBox" v-for="o in orderList.length" :key="o">
      <el-card class="cardBox">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-image
              :src="orderList[o - 1].figURL"
              :fit="imgFitContain"
              style="height: 100%; width: 100%"
            ></el-image>
          </el-col>
          <el-col :span="16">
            <el-row>
              <h3>{{ orderList[o - 1].hotelName }}</h3>
            </el-row>
            <el-row>
              <p>{{ orderList[o - 1].hotelLocation }}</p>
            </el-row>
            <el-row>
              <p>入住时间：&nbsp;{{ orderList[o - 1].checkinTime }}</p>
            </el-row>
            <el-row>
              <p>入住时间：&nbsp;{{ orderList[o - 1].checkoutTime }}</p>
            </el-row>
            <el-row>
              <p>总开销：&nbsp;{{ orderList[o - 1].totalPrice }}</p>
            </el-row>
            <el-row>
              <el-button
                style="margin-left: 85%"
                :disabled="orderList[o - 1].commentWrited"
                @click="WriteComment"
              >
                撰写评论
              </el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="dialogCommentVisible" title="撰写评论">
    <div class="demo-rate-block">
      <span class="demonstration">评分</span>
      <el-rate v-model="rate" />
    </div>
    <el-input
      v-model="commentText"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCommentVisible = false">Cancel</el-button>
        <el-button type="primary" @click="SubmitComment"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "OrderList",
  setup() {
    const imgFitContain = "contain";
    const orderList = reactive([
      {
        hotelId: 1,
        hotelName: "东南大学九龙湖宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        checkinTime: "2022-3-28",
        checkoutTime: "2023-4-29",
        totalPrice: 199787,
        figURL:
          "https://uimg.huixiaoer.net/86195299/ef19a8d76387f29d3d752d5729f8ceb1.jpg",
        commentWrited: true,
      },
      {
        hotelId: 1,
        hotelName: "东南大学无锡校区宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        checkinTime: "2022-3-28",
        checkoutTime: "2023-4-29",
        totalPrice: 199787,
        figURL:
          "https://img.zcool.cn/community/0193725a0a72e8a801204a0e49c9ad.jpg@2o.jpg",
        commentWrited: false,
      },
      {
        hotelId: 1,
        hotelName: "东南大学四牌楼宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        checkinTime: "2022-3-28",
        checkoutTime: "2023-4-29",
        totalPrice: 199787,
        figURL:
          "https://th.bing.com/th/id/R.decc397d7e83ee1f82ce74601f76a447?rik=b24hoXVSnNsdCg&riu=http%3a%2f%2fimg.redocn.com%2f201008%2f15%2f604947_128185023543n4.jpg&ehk=fsdP9r%2bAQ0P7iMzNDgY63vXQpCwOT9qUoy8sOHGiFWI%3d&risl=&pid=ImgRaw&r=0",
        commentWrited: false,
      },
      {
        hotelId: 1,
        hotelName: "东南大学成贤学院宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        checkinTime: "2022-3-28",
        checkoutTime: "2023-4-29",
        totalPrice: 199787,
        figURL:
          "https://img.zcool.cn/community/0118ed5542e5370000019ae92371ea.jpg@1280w_1l_2o_100sh.jpg",
        commentWrited: false,
      },
      {
        hotelId: 1,
        hotelName: "东南大学九龙湖宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        checkinTime: "2022-3-28",
        checkoutTime: "2023-4-29",
        totalPrice: 199787,
        figURL:
          "https://th.bing.com/th/id/R.f3cdf09f574a94854c8a8e786fc51103?rik=z8ugMru1lT9YRg&riu=http%3a%2f%2fimg.luxtarget.com%2fcms%2fwww%2f201806%2f21145813mvjd.jpg&ehk=1BZuUX5x1gD97AxTuJzXkMEQ6e8BQAdskHYoGt24Sbo%3d&risl=&pid=ImgRaw&r=0",
        commentWrited: false,
      },
    ]);
    var dialogCommentVisible = ref(false);
    var rate = ref(null);
    var commentText = ref("");
    function WriteComment() {
      rate.value = 0;
      commentText.value = "";
      dialogCommentVisible.value = true;
    }

    function SubmitComment() {
      dialogCommentVisible.value = false;
      console.log(commentText.value);
    }
    return {
      imgFitContain,
      orderList,
      dialogCommentVisible,
      rate,
      commentText,

      WriteComment,
      SubmitComment,
    };
  },
};
</script>

<style scoped>
.orderListBox {
  margin: 0 5%;
}
.cardOutterBox {
  width: 100%;
  height: 100%;
  margin: 2% 0;
}
.cardBox {
  width: 100%;
  height: 100%;
}
</style>
