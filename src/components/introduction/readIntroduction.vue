<template>
    <div>
        <h1>Read Introduction</h1>
        <span>{{introduction}}</span>

    </div>
</template>
<script>
    export default{
        data(){
           return{
               introduction:''
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
                    this.readIntro()
                }
            },
            readIntro(){
                console.log('in read intro func')
                let vm = this
                vm.$store.state.db.db.ref('introduction/' + vm.$route.params.schoolId + '/introduction'  ).on('value', function(snapIntro){
                    if(snapIntro.val()!= null){
                        if(snapIntro.val()=="") {
                            console.log("Empty")
                            vm.introduction = 'No information about this school has been provided'
                        }
                        else {
                            console.log(snapIntro.val())
                            vm.introduction = snapIntro.val()
                        }
                    }
                    else{
                        vm.introduction="No information about this school has been provided"
                    }
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>