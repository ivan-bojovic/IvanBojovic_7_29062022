import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/LoginForm.vue")
}, 
     
    {
    path: '/Signup',
     name: 'Signup',
     component: () => import("../views/SignupForm.vue")
   },
   {
    path: '/Feed',
    name: 'Feed',
   component: () => import("../views/Feed.vue")
  },  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;