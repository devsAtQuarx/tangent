import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import tangentContact from '@/components/tangentContact'
import tangentAbout from '@/components/tangentAbout'
import schoolHome from '@/components/schoolHome'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Hello },
    { path: '/tangentContact', component: tangentContact },
    { path: '/tangentAbout', component: tangentAbout },
    { path: '/schoolHome/:id', component: schoolHome }
  ]
})
