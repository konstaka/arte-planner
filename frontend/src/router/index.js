import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Commands from '@/views/Commands';
import Artefacts from '@/views/Artefacts';
import Artesweeps from '@/views/Artesweeps';
import Catapoints from '@/views/Catapoints';
import Treasuries from '@/views/Treasuries';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    roles: [],
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    roles: ['admin', 'defcoord'],
  },
  {
    path: '/artesweeps',
    name: 'Artesweeps',
    component: Artesweeps,
    roles: ['admin', 'defcoord'],
  },
  {
    path: '/catapoints',
    name: 'Catapoints',
    component: Catapoints,
    roles: ['admin', 'defcoord'],
  },
  {
    path: '/treasuries',
    name: 'Treasuries',
    component: Treasuries,
    roles: ['admin', 'defcoord'],
  },
  {
    path: '/artefacts',
    name: 'Artefacts',
    component: Artefacts,
    roles: ['admin', 'defcoord'],
  },
  {
    path: '/commands',
    name: 'Commands',
    component: Commands,
    roles: ['admin', 'defcoord'],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Always allow navigating to login page
  if (to.path === '/login') {
    next();
    return;
  }

  // For other pages, check user auth status
  // Jut see if token exists
  const idToken = Vue.$cookies.get('id_token');
  if (!idToken) {
    store.commit('SIGN_OUT');
    next('/login');
    return;
  }

  // User is signed in
  store.commit('SIGN_IN');
  store.commit('SET_USER_ROLES', Vue.$cookies.get('roles').split(','));
  if (!store.state.loaded) {
    await store.dispatch('updateCycle');
  }
  next();
});

export default router;
