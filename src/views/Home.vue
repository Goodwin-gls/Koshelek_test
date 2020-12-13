<template>
  <div>
    <table>
      <caption>
        bids
      </caption>
      <thead class="thead">
        <tr>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of bids" :key="index">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[0] * item[1] }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <caption>
        asks
      </caption>
      <thead class="thead">
        <tr>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of asks" :key="index">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[0] * item[1] }}</td>
        </tr>
      </tbody>
    </table>
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
      console.log(dataJson);
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
