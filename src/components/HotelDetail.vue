<template>
  <div class="HotelDetailHeader">
    <h1>{{ detailInfo.data.hotelName }}</h1>
    <p>{{ detailInfo.data.hotelLocation }}</p>
  </div>
  <el-button @click="HandleClick"></el-button>
  <div class="ImageWallBox">
    <el-carousel
      :interval="4000"
      indicator-position="outside"
      style="width: 100%"
      height="50vh"
    >
      <el-carousel-item
        v-for="item in detailInfo.data.figURLs.length"
        :key="item"
        style="width: 100%; height: 100%"
      >
        <el-image
          :src="detailInfo.data.figURLs[item - 1]"
          style="width: 100%; height: 100%"
          :fit="imgFitContain"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="TagBox">
    <el-tag class="tag" v-for="o in activeTag" :key="o" type="success">
      {{ o }}
    </el-tag>
  </div>

  <div class="descriptionBox">
    <h2>体验{{ detailInfo.data.hotelName }}的优质服务，在这里你就是明星！</h2>
    <el-text class="introBox">{{ detailInfo.data.intro }}</el-text>
  </div>

  <div class="roomTableBox">
    <h2>空房情况</h2>
    <div class="SearchNewEmptyRoomBox">
      <div class="chooseInnerBox">
        <p>选择时间</p>
        <el-date-picker
          v-model="searchTime"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>
      <div class="chooseInnerBox">
        <p>选择人数</p>
        <el-input-number v-model="searchPeopleNumber" placeholder="·位客人" />
      </div>
      <div class="chooseInnerBox">
        <el-button
          type="primary"
          @click="SearchNewEmptyRoom"
          style="margin-top: 30%"
          >更改搜索条件</el-button
        >
      </div>
    </div>
    <el-table :data="emptyRoomData.data" border style="width: 100%">
      <el-table-column prop="roomName" label="房间类型" width="180" />
      <el-table-column prop="roomBriefIntro" label="简介" width="180" />
      <el-table-column prop="roomDetail" label="详细信息" />
      <el-table-column prop="roomPrice" label="价格" />
      <el-table-column label="预定" width="200">
        <template #default="scope">
          <el-input-number
            v-model="bookRoomCount.data[scope.$index].roomNumber"
            :min="0"
            :max="scope.row.availableMax"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 2% 0 0 80%">
      <el-button type="primary" @click="BookRoomNow">现在就预定</el-button>
    </div>
  </div>

  <div class="commentBox">
    <h2>住客点评</h2>
    <el-tag>平均{{ commentInfo.data.avgScore }}分</el-tag>
    <el-text class="strongText">
      {{ commentInfo.data.commentNumber }}条用户评论
    </el-text>
    <div class="commentCardBox">
      <el-card
        v-for="o in commentInfo.data.commentList.length"
        :key="o"
        style="width: 25%"
      >
        <template #header>
          <div class="card-header">
            <span>{{ commentInfo.data.commentList[o - 1].userName }}</span>
            <el-tag>{{ commentInfo.data.commentList[o - 1].userScore }}</el-tag>
          </div>
        </template>
        <div class="text item">
          {{ commentInfo.data.commentList[o - 1].commentText }}
        </div>
      </el-card>
    </div>
  </div>
  <div style="height: 10vh"></div>
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
import { computed, reactive, ref } from "vue";
import router from "@/router"; // 引入userRouter
import http from "@/plugins/axiosInstance";
import store from "@/store";

