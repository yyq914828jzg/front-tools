import riButton from "./src/index.vue";

/* istanbul ignore next */
riButton.install = function(Vue) {
  Vue.component(riButton.name, riButton);
};

export default riButton