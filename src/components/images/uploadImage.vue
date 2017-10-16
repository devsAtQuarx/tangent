<template>
    <div>
        <h1>Upload Image</h1>
        <input
                class="hide_file"
                type="file"
                @change="uploadFile($event)"
        >

        <span v-for="(photo,i) in photos"  >
        <!--  {{photo.photoObj.name}} -->
          <img :src="photo.photoUrl" id="uploaded_photo"style="height:170px;width:175px;" >
            <button @click="removePhoto(i)">X</button>
        </span>

        <button @click="checkIfUidIsLoaded">Submit</button>



    </div>
</template>
<script>
    export default {
        data(){
            return{
                photos:[],
                event:{
                    photoUrl:[],

                },
                event2:{
                    downloadUrl:[]
                }
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
                    this.submitPhotosToDb(event)
                }
            },
            //uploadFile
            uploadFile(event){
                console.log(event.target.files[0])
                console.log(URL.createObjectURL(event.target.files[0]))
                let tempPhotoObj = {
                    photoObj : event.target.files[0],
                    photoUrl : URL.createObjectURL(event.target.files[0])
                }
                this.photos.push(tempPhotoObj)

                this.event.photoUrl.push(tempPhotoObj.photoUrl.slice(tempPhotoObj.photoUrl.lastIndexOf('/')+1))
            },
            removePhoto(index){
                //console.log(index)
                //delete
                this.photos.splice(index,1)
                this.event.photoUrl.splice(index,1)
            },
          /* submitPhotosToDb(){
               let vm = this
               let schoolUid = this.$store.state.auth.user.uid
               if(vm.event.photoUrl.length != 0){
                   console.log("submitting")
                   this.$store.state.db.db.ref('images/' + schoolUid + '/' ).set(vm.event)
               }
           }*/
            //createEvent
           submitPhotosToDb(event){
                //console.log(event)
                let vm = this
               let schoolUid = this.$store.state.auth.user.uid
                //this.showPreloader = true
                    let c = 0
                    //if no photo uploaded
                    if(vm.event.photoUrl.length == 0){
                        vm.saveInDb(event)
                    }else{
                        for(let i in vm.photos){
                            let uploadTask = vm.$store.state.db.storage.ref('images/'+ schoolUid +
                                vm.photos[i].photoUrl.slice(vm.photos[i].photoUrl.lastIndexOf('/')+1))
                                .put(vm.photos[i].photoObj)
                            uploadTask.on('state_changed', function(snapshot) {
                            }, function(error){
                            },function(){
                                console.log(uploadTask.snapshot.downloadURL)
                                vm.event2.downloadUrl.push(uploadTask.snapshot.downloadURL)
                                console.log(c + " " + vm.photos.length)
                                c++
                                if(c == vm.photos.length)
                                    vm.saveInDb(event)
                            })
                        }
                    }

           },
            saveInDb(event){
                let vm = this
                let schoolUid = this.$store.state.auth.user.uid
                console.log(vm.event2)
                for (let i in vm.event2.downloadUrl) {
                    this.$store.state.db.db.ref('images/ ' + schoolUid).push(vm.event2.downloadUrl[i])
                }

            }

        }
    }
</script>