import Vue from 'vue'
const state = {
  Global: null
}

const mutations = {
  SETGLOBAL: (state,payload) => {
    const obj = state
    obj.Global = payload.Global;
  }
}

const actions = {
  setGlobal ({
    commit
  },Global) {
    wx.setNavigationBarColor(Global.NavigationBarColor);
    wx.hideNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: Global.NavigationBarTitle
    })
    commit({
      type: 'SETGLOBAL',
      Global
    })
  },
  decrement ({
    commit
  }) {
    commit('DECREMENT')
  },
  getProvince ({
    commit
  }, params = {}) {
    return Vue.iBox.http('globalUrl.getProvince', params)({
      method: 'get'
    }).then(res => {
      console.log('vuex中接口返回的提示：' + res.data.provinceShort)
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
