<template>
    <div>
        <h1>show Books</h1>

        <button @click="goToSearchBook()">search book</button>

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
        data(){
          return {
            bookName: ''
          }
        },
        methods:{
            //getBooks
            getBooks(){
                let vm = this
                vm.$store.state.db.db.ref('library/' + this.$route.params.schoolId).limitToLast(3).once('value', function (snapBooks) {
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
                    this.$store.state.db.db.ref('library/' + this.$route.params.schoolId)
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
            },
            //goToSearchBook
            goToSearchBook(){
                this.$router.push({name: 'searchBook'})
            }
        },
        created(){
            if(this.$store.state.feature.libraryBooksCount == 0 &&
              this.$store.state.feature.library.length == 0){
                this.checkIfUidIsLoaded()
            }
        },
        computed:{
            ...mapGetters([
                'library'
            ])
        },
        //updated
        updated(){
          let vm = this
          this.$store.state.db.db.ref('library/' + this.$route.params.schoolId)
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
