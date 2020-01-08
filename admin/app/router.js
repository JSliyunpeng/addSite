'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checktoken = app.middleware.checktoken();
  router.get('/', controller.home.index);
  router.get('/login', controller.user.login)//登录
  router.get('/h5/user/view',checktoken, controller.user.userView)//获取用户信息
  router.get('/h5/view', checktoken, controller.user.view)
  router.get('/h5/getListByCube', controller.user.getListByCube)//获取城市信息
  router.get('/h5/getYoulaiCompany', controller.user.getYoulaiCompany)//获取游莱汇列表
  router.get('/h5/createCode', controller.user.createCode)//获取游莱汇列表
  router.get('/h5/resset', checktoken, controller.user.resset)
  router.get('/h5/youlaYi/list', controller.user.youlaiList)//获取游莱驿列表
  router.get('/h5/youlaYi/view', controller.user.youlaiyiView)//获取游莱驿详情

  router.post('/register', controller.user.register)//注册
  router.post('/h5/addYoulaiBaseInfo', controller.user.addYoulaiBaseInfo)//添加游莱驿
  router.post('/h5/youlaYi/update', controller.user.youlaiyiUpdate)//修改营地基础信息

  app.router.get('/ajax', app.controller.ajax.show);
  app.router.post('/ajax', app.controller.ajax.upload);

};
