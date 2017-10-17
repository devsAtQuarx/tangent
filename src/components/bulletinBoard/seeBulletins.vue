<template>
    <div>
        <h1>See Bulletins</h1>
        <h4 v-if="bulletinArray == []">There is no bulletin</h4>
        <div v-for="bulletin in bulletinArray" v-else>
            <h4>{{bulletin.headline}}</h4>
            <div>{{bulletin.content}}</div>
            <img :src="bulletin.downloadUrl" style="height:170px;width:175px;" v-show="bulletin.downloadUrl !=undefined">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                bulletinArray:[]
            }
        },
        methods:{
            //checkIfUidIsLoaded
            checkIfUidIsLoaded() { //recursive
                console.log('checkIfUidIsLoaded')
                if (!this.$store.state.auth.isLoggedIn) { //stillNotLoggedIn
                    setTimeout(() => {
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    }, 1000)
                } else { //loggedIn
                    this.getBulletinFromDb()
                }
            },
            getBulletinFromDb(){
                let vm = this
                //console.log(vm.$route.params.schoolId)
                vm.$store.state.db.db.ref('bulletin/'+ vm.$route.params.schoolId + '/').on('value',function(snapBulletin){
                    //console.log(snapBulletin.val())
                    if(snapBulletin.val() != null){
                        vm.bulletinArray=[]
                        for(let i in snapBulletin.val()){
                            let tempBulletin = snapBulletin.val()[i]
                            tempBulletin.key = i
                            // console.log(tempBulletin)
                            vm.bulletinArray.push(tempBulletin)
                        }
                    }else{
                        console.log('no value')
                    }
                })
            }
        },
        beforeMount(){
            this.checkIfUidIsLoaded()
        }
    }
</script>