<template>
    <div>
        <form @submit.prevent="deleteArticle">
                <label for="article_id">Delete ID for article: </label>
                <input type="int" name="int" v-model="article_id"/>
                <div v-show="submitted && !int">article_id is required</div>
                <button>delete article</button>
                <b-button variant = 2></b-button>
               
                
        </form>
    </div>

</template>
<script>
import { articleService } from '../services/article.service';
export default {
    data(){
        return {
            article_id: "",
            error:""
            
        }
    },
    methods:{
        deleteArticle(e){
            articleService.deleteArticle(this.article_id)
            .then(result =>{
                console.log("article has been deleted")
             })
        .catch(error =>{
            this.error = error;
            this.loading = false;
        })
        }
        
    }
}

</script>