<template>
  <div class="TotleListBox">
    <el-row :gutter="40" style="width: 100%">
      <el-col :span="7" :offset="0" style="height: 50vh">
        <el-affix :offset="120" style="width: 100%">
          <el-card style="width: 100%; margin: 2% 2%" shadow="always">
            <el-form
              label-width="auto"
              :model="formData"
              style="max-width: 100%"
            >
              <el-form-item label="地点" class="formItem">
                <el-cascader
                  v-model="formData.location"
                  :options="options"
                  placeholder="请选择地点"
                />
              </el-form-item>
              <el-form-item label="TimeRange" class="formItem">
                <el-date-picker
                  v-model="formData.selectTime"
                  value-format="YYYY-MM-DD"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="Start"
                  end-placeholder="End"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="RoomNumber" class="formItem">
                <el-input-number v-model="formData.roomNumber" :min="1" />
              </el-form-item>
              <div class="SearchButtonBox">
                <el-button style="margin-left: 70%" @click="SearchHotel"
                  >🔍搜索</el-button
                >
              </div>
            </el-form>
          </el-card>
        </el-affix>
      </el-col>
      <el-col :span="16">
        <div
          v-for="o in showList.data.length"
          :key="o"
          class="HotelCardOutterBox"
        >
          <el-card class="HotelCardBox">
            <el-row :gutter="20" style="height: 100%; width: 100%">
              <el-col :span="8">
                <el-image
                  :src="showList.data[o - 1].figURL"
                  :fit="imgFitContain"
                  style="height: 100%; width: 100%"
                >
                </el-image>
              </el-col>
              <el-col :span="16">
                <el-row style="width: 100%">
                  <p class="HotelName">{{ showList.data[o - 1].hotelName }}</p>
                  <p>{{ showList.data[o - 1].score }}分</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="CommentExample" style="width: 60%" truncated
                    >"{{ showList.data[o - 1].comment }}"</el-text
                  >
                  <p>{{ showList.data[o - 1].commentNumber }}条用户评论</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="HotelPrice"
                    >{{ showList.data[o - 1].price }}元</el-text
                  >
                </el-row>
                <el-row style="width: 100%">
                  <el-button
                    style="margin-left: 80%"
                    @click="BookHotel(showList.data[o - 1].hotelId)"
                    >立即预定！</el-button
                  >
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="BottomInfoBox">
    <el-row :gutter="30" style="width: 100%; height: 100%">
      <el-col :span="15" :offset="1" class="linkInfoBox">
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
          class="BottomImageBox"
        ></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import router from "@/router"; // 引入userRouter
import http from "@/plugins/axiosInstance";
import store from "@/store";
export default {
  name: "HotelList",
  setup() {
    const formData = reactive({
      location: [],
      selectTime: [],
      roomNumber: 1,
    });
    const imgFitContain = "contain";
    const options = [
      {
        value: "中国",
        label: "中国",
        children: [
          {
            value: "江苏",
            label: "江苏",
            children: [
              {
                value: "南京",
                label: "南京",
              },
            ],
          },
          {
            value: "重庆",
            label: "重庆",
          },
          {
            value: "上海",
            label: "上海",
          },
        ],
      },
      {
        value: "美国",
        label: "美国",
        children: [
          {
            value: "纽约州",
            label: "纽约州",
            children: [
              {
                value: "纽约",
                label: "纽约",
              },
            ],
          },
          {
            value: "加利福尼亚",
            label: "加利福尼亚",
            children: [
              {
                value: "硅谷",
                label: "硅谷",
              },
            ],
          },
        ],
      },
    ];

    const showList = reactive({
      data: [
        {
          hotelId: 1,
          hotelName: "东南大学九龙湖宾馆",
          score: 22,
          briefIntro: "很好的酒店",
          comment: "我是评论案例",
          commentNumber: 9999,
          price: 999.99,
          figURL:
            "https://www.topbots.com/wp-content/uploads/2017/04/booking_800x350_web.png",
        },
      ],
    });
    //根据跳转到这个界面的类型进行接口的渲染
    var send_location = "";
    if (store.state.searchHotelListType === "fullSearch") {
      var len = store.state.searchLocation.length;
      for (var i = 0; i < len - 1; i++) {
        send_location += store.state.searchLocation[i];
        send_location += "-";
      }
      send_location +=
        store.state.searchLocation[store.state.searchLocation.length - 1];
      http
        .post(store.state.serverAddr + "/fullSearch", {
          location: send_location,
          selectTime: {
            checkinTime: store.state.searchCheckinTime,
            checkoutTime: store.state.searchCheckoutTime,
          },
          roomCount: store.state.searchPeopleNumber,
        })
        .then(
          (res) => {
            showList.data = res.data.hotelList;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (store.state.searchHotelListType === "countrySearch") {
      http
        .post(store.state.serverAddr + "/fullSearch", {
          location: store.state.searchLocation[0],
          selectTime: {
            checkinTime: "0000-00-00",
            checkoutTime: "9999-12-08",
          },
          roomCount: 1,
        })
        .then(
          (res) => {
            showList.data = res.data.hotelList;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (store.state.searchHotelListType === "typeSearch") {
      http
        .post(store.state.serverAddr + "/typeSearch", {
          hotelType: store.state.searchType,
        })
        .then(
          (res) => {
            showList.data = res.data.hotelList;
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      /* do nothing*/
    }

    function SearchHotel() {
      var send_location = "";
      var send_checkinTime = "";
      var send_checkoutTime = "";
      var send_roomCount = 0;
      if (formData.location === []) send_location = "中国";
      else {
        for (var i = 0; i < formData.location.length - 1; i++) {
          send_location += formData.location[i];
          send_location += "-";
        }
        send_location += formData.location[formData.location.length - 1];
      }

      if (formData.selectTime[0] === undefined) send_checkinTime = "0000-00-00";
      else send_checkinTime = formData.selectTime[0];

      if (formData.selectTime[1] === undefined)
        send_checkoutTime = "9999-01-01";
      else send_checkoutTime = formData.selectTime[1];

      if (formData.roomNumber === undefined) send_roomCount = 1;
      else send_roomCount = formData.roomNumber;

      http
        .post(store.state.serverAddr + "/fullSearch", {
          location: send_location,
          selectTime: {
            checkinTime: send_checkinTime,
            checkoutTime: send_checkoutTime,
          },
          roomCount: send_roomCount,
        })
        .then(
          (res) => {
            showList.data = res.data.hotelList;
          },
          (err) => {
            console.log(err);
          }
        );
    }
    function BookHotel(hotelId) {
      store.state.searchHotelId = hotelId;
      router.push("HotelDetail");
    }
    return {
      formData,
      options,
      imgFitContain,
      showList,

      SearchHotel,
      BookHotel,
    };
  },
};
</script>

<style scoped>
.TotleListBox {
  width: 100%;
}

.formItem {
  padding: 5% 0;
}

.SearchButtonBox {
  width: 100%;
}

.HotelCardBox {
  height: 100%;
  width: 100%;
  margin: 2%;
}
.HotelName {
  padding-right: 60%;
  font-size: 20px;
  font-weight: bold;
}
.CommentExample {
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
}
.HotelPrice {
  font-size: 20px;
  font-weight: bold;
  color: black;
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

.BottomImageBox {
  width: 80%;
  height: 80%;
}
</style>
