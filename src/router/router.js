import UserMain from '@/pages/UserMain';
import {createRouter, createWebHistory} from "vue-router";
import UserPage from '@/pages/UserPage';
import UserAbout from '@/pages/UserAbout';
import PostIdPage from '@/pages/PostIdPage';
import PostPageWithStore from '@/pages/PostPageWithStore';

const routes =[
    {
        path: '/',
        component: UserMain
    },
    {
        path: '/posts',
        component: UserPage
    },
    {
        path: '/about',
        component: UserAbout
    },
    {
        path: '/posts/:id',
        component: PostIdPage

    },
    {
        path: '/store',
        component: PostPageWithStore

    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;