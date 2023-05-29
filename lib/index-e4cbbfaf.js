"use strict";
const vue = require("vue");
const elementPlus = require("element-plus");
/*! Element Plus v2.3.4 */
var zhCn = {
  name: "zh-cn",
  el: {
    colorpicker: {
      confirm: "确定",
      clear: "清空"
    },
    datepicker: {
      now: "此刻",
      today: "今天",
      cancel: "取消",
      clear: "清空",
      confirm: "确定",
      selectDate: "选择日期",
      selectTime: "选择时间",
      startDate: "开始日期",
      startTime: "开始时间",
      endDate: "结束日期",
      endTime: "结束时间",
      prevYear: "前一年",
      nextYear: "后一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      year: "年",
      month1: "1 月",
      month2: "2 月",
      month3: "3 月",
      month4: "4 月",
      month5: "5 月",
      month6: "6 月",
      month7: "7 月",
      month8: "8 月",
      month9: "9 月",
      month10: "10 月",
      month11: "11 月",
      month12: "12 月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      months: {
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月"
      }
    },
    select: {
      loading: "加载中",
      noMatch: "无匹配数据",
      noData: "无数据",
      placeholder: "请选择"
    },
    cascader: {
      noMatch: "无匹配数据",
      loading: "加载中",
      placeholder: "请选择",
      noData: "暂无数据"
    },
    pagination: {
      goto: "前往",
      pagesize: "条/页",
      total: "共 {total} 条",
      pageClassifier: "页",
      page: "页",
      prev: "上一页",
      next: "下一页",
      currentPage: "第 {pager} 页",
      prevPages: "向前 {pager} 页",
      nextPages: "向后 {pager} 页",
      deprecationWarning: "你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"
    },
    messagebox: {
      title: "提示",
      confirm: "确定",
      cancel: "取消",
      error: "输入的数据不合法!"
    },
    upload: {
      deleteTip: "按 delete 键可删除",
      delete: "删除",
      preview: "查看图片",
      continue: "继续上传"
    },
    table: {
      emptyText: "暂无数据",
      confirmFilter: "筛选",
      resetFilter: "重置",
      clearFilter: "全部",
      sumText: "合计"
    },
    tree: {
      emptyText: "暂无数据"
    },
    transfer: {
      noMatch: "无匹配数据",
      noData: "无数据",
      titles: ["列表 1", "列表 2"],
      filterPlaceholder: "请输入搜索内容",
      noCheckedFormat: "共 {total} 项",
      hasCheckedFormat: "已选 {checked}/{total} 项"
    },
    image: {
      error: "加载失败"
    },
    pageHeader: {
      title: "返回"
    },
    popconfirm: {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }
  }
};
const _hoisted_1 = {
  class: "rich-page",
  "m-t-10px": "",
  "m-b-10px": ""
};
const __default__ = {
  name: "richPage"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    form: {
      type: Object,
      require: true
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ["pageChange"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultPageSizes = [10, 20, 30, 40];
    const page = vue.ref({});
    vue.watch(
      () => props.form,
      (item) => {
        page.value = { page: item.page, rows: item.rows };
      },
      { immediate: true }
    );
    const handleSizeChange = () => {
      emit("pageChange", page.value);
    };
    const handleCurrentChange = () => {
      emit("pageChange", page.value);
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createVNode(vue.unref(elementPlus.ElConfigProvider), { locale: vue.unref(zhCn) }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(elementPlus.ElPagination), {
              currentPage: page.value.page,
              "onUpdate:currentPage": _cache[0] || (_cache[0] = ($event) => page.value.page = $event),
              "page-size": page.value.rows,
              "onUpdate:pageSize": _cache[1] || (_cache[1] = ($event) => page.value.rows = $event),
              "page-sizes": defaultPageSizes,
              small: "small",
              background: true,
              layout: "total,prev, pager, next,sizes, jumper",
              total: __props.total,
              onSizeChange: handleSizeChange,
              onCurrentChange: handleCurrentChange
            }, null, 8, ["currentPage", "page-size", "total"])
          ]),
          _: 1
        }, 8, ["locale"])
      ]);
    };
  }
});
exports._sfc_main = _sfc_main;