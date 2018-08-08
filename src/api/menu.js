const Menu =  [
  { header: 'Apps' },
  {
    title: '首页',
    group: 'apps',
    icon: 'home',
    name: 'Dashboard',
  },
  {
    title: '产品目录',
    group: 'apps',
    icon: 'widgets',
    name: 'prodCmb',
  },
  {
    title: '我的工作台',
    group: 'apps',
    name: 'userIndexFlow',
    icon: 'assistant'
  },
  {
    title: '我收藏的产品',
    group: 'apps',
    name: 'MyProd',
    icon: 'favorite_border'
  },
  { header: '产品工厂' },
  {
    title: '存款产品',
    group: 'components',
    component: 'components',
    icon: 'account_balance',
    items: [
        { name: 'RB100', title: '个人存款组', component: 'prod/rbPrivateProd'},
        { name: 'RB200', title: '对公存款组', component: 'prod/rbPublicProd' },
        { name: 'RB300', title: '同业存款组', component: 'prod/rbHorizontalProd' },
        { name: 'RBBASE', title: '存款基础产品组', component: 'prod/rbBaseProd' },
    ]
  },
  {
    title: '贷款产品',
    group: 'components',
    component: 'components',
    icon: 'filter_vintage',
    items: [
        { name: 'CL100', title: '对私贷款组', component: 'prod/clPrivateProd' },
        { name: 'CL200', title: '对公贷款组', component: 'prod/clPublicProd' },
        { name: 'CL300', title: '贴现组', component: 'prod/clDiscountProd' },
        { name: 'CL400', title: '垫款组', component: 'prod/clAdvancesProd' },
        { name: 'CL500', title: '委托贷款组', component: 'prod/clEntrustedProd' },
        { name: 'CL600', title: '银团贷款组', component: 'prod/clSyndicatedProd' },
        { name: 'CLBASE', title: '贷款基础产品组', component: 'prod/clBaseProd' },
    ]
  },
  {
    title: '内部帐产品',
    group: 'components',
    component: 'components',
    icon: 'work',
    items: [
        { name: 'GL100', title: '内部账组', component: 'prod/glInternalProd' },
        { name: 'GL200', title: '存放同业组', component: 'prod/glToHorizontalProd' },
        { name: 'GL300', title: '同业存放组', component: 'prod/glPromHorizontalProd' },
        { name: 'GLBASE', title: '内部账基础产品组', component: 'prod/glBaseProd' },
    ]
  },
  { header: '参数工厂' },
  {
    title: '参数管理',
    group: 'components',
    component: 'components',
    icon: 'view_list',
    items: [
      { name: '404', title: '参数管理入口', component: 'NotFound' },

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
      { name: 'cardPatenProd', title: '产品流程', component: 'prod/cardPatenProd' },
      { name: 'cardPatenProd3', title: '产品流程2', component: 'prod/cardPatenProd3' },
      { name: 'deposit2', title: '产品展现2', component: 'prod/deposit2' },
      { name: 'prodCmb', title: '产品流程3', component: 'prodCmb' },
      { name: 'SerchList', title: '产品流程4', component: 'prod/SerchList' },
      { name: 'prodDiff', title: '差异对比', component: 'diff/prodDiff' },
      { name: 'diffList', title: '差异对比2', component: 'diffList' },
      { name: 'deposit', title: '产品展现', component: 'prod/deposit' },
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
      { name: 'cardPatenProdList', title: 'cardPatenProdList', component: 'prod/cardPatenProdList' },
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

export function getMenu(){
  return  Menu.splice(5,10)
}
export {
    Menu
} ;
