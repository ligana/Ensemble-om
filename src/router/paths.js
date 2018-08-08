export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/NotFound.vue`
      )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Deny.vue`
      )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Error.vue`
      )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Login.vue`
      )
  },
  {
    path: '/',
    name: 'Root',
    meta: {
      public: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Login.vue`
      )
  },
  {
    path: '/dashboard',
    meta: {
      breadcrumb: true,
      title: '首页'
    },
    name: 'Dashboard',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Dashboard.vue`
      )
  },

  // {
  //   path: '/calendar',
  //   meta: { breadcrumb: true },
  //   name: 'Calendar',
  //   component: (a) => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/Calendar.vue`
  //   )
  // },
  {
    path: '/media',
    meta: {},
    name: 'Media',
    props: (route) => ({
      type: route.query.type
    }),
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/Media.vue`
      )
  },
  {
    path: '/chat',
    meta: {
      public: true,
    },
    name: 'Chat',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `@/components/chat/ChatLayout.vue`
      ),
    redirect: {
      path: '/chat/messaging'
    },
    children: [{
      path: '/chat/messaging/:uuid?',
      meta: {
        public: true,
      },
      name: 'ChatMessaging',
      props: true,
      components: {
        default: () =>
            import(
              /* webpackChunkName: "routes" */
              /* webpackMode: "lazy-once" */
              `@/components/chat/ChatMessaging.vue`
            ),
      }
    },
    {
      path: '/chat/contact/:uuid?',
      meta: {
        public: true,
      },
      name: 'ChatContact',
      components: {
        default: () =>
            import(
              /* webpackChunkName: "routes" */
              /* webpackMode: "lazy-once" */
              `@/components/chat/ChatContact.vue`
            ),

      }
    }
    ]
  },
  {
    path: '/mail',
    meta: {
      public: true,
    },
    name: 'Mail',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/components/email/Layout.vue`
      ),
    redirect: {
      path: '/mail/all'
    },
    children: [{
      path: '/mail/:mailType',
      meta: {
        public: true,
      },
      name: 'MailIndex',
      component: () =>
          import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            `@/components/email/List.vue`
          ),
    },
    {
      path: '/mail/0/:uuid',
      meta: {
        public: true,
      },
      name: 'MailDetail',
      component: () =>
          import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            `@/components/email/Reply.vue`
          ),
    }
    ]
  },
  {
    path: '/components/alert',
    meta: {
      breadcrumb: true
    },
    name: 'components/alerts',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Alert.vue`
      )
  },
  {
    path: '/components/avatar',
    meta: {
      breadcrumb: true
    },
    name: 'components/avatars',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Avatar.vue`
      )
  },
  {
    path: '/components/badge',
    meta: {
      breadcrumb: true
    },
    name: 'components/badges',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Badge.vue`
      )
  },
  {
    path: '/components/button',
    meta: {
      breadcrumb: true
    },
    name: 'components/buttons',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Button.vue`
      )
  },
  {
    path: '/components/parallax',
    meta: {
      breadcrumb: true
    },
    name: 'components/parallax',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Parallax.vue`
      )
  },
  {
    path: '/components/snackbar',
    meta: {
      breadcrumb: true
    },
    name: 'components/snackbar',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Snackbar.vue`
      )
  },
  {
    path: '/components/chip',
    meta: {
      breadcrumb: true
    },
    name: 'components/chips',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Chip.vue`
      )
  },
  {
    path: '/components/card',
    meta: {
      breadcrumb: true
    },
    name: 'components/cards',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Cards.vue`
      )
  },
  {
    path: '/components/table',
    meta: {
      breadcrumb: true
    },
    name: 'components/tables',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Tables.vue`
      )
  },
  {
    path: '/components/carousel',
    meta: {
      breadcrumb: true
    },
    name: 'components/carousels',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Carousels.vue`
      )
  },
  {
    path: '/components/dialog',
    meta: {
      breadcrumb: true
    },
    name: 'components/dialogs',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Dialogs.vue`
      )
  },
  {
    path: '/components/icon',
    meta: {
      breadcrumb: true
    },
    name: 'components/icons',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Icon.vue`
      )
  },
  {
    path: '/components/progress',
    meta: {
      breadcrumb: true
    },
    name: 'components/progress',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Progress.vue`
      )
  },
  {
    path: '/components/slider',
    meta: {
      breadcrumb: true
    },
    name: 'components/sliders',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Slider.vue`
      )
  },
  {
    path: '/components/tooltip',
    meta: {
      breadcrumb: true
    },
    name: 'components/tooltips',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Tooltip.vue`
      )
  },
  {
    path: '/components/pagination',
    meta: {
      breadcrumb: true
    },
    name: 'components/paginations',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Pagination.vue`
      )
  },
  {
    path: '/pickers/datepicker',
    meta: {
      breadcrumb: true
    },
    name: 'pickers/datepicker',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Datepicker.vue`
      )
  },
  {
    path: '/components/typography',
    meta: {
      breadcrumb: true
    },
    name: 'components/typography',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Typography.vue`
      )
  },
  {
    path: '/components/color',
    meta: {
      breadcrumb: true
    },
    name: 'components/color',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Colors.vue`
      )
  },
  {
    path: '/pickers/timepicker',
    meta: {
      breadcrumb: true
    },
    name: 'pickers/timepicker',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/ui/Timepicker.vue`
      )
  },
  {
    path: '/layout/bottomsheets',
    meta: {
      breadcrumb: true
    },
    name: 'components/bottom-sheets',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/BottomSheets.vue`
      )
  },
  {
    path: '/layout/expansion-panel',
    meta: {
      breadcrumb: true
    },
    name: 'components/expansion-panels',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/ExpansionPanels.vue`
      )
  },
  {
    path: '/layout/footer',
    meta: {
      breadcrumb: true
    },
    name: 'components/footer',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Footers.vue`
      )
  },
  {
    path: '/layout/timeline',
    meta: {
      breadcrumb: true
    },
    name: 'components/timeline',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Timeline.vue`
      )
  },
  {
    path: '/layout/list',
    meta: {
      breadcrumb: true
    },
    name: 'components/lists',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Lists.vue`
      )
  },
  {
    path: '/layout/toolbar',
    meta: {
      breadcrumb: true
    },
    name: 'components/toolbar',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Toolbar.vue`
      )
  },
  {
    path: '/layout/jumbotron',
    meta: {
      breadcrumb: true
    },
    name: 'components/jumbotrons',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Jumbotrons.vue`
      )
  },
  {
    path: '/layout/menu',
    meta: {
      breadcrumb: true
    },
    name: 'components/menus',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Menus.vue`
      )
  },
  {
    path: '/layout/navigation-drawer',
    meta: {
      breadcrumb: true
    },
    name: 'components/navigation-drawers',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/NavigationDrawers.vue`
      )
  },
  {
    path: '/layout/tabs',
    meta: {
      breadcrumb: true
    },
    name: 'components/tabs',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/layout/Tabs.vue`
      )
  },
  {
    path: '/forms/basic',
    meta: {
      breadcrumb: true
    },
    name: 'components/basic-forms',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/BasicForms.vue`
      )
  },
  {
    path: '/forms/selects',
    meta: {
      breadcrumb: true
    },
    name: 'components/selects',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/Selects.vue`
      )
  },
  {
    path: '/forms/editor',
    meta: {
      breadcrumb: true
    },
    name: 'components/editors',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/Editors.vue`
      )
  },
  {
    path: '/forms/selection-controls',
    meta: {
      breadcrumb: true
    },
    name: 'components/selection-controls',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/SelectionControls.vue`
      )
  },
  {
    path: '/forms/text-fields',
    meta: {
      breadcrumb: true
    },
    name: 'components/text-fields',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/TextFields.vue`
      )
  },
  {
    path: '/forms/steppers',
    meta: {
      breadcrumb: true
    },
    name: 'components/steppers',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/form/Steppers.vue`
      )
  },
  {
    path: '/widgets/social',
    meta: {
      breadcrumb: true
    },
    name: 'components/social',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/widgets/Social.vue`
      )
  },
  {
    path: '/widgets/post',
    meta: {
      breadcrumb: true
    },
    name: 'components/widget-post',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/widgets/Post.vue`
      )
  },
  {
    path: '/widgets/statistic',
    meta: {
      breadcrumb: true
    },
    name: 'components/statistic',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/widgets/Statistic.vue`
      )
  },
  {
    path: '/widgets/chart',
    meta: {
      breadcrumb: true
    },
    name: 'components/chart',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/widgets/Chart.vue`
      )
  },
  {
    path: '/widgets/list',
    meta: {
      breadcrumb: true
    },
    name: 'components/widget-list',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/pages/widgets/List.vue`
      )
  },
  {
    path: '/prod/SerchList',
    meta: {
      breadcrumb: true,
      title: '产品流程4'
    },
    name: 'prod/SerchList',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodFlow/searchFlow/SearchList.vue`
      )
  },
  {
    path: '/prod/myWork',
    meta: {
      breadcrumb: true,
      title: '我的工作台'
    },
    name: 'MyWork',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodFlow/cardFlow/cardPatenProd.vue`
      )
  },
  {
    path: '/prod/myfavorite',
    meta: {
      breadcrumb: true,
      title: '我收藏的产品'
    },
    name: 'MyProd',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodFlow/cardFlow/cardPatenProd3.vue`
      )
  },
  {
    path: '/prod/cardPatenProd3',
    meta: {
      breadcrumb: true,
      title: '产品流程2'
    },
    name: 'prod/cardPatenProd3',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodFlow/cardFlow/cardPatenProd3.vue`
      )
  },
  {
    path: '/prod/deposit2',
    meta: {
      breadcrumb: true,
      title: '产品展现2'
    },
    name: 'prod/deposit2',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/deposit2.vue`
      )
  },
  {
    path: '/prod/rbPrivateProd',
    meta: {
      breadcrumb: true,
      title: '个人存款组'
    },
    name: 'prod/rbPrivateProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/rbPrivateProd.vue`
      )
  },
  {
    path: '/prod/rbPublicProd',
    meta: {
      breadcrumb: true,
      title: '对公存款组'
    },
    name: 'prod/rbPublicProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/rbPublicProd.vue`
      )
  },
  {
    path: '/prod/rbHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '同业存款组'
    },
    name: 'prod/rbHorizontalProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/rbHorizontalProd.vue`
      )
  },
  {
    path: '/prod/rbBaseProd',
    meta: {
      breadcrumb: true,
      title: '存款基础产品组'
    },
    name: 'prod/rbBaseProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/rbBaseProd.vue`
      )
  },
  {
    path: '/prod/clPrivateProd',
    meta: {
      breadcrumb: true,
      title: '对私贷款组'
    },
    name: 'prod/clPrivateProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clPrivateProd.vue`
      )
  },
  {
    path: '/prod/clPublicProd',
    meta: {
      breadcrumb: true,
      title: '对公贷款组'
    },
    name: 'prod/clPublicProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clPublicProd.vue`
      )
  },
  {
    path: '/prod/clDiscountProd',
    meta: {
      breadcrumb: true,
      title: '贴现组'
    },
    name: 'prod/clDiscountProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clDiscountProd.vue`
      )
  },
  {
    path: '/prod/clAdvancesProd',
    meta: {
      breadcrumb: true,
      title: '垫款组'
    },
    name: 'prod/clAdvancesProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clAdvancesProd.vue`
      )
  },
  {
    path: '/prod/clEntrustedProd',
    meta: {
      breadcrumb: true,
      title: '委托贷款组'
    },
    name: 'prod/clEntrustedProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clEntrustedProd.vue`
      )
  },
  {
    path: '/prod/clSyndicatedProd',
    meta: {
      breadcrumb: true,
      title: '银团贷款组'
    },
    name: 'prod/clSyndicatedProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clSyndicatedProd.vue`
      )
  },
  {
    path: '/prod/clBaseProd',
    meta: {
      breadcrumb: true,
      title: '贷款基础产品组'
    },
    name: 'prod/clBaseProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/clBaseProd.vue`
      )
  },
  {
    path: '/prod/glInternalProd',
    meta: {
      breadcrumb: true,
      title: '内部账组'
    },
    name: 'prod/glInternalProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/glInternalProd.vue`
      )
  },
  {
    path: '/prod/glToHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '存放同业组'
    },
    name: 'prod/glToHorizontalProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/glToHorizontalProd.vue`
      )
  },
  {
    path: '/prod/glPromHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '同业存放组'
    },
    name: 'prod/glPromHorizontalProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/glPromHorizontalProd.vue`
      )
  },
  {
    path: '/prod/glBaseProd',
    meta: {
      breadcrumb: true,
      title: '内部账基础产品组'
    },
    name: 'prod/glBaseProd',
    component: () =>
      import(
        `@/views/prodFactory/prodInfo/tags/glBaseProd.vue`
      )
  },
  {
    path: '/diff/prodDiff',
    meta: {
      breadcrumb: true,
      title: '差异对比'
    },
    name: 'diff/prodDiff',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodDiff/prodDiff.vue`
      )
  },
  {
    path: '/diff/prodDiff',
    meta: {
      breadcrumb: true,
      title: '差异对比2'
    },
    name: 'diffList',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodDiff/diffList/diffList.vue`
      )
  },
  {
    path: '/cmbchina/prodCmb',
    meta: {
      breadcrumb: true,
      title: '产品目录'
    },
    name: 'prodCmb',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodFlow/tableFlow/prodCmb.vue`
      )
  },

  {
    path: '/prod/deposit',
    meta: {
      breadcrumb: true,
      title: '产品信息'
    },
    name: 'prod/deposit',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/prodFactory/prodInfo/tags/deposit.vue`
      )
  },
  {
    path: '/userWork/userWorkTags',
    meta: {
      breadcrumb: true,
      title: '我的工作台'
    },
    name: 'userWorkTags',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/userFlow/userWork/userWorkTags.vue`
      )
  },
  {
    path: '/userWork/userWorkNavigation',
    meta: {
      breadcrumb: true,
      title: '我的工作台2'
    },
    name: 'userWorkNavigation',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/userFlow/userWork/userWorkNavigation.vue`
      )
  },
  {
    path: '/userWork/indexFlow',
    meta: {
      breadcrumb: true,
      title: '我的工作台首页'
    },
    name: 'userIndexFlow',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/userFlow/indexFlow/indexFlow2.vue`
      )
  },
{
    path: '/userFlow/tranDataIndex',
        meta: {
    breadcrumb: true,
        title: '交易详细信息'
},
    name: 'tranDataIndex',
        component: () =>
import(
    /* webpackChunkName: "routes" */
    /* webpackMode: "lazy-once" */
    `@/views/userFlow/transactionInfo/tranDataIndex.vue`
)
},
];
