<template>
    <div>
        <h1>show particular student attendance</h1>

        <p>date - status</p>
        <li v-for="(status,date) in studentAttendance">
            {{date[0]}}{{date[1]}}-{{date[2]}}{{date[3]}}-{{date[4]}}{{date[5]}}{{date[6]}}{{date[7]}} - {{status}}
        </li>

        <p>{{attendancePercantage}}%</p>
    </div>
</template>

<script>
    export default{
        data(){
          return {
              studentAttendance : {},
              attendancePercentage : ''
          }
        },
        methods:{
            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.getParticularStudentAttendance()
                }
            },
            getParticularStudentAttendance(){
                let vm = this

                let emailInDb = vm.$store.state.auth.user.email
                while(emailInDb.indexOf('.') != -1)
                    emailInDb = emailInDb.replace(".","replaceddothere")

                vm.$store.state.db.db.ref('createdAccounts/student/' + emailInDb + '/std').once('value',function (snapStudentClass) {
                    console.log(snapStudentClass.val())

                    vm.$store.state.db.db.ref('attendance/' + vm.$route.params.schoolId  + '/' + snapStudentClass.val() + '/' + emailInDb)
                    .once('value', function(snapStudentAttendance){
                        console.log(snapStudentAttendance.val())
                        vm.studentAttendance = snapStudentAttendance.val()

                        console.log(snapStudentAttendance.val())

                        //attendance %
                        let pCount = 0
                        let tCount = 0
                        for(let z in snapStudentAttendance.val()){
                            console.log(snapStudentAttendance.val()[z])
                            tCount += 1
                            if(snapStudentAttendance.val()[z] == 'p'){
                                pCount += 1
                            }
                        }
                        //console.log(pCount)
                        let attendancePercantage = (pCount*100)/tCount
                        console.log(attendancePercantage)
                        vm.attendancePercantage = attendancePercantage

                    })
                })
            }
        },
        created(){
            this.checkIfUidIsLoaded()
        }
    }
</script>