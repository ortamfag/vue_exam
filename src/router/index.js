import Vue from 'vue'
import VueRouter from 'vue-router'
import Students from '../views/Students.vue'
import Projects from '../views/Projects.vue'
import Groups from '../views/Groups.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Students',
    component: Students
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
