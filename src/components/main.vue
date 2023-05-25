<template>
  <div>
    <el-carousel :interval="4000" type="card" height="40vh">
      <el-carousel-item>
        <el-image :src="require('@/assets/logo-remove.png')"></el-image>
      </el-carousel-item>
      <el-carousel-item v-for="idx in showFigures.length" :key="idx">
        <el-image :src="showFigures[idx - 1]" :fit="imgFitCover"> </el-image>
      </el-carousel-item>
    </el-carousel>

    <div style="margin-left: 11.5%; margin-right: 11.5%">
      <!--选择框-->
      <div>
        <el-row
          :gutter="5"
          style="
            background-color: #ffb700;
            border-radius: 8px;
            height: 50px;
            padding: 5px 3px;
          "
        >
          <el-col :span="7">
            <el-cascader
              v-model="location"
              :options="options"
              placeholder="请选择地点"
              size="large"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="7" style="padding-right: 23px">
            <el-date-picker
              v-model="timeRange"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              style="width: 100%; height: 100%"
            />
          </el-col>
          <el-col :span="7">
            <el-input-number
              v-model="peopleNum"
              style="width: 100%; height: 100%"
              placeholder="·位客人"
            />
          </el-col>
          <el-col :span="3">
            <el-button
              style="width: 100%; height: 100%"
              color="black"
              @click="fullSearch"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </div>

      <!--[按地点]按地点横排-->
      <div class="TextHeader">
        <h1>快速轻松的规划旅行</h1>
      </div>
      <div class="PositionBox">
        <el-row gutter="20" class="RowLayout1">
          <el-col v-for="o in positionHotel.length" :key="o" :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <el-image
                :src="positionHotel[o - 1].figURL"
                :fit="imgFitCover"
                class="image"
              />
              <div style="padding: 14px">
                <span>{{ positionHotel[o - 1].description }}</span>
                <div class="bottom">
                  <el-button text class="button" @click="ClickCountry(o - 1)"
                    >去看看</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!--[文章推荐]精彩下一站，灵感这里找-->
      <div class="TextHeader">
        <h1>精彩下一站，灵感这里找</h1>
      </div>
      <div class="NoteBox">
        <el-row class="RowLayout" :gutter="20">
          <el-col class="ColLayout" :span="11">
            <div class="leftFigureBox">
              <el-image
                src="https://ac-a.static.booking.cn/xdata/images/xphoto/540x405/208985472.webp?k=68a3261af9bc68c05a7dfb0ec2a5b3fb5b79c0c6af4b8ff007594ac6f76fba2f&o="
                :fit="imgFitCover"
                @click="ClickPicture1"
                style="cursor: pointer; border-radius: 8px"
              >
              </el-image>
            </div>
          </el-col>
          <el-col class="ColLayout" :span="13">
            <el-row class="UpperFigureOuterBox">
              <el-image
                style="
                  width: 45%;
                  height: 100%;
                  cursor: pointer;
                  border-radius: 8px;
                "
                src="https://cf.bstatic.com/xdata/images/xphoto/540x405/137111309.webp?k=ce137c462680bc6d6d351866c4afed47794f355c0281aaa9581cbbbc0e6f3327&o="
                :fit="imgFitCover"
                @click="ClickPicture2"
              ></el-image>
              <div class="textBox" style="padding-left: 20px">
                <h1>加拿大</h1>
                <el-text truncated> 假期灵感：加拿大-路易斯湖 </el-text>
              </div>
            </el-row>
            <el-row class="LowerFigureOuterBox">
              <div class="textBox">
                <h1>法国</h1>
                <el-text truncated> 精选·七座享有盛名的法国葡萄酒庄园 </el-text>
              </div>
              <el-image
                style="
                  width: 45%;
                  height: 100%;
                  cursor: pointer;
                  border-radius: 8px;
                "
                src="https://cf.bstatic.com/xdata/images/xphoto/540x405/139790841.webp?k=14e384da30076fd7ea81f530718c535128f8a1871db19b0da19a61506c0a4855&o="
                :fit="imgFitCover"
                @Click="ClickPiture3"
              ></el-image>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!--[按评分推荐]最受用户欢迎的酒店-->
      <div class="TextHeader">
        <h1>用户最喜爱的酒店</h1>
      </div>
      <div class="RatingBox">
        <el-row gutter="20" class="RowLayout">
          <el-col v-for="o in popularHotels.data.length" :key="o" :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <el-image :src="popularHotels.data[o - 1].pictures"> </el-image>
              <div style="padding: 14px">
                <span>{{ popularHotels.data[o - 1].name }}</span>
                <p>
                  <el-text size="small">{{
                    popularHotels.data[o - 1].introduction
                  }}</el-text>
                </p>

                <p>
                  <el-text size="small">{{
                    popularHotels.data[o - 1].price
                  }}</el-text>
                </p>

                <div class="bottom">
                  <el-row :gutter="10">
                    <el-col :span="4">
                      <div
                        style="
                          border-radius: 10px 10px 10px 0px;
                          background-color: #ffb700;
                          width: 40px;
                          height: 40px;
                          display: flex;
                          flex-direction: center;
                          text-align: center;
                        "
                      >
                        <el-text style="color: white; margin-left: 20%">{{
                          popularHotels.data[o - 1].level
                        }}</el-text>
                      </div>
                    </el-col>
                    <!-- <el-col :span="14">
                      <el-text size="small">
                        {{ popularHotels.data[o - 1].commentNumber }}条用户评论
                      </el-text>
                    </el-col> -->
                    <el-col :span="6">
                      <el-button
                        style="width: 100%; height: 100%"
                        color="black"
                        @click="CheckPopularHotel(o - 1)"
                        >查看</el-button
                      >
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!--[按住宿类型]-->
      <div class="TextHeader">
        <h1>根据住宿类型浏览</h1>
      </div>
      <div class="TypeBox">
        <el-row :gutter="60" class="TypeRowLayout">
          <el-col v-for="o in hotelTypeURLList.data.length" :key="o" :span="8">
            <el-image
              :src="hotelTypeURLList.data[o - 1]"
              style="
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 8px;
              "
              :fit="imgFitCover"
              @click="ClickHotelTypes(o)"
            ></el-image>
            <el-text style="color: black; font-size: large" tag="b">{{
              hotelType[o - 1]
            }}</el-text>
          </el-col>
        </el-row>
      </div>
    </div>

    <div style="height: 10vh"></div>
    <div class="BottomInfoBox">
      <el-row :gutter="30" style="width: 100%; height: 100%">
        <el-col :span="15" :offset="1" class="linkInfoBox">
          <el-link
            type="primary"
            href="https://element-plus.org"
            target="_blank"
            >GitHub仓库</el-link
          >
          <el-link
            type="primary"
            href="https://element-plus.org"
            target="_blank"
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
      <!-- <el-row :gutter="30" style="width: 100%; height: 100%">
        <el-image
          src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
        ></el-image>
        <span>渝ICP备2023004802号</span>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import router from "@/router"; // 引入userRouter
