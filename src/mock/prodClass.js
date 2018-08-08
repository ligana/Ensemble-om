import Mock from 'mockjs'


const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

export default {
    getProdClass: () => ({
        prodClassForm: [{
            value: 'CL100',
            label: '对私贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CL200',
            label: '对公贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CL300',
            label: '贴现组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CL400',
            label: '垫款组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CL500',
            label: '委托贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CL600',
            label: '银团贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'CLBASE',
            label: '贷款基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'CL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'GL100',
            label: '内部账组',
            prodClassLevel: '2',
            parentProdClass: 'GL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'GL200',
            label: '存放同业组',
            prodClassLevel: '2',
            parentProdClass: 'GL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'GL300',
            label: '同业存放组',
            prodClassLevel: '2',
            parentProdClass: 'GL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'GLBASE',
            label: '内部账基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'GL',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'RB100',
            label: '个人存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'RB200',
            label: '对公存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'RB300',
            label: '同业存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }, {
            value: 'RBBASE',
            label: '存款基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'RB',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }]
    })
}
