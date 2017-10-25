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
    },
    // computed: {

    //   direction () {
    //     const viewDir = this.$store.state.viewDirection
    //     let tranName = ''

    //     if (viewDir === 'left') {
    //       tranName = 'view-out'
    //     } else if (viewDir === 'right') {
    //       tranName = 'view-in'
    //     } else {
    //       tranName = 'fade'
    //     }

    //     return tranName
    //   },
    // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>