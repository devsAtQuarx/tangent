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

//features
//createAccountsComponents
import createAccount from '@/components/createAccountsComponents/createAccount'
import showAccounts from '@/components/createAccountsComponents/showAccounts'
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
import seeImage from '@/components/images/seeImage'
//Taskbar
import taskbar from '@/components/taskbar/taskbar'
//Bulletin Board
import addBulletins from '@/components/bulletinBoard/addBulletins'
import seeBulletins from '@/components/bulletinBoard/seeBulletins'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/:whoIsLoggedIn', component: Hello, children:[
        { path: '', component: tangentHome, name:'tangentHome' },
        { path: 'tangentContact', component: tangentContact, name: 'tangentContact' },
        { path: 'tangentAbout', component: tangentAbout, name: 'tangentAbout' }
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
        { path: 'readIntroduction' ,component:readIntroduction, name:'readIntroduction'},
        { path: 'writeAbout' ,component:writeAbout, name:'writeAbout'},
        { path: 'readAbout' ,component:readAbout, name:'readAbout'},
        { path: 'writeMission' ,component:writeMission, name:'writeMission'},
        { path: 'readMission' ,component:readMission, name:'readMission'},
        { path: 'writeVision' ,component:writeVision, name:'writeVision'},
        { path: 'readVision' ,component:readVision, name:'readVision'},
        { path: 'writeObjective' ,component:writeObjective, name:'writeObjective'},
        { path: 'readObjective' ,component:readObjective, name:'readObjective'},
        { path: 'uploadImage' ,component:uploadImage, name:'uploadImage'},
        { path: 'seeImage' ,component:seeImage, name:'seeImage'},
        {path:'taskbar', component:taskbar , name:'taskbar'},
        {path:'addBulletins', component:addBulletins ,name:'addBulletins'},
        {path:'seeBulletins', component:seeBulletins ,name:'seeBulletins'}
    ]},
    { path: '/createAccounts/:schoolId', component:createAccounts, children:[
        { path: 'createAccount/:whosAccount', name:'createAccount' ,component:createAccount},
        { path: 'showAccounts/:whosAccount', name: 'showAccounts' , component : showAccounts}
    ]}
  ]
})
