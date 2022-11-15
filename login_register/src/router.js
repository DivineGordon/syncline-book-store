//import * as  Vue from 'vue';
import {  createRouter ,createWebHistory} from 'vue-router'; 
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

//Vue.use(Router);

export const router = createRouter({
  mode: 'history',
  history:createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/static/login',
      component: Login
    },
    {
      path: '/static/register',
      component: Register
    },
    {
      path: '/static/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/static/login', '/static/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/static/login');
    } else {
      next();
    }
  });