import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSymbol: "BNBBTC",
    currentWs: null,
    limit: 20
  },
  mutations: {
    setCurrentSymbol(state, symbol) {
      state.currentSymbol = symbol;
    }
  },
  actions: {
    async fetchDepth({ state }) {
      let res = await fetch(
        `https://api.binance.com/api/v3/depth?symbol=${state.currentSymbol}&limit=${state.limit}`
      );
      return res.json();
    },
    async openWS({ getters }) {
      let ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${getters.symbolLowerCase}@depth`
      );
      return ws;
    }
  },
  getters: {
    symbolLowerCase: state => {
      return state.currentSymbol.toLowerCase();
    }
  },
  modules: {}
});
