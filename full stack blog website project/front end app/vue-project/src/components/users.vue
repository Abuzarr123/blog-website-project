<template>
    <div class="comment-container">
        <div class="comment-body">
            {{user_id}} - {{ first_name }}
            {{last_name}} - {{email}}   

        </div>
        
       
        
    </div>
 
    

</template>


 <script>

export default{
    props:{
        user_id:Number,
        first_name:String,
        last_name: String,
        email: String
    }
}
</script>