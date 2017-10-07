<template>
    <div>
        <h1>create {{$route.params.whosAccount}} account</h1> {{$route.params}}

        <input v-model="email">
        <button @click="saveEmail">save</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                email: ''
            }
        },
        methods:{
            saveEmail(){
                let vm = this
                let emailInDb = vm.email
                while(emailInDb.indexOf('.') != -1)
                    emailInDb = emailInDb.replace(".","replacedDotHere")

                //bind
                let tmpObj = {
                    email : vm.email,
                    schoolId : vm.$route.params.schoolId
                }

                if(this.validateEmail(this.email)){
                    this.$store.state.db.db.ref('school/'+ this.$route.params.schoolId + '/createdAccounts/' +
                        this.$route.params.whosAccount + '/' + emailInDb)
                        .set(tmpObj) //set
                        .then(function(snapPrincipalEmail){
                            vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount +
                                '/' + emailInDb)
                                .set(tmpObj) //set
                                .then(function (snapPrincipalEmail) {
                                    alert('saved email in db !')
                                })
                        })
                }else{
                    alert('not a valid email !')
                }
            },

            validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            }
        }
    }
</script>