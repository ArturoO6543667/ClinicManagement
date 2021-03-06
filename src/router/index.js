import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Estadisticas from '../components/Estadisticas.vue'
import Doctores from '../components/Doctores.vue'
import ClientesEspera from '../components/ClientesEspera.vue'
import Inicio from '../components/Inicio.vue'
import Login from '../components/Login.vue'
import LoginPaciente from '../components/LoginPaciente.vue'
import Institucion from '../views/Institucion.vue'
import Ubicacion from '../views/Ubicacion.vue'
import DoctoresExterno from '../views/DoctoresExterno.vue'
import Especialidades from '../views/Especialidades.vue'
import Horario from '../components/Horario.vue'
import reservaCita from '../views/reservaCita.vue'
import FichasPaciente from '../views/FichasPaciente.vue'
import informacion from '../views/Informacion.vue'





Vue.use(VueRouter)

const routes = [{
        path: '/Home',
        name: 'Home',
        component: Home
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },

    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/Estadisticas',
        name: 'Estadisticas',
        component: Estadisticas
    },
    {
        path: '/Informacion',
        name: 'Informacion',
        component: informacion
    },
    {
        path: '/Doctores',
        name: 'Doctores',
        component: Doctores
    },
    {
        path: '/ClientesEspera',
        name: 'ClientesEspera',
        component: ClientesEspera
    },
    {
        path: '/Inicio',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/LoginPaciente',
        name: 'LoginPaciente',
        component: LoginPaciente
    },
    {
        path: '/Ubicacion',
        name: 'Ubicacion',
        component: Ubicacion
    },
    {
        path: '/Institucion',
        name: 'Institucion',
        component: Institucion
    },
    {
        path: '/DoctoresExterno',
        name: 'DoctoresExterno',
        component: DoctoresExterno
    },
    {
        path: '/Especialidades',
        name: 'Especialidades',
        component: Especialidades
    },
    {
        path: '/Horario',
        name: 'Horario',
        component: Horario
    },
    {
        path: '/reservaCita',
        name: 'reservaCita',
        component: reservaCita
    },
    {
        path: '/FichasPaciente',
        name: 'FichasPaciente',
        component: FichasPaciente
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router