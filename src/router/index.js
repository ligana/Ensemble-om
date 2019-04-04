import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import {
    getToken
} from '@/utils/auth'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router({
    base: '/',
    mode: 'hash',
    linkActiveClass: 'active',
    routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        next()
    } else {
        if (!getToken()) {
            next({
                path: '/login',
                query: {
                    redirect: '/'
                },
                meta: {
                    public: false,
                }
            })
        } else {
            next()
        }
    }

    // if (to.matched.some(record => record.meta.public)) {
    //   // this route requires auth, check if logged in
    //   // if not, redirect to login page.
    //   if (!getToken()) {
    //     next({
    //       path: '/login',
    //       query: {
    //         redirect: to.fullPath
    //       },
    //       meta: {
    //         public: false,
    //       }
    //     })
    //   } else {
    //     next()
    //   }
    // } else {
    //   next() // make sure to always call next()!
    // }
});

router.afterEach((to, from) => {
    // ...
    NProgress.done();
});

export default router;