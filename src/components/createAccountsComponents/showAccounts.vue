<template>
    <div>
        <h1>show {{checkWhosAccount}} accounts</h1>

        {{$route.params}}

        <span>
            {{error}}
        </span>



        <li v-show="$route.params.whosAccount == 'student' " v-for="std in stds">
            <span @click="selectStd(std)">{{std.std}}</span>
        </li>


        <p v-for="(account, index) in accountsCopy">
            {{account}}
            <button @click="delAccount(account, index)">
                delete
            </button>

            <!-- student -->
            <span v-show="$route.params.whosAccount == 'student' ">

                <input v-model="account.std" @keyup="reactOnChange(account, index)">

                <!-- save -->
                <button  v-show="account.showSave == true && account.std != '' " @click="saveAccount(account, index)">
                    save
                </button>
            </span>

            <!-- teacher -->
            <span v-show="$route.params.whosAccount == 'teacher' ">
                <!--input v-model="account.ctStd" @keyup="changeTeacherCtStd(account, index)"-->

                <!-- save -->
                <!--button  v-show="account.showSave" @click="saveAccount(account, index)">
                    save
                </button-->
            </span>

            <!-- principal -->
            <span v-show="$route.params.whosAccount == 'principal' ">

            </span>

        </p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //vm : this,
                accounts : [],
                accountsCopy : [],
                error : '',
                whosAccount : '',
                stds : []
            }
        },
        methods:{
            checkIfUidIsLoaded(){ //recursive
                console.log('checkIfUidIsLoaded')
                if(!this.$store.state.auth.isLoggedIn){ //stillNotLoggedIn
                    setTimeout(()=>{
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    },1000)
                }else{ //loggedIn
                    this.getAccounts()
                }
            },
            getAccounts(){
                this.accounts  = []
                this.accountsCopy  = []
                this.stds = []
                let vm = this

                if(this.$route.params.whosAccount == 'student'){
                    vm.getStds()
                }else{
                    this.finalGetAccounts()
                }

            },
            getStds(){
                this.stds = []
                let vm = this
                vm.$store.state.db.db.ref('checkClass/' + vm.$route.params.schoolId).once('value', function(snapClass){
                    for(let i in snapClass.val()){
                        vm.stds.push(snapClass.val()[i])
                    }
                })

            },
            finalGetAccounts(){
                let vm = this

                this.$store.state.db.db.ref('school/' + this.$route.params.schoolId + '/' + 'createdAccounts' + '/' +
                    this.$route.params.whosAccount)
                    .once('value', function(snapAccounts){
                        console.log(snapAccounts.val())
                        if(snapAccounts.val() == null){
                            vm.error = 'no accounts !'
                            vm.accounts = {}
                        }else{
                            vm.error = ''

                            let c = 0
                            for(let i in snapAccounts.val()){
                                vm.accounts.push(snapAccounts.val()[i])
                                vm.accountsCopy.push(snapAccounts.val()[i])

                                vm.accounts[c].showSave = false
                                vm.accountsCopy[c].showSave = false

                                c++
                            }
                        }
                    })
            },
            delAccount(account, index){
                let vm = this

                console.log(account)
                //delete from => school
                console.log(account.email)

                let accountEmail = account.email
                while(accountEmail.indexOf('.') != -1)
                    accountEmail = accountEmail.replace(".","replaceddothere")

                //delete from => createAccounts
                this.$store.state.db.db.ref('school/' + this.$route.params.schoolId + '/' + 'createdAccounts' + '/' +
                this.$route.params.whosAccount + '/' + accountEmail).remove()
                .then(function(snapDelAccount){
                    vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount + '/' + accountEmail).remove()
                    .then(function(snapDeleted){
                        //delete from array/obj

                        //if teacher
                        if(vm.$route.params.whosAccount == 'teacher') {
                            //check if class teacher
                            //vm.checkIfCt(account, index, accountEmail)
                            vm.finalDel(account, index)
                        }else if(vm.$route.params.whosAccount == 'principal'){ //principal
                            //console.log('before scplice =>', vm.accountsCopy)
                            //console.log('index => ', index)

                            //console.log('after scplice =>',vm.accountsCopy)

                            vm.finalDel(account, index)

                            ////////////////////////
                        }else if(vm.$route.params.whosAccount == 'student'){
                            vm.removeStudentFromClassDetail(account, index, accountEmail)
                        }

                    })
                })

            },
            finalDel(account, index){
                let vm = this
                vm.accounts.splice(index, 1)
                vm.accountsCopy.splice(index, 1)
                vm.checkIfArrIsEmpty()
                alert('deleted !')
            },
            /*delTeacherDetail(account, index, accountEmail){
                let vm = this
                console.log('classDetail/' + this.$route.params.schoolId + '/' + vm.accounts[index].ctStd + 'ct' + '/' +
                    accountEmail)
                this.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + vm.accounts[index].ctStd + '/ct' + '/' +
                    accountEmail).remove()
                .then(function(snapClassDetDel){
                    vm.$store.state.db.db.ref('checkCt/' + vm.$route.params.schoolId + '/' + accountEmail).remove()
                        .then(function(snapCheckCtDel){
                            vm.accounts.splice(index, 1)
                            vm.accountsCopy.splice(index, 1)
                            vm.checkIfArrIsEmpty()

                            //////////////////////
                            alert('deleted !')
                        })
                })
            },*/
            /*checkIfCt(account, index, accountEmail){
                let vm = this
                //this.$store.state.db.db.ref('checkCt' + this.$route.params.schoolId + '/' + accountEmail)
                    //.once('value', function(snapCheckIfCt){
                        if(vm.accounts[index].ctStd == ""){
                        //if(snapCheckIfCt.val() == null){ //if not ct
                            vm.accounts.splice(index, 1)
                            vm.accountsCopy.splice(index, 1)
                            vm.checkIfArrIsEmpty()

                            ///////////////////////
                            alert('deleted !')
                        }else{ //if ct
                            vm.delTeacherDetail(account, index, accountEmail)
                        }
                    //})
            },*/
            removeStudentFromClassDetail(account, index, accountEmail){
                let vm = this
                this.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + account.std + '/' +
                    this.$route.params.whosAccount + '/' +  accountEmail).remove()
                    .then(function (snapDelStduentFromClassDetail) {
                        vm.accounts.splice(index, 1)
                        vm.accountsCopy.splice(index, 1)
                        vm.checkIfArrIsEmpty()

                        vm.removeClassFromCheckClass(account)
                    })
            },
            removeClassFromCheckClass(account){
                let vm = this
                vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + account.std)
                    .limitToLast(1).once('value', function(snapCheckClass){  //check to remove
                        if(snapCheckClass.val() == null){
                            //del from check class

                            vm.finalRemoveCheckClass(account)
                        }else{
                            //do nothing
                            //donot delete from check class

                            ///////////////////////
                            vm.getStds()
                            alert('deleted ')
                        }
                })
            },
            finalRemoveCheckClass(account){
                let vm = this
                vm.$store.state.db.db.ref('checkClass/' + vm.$route.params.schoolId + '/' + account.std)
                    .remove().then(function(snapDelCheck){

                    ///////////////////////
                    vm.getStds()
                    alert('deleted ')
                })
            },
            checkIfArrIsEmpty(){
                if(this.accountsCopy.length == 0){
                    this.error = 'no account'
                }
            },
            saveAccount(account, index){
                console.log(account)
                //save
                let vm = this

                let accountEmail = account.email
                while(accountEmail.indexOf('.') != -1)
                    accountEmail = accountEmail.replace(".","replaceddothere")

                if(vm.$route.params.whosAccount == 'student' ){
                    account.std = account.std.toLowerCase()
                }else if(vm.$route.params.whosAccount == 'teacher'){
                    account.ctStd = account.ctStd.toLowerCase()
                }


                this.$store.state.db.db.ref('school/' + this.$route.params.schoolId + '/' + 'createdAccounts' + '/' +
                    this.$route.params.whosAccount + '/' + accountEmail).set(account)
                    .then(function(snapSchoolDet){
                        vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount + '/' + accountEmail)
                            .set(account)
                            .then(function(snapCreatedAcc){
                                if(vm.$route.params.whosAccount == 'principal'){
                                    alert('changed !')
                                }else if(vm.$route.params.whosAccount == 'teacher'){
                                    vm.updateTeacherAcc(account, index, accountEmail)
                                }else if(vm.$route.params.whosAccount == 'student'){
                                    vm.updateStudentAcc(account, index, accountEmail)
                                }
                            })
                    })

            },
            /*updateTeacherAcc(account, index, accountEmail){
                let vm = this
                if(account.ctStd != '' ){ //ct

                    //delete old
                    vm.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + vm.accounts[index].ctStd + '/ct' + '/' +
                        accountEmail).remove() //problem
                        .then(function(snapTeacherClassDeatail){
                            vm.$store.state.db.db.ref('checkCt/' + vm.$route.params.schoolId + '/' + accountEmail).remove()
                                .then(function(snapCheckCt){

                                    // then set new
                                    vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + account.ctStd + '/ct' + '/' +
                                        accountEmail).set(account) //problem
                                        .then(function(snapTeacherClassDeatail){
                                            vm.$store.state.db.db.ref('checkCt/' + vm.$route.params.schoolId + '/' + accountEmail).set(account)
                                                .then(function(snapCheckCt){
                                                    //*********************
                                                    vm.accounts[index].ctStd = account.ctStd
                                                    alert('changed !')
                                                })
                                        })

                                })
                        })
                }else{ // not ct

                    console.log(vm.accounts[index].ctStd, '=>' , vm.accountsCopy[index].ctStd)

                    //del old
                    vm.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + vm.accounts[index].ctStd + '/ct' + '/' +
                        accountEmail).remove() //problem
                        .then(function(snapTeacherClassDeatail){
                            vm.$store.state.db.db.ref('checkCt/' + vm.$route.params.schoolId + '/' + accountEmail).remove()
                                .then(function(snapCheckCt){
                                    //**************************************
                                    vm.accounts[index].ctStd = account.ctStd
                                    alert('changed, not a ct anymore !')
                                })
                        })
                }
            },*/
            updateStudentAcc(account, index, accountEmail){
                let vm = this

                console.log(vm.accounts[index].std, '=>' , vm.accountsCopy[index].std)

                //delete old
                vm.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + vm.accounts[index].std + '/student' + '/' +
                    accountEmail).remove() //problem
                    .then(function(snapTeacherClassDeatail){

                        // then set new
                        vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + account.std + '/student' + '/' +
                            accountEmail).set(account) //problem
                        .then(function(snapTeacherClassDeatail){

                            vm.removeClassFromCheckClassOnSave(account, index)

                            //*********************
                            //vm.accounts[index].std = account.std
                            //alert('changed !')

                        })

                    })
            },
            removeClassFromCheckClassOnSave(account, index){
                let vm = this
                vm.$store.state.db.db.ref('classDetail/' + vm.$route.params.schoolId + '/' + vm.accounts[index].std + '/student')
                    .limitToLast(1).once('value', function(snapCheckClass){  //check to remove
                    if(snapCheckClass.val() == null){
                        //del from check class
                        //alert('null del')
                        vm.finalRemoveCheckClassOnSave(account, index)
                    }else{
                        //do nothing
                        //donot delete from check class

                        //alert('not null, not del')
                        vm.addNewCheckClass(account, index)
                        ///////////////////////
                        //vm.accounts[index].std = account.std
                        //alert('changed')
                    }
                })
            },
            finalRemoveCheckClassOnSave(account, index){
                let vm = this
                vm.$store.state.db.db.ref('checkClass/' + vm.$route.params.schoolId + '/' + vm.accounts[index].std)
                    .remove().then(function(snapDelCheck){

                    ///////////////////////
                    //alert('changed')
                    vm.addNewCheckClass(account, index)
                })
            },
            addNewCheckClass(account, index){
                let vm = this
                vm.$store.state.db.db.ref('checkClass/' + vm.$route.params.schoolId + '/' + account.std)
                    .set({
                        schoolId : vm.$route.params.schoolId,
                        std : account.std
                    }).then(function(snapDelCheck){

                    ///////////////////////
                    vm.accounts[index].std = account.std
                    vm.getStds()
                    alert('changed ****')
                })
            },
            reactOnChange(account, index){
                let vm = this

                let accountEmail = account.email
                while(accountEmail.indexOf('.') != -1)
                    accountEmail = accountEmail.replace(".","replaceddothere")

                vm.$store.state.db.db.ref('createdAccounts/' + vm.$route.params.whosAccount + '/' + accountEmail)
                    .on('value', function(snapTeacherCtStd){
                        //console.log(snapTeacherCtStd.val())

                        if(vm.$route.params.whosAccount == 'teacher'){
                            //check
                            if(snapTeacherCtStd.val().ctStd != account.ctStd){
                                console.log('show !')
                                vm.accountsCopy[index].showSave = true
                                console.log(vm.accountsCopy[index].ctStd, ' => ', vm.accounts[index].ctStd)
                            }else{
                                vm.accountsCopy[index].showSave = false
                                console.log(vm.accountsCopy[index].ctStd, ' => ', vm.accounts[index].ctStd)
                            }
                        }else if(vm.$route.params.whosAccount == 'student'){
                            if(snapTeacherCtStd.val().std != account.std){
                                console.log('show !')
                                vm.accountsCopy[index].showSave = true
                                console.log(vm.accountsCopy[index].std, ' => ', vm.accounts[index].std)
                            }else{
                                vm.accountsCopy[index].showSave = false
                                console.log(vm.accountsCopy[index].std, ' => ', vm.accounts[index].std)
                            }
                        }
                    })
            },
            selectStd(std){
                console.log(std)
                this.finalGetStudentAccounts(std)
            },
            finalGetStudentAccounts(std){
                this.accounts  = []
                this.accountsCopy  = []
                let vm = this

                this.$store.state.db.db.ref('classDetail/' + this.$route.params.schoolId + '/' + std.std + '/student')
                    .once('value', function(snapAccounts){
                        console.log(snapAccounts.val())
                        if(snapAccounts.val() == null){
                            vm.error = 'no accounts !'
                            vm.accounts = {}
                        }else{
                            vm.error = ''

                            let c = 0
                            for(let i in snapAccounts.val()){
                                vm.accounts.push(snapAccounts.val()[i])
                                vm.accountsCopy.push(snapAccounts.val()[i])

                                vm.accounts[c].showSave = false
                                vm.accountsCopy[c].showSave = false

                                c++
                            }
                        }
                    })
            }
        },
        computed:{
            checkWhosAccount(){
                this.whosAccount = this.$route.params.whosAccount
                return this.whosAccount
            }
        },
        watch:{
            whosAccount: function(){
                console.log('changed whos account !')
                this.checkIfUidIsLoaded()
            }
        }
    }
</script>