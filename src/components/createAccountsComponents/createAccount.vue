<template>
    <div>
        <h1>create {{$route.params.whosAccount}} account</h1> {{$route.params}}

        <!-- compulsory/common -->
        email:<input v-model="email">
        name:<input v-model="name">

        <!-- teacher -->
        <span v-show="$route.params.whosAccount == 'teacher' ">
            <!-- ctStd:<input  v-model="ctStd"> -->
        </span>

        <!-- student -->
        <span v-show="$route.params.whosAccount == 'student' ">
            std:<input  v-model="std">
        </span>

        <!-- save-->
        <button @click="saveEmailBindObj">save</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                email: '',
                ctStd : '',
                std:'',
                name:''
            }
        },
        methods:{
            saveEmailBindObj(){
                let vm = this
                let emailInDb = vm.email
                while(emailInDb.indexOf('.') != -1)
                    emailInDb = emailInDb.replace(".","replaceddothere")
                emailInDb = emailInDb.toLowerCase()

                let tmpObj = {}

                //bind
                if(vm.$route.params.whosAccount == 'principal'){
                    tmpObj = {
                        email: vm.email.toLowerCase(),
                        schoolId: vm.$route.params.schoolId,
                        name : vm.name.toLowerCase()
                    }
                }
                else if(vm.$route.params.whosAccount == 'teacher') {
                    tmpObj = {
                        email: vm.email.toLowerCase(),
                        schoolId: vm.$route.params.schoolId,
                        //ctStd: vm.ctStd.toLocaleLowerCase(),
                        name : vm.name.toLowerCase()
                    }
                }else if(vm.$route.params.whosAccount == 'student'){
                    tmpObj = {
                        email: vm.email.toLowerCase(),
                        schoolId: vm.$route.params.schoolId,
                        std: vm.std.toLocaleLowerCase(),
                        name: vm.name.toLowerCase()
                    }
                }

                //validation
                if(this.validateEmail(this.email)){
                    if((this.$route.params.whosAccount == 'student' && tmpObj.std != '' && tmpObj.name != '' ) ||
                        (this.$route.params.whosAccount != 'student' && tmpObj.name != '' )){


                        if(this.$route.params.whosAccount == 'principal'){ //principal
                            vm.$store.state.db.db.ref('school/' + vm.$route.params.schoolId + '/' + '/createdAccounts/' +
                                vm.$route.params.whosAccount).once('value',function(snapCheckIfOnlyOnePrincipal){
                                    if(snapCheckIfOnlyOnePrincipal.val() == null){
                                        vm.saveEmail(tmpObj, emailInDb)
                                    }else{
                                        alert('only one principal account is permitted !')
                                    }
                            })
                        }else{ //other than principal
                            vm.saveEmail(tmpObj, emailInDb)
                        }
                    }else{
                        alert('empty std/name ! ')
                    }
                }else{
                    alert('email is not valid/empty !')
                }

            },
            saveEmail(tmpObj, emailInDb){
                let vm = this
                vm.$store.state.db.db.ref('school/'+ vm.$route.params.schoolId + '/createdAccounts/' +
                    vm.$route.params.whosAccount + '/' + emailInDb).once('value', function(snapCheckcheckDuplicateVar){

                    let checkDuplicateVar//, checkStudentOldClass
                    if(snapCheckcheckDuplicateVar.val() != null){
                        if(vm.$route.params.whosAccount == 'student') {
                            checkDuplicateVar = snapCheckcheckDuplicateVar.val().email
                            //checkStudentOldClass = snapCheckcheckDuplicateVar.val().std
                        }
                        else if(vm.$route.params.whosAccount == 'teacher')
                            checkDuplicateVar = snapCheckcheckDuplicateVar.val().email
                        else if(vm.$route.params.whosAccount == 'principal')
                            checkDuplicateVar = snapCheckcheckDuplicateVar.val().email
                    }

                    //console.log('old class => ', checkStudentOldClass)
                    if(checkDuplicateVar != undefined){ //duplicate
                        alert('overwritting not allowed here !')
                    }else{ //1st time
                        vm.finalSave(emailInDb, tmpObj, checkDuplicateVar) //ok save
                    }
                })
            },
            //final save :)
            finalSave(emailInDb, tmpObj, checkDuplicateVar){

                let vm = this

                vm.$store.state.db.db.ref('school/'+ vm.$route.params.schoolId + '/createdAccounts/' +
                    vm.$route.params.whosAccount + '/' + emailInDb)
                    .set(tmpObj) //set here
                    .then(function(snapPrincipalEmail){
                        vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount +
                            '/' + emailInDb)
                            .set(tmpObj) //set here
                            .then(function (snapPrincipalEmail) {

                                if(vm.$route.params.whosAccount == 'teacher' ){ /////// teacher
                                    //post normally
                                    /*if(tmpObj.ctStd != ''){ //ctStd != ''
                                        vm.$store.state.db.db.ref('classDetail/'+ vm.$route.params.schoolId + '/' + tmpObj.ctStd +'/ct/' +
                                            emailInDb).set(tmpObj)
                                            .then(function(snapClassDeatail){

                                                vm.$store.state.db.db.ref('checkCt/'+ vm.$route.params.schoolId + '/' + emailInDb).set(tmpObj)
                                                    .then(function(snapCheckCtPost){
                                                        alert('saved email in db !') //*************
                                                    })

                                            })

                                    }else{*/
                                        alert('teacher saved')
                                    //}
                                    //teacher ends
                                }else if(vm.$route.params.whosAccount == 'student'){ ////// student
                                    vm.$store.state.db.db.ref('classDetail/'+ vm.$route.params.schoolId + '/' + tmpObj.std +'/student/' +
                                        emailInDb).set(tmpObj)
                                        .then(function(snapClassDeatail){

                                            //*** check class ***/
                                            vm.$store.state.db.db.ref('checkClass/' + vm.$route.params.schoolId + '/' +
                                                tmpObj.std).set({
                                                schoolId : vm.$route.params.schoolId,
                                                std : tmpObj.std
                                            }).then(function(snapCheckStudent){
                                                alert('saved email in db !') //***********
                                            })
                                            //*** check class ends ***/

                                        })
                                }else{ /////// else means principal
                                    alert('saved email in db !') //*************
                                }
                            })
                    })
            },

            validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            }
        }
    }
</script>