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
        book std:<input v-model="bookStd">>
        book sub:<input v-model="bookSubject">
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
                console.log(this.fileLink)
                this.fileLink = this.fileLink.slice(this.fileLink.lastIndexOf('/')+1)
            },
            uploadBook(){
                if(this.file != '' && this.file != undefined) {
                    if (this.bookName.length != 0) {
                        //start preloader here ! //**************
                        let vm = this
                        let uploadTask = vm.$store.state.db.storage.ref('library/' + this.$route.params.schoolId + '/' + vm.fileLink) // no repeating name/link
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
                        alert('Name is compulsory !')
                    }
                }else {
                    alert('Upload a file !')
                }
            },
            submitBook(){
                let vm = this
                let tmpObj = {
                    name:this.bookName.toUpperCase(),
                    std:this.bookStd,
                    sub: this.bookSubject,
                    desc:this.bookDesc,
                    link:this.fileDownloadLink
                }
                vm.$store.state.db.db.ref('library/' + this.$route.params.schoolId).push(tmpObj)
                    .then(function(snapBook){
                        console.log('saved: ' + snapBook)
                        let bookKey = ''
                        bookKey = "" + snapBook
                        //console.log(bookKey.indexOf('/'))
                        bookKey = bookKey.slice(bookKey.lastIndexOf('/')+1)
                        console.log('bookKey: ',bookKey)

                        vm.$store.state.db.db.ref('libIndex/' + vm.$route.params.schoolId + '/' + tmpObj.name[0] + '/' + bookKey)
                            .set({bookKey, bookName: vm.bookName.toUpperCase()})
                            .then(function(snapLibIndex){
                                //stop preloader here ! //***************
                            })
                    })
            }
        },
        

    }
</script>
