import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/admin'
import info from '@/components/info'
import jobDetail from '@/components/jobDetail'
import company from '@/components/company'
import register from '@/components/register'
import adminhire from '@/components/admin-hire'
import myJobs from '@/components/company/myJobs'
import companyAdd from '@/components/company/add'
import companyAddJob from '@/components/company/add-job'
import userIndex from '@/components/user/index'
import resume from '@/components/user/resume'
import state from '@/components/user/state'
import mark from '@/components/user/mark'

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
      component: admin,
      children: [
        {path: '', component: userIndex},
        {path: '/resume', component: resume},
        {path: '/state', component: state},
        {path: '/mark', component: mark}
      ]
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
      path: '/adminhire',
      component: adminhire,
      children: [
        {path: '', component: myJobs},
        {path: 'add', component: companyAdd},
        {path: 'add-job', component: companyAddJob}
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
