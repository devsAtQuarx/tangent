<template>
    <div>
        <h1>show Books</h1>

        <li v-for="book in library">
            {{book}}
            <a :href="book.link" target="_blank">download</a>
        </li>

        <button @click="loadMoreBooks()">Load More ...</button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        methods:{
            //getBooks
            getBooks(){
                let vm = this
                vm.$store.state.db.db.ref('library/').limitToLast(3).once('value', function (snapBooks) {
                    //console.log(snapBooks.val())
                    vm.reverseFetchedBooksOrder(snapBooks.val())
                })
            },
            //reverseFetchedBooksOrder
            reverseFetchedBooksOrder(fetchedBooks){
                let tempBookArr = []
                for(let i in fetchedBooks){
                    fetchedBooks[i].key = i
                    tempBookArr.push(fetchedBooks[i])
                }
                tempBookArr.reverse()
                this.showBooksOnDom(tempBookArr)
            },
            //showBooksOnDom
            showBooksOnDom(tempBookArr){
                if(this.$store.state.feature.library.length == 0){
                    this.$store.state.feature.library = tempBookArr
                }else{
                    for(let i in tempBookArr){
                        if(tempBookArr[i].key ==
                            this.$store.state.feature.library[this.$store.state.feature.libraryBooksCount].key){
                            //do nothing
                        }else{
                            this.$store.state.feature.library.push(tempBookArr[i])
                        }
                    }
                }
            },
            //loadMore
            loadMoreBooks(){
                console.log('load more...')
                let vm = this
                this.$store.state.feature.libraryBooksCount += 2
                if(vm.$store.state.feature.library[this.$store.state.feature.libraryBooksCount]
                    != undefined ){
                    this.$store.state.db.db.ref('library/')
                        .orderByKey()
                        .endAt(vm.$store.state.feature.library[this.$store.state.feature.libraryBooksCount].key)
                        .limitToLast(3)
                        .once('value',function(snapshot){
                            //
                            vm.reverseFetchedBooksOrder(snapshot.val())
                        })
                }else{
                    // nothing to load more
                    //stop loader here !
                }
            },
            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.getBooks()
                }
            },
            //downloadBook
            downloadBook(url){
                //console.log(url)
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
            }
        },
        created(){
            if(this.$store.state.feature.libraryBooksCount == 0){
                this.checkIfUidIsLoaded()
            }
        },
        computed:{
            ...mapGetters([
                'library'
            ])
        }
    }
</script>