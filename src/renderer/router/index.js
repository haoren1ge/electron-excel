import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '../components/LandingPage'
import mydata1 from '../components/mydata'
import datalist from '../components/datalist'
import sumlist from '../components/sumlist'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: mydata1
    },
    {
      path: '/datalist',
      name: 'datalist',
      component: datalist
    },
    {
      path: '/sumlist',
      name: 'sumlist',
      component: sumlist
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
