const Service = require('egg').Service
const utility = require('utility')
const jwt = require('jsonwebtoken')

class UserSerevice extends Service {
    // 注册
    async register(user) {
        const ctx = this.ctx
        const userName = await this.app.mysql.get('user', { name: user.name })//用户名
        const account = await this.app.mysql.get('user', { account: user.account })//账号

        if (userName) {//验证用户名
            return ctx.messageText(500, '用户名已存在，请更换用户名后重试！')

        } else if (account) {//验证账号
            return ctx.messageText(500, '该账号已注册，请更换登录账号！')
        } else {//写入数据库
            if (ctx.accountEXP(user.account)) {//验证账号格式
                delete user.verificationCode
                
                const bankId = await this.app.mysql.query('select max(bankId) from `user`')//邀请码
                user.bankId = ++bankId[0]['max(bankId)']//生成邀请码
                user.password = utility.md5(user.password)
                const insertUser = await this.app.mysql.insert('user', user)
                return insertUser.affectedRows == 1 ? ctx.messageText(200, '账号保存成功。') : '账号保存失败，请重试！'
            } else {
                return ctx.messageText(500, '账号格式不正确')
            }

        }
    }
    // 登录
    async login(user) {
        const userName = await this.app.mysql.get('user', { account: user.account });
        if (!userName) {
            let message = {
                code: 500,
                message: '用户不存在，请确认您的账号！',
                aaa: userName
            }
            return this.ctx.messageText(message)
        } else if (userName) {
            if (utility.md5(user.password) == userName.password) {
                // this.ctx.session.account = user.account
                let token = this.app.jwt.sign({
                    account: user.account,
                    password: user.password,
                }, 'lh', {
                    expiresIn: '1d' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
                })
                const userView = await this.app.mysql.get('user', { account: user.account });
                delete user.password
                let message = {
                    code: 200,
                    message: '登陆成功！',
                    token: token,
                    data: userView
                }
                return this.ctx.messageTokenText(message)
            } else {
                let message = {
                    code: 500,
                    message: '密码错误，请确认您的密码！'
                }
                return this.ctx.messageTokenText(message)
            }
        } else {
            return ctx.messageText(500, '未知错误，请联系管路员！')
        }
    }
    async view() {
        const authorization = this.ctx.request.header['authorization']
        const decoded = jwt.verify(authorization, 'lh');
        const user = await this.app.mysql.get('user', { account: decoded.account });
        delete user.password
        return user
    }
    // 获取用户信息
    async userView() {
        const authorization = this.ctx.request.header['authorization']
        const decoded = jwt.verify(authorization, 'lh');
        const user = await this.app.mysql.get('user', { account: decoded.account });
        delete user.password
        return user
    }
    // 获取城市信息
    async getListByCube() {
        const provinces = await this.app.mysql.select('provinces')
        const citys = await this.app.mysql.select('cities')
        const areas = await this.app.mysql.select('areas')
        return { provinces: provinces, citys: citys, areas: areas }
    }
    // 获取游莱汇列表
    async getYoulaiCompany() {
        const youlaihuiList = await this.app.mysql.select('youlaihui')
        return youlaihuiList
    }
    // 生成公司编号
    async createCode() {
        let createCode = []
        for (let i = 0; i < 12; i++) {
            let ranNum = Math.ceil(Math.random() * 25)
            createCode.push(String.fromCharCode(65 + ranNum))
        }
        return createCode.join('')
    }
    async addYoulaiBaseInfo(formData) {
        const ctx = this.ctx
        if(formData.mid) {
            const isMid = this.app.mysql.get('youlaiyi',{mid:formData.mid})
            return insertFormData.affectedRows == 1 ? ctx.messageText(200, '账号保存成功。', { mid: formData.mid }) : ctx.messageText(500, '账号保存失败，请重试！')
            
        }
        if (formData.youlaitType == 2) {
            const mid = await this.app.mysql.query('select max(mid) from `youlaiyi`')//邀请码
            formData.mid = ++mid[0]['max(mid)']//生成邀请码
            const insertFormData = await this.app.mysql.insert('youlaiyi', formData)
            return insertFormData.affectedRows == 1 ? ctx.messageText(200, '账号保存成功。', { mid: formData.mid }) : ctx.messageText(500, '账号保存失败，请重试！')
        } else if (formData.youlaitType == 3) {
            const insertFormData = await this.app.mysql.insert('youlaijia', formData)
            return insertFormData.affectedRows == 1 ? ctx.messageText(200, '账号保存成功。') : ctx.messageText(500, '账号保存失败，请重试！')
        } else {
            return ctx.messageText(500, '保存失败请重试！')
        }
    }
    // 获取游莱驿，游莱家列表   youlaitType：2 游莱驿，3 游莱家
    async youlaiList(queryData) {
        const ctx = this.ctx
        let youlaiyilist = []
        let condtion = JSON.parse(queryData.condtion)
        let limit = parseInt(queryData.limit)
        let offset = parseInt(queryData.page) * parseInt(queryData.limit) - parseInt(queryData.limit)
        if (condtion.isMyYoulai) {
            let token = ctx.request.header['authorization'];
            let decoded = jwt.verify(token, 'lh');
            console.log(decoded.account )
            let user = await this.app.mysql.get('user', { account: decoded.account })
            if (queryData.youlaitType == 2) {
                youlaiyilist = await this.app.mysql.select('youlaiyi', {
                    where: { youlaitType: 2, createBy: user.bankId },
                    orders: [['id', 'desc']], // 排序方式
                    limit: limit,
                    offset: offset
                })
                return youlaiyilist
            } else if (queryData.youlaitType == 3) {
                youlaiyilist = await this.app.mysql.select('youlaiyi', {
                    where: { youlaitType: 3, createBy: user.bankId },
                    orders: [['id', 'desc']], // 排序方式
                    limit: limit,
                    offset: offset
                })
                return youlaiyilist
            } else {
                youlaiyilist = await this.app.mysql.select('youlaiyi', {
                    orders: [['id', 'desc']], // 排序方式
                    limit: limit,
                    offset: offset
                })
                return youlaiyilist
            }
        } else {
            if (condtion.tab && condtion.city) {
                return await this.app.mysql.query('SELECT * FROM youlaiyi where locate(' + "'" + condtion.tab + "'" + ',tabnames) and companyCity=' + condtion.city + 'order by id desc limit' + offset + ',' + limit + ';')

            } else if (condtion.tab && condtion.tab != '全部') {
                return await this.app.mysql.query('SELECT * FROM youlaiyi where locate(' + "'" + condtion.tab + "'" + ',tabnames)' + 'order by id desc limit ' + offset + ',' + limit + ';')
            } else if (condtion.city) {
                return await this.app.mysql.query('SELECT * FROM youlaiyi where companyCity=' + condtion.city + 'order by id desc limit ' + offset + ',' + limit + ';')
            }
            else if (condtion.likeName) {
                let likeName = condtion.likeName
                return await this.app.mysql.query('SELECT * FROM youlaiyi WHERE locate(' + "'" + likeName + "'" + ',tabnames) or locate( ' + "'" + likeName + "'" + ',companyName) or locate(' + "'" + likeName + "'" + ',regionView) OR locate(' + "'" + likeName + "'" + ',regionCompany) OR locate(' + "'" + likeName + "'" + ',name) OR locate(' + "'" + likeName + "'" + ',regionViews);')
            } else {
                return await this.app.mysql.select('youlaiyi', {
                    orders: [['id', 'desc']], // 排序方式
                    limit: limit,
                    offset: offset
                })
            }
        }
    }
    // 获取游莱驿，游莱家详情
    async youlaiyiView(queryData) {
        const ctx = this.ctx
        if (queryData.mid) {
            let youlaiyiView = await this.app.mysql.get('youlaiyi', { mid: queryData.mid })
            return youlaiyiView
        } else if (queryData.id) {
            let youlaiyiView = await this.app.mysql.get('youlaiyi', { id: queryData.id })
            return youlaiyiView
        }

        // delete youlaiyiView.signingTime
        // delete youlaiyiView.updateTime

    }
    // 更新游莱驿，游莱家
    async youlaiyiUpdate(formData) {
        const ctx = this.ctx
        // delete formData.signingTime
        const youlaiyiUpdate = await this.app.mysql.update('youlaiyi', formData)
        if (youlaiyiUpdate.affectedRows === 1) {
            return await this.app.mysql.get('youlaiyi', { id: formData.id })
        } else {
            return ctx.messageText(500, '账号保存失败，请重试！')
        }
    }
}

module.exports = UserSerevice;