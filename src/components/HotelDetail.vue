<template>
  <div class="HotelDetail-layout">
    <div class="HotelDetailHeader">
      <h1>{{ detailInfo.data.name }}</h1>
      <p>{{ detailInfo.data.location }} | {{ detailInfo.data.address }}</p>
    </div>

    <div class="ImageWallBox">
      <el-carousel
        :interval="4000"
        indicator-position="outside"
        style="width: 100%; border-radius: 16px"
        height="50vh"
      >
        <el-carousel-item
          v-for="item in detailInfo.data.pictures.length"
          :key="item"
          style="width: 100%; height: 100%"
        >
          <el-image
            :src="detailInfo.data.pictures[item - 1]"
            style="width: 100%; height: 100%"
            :fit="imgFitContain"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="TagBox">
      <h3>热门设施/服务</h3>
      <el-tag class="tag" v-for="o in activeTag" :key="o" type="success">
        <el-image
          style="
            width: 30px;
            height: 30px;
            vertical-align: middle;
            margin-right: 5px;
          "
          :src="require('@/assets/tag/' + o.icon)"
        />
        <el-text
          style="vertical-align: middle; font-size: medium; color: green"
          >{{ o.tag }}</el-text
        >
      </el-tag>
    </div>

    <el-divider />

    <div class="descriptionBox">
      <h2>体验{{ detailInfo.data.name }}的优质服务，在这里你就是明星！</h2>
      <div style="margin: 0 3%">
        <el-text class="introBox">{{ detailInfo.data.introduction }}</el-text>
      </div>
    </div>

    <el-divider />

    <div class="roomTableBox">
      <h2>空房情况</h2>
      <el-row
        :gutter="3"
        style="
          background-color: #ffb700;
          border-radius: 5px;
          height: 40px;
          padding: 3px 1px;
          width: 83.5%;
          margin-bottom: 20px;
        "
      >
        <el-col :span="12" style="padding-right: 22px">
          <el-date-picker
            v-model="searchTime"
            value-format="YYYY-MM-DD"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            style="width: 100%; height: 100%"
          />
        </el-col>
        <el-col :span="8">
          <el-input-number
            v-model="searchPeopleNumber"
            placeholder="·位客人"
            style="width: 100%; height: 100%"
          />
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="SearchNewEmptyRoom"
            style="width: 100%; height: 100%"
            color="black"
            >更改搜索条件</el-button
          >
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="20">
          <el-table :data="emptyRoomData.data" border style="width: 100%">
            <el-table-column prop="roomType" label="房间类型" width="180" />
            <el-table-column prop="bedType" label="简介" width="180" />
            <el-table-column prop="number" label="可住人数" />
            <el-table-column prop="price" label="价格" />
            <el-table-column label="预定" width="200">
              <template #default="scope">
                <el-input-number
                  v-model="bookRoomCount.data[scope.$index].roomNumber"
                  :min="0"
                  :max="scope.row.available"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4" style="padding-left: 10px; padding-right: 10px">
          <el-button
            @click="BookRoomNow"
            style="width: 100%; height: 40px; font-size: large"
            color="#003b95"
            >现在就预定</el-button
          >
          <div style="margin-top: 20px; margin-left: 10px; font-size: small">
            <li>只需两分钟</li>
            <li>立即确认</li>
            <li>不收取预订手续费或信用卡手续费！</li>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider />

    <div class="commentBox">
      <h2>住客点评</h2>
      <el-row :gutter="0">
        <el-col :span="1">
          <el-tag
            style="
              width: 45px;
              height: 45px;
              border-radius: 8px 8px 8px 0px;
              background-color: #003b95;
              color: white;
              border: 0px;
              font-size: large;
            "
          >
            {{ commentInfo.data.avgScore }}
          </el-tag>
        </el-col>
        <el-col :span="12" style="padding-top: 8px; padding-left: 10px">
          <el-text
            v-if="commentInfo.data.avgScore >= 9.0"
            style="font-size: large"
            tag="b"
            >好极了</el-text
          >
          <el-text
            v-if="
              commentInfo.data.avgScore >= 8.0 &&
              commentInfo.data.avgScore < 9.0
            "
            style="font-size: large"
            tag="b"
            >很好！</el-text
          >
          <el-text
            v-if="
              commentInfo.data.avgScore >= 7.0 &&
              commentInfo.data.avgScore < 8.0
            "
            style="font-size: large"
            tag="b"
            >比较好</el-text
          >
          <el-text
            v-if="
              commentInfo.data.avgScore >= 6.0 &&
              commentInfo.data.avgScore < 7.0
            "
            style="font-size: large"
            tag="b"
            >一般</el-text
          >
          <el-text
            v-if="commentInfo.data.avgScore < 6.0"
            style="font-size: large"
            tag="b"
            >比较差</el-text
          >
          <el-text class="strongText">
            {{
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + commentInfo.data.commentNumber
            }}条用户评论
          </el-text>
        </el-col>
      </el-row>

      <div class="commentCardBox">
        <el-card
          v-for="o in commentInfo.data.commentList.length"
          :key="o"
          style="width: 32%"
          shadow="never"
        >
          <template #header>
            <el-row :gutter="10">
              <el-col :span="4">
                <el-avatar v-if="o === 1" style="background-color: #37448c">
                  {{ commentInfo.data.commentList[o - 1].phone.slice(0, 2) }}
                </el-avatar>
                <el-avatar v-if="o === 2" style="background-color: #cd3919">
                  {{ commentInfo.data.commentList[o - 1].phone.slice(0, 2) }}
                </el-avatar>
                <el-avatar v-if="o === 3" style="background-color: #799432">
                  {{ commentInfo.data.commentList[o - 1].phone.slice(0, 2) }}
                </el-avatar>
              </el-col>
              <el-col :span="16" style="padding-top: 10px"
                ><span>{{
                  commentInfo.data.commentList[o - 1].phone
                }}</span></el-col
              >
              <el-col :span="4" style="padding-top: 0px">
                <el-tag
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 8px 8px 8px 0px;
                    font-size: medium;
                  "
                >
                  {{ commentInfo.data.commentList[o - 1].level }}
                </el-tag>
              </el-col>
            </el-row>
          </template>
          <div class="text item">
            {{ commentInfo.data.commentList[o - 1].comment }}
          </div>
        </el-card>
      </div>
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
import { ElMessage } from "element-plus";

