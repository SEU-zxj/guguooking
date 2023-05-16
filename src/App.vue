<template>
  <el-menu
    :default-active="activeIndex"
    class="myMenu"
    mode="horizontal"
    background-color="#000000"
    text-color="#fff"
    active-text-color="#000000"
    :ellipsis="false"
    style="padding-left: 10%;"
    @select="handleSelect"
  >
  
    <el-menu-item index="0">
          <el-image
        style="height: 100%"
        :src="require('@/assets/logo-remove-white.png')"
      />
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="1">
      <!-- 按钮1 币种 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="选择币种"
        placement="bottom"
      >
        <el-button class="btnMenu" style="width: 60px;height: 50px;" color="#000000" :dark="isDark" @click="dialogFormVisible_money = true">
          <el-text tag="b" size="large" style="color:#fff;">CNY</el-text>
        </el-button>
      </el-tooltip>
      
      <!-- 按钮2 语言 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="选择语言"
        placement="bottom"
      >
        <el-button class="btnMenu" style="width: 50px;height: 50px;" color="#000000" :dark="isDark"  @click="dialogFormVisible_language = true">
          <el-image style="width: 25px; height: 25px" :src="require('@/assets/menu_icon/language/China.png')" :fit="fit" />
        </el-button>
      </el-tooltip>
     <!-- 按钮3 关注公众号 -->
      <el-popover
      placement="top"
      :width="215"
      trigger="hover"
      >
        <template #reference>
          <el-button class="btnMenu" style="width: 50px;height: 50px;" color="#000000" :dark="isDark" >
            <el-image style="width: 25px; height: 25px" :src="require('@/assets/menu_icon/weiChat.svg')" :fit="fit" />
          </el-button>
        </template>
        <div style="text-align: center;" >
          <el-text>关注Guguooking.com公众号</el-text>
          <div style="display: flex">
            <div style="flex: 1"></div>
              <el-image
              style="width:70%;"
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
          <el-button class="btnMenu" style="width: 50px;height: 50px;" color="#000000" :dark="isDark" >
            <el-image style="width: 25px; height: 25px" :src="require('@/assets/menu_icon/Question.svg')" :fit="fit" />
          </el-button>
        </el-tooltip>
      <!-- 按钮5 上线我的住宿 -->
      <el-button size="large" style="width: 120px;height: 40px;border-color: #fff;" color="#000000" :dark="isDark">上线我的住宿</el-button>
      <!-- 按钮6 注册 -->
      <el-button style="height: 40px;" @click="dialogFormVisible_add = true">注册</el-button>
      <!-- 按钮7 登录 -->
      <el-button style="height: 40px;" @click="dialogFormVisible_log = true">登录</el-button>      
    </el-menu-item>
    
  </el-menu>

  <!-- 选择币种 对话框 -->
  <el-dialog 
    v-model="dialogFormVisible_money" 
    style="text-align:left;margin-top: 30px;border-radius: 8px;"
    width="65%"
    align-center
  >
  <template #title>
        <span class="dialog-title">
          <span style="font-size: 25px; color: #212121;">选择币种</span> 
        </span>
      </template>
    <el-row >
      <el-col :span="24">
        <el-text tag="b" size="large" color="#fff">为你推荐</el-text>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">欧元</el-text><br><el-text >EUR</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">港币</el-text><br><el-text >HKD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">美元</el-text><br><el-text >USD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">英镑</el-text><br><el-text >GBP</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">澳元</el-text><br><el-text >AUD</el-text></el-card></el-col>
      </el-row>
    <el-row >
        <el-col :span="24">
          <el-text tag="b" size="large" color="#fff">所有货币</el-text>
        </el-col>
      </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">住宿地使用的货币</el-text><br><el-text >£$€</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="background-color: #f0f6fd;border: 0px;" @click="dialogFormVisible_money = false"> 
        <el-row>
          <el-col :span="19">
            <el-text style="color:#3c8dea;" size="large">人民币</el-text><br>
              <el-text style="color:#3c8dea;">CNY</el-text>
          </el-col>
          <el-col :span="5">
            <el-image style="width: 26px; height: 26px;vertical-align: middle;" :src="require('@/assets/cordMoney_true.svg')" :fit="fit" />
          </el-col>
        </el-row>
        </el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">丹麦克朗</el-text><br><el-text >DKK</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">乌克兰赫夫米</el-text><br><el-text >UAH</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">俄罗斯卢布</el-text><br><el-text >RUB</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">加元</el-text><br><el-text >CAD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">匈牙利福林</el-text><br><el-text >HUF</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">南非兰特</el-text><br><el-text >ZAR</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">卡塔尔里亚尔</el-text><br><el-text >QAR</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">印尼卢比</el-text><br><el-text >IDR</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">印度卢比</el-text><br><el-text >INR</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">哈萨克斯坦坚戈</el-text><br><el-text >KZT</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">哥伦比亚比索</el-text><br><el-text >COP</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">埃及镑</el-text><br><el-text >EGP</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">墨西哥比索</el-text><br><el-text >MXN</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">挪威克朗</el-text><br><el-text >NOK</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">斐济元</el-text><br><el-text >FJD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">新元</el-text><br><el-text >SGD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">新台币</el-text><br><el-text >TWD</el-text></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
        <el-text style="color:#212121;" size="large">新西兰元</el-text><br><el-text >NZD</el-text></el-card></el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">日元</el-text><br><el-text >JPY</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">泰铢</el-text><br><el-text >THB</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">港币</el-text><br><el-text >HKD</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">澳元</el-text><br><el-text >AUD</el-text></el-card></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">瑞士法郎</el-text><br><el-text >CHF</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">美元</el-text><br><el-text >USD</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">英镑</el-text><br><el-text >GBP</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">韩元</el-text><br><el-text >KRW</el-text></el-card></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">西非法郎</el-text><br><el-text >XOF</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-text style="color:#212121;" size="large">马来西亚令吉</el-text><br><el-text >MYR</el-text></el-card></el-col>
      </el-row>
  </el-dialog>
  <!-- 选择语言 对话框 -->
  <el-dialog 
      v-model="dialogFormVisible_language" 
      style="text-align:left;border-radius: 8px;"
      width="65%"
      align-center
    >
    <template #title>
          <span class="dialog-title">
            <span style="font-size: 25px; color: #212121;">选择语言</span> 
          </span>
        </template>
      <el-row >
        <el-col :span="24">
          <el-text tag="b" size="large" color="#fff">为你推荐</el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-image style="width: 20px; height: 20px;vertical-align: middle;" :src="require('@/assets/menu_icon/language/UK.png')" :fit="fit" />
          <el-text style="color:#212121;vertical-align: middle;" size="large">&nbsp;&nbsp;&nbsp;English(UK)</el-text></el-card></el-col>
      </el-row>
      <el-row >
          <el-col :span="24">
            <el-text tag="b" size="large" color="#fff">所有语言</el-text>
          </el-col>
        </el-row>
      <el-row :gutter="10">
         <el-col :span="6"><el-card shadow="hover" style="border: 0px;"> 
          <el-image style="width: 20px; height: 20px;vertical-align: middle;" :src="require('@/assets/menu_icon/language/UK.png')" :fit="fit" />
          <el-text style="color:#212121;vertical-align: middle;" size="large">&nbsp;&nbsp;&nbsp;English(UK)</el-text></el-card></el-col>
        <el-col :span="6"><el-card shadow="hover" style="height: 60px;background-color: #f0f6fd;border: 0px;" @click="dialogFormVisible_language = false"> 
          <el-row>
            <el-col :span="19">
              <el-image style="width: 20px; height: 20px;vertical-align: middle;" :src="require('@/assets/menu_icon/language/China.png')" :fit="fit" />
              <el-text style="color:#3c8dea;vertical-align: middle;" size="large">&nbsp;&nbsp;&nbsp;简体中文</el-text>
            </el-col>
            <el-col :span="5">
              <el-image style="width: 26px; height: 26px;" :src="require('@/assets/cordMoney_true.svg')" :fit="fit" />
            </el-col>
          </el-row>
          </el-card></el-col>
      </el-row>
    </el-dialog>


  <!--登录 对话框-->
  <el-dialog v-model="dialogFormVisible_log" style="text-align:left;border-radius: 8px;">
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121;">登录</span> 
      </span>
    </template>
    <el-form 
      ref="myLogForm"
      :rules="logRules"
      label-position="top"
      label-width="auto"
      :model="logForm"
      style="width: 90%;"
      size="default"
      
    >
    <el-form-item label="" prop="checked">
      <el-checkbox v-model="logForm.checked">
        <el-text>我已阅读并同意</el-text>
          <el-link href="https://element-plus.org" type="primary" :underline="false">使用条款</el-link>
          <el-text>及</el-text>
          <el-link href="https://element-plus.org" type="primary" :underline="false">隐私声明</el-link>
      </el-checkbox>
    </el-form-item>
    
    <el-form-item label="电话号码" prop="tel">
        <el-input placeholder="请输入电话号码" clearable v-model="logForm.tel" autocomplete="off"/>  
      </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input placeholder="请输入密码" v-model="logForm.pass" clearable show-password/>
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
  <el-dialog v-model="dialogFormVisible_add" style="text-align:left;border-radius: 8px;">
    <template #title>
      <span class="dialog-title">
        <span style="font-size: 25px; color: #212121;">注册账号</span> 
      </span>
    </template>
    <el-form 
      ref="myAddForm"
      :rules="addRules"
      label-position="top"
      label-width="120px"
      :model="addForm"
      style="width: 90%;text-align: center;"
      size="default"
    >
    <el-form-item label="" prop="checked">
      <el-checkbox v-model="addForm.checked">
        <el-text>我已阅读并同意</el-text>
          <el-link href="https://element-plus.org" type="primary" :underline="false">使用条款</el-link>
          <el-text>及</el-text>
          <el-link href="https://element-plus.org" type="primary" :underline="false">隐私声明</el-link>
      </el-checkbox>
    </el-form-item>
  
    <el-form-item label="电话号码" prop="tel">
        <el-input placeholder="请输入电话号码" clearable v-model="addForm.tel" autocomplete="off"/>  
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input placeholder="请输入密码" v-model="addForm.pass" clearable show-password/>
      </el-form-item>
    <el-form-item label="确认密码" prop="pass2">
      <el-input placeholder="请再次输入密码" v-model="addForm.pass2" clearable show-password/>
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
// import { useRouter } from 'vue-router'

