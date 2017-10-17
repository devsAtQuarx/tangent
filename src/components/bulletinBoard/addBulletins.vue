<template>
    <div>
        <h1>Add Bulletins</h1>
        <h4>Click the + button to Add Bulletins</h4>
        <div v-for="bulletin in bulletinArray">
            <h4>{{bulletin.headline}}</h4>
            <div>{{bulletin.content}}</div>
            <img :src="bulletin.downloadUrl" style="height:170px;width:175px;" v-show="bulletin.downloadUrl !=undefined">
            <button @click="removeBulletin(bulletin.key)">X</button>
        </div>
        <img :src="photo.photoUrl" style="height:170px;width:175px;" v-show="photo.photoUrl !=undefined">
        <input type="file" id="selectFile" @change="uploadFile($event)" v-show="showInputs">
        <input type="text" v-model="headline" v-show="showInputs" placeholder="headline">
        <input type="text" v-model="content" v-show="showInputs" placeholder="content">
        <button @click="submitToStorage" v-show="showInputs">submit</button>
        <button @click="addBulletins" v-show="!showInputs">+</button>

    </div>
</template>
<script>
    export default {
        data(){
            return{
                showInputs:false,
                headline:'',
                content:'',
                photo:{},
                downloadUrl:'',
                bulletinArray:[]
            }
        },
        methods:{
            removeBulletin(key){
               let  vm = this
              //  console.log(key)
                vm.$store.state.db.db.ref('bulletin/' + vm.$route.params.schoolId +'/' + key ).remove()
            },
            addBulletins(){
               // console.log(this.photo.photoUrl)
                this.showInputs=true
            },
            submitToStorage(){
                this.showInputs = false
                //console.log(this.photo.photoUrl)
               if(this.photo.photoUrl== undefined){
                   this.saveInDb()
                   console.log("no photo has been selected")
                }else {
                   let vm = this
                   let schoolUid = this.$store.state.auth.user.uid
                   let uploadTask = vm.$store.state.db.storage.ref('bulletin/' + schoolUid +
                       vm.photo.photoUrl.slice(vm.photo.photoUrl.lastIndexOf('/') + 1))
                       .put(vm.photo.photoObj)
                   uploadTask.on('state_changed', function (snapshot) {
                   }, function (error) {

                   }, function () {
                       // console.log(uploadTask.snapshot.downloadURL)
                       vm.downloadUrl = uploadTask.snapshot.downloadURL
                      // console.log('download url ---->  '+vm.downloadUrl)
                       vm.saveInDb()
                   })
               }


            },
            saveInDb(){
                if(this.headline=='' || this.content==''){
                    alert('required field is empty')
                }else{
                    //console.log("here")
                    let vm = this
                    let schoolUid = this.$store.state.auth.user.uid
                    let tempObject={
                        headline:vm.headline,
                        content:vm.content,
                    }
                    if(this.photo.photoUrl!= undefined){
                        tempObject.downloadUrl = vm.downloadUrl
                    }
                   // console.log(tempObject)
                    vm.$store.state.db.db.ref('bulletin/'+ schoolUid ).push(tempObject).then(function(snapSubmitNews){
                        vm.headline=''
                        vm.content=''
                        vm.downloadUrl=''
                        vm.photo={}
                        document.getElementById("selectFile").value = null
                        alert('done')
                    })
                }


            },
            //uploadFile
            uploadFile(event){
                //console.log('here '+ event.target.files[0])
               // console.log(URL.createObjectURL(event.target.files[0]))
                if (event.target.files[0] != undefined){
                    let tempPhotoObj = {
                        photoObj : event.target.files[0],
                        photoUrl : URL.createObjectURL(event.target.files[0])
                    }
                    this.photo=tempPhotoObj
                }else{
                    console.log("no photo selected")
                }

            },
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