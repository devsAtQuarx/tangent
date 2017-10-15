<template>
    <div>
        <h1>spec book</h1>

        {{book}} - <a :href="book.link" target="_blank">download</a>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                book : {}
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
                    this.getSpecBook()
                }
            },
            getSpecBook(){
                let vm = this
                console.log('get spec book: ', this.$route.params.bookId)
                this.$store.state.db.db.ref('library/' + this.$route.params.schoolId + '/' + this.$route.params.bookId)
                    .once('value', function (snapBook) {
                        vm.book = snapBook.val()
                    })
            }
        },
        created(){
            this.checkIfUidIsLoaded()
        }
    }
</script>