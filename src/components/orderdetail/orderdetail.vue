<template>
  <!-- <transition name="slide"> -->
    <div class="detail">
      <div>
        <div class="detail-top">
          <div class="detail-shiji"><span class="detail-shiji-left">实际支付:</span><span class="detail-shiji-small">￥</span><span class="detail-shiji-price">{{orderDetail.TotalAmount}}</span></div>
          <div class="detail-youhui"><span class="detail-youhui-left">活动优惠</span><span class="detail-youhui-price">-{{orderDetail.CouAmt}}</span></div>
        </div>
        <div class="detail-title">
          <svg class="icon" aria-hidden="true" style="width:10px;height:42px;vertical-align: middle;">
            <use xlink:href="#icon-icon"></use>
          </svg>
          <span style="vertical-align: middle;font-size: 14px;margin:0 5px;">购物明细</span>
          <svg class="icon" aria-hidden="true" style="width:10px;height:42px;vertical-align: middle;">
            <use xlink:href="#icon-icon"></use>
          </svg>
        </div>
        <div class="detail-list">
          <div class="detail-item" v-for="goods in orderDetail.OrderGoodsList">
            <div class="detail-item-pic" :style="{backgroundImage: 'url('+goods.GoodsImg[0].ImgUrl+')'}"></div>
            <div class="detail-item-text">{{goods.GoodsName}}</div>
            <div class="detail-item-right">
              <div class="detail-item-num">{{goods.Qty}}份</div>
              <div class="detail-item-price"><span class="detail-item-price-left">￥</span><span class="detail-item-price-right">{{goods.TotalAmount}}</span></div>
            </div>
          </div>
          <!-- <div class="detail-more">点击加载更多</div> -->
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {url} from 'api/config'
  import {accAdd,accSub,accMul,accDiv} from 'api/calculate'

  export default {
    data() {
      return {
        orderDetail: [],
        detailScroll: {}
      }
    },
    activated() {
      axios.get('../api/AjaxAPI/GetOrderDetail?OrderCode=' + this.$store.state.orderCode)
      // axios.get(url + '/orderDetail')
      .then(res => {
        this.orderDetail = res.data.Data
      })
      .catch(err => {
        console.log(err)
      });
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

  .detail{
    // position:fixed;
    // top:0
    // left:0;
    // right:0;
    // bottom:0;
    width:100%;
    // height:100%;
    z-index:300;
    overflow:scroll;
    -webkit-overflow-scrolling : touch;
    background:#f3f5f9;
    .detail-top{
      width:100%;
      height:130px;
      padding-top:22px;
      background:#fff;
      .detail-shiji{
        margin-top: 10px;
        margin-bottom:10px;
        text-align: center;
        color:#000;
        .detail-shiji-left{
          font-size: 14px;
          margin-right:4px;
        }
        .detail-shiji-small{
          font-size: 14px;
        }
        .detail-shiji-price{
          font-size: 24px;
        }
      }
      .detail-youhui{
        text-align: center;
        .detail-youhui-left{
          font-size: 14px;
          color:#000;
          margin-right:4px;
        }
        .detail-youhui-price{
          font-size: 14px;
          color:$red;
        }
      }
    }
    .detail-title{
      width:100%;
      height:48px;
      line-height: 48px;
      text-align: center;
    }
    .detail-list{
      width:100%;
      padding-bottom:2px;
      .detail-item{
        margin:0 auto 15px;
        width:92%;
        height:65px;
        line-height: 65px;
        background:#fff;
        border-radius:2px;
        padding-left:8px;
        padding-right:18px;
        .detail-item-pic{
          float:left;
          width:50px;
          height:50px;
          margin-right:8px;
          margin-top: 7px;
          background-size:cover;
          background-position:center;
          background-repeat:no-repeat;
        }
        .detail-item-text{
          float:left;
          font-size: 13px;
        }
        .detail-item-right{
          float:right;
          .detail-item-num{
            float:left;
            font-size: 13px;
            margin-right:16px;
          }
          .detail-item-price{
            float:left;
            .detail-item-price-left{
              font-size: 12px;
              transform: scale(.8);
              transform-origin: 0 100%;
            }
            .detail-item-price-right{
              font-size: 14px;
            }
          }
        }
      }
      .detail-more{
        width:100%;
        text-align: center;
        color:#444;
        margin-bottom:48px;
      }
    }
  }
</style>