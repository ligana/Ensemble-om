import request from '@/utils/request';

export function getProdInfo (params) {
  return request({
    url: '/prod/info',
    method: 'get',
    params
  });
}
export function getDepositProdInfo (params) {
  return request({
    url: '/prod/deposit',
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
  return request({
    url: '/prod/getDiffProd',
    method: 'get',
    params
  });
}
export function getDiffList (params) {
  return request({
    url: '/prod/getDiffList',
    method: 'get',
    params
  });
}

export function getProdData (params) {
  let methods = 'null';
  if (params === '111001') {
    methods = 'get';
  }
  if (params !== '111001') {
    methods = 'get1';
  }
  return request({
    url: '/data/info',
    method: methods,
    params
  });
}
export function getProdType (params) {
  return request({
    url: '/prod/getProdType',
    method: 'get',
    params
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