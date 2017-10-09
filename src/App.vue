<template>
  <div id="app">
    <!-- <m-header></m-header>
    <tab></tab> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <player></player> -->
    <main-mask></main-mask>
  </div>
</template>

<script type="text/javascript">
  // import MHeader from 'components/m-header/m-header'
  // import Player from 'components/player/player'
  // import Tab from 'components/tab/tab'
  import MainMask from 'components/main-mask/main-mask'

  export default {
    // components: {
    //   MHeader,
    //   Tab,
    //   Player
    // }
    components: {
      MainMask
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>