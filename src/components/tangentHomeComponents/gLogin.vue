<template>
    <div>
        <h1>gLogin</h1> {{$route.params}}

        <div v-if="!isLoggedIn">loading...</div>
        <div v-else>{{user}}</div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import {mapGetters} from 'vuex'

    export default{
        data(){
          return {

          }
        },
        methods:{
            act(){
                let vm = this
                //console.log(this.$route.params)
                let  userEmail = vm.$store.state.auth.user.email
                while(userEmail.indexOf('.') != -1)
                    userEmail = userEmail.replace(".","replacedDotHere")

                if(this.$route.params.whoIsLoggedIn == 'school') { //schoolLoggedIn /**************
                    //this.$store.state.auth.schoolId = this.$store.state.auth.user.uid
                    //route
                    this.$router.push({
                        name : 'schoolHome',
                        params:{
                            schoolId: this.$store.state.auth.user.uid,
                            whoIsLoggedIn: this.$route.params.whoIsLoggedIn
                        }
                    })
                }else{ //not school LoggedIn /***************

                    this.$store.state.db.db.ref('createdAccounts/' + this.$route.params.whoIsLoggedIn + '/' + userEmail)
                        .once('value', function (snapCheckUid) {
                            console.log(snapCheckUid.val(), userEmail)
                            if(snapCheckUid.val() == null){
                                alert('not ok')
                                vm.gSignOut()
                            }
                            else if (snapCheckUid.val().email == vm.$store.state.auth.user.email) {
                                alert('ok')
                                //route
                                vm.$router.push({
                                    name : 'schoolHome',
                                    params:{
                                        schoolId: snapCheckUid.val().schoolId,
                                        whoIsLoggedIn: vm.$route.params.whoIsLoggedIn
                                    }
                                })

                            } else {
                                alert('not ok')
                                vm.gSignOut()
                            }
                        })
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
                    this.act()
                }
            },
            gSignOut(){
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    console.log("Sucessfully Logged Out")
                }).catch(function(error) {
                    // An error happened.
                    console.log("Failed to LogOut", error)
                });
            }
        },
        computed:{
            ...mapGetters([
                'isLoggedIn','user'
            ])
        },
        watch:{
            isLoggedIn: function(){
                if(this.$store.state.auth.isLoggedIn){
                    this.checkIfUidIsLoaded()
                }
            }
        }
    }
</script>