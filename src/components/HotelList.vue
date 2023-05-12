<template>
  <div class="TotleListBox">
    <el-row :gutter="40" style="width: 100%">
      <el-col :span="7" :offset="0" style="height: 50vh">
        <el-affix :offset="120" style="width: 100%">
          <el-card style="width: 100%; margin: 2% 2%" shadow="always">
            <el-form
              label-width="auto"
              :model="formLabelAlign"
              style="max-width: 100%"
            >
              <el-form-item label="地点" class="formItem">
                <el-cascader
                  v-model="formLabelAlign.loaction"
                  :options="options"
                  placeholder="请选择地点"
                />
              </el-form-item>
              <el-form-item label="TimeRange" class="formItem">
                <el-date-picker
                  v-model="formLabelAlign.selectTime"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="Start"
                  end-placeholder="End"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="RoomNumber" class="formItem">
                <el-input-number v-model="formLabelAlign.roomNumber" :min="1" />
              </el-form-item>
              <div class="SearchButtonBox">
                <el-button style="margin-left: 70%">🔍搜索</el-button>
              </div>
            </el-form>
          </el-card>
        </el-affix>
      </el-col>
      <el-col :span="16">
        <div v-for="o in 10" :key="o" class="HotelCardOutterBox">
          <el-card class="HotelCardBox">
            <el-row :gutter="20" style="height: 100%; width: 100%">
              <el-col :span="8">
                <el-image
                  src="https://youimg1.c-ctrip.com/target/100o0x000000l33nt6FCA.jpg"
                  :fit="imgFitContain"
                  style="height: 100%; width: 100%"
                >
                </el-image>
              </el-col>
              <el-col :span="16">
                <el-row style="width: 100%">
                  <p class="HotelName">东南大学九龙湖宾馆</p>
                  <p>7.9分</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="CommentExample" style="width: 60%" truncated
                    >"真的很Nice，住它！"</el-text
                  >
                  <p>9988条用户评论</p>
                </el-row>
                <el-row style="width: 100%">
                  <el-text class="HotelPrice">2800元</el-text>
                </el-row>
                <el-row style="width: 100%">
                  <el-button style="margin-left: 80%">立即预定！</el-button>
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
export default {
  name: "HotelList",
  setup() {
    const formLabelAlign = reactive({
      location: "",
      selectTime: "",
      roomNumber: 1,
    });
    const imgFitContain = "contain";
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

    return {
      formLabelAlign,
      options,
      imgFitContain,
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
