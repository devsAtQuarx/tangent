<template>
    <div>
        <h1>create accounts</h1> - {{$route.params.id}}
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
        methods:{
            goToCreateStudentAccount(){
                this.$router.push({name: 'createStudentAccount'})
            },
            goToCreatePrincipalAccount(){
                this.$router.push({name: 'createPrincipalAccount'})
            }
        }
    }
</script>