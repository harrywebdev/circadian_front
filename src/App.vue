<template>
  <h1>Log Circadian</h1>
  <router-view />
</template>

<script>
import { ACTION_INIT_STORE } from '@/store/action-types';

export default {
  name: 'App',

  beforeCreate() {
    try {
      this.$store.dispatch(ACTION_INIT_STORE);
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
body {
  background: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fefefe;
  margin-top: 60px;
}
</style>
