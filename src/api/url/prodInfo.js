import request from '@/utils/request';
import {asyncPost} from '@/utils/ajaxNoAsync';
const sysHead = {
    // system: {
    userId: sessionStorage.getItem("userId"),
    branch: sessionStorage.getItem("branch"),
    company: sessionStorage.getItem("company"),
    tranDate: new Date()
    // }
}
export function getDepositProdInfo (params) {
    return request({
        url: '/getProdInfo',
        method: 'get',
        params
    });
}
export function getDepositProdListTow (params) {
    return request({
        url: '/prod/towDeposit',
        method: 'get',
        params
    });
}

export function flowTest (data) {
    return request({
        url: '/add',
        method: 'post',
        data: {
            sysHead,
            data
        }
    })
}
export function flowList (param) {
    return request({
        url: '/processDiagram',
        method: 'post',
        params: {processId: param}
    })
}
export function getDepositProdList (params) {
    return request({
        url: '/prod/prodList',
        method: 'get',
        params
    });
}
export function getInitData (params) {
    return request({
        url: '/init/initRefData',
        method: 'get',
        params
    });
}
export function getDiffProd (params) {
    const data = {
        params
    }
    return request({
        url: '/prod/getDiffProd',
        method: 'post',
        data
    });
}

export function getProdData (prodType) {
    const data= {prodType: prodType};
    const reData=asyncPost('/getProdInfo',data);
    return reData;
}
export function getAll(TableName) {
    const data = {tableName: TableName};
    const reData = asyncPost('/getAll',data);
    return reData;
}
//获取某个的ATTR参数的中文描述
export function getAttrType () {
    const reData=asyncPost('/getAttrType');
    return reData;
}

export function getProdDataAsync (prodType) {
    // const data={
    //  'body': {
    //    'prodType': prodType
    //  }
    // }
    return request({
        url: '/getProdInfo',
        method: 'post',
        params: { prodType: prodType}
    });
}
export function getProdType (prodClass) {

    const data={
        "prodClass": prodClass,
        "userName": sessionStorage.getItem("userId")
    }
    return request({
        url: '/getProdListByClass',
        method: 'post',
        data
    });
}

export function getProdClassList () {
    return request({
        url: '/getProdClassList',
        method: 'post'
    });
}


export function getAllProdList () {
    return request({
        url: '/getAllProdList',
        method: 'post'
    });
}
export function getAllDefines (params) {
    return request({
        url: '/getAllDefineList',
        method: 'post',
    });
}

export function getDepositDtl (data) {
    return request({
        url: '/prod/dtlDeposit',
        method: 'get',
        data: data
    });
}
export function getProdClass (data) {
    return request({
        url: '/prod/prodClass',
        method: 'get',
        data: data
    });
}
export function tranFlowInfo (params) {

    return request({
        url: '/tranFlowInfo',
        method: 'post',
        data: params
    });
}
export function tranFlowRelease (params) {

    return request({
        url: '/publish',
        method: 'post',
        data: params
    });
}

export function checkProdInFlow (params) {

    return request({
        url: '/checkProdInFlow',
        method: 'post',
        data: params
    });
}

export function savaProdInfo (params) {

    return request({
        url: '/saveProdInfo',
        method: 'post',
        data: params
    });
}
export function getUserCollectProds (data) {
    return request({
        url: '/prod/userCollect',
        method: 'get',
        data: data
    });
}
export function getFlowList () {
    return request({
        url: '/reviewList',
        method: 'post'
    });
}

export function getAllPartList () {
    return request({
        url: '/QueryAll',
        method: 'post'
    });

}

export function getParaTableInflow () {
    return request({
        url: '/getRelationInfoOfUndeal',
        method: 'post'
    });
}

export function getDiffList (params) {
    return request({
        url: '/getProdDiff',
        method: 'post',
        data: params
    });
}

export function findByPartType (params) {
    const data= {partType: params};
    const reData=asyncPost('/findByPartType',data);
    return reData;
}

export function getPartDesc (params) {
    const data= {partType: params};
    const reData=asyncPost('/getPartDesc',data);
    return reData;
}

export function getDiffTable (params) {
    return request({
        url: '/getDiffTable',
        method: 'post',
        data: params
    });
}
export function getFlowInfoByMainSeqNo (params) {
    return request({
        url: '/getFlowInfoByMainSeqNo',
        method: 'post',
        data: params
    });
}


