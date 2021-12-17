<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
  import LuffyHeader from '@/components/Common/LuffyHeader'
  export default {
    name: 'App',
    components: {
      LuffyHeader
    },
    provide(){
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive : true
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
          
        })
      }
    },
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