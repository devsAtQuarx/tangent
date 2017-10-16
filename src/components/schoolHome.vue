<template>
    <div>
        school home page - {{$route.params}}
        <br>

        <!--options--><!-- lock options till uid is loaded -->
        <!-- school option -->
        <span v-show="showSchoolOptions">
            <span @click="goToCreateAccounts">create accounts</span>
            <span @click="goToUploadBooks" >upload books</span>
            <span @click="goToLibrary">library</span>
            <span @click="goToWriteIntroduction">Write Introduction</span>
            <span @click="goToWriteAbout">Write About</span>
            <span @click="goToWriteMission">Write Mission</span>
            <span @click="goToWriteVision">Write Vision</span>
            <span @click="goToWriteObjective">Write Objective</span>
            <span @click="goToUploadImage">Upload Image</span>
        </span>

        <br>
        <span @click="goToReadIntroduction" >Read Introduction</span>
        <span @click="goToReadAbout" >Read About</span>
        <span @click="goToReadMission" >Read Mission</span>
        <span @click="goToReadVision" >Read Vision</span>
        <span @click="goToReadObjective" >Read Objective</span>
        <span @click="goToSeeImage" >See Image</span>
        <!-- teacher option -->
        <span v-show="showTeacherOptions">
            <span @click="goToSetAttendance">set attendance</span>
        </span>

        <!-- principal option -->
        <span v-show="showPrincipalOptions">
            <span @click="goToShowClassAttendance">show class attendance</span>
        </span>

        <!-- stduent options -->
        <span v-show="showStudentOptions">
            <span @click="goToParticularStudentAttendance">show paticular student attendance</span>
            <span @click="goToShowBooks">show books</span>
        </span>

        <div>
            {{user}}
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'user'
            ]),
            showSchoolOptions(){
                if(this.$route.params.whoIsLoggedIn == 'school')
                    return true
                else
                    return false
            },
            showTeacherOptions(){
                if(this.$route.params.whoIsLoggedIn == 'teacher')
                    return true
                else
                    return false
            },
            showPrincipalOptions(){
                if(this.$route.params.whoIsLoggedIn == 'principal')
                    return true
                else
                    return false
            },
            showStudentOptions(){
                if(this.$route.params.whoIsLoggedIn == 'student')
                    return true
                else
                    return false
            }
        },
        methods:{
            goToCreateAccounts(){
                this.$router.push('/createAccounts/' + this.$route.params.schoolId + '/createAccount/' + 'principal')
            },
            goToReadIntroduction(){
                this.$router.push({name: 'readIntroduction'})
            },
            goToReadObjective(){
                this.$router.push({name: 'readObjective'})
            },
            goToReadAbout(){
                this.$router.push({name: 'readAbout'})
            },
            goToReadMission(){
                this.$router.push({name: 'readMission'})
            },
            goToReadVision(){
                this.$router.push({name: 'readVision'})
            },
            goToSeeImage(){
                this.$router.push({name: 'seeImage'})
            },
            goToSetAttendance(){
                this.$router.push({name:'setAttendance'})
            },
            goToShowClassAttendance(){
                this.$router.push({name:'showClassAttendance'})
            },
            goToParticularStudentAttendance(){
                this.$router.push({name:'showParticularStudentAttendance'})
            },
            goToUploadBooks(){
                this.$router.push({name:'uploadBooks'})
            },
            goToShowBooks(){
                this.$router.push({name:'showBooks'})
            },
            goToWriteIntroduction(){
                this.$router.push({name:'writeIntroduction'})
            },
            goToWriteAbout(){
                this.$router.push({name:'writeAbout'})
            },
            goToWriteMission(){
                this.$router.push({name:'writeMission'})
            },
            goToUploadImage(){
                this.$router.push({name:'uploadImage'})
            },
            goToWriteVision(){
                this.$router.push({name:'writeVision'})
            },
            goToWriteObjective(){
                this.$router.push({name:'writeObjective'})
            },
            goToLibrary(){
                this.$router.push({name:'showBooks'})
            }
        },
        created(){

        }
    }
</script>