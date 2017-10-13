<template>
    <div>
        <h1>upload books</h1>

        <input
                class="hide_file"
                type="file"
                accept="application/pdf"
                id="choose_image"
                @change="uploadFile($event)">
        >

        book name:<input v-model="bookName" > <!-- required -->
        book std:<input v-model="bookStd"> <!-- required -->
        book sub:<input v-model="bookSubject"> <!-- required -->
        book description:<input v-model="bookDesc">

        <button @click="uploadBook">submit book</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bookName: '',
                bookStd: '',
                bookSubject : '',
                bookDesc: '',
                file : '',
                fileLink : '',
                fileDownloadLink : {}
            }
        },
        methods:{
            uploadFile(e){
                this.file = e.target.files[0]
                this.fileLink = URL.createObjectURL(event.target.files[0])
                this.fileLink = this.fileLink.slice(this.fileLink.lastIndexOf('/')+1)
            },
            uploadBook(){
                if(this.file != '' && this.file != undefined) {
                    if (this.bookName.length != 0 && this.bookStd.length != 0) {
                        //start preloader here ! //**************
                        let vm = this
                        let uploadTask = vm.$store.state.db.storage.ref('library/' + vm.fileLink) // no repeating name/link
                            .put(vm.file)
                        uploadTask.on('state_changed', function (snapshot) {
                        }, function (error) {
                            console.log(error)
                        }, function () {
                            console.log(uploadTask.snapshot.downloadURL)
                            //copy download link to a variable
                            vm.fileDownloadLink = uploadTask.snapshot.downloadURL
                            //call finial function, save in db (link & description)
                            vm.submitBook()
                        })
                    }else {
                        alert('Name & Std is compulsory !')
                    }
                }else {
                    alert('Upload a file !')
                }
            },
            submitBook(){
                let vm = this
                let tmpObj = {
                    name:this.bookName,
                    std:this.bookStd,
                    sub: this.bookSubject,
                    desc:this.bookDesc,
                    link:this.fileDownloadLink
                }
                vm.$store.state.db.db.ref('library/').push(tmpObj)
                    .then(function(snapBook){
                        console.log('saved: ' + snapBook)
                        //stop preloader here ! //***************
                    })
            }
        },
        //updated
        updated(){
          let vm = this
          this.$store.state.db.db.ref('library/')
          .limitToLast(1)
          .on('value',function(snapshot){
            if(snapshot.val() != null) {
              //console.log(Object.keys(snapshot.val())[0])
              //console.log(vm.$store.state.events.eventsArr[0].key)
              //console.log(vm.$store.state.events.eventsArr)
              if(vm.$store.state.feature.library.length != 0) {
                if (Object.keys(snapshot.val())[0] == vm.$store.state.feature.library[0].key) {
                  //console.log("eq")
                  //do nothing
                } else {
                  //console.log("not eq")
                  let newEvent = snapshot.val()
                  newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
                  vm.$store.state.feature.library.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
                  vm.$store.state.feature.libraryBooksCount += 1
                  //toast
                }
              }else{
                let newEvent = snapshot.val()
                newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
                vm.$store.state.feature.library.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
                vm.$store.state.feature.libraryBooksCount += 1
              }
            }
          })
        },

    }
</script>
