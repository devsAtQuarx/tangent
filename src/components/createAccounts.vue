<template>
    <div>
        <h1>create accounts</h1> - {{$route.params}}
        <br>

        <!-- options -->
        <span @click="goToCreatePrincipalAccount()">Create Principal's Account</span>
        <span @click="goToShowPrincipalAccount()">Show Principal's Account</span>

        <!--span @click="goToCreateVpAccount()">Create Vice-Principal's Account</span-->

        <span @click="goToCreateTeacherAccount()">Create Teacher's Account</span>
        <span @click="goToShowTeacherAccount()">Show Teacher's Accounts</span>

        <!--span @click="goToCreateAccountantAccount()">Create Accountant's Account</span-->

        <span @click="goToCreateStudentAccount()">Create Student's Account</span>
        <span @click="goToShowStudentAccount()">Show Student's Accounts</span>

        <!--span @click="goToCreateParentAccount()">Create Parent's Account</span-->

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
            //stduent
            goToCreateStudentAccount(){
                this.goWhere = 'student'
                this.goToCreateAccount()
            },
            goToShowStudentAccount(){
                this.goWhere = 'student'
                this.goToShowAccounts()
            },

            //principal
            goToCreatePrincipalAccount(){
                this.goWhere = 'principal'
                this.goToCreateAccount()
            },
            goToShowPrincipalAccount(){
                this.goWhere = 'principal'
                this.goToShowAccounts()
            },

            //teacher
            goToCreateTeacherAccount(){
                this.goWhere = 'teacher'
                this.goToCreateAccount()
            },
            goToShowTeacherAccount(){
                this.goWhere = 'teacher'
                this.goToShowAccounts()
            },

            //goTo show/create account
            goToCreateAccount(){
                this.$router.push({
                    name: 'createAccount',
                    params:{
                        whosAccount: this.goWhere
                    }
                })
            },
            goToShowAccounts(){
                //console.log('goToShowAccounts')
                this.$router.push({
                    name: 'showAccounts',
                    params:{
                        whosAccount: this.goWhere
                    }
                })
            }
        }
    }
</script>