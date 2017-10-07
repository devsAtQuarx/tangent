<template>
    <div>
        <h1>create accounts</h1> - {{$route.params}}
        <br>

        <!-- options -->
        <span @click="goToCreatePrincipalAccount()">Create Principal's Account</span>
        <span @click="goToCreateVpAccount()">Create Vice-Principal's Account</span>
        <span @click="goToCreateTeacherAccount()">Create Teacher's Account</span>
        <span @click="goToCreateCtAccount()">Create Class Teacher's Account</span>
        <span @click="goToCreateAccountantAccount()">Create Accountant's Account</span>
        <span @click="goToCreateStudentAccount()">Create Student's Account</span>
        <span @click="goToCreateParentAccount()">Create Parent's Account</span>

        <!--content-->
        <router-view></router-view>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                goWhere : ''
            }
        },
        methods:{
            goToCreateStudentAccount(){
                this.goWhere = 'student'
                this.goTo()
            },
            goToCreatePrincipalAccount(){
                this.goWhere = 'principal'
                this.goTo()
            },
            goTo(){
                this.$router.push({
                    name: 'createAccount',
                    params:{
                        whosAccount: this.goWhere
                    }
                })
            }
        }
    }
</script>