<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import LuffyHeader from '@/components/Common/LuffyHeader'
  export default {
    name: 'App',
    components: {
      LuffyHeader
    }
  }
</script>

<style>
  *{
    margin: 0;
  }
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 99.9%;
  } */
</style>