<template>
    <div>
        school home page - {{$route.params.id}}
        <br>

        <!--options--><!-- lock options till uid is loaded -->
        <span v-show="showCreateAccounts" @click="goToCreateAccounts">create accounts</span>

        <br>
        <div v-if="showLoader">loading ... </div>
        <div v-else>
            {{user}}
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import firebase from 'firebase'

    export default {
        // ...
        data(){
          return {
              showLoader : true
          }
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'user'
            ]),
            showCreateAccounts(){
                if(this.$route.params.whoLoggedIn == 'school' && this.showLoader == false)
                    return true
                else
                    return false
            }
        },
        methods:{
            //checkIfUidIsLoaded
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    this.showLoader = true // is uid is not loaded
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.act()
                }
            },
            act(){
                let vm = this
                console.log(this.$route.params)
                let  userEmail = vm.$store.state.auth.user.email
                while(userEmail.indexOf('.') != -1)
                    userEmail = userEmail.replace(".","replacedDotHere")
                //check in db, validate id
                if(this.$route.params.whoLoggedIn == 'school') { //schoolLoggedIn
                    console.log('schoollogin' + this.$store.state.auth.user.uid)
                    this.$router.push({name : 'schoolHome', params:{id: this.$store.state.auth.user.uid,
                        whoLoggedIn: this.$route.params.whoLoggedIn}})
                    this.showLoader = false // if loaded call main func
                }else{ //not school LoggedIn

                    this.$store.state.db.db.ref('createdAccounts/' + this.$route.params.whoLoggedIn + '/' + userEmail)
                        .once('value', function (snapCheckUid) {
                            console.log(snapCheckUid.val(), userEmail)
                            if(snapCheckUid.val() == null){
                                alert('not ok')
                                vm.gSignOut()
                            }
                            else if (snapCheckUid.val().email == vm.$store.state.auth.user.email) {
                                alert('ok')

                                vm.$router.push({name : 'schoolHome', params:{id: snapCheckUid.val().schoolId,
                                    whoLoggedIn: vm.$route.params.whoLoggedIn}})
                                vm.showLoader = false // if loaded call main func

                            } else {
                                alert('not ok')
                                vm.gSignOut()
                            }
                        })
                }
            },
            goToCreateAccounts(){
                this.$router.push('/createAccounts/' + this.user.uid)
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
            showCreateAccount(){

            }
        },
        created(){
            this.checkIfUidIsLoaded()
        }
    }
</script>