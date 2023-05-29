import richPage from "./src/index.vue";

/* istanbul ignore next */
richPage.install = function(Vue) {
  Vue.component(richPage.name, richPage);
};

export default richPage