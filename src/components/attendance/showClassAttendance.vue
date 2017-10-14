<template>
    <div>
        <h1>show class attendance</h1>

        <!-- internal options --><!-- cannot in nav bar ! ask why ;) -->
        <p v-for="(std, i) in stds">
            <span @click="getClassAttendance(i)">{{i}}</span>
        </p>


        <!-- attendance --><!-- dates -->
        <!-- 1st table -->
        <span v-if="classStd.length != 0">names</span>
        <span v-for="k in dateKey">
            {{k[0]}}{{k[1]}}-{{k[2]}}{{k[3]}}-{{k[4]}}{{k[5]}}{{k[6]}}{{k[7]}}
        </span>
        <span v-if="classStd.length != 0">%</span>
        <!-- 1st table ends-->

        <!-- attendance (p/a)-->
        <!-- 2nd table starts -->
        <li v-for="(studentAttendance, i) in classStd">
            <span>{{studentAttendance.name}}</span>
            <span v-for="(j,k) in studentAttendance.attendance">
                <span>
                    {{j}}
                </span>
            </span>
            <span>
                {{studentAttendance.attendancePercantage}}%
            </span>
        </li>
        <!-- 2nd table ends -->

    </div>
</template>

<script>
    export default{
        data(){
          return {
              stds : {},
              classStd : [],
              pCount : 0
          }
        },
        methods:{
            getStd(){
                let vm = this
                vm.$store.state.db.db.ref('checkClassAttendance/' + this.$route.params.schoolId).once('value',function(snapStd){

                    vm.stds = snapStd.val()

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
                    this.getStd()
                }
            },
            getClassAttendance(i){
                this.classStd = []
                //console.log(i)
                let vm = this
                this.$store.state.db.db.ref('attendance/' + this.$route.params.schoolId + '/' + i).once('value', function(snapClassAttendance){
                    //console.log(snapClassAttendance.val())

                    //email to name
                    for(let j in snapClassAttendance.val()){

                        //get name
                        vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + i + '/student/' + j + '/name')
                        .once('value',function(snapName){
                            //console.log("loop: ", snapClassAttendance.val()[j])

                            //attendance %
                            let pCount = 0
                            let tCount = 0
                            for(let z in snapClassAttendance.val()[j]){
                                //console.log(snapClassAttendance.val()[j][z])
                                tCount += 1
                                if(snapClassAttendance.val()[j][z] == 'p'){
                                    pCount += 1
                                }
                            }
                            //console.log(pCount)
                            let attendancePercantage = (pCount*100)/tCount
                            console.log(attendancePercantage)

                            let tmpObj = {
                                name : snapName.val(),
                                key : j,
                                attendance: snapClassAttendance.val()[j],
                                attendancePercantage
                            }
                            vm.classStd.push(tmpObj)

                        })

                    }// for ends
                })
            }
        },
        created(){
            this.checkIfUidIsLoaded()
        },
        computed:{
            dateKey(){
                if(this.classStd.length != 0){
                    return Object.keys(this.classStd[0].attendance)
                }else{
                    return
                }
            }
        }
    }
</script>