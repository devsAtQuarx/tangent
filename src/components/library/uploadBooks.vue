<template>
    <div>
        <h1>upload books</h1>

        <input
                class="hide_file"
                type="file"
                id="choose_image"
                @change="uploadFile($event)">
        >

        book name:<input v-model="bookName" > <!-- required -->
        book std:<input v-model="bookStd"> <!-- required -->
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
                bookDesc: '',
                file : '',
                fileLink : {},
                fileDownloadLink : {}
            }
        },
        methods:{
            uploadFile(e){
                this.file = e.target.files[0]
                console.log(this.file)
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
                    desc:this.bookDesc,
                    link:this.fileDownloadLink
                }
                vm.$store.state.db.db.ref('library/').push(tmpObj)
                    .then(function(snapBook){
                        console.log('saved: ' + snapBook)
                        //stop preloader here ! //***************
                    })
            }
        }
    }
</script>