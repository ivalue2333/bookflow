import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// sign
import sign_in from '@/components/sign/sign_in'
import sign_up from '@/components/sign/sign_up'

import bookflow_index from '@/components/bookflow/index'
import hot_web_index from '@/components/hot_web/index'
import hot_web_about from '@/components/hot_web/about'
import to_do_index from '@/components/todo/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },


    // sign
    {
      path: '/sign-in',
      name: 'sign_in',
      component: sign_in
    },
    {
      path: '/sign-up',
      name: 'sign_up',
      component: sign_up
    },

    // bookflow
    {
      path: '/bookflow',
      name: 'bookflow',
      component: bookflow_index
    },

    // hot-web
    {
      path: '/hot-web',
      name: '/hot_web',
      component: hot_web_index
    },
    {
      path: '/hot-web/about',
      name: '/hot_web_about',
      component: hot_web_about
    },

    {
      path: '/todos',
      name: '/todos',
      component: to_do_index
    },
  ]
})
