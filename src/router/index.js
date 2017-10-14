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

//features
//createAccountsComponents
import createAccount from '@/components/createAccountsComponents/createAccount'
//attendance
import setAttendance from '@/components/attendance/setAttendance'
import showClassAttendance from '@/components/attendance/showClassAttendance'
import showParticularStudentAttendance from '@/components/attendance/showParticularStudentAttendance'
//library
import showBooks from '@/components/library/showBooks'
import uploadBooks from '@/components/library/uploadBooks'
import searchBook from '@/components/library/searchBook'
import specbook from '@/components/library/specBook'
//Introduction
import writeIntroduction from '@/components/introduction/writeIntroduction'
import readIntroduction from '@/components/introduction/readIntroduction'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Hello, children:[
        { path: '', component: tangentHome, name:'tangentHome' },
        { path: 'tangentContact', component: tangentContact },
        { path: 'tangentAbout', component: tangentAbout },
        { path: 'gLogin/:whoIsLoggedIn', component: gLogin}
    ]},
    { path: '/schoolHome/:schoolId/:whoIsLoggedIn', component: schoolHome, name: 'schoolHome' , children:[
        { path: 'setAttendance', component: setAttendance , name: 'setAttendance'},
        { path: 'showClassAttendance', component: showClassAttendance , name: 'showClassAttendance'},
        { path: 'showParticularStudentAttendance', component: showParticularStudentAttendance , name: 'showParticularStudentAttendance'},
        { path: 'showBooks' , component: showBooks , name: 'showBooks'},
        { path: 'uploadBooks' , component : uploadBooks , name : 'uploadBooks'},
        { path: 'searchBook' , component: searchBook , name : 'searchBook'},
        { path: 'specBook/:bookId' , component : specbook , name: 'specBook'},
        { path: 'writeIntroduction' ,component:writeIntroduction, name:'writeIntroduction'},
        { path: 'readIntroduction' ,component:readIntroduction, name:'readIntroduction'}
    ]},
    { path: '/createAccounts/:schoolId', component:createAccounts, children:[
        { path: ':whosAccount', name:'createAccount' ,component:createAccount}
    ]}
  ]
})
