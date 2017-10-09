<template>
  <div class="goods-show" ref="recommend">
    <div class="goods-show-title">
      <svg class="icon" aria-hidden="true" style="height:18px;margin-top:9px;width:100%;">
        <use xlink:href="#icon-logo"></use>
      </svg>
      <router-link tag="div" class="account-pic" to="/account"></router-link>
    </div>
    <div class="bigcontain">
      <div class="goods-list-box" v-for="goodsList in goodsBigList">
        <div class="goods-list-title">
          <svg class="icon" aria-hidden="true" style="width:10px;height:42px;vertical-align: middle;">
            <use xlink:href="#icon-icon"></use>
          </svg>
          <span style="vertical-align: middle;font-size: 14px;margin:0 5px;">{{goodsList.Level | changeLan}}层</span>
          <svg class="icon" aria-hidden="true" style="width:10px;height:42px;vertical-align: middle;">
            <use xlink:href="#icon-icon"></use>
          </svg>
        </div>
        <div class="goods-list-contain">
          <div class="goods-list-contain-col clear">
            <div class="list-goods" v-for="goods in goodsList.GoodsInfoList">
              <img class="goods-pic" src="../../common/image/img@2x.png">
              <div class="goods-name">{{goods.GoodsName}}</div>
              <div><div class="new-prise" :class="{redcolor: goods.GoodsPrice!=goods.GoodsDiscPrice}"><span class="new-prise-left">￥</span><span class="new-prise-right">{{goods.GoodsPrice}}</span></div><s class="old-prise" v-if="goods.GoodsPrice!=goods.GoodsDiscPrice">￥{{goods.GoodsDiscPrice}}</s><div class="plus-btn" @click="plusbtn(goods)"></div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="want-more-contain">
        <div class="want-more-btn" @click="showWant">还想吃啥？</div>
      </div>
    </div>
    <transition name="fade">
      <div class="main-goods-mask-bg" v-show="isShowMask" @click="hideShowMask">
        <div class="main-goods-mask">
          <div class="mask-goods-title">已选商品({{purchaseNum}})</div>
          <div class="mask-goods-list">
            <div class="mask-goods-item" v-for="purchasegoods in purchaseList">
              <div class="mask-goods-item-text">{{purchasegoods.GoodsName}}</div>
              <div class="mask-calculate">
                <div class="mask-small" :class="{redcolor: purchasegoods.GoodsPrice!=purchasegoods.GoodsDiscPrice}">￥</div>
                <div class="mask-new-price" :class="{redcolor: purchasegoods.GoodsPrice!=purchasegoods.GoodsDiscPrice}">{{purchasegoods.GoodsPrice}}</div>
                <s class="mask-old-price" v-if="purchasegoods.GoodsPrice!=purchasegoods.GoodsDiscPrice">￥{{purchasegoods.GoodsDiscPrice}}</s>
                <div class="mask-minus-btn" @click="minusbtn(purchasegoods)"></div>
                <div class="mask-num-text">{{purchasegoods.number}}</div>
                <div class="mask-plus-btn" @click="maskPlusbtn(purchasegoods)"></div>
              </div>
            </div>
            
          </div>
          <router-link tag="div" class="mask-youhuiquan" to="/account" v-if="isShowYouhui">
            <div class="mask-youhuiquan-left">选择优惠券</div>
            <div class="mask-youhuiquan-text" v-if="isShowYouhuiDetail">满{{youhuiquan.BalanceRequired}}减{{youhuiquan.ParValue}}</div>
            <div class="mask-youhuiquan-right"></div>
          </router-link>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="main-want-bg" v-show="isShowWant" @click="hideWantBg">
        <div class="want-contain">
          <div class="want-content">
            <div class="want-box">
              <div class="want-title">还想吃啥？</div>
              <div class="close-btn" @click="hideWant"></div>
              <textarea class="want-text-contain" placeholder="说说你想吃啥吧"></textarea>
              <div class="want-submit">提交</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="main-bottom">
      <div class="purchase-icon" :class="{duang: isDuang}" ref="purchase" @click="toShowMask">
      </div>
      <div class="purchase-goods-num" v-show="purchaseNum">{{purchaseNum}}</div>
      <div class="purchase-price">
        <div class="heji-contain"><span class="heji">合计：</span><span class="heji-small">￥</span><span class="heji-num">{{allPrice}}</span></div>
        <div class="jiesheng-price">已节省：￥{{allReduce}}</div>
      </div>
      <div class="price-btn" @click="showMainMask">结算</div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter"
        v-for="(ball,index) in balls">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {url} from 'api/config'

  export default {
    data() {
      return {
        isShowMask: false,
        isShowWant: false,
        isShowYouhui: false,
        isShowYouhuiDetail: false,
        isDuang: false,
        goodsBigList:[],
        purchaseList:[],
        purchaseNum:0,
        allPrice:0,
        allReduce:0,
        youhuiquan:{},
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: []
      }
    },
    created(){
      axios.get('../api/AjaxAPI/GetGoodsInfo?ShelfCode=A0001')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
      axios.get(url + '/goods')
      .then(res => {
        this.goodsBigList = res.data.Data.GoodsList
      })
      .catch(err => {
        console.log(err)
      });
      axios.get(url + '/youhuiquan')
      .then(res => {
        if(res.data.Data.CouponsInfoList.length != 0){
          this.isShowYouhui = true
        }
      })
      .catch(err => {
        console.log(err)
      });
    },
    activated() {
      this.youhuiquan = this.$store.state.youhui_select
      if(this.youhuiquan.CouponsNum != undefined){
        this.isShowYouhuiDetail = true
      }
    },
    filters: {
      changeLan:function (cen) {
        switch(cen){
          case 1:
            return '一'
            break
          case 2:
            return '二'
            break
          case 3:
            return '三'
            break
          case 4:
            return '四'
            break
          case 5:
            return '五'
            break
          case 6:
            return '六'
            break
          case 7:
            return '七'
            break
          case 8:
            return '八'
            break
          case 9:
            return '九'
            break
          case 10:
            return '十'
            break
          default:
            return ''
            break
        }
      }
    },
    methods:{
      showMainMask(){
        console.log(this.$store.state.isShowMask)
        this.$store.state.isShowMask = true
      },
      drop(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el.currentTarget
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        this.isDuang = true;
        let timer1 = setTimeout(() => {
          this.isDuang = false;
          clearTimeout(timer1)
        },500)
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toShowMask(){
        this.isShowMask = !this.isShowMask
      },
      hideShowMask(e){
        if(e.target.className == 'main-goods-mask-bg'){
          this.isShowMask = false
        }
      },
      plusbtn(goods){
        this.drop(window.event)
        this.add(goods)
      },
      maskPlusbtn(goods){
        this.add(goods)
      },
      add(goods){
        if(this.purchaseList.length==0){
          goods.number = 1;
          this.purchaseList.push(goods)
        }else{
          let hasGoods = false
          for(let i=0;i<this.purchaseList.length;i++){
            if(this.purchaseList[i].GoodsCode == goods.GoodsCode){
              this.purchaseList[i].number++
              hasGoods = true
            }
          }
          if(!hasGoods){
            goods.number = 1
            this.purchaseList.push(goods)
          }
        }
        this.changePurchaseNum()
      },
      minusbtn(goods){
        if(this.purchaseList.length!=0){
          for(let i=0;i<this.purchaseList.length;i++){
            if(this.purchaseList[i].GoodsCode == goods.GoodsCode){
              this.purchaseList[i].number--
              if(this.purchaseList[i].number == 0){
                this.purchaseList.splice(i,1)
              }
            }
          }
        }
        this.changePurchaseNum()
      },
      changePurchaseNum(){
        let sum = 0
        for(let i=0;i<this.purchaseList.length;i++){
          sum += this.purchaseList[i].number
        }
        this.purchaseNum = sum
        this.changeAllPrice()
      },
      changeAllPrice(){
        let sum = 0
        let sumReduce = 0
        for(let i=0;i<this.purchaseList.length;i++){
          sum += this.purchaseList[i].number * this.purchaseList[i].GoodsPrice
          sumReduce += this.purchaseList[i].number * (this.purchaseList[i].GoodsPrice - this.purchaseList[i].GoodsDiscPrice)
        }
        this.allPrice = sum
        this.allReduce = sumReduce
      },
      showWant(){
        this.isShowWant = true
      },
      hideWant(){
        this.isShowWant = false
      },
      hideWantBg(e){
        if(e.target.className == 'want-contain'){
          this.isShowWant = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  $yellow=#fdd953;
  $red=#e84e40;
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  
  @keyframes duang
  {
    0%   {
      transform:scale(1)
    }
    25%   {
      transform:scale(1.4)
    }
    50%   {
      transform:scale(1)
    }
    75%   {
      transform:scale(1.2)
    }
    100% {
      transform:scale(1)
    }
  }

  .goods-show{
    position:fixed;
    top:0
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    z-index:0;
    overflow:scroll;
    -webkit-overflow-scrolling : touch;
    padding-top:35px;
    padding-bottom:49px;
    .goods-show-title{
      position:fixed;
      z-index: 10;
      top:0;
      left:0;
      width:100%;
      height:35px;
      background:$yellow;
      .title-pic{
        margin:0 auto;
      }
      .account-pic{
        extend-click()
        padding:6px 6px;
        width:30px;
        height:35px;
        position:fixed;
        right:6px;
        top:0;
        background:center no-repeat;
        bg-image('../../common/image/user');
        background-size:18px 23px;;
        z-index: 11;
      }
    }
    .bigcontain{
      position:fixed;
      top:35px;
      left:0;
      right:0;
      bottom:49px;
      overflow:scroll;
      -webkit-overflow-scrolling : touch;
      .goods-list-box{
        height:auto;
        width:100%;
        margin-bottom:8px;
        background:#fff;
        .goods-list-title{
          width:100%;
          height:42px;
          line-height: 42px;
          text-align: center;
          background:#fff;
        }
        .goods-list-contain{
          .goods-list-contain-col{
            margin:0 auto;
            width:92%;
            .list-goods{
              float:left;
              width:29%;
              text-align: center;
              margin-right:6%;
              margin-bottom:20px;
              &:nth-child(3n){
                margin-right:0;
              }
              .goods-pic{
                width:100px;
              }
              .goods-name{
                margin:0 auto;
                width:100px;
                font-size: 13px;
                height:60px;
                line-height: 60px;
                text-align: left;
              }
              .new-prise{
                float:left;
                color:#444;
                .new-prise-left{
                  font-size: 12px;
                  transform:scale(.7);
                }
                .new-prise-right{
                  font-size:14px;
                }
              }
              .redcolor{
                color:$red;
              }
              .old-prise{
                float:left;
                color: #666;
                margin-top: 4px;
                font-size: 12px;
                transform:scale(.7);
                transform-origin:0 40%;
              }
              .plus-btn{
                extend-click()
                float:right;
                width:20px;
                height:20px;
                background:center no-repeat;
                bg-image('../../common/image/increase');
                background-size:20px;
              }
            }
            &:last-child{
              .list-goods{
                margin-bottom: 15px;
              }
            }
          }
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
    .want-more-contain{
      width:100%;
      height:59px;
      .want-more-btn{
        margin:24px auto 0;
        width:80px;
        font-size:15px;
        color:#333;
      }
    }
    .main-goods-mask-bg{
      position:fixed;
      top:0;
      bottom:49px;
      left:0;
      width:100%;
      background:rgba(0,0,0,.5);
      overflow:scroll;
      -webkit-overflow-scrolling : touch;
      .main-goods-mask{
        position:fixed;
        bottom:49px;
        left:0;
        width:100%;
        padding:0 12px 0 15px;
        background:#fff;
        .mask-goods-title{
          height:40px;
          line-height: 40px;
          border-bottom:1px solid #e8e8e8;
          font-size: 14px;
          color:#000;
        }
        .mask-goods-list{
          max-height:214px;
          overflow-x: hidden;
          overflow-y: scroll;
          .mask-goods-item{
            margin-bottom:27px;
            height:20px;
            line-height: 20px;
            &:first-child{
              margin-top: 16px;
            }
            &:last-child{
              margin-bottom: 16px;
            }
            .mask-goods-item-text{
              float:left;
              font-size: 14px;
              color:#000;
            }
            .mask-calculate{
              float:right;
              .mask-small{
                float:left;
                font-size: 12px;
                transform: scale(.8);
                transform-origin:0 100%;
              }
              .mask-new-price{
                float:left;
                font-size: 14px;
                margin-right:4px;
              }
              .redcolor{
                color:$red;
              }
              .mask-old-price{
                float:left;
                font-size: 12px;
                transform: scale(.8);
                transform-origin:0 90%;
                color:#666;
              }
              .mask-minus-btn{
                extend-click()
                float:left;
                width:20px;
                height:20px;
                bg-image('../../common/image/reduce');
                background-size:100%;
                margin-left:20px;
              }
              .mask-num-text{
                float:left;
                width:27px;
                height:20px;
                text-align: center;
                line-height: 20px;
              }
              .mask-plus-btn{
                extend-click()
                float:left;
                width:20px;
                height:20px;
                bg-image('../../common/image/increase');
                background-size:100%;
              }
            }
          }
        }
        .mask-youhuiquan{
          border-top:1px solid #e8e8e8;
          width:100%;
          height:43px;
          .mask-youhuiquan-left{
            float:left;
            font-size: 13px;
            color:#000;
            margin-right:20px;
            line-height:43px;
          }
          .mask-youhuiquan-text{
            float:left;
            font-size: 12px;
            color:$red;
            line-height:43px;
          }
          .mask-youhuiquan-right{
            float:right;
            line-height:43px;
            width:6px;
            height:43px;
            background:center no-repeat;
            bg-image('../../common/image/arrow');
            background-size:contain;
          }
        }
      }
    }
    .main-want-bg{
      position:fixed;
      left:0;
      top:0;
      right:0;
      bottom:0;
      background:rgba(0,0,0,.5);
      z-index:20;
      .want-contain{
        position:relative;
        width:100%;
        height:100%;
        .want-content{
          position:absolute;
          margin:auto;
          left:0;
          right:0;
          top:0;
          bottom:0;
          width:240px;
          height:235px;
          background:#fff;
          border-radius:5px;
          .want-box{
            position:relative;
            width:240px;
            height:235px;
            .want-title{
              width:100%;
              height:55px;
              line-height: 55px;
              text-align: center;
              font-size: 18px;
              color:#000;
            }
            .close-btn{
              extend-click()
              position:absolute;
              top:15px;
              right:15px;
              width:10px;
              height:10px;
              background:center no-repeat;
              bg-image('../../common/image/close');
              background-size:contain;
            }
            .want-text-contain{
              width:210px;
              height:120px;
              padding:10px;
              background:#f3f5f9;
              font-size: 12px;
              color:#000;
              margin-bottom:15px;
              border:none;
              margin-left:15px;
              resize: none;
            }
            .want-submit{
              margin:0 auto;
              width:89px;
              height:30px;
              text-align: center;
              line-height: 30px;
              color:#000;
              font-size: 12px;
              background:#fcd953;
              border-radius:15px;
            }
          }
        }
      }
    }
    .main-bottom{
      position:fixed;
      z-index: 10;
      left:0;
      bottom:0;
      padding:7px 12px 0 15px;
      width:100%;
      height:49px;
      background:#fff;
      border-top:1px solid #e8e8e8;
      .purchase-icon{
        extend-click()
        float:left;
        position:relative;
        width:34px;
        height:34px;
        margin:1px;
        transform-origin: 50%;
        bg-image('../../common/image/cart');
        background-size:100%;
      }
      .duang{
        animation:duang .5s alternate;
      }
      .purchase-goods-num{
        display: inline-block;
        position:fixed;
        z-index:101;
        left:40px;
        bottom:26px;
        height:24px;
        line-height: 24px;
        padding:0 8px;
        background:#323333;
        border-radius:12px;
        color:#fff;
        font-size: 16px;
        transform-origin:0;
        transform:scale(.5);
      }
      .purchase-price{
        float:left;
        margin-left: 4px;
        .heji-contain{
          line-height: 22px;
          .heji{
            font-size: 16px;
            color:#000;
          }
          .heji-small{
            font-size: 12px;
            color:$red;
          }
          .heji-num{
            font-size: 16px;
            color:$red;
          }
        }
        .jiesheng-price{
          font-size: 12px;
          line-height: 13px;
          transform-origin:0;
          transform:scale(.8);
          color:#666;
        }
      }
      .price-btn{
        float:right;
        width:90px;
        height:35px;
        background:#fcd953;
        text-align: center;
        line-height: 35px;
        font-size: 14px;
        color:#333333;
      }
    }
    .active{
      left:28px;
      bottom:20px;
    }
    .ball-container{
      .ball{
        position fixed
        left 28px
        bottom 14px
        z-index 200
        &.drop-enter,&.drop-enter-active{
          transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner{
            width:16px;
            height:16px;
            border-radius 8px;
            background:$yellow;
            transition all 0.4s linear
          }
        }
      }
    }
  }
</style>