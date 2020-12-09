import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchDepth() {
      let res = await fetch(
        "https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=5"
      );
      return res.json();
    }
  },
  getters: {
    
  }
  modules: {}
});
