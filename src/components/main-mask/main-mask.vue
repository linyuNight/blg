<template>
  <transition name="fade">
    <div class="main-mask" v-show="count">
      <div class="main-mask-contain">
        <div class="main-mask-content">{{content}}</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">

  export default {
    computed: {
      count () {
        return this.$store.state.isShowMask
      },
      content() {
        return this.$store.state.maskContent
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .main-mask{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.5);
    z-index:1000;
    display: flex;
    align-items: center;
    justify-content: center;
    .main-mask-contain{
      max-width:80%;
      .main-mask-content{
        background:rgba(0,0,0,.8);
        padding:10px 12px;
        border-radius:5px;
        color:#fff;
        font-size:16px;
      }
    }
  }
</style>