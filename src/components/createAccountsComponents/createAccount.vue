<template>
    <div>
        <h1>create {{$route.params.whosAccount}} account</h1> {{$route.params}}

        <!-- compulsory/common -->
        email:<input v-model="email">
        name:<input v-model="name">

        <!-- teacher -->
        <span v-show="$route.params.whosAccount == 'teacher' ">
            ctStd:<input  v-model="ctStd">
        </span>

        <!-- student -->
        <span v-show="$route.params.whosAccount == 'student' ">
            std:<input  v-model="std">
        </span>

        <!-- save-->
        <button @click="saveEmail">save</button>
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
            saveEmail(){
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
                        ctStd: vm.ctStd.toLocaleLowerCase(),
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

                if(this.validateEmail(this.email)){
                    if((this.$route.params.whosAccount == 'student' && tmpObj.std != '' && tmpObj.name != '' ) ||
                        (this.$route.params.whosAccount != 'student' && tmpObj.name != '' )){
                        this.$store.state.db.db.ref('school/'+ this.$route.params.schoolId + '/createdAccounts/' +
                            this.$route.params.whosAccount + '/' + emailInDb)
                            .set(tmpObj) //set
                            .then(function(snapPrincipalEmail){
                                vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount +
                                    '/' + emailInDb)
                                    .set(tmpObj) //set
                                    .then(function (snapPrincipalEmail) {

                                        if(vm.$route.params.whosAccount == 'teacher' ){
                                            //console.log(tmpObj.ctStd)

                                            //check
                                            vm.$store.state.db.db.ref('checkCt/'+ vm.$route.params.schoolId + '/' + emailInDb)
                                                .once('value', function(snapCheckCtGet){

                                                    if(snapCheckCtGet.val() == null){

                                                        //post normally
                                                        if(tmpObj.ctStd != ''){ //ctStd != ''
                                                            vm.$store.state.db.db.ref('classDetail/'+ vm.$route.params.schoolId + '/' + tmpObj.ctStd +'/ct/' +
                                                                emailInDb).set(tmpObj)
                                                                .then(function(snapClassDeatail){

                                                                    vm.$store.state.db.db.ref('checkCt/'+ vm.$route.params.schoolId + '/' + emailInDb).set(tmpObj)
                                                                        .then(function(snapCheckCtPost){
                                                                            alert('saved email in db !') //*************
                                                                        })

                                                                })

                                                        }else{
                                                            alert('teacher saved')
                                                        }
                                                    }else { //not null, already ct

                                                        console.log(snapCheckCtGet.val())

                                                        //remove
                                                        vm.$store.state.db.db.ref('classDetail/'+ vm.$route.params.schoolId + '/' + snapCheckCtGet.val().ctStd +'/ct/' +
                                                            emailInDb).remove().then(function(snapCtRemove){

                                                            vm.$store.state.db.db.ref('checkCt/'+ vm.$route.params.schoolId + '/' + emailInDb).remove()
                                                                .then(function(snapCheckCtRemove){
                                                                    alert('he was already a ct, removed from earlier post')

                                                                    //post normally
                                                                    if (tmpObj.ctStd != '') { //ctStd != ''
                                                                        vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + tmpObj.ctStd + '/ct/' +
                                                                            emailInDb).set(tmpObj)
                                                                            .then(function (snapClassDeatail) {

                                                                                vm.$store.state.db.db.ref('checkCt/' + vm.$route.params.schoolId + '/' + emailInDb).set(tmpObj)
                                                                                    .then(function (snapCheckCtPost) {
                                                                                        alert('saved email in db !') //*************
                                                                                    })

                                                                            })
                                                                    }

                                                                })
                                                        })

                                                    }
                                                })
                                        }else if(vm.$route.params.whosAccount == 'student'){
                                            vm.$store.state.db.db.ref('classDetail/'+ vm.$route.params.schoolId + '/' + tmpObj.std +'/student/' +
                                                emailInDb).set(tmpObj)
                                                .then(function(snapClassDeatail){
                                                    alert('saved email in db !') //***********
                                                })
                                        }else{
                                            alert('saved email in db !') //*************
                                        }
                                    })
                            })
                    }else{
                        alert('empty std/name ! ')
                    }
                }else{
                    alert('email is not valid/empty !')
                }
            },

            validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            }
        }
    }
</script>