<template>
    <div>
        <input v-model="objective" type="text">
        <button @click="addObjectiveInDb">save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                objective: ''
            }
        },
        methods:{
            addObjectiveInDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                //console.log(schoolEmail)
                this.$store.state.db.db.ref('objective/' + schoolUid + '/' + 'objective').set(vm.objective)
                this.$store.state.db.db.ref('objective/' + schoolUid + '/' + 'schoolId').set(vm.$route.params.schoolId)
            },
            getObjectiveFromDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                this.$store.state.db.db.ref('objective/' + schoolUid)
                    .once('value', function(snapIntro){
                        console.log(snapIntro.val())
                        //1 -> null
                        if(snapIntro.val() == null){
                            //do nothing
                        }else { //2-> some value
                            vm.objective = snapIntro.val().objective
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
                    this.getObjectiveFromDb()
                }
            },
        },
        created(){
            this.checkIfUidIsLoadedOnPageLoad()
        }
    }
</script>