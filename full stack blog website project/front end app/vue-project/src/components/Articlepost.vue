<template>
    <div>
      <form @submit.prevent="addarticle">
              <label for="title">Title:</label>
              <input type="text" name="title" v-model="title"/>
              <div v-show="submitted && !title">title is required</div>

              <label for="author">Author:</label>
              <input type="text" name="author" v-model="author"/>
              <div v-show="submitted && !author">author is required</div>

              <label for="article_text">Article_text:</label>
              <input type="text" name="article_text" v-model="article_text"/>
              <div v-show="submitted && !article_text">Article_text is required</div>

              <button>Add Article</button>


          </form>
  </div>
</template>

<script>
import { articleService } from '../services/article.service';
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
    methods:{
        
        addarticle(e){
            this.submitted = true
            this.error = ""
            articleService.create(this.title,this.author,this.article_text)
            .then(()=>{
                console.log("article added")
                articleService.getAll(this.$route.params.id)
                .then((articles)=>{
                    this.articles = articles
                    this.num_articles = articles.length
                })
                .catch((err)=> this.error = err)
            })
            .catch((err)=>{
                this.error = err
            })

        }

        
    },
    

}
</script>