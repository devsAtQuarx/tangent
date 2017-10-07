<template>
    <div>
        <h1>create principal's account</h1> {{$route.params}}

        <input v-model="principalEmail">
        <button @click="savePrincipalEmail">save</button>

    </div>
</template>
<script>
    export default {
        data(){
          return{
              principalEmail: ''
          }
        },
        methods:{
            savePrincipalEmail(){
                let vm = this
                let principalEmailInDb = vm.principalEmail
                while(principalEmailInDb.indexOf('.') != -1)
                    principalEmailInDb = principalEmailInDb.replace(".","replacedDotHere")
                console.log(principalEmailInDb)

                //bind
                let tmpObj = {
                    email : vm.principalEmail,
                    schoolId : vm.$route.params.id
                }

                if(this.validateEmail(this.principalEmail)){
                    this.$store.state.db.db.ref('school/'+ this.$route.params.id + '/createdAccounts/principal/' + principalEmailInDb)
                        .set(tmpObj) //set
                        .then(function(snapPrincipalEmail){
                            vm.$store.state.db.db.ref('createdAccounts/principal/' + principalEmailInDb)
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