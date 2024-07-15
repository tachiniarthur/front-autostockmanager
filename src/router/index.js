import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import PerfilView from './../views/PerfilView.vue'
import ForgetPasswordView from './../views//ForgetPasswordView.vue';
import HomeView from "@/views/HomeView.vue";
import GestaoVeiculosView from './../views/GestaoVeiculosView.vue'
import GestaoUsuariosView from './../views/GestaoUsuariosView.vue'
import GestaoEventosView from "@/views/GestaoEventosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPasswordView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: '/home', 
          name: 'home',
          component: HomeView
        },
        {
          path: '/perfil',
          name: 'perfil',
          component: PerfilView
        },
        {
          path: '/gestao-veiculos', 
          name: 'gestao-veiculos',
          component: GestaoVeiculosView
        },
        {
          path: '/gestao-usuarios', 
          name: 'gestao-usuarios',
          component: GestaoUsuariosView
        },
        {
          path: '/gestao-eventos', 
          name: 'gestao-eventos',
          component: GestaoEventosView
        },
      ]
    },
  ]
})

export default router
