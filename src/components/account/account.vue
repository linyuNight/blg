<template>
  <!-- <transition name="slide"> -->
  <div class="account" ref="account">
    <div class="account-top">
      <div class="account-avator-bg">
        <div class="account-avator"></div>
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
      <div class="youhuiquan-item" v-for="youhuiquan in youhuiquanList" @click="select(youhuiquan)">
        <div class="youhuiquan-item-left">
          <div class="left-top">
            <span class="left-small">￥</span><span class="left-num">{{youhuiquan.ParValue}}</span>
          </div>
          <div class="left-bottom">满￥{{youhuiquan.BalanceRequired}}可用</div>
        </div>
        <div class="youhuiquan-item-right">
          <div class="right-title">便利格福利券</div>
          <div class="right-time">{{youhuiquan.ValidDate}}</div>
          <div class="right-text">全场通用，任意买买买</div>
        </div>
      </div>
      <div class="youhuiquan-more">点击加载更多</div>
    </div>
    <div v-show="!left" class="order-list">
      <router-link tag="div" class="order-item" to="/orderDetail" v-for="order in orderList">
        <div class="order-item-top">
          <div class="order-item-top-left">
            <!-- <span class="order-item-top-left-day">2017.12.3</span><span class="order-item-top-left-time">16:23</span> -->
            <span class="order-item-top-left-day">{{order.CreateDate}}</span>
          </div>
          <div class="order-item-top-right">
            <span class="order-item-top-right-small">￥</span><span class="order-item-top-right-price">{{ order.OrderGoodsList | caculatePrice }}</span>
          </div>
        </div>
        <div class="order-item-bottom">
          <div class="order-item-bottom-left">
            <div class="order-item-goods-list">
              <div class="order-item-goods-item" v-for="goods in order.OrderGoodsList"></div>
            </div>
          </div>
          <div class="order-item-bottom-right">共{{ order.OrderGoodsList | caculateNum }}件</div>
        </div>
      </router-link>
      <div class="order-more">点击加载更多</div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {url} from 'api/config'

  export default {
    data() {
      return {
        left:true,
        youhuiquanList: [],
        orderList: [],
        user: {}
      }
    },
    created(){
      this.left = true
      axios.get(url + '/youhuiquan')
      .then(res => {
        this.youhuiquanList = res.data.Data.CouponsInfoList
      })
      .catch(err => {
        console.log(err)
      });
      axios.get(url + '/order')
      .then(res => {
        this.orderList = res.data.Data.OrderInfoList
      })
      .catch(err => {
        console.log(err)
      });
      axios.get(url + '/user')
      .then(res => {
        this.user = res.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    activated() {
      this.left = true
    },
    filters: {
      caculatePrice:function (goods) {
        let sum = 0
        for(let i=0;i<goods.length;i++){
          sum += goods[i].GoodsPrice
        }
        return sum
      },
      caculateNum:function (goods) {
        return goods.length
      }
    },
    methods: {
      youhuiquan(){
        this.left = true
      },
      order(){
        this.left = false
      },
      calculatePrice(goods){
        let sum = 0
        for(let i=0;i<goods.length;i++){
          sum += goods[i].GoodsPrice
        }
        console.log(goods)
        return sum
      },
      select(youhui){
        this.$store.state.youhui_select = youhui
        this.$router.push({path:'/goodsShow'})
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
    position:fixed;
    top:0
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    z-index:100;
    overflow:scroll;
    -webkit-overflow-scrolling : touch;
    background:#f3f5f9;
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
          background-color:#ffc;
          border-radius:50%;
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
      .youhuiquan-more{
        width:100%;
        text-align: center;
        color:#444;
        margin-bottom:48px;
      }
    }
    .order-list{
      width:100%;
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
          border-bottom:1px solid #e8e8e8;
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
            float:left;
            .order-item-goods-list{
              padding-top:7px;
              .order-item-goods-item{
                float:left;
                width:50px;
                height:50px;
                background:#ccc;
                margin-left:7px;
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
      .order-more{
        width:100%;
        text-align: center;
        color:#444;
        margin-bottom:48px;
      }
    }
  }
</style>