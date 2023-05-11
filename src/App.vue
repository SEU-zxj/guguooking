<template>
  <el-menu
    :default-active="activeIndex2"
    class="myMenu"
    mode="horizontal"
    background-color="#000000"
    text-color="#fff"
    active-text-color="#ffd04b"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <el-image
        style="height: 100%"
        :src="require('@/assets/logo-remove-white.png')"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4" @click="dialogFormVisible = true"
      >Orders</el-menu-item
    >
  </el-menu>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="FormCancle">Cancel</el-button>
        <el-button type="primary" @click="FormConfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>

  <router-view></router-view>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    var dialogFormVisible = ref(false);
    var form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };

    function FormCancle() {
      dialogFormVisible.value = false;
      console.log(dialogFormVisible);
      form.name = "";
      form.region = "";
    }

    function FormConfirm() {
      dialogFormVisible.value = false;
      console.log("������" + form.name);
      console.log("region��" + form.region);
    }

    return {
      activeIndex,
      activeIndex2,
      dialogFormVisible,
      form,

      handleSelect,
      FormCancle,
      FormConfirm,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin: 0;
  height: 100%;
  width: 100%;
}
.flex-grow {
  flex-grow: 1;
}
.myMenu {
  height: 7%;
}
</style>
