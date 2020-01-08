function EXPaccount(rule, value, callback) {
    const EXPaccount = /^[a-zA-Z0-9]{5, 13}$/
    if (!EXPaccount.test(value)) {
        return callback(new Error('使用6-12位（字母或数字）作为账号名'));
    }
}
function EXPphone(rule, value, callback) {
    const TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    if (!TEL_REGEXP.test(value)) {
        return callback(new Error('请输入正确的手机号'));
    }
}
