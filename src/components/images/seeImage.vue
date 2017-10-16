<template>
    <div>
        <h1>see Images</h1>
        <div v-for="i in seeImage" >
            <img :src="i" style="height:175px;width: 175px">
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                seeImage:[],

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
                    this.getImages()
                }
            },
            getImages(){
                let vm = this
                let schoolId=vm.$route.params.schoolId
                //console.log('images/'+ vm.$route.params.schoolId )
                vm.$store.state.db.db.ref('images/' +' '+schoolId  ).on('value', function(snapImage){
                    //console.log(snapImage.val())
                    for(let i in snapImage.val()){
                        //console.log(snapImage.val()[i])
                        vm.seeImage.push(snapImage.val()[i])
                    }

                    //console.log(vm.seeImage)

                })
            }
        },
        beforeMount(){
            this.checkIfUidIsLoaded()
        }
    }
</script>