<template>
    <div>        
        
        


        <h1>Dashboard</h1>
        <form @submit.prevent="handleSubmit">
        <button>logout</button>

        <h3>User list</h3>


        <div>
        <users v-for="(user,index) in users" :key="index"
            :user_id="user.user_id"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :email="user.email"
        />
    </div>
        

    </form>


    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 border border-primary rounded-lg p-3">  <form @submit.prevent = "postUser">
    <label for="first_name">first name:</label>
    <input type="text" name="first_name" v-model="first_name"/>
    <div v-show="submitted && !first_name">first name is required</div>
    <br/>
    <label for="last_name">last name:</label>
    <input type="text" name="last_name" v-model="last_name"/>
    <div v-show="submitted && !last_name">last name is required</div>
    <br/>
    <label for="email">email:</label>
    <input type="text" name="email" v-model="email"/>
    <div v-show="submitted && !email">email is required</div>
    <br/>
    <label for="password">password:</label>
    <input type="text" name="password" v-model="password"/>
    <div v-show="submitted && !password">password is required</div>
    <br/>
    <button class="btn btn-danger">Add a User</button>  </form>
</div>
</div>
    </div>
    </div>
    
    <br/>
    <Articlepost /> 
    <br/>
    <deleteArticle/>
    <br/>
    <deleteComment/>
    <br/>
    <updateArticle/>
</template>


<script>
import Login from '../pages/Login.vue';
import {usersService} from"../services/users.service"
import { articleService } from '../services/article.service';
import users from '../components/users.vue';
import navbar from '../components/navbar.vue';
import Articlepost from '../components/Articlepost.vue';
import deleteArticle from '../components/deleteArticle.vue';
import deleteComment from '../components/deleteComment.vue';
import updateArticle from '../components/updateArticle.vue';
// import userList from '../components/userList.vue';
// import userpost from '../components/userpost.vue';

export default{
    data(){
        return{
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            submitted: false,
            loading: true,
            id:"",
            users:[],
            error:"",
            num_users: null

            
        }
    },
    mounted(){ 
        usersService.getAllUsers(this.$route.params.id)
            .then((users) => {
                this.users = users
                this.loading = true
                this.num_users = users.length

            })
            .catch(error => this.error = error)

    },
   
    
    methods:{
        
        handleSubmit(e){
            usersService.logout()
                .then(result =>{
                console.log("Auth - go to home")
                localStorage.clear();
                this.$router.push("/")
             })
        .catch(error =>{
            this.error = error;
            this.loading = false;
        })
        // usersService.getAllUsers()
        //         .then(result =>{
        //         console.log("Auth - get all users")
        //         this.$router.push("/users")
        //      })
        // .catch(error =>{
        //     this.error = error;
        //     this.loading = false;
        // })
        },

        postUser(){
            this.submitted = true
            this.error = ""
            usersService.create(this.first_name,this.last_name,this.email,this.password)
            .then(() => {
                console.log("user added")
                usersService.getAll(this.$route.params.id)
                .then((users) => {
                    this.users = users
                    // this.loading = true
                    this.num_users = users.length
                })
                .catch((err) => this.error = err)


            })
            .catch((err) => {
            this.error = err
            })

        
         }

        
    },
    components:{
     Login,
     users,
     navbar,
     Articlepost,
     deleteArticle,
     deleteComment,
     updateArticle
    // userpost
    // userList
    }

}




</script>