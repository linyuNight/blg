<template>
  <!-- <transition name="slide"> -->
  <div class="account">
    <div class="account-contain">
      <div class="account-top">
        <div class="account-avator-bg">
          <div class="account-avator" :style="{backgroundImage: 'url('+user.HeadImgUrl+')'}"></div>
        </div>
        <div class="account-name">{{user.NickName}}</div>
      </div>
      <div class="account-tap">
        <div class="youhuiquan" @click="youhuiquan" :class="{active: left}">
          优惠券
          <div class="tap-bottom"></div>
        </div>
        <div class="order" @click="order" :class="{active: !left}">
          订单
          <div class="tap-bottom"></div>
        </div>
      </div>
      <div v-show="left" class="youhuiquan-list">
        <div class="youhuiquan-item" v-for="youhuiquan in youhuiquanList">
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
      <div v-show="!left" class="order-list">
        <div class="order-item" v-for="order in orderList" :key="order.OrderCode" @click="selectOrder(order.OrderCode)">
          <div class="order-item-top">
            <div class="order-item-top-left">
              <span class="order-item-top-left-day">{{order.CreateDate}}</span>
            </div>
            <div class="order-item-top-right">
              <span class="order-item-top-right-small">￥</span><span class="order-item-top-right-price">{{ order.OrderGoodsList | caculatePrice }}</span>
            </div>
          </div>
          <div class="order-item-bottom">
            <div class="order-item-bottom-left">
              <div class="order-item-goods-list">
                <div class="order-item-goods-item" v-for="(goods,index) in order.OrderGoodsList" v-if="index<5" :style="{backgroundImage: 'url('+goods.GoodsImg[0].ImgUrl+')'}"></div>
              </div>
            </div>
            <div class="order-item-bottom-right">共{{ order.OrderGoodsList | caculateNum }}件</div>
          </div>
        </div>
        <div class="order-more-contain">
          <div class="order-more" @click="loadOrder" v-show="isShowOrderMore">点击加载更多</div>
        </div>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {url,urlapi} from 'api/config'
  import {accAdd,accSub,accMul,accDiv} from 'huaji-calculate'

  export default {
    data() {
      return {
        left:true,
        youhuiquanList: [],
        orderList: [],
        youhuiIndex: 0,
        orderIndex: 0,
        isShowYouhuiMore: false,
        isShowOrderMore: false,
      }
    },
    created(){
      this._initYouhui()
      this._initOrder()
    },
    filters: {
      caculatePrice:function (goods) {
        let sum = 0
        for(let i=0;i<goods.length;i++){
          sum = accAdd(accMul(goods[i].GoodsPrice,goods[i].Qty),sum)
        }
        return sum
      },
      caculateNum:function (goods) {
        let num = 0
        for(let i=0;i<goods.length;i++){
          num = accAdd(goods[i].Qty,num)
        }
        return num
      }
    },
    methods: {
      _initYouhui(){
        axios.get(urlapi + 'GetMyCoupons?ThirdId=' + this.user.OpenId + '&DataType=' + 1 + '&PageIndex=' + 1 + '&PageSize=' + 10)
        // axios.get(url + '/youhuiquan')
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
      _initOrder(){
        axios.get(urlapi + 'GetOrderList?ThirdId=' + this.user.OpenId + '&DataType=' + 1 + '&PageIndex=' + 1 + '&PageSize=' + 10)
        // axios.get(url + '/order')
        .then(res => {
          this.orderList = res.data.Data.OrderInfoList
          this.orderIndex = ++res.data.Data.PageIndex
          if(res.data.Data.DataCount > this.orderList.length){
            this.isShowOrderMore = true
          }else{
            this.isShowOrderMore = false
          }
        })
        .catch(err => {
          console.log(err)
        });
      },
      loadYouhui(){
        this.isShowYouhuiMore = false
        axios.get(urlapi + 'GetMyCoupons?ThirdId=' + this.user.OpenId + '&DataType=' + 1 + '&PageIndex=' + this.youhuiIndex + '&PageSize=' + 10)
        // axios.get(url + '/youhuiquan')
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
      loadOrder(){
        this.isShowOrderMore = false
        axios.get(urlapi + 'GetOrderList?ThirdId=' + this.user.OpenId + '&DataType=' + 1 + '&PageIndex=' + this.orderIndex + '&PageSize=' + 10)
        // axios.get(url + '/order')
        .then(res => {
          this.orderList = this.orderList.concat(res.data.Data.OrderInfoList)
          this.orderIndex = ++res.data.Data.PageIndex
          if(res.data.Data.DataCount > this.orderList.length){
            this.isShowOrderMore = true
          }else{
            this.isShowOrderMore = false
          }
        })
        .catch(err => {
          console.log(err)
        });
      },
      youhuiquan(){
        this.youhuiquanList = []
        this.youhuiIndex = 0
        this.left = true
        this._initYouhui()
      },
      order(){
        this.orderList = []
        this.orderIndex = 0
        this.left = false
        this._initOrder()
      },
      selectOrder(orderCode){
        localStorage.setItem("orderCode", orderCode);
        this.$router.push({path:'/orderDetail'})
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
  @import "~common/stylus/mixin"
  
  $yellow=#fdd953;
  $red=#e84e40;
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .account{
    // position:fixed;
    position:absolute;
    top:0
    left:0;
    right:0;
    bottom:0;
    width:100%;
    // height:100%;
    z-index:100;
    // overflow:scroll;
    // -webkit-overflow-scrolling : touch;
    background:#f3f5f9;
    .account-contain{
      width:100%;
      height:auto;
      // background:#f3f5f9;
      // overflow:scroll;
      // -webkit-overflow-scrolling : touch;
      .account-top{
        width:100%;
        height:155px;
        padding-top:22px;
        background:#fff;
        .account-avator-bg{
          padding-top:3px;
          width:66px;
          height:66px;
          margin:0 auto;
          background:url(../../common/image/head@2x.png);
          background-size:100%;
          .account-avator{
            margin:0 auto;
            width:60px;
            height:60px;
            border-radius:30px;
            background-size:contain;
            background-position:center;
          }
        }
        .account-name{
          width:100%;
          height:42px;
          line-height: 42px;
          text-align: center;
          font-size: 16px;
          color:#000;
        }
      }
      .account-tap{
        width:100%;
        padding:0 50px;
        height:35px;
        background:#fff;
        .youhuiquan{
          position:relative;
          float:left;
          width:50%;
          height:35px;
          line-height:35px;
          font-size: 14px;
          color:#444;
          text-align: center;
        }
        .order{
          position:relative;
          float:left;
          width:50%;
          height:35px;
          line-height:35px;
          font-size: 14px;
          color:#444;
          text-align: center;
        }
        .tap-bottom{
          display: none;
          position:absolute;
          left:50%;
          bottom:0;
          margin-left:-12px;
          width:25px;
          height:2px;
          background-color:#ffce1e;
          border-radius:1px;
        }
        .active{
          color:#000;
          & .tap-bottom{
            display: block;
          }
        }
      }
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
      .order-list{
        width:100%;
        padding-bottom:2px;
        .order-item{
          padding:0 17px;
          margin:0 auto 15px;
          width:92%;
          height:100px;
          background:#fff;
          &:first-child{
            margin-top:13px;
          }
          .order-item-top{
            width:100%;
            height:35px;
            line-height: 35px;
            borderbottom-1px(#e8e8e8)
            .order-item-top-left{
              float:left;
              font-size: 13px;
              .order-item-top-left-day{
                margin-right:10px;
              }
              .order-item-top-left-time{

              }
            }
            .order-item-top-right{
              float:right;
              height:35px;
              line-height: 35px;
              color:#000;
              .order-item-top-right-small{
                font-size:12px;
                transform:scale(.8);
                transform-origin: 0 100%;
              }
              .order-item-top-right-price{
                font-size: 14px;

              }
            }
          }
          .order-item-bottom{
            width:100%;
            height:65px;
            line-height: 65px;
            .order-item-bottom-left{
              width:84%;
              height: 65px;
              overflow: hidden;
              float:left;
              .order-item-goods-list{
                padding-top:7px;
                .order-item-goods-item{
                  float:left;
                  width:50px;
                  height:50px;
                  background-size :cover;
                  background-position :center;
                  margin-left:7px;
                  margin-bottom:20px;
                }
              }
            }
            .order-item-bottom-right{
              float:right;
              text-align:right;
              font-size: 13px;
              color:#444;
            }
          }
        }
        .order-more-contain{
          width:100%;
          height:70px;
          .order-more{
            width:100%;
            text-align: center;
            color:#444;
          }
        }
      }
    }
  }
</style>