import Vue from 'vue'
import Router from 'vue-router'

//mainComponents
import Hello from '@/components/Hello'
import schoolHome from '@/components/schoolHome'
import createAccounts from '@/components/createAccounts'

//tangentHomeComponents
import tangentHome from '@/components/tangentHomeComponents/tangentHome'
import tangentContact from '@/components/tangentHomeComponents/tangentContact'
import tangentAbout from '@/components/tangentHomeComponents/tangentAbout'
import gLogin from '@/components/tangentHomeComponents/gLogin'

//createAccountsComponents
import createAccount from '@/components/createAccountsComponents/createAccount'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Hello , children:[
        { path: '', component: tangentHome },
        { path: 'tangentContact', component: tangentContact },
        { path: 'tangentAbout', component: tangentAbout },
        { path: 'gLogin/:whoIsLoggedIn', component: gLogin}
    ]},
    { path: '/schoolHome/:schoolId/:whoIsLoggedIn', component: schoolHome, name: 'schoolHome'},
    { path: '/createAccounts/:schoolId', component:createAccounts, children:[
        { path: ':whosAccount', name:'createAccount' ,component:createAccount}
    ]}
  ]
})
