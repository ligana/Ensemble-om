/**
 * Created by jiajt on 2018/11/15.
 *@description 单表流程处理  获取单表变动数据（add edit delete）
 *@param columns 表 列信息
 * @param dataInfo 修改后最新数据
 * @param sourceDataInfo 修改前数据
 */

export function filterTableChangeData (columns,dataInfo,sourceDataInfo) {

    //比较目标数据
    var newData = sourceDataInfo
    //源数据
    var oldData = dataInfo
    var delFlag = "1"

    var backValue = []
    var keySet ={}
    //获取表key
    for(let k=0; k<columns.length; k++){
        if(columns[k].key === "true"){
            keySet[columns[k].dataIndex] = columns[k].dataIndex
        }
    }
    let arr = Object.keys(keySet)
    var paraOpt = "0"
    var sameFlag = 0

    //找出删除和修改的数据
    for(let i=0; i<newData.length; i++){
        paraOpt = "0"
        sameFlag = 0
        for(let j=0; j<oldData.length; j++){
            let keySem = 0  //0-主键相同匹配到数据  1-存在不相同主键匹配失败
            for(let l in keySet){
                if(newData[i][l] === oldData[j][l]){
                    //主键相同
                    keySem = keySem +1
                    paraOpt = "1"
                }
            }
            sameFlag = keySem
            if(keySem === arr.length) {
                tableDeal(i, j, newData, oldData, backValue, delFlag)
                break
            }
        }
        //数据组装
        if(delFlag === "1" && sameFlag != arr.length){
            let temp = {}
            temp["newData"] = {}
            temp["oldData"] = newData[i]
            temp["optType"] = "D"
            backValue[backValue.length] = temp
        }
    }

    //找出增加的数据
    newData = dataInfo
    oldData = sourceDataInfo
    delFlag = "0"
    for(let m=0; m<newData.length; m++){
        paraOpt = "0"
        sameFlag = 0
        for(let n=0; n<oldData.length; n++){
            let keySem = 0  //0-主键相同匹配到数据  1-存在不相同主键匹配失败
            for(let l in keySet){
                if(newData[m][l] === oldData[n][l]){
                    //主键相同
                    keySem = keySem +1
                    paraOpt = "1"
                }
            }
            sameFlag = keySem
            if(keySem === arr.length) {
                break
            }
        }
        //数据组装
        if(delFlag === "0" && sameFlag != arr.length){
            let temp = {}
            temp["newData"] = newData[m]
            temp["oldData"] = {}
            temp["optType"] = "I"
            backValue[backValue.length] = temp

        }
    }

    return backValue
}

export function tableDeal(i,j,newData,oldData,backValue,delFlag) {
    //主键全部匹配 修改
    //判断该条数据 各个字段是否修改
    for (let m in newData[i]) {
        if (newData[i][m] !== oldData[j][m]) {
            let temp = {}
            temp["newData"] = oldData[j]
            temp["oldData"] = newData[i]
            temp["optType"] = "U"
            backValue[backValue.length] = temp
            break
        }
    }
}