export default {
  name: "HotelDetail",
  setup() {
    const detailInfo = reactive({
      data: {
        id: 1,
        name: "东南大学九龙湖宾馆",
        location: "中国 江苏 南京",
        address: "鼓楼区",
        pictures: [
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
        introduction:
          "Paris j'Adore Hotel & Spa坐落于巴黎，提供带餐厅和酒吧的尊贵型住宿。这家尊贵型酒店配备露台，提供带免费WiFi和私人浴室的空调客房。住宿为客人配备客房服务、礼宾服务和行李寄存服务。这家酒店的每间客房都配备书桌。所有客房都提供咖啡机、电视和保险箱。部分客房还提供阳台；部分客房享有市景。Paris j'Adore Hotel & Spa的房间均配备免费洗浴用品和iPad。这家住宿每天早晨提供单点和欧陆式早餐两种选择。24小时前台工作人员会讲英语、西班牙语、法语和葡萄牙语，很乐意为客人提供当地的实用信息。Paris j'Adore Hotel & Spa附近的热门地标包括Gare Saint-Lazare、卡尼尔歌剧院和皮嘉尔地铁站。最近的机场是巴黎戴高乐机场，距离这家酒店有24公里。根据我们网站上的真实住客点评，这里是巴黎的人气地区之一。夫妻/情侣特别喜欢这家住宿的位置，为两人住宿体验给出了8.9分。",
        label: "1-1-1-1-1-1-1-1-1-1-1-0",
      },
    });

    const commentInfo = reactive({
      data: {
        avgScore: 8.7,
        commentNumber: 2977,
        commentList: [
          {
            phone: "0000000000",
            level: 8.8,
            comment:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
          {
            phone: "1111111",
            level: 8.8,
            comment:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
          {
            phone: "2222222",
            level: 8.8,
            comment:
              "这家店真是棒极了😍是我去过的最棒的酒店。👍👍👍强烈推荐大家到他们家住宿。🎉包你满意，不满意我V你50！",
          },
        ],
      },
    });
    var tagIndex = [
      "独立卫浴",
      "室内泳池",
      "急救包",
      "可用厨房",
      "空调",
      "全天热水",
      "餐饮提供",
      "运动中心",
      "洗衣机",
      "免费停车",
      "无障碍设施",
      "免费WiFi",
    ];
    var tagIcon = [
      "01.svg",
      "02.svg",
      "03.svg",
      "04.svg",
      "05.svg",
      "06.svg",
      "07.svg",
      "08.svg",
      "09.svg",
      "10.svg",
      "11.svg",
      "WiFi.svg",
    ];
    const imgFitContain = "cover";
    const emptyRoomData = reactive({
      data: [
        {
          id: 1,
          roomType: "双人间",
          bedType: "标间",
          number: 2,
          price: 400,
          available: 2,
        },
        {
          id: 2,
          roomType: "单人间",
          bedType: "标间",
          number: 1,
          price: 200,
          available: 2,
        },
        {
          id: 3,
          roomType: "三人间",
          bedType: "三张床",
          number: 3,
          price: 600,
          available: 9,
        },
      ],
    });
    const bookRoomCount = reactive({
      data: [
        {
          id: 100,
          roomType: "",
          roomNumber: 0,
          price: 0,
        },
        {
          id: 100,
          roomType: "",
          roomNumber: 0,
          price: 0,
        },
        {
          id: 100,
          roomType: "",
          roomNumber: 0,
          price: 0,
        },
      ],
    });

    const searchTime = ref([]);
    const searchPeopleNumber = ref(1);
    //************************************************//
    searchTime.value[0] = store.state.searchCheckinTime;
    searchTime.value[1] = store.state.searchCheckoutTime;
    //进行数据请求
    console.log(store.state.searchHotelId);

    //一共需要进行三次查询
    //首先查询酒店的详细信息
    //再查询酒店的空房情况
    //最后查询酒店的评论信息

    //*****查询酒店的详细信息*******//
    http
      .get(store.state.serverAddr2 + "/getInformation", {
        params: { hotelId: store.state.searchHotelId },
        headers: { token: store.state.userToken },
      })
      .then(
        (res) => {
          console.log(res);
          console.log(res.data[0].pictures);
          res.data[0].pictures = res.data[0].pictures.split(";");
          detailInfo.data = res.data[0];
        },
        (err) => {
          console.log(err);
        }
      );

    //查询空房情况，如果对应的全局时间段无效，默认查询今天到明天
    //如果全局参数人数无效，默认查询1个人
    //酒店号为全局区
    const currentDate = new Date(Date.now());

    function formatDate(date, format) {
      var fmonth = date.getMonth() + 1;
      if (fmonth < 10) {
        fmonth = "0" + fmonth;
      }
      return format
        .replace("mm", fmonth)
        .replace("yyyy", date.getFullYear())
        .replace("dd", date.getDate());
    }
    //请求该酒店对应时间内所有的空房情况
    http
      .get(store.state.serverAddr2 + "/localsearch", {
        params: {
          hotelId: store.state.searchHotelId,
          startTime:
            store.state.searchCheckinTime === undefined
              ? 0
              : dateDifference(
                  formatDate(currentDate, "yyyy-mm-dd"),
                  store.state.searchCheckinTime
                ),
          endTime:
            store.state.searchCheckoutTime === undefined
              ? 0
              : dateDifference(
                  formatDate(currentDate, "yyyy-mm-dd"),
                  store.state.searchCheckoutTime
                ),
          number:
            store.state.searchPeopleNumber === undefined
              ? 1
              : store.state.searchPeopleNumber,
        },
        headers: {
          token: store.state.userToken,
        },
      })
      .then(
        (res) => {
          //查询用户预定的入住时间和离店时间之间的天数
          var period = dateDifference(
            store.state.searchCheckinTime,
            store.state.searchCheckoutTime
          );
          console.log("period=" + period);
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].available = res.data[i].available.split("-");
            var minTemp = 1e9;
            if (res.data[i].available.length < period)
              period = res.data[i].available.length;
            console.log(res.data[i].available);
            console.log("period=" + period);
            for (var j = 0; j <= period; j++) {
              res.data[i].available[j] = parseInt(res.data[i].available[j]);
              minTemp = Math.min(minTemp, res.data[i].available[j]);
            }
            res.data[i].available = minTemp;
          }
          emptyRoomData.data = res.data;

          bookRoomCount.data = [];
          //根据返回的空房数量初始化记录预定房间数量的数组
          for (let i = 0; i < res.data.length; i++) {
            bookRoomCount.data.push({
              roomId: res.data[i].id,
              roomName: res.data[i].roomType + res.data[i].bedType,
              roomPrice: res.data[i].price,
              roomNumber: 0,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );

    //***查询酒店的评论信息****//
    http
      .get(store.state.serverAddr2 + "/commentAverage", {
        params: { hotelId: store.state.searchHotelId },
        headers: { token: store.state.userToken },
      })
      .then(
        (res) => {
          res.data.data = res.data.data.split(" ");
          commentInfo.data.commentNumber = parseInt(res.data.data[0]);
          commentInfo.data.avgScore = parseFloat(res.data.data[1]);
        },
        (err) => {
          console.log(err);
        }
      );

    http
      .get(store.state.serverAddr2 + "/commentGet", {
        params: { hotelId: store.state.searchHotelId },
        headers: { token: store.state.userToken },
      })
      .then(
        (res) => {
          console.log(res);
          commentInfo.data.commentList = res.data;
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
      store.state.CurrentHotelName = detailInfo.data.name;
      store.state.CurrentHotelLocation = detailInfo.data.location;
      store.state.CurrentHotelFigURL = detailInfo.data.pictures[0];
      store.state.bookRoomInfo = bookRoomCount.data;
      store.state.CurrentSelectTime = searchTime.value;
      //根据bookRoomCount中的数据，进行提交，跳转到订单页面
      var count = 0;
      for (var i = 0; i < bookRoomCount.data.length; i++) {
        store.state.totalPrice +=
          bookRoomCount.data[i].roomPrice * bookRoomCount.data[i].roomNumber;
        count += bookRoomCount.data[i].roomNumber;
      }
      if (count === 0 || searchTime.value.length === 0) {
        ElMessage({
          message: "请确保至少选择一个房间或者日期进行预定",
          type: "warning",
        });
      } else {
        console.log(store.state.totalPrice);
        router.push("/HotelOrder");
      }
    }

    let activeTag = computed(() => {
      var showTag = [];
      var tags = [];
      for (var i = 0; i < detailInfo.data.label.length; i += 2) {
        tags.push(detailInfo.data.label[i]);
      }

      for (let i = 0; i < tags.length; i++) {
        if (tags[i] === "1") {
          showTag.push({
            tag: tagIndex[i],
            icon: tagIcon[i],
          });
        }
      }
      return showTag;
    });
    function SearchNewEmptyRoom() {
      var send_checkinTime = "0000-00-00";
      var send_checkoutTime = "9999-01-01";
      var send_roomCount = 0;
      //根据给定的时间和人数数据重新进行空房搜索
      if (searchTime.value[0] === undefined) {
        send_checkinTime = store.state.searchCheckinTime;
        if (send_checkinTime === undefined) send_checkinTime = "0000-00-00";
      } else send_checkinTime = searchTime.value[0];

      if (searchTime.value[1] === undefined) {
        send_checkoutTime = store.state.searchCheckoutTime;
        if (send_checkoutTime === undefined) send_checkoutTime = "9999-01-01";
      } else send_checkoutTime = searchTime.value[1];

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

    //计算两个日期之间的天数
    function dateDifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      let dateSpan, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    }
    return {
      detailInfo,
      imgFitContain,
      tagIndex,
      commentInfo,
      bookRoomCount,
      searchTime,
      searchPeopleNumber,
      tagIcon,

      HandleClick,
      activeTag,
      emptyRoomData,
      BookRoomNow,
      SearchNewEmptyRoom,
      dateDifference,
      formatDate,
    };
  },
  mounted() {},
};
</script>

<style scoped>
.HotelDetail-layout {
  margin-left: 11.5%;
  margin-right: 11.5%;
}
.HotelDetailHeader {
  margin-left: 2%;
}
.ImageWallBox {
  margin-left: 5%;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 90%;
  height: 50vh;
}

.TagBox {
  margin-bottom: 50px;
  width: 90%;
  margin-left: 5%;
}
.tag {
  margin: 5px 7px;
  height: 40px;
  width: 170px;
  border-radius: 8px;
}
.descriptionBox {
  width: 100%;
}
.introBox {
  line-height: 30px;
}
.roomTableBox {
  width: 100%;
}
.commentBox {
  width: 100%;
}
.strongText {
  margin-left: -20px;
  font-style: italic;
  font-size: large;
}
.commentCardBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
