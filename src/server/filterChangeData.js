/**
 * Created by jiajt on 2018/8/21.
 * @param prodData 修改后的数据（只处理mb_prod_type  mb_prod_define以及涉及单表信息）
 * @param sourceProdData 修改前数据
 * @param optionType 操作类型 optionType==="Y"?复制:非复制
 * @return backData 处理后只包含变动(U,I,D)的数据集合
 */
export function filterChangeData (prodData,sourceProdData,optionType) {
    var backData = {}
    backData = copy(sourceProdData,backData)
    backData["optionPermissions"] = ""
    // 是否复制标识
    var copyFlag = optionType
    // 产品属性 B-基础产品 S-可售产品
    let prodRange = prodData.prodType.prodRange
    let acctType = "";
    if(prodData.prodDefines.ACCT_TYPE!=undefined && prodData.prodDefines.ACCT_TYPE != null) {
        acctType = prodData.prodDefines.ACCT_TYPE.attrValue;
    }
    // 处理prodType对象数据
    prodTypeDeal(prodData,sourceProdData,backData,copyFlag)
    // 处理prodDefines对象数据
    prodDefinesDeal(prodData,sourceProdData,backData,copyFlag,prodRange)

    //处理单表数据
    //费用信息
    var backVal = []
    if(acctType != "T") {
        tablesDeal(prodData, sourceProdData, backVal, "mbProdCharge", copyFlag)
        backData.mbProdCharge = backVal
    }
    //核算信息
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"glProdAccounting",copyFlag)
    backData.glProdAccounting = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"glProdCodeMappings",copyFlag)
    backData.glProdCodeMappings = backVal
    //产品映射(0115屏蔽对产品映射处理)
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"glProdMappings",copyFlag)
    backData.glProdMappings = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"irlProdTypes",copyFlag)
    backData.irlProdTypes = backVal
    //利率信息处理
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"irlProdInt",copyFlag)
    backData.irlProdInt = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"irlBasisRateList",copyFlag)
    backData.irlBasisRateList = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"irlIntMatrices",copyFlag)
    backData.irlIntMatrices = backVal
    //处理产品变更信息
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"mbProdAmendMaping",copyFlag)
    backData.mbProdAmendMaping = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"mbProdGroup",copyFlag)
    backData.mbProdGroup = backVal
    return backData
}

/**
 * @description 单表处理主流程（包含修改,新增，删除操作）
 * @param backVal 单表数据变动的集合
 * @param tables 表名
 * @param copyFlag 复制标识
 * @param backVal 返回数据集合
 */
export function tablesDeal(prodData,sourceProdData,backVal,tables,copyFlag){
    //复制处理
    if(copyFlag == "Y" && tables != "irlBasisRateList" && tables !="irlIntMatrices") {
        for (let newIndex = 0; newIndex < prodData[tables].length; newIndex++) {
            let prodType = prodData.prodType.prodType;
            let prodDesc = prodData.prodType.prodDesc;
            let temp = {newData: {}, oldData: {}, optType: ''}
            prodData[tables][newIndex].prodType = prodType;
            if (tables === "glProdMappings") {
                prodData[tables][newIndex].mappingType = prodType;
                prodData[tables][newIndex].mappingDesc = prodDesc;
                prodData[tables][newIndex].prodDesc = prodDesc;
            }
            if (tables === "irlProdTypes") {
                prodData[tables][newIndex].prodTypeDesc = prodDesc;
            }
            temp.newData = prodData[tables][newIndex]
            temp.optType = 'I'
            backVal.push(temp)
        }
    }
    //非复制处理
    else{
        tableDealUID(prodData,sourceProdData,backVal,tables);
    }
}

/**
 * @description  产品单表非复制操作时数据处理
 *               1，以界面最新数据为外层，原始数据为内层遍历。外层存在内层不包含的数据  该条数据新增数据I
 *               2，以原始数据为外层，界面数据为内层遍历，外层存在内存不包含数据，该条数据为删除数据D
 *               3，遍历过程中采用主键匹配  主键匹配上（单条数据匹配），此时比较该条数据的所有字段是否发生变化，存在变化为更新U
 *@param prodData 界面最新数据
 * @param sourceProdData 原始数据
 * @param bakVal 引用对象 返回
 * @param tables 表名
 *
 * */
