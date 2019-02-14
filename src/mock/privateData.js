export default {
    getPrivateData: (val) => ({
        code: '000000',
        msg: '请求成功',
        data: {
            prodType: {
                prodType: 'RB101',
                prodDesc: '个人活期存款',
                prodClass: 'RB100',
                prodGroup: 'N',
                prodRange: 'S',
                baseProdType: 'RBHQ1',
                status: 'A'
            },

            prodDefines: {
                INT_DAY: {
                    prodType: 'RB101',
                    seqNo: '133',
                    assembleType: 'ATTR',
                    assembleId: 'INT_DAY',
                    eventDefault: '',
                    attrKey: 'INT_DAY',
                    attrValue: '21',
                    status: 'A'
                },

                ACCT_BAL_FLAG: {
                    prodType: 'RB101',
                    seqNo: '138',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_BAL_FLAG',
                    eventDefault: '',
                    attrKey: 'ACCT_BAL_FLAG',
                    attrValue: '10',
                    status: 'A'
                },

                ACCT_REAL_FLAG: {
                    prodType: 'RB101',
                    seqNo: '170',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_REAL_FLAG',
                    eventDefault: '',
                    attrKey: 'ACCT_REAL_FLAG',
                    attrValue: '10',
                    status: 'A'
                },

                SE_FLAG: {
                    prodType: 'RB101',
                    seqNo: '129',
                    assembleType: 'ATTR',
                    assembleId: 'SE_FLAG',
                    eventDefault: '',
                    attrKey: 'SE_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                ACCT_NATURE: {
                    prodType: 'RB101',
                    seqNo: '113',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_NATURE',
                    eventDefault: '',
                    attrKey: 'ACCT_NATURE',
                    attrValue: '1，2',
                    status: 'A'
                },

                PROD_START_DATE: {
                    prodType: 'RB101',
                    seqNo: '106',
                    assembleType: 'ATTR',
                    assembleId: 'PROD_START_DATE',
                    eventDefault: '',
                    attrKey: 'PROD_START_DATE',
                    attrValue: '2000-01-01',
                    status: 'A'
                },

                ALL_DEP_FLAG: {
                    prodType: 'RB101',
                    seqNo: '123',
                    assembleType: 'ATTR',
                    assembleId: 'ALL_DEP_FLAG',
                    eventDefault: '',
                    attrKey: 'ALL_DEP_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                AUTO_HANG_FLAG: {
                    prodType: 'RB101',
                    seqNo: '121',
                    assembleType: 'ATTR',
                    assembleId: 'AUTO_HANG_FLAG',
                    eventDefault: '',
                    attrKey: 'AUTO_HANG_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                AUTO_CLOSE_FLAG: {
                    prodType: 'RB101',
                    seqNo: '120',
                    assembleType: 'ATTR',
                    assembleId: 'AUTO_CLOSE_FLAG',
                    eventDefault: '',
                    attrKey: 'AUTO_CLOSE_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                INT_CAP: {
                    prodType: 'RB101',
                    seqNo: '168',
                    assembleType: 'ATTR',
                    assembleId: 'INT_CAP',
                    eventDefault: '',
                    attrKey: 'INT_CAP',
                    attrValue: 'Y',
                    status: 'A'
                },

                CLIENT_TYPE: {
                    prodType: 'RB101',
                    seqNo: '116',
                    assembleType: 'ATTR',
                    assembleId: 'CLIENT_TYPE',
                    eventDefault: '',
                    attrKey: 'CLIENT_TYPE',
                    attrValue: '10',
                    status: 'A'
                },

                DOC_TYPE: {
                    prodType: 'RB101',
                    seqNo: '132',
                    assembleType: 'ATTR',
                    assembleId: 'DOC_TYPE',
                    eventDefault: '',
                    attrKey: 'DOC_TYPE',
                    attrValue: '101,105',
                    status: 'A'
                },

                INT_APPL_TYPE: {
                    prodType: 'RB101',
                    seqNo: '134',
                    assembleType: 'ATTR',
                    assembleId: 'INT_APPL_TYPE',
                    eventDefault: '',
                    attrKey: 'INT_APPL_TYPE',
                    attrValue: 'N',
                    status: 'A'
                },

                PROD_END_DATE: {
                    prodType: 'RB101',
                    seqNo: '107',
                    assembleType: 'ATTR',
                    assembleId: 'PROD_END_DATE',
                    eventDefault: '',
                    attrKey: 'PROD_END_DATE',
                    attrValue: '2050-12-31',
                    status: 'A'
                },

                PROD_BRANCH: {
                    prodType: 'RB101',
                    seqNo: '110',
                    assembleType: 'ATTR',
                    assembleId: 'PROD_BRANCH',
                    eventDefault: '',
                    attrKey: 'PROD_BRANCH',
                    attrValue: '0',
                    status: 'A'
                },

                AMT_TYPE: {
                    prodType: 'RB101',
                    seqNo: '162',
                    assembleType: 'ATTR',
                    assembleId: 'AMT_TYPE',
                    eventDefault: '',
                    attrKey: 'AMT_TYPE',
                    attrValue: 'BAL',
                    status: 'A'
                },

                ACCT_CLASS: {
                    prodType: 'RB101',
                    seqNo: '125',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_CLASS',
                    eventDefault: '',
                    attrKey: 'ACCT_CLASS',
                    attrValue: 'I',
                    status: 'A'
                },

                BAL_TYPE: {
                    prodType: 'RB101',
                    seqNo: '117',
                    assembleType: 'ATTR',
                    assembleId: 'BAL_TYPE',
                    eventDefault: '',
                    attrKey: 'BAL_TYPE',
                    attrValue: 'CA',
                    status: 'A'
                },

                BE_FLAG: {
                    prodType: 'RB101',
                    seqNo: '126',
                    assembleType: 'ATTR',
                    assembleId: 'BE_FLAG',
                    eventDefault: '',
                    attrKey: 'BE_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                AUTO_BE_FLAG: {
                    prodType: 'RB101',
                    seqNo: '127',
                    assembleType: 'ATTR',
                    assembleId: 'AUTO_BE_FLAG',
                    eventDefault: '',
                    attrKey: 'AUTO_BE_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                DORMANT_MONTH: {
                    prodType: 'RB101',
                    seqNo: '163',
                    assembleType: 'ATTR',
                    assembleId: 'DORMANT_MONTH',
                    eventDefault: '',
                    attrKey: 'DORMANT_MONTH',
                    attrValue: '12',
                    status: 'A'
                },

                ACCT_INT_FLAG: {
                    prodType: 'RB101',
                    seqNo: '111',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_INT_FLAG',
                    eventDefault: '',
                    attrKey: 'ACCT_INT_FLAG',
                    attrValue: '10',
                    status: 'A'
                },

                LEGAL_PERSON: {
                    prodType: 'RB101',
                    seqNo: '108',
                    assembleType: 'ATTR',
                    assembleId: 'LEGAL_PERSON',
                    eventDefault: '',
                    attrKey: 'LEGAL_PERSON',
                    attrValue: 'DCITS',
                    status: 'A'
                },

                ACCT_STRUCT_FLAG: {
                    prodType: 'RB101',
                    seqNo: '160',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_STRUCT_FLAG',
                    eventDefault: '',
                    attrKey: 'ACCT_STRUCT_FLAG',
                    attrValue: '1',
                    status: 'A'
                },

                MULTI_CCY: {
                    prodType: 'RB101',
                    seqNo: '140',
                    assembleType: 'ATTR',
                    assembleId: 'MULTI_CCY',
                    eventDefault: '',
                    attrKey: 'MULTI_CCY',
                    attrValue: 'N',
                    status: 'A'
                },

                NEXT_CYCLE_DATE: {
                    prodType: 'RB101',
                    seqNo: '169',
                    assembleType: 'ATTR',
                    assembleId: 'NEXT_CYCLE_DATE',
                    eventDefault: '',
                    attrKey: 'NEXT_CYCLE_DATE',
                    attrValue: '20160321',
                    status: 'A'
                },
                PROD_REGION: {
                    prodType: 'RB101',
                    seqNo: '109',
                    assembleType: 'ATTR',
                    assembleId: 'PROD_REGION',
                    eventDefault: '',
                    attrKey: 'PROD_REGION',
                    attrValue: 'ALL',
                    status: 'A'
                },

                PROFIT_CENTRE: {
                    prodType: 'RB101',
                    seqNo: '135',
                    assembleType: 'ATTR',
                    assembleId: 'PROFIT_CENTRE',
                    eventDefault: '',
                    attrKey: 'PROFIT_CENTRE',
                    attrValue: '99',
                    status: 'A'
                },

                AUTO_DORM_FLAG: {
                    prodType: 'RB101',
                    seqNo: '119',
                    assembleType: 'ATTR',
                    assembleId: 'AUTO_DORM_FLAG',
                    eventDefault: '',
                    attrKey: 'AUTO_DORM_FLAG',
                    attrValue: 'N',
                    status: 'A'
                },

                ACCT_TYPE: {
                    prodType: 'RB101',
                    seqNo: '112',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_TYPE',
                    eventDefault: '',
                    attrKey: 'ACCT_TYPE',
                    attrValue: 'C',
                    status: 'A'
                },

                OD_FACILITY: {
                    prodType: 'RB101',
                    seqNo: '124',
                    assembleType: 'ATTR',
                    assembleId: 'OD_FACILITY',
                    eventDefault: '',
                    attrKey: 'OD_FACILITY',
                    attrValue: 'Y',
                    status: 'A'
                },

                CYCLE_FREQ: {
                    prodType: 'RB101',
                    seqNo: '131',
                    assembleType: 'ATTR',
                    assembleId: 'CYCLE_FREQ',
                    eventDefault: '',
                    attrKey: 'CYCLE_FREQ',
                    attrValue: 'M3',
                    status: 'A'
                },

                CLIENT_IND: {
                    prodType: 'RB101',
                    seqNo: '115',
                    assembleType: 'ATTR',
                    assembleId: 'CLIENT_IND',
                    eventDefault: '',
                    attrKey: 'CLIENT_IND',
                    attrValue: 'N',
                    status: 'A'
                },

                CCY: {
                    prodType: 'RB101',
                    seqNo: '130',
                    assembleType: 'ATTR',
                    assembleId: 'CCY',
                    eventDefault: '',
                    attrKey: 'CCY',
                    attrValue: 'CNY,USD',
                    status: 'A'
                },

                AUTO_SE_FLAG: {
                    prodType: 'RB101',
                    seqNo: '128',
                    assembleType: 'ATTR',
                    assembleId: 'AUTO_SE_FLAG',
                    eventDefault: '',
                    attrKey: 'AUTO_SE_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                SOURCE_MODULE: {
                    prodType: 'RB101',
                    seqNo: '136',
                    assembleType: 'ATTR',
                    assembleId: 'SOURCE_MODULE',
                    eventDefault: '',
                    attrKey: 'SOURCE_MODULE',
                    attrValue: 'RB',
                    status: 'A'
                },

                INLAND_OFFSHORE: {
                    prodType: 'RB101',
                    seqNo: '114',
                    assembleType: 'ATTR',
                    assembleId: 'INLAND_OFFSHORE',
                    eventDefault: '',
                    attrKey: 'INLAND_OFFSHORE',
                    attrValue: 'I',
                    status: 'A'
                },

                OWNERSHIP_TYPE: {
                    prodType: 'RB101',
                    seqNo: '118',
                    assembleType: 'ATTR',
                    assembleId: 'OWNERSHIP_TYPE',
                    eventDefault: '',
                    attrKey: 'OWNERSHIP_TYPE',
                    attrValue: 'SG',
                    status: 'A'
                },

                ALL_DRA_FLAG: {
                    prodType: 'RB101',
                    seqNo: '122',
                    assembleType: 'ATTR',
                    assembleId: 'ALL_DRA_FLAG',
                    eventDefault: '',
                    attrKey: 'ALL_DRA_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                ACCT_EXEC: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'ACCT_EXEC',
                    eventDefault: '',
                    attrKey: 'ACCT_EXEC',
                    attrValue: '0101',
                    status: 'A'
                },

                DOC_FLAG: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'DOC_FLAG',
                    eventDefault: '',
                    attrKey: 'DOC_FLAG',
                    attrValue: 'Y',
                    status: 'A'
                },

                DOC_TYPE1: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'DOC_TYPE1',
                    eventDefault: '',
                    attrKey: 'DOC_TYPE1',
                    attrValue: '001',
                    status: 'A'
                },

                FIXED_CALL: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'FIXED_CALL',
                    eventDefault: '',
                    attrKey: 'FIXED_CALL',
                    attrValue: '101',
                    status: 'A'
                },

                OWNERSHIP_TYPE1: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'OWNERSHIP_TYPE1',
                    eventDefault: '',
                    attrKey: 'OWNERSHIP_TYPE1',
                    attrValue: 'SG',
                    status: 'A'
                },

                WITHDRAWAL_TYPE: {
                    prodType: 'RB101',
                    seqNo: '139',
                    assembleType: 'ATTR',
                    assembleId: 'WITHDRAWAL_TYPE',
                    eventDefault: '',
                    attrKey: 'WITHDRAWAL_TYPE',
                    attrValue: 'B',
                    status: 'A'
                }
            },

            mbEventInfos: {
                WTD_RB101: {
                    mbEventType: '',
                    mbEventAttrs: {
                        CHECK_AGENT: {
                            eventType: 'WTD_RB101',
                            seqNo: '10',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_AGENT',
                            attrValue: 'Y',
                            assembleRule: 'C'
                        },
                        //代办人检查
                        AMT_CALC_TYPE: {
                            eventType: 'WTD_RB101',
                            seqNo: '11',
                            assembleType: 'ATTR',
                            assembleId: 'AMT_CALC_TYPE',
                            attrValue: '1',
                            assembleRule: 'F'
                        },
                        //金额计算方式
                        CHECK_WDRAWN_TYPE: {
                            eventType: 'WTD_RB101',
                            seqNo: '8',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_WDRAWN_TYPE',
                            attrValue: 'Y',
                            assembleRule: 'A'
                        },
                        //支取方式标志检查
                        CHECK_RESTRAINT: {
                            eventType: 'WTD_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_RESTRAINT',
                            attrValue: 'N',
                            assembleRule: 'A'
                        },
                        //账户限制检查
                        SERV_CHARGE_FLAG: {
                            eventType: 'WTD_RB101',
                            seqNo: '9',
                            assembleType: 'ATTR',
                            assembleId: 'SERV_CHARGE_FLAG',
                            attrValue: 'N',
                            assembleRule: 'C'
                        },
                        //服务费标志
                        AGENT_FLAG: {
                            eventType: 'WTD_RB101',
                            seqNo: '9',
                            assembleType: 'ATTR',
                            assembleId: 'AGENT_FLAG',
                            attrValue: 'N',
                            assembleRule: 'C'
                        },
                        //是否允许代办
                        FUND_TRAN_TYPE: {
                            eventType: 'WTD_RB101',
                            seqNo: '9',
                            assembleType: 'ATTR',
                            assembleId: 'FUND_TRAN_TYPE',
                            attrValue: '1',
                            assembleRule: 'C'
                        },
                        DOC_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'DOC_TYPE',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        CHECK_KEEP_BAL: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_KEEP_BAL',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                    },
                    mbEventParts: {
                        CHECK_ACCT_STATUS_PA: {},
                        DRA_DEP_PA: {},
                        CHECK_TRAN_LIMIT_PA: {},
                        CHECK_KEEP_BAL_PA: {},
                        CHECK_SG_AMT_PA: {},
                        CHECK_FUND_TRAN_PA: {}
                    }
                },

                CYCLE_RB101: {
                    mbEventType: {
                        eventType: 'CYCLE_RB101',
                        eventDesc: '个人活期存款结息',
                        eventClass: 'CYCLE',
                        processMethod: 'C',
                        status: 'A',
                        isStandard: 'N',
                        company: 'DCITS'
                    },
                    mbEventAttrs: {
                        AMT_CALC_TYPE: {
                            eventType: 'CYCLE_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'AMT_CALC_TYPE',
                            attrValue: '0',
                            assembleRule: 'F'
                        },
                        CYCLE_FREQ: {
                            eventType: 'CYCLE_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'CYCLE',
                            attrValue: '2M',
                            assembleRule: 'F'
                        }
                    },//金额计算方式
                    mbEventParts: {
                        CHECK_ACCT_STATUS_PA: {//账户状态检查
                            ACCT_STRUCT_FLAG: {
                                eventType: 'CYCLE_RB101',
                                assembleId: 'CHECK_ACCT_STATUS_PA',
                                attrKey: 'ACCT_STRUCT_FLAG',
                                attrValue: '2'
                            }
                        }//账户结构
                    }
                },

                DEP_RB101: {
                    mbEventType: '',
                    mbEventAttrs: {
                        CHECK_AGENT: {
                            eventType: 'DEP_RB101',
                            seqNo: '8',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_AGENT',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        AMT_CALC_TYPE: {
                            eventType: 'DEP_RB101',
                            seqNo: '10',
                            assembleType: 'ATTR',
                            assembleId: 'AMT_CALC_TYPE',
                            attrValue: '0',
                            assembleRule: 'F'
                        },
                        CHECK_RESTRAINT: {
                            eventType: 'DEP_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_RESTRAINT',
                            attrValue: 'Y',
                            assembleRule: 'A'
                        },
                        SERV_CHARGE_FLAG: {
                            eventType: 'DEP_RB101',
                            seqNo: '7',
                            assembleType: 'ATTR',
                            assembleId: 'SERV_CHARGE_FLAG',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        }
                    },//服务费标志第二个是金额计算方式
                    mbEventParts: {
                        CHECK_ACCT_STATUS_PA: {},
                        DRA_DEP_PA: {},
                        CHECK_KEEP_BAL_PA: {//留存金额检查标志
                            SERV_CHARGE_FLAG: {
                                eventType: 'DEP_RB101',
                                assembleId: 'CHECK_KEEP_BAL_PA',
                                attrKey: 'SERV_CHARGE_FLAG',
                                attrValue: '1'
                            }
                        },//服务费标志
                        CHECK_SG_AMT_PA: {},//单次金额控制方式
                        CHECK_FUND_TRAN_PA: {}//资金转移方式检查
                    }
                },

                OPEN_RB101: {
                    mbEventType: {
                        eventType: 'OPEN_RB101',
                        eventDesc: '个人活期存款开户',
                        eventClass: 'OPEN',
                        processMethod: 'C',
                        status: 'A',
                        isStandard: 'N',
                        company: 'DCITS'
                    },
                    mbEventAttrs: {
                        NUM_OF_CLIENT: {
                            eventType: 'OPEN_RB101',
                            seqNo: '10',
                            assembleType: 'ATTR',
                            assembleId: 'NUM_OF_CLIENT',
                            attrValue: '1',
                            assembleRule: 'A'
                        },
                        CHECK_AGENT: {
                            eventType: 'OPEN_RB101',
                            seqNo: '11',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_AGENT',
                            attrValue: 'Y',
                            assembleRule: 'C'
                        },
                        CHECK_ACCT_NATURE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '3',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_ACCT_NATURE',
                            attrValue: 'Y',
                            assembleRule: 'A'
                        },
                        STRUCTURE_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'STRUCTURE_TYPE',
                            attrValue: 'CD2',
                            assembleRule: 'E'
                        },
                        WITHDRAWAL_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '6',
                            assembleType: 'ATTR',
                            assembleId: 'WITHDRAWAL_TYPE',
                            attrValue: 'W',
                            assembleRule: 'C'
                        },
                        OWNERSHIP_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'OWNERSHIP_TYPE',
                            attrValue: 'SU',
                            assembleRule: 'F'
                        },
                        RESTRAINT_FLAG: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'RESTRAINT_FLAG',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        CHECK_WDRAWN_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_WDRAWN_TYPE',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        DOC_TYPE: {
                            eventType: 'OPEN_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'DOC_TYPE',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        }
                    },
                    mbEventParts: {
                        CHECK_COMM_PA: {},
                        FLOAT_PA: {
                            ACCT_STRUCT_FLAG: {
                                eventType: 'OPEN_RB101',
                                assembleId: 'FLOAT_PA',
                                attrKey: 'ACCT_STRUCT_FLAG',
                                attrValue: '1'
                            }
                        },
                        BAL_PA: {},
                        PROD_DATE_PA: {
                            ACCT_STRUCT_FLAG: {
                                eventType: 'OPEN_RB101',
                                assembleId: 'PROD_DATE_PA',
                                attrKey: 'ACCT_STRUCT_FLAG',
                                attrValue: '1'
                            }
                        },
                        GRACE_PA: {},
                        CHECK_INIT_AMT_PA: {},
                        CCY_PA: {},
                        DOC_PA: {},
                        CLIENT_PA: {}
                    }
                },

                CLOSE_RB101: {
                    mbEventType: {
                        eventType: 'CLOSE_RB101',
                        eventDesc: '个人活期存款销户',
                        eventClass: 'CLOSE',
                        processMethod: 'C',
                        status: 'A',
                        isStandard: 'N',
                        company: 'DCITS'
                    },
                    mbEventAttrs: {
                        DOC_TYPE: {
                            eventType: 'CLOSE_RB101',
                            seqNo: '6',
                            assembleType: 'ATTR',
                            assembleId: 'DOC_TYPE',
                            attrValue: '101',
                            assembleRule: 'F'
                        },
                        CHECK_SIGN: {
                            eventType: 'CLOSE_RB101',
                            seqNo: '4',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_SIGN',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        CHECK_AGENT: {
                            eventType: 'CLOSE_RB101',
                            seqNo: '5',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_AGENT',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        },
                        CHECK_RESTRAINT: {
                            eventType: 'CLOSE_RB101',
                            seqNo: '2',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_RESTRAINT',
                            attrValue: 'Y',
                            assembleRule: 'A'
                        },
                        CHECK_CLOSE_FEE: {
                            eventType: 'CLOSE_RB101',
                            seqNo: '3',
                            assembleType: 'ATTR',
                            assembleId: 'CHECK_CLOSE_FEE',
                            attrValue: 'Y',
                            assembleRule: 'F'
                        }
                    },
                    mbEventParts: {
                        CHECK_ACCT_STATUS_PA: {}
                    }
                }
            }
        }
    })
}