<template>
    <div>
        school home page
        <div v-if="showLoader">loading ... </div>
        <div v-else>{{user}}</div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        // ...
        data(){
          return {
              showLoader : true
          }
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'user'
            ])
        },
        methods:{
            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                if(!this.$store.state.auth.isLoggedIn){
                    this.showLoader = true // is uid is not loaded
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{
                    this.showLoader = false // if loaded call main func
                    this.$router.push('/schoolHome/'+this.$store.state.auth.user.uid)
                }
            }
        },
        created(){
            this.checkIfUidIsLoaded()
        }
    }
</script>