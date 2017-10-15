<template>
    <div>
        <h1>Read Objective</h1>
        <span>{{objective}}</span>

    </div>
</template>
<script>
    export default{
        data(){
            return{
                objective:''
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
                    this.readObjective()
                }
            },
            readObjective(){
                console.log('in read intro func')
                let vm = this
                vm.$store.state.db.db.ref('objective/' + vm.$route.params.schoolId + '/objective'  ).on('value', function(snapIntro){
                    if(snapIntro.val()!= null){
                        if(snapIntro.val()=="") {
                            console.log("Empty")
                            vm.objective = 'No information about this school has been provided'
                        }
                        else {
                            console.log(snapIntro.val())
                            vm.objective = snapIntro.val()
                        }
                    }
                    else{
                        vm.objective="No information about this school has been provided"
                    }
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>