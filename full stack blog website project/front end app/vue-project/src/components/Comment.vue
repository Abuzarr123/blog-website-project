<template>
    <div class="comment-container">
        <div class="comment-body">
            {{comment_text}}
        </div>
        <div class="comment-footer">
            {{author}} - {{date_published}}   
           
        

        </div>
        
    </div>
    

</template>


 <script>
 import { commentsService } from '../services/comments.service';
 import home from "../pages/home.vue"
export default{
    data(){
        return {
            comments:{},
            num_comments: null,
            comment: "",
            error: "",
            loading: true,
            submitted: false,
            id: "",
            
        }
    },
  
    components:{
        home,
    },

    props:{
        comment_text:String,
        author: String,
        date_published: String
    }
}
</script>