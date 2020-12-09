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
    bids: []
  }),
  async mounted() {
    let tableData = await this.$store.dispatch("fetchDepth");
    this.asks = tableData.asks.reverse();
    this.bids = tableData.bids.reverse();
  }
};
</script>
