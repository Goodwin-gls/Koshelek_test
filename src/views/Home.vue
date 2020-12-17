<template>
  <div class="tables">
    <div class="table-wrapper">
      <table class="table">
        <caption>
          bids
        </caption>
        <thead class="thead">
          <tr class="tr">
            <th class="th">Price</th>
            <th class="th">Amount</th>
            <th class="th mobile_hidden">Total</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr class="tr" v-for="(item, index) of bids" :key="index">
            <td class="td">{{ item[0] }}</td>
            <td class="td">{{ item[1] }}</td>
            <td class="td mobile_hidden">{{ item[0] * item[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <caption>
          asks
        </caption>
        <thead class="thead">
          <tr class="tr">
            <th class="th">Price</th>
            <th class="th">Amount</th>
            <th class="th mobile_hidden">Total</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr class="tr" v-for="(item, index) of asks" :key="index">
            <td class="th">{{ item[0] }}</td>
            <td class="th">{{ item[1] }}</td>
            <td class="th mobile_hidden">{{ item[0] * item[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data: () => ({
    asks: [],
    bids: [],
    ws: null,
    limit: null
  }),
  async mounted() {
    this.limit = this.$store.state.limit;
    let tableData = await this.$store.dispatch("fetchDepth");
    this.asks = tableData.asks;
    this.bids = tableData.bids;
    let ws = await this.$store.dispatch("openWS");
    this.ws = ws;
    ws.onmessage = event => {
      let data = event.data;
      let dataJson = JSON.parse(data);
      let newAsks = dataJson.a.filter(item => item[1] > 0);
      let newBids = dataJson.b.filter(item => item[1] > 0);
      if (newAsks.length >= this.limit) {
        newAsks.length = this.limit;
        this.asks = newAsks;
      } else {
        this.asks.length = this.limit - newAsks.length;
        this.asks = newAsks.concat(this.asks);
      }
      if (newBids.length >= this.limit) {
        newBids.length = this.limit;
        this.bids = newBids;
      } else {
        this.bids.length = this.limit - newBids.length;
        this.bids = newBids.concat(this.bids);
      }
    };
  },
  destroyed() {
    this.ws.close();
  }
};
</script>
<style lang="scss" scoped>
.tables {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.table-wrapper {
  width: 45%;
}
.table {
  height: 100%;
  border-collapse: collapse;
  border: 2px solid black;
  width: 100%;
  text-align: center;
}
.tbody {
  display: block;
  height: 400px;
  overflow-y: scroll;
}
.tbody::-webkit-scrollbar {
  width: 5px;
}
.tbody::-webkit-scrollbar-thumb {
  background-color: rgba($color: #000000, $alpha: 0);
  border-radius: 3px;
}
.tbody:hover::-webkit-scrollbar-thumb {
  background-color: rgba($color: #000000, $alpha: 1);
}
.tr {
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.th,
td {
  display: block;
  text-align: center;
  width: 33.33%;
}
@media screen and (max-width: 1170px) {
  .table-wrapper {
    width: 70%;
  }
  .table-wrapper + .table-wrapper {
    margin-top: 50px;
  }
}
@media screen and (max-width: 749px) {
  .mobile_hidden {
    display: none;
  }
  .table-wrapper {
    width: 80%;
  }
}
</style>
