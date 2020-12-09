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
.link {
  color: blue;
}
.active {
  color: red;
}
</style>
