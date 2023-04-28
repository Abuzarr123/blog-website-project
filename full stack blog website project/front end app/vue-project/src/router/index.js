import {createRouter, createWebHistory} from 'vue-router';

const ifAuthenticated = (to, from, next) =>{
    const loggedIn = localStorage.getItem('session_token');
    if(loggedIn){
        next()
        return
    }
    next('/login')
}




import home from "../pages/home.vue"
import Login from "../pages/Login.vue"
import Article from "../components/Article.vue"
import Comment from "../components/Comment.vue"
import Dashboard from "../pages/Dashboard.vue"
import NotFound from "../pages/NotFound.vue"
import users from"../components/users.vue"
// import users from "../pages/users.vue"
// import { usersService } from '../services/users.service'
//import { looseEqual } from '@vue/shared';
//import CommentList from "../components/CommentList.vue"


const routes = [
    {path: "/", component: home},
    {path: "/login", component:Login},
    {path: "/logout", component:Login},
    {path: "/article/:id", component:Article},
    {path: "/article/:id/comments", component:Comment},
    {path:"/dashboard", component: Dashboard, beforeEnter: ifAuthenticated},
    {path: "/:pathMatch(.*)*", component: NotFound},
    {path: "/users", component: users,beforeEnter: ifAuthenticated },
    

   


]




const router = createRouter({
    history: createWebHistory(),
    routes,
})



export default router 
