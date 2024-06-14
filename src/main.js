import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

// 批量引入组件
import components from '../src/components/index'
Vue.use(components)
import { Message  } from 'element-ui'
// 挂载到$message上
Vue.prototype.$message = Message
// Vue.prototype.$api = requst
ElementUI.Dialog.props.lockScroll.default = false;
Vue.use(ElementUI);

const $message = option=>{
  console.log(option)
  return ElementUI.Message({
    ...option,
    offset:100
  })
}

['success','warning','info','error'].forEach(type=>{
  $message[type]= option=>{
    if(typeof option === 'string'){
      option={
        message:option,
        offset:100,
      }
    }
    option.type = type
    return ElementUI.Message(option)
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
