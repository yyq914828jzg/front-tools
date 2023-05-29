"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const button = require("./button.js");
const table = require("./table.js");
require("./page.js");
const index$1 = require("../index-e4cbbfaf.js");
require("vue");
require("element-plus");
const componentList = [
  button,
  table,
  index$1._sfc_main
];
const install = (Vue) => {
  componentList.forEach((Component) => {
    Vue.use(Component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
const index = {
  install
};
exports.richButton = button;
exports.richTable = table;
exports.richPage = index$1._sfc_main;
exports.default = index;
exports.install = install;
