<template>
    <div>
        <h1>set attendance</h1>

        <li v-for="(student,i) in studentList">
            <span @click="setPresent(student,i)">{{student}}</span>
        </li>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        data(){
            return {
                studentList : []
            }
        },
        methods:{
            checkIfCt(){
                let vm = this
                let emailInDb = this.$store.state.auth.user.email
                while(emailInDb.indexOf('.') != -1)
                    emailInDb = emailInDb.replace(".","replaceddothere")
                //console.log(emailInDb)

                this.$store.state.db.db.ref('checkCt/' + emailInDb).once('value',function(snapCheckCt){
                    //console.log(snapCheckCt.val())
                    if(snapCheckCt.val() == null){ //not a class teacher
                        alert('no a ct')
                        this.$router.go(-1)
                    }else{ // if class teacher
                        //do something

                        //set check class for principal
                        vm.$store.state.db.db.ref('checkClassAttendance/' + snapCheckCt.val().ctStd).set(snapCheckCt.val())
                            .then(function (setClassCheckForPrincipal) {


                            vm.$store.state.db.db.ref('classDetail/' + snapCheckCt.val().ctStd + '/' + 'student/')
                            .once('value',function (snapStudentList) {

                                for (let i in snapStudentList.val()) { //for /**********

                                    let studentEmail = snapStudentList.val()[i].email
                                    //console.log(studentEmail)
                                    while (studentEmail.indexOf('.') != -1)
                                        studentEmail = studentEmail.replace(".", "replaceddothere")

                                    //checkIfAttendance already set
                                    vm.$store.state.db.db.ref('attendance/' + snapCheckCt.val().ctStd + '/' +
                                        studentEmail + '/' + moment().format("DDMMYYYY")).once('value', function (snapGetAttendance) {

                                        if (snapGetAttendance.val() == null) {

                                            //set absent to all
                                            vm.$store.state.db.db.ref('attendance/' + snapCheckCt.val().ctStd + '/' +
                                                studentEmail + '/' + moment().format("DDMMYYYY")).set('a').then(function (snapSetAttendance) {

                                                let tmpObj = {
                                                    schoolId: snapStudentList.val()[i].schoolId,
                                                    email: snapStudentList.val()[i].email,
                                                    name: snapStudentList.val()[i].name,
                                                    std: snapStudentList.val()[i].std,
                                                    status: 'a'
                                                }
                                                vm.studentList.push(tmpObj)
                                            })
                                        } else {

                                            let tmpObj = {
                                                schoolId: snapStudentList.val()[i].schoolId,
                                                email: snapStudentList.val()[i].email,
                                                name: snapStudentList.val()[i].name,
                                                std: snapStudentList.val()[i].std,
                                                status: snapGetAttendance.val()
                                            }
                                            vm.studentList.push(tmpObj)

                                        }

                                    })

                                } // for ends

                            })
                        })
                    }
                })

            },
            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.checkIfCt()
                }
            },
            //setPresent
            setPresent(student,i){
                let vm = this

                let particularStudentEmail = student.email
                while(particularStudentEmail.indexOf('.') != -1)
                    particularStudentEmail = particularStudentEmail.replace(".","replaceddothere")

                //check attendance in database
                this.$store.state.db.db.ref('attendance/' + student.std + '/' + particularStudentEmail + '/' +
                    moment().format("DDMMYYYY") )
                .once('value',function (snapLastAttendance) {
                    //console.log(snapLastAttendance.val()) //check if present or absent

                    if(snapLastAttendance.val() == 'a'){ // if absent, mark present
                        vm.$store.state.db.db.ref('attendance/' + student.std + '/' + particularStudentEmail + '/' +
                            moment().format("DDMMYYYY") ).set('p')
                        .then(function (snapStatus) {

                            vm.studentList[i].status = 'p'
                            alert('marked present')

                        })
                    }else{ // if presnt , mark absent
                        vm.$store.state.db.db.ref('attendance/' + student.std + '/' + particularStudentEmail + '/' +
                            moment().format("DDMMYYYY") ).set('a')
                        .then(function(snapStatus){

                            vm.studentList[i].status = 'a'
                            alert('marked absent')

                        })
                    }

                })
            }
        },
        created(){
            this.checkIfUidIsLoaded()
        }
    }
</script>