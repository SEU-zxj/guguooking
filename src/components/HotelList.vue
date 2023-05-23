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
                  :src="showList.data[o - 1].pictures"
                  :fit="imgFitContain"
                  style="height: 100%; width: 100%"
                >
                </el-image>
              </el-col>
              <el-col :span="16">
                <el-row style="width: 100%">
                  <p class="HotelName">{{ showList.data[o - 1].name }}</p>
                  <p>{{ showList.data[o - 1].level }}分</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="CommentExample" style="width: 60%" truncated
                    >"{{ showList.data[o - 1].introduction }}"</el-text
                  >
                  <p>{{ showList.data[o - 1].location }}</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="HotelPrice"
                    >{{ showList.data[o - 1].price }}元</el-text
                  >
                </el-row>
                <el-row style="width: 100%">
                  <el-button
                    style="margin-left: 80%"
                    @click="BookHotel(showList.data[o - 1].id)"
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
    const options = store.state.options;

    const showList = reactive({
      data: [
        {
          id: 1,
          name: "东南大学九龙湖宾馆",
          address: "江宁区",
          level: 2,
          introduction: "很好的酒店",
          price: 999.99,
          pictures:
            "https://www.topbots.com/wp-content/uploads/2017/04/booking_800x350_web.png",
        },
      ],
    });
    //根据跳转到这个界面的类型进行接口的渲染
    var send_location = "";

    //获取当前日期
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

    function formatDate1(date, format) {
      var fmonth = date.getMonth() + 1;
      if (fmonth < 10) {
        fmonth = "0" + fmonth;
      }
      return format
        .replace("mm", fmonth)
        .replace("yyyy", date.getFullYear())
        .replace("dd", date.getDate() + 1);
    }

    console.log(
      dateDifference(
        formatDate(currentDate, "yyyy-mm-dd"),
        store.state.searchCheckinTime
      )
    );
    if (store.state.searchHotelListType === "fullSearch") {
      var len = store.state.searchLocation.length;
      for (var i = 0; i < len - 1; i++) {
        send_location += store.state.searchLocation[i];
        send_location += "-";
      }
      send_location +=
        store.state.searchLocation[store.state.searchLocation.length - 1];
      http
        .get(store.state.serverAddr2 + "/fullSearch", {
          params: {
            location: send_location,
            startTime: dateDifference(
              formatDate(currentDate, "yyyy-mm-dd"),
              store.state.searchCheckinTime
            ),
            endTime: dateDifference(
              formatDate(currentDate, "yyyy-mm-dd"),
              store.state.searchCheckoutTime
            ),
            number: store.state.searchPeopleNumber,
          },
          headers: { token: store.state.userToken },
        })
        .then(
          (res) => {
            // showList.data = res.data.hotelList;
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].pictures = res.data[i].pictures.split(";")[0];
            }
            showList.data = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (store.state.searchHotelListType === "countrySearch") {
      store.state.searchCheckinTime = formatDate(currentDate, "yyyy-mm-dd");
      store.state.searchCheckoutTime = formatDate1(currentDate, "yyyy-mm-dd");
      store.state.searchPeopleNumber = 1;
      http
        .get(store.state.serverAddr2 + "/countrySearch", {
          params: {
            country: store.state.searchLocation[0],
            startTime: 0,
            endTime: 1,
            number: 1,
          },
          headers: {
            token: store.state.userToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].pictures = res.data[i].pictures.split(";")[0];
            }
            showList.data = res.data;
            console.log(store.state.searchLocation[0]);
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (store.state.searchHotelListType === "typeSearch") {
      http
        .get(store.state.serverAddr2 + "/typeSearch", {
          params: { type: store.state.searchType },
          headers: { token: store.state.userToken },
        })
        .then(
          (res) => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].pictures = res.data[i].pictures.split(";")[0];
            }
            showList.data = res.data;
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

      store.state.searchCheckinTime = formData.selectTime[0];

      store.state.searchCheckoutTime = formData.selectTime[1];

      console.log(store.state.searchCheckinTime);
      console.log(store.state.searchCheckoutTime);

      store.state.searchPeopleNumber = formData.roomNumber;

      http
        .get(store.state.serverAddr2 + "/fullSearch", {
          params: {
            location: send_location,
            startTime: dateDifference(
              formatDate(currentDate, "yyyy-mm-dd"),
              store.state.searchCheckinTime
            ),
            endTime: dateDifference(
              formatDate(currentDate, "yyyy-mm-dd"),
              store.state.searchCheckoutTime
            ),
            number: store.state.searchPeopleNumber,
          },
          headers: { token: store.state.userToken },
        })
        .then(
          (res) => {
            // showList.data = res.data.hotelList;
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].pictures = res.data[i].pictures.split(";")[0];
            }
            showList.data = res.data;
            console.log(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    function BookHotel(id) {
      store.state.searchHotelId = id;
      router.push("HotelDetail");
    }

    //将yyyy-mm-dd格式的时间转化为数字
    function time2time(timeStr) {
      var time = new Date(timeStr);
      // console.log(timeStr)
      // console.log(time)
      // console.log(time.getFullYear() + " " + time.getMonth() + " " + time.getDate())
      return time;
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
      formData,
      options,
      imgFitContain,
      showList,
      currentDate,

      SearchHotel,
      BookHotel,
      formatDate,
      time2time,
      dateDifference,
      formatDate1,
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
