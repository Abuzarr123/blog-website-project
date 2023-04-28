<template>
    <div>
        <h1>users</h1>
        <users v-for="(user,index) in users" :key="index"
            :user_id="user.id"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :email="user.email"
        />
    </div>
</template>

<script>
    // import Comment from "./Comment.vue"
    import users from "./users.vue"


export default{

    data(){
        return{
            users:   [
                {user_id: "", first_name: "", last_name: "", email: ""},
              

            ]
                

            
        }
        
    },
    components:{
        users
    }
}

</script>