import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'
import info from '@/components/info'
import jobDetail from '@/components/jobDetail'
import company from '@/components/company'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/job-detail/:id',
      name: 'jobDetail',
      component: jobDetail
    },
    {
      path: '/company/:id',
      name: 'company',
      component: company
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
