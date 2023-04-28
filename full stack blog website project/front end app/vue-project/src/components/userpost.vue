<template>
    <div>
        
    </div>
</template>


<script>
import { usersService } from '../services/users.service';
export default{
    data(){
        return{
            users:[],
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            num_users: null
        }
    },
    methods:{
        postUser(e){
            usersService.create(this.$route.params.id, this.users)
            .then(() => {
                console.log("user added")
                usersService.getAll(this.$route.params.id)
                .then((users) => {
                    this.users = users
                    this.num_users = users.length
                })
                .catch((err) => this.error = err)


            })
            .catch((err) => this.error = err)
         
       
       
        }
    }
 }


    



</script>