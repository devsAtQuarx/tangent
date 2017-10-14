<template>
    <div>
        <h1>search book</h1>

        <input v-model="bookName" @keyup="searchBook">

        <p v-for="book in gotBooks" >
            <span v-if="book.show" @click="bookDetail(book)">
                {{book.bookName}}
            </span>
        </p>

        <span>{{error}}</span>
    </div>
</template>

<script>
    export default {
        data(){
          return {
              bookName : '',
              gotBooks : {},
              error : ''
          }
        },
        methods:{
            searchBook(){
                let vm = this
                console.log(this.bookName[0])
                this.$store.state.db.db.ref('libIndex/' + this.$route.params.schoolId + '/' + this.bookName[0].toUpperCase())
                    .once('value', function (snapBooks) {
                        console.log('books: ', snapBooks.val())
                        if(snapBooks.val() == null){
                            vm.error = 'no book found !'
                            vm.gotBooks = {}
                        }else{
                            console.log('else')
                            vm.error = ''
                            vm.gotBooks = snapBooks.val()
                            vm.filter()
                        }
                    })
            },
            bookDetail(book){
                console.log(book.bookKey)
                this.$router.push({
                    name : 'specBook',
                    params:{
                        bookId:book.bookKey
                    }
                })
            },
            filter(){
                for(let i in this.gotBooks){
                    if(this.gotBooks[i].bookName.indexOf(this.bookName.toUpperCase()) != -1){
                        this.gotBooks[i].show = true
                    }else{
                        this.gotBooks[i].show = false
                    }
                }
            }
        }
    }
</script>

<style>

</style>