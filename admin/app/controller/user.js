'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
const pump = require('mz-modules/pump');
const fs = require('fs');
const path = require('path');

class UserController extends Controller {
    async register() {
        const ctx = this.ctx;
        const user = ctx.request.body;
        ctx.body = await ctx.service.user.register(user)
    }
    async login() {
        const ctx = this.ctx;
        const user = ctx.query;
        ctx.body = await ctx.service.user.login(user)
    }
    async view() {
        const ctx = this.ctx
        ctx.body = await ctx.service.user.view()
    }
    async userView() {
        const ctx = this.ctx
        ctx.body = await ctx.service.user.userView()
    }
    async getListByCube() {
        const ctx = this.ctx
        ctx.body = await ctx.service.user.getListByCube()
    }
    async getYoulaiCompany() {
        const ctx = this.ctx
        ctx.body = await ctx.service.user.getYoulaiCompany()
    }
    async createCode() {
        const ctx = this.ctx
        ctx.body = await ctx.service.user.createCode()
    }
    async addYoulaiBaseInfo() {
        const ctx = this.ctx
        const formData = ctx.request.body
        ctx.body = await ctx.service.user.addYoulaiBaseInfo(formData)
    }
    async youlaiList() {
        const ctx = this.ctx
        const queryData = ctx.query
        ctx.body = await ctx.service.user.youlaiList(queryData)
    }
    async youlaiyiView() {
        const ctx = this.ctx
        const queryData = ctx.query
        ctx.body = await ctx.service.user.youlaiyiView(queryData)
    }
    async youlaiyiUpdate() {
        const ctx = this.ctx
        const formData = ctx.request.body
        ctx.body = await ctx.service.user.youlaiyiUpdate(formData)
    }

    async resset() {
        this.ctx.body = {
            resset: 'resset',
            session: this.ctx.session.account
        }
    }
}


module.exports = UserController;
