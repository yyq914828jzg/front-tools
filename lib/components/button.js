"use strict";
const vue = require("vue");
const elementPlus = require("element-plus");
const _hoisted_1 = { class: "rich-button" };
const __default__ = {
  name: "richButton"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createVNode(vue.unref(elementPlus.ElButton), { type: "primary" }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("3333333")
          ]),
          _: 1
        }),
        vue.createTextVNode(" button页面 ")
      ]);
    };
  }
});
_sfc_main.install = function(Vue) {
  Vue.component(_sfc_main.name, _sfc_main);
};
module.exports = _sfc_main;
