<template>
    <div>

        <h1 class="row justify-content-center">Login</h1>
       
       
        <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 border border-primary rounded-lg p-3">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input class="form-control" type="email" name="email" v-model="email"/>
                    <div v-show="submitted && !email" class="text-danger">Email is required</div>
                </div>

                <div class="form-group">
                    <label for="password">Password: </label>
                    <input class="form-control" type="password" name="password" v-model="password" />
                    <div v-show="submitted && !password" class="text-danger">Password is required</div>
                </div>

                <button class="btn btn-danger">Login</button>
                <div v-if="error" class="text-danger">{{error}}</div>
            </form>
        </div>
    </div>
</div>




    </div>
</template>

<script>
import {usersService} from"../services/users.service"
import * as EmailValidator from 'email-validator'
import navbar from '../components/navbar.vue';

// import Dashboard from "../pages/Dashboard.vue"

export default{
    data(){
        return{
            email: "",
            password:"",
            submitted: false,
            // error:"" 
        }
    },
    methods:{
        
        handleSubmit(e){
      
            this.submitted = true
           
            this.error = ""
            const {email, password} = this

            if(!(email && password)){
                return;
            }
            

            if(!(EmailValidator.validate(email))){
                this.error = "Email must be a valid email."
                return;
            }
            const password_pattern = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            if((password_pattern.test(password)) == false){
                this.error = "password not strong enough."
                return;
            }
            else{
                usersService.login(this.email,this.password)
                .then(result =>{
                console.log("Auth - go to dash")
                this.$router.push("/dashboard")
             })
        .catch(error =>{
            this.error = error;
            this.loading = false;
         })
      

     }
          

}


        },
        components:{
            navbar
        }
       
    }



</script>
<style>
.form-group{
    border-radius: 3px;
}
.btn-btn-danger{
    justify-content: end;
}
</style>