export function getCheckFlowList () {
    return request({
        url: '/reviewCheckList',
        method: 'post'
    });
}
export function getPkListRf (params) {
    return request({
        url: '/getPkList',
        method: 'post',
        data: params
    });
}
export function getPkListColumnRf (params) {
    return request({
        url: '/getPkListColumnRf',
        method: 'post',
        data: params
    });
}
export function saveColumn (params) {
    return request({
        url: '/saveColumn',
        method: 'post',
        data: params
    });
}
export function findChildProd (params) {
    return request({
        url: '/findChildProd',
        method: 'post',
        data: params
    })
}
export function getParamTable (params) {
    return request({
        url: '/getTableInfo',
        method: 'post',
        params: { tableName: params}
    })
}
export function getTableInfoDesc (params) {
    return request({
        url: '/getTableInfoDesc',
        method: 'post',
        params: { tableName: params}
    })
}
export function getTableColumnInfo () {
    return request({
        url: '/getTableColumnInfo',
        method: 'post',
    })
}
export function getModuleByFlowCode (params) {
    return request({
        url: '/getModuleByFlowCode',
        method: 'post',
        params: { code: params}
    });
}
export function getTableList (params) {
    return request({
        url: '/getTableList',
        method: 'post',
        params: { system: params}
    })
}
export function saveTable (params) {
    return request({
        url: '/saveTable',
        method: 'post',
        data: params
    })
}
//查询全部信息环境
export function getEnvInfo () {
    return request({
        url: '/getEnvInfo',
        method: 'post',
    });
}
export function saveParam (params) {
    return request({
        url: '/saveParam',
        method: 'post',
        data: params
    })
}
export function getMenuList (params) {
    return request({
        url: '/getMenuList',
        method: 'post',
        data: params
    })
}
export function getSysTable (params) {
    return request({
        url: '/getSysTable',
        method: 'post',
        params: { tableName: params}
    })
}

export function getSysInfoByUser (params) {
    return request({
        url: '/getSysInfoByUser',
        method: 'post',
        params: { userId: params}
    })
}

export function getSysUserInfoByUser (params) {
    return request({
        url: '/getSysUserInfoByUser',
        method: 'post',
        params: { userId: params}
    })
}

export function saveSysTable (params) {
    return request({
        url: '/saveSysTable',
        method: 'post',
        data: params
    })
}
export function saveRoleMenuTable (params) {
    return request({
        url: '/saveRoleMenuTable',
        method: 'post',
        data: params
    })
}
export function getCommonList (params) {
    return request({
        url: '/getCommonList',
        method: 'post',
        data: params
    })
}
export function cleanList (params) {
    return request({
        url: '/cleanList',
        method: 'post',
        data: params
    })
}
export function submitCommon (params) {
    return request({
        url: '/submitCommon',
        method: 'post',
        data: params
    })
}
export function deleteTask (params) {
    return request({
        url: '/deleteTask',
        method: 'post',
        data: params
    })
}
export function getTaskListBySeqNo (params) {
    return request({
        url: '/getTaskListBySeqNo',
        method: 'post',
        data: params
    })
}
export function getAttrInfo () {
    const reData=asyncPost('/getAttrInfo');
    return reData;
}


export function getAttrInfoText () {
    return request({
        url: '/getAttrInfo',
        method: 'post',
    })
}

export function upload (params) {
    return request({
        url: '/upload',
        method: 'post',
        data: params
    })
}
export function getProdCompareDiff (params) {
    return request({
        url: '/getProdCompareDiff',
        method: 'post',
        data: {prodType: params}
    })
}
export function findProdHistory (params) {
    return request({
        url: '/findProdHistory',
        method: 'post',
        params: { tranId: params}
    })
}

export function findAll () {
    return request({
        url: '/findAll',
        method: 'post',
    })
}

export function QueryAll () {
    return request({
        url: '/QueryAll',
        method: 'post',
    })
}

export function saveCollectProd (params) {

    return request({
        url: '/saveCollectProd',
        method: 'post',
        data: params
    });
}

export function getUserCollectByUserId (params) {
    return request({
        url: '/getUserCollectByUserId',
        method: 'post',
        params: { userId: params}
    })
}export function findProdHistoryChange(params) {
    return request({
        url: '/findProdHistoryChange',
        method: 'post',
        params: { mainSeqNo: params}
    })
}


export function columnInfoServ (params) {
    return request({
        url: '/columnInfo',
        method: 'post',
        data: params
    });
}

export function getProdPageDefine (params) {
    const data= {pageClass: params};
    const reData=asyncPost('/getProdPageDefine',data);
    return reData;
}

export function getEnvAll () {
    return request({
        url: '/getEnvInfo',
        method: 'post',
    });
}