<template>
    <div>
        school home page - {{$route.params}}
        <br>

        <!--options--><!-- lock options till uid is loaded -->
        <span v-show="showCreateAccounts" @click="goToCreateAccounts">create accounts</span>

        <br>

        <div>
            {{user}}
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'user'
            ]),
            showCreateAccounts(){
                if(this.$route.params.whoIsLoggedIn == 'school')
                    return true
                else
                    return false
            }
        },
        methods:{
            goToCreateAccounts(){
                this.$router.push('/createAccounts/' + this.$route.params.schoolId + '/' + 'principal')
            }
        },
        created(){

        }
    }
</script>