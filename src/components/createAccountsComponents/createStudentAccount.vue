<template>
    <div>
        <h1>create student's account</h1> {{$route.params}}
        <input v-model="studentEmail">
        <button @click="saveStudentEmail">Save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                studentEmail:''
            }
        },
        methods:{
            saveStudentEmail(){
                let vm = this

                //bind
                let tmpObj = {
                    email : vm.studentEmail,
                    schoolId : vm.$route.params.id
                }

                let studentEmailInDb = vm.studentEmail
                while(studentEmailInDb.indexOf('.') != -1)
                    studentEmailInDb = studentEmailInDb.replace(".","replacedDotHere")
                console.log(studentEmailInDb)
                this.$store.state.db.db.ref('school/'+ this.$route.params.id + '/createdAccounts/student/' +
                    studentEmailInDb)
                    .set(tmpObj) //set
                    .then(function(snapPrincipalEmail){
                        vm.$store.state.db.db.ref('/createdAccounts/student/' + studentEmailInDb)
                            .set(tmpObj) //set
                            .then(function (snapPrincipalEmail) {
                                alert('saved email in db !')
                            })
                    })

            }
        }
    }
</script>