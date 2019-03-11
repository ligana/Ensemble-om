export default {
    getAttrInfo: (param) => ({
        "code": "000000",
        "msg": "请求成功",
        "data": {
            "BILL_PERIOD": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "账单周期"
            },
            "HANG_TERM": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PERIOD_FREQ",
                    "columnDesc": "PERIOD_FREQ_DESC",
                    "tableName": "FM_PERIOD_FREQ"
                },
                "attrType": "STRING",
                "columnDesc": "挂账期限"
            },
            "NON_GENL_STATUS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "非正常停止发放"
            },
            "CLOSE_ACCT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "签约后是否允许销户"
            },
            "SHOW_ON_STMT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "对账单标志"
            },
            "TAXABLE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "收税标志"
            },
            "OD_ON_INTEREST": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "过期利息是否罚息"
            },
            "TERM_DEFINE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "期限自定义"
            },
            "FIN_DEP_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "理财产品存入交易类型"
            },
            "ODP_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "罚息利率"
            },
            "SERV_CHARGE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "服务费标志"
            },
            "PRICE_DAY": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "计价日"
            },
            "PROD_END_DATE": {
                "columnType": "date",
                "valueMethod": "FD",
                "attrType": "DATE",
                "columnDesc": "失效日期"
            },
            "CD_CARD_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡类型"
            },
            "DOWN_CR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "下拨贷记交易类型"
            },
            "FIXED_CALL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "协议存款",
                    "key": "A"
                }, {
                    "value": "定期一本通",
                    "key": "B"
                }, {
                    "value": "通知存款",
                    "key": "C"
                }, {
                    "value": "定活两便",
                    "key": "D"
                }, {
                    "value": "教育储蓄",
                    "key": "E"
                }, {
                    "value": "整存整取",
                    "key": "F"
                }, {
                    "value": "同业存单",
                    "key": "I"
                }, {
                    "value": "零存整取",
                    "key": "L"
                }, {
                    "value": "大额存单",
                    "key": "M"
                }, {
                    "value": "存本取息",
                    "key": "Q"
                }, {
                    "value": "结构性存款",
                    "key": "S"
                }, {
                    "value": "暂记户",
                    "key": "T"
                }],
                "attrType": "STRING",
                "columnDesc": "账户子类型"
            },
            "UP_PLAN": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "留底归集",
                    "key": "D01"
                }, {
                    "value": "零余额归集",
                    "key": "D02"
                }, {
                    "value": "固定值归集",
                    "key": "D03"
                }, {
                    "value": "留底比例归集",
                    "key": "D04"
                }],
                "attrType": "STRING",
                "columnDesc": "归集策略"
            },
            "PRE_PAID_TERM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "提前回收周期"
            },
            "ALLOW_PROD": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROD_TYPE",
                    "columnDesc": "PROD_DESC",
                    "tableName": "MB_PROD_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "允许透支的存款产品"
            },
            "SEC_AMT_CALC": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "第二层账户金额计算方式"
            },
            "KEEP_MAX_BAL": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "留存最大余额"
            },
            "CHECK_ACCT_STATUS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户状态检查"
            },
            "CHECK_FUND_TRAN": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "资金转移方式检查"
            },
            "MM_AUTO_DEALS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动生成对手交易"
            },
            "CHECK_ACCT_NATURE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户属性检查"
            },
            "REG_LIMIT_AMT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "登记限额标志"
            },
            "CASH_DRA_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不允许",
                    "key": "N"
                }, {
                    "value": "允许",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "现金通兑标识"
            },
            "CHANNEL_CTRL_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "渠道控制标识"
            },
            "CHECK_PROD_BRANCH": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否机构检查"
            },
            "TD_ADDTL_PRINCIPAL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "允许本金增加标志"
            },
            "REPAY_SEQ_TYPE_NP": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "大本大息",
                    "key": "B"
                }, {
                    "value": "小本小息",
                    "key": "S"
                }],
                "attrType": "STRING",
                "columnDesc": "非应计贷款还款顺序"
            },
            "CALC_TIMES": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "计算期次"
            },
            "CHECK_FUND_IND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "检查金额标志"
            },
            "TRANSFER_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否可转让标志"
            },
            "SELF_SUPPORT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自营标志"
            },
            "OD_FACILITY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户透支标志"
            },
            "REVOLVE_YN": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否循环"
            },
            "CHECK_ACCT_CLASS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户类别检查"
            },
            "CYCLE_FREQ": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PERIOD_FREQ",
                    "columnDesc": "PERIOD_FREQ_DESC",
                    "tableName": "FM_PERIOD_FREQ"
                },
                "attrType": "STRING",
                "columnDesc": "结息周期"
            },
            "ODODP_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "罚息的复利利率"
            },
            "ET_SETTLE_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "发放回收都不自动",
                    "key": "01"
                }, {
                    "value": "发放自动",
                    "key": "02"
                }, {
                    "value": "回收自动",
                    "key": "03"
                }, {
                    "value": "发放回收都自动",
                    "key": "04"
                }],
                "attrType": "STRING",
                "columnDesc": "委托贷款结算标志"
            },
            "REC_AMT_CTL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "足额扣除",
                    "key": "A"
                }, {
                    "value": "有多少扣多少",
                    "key": "P"
                }],
                "attrType": "STRING",
                "columnDesc": "还款金额控制"
            },
            "REPAY_DAY": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "还款日（回收日）"
            },
            "ALLOW_SECUR": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否资产证券化"
            },
            "CD_FUNCTION": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "是",
                    "key": "0"
                }, {
                    "value": "否",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "功能定义"
            },
            "DEP_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全行通存",
                    "key": "ALL"
                }, {
                    "value": "分行通存",
                    "key": "FH"
                }, {
                    "value": "不允许通存",
                    "key": "N"
                }, {
                    "value": "支行通存",
                    "key": "ZH"
                }],
                "attrType": "STRING",
                "columnDesc": "通存范围"
            },
            "UP_DAY": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "归集日"
            },
            "SUB_ACCT_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [],
                "attrType": "STRING",
                "columnDesc": "主子账户开立标识"
            },
            "ALL_DEP_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": null,
                "columnDesc": "是否通存"
            },
            "REC_AUTO_RESTRAINT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "收回时是否自动解冻保证金"
            },
            "REPAY_SEQ_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "大本大息",
                    "key": "D"
                }, {
                    "value": "小本小息",
                    "key": "S"
                }],
                "attrType": "STRING",
                "columnDesc": "应计贷款还款顺序"
            },
            "LG_LOAN_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROD_TYPE",
                    "columnDesc": "PROD_DESC",
                    "tableName": "MB_PROD_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "垫款产品"
            },
            "PRE_WITHDRAW_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "提前支取次数"
            },
            "GRACE_CHARGE_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "到期本金在宽限期内是否计收利息"
            },
            "MM_POSITION_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否处理头寸"
            },
            "AUTO_REC_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动回收"
            },
            "CD_MADE_STANDARD": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "非记名",
                    "key": "0"
                }, {
                    "value": "记名",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "制卡标准"
            },
            "SIGN_PROD_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROD_TYPE",
                    "columnDesc": "PROD_DESC",
                    "tableName": "MB_PROD_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "可签约产品列表"
            },
            "MULTI_BAL_TYPE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否多余额"
            },
            "CASH_POOL_ATTR": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "虚体",
                    "key": "0"
                }, {
                    "value": "实体",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "现金池属性"
            },
            "ALLOC_CODE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "ALLOC_CODE",
                    "columnDesc": "ALLOC_DESC",
                    "tableName": "MB_ALLOC_DEFINE"
                },
                "attrType": "STRING",
                "columnDesc": "扣款顺序编号"
            },
            "LC_TRAN_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全部转回",
                    "key": "A"
                }, {
                    "value": "部分转回",
                    "key": "B"
                }],
                "attrType": "STRING",
                "columnDesc": "转回方式"
            },
            "FORCE_GRACE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "宽限期遇节假日是否顺延"
            },
            "EOD_DRW": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否日终放款"
            },
            "CD_BIN_VALID_TIME": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡BIN有效期"
            },
            "STAGE_CHANNEL_AMT_UPDATE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "期次渠道配额更新"
            },
            "NEXT_CYCLE_DATE": {
                "columnType": "date",
                "valueMethod": "FD",
                "attrType": "DATE",
                "columnDesc": "下一处理日期"
            },
            "CD_SELF_SEL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自选卡号标志"
            },
            "UP_CR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "归集贷记交易类型"
            },
            "ODODI_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "复利的复利利率"
            },
            "ET_USE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否开通委贷模式"
            },
            "LG_USE_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "出口类保函",
                    "key": "01"
                }, {
                    "value": "进口类保函",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "保函的使用范围"
            },
            "DOWN_DATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "下拨日"
            },
            "INT_MAX_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "最大起存金额"
            },
            "PB_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否带折标记"
            },
            "RESTORE_INTEREST": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "恢复停息利息"
            },
            "AUTO_RENEW_ROLLOVER": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不自动转存",
                    "key": "N"
                }, {
                    "value": "本息自动转存",
                    "key": "O"
                }, {
                    "value": "本金自动转存",
                    "key": "W"
                }],
                "attrType": "STRING",
                "columnDesc": "自动转存"
            },
            "SUBJECT": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "SUBJECT_CODE",
                    "columnDesc": "SUBJECT_DESC",
                    "tableName": "AC_SUBJECT"
                },
                "attrType": "STRING ",
                "columnDesc": "科目信息"
            },
            "PRE_INT_PAY_DAYS": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "前付息天数"
            },
            "OWNERSHIP_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "多客户联名",
                    "key": "AS"
                }, {
                    "value": "独立账户",
                    "key": "SG"
                }, {
                    "value": "继承账户",
                    "key": "SU"
                }],
                "attrType": "STRING",
                "columnDesc": "账户关系类型"
            },
            "ACCT_BAL_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不记录余额",
                    "key": "00"
                }, {
                    "value": "子账户记录余额",
                    "key": "01"
                }, {
                    "value": "主账户记录余额",
                    "key": "10"
                }, {
                    "value": "主子都记录余额",
                    "key": "11"
                }],
                "attrType": "STRING",
                "columnDesc": "金额标志"
            },
            "CHECK_FTA_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否校验自贸区"
            },
            "INT_DAY": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "结息日"
            },
            "SE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "售汇标志"
            },
            "STATUS_TRAN_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "状态转移控制标志"
            },
            "ROLLOVER_IND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许转存"
            },
            "SETTLE_VERIFY_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "结算是否自动复核"
            },
            "CR_DR_MAINT_IND": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "贷方",
                    "key": "C"
                }, {
                    "value": "借方",
                    "key": "D"
                }],
                "attrType": "STRING",
                "columnDesc": "借贷标志"
            },
            "ODP_CALC_BY_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "罚息是否随执行利率浮动"
            },
            "SHRINK_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许缩期"
            },
            "GRACE_OVER_MONTH": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许跨月"
            },
            "NEW_ADD_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否新开立账户标志"
            },
            "SG_DEP_MIN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "单次存入最小金额"
            },
            "CLIENT_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "CLIENT_TYPE",
                    "columnDesc": "CLIENT_TYPE_DESC",
                    "tableName": "CIF_CLIENT_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "客户类型"
            },
            "DOC_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "DOC_TYPE",
                    "columnDesc": "DOC_TYPE_DESC",
                    "tableName": "TB_VOUCHER_DEF"
                },
                "attrType": "STRING",
                "columnDesc": "凭证类型"
            },
            "INT_APPL_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "立即生效",
                    "key": "A"
                }, {
                    "value": "固定利率",
                    "key": "N"
                }, {
                    "value": "利率变动周期生效",
                    "key": "R"
                }, {
                    "value": "结息日生效",
                    "key": "S"
                }],
                "attrType": "STRING",
                "columnDesc": "利率启用方式"
            },
            "SG_MIN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "单次最小金额"
            },
            "MIN_DEP_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "存入最小次数"
            },
            "USE_GEAR_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "提前支取是否靠档计息"
            },
            "CHECK_PROD_STAGE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "期次金额检查"
            },
            "INTER_PRICE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否开通内部计价"
            },
            "UP_DATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "归集日"
            },
            "INTER_PRICE_MODE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "借贷方扎差计息",
                    "key": "01"
                }, {
                    "value": "借贷方分别计息",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "内部计价模式"
            },
            "ACCT_LIMIT_CHECK": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户额度检查"
            },
            "ODI_SPREAD_PERCENT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "复利随执行利率浮动值"
            },
            "CHECK_SG_ISS_AMT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "单次发放金额控制标志"
            },
            "OTH_PROD_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROD_TYPE",
                    "columnDesc": "PROD_DESC",
                    "tableName": "MB_PROD_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "默认对手产品类型"
            },
            "ACCT_INT_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不计息",
                    "key": "00"
                }, {
                    "value": "子账户计息",
                    "key": "01"
                }, {
                    "value": "主账户计息",
                    "key": "10"
                }, {
                    "value": "主子账户都计息",
                    "key": "11"
                }],
                "attrType": "STRING",
                "columnDesc": "账户记息标志"
            },
            "OD_ON_PRI_OVERDUE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "过期罚息是否罚息"
            },
            "PROD_YEARS_OLD": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "产品适用年龄"
            },
            "REPAY_INT_CALC": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "按全部金额计息",
                    "key": "A"
                }, {
                    "value": "按剩余金额计息",
                    "key": "R"
                }],
                "attrType": "STRING",
                "columnDesc": "还款计划利息计算方式"
            },
            "GRACE_MATURITY_DATE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "到期日是否宽限"
            },
            "INT_PENALTY_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "按合同利率计算",
                    "key": "1"
                }, {
                    "value": "按复利利率计算",
                    "key": "2"
                }],
                "attrType": "STRING",
                "columnDesc": "复利计算方式"
            },
            "TRUSTED_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "受托支付标志"
            },
            "DOWN_FREQ": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PERIOD_FREQ",
                    "columnDesc": "PERIOD_FREQ_DESC",
                    "tableName": "FM_PERIOD_FREQ"
                },
                "attrType": "STRING",
                "columnDesc": "下拨频率"
            },
            "AGENT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "允许代办"
            },
            "TRAN_LIMIT_CCY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "人民币",
                    "key": "CNY"
                }, {
                    "value": "人民币",
                    "key": "USD"
                }],
                "attrType": "STRING",
                "columnDesc": "限额币种"
            },
            "CHECK_CLOSE_FEE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "欠费检查"
            },
            "FEE_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "卡年费",
                    "key": "V24"
                }],
                "attrType": "STRING",
                "columnDesc": "费用类型"
            },
            "CHECK_PROD_STATUS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "检查产品状态"
            },
            "GRACE_END_MONTH": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "天数",
                    "key": "DAY"
                }, {
                    "value": "宽限到月底",
                    "key": "EOM"
                }],
                "attrType": "STRING",
                "columnDesc": "宽限期类型"
            },
            "CHECK_TRAN_COUNT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "检查交易笔数"
            },
            "GL_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "内部账",
                    "key": "I"
                }, {
                    "value": "往账",
                    "key": "N"
                }, {
                    "value": "来帐",
                    "key": "V"
                }],
                "attrType": "STRING",
                "columnDesc": "总账类型"
            },
            "SYNC_FINAL_BILLING": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否利随本清"
            },
            "ODI_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "复利利率"
            },
            "ODP_SPREAD_PERCENT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "罚息随执行利率浮动值"
            },
            "ALL_DRA_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": null,
                "columnDesc": "是否通兑"
            },
            "DR_RATE_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "借方利率类型"
            },
            "OPEN_CTRL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否开通限额"
            },
            "PRICE_FREQ": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": null,
                    "columnDesc": null,
                    "tableName": null
                },
                "attrType": "STRING",
                "columnDesc": "计价频率"
            },
            "DOC_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否有凭证"
            },
            "SEC_AMT_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "第二层账户金额类型"
            },
            "BRANCH_REGION_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "机构/区域控制标识"
            },
            "LG_PAY_PRE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "付款类保函",
                    "key": "01"
                }, {
                    "value": "信用类保函",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "保函项下的支付前提"
            },
            "MAX_DD_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大放款次数"
            },
            "GUARANTY_STYLE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "GUARANTY_STYLE",
                    "columnDesc": "GUARANTY_STYLE_DESC",
                    "tableName": "MB_GUARANTY_STYLE"
                },
                "attrType": "STRING",
                "columnDesc": "担保方式"
            },
            "ACCT_REAL_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "虚账户",
                    "key": "00"
                }, {
                    "value": "子实账户",
                    "key": "01"
                }, {
                    "value": "主实账户",
                    "key": "10"
                }, {
                    "value": "主子全部实账户",
                    "key": "11"
                }],
                "attrType": "STRING",
                "columnDesc": "虚实标志"
            },
            "MAX_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大次数"
            },
            "CL_ADVANCE_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "直贴",
                    "key": "01"
                }, {
                    "value": "买方付息",
                    "key": "02"
                }, {
                    "value": "转帖",
                    "key": "03"
                }, {
                    "value": "买入返售",
                    "key": "04"
                }, {
                    "value": "卖出回购",
                    "key": "05"
                }, {
                    "value": "再贴",
                    "key": "06"
                }],
                "attrType": "STRING",
                "columnDesc": "贴现贷款类型"
            },
            "CD_APPLY_MAX_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "SRTING",
                "columnDesc": "制卡申请允许最大数"
            },
            "LIMIT_ROLL_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否循环使用限额"
            },
            "CD_VALID_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "有效",
                    "key": "0"
                }, {
                    "value": "无效",
                    "key": "1"
                }, {
                    "value": "已使用",
                    "key": "2"
                }],
                "attrType": "STRING",
                "columnDesc": "有效标志"
            },
            "SCHED_MODE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "SCHED_MODE",
                    "columnDesc": "SCHED_MODE_DESC",
                    "tableName": "MB_SCHED_MODE"
                },
                "attrType": "STRING",
                "columnDesc": "贷款还款方式"
            },
            "LC_TRAN_SUM_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "转存系数"
            },
            "IS_CHECK_CASH": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否校验现金交易"
            },
            "AUTO_CLOSE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动销户"
            },
            "INT_CAP": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否结息到本账户"
            },
            "OD_ON_PRINCIPAL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "过期本金是否罚息"
            },
            "TERM_FREQ": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "一天",
                    "key": "D1"
                }, {
                    "value": "7天",
                    "key": "D7"
                }, {
                    "value": "1个月",
                    "key": "M1"
                }, {
                    "value": "18个月",
                    "key": "M18"
                }, {
                    "value": "3个月",
                    "key": "M3"
                }, {
                    "value": "6个月",
                    "key": "M6"
                }, {
                    "value": "9个月",
                    "key": "M9"
                }, {
                    "value": "1年",
                    "key": "Y1"
                }, {
                    "value": "2年",
                    "key": "Y2"
                }, {
                    "value": "3年",
                    "key": "Y3"
                }, {
                    "value": "5年",
                    "key": "Y5"
                }, {
                    "value": "6年",
                    "key": "Y6"
                }],
                "attrType": "STRING",
                "columnDesc": "期限"
            },
            "DRA_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全行通兑",
                    "key": "ALL"
                }, {
                    "value": "分行通兑",
                    "key": "FH"
                }, {
                    "value": "不允许通兑",
                    "key": "N"
                }, {
                    "value": "支行通兑",
                    "key": "ZH"
                }],
                "attrType": "STRING",
                "columnDesc": "通兑范围"
            },
            "PROD_MAX_BAL": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "产品最大余额"
            },
            "RECEIVE_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "邮寄",
                    "key": "1"
                }, {
                    "value": "自取",
                    "key": "2"
                }, {
                    "value": "全部类型",
                    "key": "ALL"
                }],
                "attrType": "STRING",
                "columnDesc": "凭证领取类型"
            },
            "UP_METHOD": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "定时归集",
                    "key": "CC"
                }, {
                    "value": "实时归集",
                    "key": "RC"
                }],
                "attrType": "STRING",
                "columnDesc": "归集方法"
            },
            "TRAN_DRA_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不允许",
                    "key": "N"
                }, {
                    "value": "允许",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "转账通兑标识"
            },
            "SG_ISS_MIN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "单次最小金额"
            },
            "OD_TERM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "透支期限"
            },
            "END_CHECK_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "提醒",
                    "key": "I"
                }, {
                    "value": "不检查",
                    "key": "N"
                }, {
                    "value": "拒绝",
                    "key": "R"
                }],
                "attrType": "STRING",
                "columnDesc": "日终检查标志"
            },
            "CHECK_AGENT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "代办人检查"
            },
            "PRE_PAID_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "提前回收最大次数"
            },
            "MAX_OVERDUE_TIMES": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大逾期次数"
            },
            "LG_ATTR": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "非融资性保函",
                    "key": "LG01"
                }, {
                    "value": "融资性保函",
                    "key": "LG02"
                }],
                "attrType": "STRING",
                "columnDesc": "保函属性"
            },
            "UP_MAX_SENECE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大归集场次"
            },
            "DOWN_MOD_UNIT": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "千元",
                    "key": "Q"
                }, {
                    "value": "万元",
                    "key": "W"
                }],
                "attrType": "STRING",
                "columnDesc": "取整单位"
            },
            "BAL_UPD_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "实时更新",
                    "key": "R"
                }, {
                    "value": "日终更新",
                    "key": "T"
                }],
                "attrType": "STRING",
                "columnDesc": "余额更新类型"
            },
            "CD_BRAND": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "VISA",
                    "key": "1"
                }, {
                    "value": "UnionPay",
                    "key": "2"
                }],
                "attrType": "STRING",
                "columnDesc": "品牌"
            },
            "CD_YEARFEE_STATUS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "卡年费收取标志"
            },
            "LC_MIN_TRAN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "最低转存金额"
            },
            "PROD_CHANNEL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全部渠道",
                    "key": "ALL"
                }, {
                    "value": "中间业务",
                    "key": "BH"
                }, {
                    "value": "网银",
                    "key": "FR"
                }, {
                    "value": "柜面",
                    "key": "MT"
                }],
                "attrType": "STRING",
                "columnDesc": "渠道"
            },
            "SYN_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "他行管理行银团贷款",
                    "key": "B"
                }, {
                    "value": "自有贷款",
                    "key": "D"
                }, {
                    "value": "本行管理行银团贷款",
                    "key": "M"
                }, {
                    "value": "本行是借款人",
                    "key": "O"
                }],
                "attrType": "STRING",
                "columnDesc": "银团贷款性质"
            },
            "CD_MADEFEE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "工本费收取"
            },
            "HUNTING_STATUS": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "XX扣款",
                    "key": "D"
                }, {
                    "value": "停止追缴",
                    "key": "N"
                }, {
                    "value": "追缴",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "持续扣款标志"
            },
            "PRE_INT_PAY_PER": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "前付息比例"
            },
            "COMMITTED_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否承诺贷款"
            },
            "LOAN_TERM_CTR_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "贷款期限控制标志"
            },
            "ODODI_CALC_BY_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "复利的复利是否随执行利率浮动"
            },
            "CL_1DD_IND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "单笔发放"
            },
            "DRW_APPROVABLE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "发放是否允许复核标志"
            },
            "PART_WITHDRAW_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许部分提取"
            },
            "CANCEL_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "解约交易类型"
            },
            "ACCT_NATURE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "ACCT_NATURE",
                    "columnDesc": "DESCRIPTION",
                    "tableName": "MB_ACCT_NATURE_DEF"
                },
                "attrType": "STRING",
                "columnDesc": "账户属性"
            },
            "PROD_YEARS_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "大于等于",
                    "key": "01"
                }, {
                    "value": "小于等于",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "年龄计算公式"
            },
            "ACCT_ORG_SCHEMA": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "账户组织模式",
                    "key": "RV母实子虚"
                }, {
                    "value": "账户组织模式",
                    "key": "VR母虚子实"
                }],
                "attrType": "STRING",
                "columnDesc": "账户组织模式"
            },
            "OPEN_AUTO_RESTRAINT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "开立时是否自动冻结保证金"
            },
            "ODODI_SPREAD_PERCENT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "复利的复利随执行利率浮动值"
            },
            "CA_TRAN_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "现金交易"
            },
            "KEEP_MIN_BAL": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "留存最小余额"
            },
            "OD_PRI_PENALTY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "DOUBLE",
                "columnDesc": "罚息的复利"
            },
            "DOWN_METHOD": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "定时下拨",
                    "key": "CA"
                }, {
                    "value": "实时下拨",
                    "key": "RA"
                }],
                "attrType": "STRING",
                "columnDesc": "下拨方法"
            },
            "CYCLE_MODE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "自动",
                    "key": "01"
                }, {
                    "value": "手动",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "结息方式"
            },
            "PROD_BRANCH": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "所有机构",
                    "key": "ALL"
                }],
                "attrType": "STRING",
                "columnDesc": "机构范围"
            },
            "TT_TRAN_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "转账交易标志"
            },
            "FEE_CTRL_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "收费标识"
            },
            "INTER_BANK_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "行内拆借",
                    "key": "0"
                }, {
                    "value": "同业拆借",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "行内同业标识"
            },
            "FUND_TRAN_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不控制",
                    "key": "0"
                }, {
                    "value": "现金",
                    "key": "1"
                }, {
                    "value": "同一客户转账",
                    "key": "2"
                }, {
                    "value": "同关系客户转账",
                    "key": "3"
                }, {
                    "value": "转账",
                    "key": "4"
                }, {
                    "value": "II/III类账户资金转移控制",
                    "key": "5"
                }, {
                    "value": "汇户贷记控制",
                    "key": "6"
                }, {
                    "value": "汇户借记控制",
                    "key": "7"
                }],
                "attrType": "STRING",
                "columnDesc": "资金转移方式"
            },
            "WRITE_OFF_WAY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "一挂多销",
                    "key": "OM"
                }, {
                    "value": "一挂一销",
                    "key": "OO"
                }],
                "attrType": "STRING",
                "columnDesc": "销账方式"
            },
            "PRE_PAID_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "提前回收标志"
            },
            "INTER_PRICE_CR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "内部计价贷记交易类型"
            },
            "INT_ROLL_FREQ": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "利率变更周期"
            },
            "TRAN_LIMIT_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "限额"
            },
            "AUTO_BE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动结汇"
            },
            "NUM_OF_CLIENT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "同客户允许数量"
            },
            "RECEIPT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许预约还款"
            },
            "ACCT_STRUCT_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "一层账户",
                    "key": "1"
                }, {
                    "value": "二层账户",
                    "key": "2"
                }],
                "attrType": "STRING",
                "columnDesc": "账户结构"
            },
            "INT_METHOD": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全部本金利息",
                    "key": "A"
                }, {
                    "value": "P 利随本清利息",
                    "key": "P"
                }],
                "attrType": "STRING",
                "columnDesc": "利息处理方式"
            },
            "AMT_CALC_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "余额增加",
                    "key": "0"
                }, {
                    "value": "余额减少",
                    "key": "1"
                }, {
                    "value": "发放金额增加",
                    "key": "2"
                }, {
                    "value": "未到期本金增加",
                    "key": "3"
                }, {
                    "value": "逾期利息增加",
                    "key": "4"
                }, {
                    "value": "逾期罚息增加",
                    "key": "5"
                }, {
                    "value": "逾期复利增加",
                    "key": "6"
                }, {
                    "value": "逾期本金减少",
                    "key": "7"
                }, {
                    "value": "逾期利息减少",
                    "key": "8"
                }, {
                    "value": "逾期罚息减少",
                    "key": "9"
                }, {
                    "value": "逾期复利减少",
                    "key": "a"
                }, {
                    "value": "未到期本金减少",
                    "key": "b"
                }, {
                    "value": "逾期本金增加",
                    "key": "c"
                }, {
                    "value": "未到期本金减少",
                    "key": "d"
                }, {
                    "value": "余额增加无流水",
                    "key": "e"
                }, {
                    "value": "发放金额增加无流水",
                    "key": "f"
                }, {
                    "value": "余额减少无流水",
                    "key": "g"
                }, {
                    "value": "额度减少无流水",
                    "key": "h"
                }, {
                    "value": "透支金额减少无流水",
                    "key": "i"
                }],
                "attrType": "STRING",
                "columnDesc": "金额计算方式"
            },
            "ALLOW_TRF": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否资产转让"
            },
            "TERM_SHORT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许缩期"
            },
            "MISS_COMPLEMENT_WAY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "次月补足",
                    "key": "MF"
                }, {
                    "value": "不允许补足",
                    "key": "NO"
                }],
                "attrType": "STRING",
                "columnDesc": "漏存补足方式"
            },
            "RESTRAINT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户限制标志"
            },
            "CD_APPER_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否开立附属卡"
            },
            "CHECK_PROD_DATE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "检查产品日期"
            },
            "DOWN_TIME": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "下拨时点"
            },
            "PRE_WITHDRAW_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全部提前支取",
                    "key": "F"
                }, {
                    "value": "部分提前支取",
                    "key": "P"
                }],
                "attrType": "STRING",
                "columnDesc": "提前支取方式"
            },
            "CD_SERVICE_CODE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡服务代码"
            },
            "CHECK_INIT_AMT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "首次存入金额检查"
            },
            "CHECK_PROD_REGION": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否地区检查"
            },
            "OPEN_LIMIT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否开通额度"
            },
            "CD_LIMIT_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "LIMIT_REF",
                    "columnDesc": "LIMIT_DESC",
                    "tableName": "LM_TRAN_LIMIT_DEF"
                },
                "attrType": "STRING",
                "columnDesc": "限额类型"
            },
            "AUTO_SE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动售汇"
            },
            "ROLLOVER_NO": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "自动本息转存次数"
            },
            "STMT_DAY": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "账单日"
            },
            "IS_CLIENT_BILL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否统一账单日"
            },
            "CHECK_RESTRAINT_IND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "限制检查标志"
            },
            "STAGE_CODE_SALE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否按期次出售"
            },
            "PRE_REPAY_DEAL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "变额不变期",
                    "key": "A"
                }, {
                    "value": "变期不变额",
                    "key": "T"
                }],
                "attrType": "STRING",
                "columnDesc": "等额还款计划变更方式"
            },
            "CR_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "贷方利率"
            },
            "PRECONTRACT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不免预约（阜新）",
                    "key": "N"
                }, {
                    "value": "可以不预约",
                    "key": "O"
                }, {
                    "value": "必须预约",
                    "key": "P"
                }, {
                    "value": "免预约（阜新）",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "预约方式"
            },
            "INIT_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "起存金额"
            },
            "INTER_BANK_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "拆入",
                    "key": "IN"
                }, {
                    "value": "拆出",
                    "key": "OUT"
                }],
                "attrType": "STRING",
                "columnDesc": "拆入拆出标识"
            },
            "INIT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "起存金额控制标记"
            },
            "INT_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "正常利率"
            },
            "CD_IS_APPER": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否为附属卡"
            },
            "LG_REL_PROD": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "保函垫款产品",
                    "key": "CL401"
                }],
                "attrType": "STRING",
                "columnDesc": "保函与垫款产品对应关系"
            },
            "WITHDRAW_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "卡",
                    "key": "CARD"
                }],
                "attrType": "STRING",
                "columnDesc": "卡产品支取范围"
            },
            "INTER_PRICE_DR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "内部计价借记交易类型"
            },
            "CHECK_KEEP_BAL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "留存金额检查标志"
            },
            "TRF_APPROVAL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "资产转让是否复核"
            },
            "FIN_WTD_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "理财产品支取交易类型"
            },
            "OD_ON_FEES": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "过期费用是否罚息"
            },
            "AGREEMENT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "存益贷",
                    "key": "DBC"
                }, {
                    "value": "存抵贷",
                    "key": "DDC"
                }, {
                    "value": "卡理财",
                    "key": "FIN"
                }, {
                    "value": "法人透支",
                    "key": "ODF"
                }, {
                    "value": "现金池协议",
                    "key": "PCP"
                }, {
                    "value": "协定存款协议",
                    "key": "XD"
                }, {
                    "value": "约定转账",
                    "key": "YD"
                }, {
                    "value": "一户通",
                    "key": "YHT"
                }],
                "attrType": "STRING",
                "columnDesc": "协议类型"
            },
            "CHECK_RESTRAINT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户限制检查"
            },
            "INT_MIN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "最小起存金额"
            },
            "INT_PENALTY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否收复利"
            },
            "EFFECTIVE_BACK_DATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大倒起天数"
            },
            "CD_AREA_CODE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡地区码"
            },
            "MM_CATEGORY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "定期",
                    "key": "F"
                }],
                "attrType": "STRING",
                "columnDesc": "拆借性质"
            },
            "AMT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "余额",
                    "key": "BAL"
                }, {
                    "value": "发放金额",
                    "key": "DDA"
                }, {
                    "value": "逾期利息",
                    "key": "INTP"
                }, {
                    "value": "额度金额",
                    "key": "LIM"
                }, {
                    "value": "透支金额",
                    "key": "OD"
                }, {
                    "value": "逾期复利",
                    "key": "ODIP"
                }, {
                    "value": "逾期罚息",
                    "key": "ODPP"
                }, {
                    "value": "未到期本金",
                    "key": "OSL"
                }, {
                    "value": "逾期本金",
                    "key": "PRD"
                }, {
                    "value": "本金",
                    "key": "PRI"
                }],
                "attrType": "STRING",
                "columnDesc": "金额类型"
            },
            "CHECK_MISS_NUM": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "漏存次数检查"
            },
            "PART_WITHDRAW_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "部分提取次数"
            },
            "RESTRAINT_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "RESTRAINT_TYPE",
                    "columnDesc": "RESTRAINT_DESC",
                    "tableName": "FM_RESTRAINT_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "限制类型"
            },
            "UPD_OD": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "透支登记标志"
            },
            "PURPOSE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PURPOSE",
                    "columnDesc": "PURPOSE_DESC",
                    "tableName": "MB_PURPOSE"
                },
                "attrType": "STRING",
                "columnDesc": "贷款用途"
            },
            "HANG_WRITE_OFF_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "挂销账标志"
            },
            "DORMANT_MONTH": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "自动转不动户月数"
            },
            "OD_ON_INT_OVERDUE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "过期复利是否罚息"
            },
            "MISS_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "漏存次数"
            },
            "CHECK_ALL_DRA": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "通兑标志检查"
            },
            "DORMANT_INT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "不动户是否计息"
            },
            "LEGAL_PERSON": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "所有法人",
                    "key": "ALL"
                }, {
                    "value": "神州数码",
                    "key": "DCITS"
                }, {
                    "value": "其他",
                    "key": "OTH"
                }],
                "attrType": "STRING",
                "columnDesc": "产品所属法人"
            },
            "LG_CLAIM_CON": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "有条件保函",
                    "key": "01"
                }, {
                    "value": "无条件保函",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "保函的索赔条件"
            },
            "REMAIN_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "理财主产品保底金额"
            },
            "CD_MEDIUM": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "磁条卡",
                    "key": "0"
                }, {
                    "value": "IC卡",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "磁条/IC卡"
            },
            "SUB_PROD_TYPE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROD_TYPE",
                    "columnDesc": "PROD_DESC",
                    "tableName": "MB_PROD_TYPE"
                },
                "attrType": "STRING",
                "columnDesc": "子账户产品列表"
            },
            "CD_CUST_GRADE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "普通客户",
                    "key": "0"
                }, {
                    "value": "风险客户",
                    "key": "1"
                }],
                "attrType": "STRING",
                "columnDesc": "卡的客户等级"
            },
            "AUTO_DORM_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动转不动户"
            },
            "OD_INT_PENALTY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "DOUBLE",
                "columnDesc": "复利的复利"
            },
            "SG_DEP_AMT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "单次存入金额控制标记"
            },
            "PRE_WITHDRAW_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许提前支取"
            },
            "CD_SAME_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "同号换卡"
            },
            "BILL_PERIOD_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "日",
                    "key": "D"
                }, {
                    "value": "月",
                    "key": "M"
                }, {
                    "value": "年",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "账单周期类型"
            },
            "CHECK_SIGN": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "签约检查"
            },
            "CYC_CTRL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否循环使用限额"
            },
            "CD_CATEGORY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "借记卡",
                    "key": "0"
                }, {
                    "value": "贷记卡",
                    "key": "1"
                }, {
                    "value": "借贷一体卡",
                    "key": "2"
                }],
                "attrType": "STRING",
                "columnDesc": "卡种"
            },
            "ACCT_STATUS": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "活动",
                    "key": "A"
                }, {
                    "value": "关闭",
                    "key": "C"
                }, {
                    "value": "不动",
                    "key": "D"
                }, {
                    "value": "待激活",
                    "key": "H"
                }, {
                    "value": "预开户",
                    "key": "I"
                }, {
                    "value": "新建",
                    "key": "N"
                }, {
                    "value": "转营业外",
                    "key": "O"
                }, {
                    "value": "逾期",
                    "key": "P"
                }, {
                    "value": "久悬户",
                    "key": "S"
                }],
                "attrType": "STRING",
                "columnDesc": "账户状态"
            },
            "MM_AUTO_VERIFY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否自动复核"
            },
            "HANG_INT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "久悬户是否计息"
            },
            "IS_AUTO_CYCLE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否自动结息"
            },
            "INLAND_OFFSHORE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "境内客户",
                    "key": "I"
                }, {
                    "value": "境外客户",
                    "key": "O"
                }],
                "attrType": "STRING",
                "columnDesc": "境内境外"
            },
            "ACCT_EXEC": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "ACCT_EXEC",
                    "columnDesc": "ACCT_EXEC_NAME",
                    "tableName": "FM_ACCT_EXEC"
                },
                "attrType": "STRING",
                "columnDesc": "客户经理"
            },
            "UP_DR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "归集借记交易类型"
            },
            "BAL_DIRECT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "贷方（负债用-标识）",
                    "key": "C"
                }, {
                    "value": "借方（资产用+标识）",
                    "key": "D"
                }],
                "attrType": "STRING",
                "columnDesc": "余额方向"
            },
            "DR_RATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "借方利率"
            },
            "INT_PAT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "按频率付息",
                    "key": "P1"
                }, {
                    "value": "前付息",
                    "key": "P2"
                }, {
                    "value": "利随本清",
                    "key": "P3"
                }],
                "attrType": "STRING",
                "columnDesc": "付息方式"
            },
            "CHECK_WDRAWN_TYPE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "支取方式检查标志"
            },
            "MAX_BACK_DATE_DAYS": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "倒起息最大天数"
            },
            "MAX_FUTURE_DATE_DAYS": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "晚起息最大天数"
            },
            "PROD_START_DATE": {
                "columnType": "date",
                "valueMethod": "FD",
                "attrType": "DATE",
                "columnDesc": "生效日期"
            },
            "CHECK_DEP_NUM": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "存入次数控制标记"
            },
            "AUTO_HANG_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动转久悬"
            },
            "BEFORE_INCOME": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "前收息标志"
            },
            "LG_BANK_DUTY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "第一性责任保函",
                    "key": "01"
                }, {
                    "value": "第二性责任保函",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "担保行付款责任"
            },
            "DUE_AUTO_UNFREEZE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "到期自动解冻保证金"
            },
            "MIN_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最小次数"
            },
            "CONVERTED_CCY": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "CCY",
                    "columnDesc": "CCY_DESC",
                    "tableName": "FM_CURRENCY"
                },
                "attrType": "STRING",
                "columnDesc": "折算币种"
            },
            "ACCT_PREFIX": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "境外机构境内外汇账户",
                    "key": "NRA"
                }],
                "attrType": "STRING",
                "columnDesc": "账户前缀"
            },
            "DRW_ACROSS_CCY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许跨币种发放"
            },
            "OD_GRACE_PERIOD": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "免息期"
            },
            "TRAN_LIMIT_TERM": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "当日",
                    "key": "D"
                }, {
                    "value": "当月",
                    "key": "M"
                }],
                "attrType": "STRING",
                "columnDesc": "限额周期"
            },
            "BE_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "结汇标志"
            },
            "CHECK_TRAN_LIMIT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "检查交易限额"
            },
            "PRI_PENALTY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否收罚息"
            },
            "INT_CHANGE_TERM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "利率变更周期"
            },
            "DDI_APPROVABLE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "增量发放复核"
            },
            "LOAN_MIN_TERM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最短贷款期限"
            },
            "OVER_LIMIT_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "超额额度"
            },
            "SG_DEP_MAX_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "单次存入最大金额"
            },
            "UP_TIME": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "归集时点"
            },
            "LG_TFR_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否转开保函"
            },
            "PARTIAL_RENEW_ROLL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许部分本金转存"
            },
            "CD_CARD_BIN": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡BIN"
            },
            "PROFIT_CENTRE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PROFIT_CENTRE",
                    "columnDesc": "PROFIT_CENTRE_DESC",
                    "tableName": "FM_PROFIT_CENTRE"
                },
                "attrType": "STRING",
                "columnDesc": "利润中心"
            },
            "STRUCTURE_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "账号生成规则"
            },
            "CR_RATE_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "贷方利率类型"
            },
            "ODI_CALC_BY_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "复利是否随执行利率浮动"
            },
            "CLIENT_CTRL_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "客户控制标识"
            },
            "ACCT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "AIO账户",
                    "key": "A"
                }, {
                    "value": "结算账户",
                    "key": "C"
                }, {
                    "value": "垫款",
                    "key": "D"
                }, {
                    "value": "委托贷款",
                    "key": "E"
                }, {
                    "value": "账户类型",
                    "key": "G"
                }, {
                    "value": "转让贷款",
                    "key": "L"
                }, {
                    "value": "普通贷款",
                    "key": "M"
                }, {
                    "value": "储蓄账户",
                    "key": "S"
                }, {
                    "value": "定期账户",
                    "key": "T"
                }, {
                    "value": "贴现贷款",
                    "key": "U"
                }, {
                    "value": "银团贷款",
                    "key": "Y"
                }, {
                    "value": "资产证券化",
                    "key": "Z"
                }],
                "attrType": "STRING",
                "columnDesc": "账户类型"
            },
            "LIMIT_MODE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "以收定支",
                    "key": "01"
                }, {
                    "value": "超额定支",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "额度管理模式"
            },
            "AUTO_SETTLE": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "自动结算"
            },
            "CD_RULE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡号规则"
            },
            "INT_CALC_BAL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "积数法",
                    "key": "AB"
                }, {
                    "value": "分段计息法",
                    "key": "EB"
                }],
                "attrType": "STRING",
                "columnDesc": "计息方式"
            },
            "MM_CASH_FLOW": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否处理现金流"
            },
            "BRANCH_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "全行",
                    "key": "ALL"
                }, {
                    "value": "分行",
                    "key": "FH"
                }, {
                    "value": "自定义",
                    "key": "ZDY"
                }, {
                    "value": "支行",
                    "key": "ZH"
                }],
                "attrType": "STRING",
                "columnDesc": "适用机构类型"
            },
            "SOURCE_MODULE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "客户",
                    "key": "CIF"
                }, {
                    "value": "贷款",
                    "key": "CL"
                }, {
                    "value": "总账",
                    "key": "GL"
                }, {
                    "value": "货币市场",
                    "key": "MM"
                }, {
                    "value": "存款",
                    "key": "RB"
                }],
                "attrType": "STRING",
                "columnDesc": "业务模块"
            },
            "CHECK_PROD_CHANNEL": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否渠道检查"
            },
            "LOAN_MAX_TERM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最长贷款期限"
            },
            "TERM_LONG_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许延期"
            },
            "CD_VALID_TIME": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "卡介质的有效期"
            },
            "LG_AGRE_REL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "从属性保函",
                    "key": "01"
                }, {
                    "value": "独立保函",
                    "key": "02"
                }],
                "attrType": "STRING",
                "columnDesc": "保函与基础合同的关系"
            },
            "MAX_EXTEND_TIMES": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大展期次数"
            },
            "DOWN_DR_TRAN_TYPE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "下拨借记交易类型"
            },
            "DOWN_PLAN": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "差额下拨",
                    "key": "L01"
                }, {
                    "value": "取整下拨",
                    "key": "L02"
                }, {
                    "value": "固定值下拨",
                    "key": "L03"
                }, {
                    "value": "留底差额下",
                    "key": "L04"
                }, {
                    "value": "留底取整下拨",
                    "key": "L05"
                }],
                "attrType": "STRING",
                "columnDesc": "下拨策略"
            },
            "RATE_EFFECT_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "就高",
                    "key": "H"
                }, {
                    "value": "就低",
                    "key": "L"
                }, {
                    "value": "不比较",
                    "key": "N"
                }],
                "attrType": "STRING",
                "columnDesc": "利率生效方式"
            },
            "FORCE_HOLIDAY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "到期日遇节假日是否顺延"
            },
            "BACK_FLOAT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "倒起息标识"
            },
            "CD_APP_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "开附属卡数量"
            },
            "PRE_INT_REC": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "前付息是否收回"
            },
            "MIN_DRW_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "放款最小额度"
            },
            "SG_MAX_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "DOUBLE",
                "columnDesc": "单次最大金额"
            },
            "SG_ISS_MAX_AMT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "单次最大金额"
            },
            "FUTURE_FLOAT_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "晚起息标志"
            },
            "UP_FREQ": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PERIOD_FREQ",
                    "columnDesc": "PERIOD_FREQ_DESC",
                    "tableName": "FM_PERIOD_FREQ"
                },
                "attrType": "STRING",
                "columnDesc": "归集频率"
            },
            "CHECK_CCY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "币种检查"
            },
            "CHECK_SAME_CLIENT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "子账户是否同一客户"
            },
            "CHECK_SG_AMT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "单次金额控制方式"
            },
            "INT_FLAG": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "不计息",
                    "key": "N"
                }, {
                    "value": "计息",
                    "key": "Y"
                }],
                "attrType": "STRING",
                "columnDesc": "记息标志"
            },
            "ACCT_CLASS": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "I类账户",
                    "key": "1"
                }, {
                    "value": "II类账户",
                    "key": "2"
                }, {
                    "value": "III类账户",
                    "key": "3"
                }],
                "attrType": "STRING",
                "columnDesc": "账户类别"
            },
            "BAL_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "钞余额",
                    "key": "CA"
                }, {
                    "value": "汇余额",
                    "key": "TT"
                }],
                "attrType": "STRING",
                "columnDesc": "余额类型"
            },
            "REGION_RANGE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "多个区域",
                    "key": "M"
                }, {
                    "value": "单个区域",
                    "key": "S"
                }],
                "attrType": "STRING",
                "columnDesc": "适用区域类型"
            },
            "LC_TERM_FREQ": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "转存频率"
            },
            "MAX_SHRINK_TIMES": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大缩期次数"
            },
            "ACCT_LIMIT_PROCESS": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "账户额度处理"
            },
            "CHECK_ALL_DEP": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "通存标志检查"
            },
            "DOWN_MAX_SENECE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大下拨场次"
            },
            "EXTEND_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许展期"
            },
            "GL_CODE": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "SUBJECT_CODE",
                    "columnDesc": "SUBJECT_DESC",
                    "tableName": "AC_SUBJECT"
                },
                "attrType": "STRING",
                "columnDesc": "科目代码"
            },
            "GRACE_PERIOD": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "宽限期天数"
            },
            "MAX_DEP_NUM": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "存入最大次数"
            },
            "ODODP_SPREAD_PERCENT": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "罚息的复利随执行利率浮动值"
            },
            "MULTI_CCY": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否多币种"
            },
            "BAL_TYPE_PRIORITY": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "钞余额类型",
                    "key": "CA"
                }, {
                    "value": "汇余额类型",
                    "key": "TT"
                }],
                "attrType": "STRING",
                "columnDesc": "余额优先级"
            },
            "FREQ_INT_IND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否允许按频率付息"
            },
            "PROD_REGION": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "所有区域",
                    "key": "ALL"
                }],
                "attrType": "STRING",
                "columnDesc": "区域范围"
            },
            "LG_REL_BOND": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "是否关联保证金"
            },
            "NUM_CTR_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "次数控制方式"
            },
            "PRE_PAID_LOCK_TERM": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "PERIOD_FREQ",
                    "columnDesc": "PERIOD_FREQ_DESC",
                    "tableName": "FM_PERIOD_FREQ"
                },
                "attrType": "STRING",
                "columnDesc": "提前还款锁定期"
            },
            "FEE_CAP": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "费用资本化"
            },
            "ODODP_CALC_BY_INT": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "罚息的复利是否随执行利率浮动"
            },
            "EFFECTIVE_FUTURE_DATE": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大远起天数"
            },
            "CD_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "金通卡",
                    "key": "001"
                }, {
                    "value": "金通生肖卡",
                    "key": "002"
                }, {
                    "value": "CCM联名卡",
                    "key": "003"
                }, {
                    "value": "金通VIP卡",
                    "key": "004"
                }, {
                    "value": "金通VIP城市之光卡",
                    "key": "005"
                }, {
                    "value": "借记IC卡",
                    "key": "006"
                }, {
                    "value": "IC VIP卡",
                    "key": "007"
                }, {
                    "value": "IC生肖卡",
                    "key": "008"
                }, {
                    "value": "大连普惠卡",
                    "key": "009"
                }, {
                    "value": "热高联名IC卡",
                    "key": "010"
                }, {
                    "value": "国密借记IC卡",
                    "key": "011"
                }, {
                    "value": "国密ICVIP卡",
                    "key": "012"
                }, {
                    "value": "国密IC生肖卡",
                    "key": "013"
                }],
                "attrType": "STRING",
                "columnDesc": "卡类型"
            },
            "BRANCH_REGION_SELECT": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "根据机构控制",
                    "key": "B"
                }, {
                    "value": "根据区域控制",
                    "key": "R"
                }],
                "attrType": "STRING",
                "columnDesc": "机构/区域选择"
            },
            "ACTUAL_OR_LEDGER_BAL": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "账面余额",
                    "key": "A"
                }, {
                    "value": "可用余额",
                    "key": "L"
                }],
                "attrType": "STRING",
                "columnDesc": "余额标志"
            },
            "CCY": {
                "columnType": "select",
                "valueMethod": "RF",
                "valueScore": {
                    "columnCode": "CCY",
                    "columnDesc": "CCY_DESC",
                    "tableName": "FM_CURRENCY"
                },
                "attrType": "STRING",
                "columnDesc": "币种"
            },
            "CLIENT_IND": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "正常客户",
                    "key": "N"
                }, {
                    "value": "银行员工客户",
                    "key": "S"
                }, {
                    "value": "VIP客户",
                    "key": "V"
                }],
                "attrType": "STRING",
                "columnDesc": "客户等级"
            },
            "MAX_OVERDUE_DAYS": {
                "columnType": "input",
                "valueMethod": "FD",
                "attrType": "STRING",
                "columnDesc": "最大逾期天数"
            },
            "WITHDRAWAL_TYPE": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "凭密码和印鉴",
                    "key": "B"
                }, {
                    "value": "凭证件",
                    "key": "O"
                }, {
                    "value": "凭密码",
                    "key": "P"
                }, {
                    "value": "凭印鉴",
                    "key": "S"
                }, {
                    "value": "无密码无印鉴",
                    "key": "W"
                }],
                "attrType": "STRING",
                "columnDesc": "支取方式"
            },
            "CON_TRANSFER_COUNT": {
                "columnType": "select",
                "valueMethod": "VL",
                "valueScore": [{
                    "value": "追踪转账持续划款次数",
                    "key": "5"
                }],
                "attrType": "STRING",
                "columnDesc": "持续划款次数"
            },
            "MM_INTREST_FLAG": {
                "columnType": "switch",
                "valueMethod": "YN",
                "attrType": "STRING",
                "columnDesc": "利息标识"
            }
        }
    })
}