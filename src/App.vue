<template>
  <div id="app">
    <!-- <transition :name="direction" mode="out-in"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
    <main-mask></main-mask>
  </div>
</template>

<script type="text/javascript">
  import MainMask from 'components/main-mask/main-mask'

  export default {
    components: {
      MainMask
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>