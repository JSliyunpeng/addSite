module.exports = {
    messageTokenText(data) {
        // this.status=code
        return data
    },
    accountEXP(name) {
        const exp = "^[a-zA-Z0-9]{6,12}$"
        ExpObj = new RegExp(exp)
        if (ExpObj.test(name)) {
            return true
        }
    },
    messageText(code, message,data) {
        // this.status=code
        return {
            code: code,
            message: message,
            data:data
        }
    }
};