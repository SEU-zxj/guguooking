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
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
