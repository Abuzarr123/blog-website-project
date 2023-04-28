<template>
    <div>
        <form @submit.prevent="updateArticle">
            <label for="article_id">article_id:</label>
                <input type="int" name="int" v-model="article_id"/>
                <div v-show="submitted && !int">article_id is required</div>
            <br/>
                <label for="title">title:</label>
                <input type="text" name="text" v-model="title"/>
                <div v-show="submitted && !title">title is required</div>
            <br/>
                <label for="author">author:</label>
                <input type="text" name="text" v-model="author"/>
                <div v-show="submitted && !author">author is required</div>
            <br/>
                <label for="article_text">article_text:</label>
                <input type="text" name="text" v-model="article_text"/>
                <div v-show="submitted && !article_text">article_text is required</div>
            <br/>
                <button>Update Article</button>

        </form>
    </div>
</template>

<script>
import { articleService } from '../services/article.service';

export default {
    data(){
        return{
            article_id:"",
            title:"",
            author:"",
            article_text:"",
            error:"",
            submitted:true

        }
    }, 
    methods:{
    updateArticle(e){
        this.error = ""
        this.submitted = true
        articleService.updateArticle(this.article_id,this.title,this.author,this.article_text)
        .then(()=>{
            console.log("The article has been updated")
        })
        .catch(error => this.error = error)


      }
    }
}
</script>