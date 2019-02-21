import Vue from 'vue';
import qcloud from 'wafer2-client-sdk';
import API from '@/store/flyio/apiUrl';
//登陆
function doLogin(callback){
  qcloud.setLoginUrl(API.loginUrl);
    const session = qcloud.Session.get();
    if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
            success: res => {
                callback(res);
            },
            fail: err => {
                console.log(err)
                Vue.iBox.showModal('登录错误', err.error)
            }
        })
    } else {
        // 首次登录
        qcloud.login({
            success: res => {
                callback(res);
            },
            fail: err => {
                console.log(err)
                Vue.iBox.showModal('登录错误',err.error);
            }
        })
    }
}

const state = {
  userInfo: {}
}

const mutations = {
  SETUSERINFO: (state,payload) => {
    const obj = state;
    obj.userInfo = payload.res;
  }
}

const actions = {
  getGlobalUserInfo ({
    commit
  },callback=()=>{}) {
    doLogin((res)=>{
      commit({
        type: 'SETUSERINFO',
        res
      })
      callback();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
