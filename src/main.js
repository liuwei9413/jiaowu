import Vue from 'vue'
import App from '@/pages/components/Index'
import router from './common/routerConfig.js'
import ElementUI from 'element-ui'
import api from './common/api.js'
import 'element-ui/lib/theme-default/index.css'
import '@/resources/front/css/common/element-ui-cover.css'
import '@/resources/front/css/common/reset.css'
import '@/resources/front/css/common/icon.css'
import '@/resources/front/css/common/menu.css'

import _ from 'lodash'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$ajax = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
