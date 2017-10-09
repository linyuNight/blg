<template>
  <transition name="fade">
    <div class="main-mask" v-show="isShowMask">
      <div class="main-mask-contain">
        <div class="main-mask-content">{{content}}</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">

  export default {
    data() {
      return {
        isShowMask: false,
        content:'请选择商品'
      }
    },
    created() {
      this.isShowMask = this.$store.state.isShowMask
    },
    activated() {
      console.log(1)
    },
    methods:{

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
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
    background:rgba(0,0,0,.7);
    z-index:20;
    .main-mask-contain{
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      .main-mask-content{
        background:rgba(0,0,0,.8);
        padding:5px 20px;
        border-radius:5px;
        color:#999;
        font-size:14px;
      }
    }
  }
</style>