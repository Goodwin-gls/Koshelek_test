<template>
  <div id="app">
    <div id="nav">
      <router-link class="link" to="/" active-class="active" exact
        >Таблица</router-link
      >
      <router-link class="link" active-class="active" to="/turn-symbol"
        >Выбрать symbol</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.link {
  color: blue;
  margin-left: 30px;
}
.active {
  color: red;
}
</style>
