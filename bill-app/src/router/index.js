import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/bills',
      name: 'bills',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/BillsListView.vue')
    },
    {
      path: '/bill/:id',
      name: 'bill',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/BillView.vue')
    },

    //on ajoute les routes pour les clients
    {
      path: '/clients',
      name: 'clients',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/ClientsListView.vue')
    },
    {
      path: '/client/:id',
      name: 'client',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/ClientView.vue')
    },
    // expression régulière pour gérer les erreurs de navigation
    // Attention à bien mettre cette route en dernier dans le tableau du router
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
