<template>
    <div>
        <form @submit.prevent="commentdelete">
            <label for="comment_id">Delete ID for comment: </label>
                <input type="int" name="int" v-model="comment_id"/>
                <div v-show="submitted && !int">comment_id is required</div>
                <button>delete comment</button>
        </form>
    </div>
</template>
<script>
 import { commentsService } from '../services/comments.service';
 
 export default {
    data(){
        return {
            comment_id: "",
            
        }
    },
    methods:{
 commentdelete(e){
            commentsService.deleteComment(this.comment_id)
            .then(result =>{
                console.log("comment has been deleted")
            })
            .catch(error => this.error = error)
        

        }
    }
}

</script>