<template>
    <div>
        <h1>vision</h1>
        <span>{{vision}}</span>

    </div>
</template>
<script>
    export default{
        data(){
            return{
                vision:''
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
                    this.readvision()
                }
            },
            readvision(){
                console.log('in read intro func')
                let vm = this
                vm.$store.state.db.db.ref('vision/' + vm.$route.params.schoolId + '/vision'  ).on('value', function(snapIntro){
                    if(snapIntro.val()!= null){
                        if(snapIntro.val()=="") {
                            console.log("Empty")
                            vm.vision = 'No information has been provided'
                        }
                        else {
                            console.log(snapIntro.val())
                            vm.vision = snapIntro.val()
                        }
                    }
                    else{
                        console.log("null")
                        vm.vision='No information has been provided'
                    }
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>