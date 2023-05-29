<template>
  <el-config-provider  :locale="locale">
    <el-table></el-table>
  <rich-button></rich-button>
  <rich-table :pageParams="{page:1,rows:10}"></rich-table>
</el-config-provider>
</template>

<script setup>
import {ElConfigProvider,ElTable} from 'element-plus'
import richButton from "../packages/button/src/index.vue";
import richTable from "../packages/table/src/index.vue";
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
// 设置默认语言
const locale = zhCn;

</script>

<style lang="scss">

</style>




