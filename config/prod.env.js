'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    MOCK_SWITCH: '"off"',
    BASE_API: '"http://10.7.25.201:8004/"'
})
