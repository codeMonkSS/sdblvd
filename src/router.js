import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/HomePage/HomePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/PickDish',
      name: 'PickDish',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "PickDish" */ './components/PickDish/PickDish.vue'),
    },
    {
      path: '/PickDrinks',
      name: 'PickDrinks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "PickDrinks" */ './components/PickDrinks/PickDrinks.vue'),
    },
    {
      path: '/BookTable',
      name: 'BookTable',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "BookTable" */ './components/BookTable/BookTable.vue'),
    },
    {
      path: '/Receipt',
      name: 'Receipt',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ReceiptScreen" */ './components/ReceiptScreen/ReceiptScreen.vue'),
    },
  ],
});
