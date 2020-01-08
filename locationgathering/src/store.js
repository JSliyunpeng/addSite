import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map: null,
    AMap:null,
    mapMiniCard:false,
    tabbarActiveIndex: 0,
    toptabbarActiveIndex: 0,
    mapObj: null,
    locationNearObj: [],
    lnglat: [],
    mapshow: false,
    token: window.sessionStorage.getItem('token'),
    // token: '自定义token',
    username: '',
    imgUrl: {
      mentouImg: [],
      outdoorImg: [],
      zhusuImg: [],
      meishiImg: [],
      peitaoImg: [],
      yuleImg: []
    },
    mentouImg: null,
    outdoorImg: null,
    positionImg: {},
    flag: false,
    ListType: '全部',
    startLngLat: []
  },
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
    mentouImg: state => state.mentouImg,
    outdoorImg: state => state.outdoorImg,
    positionImg: state => state.positionImg,
    // mapMiniCard: state => {
    //   console.log('mapMiniCard')
    //   state.mapMiniCard =!state.mapMiniCard
    // },
  },
  mutations: {
    mapMiniCard(state,data){
      state.mapMiniCard=data
    },
    setAmap(state,data){
      state.AMap = data
    },
    startLngLat(state, data) {
      state.startLngLat = data
    },
    ListType(state, data) {
      state.listType = data
    },
    positionImg(state, data) {
      state.flag = true
      state.imgUrl[typeStr] = state.imgUrl[typeStr].concat(data)
    },
    getLocation(state, data) {
      state.mapObj = data // 地图坐标数据
      if (state.mapObj) {
        state.mapshow = true
      }
    },
    lnglat(state, data) {
      state.lnglat = data
    },
    getLocationNear(state, data) {
      state.locationNearObj.splice(0,state.locationNearObj.length)
      data.poiList.pois.forEach(da => {state.locationNearObj.push(da)})
    },
    tabbarActive(state, data) {
      state.tabbarActiveIndex = data
    },
    toptabbarActiveIndex(state, data) {
      state.toptabbarActiveIndex = data
    },
    selectPositionOk(state, data) {
      state.position = data
    },

    LOGIN: (state, data) => {
      //更改token的值
      state.token = data;
      window.sessionStorage.setItem('token', data);
    },

    LOGOUT: (state) => {
      //登出的时候要清除token
      state.token = null;
      window.sessionStorage.removeItem('token');
    },

    USERNAME: (state, data) => {
      //把用户名存起来
      state.username = data;
      window.sessionStorage.setItem('username', data);
    }
  },
  actions: {
    Login({ commit }, data) {
      commit('LOGIN', data);
    },
    setAmap({commit},data){
      console.log(data)
      commit("setAmap",data)
    },
    UserLogout({
                 commit
               }) {
      commit('LOGOUT');
    },

    UserName({
               commit
             }, data) {
      commit('USERNAME', data);
    },
    getLocationNearSync(context, data) {
      context.commit('getLocationNear', data)
    }
  }
})
