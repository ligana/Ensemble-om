export default {
    getSysTable: (param) => ({
        "code": "000000",
        "msg": "请求成功",
        "data": {
            "columnInfo": [{
                "tableName": "",
                "tableDesc": "",
                "system": "",
                "parameter": "",
                "modelId": "",
                "searchColumn": ""
            }, {
                "tableName": "CIF_CLIENT_TYPE",
                "tableDesc": "客户类型定义",
                "system": "ensemble",
                "parameter": "init",
                "modelId": "CIF",
                "searchColumn": ""
            }, {
                "tableName": "MB_ATTR_TYPE",
                "tableDesc": "参数定义表",
                "system": "ensemble",
                "parameter": "init",
                "modelId": "PROD",
                "searchColumn": null
            }, {
                "tableName": "MB_ATTR_VALUE",
                "tableDesc": "参数值定义表",
                "system": "ensemble",
                "parameter": "init",
                "modelId": "PROD",
                "searchColumn": null
            }]
        }

    })
}