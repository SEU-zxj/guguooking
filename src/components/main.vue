<template>
  <div>
    <el-carousel :interval="4000" type="card" height="40vh">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!--选择框-->
    <div class="ChooseOutterBox">
      <div class="ChooseInnerBox">
        <el-cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          placeholder="请选择地点"
        />
      </div>

      <div class="ChooseInnerBox">
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>

      <div class="ChooseInnerBox">
        <el-input-number v-model="peopleNum" placeholder="·位客人" />
      </div>

      <div class="ChooseInnerBox">
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <!--[按地点]按地点横排-->
    <el-text size="large">快速轻松的规划旅行</el-text>
    <div class="PositionBox">
      <el-row gutter="50" class="RowLayout">
        <el-col v-for="o in 4" :key="o" :span="5" :offset="o == 1 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>Yummy hamburger</span>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!--[文章推荐]精彩下一站，灵感这里找-->
    <el-text size="large">精彩下一站，灵感这里找</el-text>
    <div class="NoteBox">
      <el-row class="RowLayout" :gutter="10">
        <el-col class="ColLayout" :span="11" :offset="1">
          <div class="leftFigureBox">
            <el-image
              style="width: 100%; height: 100%"
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              :fit="imgFitCover"
            >
            </el-image>
          </div>
        </el-col>
        <el-col :span="11"> </el-col>
      </el-row>
    </div>

    <!--[按评分推荐]最受用户欢迎的酒店-->
    <div class="RatingBox"></div>

    <!--[按住宿类型]-->
    <div class="TypeBox"></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Main",
  setup() {
    const value = ref([]);
    const options = [
      {
        value: "guide",
        label: "Guide",
        children: [
          {
            value: "disciplines",
            label: "Disciplines",
            children: [
              {
                value: "consistency",
                label: "Consistency",
              },
              {
                value: "feedback",
                label: "Feedback",
              },
              {
                value: "efficiency",
                label: "Efficiency",
              },
              {
                value: "controllability",
                label: "Controllability",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "side nav",
                label: "Side Navigation",
              },
              {
                value: "top nav",
                label: "Top Navigation",
              },
            ],
          },
        ],
      },
      {
        value: "component",
        label: "Component",
        children: [
          {
            value: "basic",
            label: "Basic",
            children: [
              {
                value: "layout",
                label: "Layout",
              },
              {
                value: "color",
                label: "Color",
              },
              {
                value: "typography",
                label: "Typography",
              },
              {
                value: "icon",
                label: "Icon",
              },
              {
                value: "button",
                label: "Button",
              },
            ],
          },
          {
            value: "form",
            label: "Form",
            children: [
              {
                value: "radio",
                label: "Radio",
              },
              {
                value: "checkbox",
                label: "Checkbox",
              },
              {
                value: "input",
                label: "Input",
              },
              {
                value: "input-number",
                label: "InputNumber",
              },
              {
                value: "select",
                label: "Select",
              },
              {
                value: "cascader",
                label: "Cascader",
              },
              {
                value: "switch",
                label: "Switch",
              },
              {
                value: "slider",
                label: "Slider",
              },
              {
                value: "time-picker",
                label: "TimePicker",
              },
              {
                value: "date-picker",
                label: "DatePicker",
              },
              {
                value: "datetime-picker",
                label: "DateTimePicker",
              },
              {
                value: "upload",
                label: "Upload",
              },
              {
                value: "rate",
                label: "Rate",
              },
              {
                value: "form",
                label: "Form",
              },
            ],
          },
          {
            value: "data",
            label: "Data",
            children: [
              {
                value: "table",
                label: "Table",
              },
              {
                value: "tag",
                label: "Tag",
              },
              {
                value: "progress",
                label: "Progress",
              },
              {
                value: "tree",
                label: "Tree",
              },
              {
                value: "pagination",
                label: "Pagination",
              },
              {
                value: "badge",
                label: "Badge",
              },
            ],
          },
          {
            value: "notice",
            label: "Notice",
            children: [
              {
                value: "alert",
                label: "Alert",
              },
              {
                value: "loading",
                label: "Loading",
              },
              {
                value: "message",
                label: "Message",
              },
              {
                value: "message-box",
                label: "MessageBox",
              },
              {
                value: "notification",
                label: "Notification",
              },
            ],
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [
              {
                value: "menu",
                label: "Menu",
              },
              {
                value: "tabs",
                label: "Tabs",
              },
              {
                value: "breadcrumb",
                label: "Breadcrumb",
              },
              {
                value: "dropdown",
                label: "Dropdown",
              },
              {
                value: "steps",
                label: "Steps",
              },
            ],
          },
          {
            value: "others",
            label: "Others",
            children: [
              {
                value: "dialog",
                label: "Dialog",
              },
              {
                value: "tooltip",
                label: "Tooltip",
              },
              {
                value: "popover",
                label: "Popover",
              },
              {
                value: "card",
                label: "Card",
              },
              {
                value: "carousel",
                label: "Carousel",
              },
              {
                value: "collapse",
                label: "Collapse",
              },
            ],
          },
        ],
      },
      {
        value: "resource",
        label: "Resource",
        children: [
          {
            value: "axure",
            label: "Axure Components",
          },
          {
            value: "sketch",
            label: "Sketch Templates",
          },
          {
            value: "docs",
            label: "Design Documentation",
          },
        ],
      },
    ];
    const timeRange = ref([]);
    const imgFitCover = "cover";
    const peopleNum = ref();

    var LocationInfo = [
      {
        imgUrl:
          "https://ts1.cn.mm.bing.net/th/id/R-C.13a9b8b347651d085c7bf90fbace5624?rik=q6t2JgkiiYcgzg&riu=http%3a%2f%2fp2.qhimgs4.com%2ft01fd61ef8c5088feff.jpg&ehk=jhcduyGu1W8AU4aQQPNj6%2feRs3UuA1fOsBzhWM5qVa0%3d&risl=&pid=ImgRaw&r=0",
        locationName: "中国",
        info: "中国是一个美丽的国家",
      },
      {
        imgUrl:
          "https://ts1.cn.mm.bing.net/th/id/R-C.d7ae5e8db0971f33890576b1b4fd5c19?rik=2KvMADEQKuM9WQ&riu=http%3a%2f%2fb4-q.mafengwo.net%2fs9%2fM00%2fB4%2f96%2fwKgBs1gAi8mAK_8eACErk-sdm7899.jpeg&ehk=viDzJSyV3dgpLKhVpkbsxXRUKSoH548738oiwkJH5AA%3d&risl=1&pid=ImgRaw&r=0",
        locationName: "日本",
        info: "日本是一个美丽的国家",
      },
      {
        imgUrl: "https://youimg1.c-ctrip.com/target/100l12000000spxy6BEC7.jpg",
        locationName: "英国",
        info: "英国是一个美丽的国家",
      },
      {
        imgUrl:
          "https://pic3.zhimg.com/v2-289ee4a9294859f66831465efe6aca5a_r.jpg",
        locationName: "美国",
        info: "美国是一个美丽的国家",
      },
    ];

    const currentDate = ref(new Date());

    const handleChange = (value) => {
      console.log(value);
    };
    return {
      value,
      options,
      timeRange,
      peopleNum,
      LocationInfo,
      currentDate,
      imgFitCover,

      handleChange,
    };
  },
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.PositionBox {
  text-align: center;
}
.RowLayout {
  width: 100vw;
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
  height: 30vh;
}
</style>