export default {
  name: "HotelDetail",
  setup() {
    const detailInfo = reactive({
      data: {
        hotelName: "东南大学九龙湖宾馆",
        hotelLocation: "中国 江苏 南京 江宁区",
        figURLs: [
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104546.jpg?k=7aacd3c9d43500ea5850329bff0849e99d8345b6377dfbbb17b11e8d9ef63a49&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104512.jpg?k=db3fda47203f7145d41c62b137ac3784ae986d5c332cbae9f0a3818b6ca6408a&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104516.jpg?k=5d0b464765591fa2719d3184efa74918c628ff0253e2bdd1e171cfd69c754a94&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104553.jpg?k=19272f6b83aef655d93b546ca2fbc12021b4a7e160fcf22b261e131cd1ebc84c&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104515.jpg?k=ab1fe65bda8bc16c5802fdde2d1d3bbf84431bd59e22ed18e191c8e0a92f39a9&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104524.jpg?k=a09ad281ba2ef5b2db8162894b2fc6a5a64603487926c5965184c37a89bb6cb3&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104533.jpg?k=58de3c7743fc767f05adf7527965b5941c985bae76d853c82846082bd854a424&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104531.jpg?k=127aec2f1298216f95f4db52acda312fbbbf521d32c5fa74dab9b69daf28ba47&o=&hp=1",
          "https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/444104532.jpg?k=bab8a156d965b0524bfcb05c8f6cdcb83fe3546a65fd4a01fdea9be482e49168&o=&hp=1",
        ],
        intro:
          "Paris j'Adore Hotel & Spa坐落于巴黎，提供带餐厅和酒吧的尊贵型住宿。这家尊贵型酒店配备露台，提供带免费WiFi和私人浴室的空调客房。住宿为客人配备客房服务、礼宾服务和行李寄存服务。这家酒店的每间客房都配备书桌。所有客房都提供咖啡机、电视和保险箱。部分客房还提供阳台；部分客房享有市景。Paris j'Adore Hotel & Spa的房间均配备免费洗浴用品和iPad。这家住宿每天早晨提供单点和欧陆式早餐两种选择。24小时前台工作人员会讲英语、西班牙语、法语和葡萄牙语，很乐意为客人提供当地的实用信息。Paris j'Adore Hotel & Spa附近的热门地标包括Gare Saint-Lazare、卡尼尔歌剧院和皮嘉尔地铁站。最近的机场是巴黎戴高乐机场，距离这家酒店有24公里。根据我们网站上的真实住客点评，这里是巴黎的人气地区之一。夫妻/情侣特别喜欢这家住宿的位置，为两人住宿体验给出了8.9分。",
        characteristics: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
    });
    const commentInfo = reactive({
      data: {
        avgScore: 8.7,
        commentNumber: 2977,
        commentList: [
          {
            userName: "Alice",
            userScore: 8.8,
            commentText:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
          {
            userName: "Mike",
            userScore: 8.9,
            commentText:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
          {
            userName: "Flord",
            userScore: 9.0,
            commentText:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
        ],
      },
    });
    var tagIndex = [
      "婴儿托管",
      "室内泳池",
      "健康中心",
      "秀发护理",
      "行李托管",
      "客房服务",
      "早饭提供",
      "运动中心",
      "航班接送",
      "室内酒吧",
      "无障碍设施",
      "免费WiFi",
    ];
    const imgFitContain = "cover";
    const emptyRoomData = reactive({
      data: [
        {
          roomId: 1,
          roomName: "标间",
          roomBriefIntro: "我是标间",
          roomDetail: ["提前付费", "无法退款。"],
          roomPrice: 900,
          availableMax: 5,
        },
        {
          roomId: 2,
          roomName: "双人间",
          roomBriefIntro: "我是双人间",
          roomDetail: ["提前付费", "无法退款。"],
          roomPrice: 900,
          availableMax: 10,
        },
        {
          roomId: 3,
          roomName: "大床间",
          roomBriefIntro: "我是大床房",
          roomDetail: ["提前付费", "无法退款。"],
          roomPrice: 900,
          availableMax: 15,
        },
      ],
    });
    const bookRoomCount = reactive({
      data: [
        {
          roomId: 100,
          roomName: "",
          roomNumber: 0,
          roomPrice: 0,
        },
        {
          roomId: 100,
          roomName: "",
          roomNumber: 0,
          roomPrice: 0,
        },
        {
          roomId: 100,
          roomName: "",
          roomNumber: 0,
          roomPrice: 0,
        },
      ],
    });

    const searchTime = ref([]);
    const searchPeopleNumber = ref(1);
    //************************************************//
    //进行数据请求
    http
      .post(store.state.serverAddr + "/hotelDetail", {
        hotelId: store.state.searchHotelId,
      })
      .then(
        (res) => {
          console.log(res);
          detailInfo.data = res.data.detailInfo;
          emptyRoomData.data = res.data.emptyRoomInfo;
          commentInfo.data = res.data.commentInfo;
          bookRoomCount.data = [];
          //根据返回的空房数量初始化记录预定房间数量的数组
          for (var i = 0; i < res.data.emptyRoomInfo.length; i++) {
            bookRoomCount.data.push({
              roomId: res.data.emptyRoomInfo[i].roomId,
              roomName: res.data.emptyRoomInfo[i].roomName,
              roomPrice: res.data.emptyRoomInfo[i].roomPrice,
              roomNumber: 0,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );

    function HandleClick() {
      console.log(activeTag);
    }

    function BookRoomNow() {
      /*****************************************************/
      store.state.totalPrice = 0;
      store.state.CurrentHotelName = detailInfo.data.hotelName;
      store.state.CurrentHotelLocation = detailInfo.data.hotelLocation;
      store.state.CurrentHotelFigURL = detailInfo.data.figURLs[0];
      store.state.bookRoomInfo = bookRoomCount.data;
      //根据bookRoomCount中的数据，进行提交，跳转到订单页面
      for (var i = 0; i < bookRoomCount.data.length; i++)
        store.state.totalPrice += bookRoomCount.data[i].roomPrice;

      router.push("/HotelOrder");
    }

    let activeTag = computed(() => {
      var showTag = [];
      for (var i = 0; i < detailInfo.data.characteristics.length; i++) {
        if (detailInfo.data.characteristics[i]) showTag.push(tagIndex[i]);
      }
      return showTag;
    });

    function SearchNewEmptyRoom() {
      var send_checkinTime = "0000-00-00";
      var send_checkoutTime = "9999-01-01";
      var send_roomCount = 0;
      //根据给定的时间和人数数据重新进行空房搜索
      if (searchTime.value[0] === undefined) send_checkinTime = "0000-00-00";
      else send_checkinTime = searchTime.value[0];

      if (searchTime.value[1] === undefined) send_checkoutTime = "9999-01-01";
      else send_checkoutTime = searchTime.value[1];

      if (searchPeopleNumber.value === undefined) send_roomCount = 1;
      else send_roomCount = searchPeopleNumber.value;

      http
        .post(store.state.serverAddr + "/localSearch", {
          selectTime: {
            checkinTime: send_checkinTime,
            checkoutTime: send_checkoutTime,
          },
          roomCount: send_roomCount,
          hotelId: store.state.searchHotelId,
        })
        .then(
          (res) => {
            emptyRoomData.data = res.data.emptyRoomInfo;
          },
          (err) => {
            console.log(err);
          }
        );
    }
    return {
      detailInfo,
      imgFitContain,
      tagIndex,
      commentInfo,
      bookRoomCount,
      searchTime,
      searchPeopleNumber,

      HandleClick,
      activeTag,
      emptyRoomData,
      BookRoomNow,
      SearchNewEmptyRoom,
    };
  },
  mounted() {},
};
</script>

<style scoped>
.HotelDetailHeader {
  margin-left: 2%;
}
.ImageWallBox {
  width: 90%;
  margin-left: 5%;
  height: 50vh;
}

.TagBox {
  margin: 2% 10%;
  width: 80%;
  justify-content: center;
}
.tag {
  margin: 1% 5%;
}
.descriptionBox {
  margin: 0 2%;
  width: 80%;
}
.introBox {
  line-height: 30px;
}
.roomTableBox {
  margin: 0 2%;
  width: 90%;
}
.commentBox {
  margin: 0 2%;
  width: 90%;
}
.strongText {
  margin-left: 50%;
  font-style: italic;
  font-weight: bold;
  font-size: larger;
}
.commentCardBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.SearchNewEmptyRoomBox {
  width: 80%;
  margin: 0% 10%;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.chooseInnerBox {
  padding: 0 2%;
}
</style>
