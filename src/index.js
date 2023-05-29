import richButton from '../packages/button/index.js';
import richTable from '../packages/table/index.js';
import richPage from '../packages/page/index.js';

const componentList = [
  richButton,
  richTable,
  richPage,
]
const install = Vue => {
  componentList.forEach(Component=>{
    Vue.use(Component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  richButton,
  richPage,
  richTable
}
export default {
  install
}


