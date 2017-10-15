<template>
    <div>
        <input v-model="about" type="text">
        <button @click="addAboutInDb">save</button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                about: ''
            }
        },
        methods:{
            addAboutInDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                //console.log(schoolEmail)
                this.$store.state.db.db.ref('about/' + schoolUid + '/' + 'about').set(vm.about)
                this.$store.state.db.db.ref('about/' + schoolUid + '/' + 'schoolId').set(vm.$route.params.schoolId)
            },
            getAboutFromDb(){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid

                this.$store.state.db.db.ref('about/' + schoolUid)
                    .once('value', function(snapIntro){
                        console.log(snapIntro.val())
                        //1 -> null
                        if(snapIntro.val() == null){
                            //do nothing
                        }else { //2-> some value
                            vm.about = snapIntro.val().about
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
                    this.getAboutFromDb()
                }
            },
        },
        created(){
            this.checkIfUidIsLoadedOnPageLoad()
        }
    }
</script>