<template>
    <div>
        <input v-model="introduction" type="text">
        <button @click="addIntroInDb">save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                introduction: ''
            }
        },
        methods:{
            addIntroInDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                //console.log(schoolEmail)
                this.$store.state.db.db.ref('introduction/' + schoolUid + '/' + 'introduction').set(vm.introduction)
                this.$store.state.db.db.ref('introduction/' + schoolUid + '/' + 'schoolId').set(vm.$route.params.schoolId)
            },
            getIntroFromDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                this.$store.state.db.db.ref('introduction/' + schoolUid)
                    .once('value', function(snapIntro){
                        //console.log(snapIntro.val())
                        //1 -> null
                        if(snapIntro.val() == null){
                            //do nothing
                        }else { //2-> some value
                            vm.introduction = snapIntro.val().introduction
                        }
                        //stop loader /*****************
                    })
            },
            checkIfUidIsLoadedOnPageLoad(){ //recursive
                //start loader /*****************
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.getIntroFromDb()
                }
            },
        },
        created(){
            this.checkIfUidIsLoadedOnPageLoad()
        }
    }
</script>