<template>
    <div>
        <h1>Read About</h1>
        <span>{{about}}</span>

    </div>
</template>
<script>
    export default{
        data(){
            return{
                about:''
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
                    this.readAbout()
                }
            },
            readAbout(){
                console.log('in read intro func')
                let vm = this
                vm.$store.state.db.db.ref('about/' + vm.$route.params.schoolId + '/about'  ).on('value', function(snapIntro){
                    if(snapIntro.val()!= null){
                        if(snapIntro.val()=="") {
                            console.log("Empty")
                            vm.about = 'No information about this school has been provided'
                        }
                        else {
                            console.log(snapIntro.val())
                            vm.about = snapIntro.val()
                        }
                    }
                    else{
                        vm.about="No information about this school has been provided"
                    }
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>