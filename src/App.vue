<template>
  <el-menu
    :default-active="activeIndex"
    class="myMenu"
    mode="horizontal"
    background-color="#000000"
    text-color="#fff"
    active-text-color="#000000"
    :ellipsis="false"
    style="padding-left: 10%"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <el-image
        style="height: 100%"
        @click="app2Main()"
        :src="require('@/assets/logo-remove-white.png')"
      />
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="1">
      <!-- 按钮1 币种 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="选择你使用的货币"
        placement="bottom"
      >
        <el-button
          class="btnMenu"
          style="width: 60px; height: 50px"
          color="#000000"
          @click="dialogFormVisible_money = true"
        >
          <el-text tag="b" style="color: #fff; font-size: large">CNY</el-text>
        </el-button>
      </el-tooltip>

      <!-- 按钮2 语言 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="选择语言"
        placement="bottom"
      >
        <el-button
          class="btnMenu"
          style="width: 50px; height: 50px"
          color="#000000"
          @click="dialogFormVisible_language = true"
        >
          <el-image
            style="width: 25px; height: 25px"
            :src="require('@/assets/menu_icon/language/China.png')"
          />
        </el-button>
      </el-tooltip>
      <!-- 按钮3 关注公众号 -->
      <el-popover placement="top" :width="215" trigger="hover">
        <template #reference>
          <el-button
            class="btnMenu"
            style="width: 50px; height: 50px"
            color="#000000"
          >
            <el-image
              style="width: 25px; height: 25px"
              :src="require('@/assets/menu_icon/weiChat.svg')"
            />
          </el-button>
        </template>
        <div style="text-align: center">
          <el-text>关注Guguooking.com公众号</el-text>
          <div style="display: flex">
            <div style="flex: 1"></div>
            <el-image
              style="width: 80%"
              :src="require('@/assets/QRcode.png')"
            />
            <div style="flex: 1"></div>
          </div>
          <el-text>全球特价酒店应有尽有！</el-text>
        </div>
      </el-popover>
      <!-- 按钮4 联系客服 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="联系客服"
        placement="bottom"
      >
        <el-button
          class="btnMenu"
          style="width: 50px; height: 50px"
          color="#000000"
        >
          <el-image
            style="width: 25px; height: 25px"
            :src="require('@/assets/menu_icon/Question.svg')"
          />
        </el-button>
      </el-tooltip>
      <!-- 按钮5 上线我的住宿 -->
      <el-button
        size="large"
        style="width: 120px; height: 40px; border-color: #fff"
        color="#000000"
        >上线我的住宿</el-button
      >
      <!-- 按钮6 注册 -->
      <el-button
        v-if="!store.state.isLogin"
        style="height: 40px"
        @click="dialogFormVisible_add = true"
        >注册</el-button
      >
      <!-- 按钮7 登录 -->
      <el-button
        v-if="!store.state.isLogin"
        style="height: 40px"
        @click="dialogFormVisible_log = true"
        >登录</el-button
      >
      <!-- 按钮8 个人账户 -->
      <el-popover
        v-if="store.state.isLogin"
        popper-class="submenu-popover"
        placement="top-end"
        :width="220"
        trigger="click"
      >
        <template #reference>
          <el-button
            class="btnMenu"
            style="width: auto; height: 50px"
            color="#000000"
          >
            <el-image
              style="
                width: 32px;
                height: 32px;
                border: solid 2px #f2b509;
                border-radius: 50%;
              "
              :src="require('@/assets/menu_icon/headImg.png')"
            />
            <el-text style="text-align: left; margin-left: 10px">
              <el-text tag="b" size="large" style="color: #fff"
                >你的账户</el-text
              ><br />
              <el-text style="color: #f2b509"> Gugugu 1级会员 </el-text>
            </el-text>
          </el-button>
        </template>
        <div v-for="item in subMenu" :key="item">
          <el-row
            class="submenu-row"
            style="height: 40px"
            align="middle"
            @click="subMenufunc(item.func)"
          >
            <el-col style="padding-left: 5%">
              <el-image
                style="width: 23px; vertical-align: middle"
                :src="require('@/assets/menu_icon/' + item.icon)"
              />
              <el-text style="color: #000000; vertical-align: middle">{{
                "&nbsp;&nbsp;" + item.name
              }}</el-text>
            </el-col>
          </el-row>
        </div>
      </el-popover>
    </el-menu-item>
  </el-menu>

  <!-- 选择币种 对话框 -->
  <el-dialog
    v-model="dialogFormVisible_money"
    style="text-align: left; margin-top: 30px; border-radius: 8px"
    width="65%"
    align-center
  >
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121">选择币种</span>
      </span>
    </template>
    <el-row>
      <el-col :span="24">
        <el-text tag="b" size="large" color="#fff">为你推荐</el-text>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">欧元</el-text
          ><br /><el-text>EUR</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">港币</el-text
          ><br /><el-text>HKD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">美元</el-text
          ><br /><el-text>USD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">英镑</el-text
          ><br /><el-text>GBP</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">澳元</el-text
          ><br /><el-text>AUD</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-text tag="b" size="large" color="#fff">所有货币</el-text>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">住宿地使用的货币</el-text
          ><br /><el-text>£$€</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          shadow="hover"
          style="background-color: #f0f6fd; border: 0px"
          @click="dialogFormVisible_money = false"
        >
          <el-row>
            <el-col :span="19">
              <el-text style="color: #3c8dea" size="large">人民币</el-text
              ><br />
              <el-text style="color: #3c8dea">CNY</el-text>
            </el-col>
            <el-col :span="5">
              <el-image
                style="width: 26px; height: 26px; vertical-align: middle"
                :src="require('@/assets/cordMoney_true.svg')"
              />
            </el-col>
          </el-row> </el-card
      ></el-col>
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">丹麦克朗</el-text
          ><br /><el-text>DKK</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">乌克兰赫夫米</el-text
          ><br /><el-text>UAH</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">俄罗斯卢布</el-text
          ><br /><el-text>RUB</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">加元</el-text
          ><br /><el-text>CAD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">匈牙利福林</el-text
          ><br /><el-text>HUF</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">南非兰特</el-text
          ><br /><el-text>ZAR</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">卡塔尔里亚尔</el-text
          ><br /><el-text>QAR</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">印尼卢比</el-text
          ><br /><el-text>IDR</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">印度卢比</el-text
          ><br /><el-text>INR</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">哈萨克斯坦坚戈</el-text
          ><br /><el-text>KZT</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">哥伦比亚比索</el-text
          ><br /><el-text>COP</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">埃及镑</el-text
          ><br /><el-text>EGP</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">墨西哥比索</el-text
          ><br /><el-text>MXN</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">挪威克朗</el-text
          ><br /><el-text>NOK</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">斐济元</el-text
          ><br /><el-text>FJD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">新元</el-text
          ><br /><el-text>SGD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">新台币</el-text
          ><br /><el-text>TWD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">新西兰元</el-text
          ><br /><el-text>NZD</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">日元</el-text
          ><br /><el-text>JPY</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">泰铢</el-text
          ><br /><el-text>THB</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">港币</el-text
          ><br /><el-text>HKD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">澳元</el-text
          ><br /><el-text>AUD</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">瑞士法郎</el-text
          ><br /><el-text>CHF</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">美元</el-text
          ><br /><el-text>USD</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">英镑</el-text
          ><br /><el-text>GBP</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">韩元</el-text
          ><br /><el-text>KRW</el-text></el-card
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">西非法郎</el-text
          ><br /><el-text>XOF</el-text></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-text style="color: #212121" size="large">马来西亚令吉</el-text
          ><br /><el-text>MYR</el-text></el-card
        ></el-col
      >
    </el-row>
  </el-dialog>

  <!-- 选择语言 对话框 -->
  <el-dialog
    v-model="dialogFormVisible_language"
    style="text-align: left; border-radius: 8px"
    width="65%"
    align-center
  >
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121">选择语言</span>
      </span>
    </template>
    <el-row>
      <el-col :span="24">
        <el-text tag="b" size="large" color="#fff">为你推荐</el-text>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-image
            style="width: 20px; height: 20px; vertical-align: middle"
            :src="require('@/assets/menu_icon/language/UK.png')"
          />
          <el-text style="color: #212121; vertical-align: middle" size="large"
            >&nbsp;&nbsp;&nbsp;English(UK)</el-text
          ></el-card
        ></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-text tag="b" size="large" color="#fff">所有语言</el-text>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card shadow="hover" style="border: 0px">
          <el-image
            style="width: 20px; height: 20px; vertical-align: middle"
            :src="require('@/assets/menu_icon/language/UK.png')"
          />
          <el-text style="color: #212121; vertical-align: middle" size="large"
            >&nbsp;&nbsp;&nbsp;English(UK)</el-text
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          shadow="hover"
          style="height: 60px; background-color: #f0f6fd; border: 0px"
          @click="dialogFormVisible_language = false"
        >
          <el-row>
            <el-col :span="19">
              <el-image
                style="width: 20px; height: 20px; vertical-align: middle"
                :src="require('@/assets/menu_icon/language/China.png')"
              />
              <el-text
                style="color: #3c8dea; vertical-align: middle"
                size="large"
                >&nbsp;&nbsp;&nbsp;简体中文</el-text
              >
            </el-col>
            <el-col :span="5">
              <el-image
                style="width: 26px; height: 26px"
                :src="require('@/assets/cordMoney_true.svg')"
              />
            </el-col>
          </el-row> </el-card
      ></el-col>
    </el-row>
  </el-dialog>

  <!--登录 对话框-->
  <el-dialog
    v-model="dialogFormVisible_log"
    style="text-align: left; border-radius: 8px"
  >
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121">登录</span>
      </span>
    </template>
    <el-form
      ref="myLogForm"
      :rules="logRules"
      label-position="top"
      label-width="auto"
      :model="logForm"
      style="width: 60%; margin-left: 20%"
      size="default"
    >
      <el-form-item prop="checked">
        <el-checkbox v-model="logForm.checked">
          <el-text>我已阅读并同意</el-text>
          <el-link
            href="https://element-plus.org"
            type="primary"
            :underline="false"
            >使用条款</el-link
          >
          <el-text>及</el-text>
          <el-link
            href="https://element-plus.org"
            type="primary"
            :underline="false"
            >隐私声明</el-link
          >
        </el-checkbox>
      </el-form-item>

      <el-form-item label="电话号码" prop="tel">
        <el-input
          placeholder="请输入电话号码"
          clearable
          v-model="logForm.tel"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          placeholder="请输入密码"
          v-model="logForm.pass"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="FormCancle">取消</el-button>
        <el-button type="primary" @click="FormConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 注册 对话框 -->
  <el-dialog
    v-model="dialogFormVisible_add"
    style="text-align: left; border-radius: 8px"
  >
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121">注册账号</span>
      </span>
    </template>
    <el-form
      ref="myAddForm"
      :rules="addRules"
      label-position="top"
      label-width="auto"
      :model="addForm"
      style="width: 60%; margin-left: 20%"
      size="default"
    >
      <el-form-item prop="checked">
        <el-checkbox v-model="addForm.checked">
          <el-text>我已阅读并同意</el-text>
          <el-link
            href="https://element-plus.org"
            type="primary"
            :underline="false"
            >使用条款</el-link
          >
          <el-text>及</el-text>
          <el-link
            href="https://element-plus.org"
            type="primary"
            :underline="false"
            >隐私声明</el-link
          >
        </el-checkbox>
      </el-form-item>

      <el-form-item label="电话号码" prop="tel">
        <el-input
          placeholder="请输入电话号码"
          clearable
          v-model="addForm.tel"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          placeholder="请输入密码"
          v-model="addForm.pass"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="pass2">
        <el-input
          placeholder="请再次输入密码"
          v-model="addForm.pass2"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormCancle">取消</el-button>
        <el-button type="primary" @click="addFormConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <router-view></router-view>
