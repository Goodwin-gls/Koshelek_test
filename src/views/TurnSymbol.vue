<template>
  <form>
    <select v-model="currentSymbol">
      <option value="BNBBTC">BNBBTC</option>
      <option value="BTCUSDT">BTCUSDT</option>
      <option value="ETHBTC">ETHBTC</option>
    </select>
  </form>
</template>
<script>
export default {
  data: () => ({
    currentSymbol: "BNBBTC"
  }),
  watch: {
    currentSymbol() {
      this.$store.commit("setCurrentSymbol", this.currentSymbol);
    }
  }
};
</script>
