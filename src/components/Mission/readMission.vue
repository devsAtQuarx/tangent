<template>
    <div>
        <h1>Mission</h1>
        <span>{{mission}}</span>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                mission:''
            }
        },
        methods:{

            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.readMission()
                }
            },
            readMission(){
                console.log('in read intro func')
                let vm = this
                vm.$store.state.db.db.ref('mission/' + vm.$route.params.schoolId + '/mission'  ).on('value', function(snapIntro){
                    if(snapIntro.val()!= null){
                        if(snapIntro.val()=="") {
                            console.log("Empty")
                            vm.mission = 'No information has been provided'
                        }
                        else {
                            console.log(snapIntro.val())
                            vm.mission = snapIntro.val()
                        }
                    }
                    else{
                        console.log("null")
                        vm.mission='No information has been provided'
                    }
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>