</template>

<script>
import { reactive, ref, unref } from "vue";
import { ElMessage } from "element-plus";
import http from "../src/plugins/axiosInstance";
// import { useStore } from "vuex"; //1.从vuex中引入useStore
import store from "@/store/index";
import router from "@/router";

export default {
  setup() {
    // 是否登录
    // var isLogin = ref(false);

    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };

    /* 币种 */
    var dialogFormVisible_money = ref(false); //币种对话框显示
    const moneyForm = reactive({
      kindOfMoney: "",
    });

    /* 语言 */
    var dialogFormVisible_language = ref(false);
    const languageForm = reactive({
      kindOflanguage: "",
    });
    /* 你的账户 */
    const subMenu = [
      {
        name: "管理账号",
        icon: "my_icon/user.svg",
        func: 0,
      },
      {
        name: "订单和行程",
        icon: "my_icon/order.svg",
        func: 1,
      },
      {
        name: "Gugugu会员奖励计划",
        icon: "my_icon/vip.svg",
        func: 2,
      },
      {
        name: "退出账号",
        icon: "my_icon/logout.svg",
        func: 3,
      },
    ];
    const subMenufunc = (index) => {
      switch (index) {
        case 0:
          break;
        case 1:
          app2CheckOrder();
          break;
        case 2:
          break;
        case 3:
          //改变登录状态判断
          store.state.isLogin = false;
          //返回主页面
          router.push("/Main");
          break;
        default:
          break;
      }
    };
    /*注册*/
    const myAddForm = ref(null);
    var dialogFormVisible_add = ref(false); //register对话框显示
    const addForm = reactive({
      checked: [],
      tel: "",
      pass: "",
      pass2: "",
    });

    //注册 表单验证
    const addRules = reactive({
      checked: [
        {
          type: "array",
          required: true,
          massage: "请接受条款和条件，然后进行下一步操作",
          trigger: "change",
        },
      ],
      tel: [{ required: true, massage: "请输入您的电话号码", trigger: "blur" }],
      pass: [{ required: true, massage: "请输入密码", trigger: "blur" }],
      pass2: [{ required: true, massage: "请再次输入密码", trigger: "blur" }],
    });

    // function checkPassword2(rule, value, callback) {
    //   //二次验证密码
    //   if (!value) {
    //     callback("请再次输入密码");
    //   }
    //   if (addForm.pass) {
    //     if (addForm.pass === value) {
    //       callback();
    //     } else {
    //       callback("两次输入密码不一致，请重新输入");
    //     }
    //   } else {
    //     callback("请先输入密码");
    //   }
    // }

    function addFormConfirm() {
      myAddForm.value.validate((valid) => {
        if (valid) {
          console.log("注册 表单验证通过-all");
          // 接口
          http
            .post(store.state.serverAddr2 + "/register", {
              phone: addForm.tel,
              password: addForm.pass,
            })
            .then(
              (res) => {
                console.log("注册 结果");
                console.log(res);
                dialogFormVisible_add.value = false;
                if (res.data.code === "0") {
                  //成功
                  ElMessage({
                    showClose: true,
                    message: "注册成功！",
                    type: "success",
                  });
                  console.log("注册成功！用户电话=" + store.userPhoneNumber);

                  const form = unref(myAddForm);
                  form.resetFields();

                  dialogFormVisible_log.value = true; //显示重新登录
                } else {
                  ElMessage({
                    showClose: true,
                    message: "注册失败，相关信息已被注册",
                    type: "error",
                  });
                }
                const form = unref(myAddForm);
                form.resetFields();
              },
              (err) => {
                console.log(err);
                ElMessage({
                  showClose: true,
                  message: "出错了，请联系管理员处理（注册）",
                  type: "error",
                });
              }
            );
        } else {
          console.log("注册 表单验证未通过");
        }
      });
    }

    function addFormCancle() {
      const form = unref(myAddForm);
      form.resetFields();
      console.log("关闭表单");
      dialogFormVisible_add.value = false;
    }

    /*登录 */
    const myLogForm = ref(null);
    // const router = useRouter()
    var dialogFormVisible_log = ref(false); //log对话框显示
    const logForm = reactive({
      checked: [],
      tel: "",
      pass: "",
    });

    //log 表单验证
    // function checkChecked(rule, value, callback) {
    //   console.log("value=" + value);
    //   if (!value) {
    //     callback(new Error("请接受条款和条件，然后进行下一步操作"));
    //   } else {
    //     if (logForm.checked) {
    //       logForm.validateField("checked");
    //     }
    //     callback();
    //   }
    // }

    // function checkTele(rule, value, callback) {
    //   const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    //   if (!value) {
    //     callback("请输入你的电话号码");
    //     return;
    //   }
    //   if (!reg.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {
    //     callback("请输入有效的电话号码");
    //     return;
    //   }
    //   callback();
    // }

    // function checkPassword(rule, value, callback) {
    //   const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    //   if (!value) {
    //     callback("请输入你的密码");
    //     return;
    //   }

    //   if (this.form.confirmPassword) {
    //     this.$refs.Form.validateField(["confirmPassword"]);
    //   }
    //   if (!reg.test(value)) {
    //     callback("请输入有效密码");
    //     return;
    //   }
    //   callback();
    // }

    const logRules = ref({
      checked: [
        {
          type: "array",
          required: true,
          massage: "请接受条款和条件，然后进行下一步操作",
          trigger: "change",
        },
      ],
      tel: [{ required: true, massage: "请输入您的电话号码", trigger: "blur" }],
      pass: [{ required: true, massage: "请输入密码", trigger: "blur" }],
    });

    function FormConfirm() {
      myLogForm.value.validate((valid) => {
        if (valid) {
          console.log("log表单验证通过-all");
          console.log(
            store.state.serverAddr2 +
              "/login?phone=" +
              logForm.tel +
              "&password=" +
              logForm.pass
          );
          // 接口
          // http
          //   .post(store.state.serverAddr + "/login", {
          //     phoneNumber: logForm.tel,
          //     password: logForm.pass,
          //   })
          http
            .get(store.state.serverAddr2 + "/login", {
              params: {
                phone: logForm.tel,
                password: logForm.pass,
              },
            })
            .then(
              (res) => {
                console.log(res);
                if (res.data.code === "0") {
                  dialogFormVisible_log.value = false;

                  store.userPhoneNumber = logForm.tel;
                  console.log("成功登录！用户电话=" + store.userPhoneNumber);

                  store.state.userToken = res.data.data.token;
                  //记录token
                  // window.localStorage.setItem('userToken', res.data.data.token)
                  //记录登录状态
                  store.state.isLogin = true;

                  const form = unref(myLogForm);
                  form.resetFields();
                  // setTimeout(() => {
                  //   //提示登录成功并0.5s后返回先前界面
                  //   router.go(-1);
                  // }, 500);
                } else {
                  ElMessage({
                    showClose: true,
                    message: res.data.msg,
                  });
                  dialogFormVisible_log.value = false; //消失 登录对话框
                  dialogFormVisible_add.value = true; //显示 注册对话框
                }
                const form = unref(myLogForm);
                form.resetFields();
              },
              (err) => {
                console.log(err);
                ElMessage({
                  showClose: true,
                  message: "出错了，请联系管理员处理（登录）",
                  type: "error",
                });
              }
            );
        } else {
          console.log("log表单验证未通过");
        }
      });
    }

    function FormCancle() {
      myLogForm.value.resetFields();
      console.log("关闭表单");
      dialogFormVisible_log.value = false;
    }

    // function Register() {
    //   let that = this;
    //   console.log("Register");
    //   http.get("https://autumnfish.cn/api/joke/list?num=2").then(
    //     (res) => {
    //       console.log(res);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );

    //   http
    //     .post(
    //       "https://581270ee-1944-469d-ad92-aee670aeb511.mock.pstmn.io/loginTest",
    //       {
    //         phoneNumber: "123456",
    //         password: "1234",
    //       }
    //     )
    //     .then(
    //       (res) => {
    //         console.log(res);
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    //   store.state.num += 1;
    //   console.log(store.state.num);
    // }

    /* 跳转函数 */
    const app2Main = () => {
      router.push("/Main");
    };
    const app2CheckOrder = () => {
      router.push("/CheckOrder");
    };
    return {
      /* 变量 */
      activeIndex,
      activeIndex2,
      //币种
      dialogFormVisible_money,
      moneyForm,
      // 语言
      dialogFormVisible_language,
      languageForm,
      subMenu,
      subMenufunc,
      //注册
      myAddForm,
      dialogFormVisible_add,
      addForm,
      addRules,
      //登录
      myLogForm,
      dialogFormVisible_log,
      logForm,
      logRules,

      store,

      /* 函数 */
      handleSelect,
      addFormCancle,
      addFormConfirm,
      FormCancle,
      FormConfirm,
      /* 跳转 */
      app2Main,
      app2CheckOrder,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0;
  height: 100%;
  width: 100%;
}
.flex-grow {
  flex-grow: 1;
}
.myMenu {
  height: 80px;
  padding-top: 10px;
  padding-right: 10%;
}
/**按钮 menu */
.myMenu .btnMenu {
  width: 50px;
  height: 50px;
}
.submenu-popover {
  height: auto;
  overflow: auto;
  align-content: center;
}
.submenu-row:hover {
  background-color: #f2f2f2;
}
/**布局 */
.el-row {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 8px;
  min-height: 36px;
}
</style>
