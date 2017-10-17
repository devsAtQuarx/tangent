<template>
    <div>
        <h1>Tangent Home</h1>

        <!--content-->
        <p @click="schoolLogin">I am School</p>
        <p @click="principalLogin">I am Principal</p>
        <!--p @click="vpLogin">I am Vice-principal</p-->
        <p @click="teacherlogin">I am Teacher</p>
        <!--p @click="accountantLogin">I am Accountant</p-->
        <p @click="studentLogin">I am Student</p>
        <!--p @click="parentLogin">I am Parent</p-->

        <p @click="act" v-show="isLoggedIn">goToSchoolHome</p>

        <p v-show="showLoader">loading ...</p>

    </div>
</template>

<script>
    import firebase from 'firebase'
    import {mapGetters} from 'vuex'

    export default {
        data(){
          return {
              whoIsLoggedIn : '',
              showLoader : false
          }
        },
        methods:{
            schoolLogin(){
                this.whoIsLoggedIn = 'school'
                this.gSignIn()
            },
            principalLogin(){
                this.whoIsLoggedIn = 'principal'
                this.gSignIn()
            },
            vpLogin(){

            },
            teacherlogin(){
                this.whoIsLoggedIn = 'teacher'
                this.gSignIn()
            },
            accountantLogin(){

            },
            studentLogin(){
                this.whoIsLoggedIn = 'student'
                this.gSignIn()
            },
            parentLogin(){

            },
            gSignIn(){
                let vm = this
                if(!this.$store.state.auth.isLoggedIn) {
                    var provider = new firebase.auth.GoogleAuthProvider()
                    firebase.auth().signInWithRedirect(provider)
                    firebase.auth().getRedirectResult().then(function (result) {
                        if (result.credential) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            var token = result.credential.accessToken;
                            console.log(token)
                            // ...
                        }
                        //vm.$router.push('gLogin/' + vm.whoIsLoggedIn)
                        vm.$router.push({name: 'tangentHome', params:{
                                whoIsLoggedIn: vm.whoIsLoggedIn
                            }
                        })
                        // The signed-in user info.
                        var user = result.user;
                    }).catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        console.log(error)
                        // ...
                    });
                }else{
                    alert('already logged in as => ' + vm.$route.params.whoIsLoggedIn + ' log out first to log in again ! ')
                }
            },
            act(){
                let vm = this
                //console.log(this.$route.params)
                let  userEmail = vm.$store.state.auth.user.email
                while(userEmail.indexOf('.') != -1)
                    userEmail = userEmail.replace(".","replaceddothere")

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
            },
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
        },
        created(){
            if(this.$route.params.whoIsLoggedIn != 'notLoggedIn' && this.$store.state.auth.isLoggedIn == false){
                this.showLoader = true
            }
        }
    }
</script>