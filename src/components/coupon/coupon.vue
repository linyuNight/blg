<template>
  <!-- <transition name="slide"> -->
  <div class="account">
    <div class="youhuiquan-list">
      <div class="youhuiquan-item" v-for="youhuiquan in youhuiquanList" @click="select(youhuiquan)">
        <div class="youhuiquan-item-left">
          <div class="left-top">
            <span class="left-small">￥</span><span class="left-num">{{youhuiquan.ParValue}}</span>
          </div>
          <div class="left-bottom">满￥{{youhuiquan.BalanceRequired}}可用</div>
        </div>
        <div class="youhuiquan-item-right">
          <div class="right-title">{{youhuiquan.CouponsNum}}</div>
          <div class="right-time">{{youhuiquan.ValidDate}}</div>
          <div class="right-text">{{youhuiquan.UseDesc}}</div>
        </div>
      </div>
      <div class="youhuiquan-more-contain">
        <div class="youhuiquan-more" @click="loadYouhui" v-show="isShowYouhuiMore">点击加载更多</div>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {url,urlapi} from 'api/config'
  import {accAdd,accSub,accMul,accDiv} from 'api/calculate'
  // import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        youhuiquanList: [],
        youhuiIndex: 0,
        isShowYouhuiMore: false,
      }
    },
    activated() {
      this.youhuiquanList = []
      this.youhuiIndex = 0
      axios.get(urlapi + 'GetSelectCoupons?ThirdId=' + this.user.OpenId + '&ShelfCode=' + this.$store.state.shelfCode + '&DataType=' + 1 + '&PageIndex=' + 1 + '&PageSize=' + 10)
      // axios.get(url + '/youhuiquanselect')
      .then(res => {
        this.youhuiquanList = res.data.Data.CouponsInfoList
        this.youhuiIndex = ++res.data.Data.PageIndex
        if(res.data.Data.DataCount > this.youhuiquanList.length){
          this.isShowYouhuiMore = true
        }else{
          this.isShowYouhuiMore = false
        }
      })
    },
    methods: {
      loadYouhui(){
        this.isShowYouhuiMore = false
        axios.get(urlapi + 'GetSelectCoupons?ThirdId=' + this.user.OpenId + '&ShelfCode=' + this.$store.state.shelfCode + '&DataType=' + 1 + '&PageIndex=' + this.youhuiIndex + '&PageSize=' + 10)
        // axios.get(url + '/youhuiquanselect')
        .then(res => {
          this.youhuiquanList = this.youhuiquanList.concat(res.data.Data.CouponsInfoList)
          this.youhuiIndex = ++res.data.Data.PageIndex
          if(res.data.Data.DataCount > this.youhuiquanList.length){
            this.isShowYouhuiMore = true
          }else{
            this.isShowYouhuiMore = false
          }
        })
        .catch(err => {
          console.log(err)
        });
      },
      select(youhui){
        this.$store.state.youhui_select = youhui
        this.$router.push({path:'/goodsShow'})
        this.$store.state.isSelect = true
      }
    },
    computed: {
      user () {
        if(this.$store.state.user){
          return this.$store.state.user
        }else{
          return {
            HeadImgUrl:"",
            NickName:"",
            OpenId:""
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $yellow=#fdd953;
  $red=#e84e40;
  
  // .slide-enter-active, .slide-leave-active
  //   transition: all 0.3s

  // .slide-enter, .slide-leave-to
  //   transform: translate3d(100%, 0, 0)

  .account{
    // position:fixed;
    // top:0
    // left:0;
    // right:0;
    // bottom:0;
    width:100%;
    // height:100%;
    z-index:100;
    overflow:scroll;
    -webkit-overflow-scrolling : touch;
    background:#f3f5f9;
    .youhuiquan-list{
      width:100%;
      padding-bottom:2px;
      .youhuiquan-item{
        margin:0 auto 15px;
        width:92%;
        height:100px;
        background:#fff;
        padding-left:10px;
        padding-top:10px;
        border-radius:2px;
        &:first-child{
          margin-top:13px;
        }
        .youhuiquan-item-left{
          float:left;
          width:46%;
          .left-top{
            width:100%;
            text-align: center;
            color:$red;
            margin-bottom:4px;
            .left-small{
              font-size: 15px;
            }
            .left-num{
              font-size: 36px;
            }
          }
          .left-bottom{
            width:100%;
            text-align: center;
            font-size: 12px;
            color:#000;
            color:#444;
          }
        }
        .youhuiquan-item-right{
          float:left;
          width:48%;
          padding-top:6px;
          .right-title{
            font-size: 16px;
            color:#000;
            margin-bottom:4px;
          }
          .right-time{
            font-size: 12px;
            color:#444444;
            margin-bottom:4px;
          }
          .right-text{
            font-size: 12px;
            color:#444444;
          }
        }
      }
      .youhuiquan-more-contain{
        width:100%;
        height:70px;
        .youhuiquan-more{
          width:100%;
          text-align: center;
          color:#444;
        }
      }
    }
  }
</style>