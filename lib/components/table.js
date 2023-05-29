"use strict";
const vue = require("vue");
const elementPlus = require("element-plus");
const index = require("../index-e4cbbfaf.js");
function timeTrans(time) {
  let str = "";
  if (time) {
    if (time === "") {
      str = "--";
    } else {
      switch (time.length) {
        case 4:
          str = time;
          break;
        case 6:
          str = `${time.slice(0, 4)}-${time.slice(4, 6)}`;
          break;
        default:
          str = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`;
          break;
      }
    }
  }
  return str;
}
const tools = {
  // 金额三位加“,”
  turnMoney: (n, length = 3) => {
    if (n === "" || n === null || n === void 0) {
      return "--";
    }
    n = String(n).split(".");
    n[0] = n[0].replace(new RegExp(`(\\d)(?=(\\d{${length}})+$)`, "ig"), "$1,");
    return n.join(".");
  }
};
const _hoisted_1 = { class: "public-table" };
const __default__ = {
  name: "richTable"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    data: {
      // 表格数据  (多选框的怎么封装)
      type: Array,
      default: () => []
    },
    header: {
      // 表头数据
      type: Array,
      default: () => []
      /*
       * prop
       * label
       * width
       * mWidth
       * align
       * type   date(日期)/ratio(.fixed(2)%处理)/four(.fixed(4)处理)/number(显示颜色)/turn(金额三分位显示)/numberTurn(显示颜色,金额三分位显示)
       *
       *
       */
    },
    isMaxHeight: {
      // 是否计算最大高度
      type: Boolean,
      default: true
    },
    isPage: {
      // 是否有分页
      type: Boolean,
      default: true
    },
    total: {
      // 分页的数据条数
      type: Number,
      default: 0
    },
    pageParams: {
      type: Object
    },
    isSelection: {
      type: Boolean,
      default: false
    }
  },
  emits: ["pageChange"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const { data, header, isPage, isMaxHeight } = vue.toRefs(props);
    const tableRef = vue.ref();
    const tableRefs = vue.ref();
    __expose({ tableRefs });
    const maxHeight = vue.ref();
    vue.onMounted(() => {
      vue.nextTick(() => {
        getMaxHeight();
      });
    });
    vue.onUpdated(function() {
      vue.nextTick(() => {
        getMaxHeight();
      });
    });
    const getMaxHeight = () => {
    };
    const pageChange = (val) => {
      emit("pageChange", val);
    };
    return (_ctx, _cache) => {
      const _component_el_table_column = vue.resolveComponent("el-table-column");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("div", {
          ref_key: "tableRef",
          ref: tableRef
        }, [
          vue.createVNode(vue.unref(elementPlus.ElTable), vue.mergeProps({
            ref_key: "tableRefs",
            ref: tableRefs,
            border: "",
            data: vue.unref(data),
            "max-height": maxHeight.value,
            style: { "width": "100%" }
          }, _ctx.$attrs), {
            default: vue.withCtx(() => [
              __props.isSelection ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                key: 0,
                type: "selection",
                width: "55"
              })) : vue.createCommentVNode("", true),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(header), (item, i) => {
                return vue.openBlock(), vue.createBlock(_component_el_table_column, {
                  key: i,
                  prop: item.prop,
                  label: item.label,
                  width: item.width,
                  "min-width": item.mWidth,
                  align: item.align || "center",
                  fixed: item.fixed,
                  sortable: item.sortable,
                  "show-overflow-tooltip": item.tooltip,
                  type: item.type
                }, {
                  header: vue.withCtx(() => [
                    !_ctx.$slots[`header${item.prop}`] ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      vue.createTextVNode(vue.toDisplayString(item.label) + " " + vue.toDisplayString(_ctx.$slots[+"header" + item.prop]), 1)
                    ], 64)) : vue.renderSlot(_ctx.$slots, `header${item.prop}`, {
                      key: 1,
                      row: _ctx.row
                    })
                  ]),
                  default: vue.withCtx(({ row }) => [
                    !_ctx.$slots[item.prop] ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      item.type === "date" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        row[item.prop] ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode(vue.toDisplayString(vue.unref(timeTrans)(row[item.prop])), 1)
                        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode("-- ")
                        ], 64))
                      ], 64)) : item.type === "ratio" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                        Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop])) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode("--")
                        ], 64)) : (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          style: vue.normalizeStyle({ color: row[item.prop] > 0 ? "red" : "green" })
                        }, vue.toDisplayString(Number(row[item.prop]).toFixed(2) + "%"), 5))
                      ], 64)) : item.type === "four" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                        Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop])) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode("--")
                        ], 64)) : (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          style: vue.normalizeStyle({ color: row[item.prop] > 0 ? "red" : "green" })
                        }, vue.toDisplayString(Number(row[item.prop]).toFixed(4)), 5))
                      ], 64)) : item.type === "number" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                        Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop])) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode("--")
                        ], 64)) : (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          style: vue.normalizeStyle({ color: row[item.prop] > 0 ? "red" : "green" })
                        }, vue.toDisplayString(Number(row[item.prop])), 5))
                      ], 64)) : item.type === "turn" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
                        Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop])) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode("--")
                        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                          vue.createTextVNode(vue.toDisplayString(vue.unref(tools).turnMoney(row[item.prop])), 1)
                        ], 64))
                      ], 64)) : item.type === "numberTurn" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
                        Number(row[item.prop]) === 0 || isNaN(Number(row[item.prop])) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          vue.createTextVNode("--")
                        ], 64)) : (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          style: vue.normalizeStyle({ color: row[item.prop] > 0 ? "red" : "green" })
                        }, vue.toDisplayString(vue.unref(tools).turnMoney(row[item.prop])), 5))
                      ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 6 }, [
                        vue.createTextVNode(vue.toDisplayString(row[item.prop] || "--"), 1)
                      ], 64))
                    ], 64)) : vue.renderSlot(_ctx.$slots, item.prop, {
                      key: 1,
                      row
                    })
                  ]),
                  _: 2
                }, 1032, ["prop", "label", "width", "min-width", "align", "fixed", "sortable", "show-overflow-tooltip", "type"]);
              }), 128))
            ]),
            _: 3
          }, 16, ["data", "max-height"])
        ], 512),
        vue.unref(isPage) ? (vue.openBlock(), vue.createBlock(index._sfc_main, {
          key: 0,
          total: __props.total,
          form: __props.pageParams,
          onPageChange: pageChange
        }, null, 8, ["total", "form"])) : vue.createCommentVNode("", true)
      ]);
    };
  }
});
_sfc_main.install = function(Vue) {
  Vue.component(_sfc_main.name, _sfc_main);
};
module.exports = _sfc_main;
