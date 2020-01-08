import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('./views/home/Home.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home/toptabbar',
          name: 'toptabbar',
          component: () =>
            import('./views/home/children/toptabbar/toptabbar.vue'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/position',
              name: 'position',
              component: () =>
              import('./views/home/children/toptabbar/children/positionlist.vue'),
              meta: {
                requiresAuth: true
              },
            },
            {
              path: '/positionmap',
              name: 'positionmap',
              component: () => import('./views/home/children/toptabbar/children/positionmap.vue'),
              meta: {
                requiresAuth: true
              },
            },
            {
              path: '/',
              redirect: '/position',
              meta: {
                requiresAuth: true,
                // keepAlive: true
              }
            }
          ]
        },
        {
          path: '/my',
          name: 'my',
          component: () =>
            import('./views/home/children/my.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/',
          redirect: '/home/toptabbar'
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('./views/login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/addposition',
      name: 'addposition',
      component: () =>
        import('./views/addposition.vue'),
      meta: {
        requiresAuth: true,
        // keepAlive: true
      }
    },
    {
      path:'/addMerchant',
      name:'addMerchant',
      component: () =>
        import('./views/add-merchant/add-merchant.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shareAccount',
      name: 'shareAccount',
      component: () =>
          import('./views/share/share-account.vue'),
    },
    {
      path: '/generateImg',
      name: 'generateImg',
      component: () =>
          import('./views/share/children/generate-img.vue'),
    },
    {
      path: '/shareMerchart',
      name: 'shareMerchart',
      component: () =>
          import('./views/share/share-merchart.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
          import('./views/share/register.vue'),
    },
    {
      path: '/selectposition',
      name: 'selectposition',
      component: () =>
        import('./views/selectposition.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/details',
      name: 'details',
      component: () =>
        import('./views/details.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myInput',
      name: 'myInput',
      component: () => import('./views/myInput.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myenteing',
      name: 'myenteing',
      component: () => import('./views/myenteing.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/kongbai',
      name:'kongbai',
      component:()=>import('./views/kongbai.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/home'
    },

  ]
})
