import {
    createRouter,
    createWebHistory
} from "vue-router"
import {auth as $store} from "@/store/auth.model";
import MainPage from "@/pages/MainPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import AdminMainPage from "@/pages/Admin/AdminMainPage.vue";
import UserMainPage from "@/pages/User/UserMainPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import BaseUserAdminPage from "@/pages/Admin/User/BaseUserAdminPage.vue";
import EditUserAdminPage from "@/pages/Admin/User/EditUserAdminPage.vue";
import VueUserAdminPage from "@/pages/Admin/User/VueUserAdminPage.vue";
import BaseEnvAdminPage from "@/pages/Admin/EnvContent/BaseEnvAdminPage.vue";
import VueEnvAdminPage from "@/pages/Admin/EnvContent/VueEnvAdminPage.vue";
import BaseArticleAdminPage from "@/pages/Admin/Article/BaseArticleAdminPage.vue";
import EditArticleAdminPage from "@/pages/Admin/Article/EditArticleAdminPage.vue";
import VueArticleAdminPage from "@/pages/Admin/Article/VueArticleAdminPage.vue";
import BaseArticlePage from "@/pages/Other/Article/BaseArticlePage.vue";
import VueArticlePage from "@/pages/Other/Article/VueArticlePage.vue";
import ReadArticlePage from "@/pages/Other/Article/ReadArticlePage.vue";
import BaseEventAdminPage from "@/pages/Admin/Event/BaseEventAdminPage.vue";
import EditEventAdminPage from "@/pages/Admin/Event/EditEventAdminPage.vue";
import VueEventAdminPage from "@/pages/Admin/Event/VueEventAdminPage.vue";
import BaseEventPage from "@/pages/Other/Event/BaseEventPage.vue";
import VueEventPage from "@/pages/Other/Event/VueEventPage.vue";
import ReadEventPage from "@/pages/Other/Event/ReadEventPage.vue";
import BaseProfilePage from "@/pages/Other/Profile/BaseProfilePage.vue";
import UserEditProfilePage from "@/pages/Other/Profile/UserEditProfilePage.vue";
import EventUserProfilePage from "@/pages/Other/Profile/EventUserProfilePage.vue";
import ArticleUserProfilePage from "@/pages/Other/Profile/ArticleUserProfilePage.vue";
import CalendarUserProfilePage from "@/pages/Other/Profile/CalendarUserProfilePage.vue";


const routes = [
    {
        path: '/',
        component: MainPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "admin") {
                    next("/admin");
                }
                else {
                    next();
                }
            }else{
                next()
            }
        }
    },
    {
        path: '/login',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn === false){
                next();
            }else{
                next('/')
            }
        }

    },
    {
        path: '/registration',
        component: RegistrationPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn === false){
                next();
            }else{
                next('/')
            }
        }
    },
    {
        path: '/admin',
        component: AdminMainPage,
        children:[
            {
                path: "user",
                component: BaseUserAdminPage,
                children: [
                    {
                        path: "edit/:uuid",
                        component: EditUserAdminPage,
                    },
                    {
                        path: "add",
                        component: EditUserAdminPage,
                    },
                    {
                        path: "",
                        component: VueUserAdminPage
                    }
                ]
            },
            {
                path: "env",
                component: BaseEnvAdminPage,
                children: [
                    {
                        path: "",
                        component: VueEnvAdminPage
                    }
                ]
            },
            {
                path: "article",
                component: BaseArticleAdminPage,
                children: [
                    {
                        path: "edit/:uuid",
                        component: EditArticleAdminPage,
                    },
                    {
                        path: "add",
                        component: EditArticleAdminPage,
                    },
                    {
                        path: "",
                        component: VueArticleAdminPage
                    }
                ]
            },
            {
                path: "event",
                component: BaseEventAdminPage,
                children: [
                    {
                        path: "edit/:uuid",
                        component: EditEventAdminPage,
                    },
                    {
                        path: "add",
                        component: EditEventAdminPage,
                    },
                    {
                        path: "",
                        component: VueEventAdminPage
                    }
                ]
            }
        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "admin") {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/user',
        component: UserMainPage,
        children: [],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "user") {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/article',
        component: BaseArticlePage,
        children: [
            {
                path: "",
                component: VueArticlePage
            },
            {
                path: "vue/:uuid",
                component: ReadArticlePage
            }
        ]
    },
    {
        path: '/event',
        component: BaseEventPage,
        children: [
            {
                path: "",
                component: VueEventPage
            },
            {
                path: "vue/:uuid",
                component: ReadEventPage
            }
        ]
    },
    {
        path: '/profile',
        component: BaseProfilePage,
        children: [
            {
                path: "",
                component: UserEditProfilePage
            },
            {
                path: "event",
                component: EventUserProfilePage
            },
            {
                path: "article",
                component: ArticleUserProfilePage
            }
        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                next();
            }else{
                next('/')
            }
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;