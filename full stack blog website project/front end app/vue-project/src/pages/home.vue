<template>
      <div>
        <h1>Welcome to my blog!</h1>
        <em v-if="loading">Loading articles...</em>

        <ul v-if="articles.length">
            <li v-for="article in articles" :key="article.article_id">
                <router-link :to="'/article/' + article.article_id">
                {{(article.article_id + article.title + ' by ' + article.author)}}
            </router-link>
            </li>
        </ul>
        <div v-if="error">
            {{error}}
        </div>
        
    </div>
</template>
<script>

import { articleService } from "../services/article.service"
import navbar from '../components/navbar.vue';

export default{
    data() {
        return{
            articles:[],
            error: "",
            loading: true,
            title:"",
            author:"",
            article_text:"",
            id:"",
            num_articles:null,
            submitted:false
        }
    },
    mounted() {
        articleService.getAll()
        .then(articles =>{
            this.articles = articles
            this.loading = false
        })
        .catch(error => this.error = error);

    },
    
    components:{
        navbar,
     }
}




</script>