export default{
  setup() {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }

    /* 币种 */
    var dialogFormVisible_money = ref(false)//币种对话框显示
    const moneyForm = reactive({
      kindOfMoney: '',
    })

    /* 语言 */
    var dialogFormVisible_language = ref(false)
    const languageForm = reactive({
      kindOflanguage: '',
    })
    /*注册*/
    const myAddForm = ref(null)
    var dialogFormVisible_add = ref(false)//register对话框显示
    const addForm = reactive({
      checked: [],
      tel: '',
      pass: '',
      pass2: ''
    })

    //注册 表单验证
    const addRules = reactive({
      checked: [
        { type: 'array', required: true, trigger: 'change', validater: checkChecked }
      ],
      tel: [
        { required: true, trigger: 'blur', validater: checkTele }
      ],
      pass: [
        { required: true, trigger: 'blur', validater: checkPassword }
      ],
      pass2: [
        { required: true, trigger: 'blur', validater: checkPassword2 }
      ]
    })

    function checkPassword2(rule, value, callback){//二次验证密码
      if (!value) {
        callback('请再次输入密码')
      }
      if (addForm.pass) {
        if (addForm.pass === value) {
          callback()
        } else {
          callback('两次输入密码不一致，请重新输入')
        }
      } else {
        callback('请先输入密码')
      }
    }

    function addFormConfirm() {
      myAddForm.value.validate(valid => {
        if (valid) {
          dialogFormVisible_add.value = false
          console.log("注册 表单验证通过-all")
          // 接口
          console.log(dialogFormVisible_add)
          console.log("电话=" + addForm.tel)
          console.log("密码=" + addForm.pass)
          console.log("再次输入密码=" + addForm.pass2)

          const form = unref(myAddForm)
          form.resetFields();
        } else {
          console.log("注册 表单验证未通过")
        }
      })
    }

    function addFormCancle() {
      const form = unref(myAddForm)
      form.resetFields()
      console.log("关闭表单")
      dialogFormVisible_add.value = false
    }

    /*登录 */
    const myLogForm = ref(null)
    // const router = useRouter()
    var dialogFormVisible_log = ref(false)//log对话框显示
    const logForm = reactive({
      checked: [],
      tel: '',
      pass: ''
    })

    //log 表单验证
    function checkChecked(rule, value, callback){
      console.log("value=" + value)
      if (!value) {
        callback(new Error('请接受条款和条件，然后进行下一步操作'));
      } else {
        if (logForm.checked) {
          logForm.validateField('checked');
        }
        callback();
      }
    }

    function checkTele(rule, value, callback){
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!value) {
        callback('请输入你的电话号码')
        return
      }
      if (!reg.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {
        callback('请输入有效的电话号码')
        return
      }
      callback();
    }

    function checkPassword(rule, value, callback) {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      if (!value) {
        callback('请输入你的密码')
        return
      }

      if (this.form.confirmPassword) {
        this.$refs.Form.validateField(['confirmPassword'])
      }
      if (!reg.test(value)) {
        callback('请输入有效密码')
        return
      }
      callback()
    }

    const logRules = ref({
      checked: [
        { type: 'array', required: true, trigger: 'change', validater: checkChecked }
      ],
      tel: [
        { required: true, trigger: 'blur', validater: checkTele }
      ],
      pass: [
        { required: true, trigger: 'blur', validater: checkPassword}
      ]
    })

    function FormConfirm(){
      myLogForm.value.validate((valid) => {
        if (valid) {
          dialogFormVisible_log.value = false
          console.log("log表单验证通过-all")
          // 接口
          console.log(dialogFormVisible_log)
          console.log("电话=" + logForm.tel)
          console.log("密码=" + logForm.pass)
          
          const form = unref(myLogForm)
          form.resetFields();
        } else {
          console.log("log表单验证未通过")
        }
      })
    }

    function FormCancle() {
      myLogForm.value.resetFields()
      console.log("关闭表单")
      dialogFormVisible_log.value = false
    }

    return {
      /* 变量 */
      activeIndex,
      activeIndex2,
      //币种
      dialogFormVisible_money, moneyForm,
      // 语言
      dialogFormVisible_language, languageForm,
      //注册
      myAddForm, dialogFormVisible_add, addForm, addRules,
      //登录
      myLogForm, dialogFormVisible_log, logForm, logRules,

      /* 函数 */
      handleSelect,
      checkPassword2, addFormCancle, addFormConfirm,
      checkChecked, checkTele, checkPassword, FormCancle, FormConfirm,
    };
  }
}

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
.btnMenu{
  width: 50px;
  height: 50px;
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
