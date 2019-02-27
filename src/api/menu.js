const Menu = [
  { header: 'Apps',menuId: '1' },
  {
    title: '首页',
    icon: 'home',
    name: 'Dashboard',
      menuId: '10'
  },
  {
      title: '我的工作台',
      name: 'userIndexFlow',
      icon: 'assistant',
      menuId: '11'
  },
  {
    title: '产品目录',
    icon: 'widgets',
    name: 'prodCmbs',
      menuId: '12'
  },
  {
    title: '我收藏的产品',
    group: 'apps',
    name: 'MyProd',
    icon: 'favorite_border',
      menuId: '13'
  },
    {
        title: '产品展示',
        icon: 'widgets',
        name: 'prodWindow',
        menuId: '14'
    },
  { header: '网贷管理端' ,menuId: '2'},
  {
      title: '合作方信息管理',

      icon: 'account_balance',
      menuId: '20',
      items: [
          { name: 'partner', title: '合作方签约', component: 'partner/partnerMain', menuId: '201'},
          { name: 'RB200', title: '合作方解约', component: 'prod/rbPublicProd', menuId: '202'},
          { name: 'RB300', title: '合作方信息维护', component: 'prod/rbHorizontalrod', menuId: '203'},
      ]
  },
  { header: '产品工厂', menuId: '3'},
  {
    title: '存款产品',

    icon: 'account_balance',
    menuId: '30',
    items: [
      { name: 'RB101', title: '活期产品组', component: 'prod/rbPrivateProds', menuId: '301'},
      { name: 'RB200', title: '对公存款组', component: 'prod/rbPublicProd', menuId: '302'},
      { name: 'RB300', title: '同业存款组', component: 'prod/rbHorizontalProd', menuId: '303'},
    ]
  },
  {
    title: '贷款产品',

    menuId: '31',
    icon: 'filter_vintage',
    items: [
      { name: 'CL100', title: '对私贷款组', component: 'prod/clPrivateProd', menuId: '311'},
      { name: 'CL200', title: '对公贷款组', component: 'prod/clPublicProd', menuId: '312'},
      { name: 'CL300', title: '贴现组', component: 'prod/clDiscountProd', menuId: '313'},
      { name: 'CL400', title: '垫款组', component: 'prod/clAdvancesProd', menuId: '314'},
      { name: 'CL500', title: '委托贷款组', component: 'prod/clEntrustedProd', menuId: '315'},
      { name: 'CL600', title: '银团贷款组', component: 'prod/clSyndicatedProd', menuId: '316'},
      { name: 'CLBASE', title: '贷款基础产品组', component: 'prod/clBaseProd', menuId: '317'},
    ]
  },
  {
    title: '内部帐产品',

    icon: 'work',
    menuId: '32',
    items: [
      { name: 'GL100', title: '内部账组', component: 'prod/glInternalProd', menuId: '321'},
      { name: 'GL200', title: '存放同业组', component: 'prod/glToHorizontalProd', menuId: '322'},
      { name: 'GL300', title: '同业存放组', component: 'prod/glPromHorizontalProd', menuId: '323'},
      { name: 'GLBASE', title: '内部账基础产品组', component: 'prod/glBaseProd', menuId: '324'},
    ]
  },
  { header: '参数工厂', menuId: '4' },
  {
    title: '参数管理',

    icon: 'view_list',
    menuId: '40',
     items: [
      { title: '参数管理入口', component: 'paramManage',menuId: '401'},
    ]
  },
    {
        title: '交易管理入口',

        icon: 'view_list',
        menuId: '40',
        items: [
            { title: '交易管理入口', component: 'transManage',menuId: '402'},
        ]
    },
  { divider: true },
  { header: 'Extras' },
  {
    title: 'Pickers',
    group: 'prod',
    component: 'prod',
    icon: 'filter_vintage',
    items: [
      // { name: 'cardPatenProd', title: '产品流程', component: 'prod/cardPatenProd' },
      { name: 'cardPatenProd3', title: '产品流程2', component: 'prod/cardPatenProd3' },
      { name: 'deposit2', title: '产品展现2', component: 'prod/deposit2' },
      { name: 'prodCmb', title: '产品流程3', component: 'prodCmb' },
      { name: 'SerchList', title: '产品流程4', component: 'prod/SerchList' },
      { name: 'prodDiff', title: '差异对比', component: 'diff/prodDiff' },
      { name: 'diffList', title: '差异对比2', component: 'diffList' },
      { name: 'deposit', title: '产品展现', component: 'prod/deposit' },
      { name: 'publishForm', title: '参数变动记录', component: 'publishForm' },
      { name: 'RB100', title: '连通后台测试2', component: 'tableParentView' },
        { name: 'prodCmbs', title: '产品目录展示', component: 'prodCmbs' },
        { name: 'prodCompareTitle', title: '产品对比', component: 'prodCompareTitle' },

        { name: 'publishDate2', title: '参数变动记录2', component: 'publishDate2' },
    ]
  },
  {
    title: 'UI',
    group: 'extra',
    icon: 'list',
    items: [
      { name: 'Login', title: 'Login', component: 'Login' },
      { name: '404', title: '404', component: 'NotFound' },
      { name: '403', title: '403', component: 'AccessDenied' },
      { name: '500', title: '500', component: 'ServerError' },
      { name: 'basic', title: 'General', component: 'components/basic-forms' },
      { name: 'selects', title: 'Selects', badge: 'new', component: 'components/selects' },
      { name: 'selection-controls', title: 'Selection Controls', component: 'components/selection-controls' },
      { name: 'text-fields', title: 'Text Fields', component: 'components/text-fields' },
      { name: 'steppers', title: 'Steppers', component: 'components/steppers' },
      { name: 'editors', title: 'Editors', component: 'components/editors' },
      { name: 'bottom-sheets', title: 'Bottom panels', component: 'components/bottom-sheets' },
      { name: 'expansion-panels', title: 'Expansion panels', component: 'components/expansion-panels' },
      { name: 'footer', title: 'Footer', component: 'components/footer' },
      { name: 'lists', title: 'Lists', component: 'components/lists' },
      { name: 'jumbotrons', title: 'Jumbotrons', badge: 'new', component: 'components/jumbotrons' },
      { name: 'menus', title: 'Menus', component: 'components/menus' },
      // { name: 'navigation-drawers', title: 'Navigation drawers', component: 'components/navigation-drawers' },
      { name: 'tabs', title: 'Tabs', component: 'components/tabs' },
      { name: 'toolbar', title: 'Toolbars', component: 'components/toolbar' },
      { name: 'timeline', title: 'Timeline', component: 'components/timeline' },
      { name: 'timepicker', title: 'Timepicker', component: 'pickers/timepicker' },
      { name: 'datepicker', title: 'Datepicker', component: 'pickers/datepicker' },
      // { name: 'cardPatenProdList', title: 'cardPatenProdList', component: 'prod/cardPatenProdList' },
      { name: 'alerts', title: 'Alerts', component: 'components/alerts' },
      { name: 'avatars', title: 'Avatars', component: 'components/avatars' },
      { name: 'badges', title: 'Badges', component: 'components/badges' },
      { name: 'buttons', title: 'Buttons', component: 'components/buttons' },
      { name: 'cards', title: 'Cards', component: 'components/cards' },
      { name: 'carousels', title: 'Carousels', component: 'components/carousels' },
      { name: 'chips', title: 'Chips', component: 'components/chips' },
      { name: 'dialogs', title: 'Dialogs', component: 'components/dialogs' },
      { name: 'icons', title: 'Icons', component: 'components/icons' },
      { name: 'tables', title: 'Data Tables', component: 'components/tables' },
      { name: 'parallax', title: 'Parallax  image', component: 'components/parallax' },
      { name: 'snackbar', title: 'Snackbar', component: 'components/snackbar' },
      { name: 'progress', title: 'Progress', component: 'components/progress' },
      { name: 'slider', title: 'Slider', component: 'components/sliders' },
      { name: 'tooltip', title: 'Tooltip', component: 'components/tooltips' },
      { name: 'pagination', title: 'Pagination', component: 'components/paginations' },
      { name: 'typography', title: 'Typography', component: 'components/typography' },
      { name: 'color', title: 'Color', component: 'components/color' },
      { name: 'social', title: 'Social', component: 'components/social' },
      { name: 'statistic', title: 'Statistic', badge: 'new', component: 'components/statistic' },
      { name: 'chart', title: 'Chart', component: 'components/chart' },
      { name: 'list', title: 'List', component: 'components/widget-list' },
    ]
  }
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});
export function getMenu() {
  return Menu.splice(5, 10)
}
export {
  Menu
};
