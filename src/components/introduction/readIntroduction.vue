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
               introduction:'eeer'
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
                    console.log(snapIntro.val())
                   vm.introduction= snapIntro.val()
                })
            }

        },
        created(){
            this.checkIfUidIsLoaded()
        }

    }
</script>