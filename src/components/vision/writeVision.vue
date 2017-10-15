<template>
    <div>
        <input v-model="vision" type="text">
        <button @click="addvisionInDb">save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                vision: ''
            }
        },
        methods:{
            addvisionInDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                //console.log(schoolEmail)
                this.$store.state.db.db.ref('vision/' + schoolUid + '/' + 'vision').set(vm.vision)
                this.$store.state.db.db.ref('vision/' + schoolUid + '/' + 'schoolId').set(vm.$route.params.schoolId)
            },
            getvisionFromDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                this.$store.state.db.db.ref('vision/' + schoolUid)
                    .once('value', function(snapIntro){
                        console.log(snapIntro.val())
                        //1 -> null
                        if(snapIntro.val() == null){
                            //do nothing
                        }else { //2-> some value
                            vm.vision = snapIntro.val().vision
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
                    this.getvisionFromDb()
                }
            },
        },
        created(){
            this.checkIfUidIsLoadedOnPageLoad()
        }
    }
</script>