import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
// import password from '@/components/password'
// import admin from '@/components/admin'
// import info from '@/components/info'
// import jobDetail from '@/components/jobDetail'
// import company from '@/components/company'
// import register from '@/components/register'
// import adminhire from '@/components/admin-hire'
// import myJobs from '@/components/company/myJobs'
// import companyAdd from '@/components/company/add'
// import companyAddJob from '@/components/company/add-job'
// import companyInfo from '@/components/company/companyInfo'
// import companyDetails from '@/components/company/companyDetails'
// import resumeLists from '@/components/company/resumeLists'
// import editJob from '@/components/company/editJob'
// import updateJob from '@/components/company/updateJob'
// import userIndex from '@/components/user/index'
// import resume from '@/components/user/resume'
// import showResume from '@/components/user/showResume'
// import state from '@/components/user/state'
// import mark from '@/components/user/mark'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/password',
      name: 'password',
      component: resolve => require(['@/components/password'], resolve)
    },
    {
      path: '/admin',
      component: resolve => require(['@/components/admin'], resolve),
      children: [
        {path: '', component: resolve => require(['@/components/user/index'], resolve)},
        {path: '/resume', component: resolve => require(['@/components/user/resume'], resolve)},
        {path: '/state', component: resolve => require(['@/components/user/state'], resolve)},
        {path: '/mark', component: resolve => require(['@/components/user/mark'], resolve)},
        {path: '/showResume', component: resolve => require(['@/components/user/showResume'], resolve)}
      ]
    },
    {
      path: '/adminhire',
      component: resolve => require(['@/components/admin-hire'], resolve),
      children: [
        {path: '', component: resolve => require(['@/components/company/myJobs'], resolve)},
        {path: 'add', component: resolve => require(['@/components/company/add'], resolve)},
        {path: 'add-job', component: resolve => require(['@/components/company/add-job'], resolve)},
        {path: 'company-info', component: resolve => require(['@/components/company/companyInfo'], resolve)},
        {path: 'company-details', component: resolve => require(['@/components/company/companyDetails'], resolve)},
        {path: 'resume-list', component: resolve => require(['@/components/company/resumeLists'], resolve)},
        {path: 'edit-job/:id', component: resolve => require(['@/components/company/editJob'], resolve)},
        {path: 'update-job/:id', component: resolve => require(['@/components/company/updateJob'], resolve)}
      ]
    },
    {
      path: '/info',
      name: 'info',
      component: resolve => require(['@/components/info'], resolve)
    },
    {
      path: '/job-detail/:id',
      name: 'jobDetail',
      component: resolve => require(['@/components/jobDetail'], resolve)
    },
    {
      path: '/company/:id',
      name: 'company',
      component: resolve => require(['@/components/company'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
