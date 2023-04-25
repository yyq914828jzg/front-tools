import richButton from '../packages/button/index.js';
import richTable from '../packages/table/index.js';

const componentList = [
  richButton,
  richTable
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
  richTable
}
export default {
  install
}


