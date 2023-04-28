<template>
    <div>
        <div v-if="loading">Article loading...</div>

        <div v-else>
            <h1>This is the articles</h1>
            <h2>{{article.title}}</h2>
            <h3>{{article.author}}</h3>
            <h2>{{article.date_published}}</h2>
            <p>{{article.article_text}}</p>
            
            
            <div v-if="error">
                {{error}}
            </div>
          

            <h3>Comments ({{ num_comments}})</h3>
            <form @submit.prevent="handlesubmit">
                <label for="Comment">Comment:</label>
                <input type="text" name="text" v-model="comment"/>
                <div v-show="submitted && !text">comment is required</div>
                <button>Add</button>     
        
          
             <div>
            <li v-for="comment in comments" :key="comment.comment_id">
                <p >{{'Id : ' + comment.comment_id + ' ' + comment.comment_text + ' ' + comment.date_published}}</p>
            </li>
        </div>
    </form>
        </div>
    </div>   
</template>


<script>
import Login from '../pages/Login.vue';
import { commentsService } from "../services/comments.service"
import { articleService } from '../services/article.service';
// import home from "../pages/home.vue"
// import CommentList from './CommentList.vue';

export default {
    data(){
        return {
            article:{},
            comments:[],
            num_comments: null,
            comment: "",
            error: "",
            loading: true,
            submitted: false,
            id: "",
            
        }
    },
    mounted(){
        this.article.loading = true;
        this.comments.loading = true
        

        articleService.getOne(this.$route.params.id)
        .then((article) =>{
            this.article = article;
            this.loading = false
            commentsService.getAll(this.$route.params.id)
            .then((comments) => {
                this.comments = comments
                this.num_comments = comments.length

            })
            .catch(error => this.error = error)

        })
        .catch(error => this.error = error);

    },
    
    methods: {
        handlesubmit(e){
            commentsService.create(this.$route.params.id, this.comment)
            .then(() => {
                console.log("comment added")
                commentsService.getAll(this.$route.params.id)
                .then((comments) => {
                    this.comments = comments
                    this.num_comments = comments.length
                })
                .catch((err) => this.error = err)


            })
            .catch((err) => this.error = err)
         
       
       
        },
       
    

    components:{
        // home,
        // CommentList,
        Login
         }
    }
}

</script>