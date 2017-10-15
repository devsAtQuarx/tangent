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
//Introduction
import writeIntroduction from '@/components/introduction/writeIntroduction'
import readIntroduction from '@/components/introduction/readIntroduction'
//About
import writeAbout from '@/components/about/writeAbout'
import readAbout from '@/components/about/readAbout'
//Mission
import writeMission from '@/components/Mission/writeMission'
import readMission from '@/components/Mission/readMission'
//Vision
import writeVision from '@/components/vision/writeVision.vue'
import readVision from '@/components/vision/readVision.vue'
//objective
import writeObjective from '@/components/objective/writeObjective'
import readObjective from '@/components/objective/readObjective'
//Image
import uploadImage from '@/components/images/uploadImage'
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
        { path: 'writeIntroduction' ,component:writeIntroduction, name:'writeIntroduction'},
        { path: 'readIntroduction' ,component:readIntroduction, name:'readIntroduction'},
        { path: 'writeAbout' ,component:writeAbout, name:'writeAbout'},
        { path: 'readAbout' ,component:readAbout, name:'readAbout'},
        { path: 'writeMission' ,component:writeMission, name:'writeMission'},
        { path: 'readMission' ,component:readMission, name:'readMission'},
        { path: 'writeVision' ,component:writeVision, name:'writeVision'},
        { path: 'readVision' ,component:readVision, name:'readVision'},
        { path: 'writeObjective' ,component:writeObjective, name:'writeObjective'},
        { path: 'readObjective' ,component:readObjective, name:'readObjective'},
        { path: 'uploadImage' ,component:uploadImage, name:'uploadImage'}
    ]},
    { path: '/createAccounts/:schoolId', component:createAccounts, children:[
        { path: ':whosAccount', name:'createAccount' ,component:createAccount}
    ]}
  ]
})
