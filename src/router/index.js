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

//createAccountsComponents
import createPrincipalAccount from '@/components/createAccountsComponents/createPrincipalAccount'
import createStudentAccount from '@/components/createAccountsComponents/createStudentAccount'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Hello , children:[
        { path: '', component: tangentHome},
        { path: 'tangentContact', component: tangentContact },
        { path: 'tangentAbout', component: tangentAbout }
    ]},
    { path: '/schoolHome/:id/:whoLoggedIn', component: schoolHome, name: 'schoolHome'},
    { path: '/createAccounts/:id', component:createAccounts, children:[
        { path: '', name:'createPrincipalAccount' ,component:createPrincipalAccount},
        { path: 'createStudentAccount', name:'createStudentAccount', component:createStudentAccount}
    ]}
  ]
})