export function tableDealUID(prodData,sourceProdData,backVal,tables) {
    //正向遍历（组装修改U，新增I数据）
    for(let newIndex in prodData[tables]){
        let ret = findIn(prodData[tables][newIndex],sourceProdData[tables],tables);
        //存在,判断是否被修改
        if(ret.flag){
            let index = ret.index;
            //比对该条数据各个字段是否被修改
            let proCol = prodData[tables][newIndex];
            let souCol = sourceProdData[tables][index];
            for(let col in proCol){
                // if(proCol[col] != undefined && souCol[col] != undefined && proCol[col] != "" && souCol[col] != ""){
                if(proCol[col] != souCol[col]){
                    //数据被修改
                    //组装返回数据
                    let tempU = {newData: {}, oldData: {}, optType: ''};
                    tempU.newData = proCol;
                    tempU.oldData = souCol;
                    tempU.optType = 'U'
                    backVal.push(tempU);
                    break;
                }
                // }
            }
        }
        //不存在,即为新增
        if(!ret.flag){
            //组装返回数据
            let tempI = {newData: {}, oldData: {}, optType: ''}
            tempI.newData = prodData[tables][newIndex]
            tempI.optType = 'I'
            backVal.push(tempI);
        }
    }
    //反向遍历 （组装删除D 数据）
    for(let oldIndexB in sourceProdData[tables]){
        let ret = findIn(sourceProdData[tables][oldIndexB],prodData[tables],tables);
        //不存在，即为删除
        if(!ret.flag){
            //组装返回数据
            let tempD = {newData: {}, oldData: {}, optType: ''};
            tempD.oldData = sourceProdData[tables][oldIndexB];
            tempD.optType = "D";
            backVal.push(tempD);
        }
    }

}
/**
 * @description 判断key 是否存在于data集合中
 * @param key: 表内一条数据
 * @param data: 表内所有数据
 * @param tables: 表名
 * @return ret 返回数据集合：返回ret数据结构---【如果存在： ret: {flag: true,index: 该条数据再sourceProd中下标}     如果不存在：ret: {flag: false,index: null}】
 * */
export function findIn(col, data,tables) {
    let keySet = getKeySetByTableName(tables);
    //记录主键个数
    let keyLength = keySet.length;
    //默认返回数据集合
    let ret = {flag: false,index: null}
    //遍历全数据集合
    for(let index in data){
        if(keySet!=undefined && keySet.length){
            let flag = 0;
            for(let keyIndex in keySet){
                if(col[keySet[keyIndex].key] !=undefined && col[keySet[keyIndex].key] == data[index][keySet[keyIndex].key]){
                    flag++;
                }
            }
            //一条数据比对完 主键全部匹配
            if(flag == keyLength){
                ret.flag = true;
                ret.index = index;
                return ret;
            }

        }
    }
    return ret;
}


/**
 * @description 通过表名获取主键集合
 * @param tables：表名
 * @return keys 主键集合（对象数组）
 */
export function getKeySetByTableName(tables) {
    let tableName = tables;
    let keys ={};
    keys["mbProdGroup"] = [{key: "prodType"},{key: "prodSubType"}];
    keys["mbProdCharge"] = [{key: "prodType"},{key: "feeType"}];
    keys["glProdAccounting"] = [{key: "prodType"},{key: "accountingStatus"}];
    keys["glProdMappings"] = [{key: "mappingType"}];
    keys["irlProdTypes"] = [{key: "prodType"}];
    keys["glProdCodeMappings"] = [{key: "prodType"},{key: "status"},{key: "amtType"}];
    keys["irlProdInt"] = [{key: "prodType"},{key: "eventType"},{key: "intClass"},{key: "splitId"},{key: "ruleid"}];
    keys["irlBasisRateList"] = [{key: "intBasis"},{key: "ccy"},{key: "effectDate"}];
    keys["mbProdAmendMaping"] = [{key: "prodType"}];
    keys["irlIntMatrices"] = [{key: "matrixNo"}];
    return keys[tableName];
}

/**
 * @description 处理mbProdType对象数据
 * */
export function prodTypeDeal(prodData,sourceProdData,backData,copyFlag) {
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    if(copyFlag === "Y"){
        //基础-可售复制时候 可售产品的基础产品属性为当前可售产品
        if(prodData.prodType.prodRange == "S" && sourceProdData.prodType.prodRange == "B"){
            prodData.prodType.baseProdType = sourceProdData.prodType.prodType
        }
        newProdMap = prodData.prodType
    }else {
        for (let i in prodData.prodType) {
            newProdMap[i] = prodData.prodType[i]
            oldProdMap[i] = sourceProdData.prodType[i]
        }
    }
    prodType.newData = Object.assign(prodType.newData,newProdMap)
    prodType.oldData = Object.assign(prodType.oldData,oldProdMap)
    backData.prodType = prodType
}
/**
 * @description 处理prodDefines对象数据
 * */