import http from "@/plugins/axiosInstance";
import store from "@/store";

export default {
  name: "Main",
  setup() {
    //*******************************************************//
    //******请求受欢迎的酒店*********************************//
    var popularHotels = reactive({ data: [{}, {}, {}] });
    http
      .get(store.state.serverAddr2 + "/getPopular", {
        params: {},
        headers: {},
      })
      .then(
        (res) => {
          // popularHotels.data = res.data;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].pictures = res.data[i].pictures.split(";")[0];
          }
          popularHotels.data = res.data;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    const location = ref([]);
    const options = store.state.options;
    const timeRange = ref([]);
    const imgFitCover = "cover";
    const peopleNum = ref();

    const hotelType = ["酒店", "公寓", "民宿"];

    const currentDate = ref(new Date());

    const showFigures = [
      "https://www.topbots.com/wp-content/uploads/2017/04/booking_800x350_web.png",
      "https://p1.ssl.qhimg.com/t0109f39d26036ca19d.jpg",
      "https://ts1.cn.mm.bing.net/th/id/R-C.21e5ddd5e08779bc9990111992f6691b?rik=%2b9Fx5gzinGe%2fzg&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f01a0ab57134f396ac725134312f1cd.jpg%401280w_1l_2o_100sh.jpg&ehk=0n8H3hY3De0%2bVJeFw83vTzd4pvvlDkx3Z9UGX2mSgxs%3d&risl=&pid=ImgRaw&r=0",
    ];

    const positionHotel = reactive([
      {
        figURL: "https://i.postimg.cc/pVwMTvDv/china.jpg",
        description: "中国",
      },
      {
        figURL:
          "https://ac-a.static.booking.cn/xdata/images/city/600x600/613088.jpg?k=a370ac3fb385fb211b35a79a42b0e968ddb458be37108af476c558bf4cedc1f3&o=",
        description: "法国",
      },
      {
        figURL:
          "https://ac-a.static.booking.cn/xdata/images/city/600x600/619763.jpg?k=3bfc62a779df5b92694287e9fc0b82d795f93700ddf8887d66f3191ee745dcc5&o=",
        description: "日本",
      },
      {
        figURL:
          "https://ac-a.static.booking.cn/xdata/images/hotel/square600/286659200.webp?k=e177d075cc62b532784bf1e671dc23011fec10163dd98ff7cff55c47c526afd7&o=",
        description: "英国",
      },
    ]);

    const hotelTypeURLList = reactive({
      data: [
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
      ],
    });

    function fullSearch() {
      //*****************************************************//
      //跳转到酒店详情页面，进行全局查询//
      //地点：location 数组
      //时间范围 timeRange 数组
      //人数：peopleNum

      store.state.searchHotelListType = "fullSearch";

      store.state.searchLocation = location.value;
      store.state.searchCheckinTime = timeRange.value[0];
      store.state.searchCheckoutTime = timeRange.value[1];
      store.state.searchPeopleNumber = peopleNum.value;

      if (store.state.searchLocation === undefined)
        store.state.searchLocation = ["中国"];
      if (store.state.searchCheckinTime === undefined)
        store.state.searchCheckinTime = 0;
      if (store.state.searchCheckoutTime === undefined)
        store.state.searchCheckoutTime = 2;
      if (store.state.searchPeopleNumber === undefined)
        store.state.searchPeopleNumber = 1;

      console.log(store.state.searchLocation);
      console.log(store.state.searchCheckinTime);
      console.log(store.state.searchCheckoutTime);
      console.log(store.state.searchPeopleNumber);

      router.push("/HotelList");
    }

    function ClickCountry(index) {
      console.log(positionHotel[index].description);
      var searchCountry = positionHotel[index].description;
      //**********************************************************//
      //根据去的国家进入酒店列表页面
      store.state.searchHotelListType = "countrySearch";
      store.state.searchLocation = [];
      store.state.searchLocation.push(searchCountry);
      router.push("/HotelList");
    }

    function ClickPicture1() {
      window.open(
        "https://www.booking.com/articles/japan-spring-flowers.zh.html?label=gen173nr-1FCAEoggI46AdIM1gEaDGIAQGYASu4ARfIAQzYAQHoAQH4AQuIAgGoAgO4AvnqkaMGwAIB0gIkZjE5NWRjNmQtZTFkYy00ZWI4LWE4MjUtYWJhNzU0OWU5NzY12AIG4AIB&amp;from_articles_widget=1&amp;force_lang=zh-cn",
        "_blank"
      );
    }

    function ClickPicture2() {
      window.open(
        "https://www.booking.com/articles/destination-inspiration--lake-louise-canada.xt.html?label=gen173nr-1FCAEoggI46AdIM1gEaDGIAQGYASu4ARfIAQzYAQHoAQGIAgGoAgO4AvnqkaMGwAIB0gIkZjE5NWRjNmQtZTFkYy00ZWI4LWE4MjUtYWJhNzU0OWU5NzY12AIG4AIB",
        "_blank"
      );
    }

    function ClickPiture3() {
      window.open(
        "https://www.booking.com/articles/chateau-hotels-in-france.xt.html?label=gen173nr-1FCAEoggI46AdIM1gEaDGIAQGYASu4ARfIAQzYAQHoAQGIAgGoAgO4AvnqkaMGwAIB0gIkZjE5NWRjNmQtZTFkYy00ZWI4LWE4MjUtYWJhNzU0OWU5NzY12AIG4AIB",
        "_blank"
      );
    }

    function ClickHotelTypes(index) {
      /************************************/
      //根据index的类型跳转到对应的页面
      //index = 0 代表酒店
      //index = 1 代表公寓
      //index = 2 代表民宿

      store.state.searchHotelListType = "typeSearch";
      if (index === 1) store.state.searchType = "酒店";
      else if (index === 2) store.state.searchType = "公寓";
      else store.state.searchType = "民宿";

      router.push("/HotelList");
    }

    function CheckPopularHotel(index) {
      //****************************************//
      var checkID = popularHotels.data[index].id;
      store.state.searchHotelId = checkID;
      //根据checkID查看酒店详情页面
      router.push("HotelDetail");
    }

    return {
      location,
      options,
      timeRange,
      peopleNum,
      currentDate,
      imgFitCover,
      hotelType,
      showFigures,
      positionHotel,
      popularHotels,
      hotelTypeURLList,

      fullSearch,
      ClickCountry,
      ClickPicture1,
      ClickPicture2,
      ClickPiture3,
      ClickHotelTypes,
      CheckPopularHotel,
    };
  },

  mounted() {},
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 40vh;
  margin: 0;
  text-align: center;
}

.el-carousel__item {
  background-color: #ffffff;
}

.ChooseOutterBox {
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.ChooseInnerBox {
  padding: 0 2vw;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  align-items: center;
}

.button {
  min-height: auto;
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  display: block;
}
.PositionBox {
  text-align: center;
}
.RowLayout1 {
  width: 100%;
}
.RowLayout {
  width: 100%;
  height: 50vh;
}
.ColLayout {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftFigureBox {
  width: 100%;
  height: 50vh;
}
.UpperFigureOuterBox {
  width: 100%;
  height: 43%;
}
.LowerFigureOuterBox {
  width: 100%;
  height: 43%;
}
.textBox {
  width: 50%;
  height: 100%;
}

.NoteBox {
  height: 50vh;
  width: 100%;
}

.TypeBox {
  height: 30vh;
  width: 100%;
}
.TypeRowLayout {
  height: 100%;
  width: 100%;
}

.TextHeader {
  width: 100%;
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
