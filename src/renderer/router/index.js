import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '../components/LandingPage'
import mydata1 from '../components/mydata'
import datalist from '../components/datalist'
import sumlist from '../components/sumlist'
import chlist from '../components/chlist'
import setting from '../components/setting'

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
      path: '/chlist',
      name: 'chlist',
      component: chlist
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
