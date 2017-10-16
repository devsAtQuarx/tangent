<template>
    <div>
        <h1>Taskbar</h1>
        <div v-for="(todo,i) in todos" v-show="!noTodo">
            <h3>{{todo.headline}}</h3>
            <div>{{todo.content}}</div>
            <button @click="changeWorkStatus(todo)">{{todo.status}}</button>
            <button @click="removeTask(todo)">X</button>
        </div>
        <input type="text" v-model="headline" v-show="showInput">
        <input type="text" v-model="content" v-show="showInput">
        <button @click="submitToDb" v-show="showInput">Submit</button>
        <h4 v-show="noTodo">Click the + button to add TASKS </h4>
        <button @click="addTask" v-show="!showInput">+</button>

    </div>
</template>
<script>
    export default {
        data(){
            return{
                todos:[],
                showInput:false,
                headline:'',
                content:'',
                noTodo:true

            }
        },
        methods: {
            removeTask(todo){
                let vm = this
                let userId= this.$store.state.auth.user.uid
                vm.$store.state.db.db.ref('taskbar/'+ userId +'/' + todo.key ).remove()
            },
            changeWorkStatus(todo){
                console.log(todo.key)
                let vm = this
                let userId= this.$store.state.auth.user.uid
                vm.$store.state.db.db.ref('taskbar/'+ userId +'/' + todo.key + '/status' ).set("done")
            },
            //checkIfUidIsLoaded
            checkIfUidIsLoaded() { //recursive
                console.log('checkIfUidIsLoaded')
                if (!this.$store.state.auth.isLoggedIn) { //stillNotLoggedIn
                    setTimeout(() => {
                        this.checkIfUidIsLoaded() // call again after 1 sec
                    }, 1000)
                } else { //loggedIn
                    this.getTodosFromDb()
                }
            },
            getTodosFromDb() {
                console.log("getTodos")
                let vm = this
                let userId= this.$store.state.auth.user.uid
                vm.$store.state.db.db.ref('taskbar/'+ userId +'/').on('value',function(snapTask){
                    if(snapTask.val() != null) {
                        vm.noTodo=false
                        vm.todos=[]
                        //console.log(snapTask.val())
                        for (let i in snapTask.val()) {
                            //console.log(snapTask.val()[i])
                            let tempTodo = snapTask.val()[i]
                                tempTodo.key=i
                            vm.todos.push(tempTodo)

                        }
                    }else{
                        vm.noTodo=true
                        vm.todos=[]
                    }
                })
            },
            addTask(){
                this.showInput = true
                this.noTodo= false
            },
            submitToDb(){
                this.showInput= false
                let  vm = this
                let userId= this.$store.state.auth.user.uid
                //console.log(userId)
                if (vm.headline != '' && vm.content != ''){
                    let tempObject={
                        headline: vm.headline,
                        content: vm.content,
                        status: 'pending'
                    }
                    vm.$store.state.db.db.ref('taskbar/'+ userId +'/').push(tempObject)
                    vm.headline=''
                    vm.content=''

                }else{
                    window.alert("required field is empty")
                }

            }
        },
        beforeMount() {
            this.checkIfUidIsLoaded()
        }
    }
</script>