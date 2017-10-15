<template>
    <div>
        <input v-model="mission" type="text">
        <button @click="addMissionInDb">save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                mission: ''
            }
        },
        methods:{
            addMissionInDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                //console.log(schoolEmail)
                this.$store.state.db.db.ref('mission/' + schoolUid + '/' + 'mission').set(vm.mission)
                this.$store.state.db.db.ref('mission/' + schoolUid + '/' + 'schoolId').set(vm.$route.params.schoolId)
            },
            getMissionFromDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                this.$store.state.db.db.ref('mission/' + schoolUid)
                    .once('value', function(snapIntro){
                        console.log(snapIntro.val())
                        //1 -> null
                        if(snapIntro.val() == null){
                            //do nothing
                        }else { //2-> some value
                            vm.mission = snapIntro.val().mission
                        }
                        //stop loader /*****************
                    })
            },
            checkIfUidIsLoadedOnPageLoad(){ //recursive
                //start loader /*****************
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoadedOnPageLoad() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.getMissionFromDb()
                }
            },
        },
        created(){
            this.checkIfUidIsLoadedOnPageLoad()
        }
    }
</script>