export function prodDefinesDeal(prodData,sourceProdData,backData,copyFlag,prodRange,optionPermissions) {
    var prodDefines = {}
    var tempObject = {}
    var prodType = prodData.prodType.prodType
    for (let j in prodData.prodDefines) {
        let newMap = {newData: {},oldData: {},optionType: ""}
        //前端返回数据 去除新增参数标识
        if(prodData.prodDefines[j].newAttr !== undefined){
            delete prodData.prodDefines[j].newAttr
        }
        if(copyFlag === "Y" && prodData.prodDefines[j].group === "SOLD" || copyFlag === "Y" && prodRange === "B"){
            //可售产品-可售产品 || 基础产品-基础产品
            prodData.prodDefines[j].group = null
            prodDefines[j] = changeProdType(prodData,prodType,j)
        }else if(tempsDefine(prodData,copyFlag,prodRange,j)){
            //基础产品-可售产品复制
            prodData.prodDefines[j].group = null
            prodDefines[j] = changeProdType(prodData,prodType,j)
        } else if (sourceProdData.prodDefines[j] === undefined) {
            //prodDefine 增加参数
            newMap.newData = prodData.prodDefines[j]
            newMap.optionType = "I"
            prodDefines[j] = newMap
        } else if(prodData.prodDefines[j].attrValue !== sourceProdData.prodDefines[j].attrValue || prodData.prodDefines[j].optionPermissions !== sourceProdData.prodDefines[j].optionPermissions){
            //prodDefine 修改参数value || 修改参数操作属性（E:可编辑 N：不可编辑 V:不可见）
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j]
            newMap.oldData = sourceProdData.prodDefines[j]
            newMap.optionType = "U"
            prodDefines[j] = newMap
        }
        //判断编辑信息 E:可编辑 N:不可编辑 V:不可见 D:删除
        let optObject = {key: "",tableName: "",optPerm: ""}
        if(dealFalg(prodData.prodDefines[j],sourceProdData.prodDefines[j])){
            if(prodData.prodDefines[j].optionPermissions === "D"){
                //E-D N-D V-D 删除基础产品和继承于该基础产品的可售产品 的该条参数 optPerm = "DALL"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "DALL"
            }else if(sourceProdData.prodDefines[j].optionPermissions === "E" && (prodData.prodDefines[j].optionPermissions === "N" || prodData.prodDefines[j].optionPermissions === "V")){
                //E-N E-V  删除继承于该基础产品的可售产品 的该条参数 optPerm = "D"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "D"
            }
            if(prodData.prodDefines[j].optionPermissions === "E"){
                //N-E V-E 继承于该基础产品的可售产品增加该条参数 optPerm = "I"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "I"
            }
        }
        if(optObject.key !== ""){
            tempObject[j] = optObject
        }
    }
    if(backData.optionPermissions !== "") {
        backData.optionPermissions = Object.assign(backData.optionPermissions, tempObject)
    }else{
        backData.optionPermissions = tempObject
    }
    backData.prodDefines = prodDefines
}
export function tempsDefine(prodData,copyFlag,prodRange,j){
    if(copyFlag === "Y" && prodRange === "S"){
        if(prodData.prodDefines[j].optionPermissions === "E" || prodData.prodDefines[j].assembleType === "EVENT"){
            return true;
        }
    }
}
/**
 * @description 产品复制时 修改所有prodType 复制后产品prodType
 * */
export function changeProdType(prodData,prodType,j){
    let newMap = {newData: {},oldData: {},optionType: ""}
    if(prodData.prodDefines[j].assembleType == "EVENT"){
        prodData.prodDefines[j].prodType = prodType;
        let assembleIds = prodData.prodDefines[j].assembleId;
        let eventType = assembleIds.split("_")[0] + "_"+prodType;
        prodData.prodDefines[j].assembleId = eventType
    }
    newMap.newData = prodData.prodDefines[j];
    newMap.optionType = "I"
    return newMap;
}
export function dealFalg(val1,val2){
    if(val1!== undefined && val2!== undefined)
    {
        if(val1.optionPermissions !== val2.optionPermissions) {
            return true;
        }
        else{
            return false
        }
    }else{
        return false
    }
}
/**
 * @description 对象浅拷贝
 * @param  obj1 被拷贝对象
 * @param  obj2 拷贝后对象（传入为空）
 * @return obj 拷贝后对象 （返回为包含被拷贝对象数据的新对象）
 */
export function copy(obj1,obj2) {
    var obj = obj2||{};
    for(let name in obj1){
        if(typeof obj1[name] === "object" && obj1[name]!== null){
            obj[name]= (obj1[name].constructor===Array)?[]:{};
            copy(obj1[name],obj[name]);
        }else{
            obj[name]=obj1[name];
        }
    }
    return obj;
}