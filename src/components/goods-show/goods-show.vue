<template>
  <div class="goods-show" ref="recommend">
    <div class="goods-show-title">
      <svg class="icon" aria-hidden="true" style="height:18px;margin-top:9px;width:100%;">
        <use xlink:href="#icon-logo"></use>
      </svg>
      <router-link tag="div" class="account-pic" to="/account"></router-link>
    </div>
    <div class="bigcontain">
      <div class="bigcontent">
        <div class="goods-list-box" v-for="goodsList in goodsData.GoodsList">
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
                <div class="goods-pic" :style="{backgroundImage: 'url('+goods.GoodsImg[0].ImgUrl+')'}"></div>
                <div class="goods-name">{{goods.GoodsName}}</div>
                <div><div class="new-prise" :class="{redcolor: goods.GoodsDiscPrice!=goods.GoodsPrice}"><span class="new-prise-left">￥</span><span class="new-prise-right">{{goods.GoodsDiscPrice}}</span></div><s class="old-prise" v-if="goods.GoodsDiscPrice!=goods.GoodsPrice">￥{{goods.GoodsPrice}}</s><div class="plus-btn" @click="plusbtn(goods)"></div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="want-more-contain">
          <div class="want-more-btn" @click="showWant">还想吃啥？</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="main-goods-mask-bg" v-show="isShowMask" @click="hideShowMask"></div>
    </transition>
    <transition name="fade">
      <div class="main-want-bg" v-show="isShowWant" @click="hideWantBg">
        <div class="want-contain">
          <div class="want-content">
            <div class="want-box">
              <div class="want-title">还想吃啥？</div>
              <div class="close-btn" @click="hideWant"></div>
              <textarea class="want-text-contain" placeholder="说说你想吃啥吧" v-model="submitMessage"></textarea>
              <div class="want-submit" @click="submitWant">提交</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="main-bottom-contain">
      <transition name="fold">
        <div class="main-goods-mask" v-show="isShowMask" transition="fold">
          <div class="mask-goods-title">已选商品({{purchaseNum}})</div>
          <div class="mask-goods-list">
            <transition-group name="list" tag="p">
            <div class="mask-goods-item clear" v-for="purchasegoods in purchaseList" :key="purchasegoods.GoodsCode">
              <div class="mask-goods-item-text">{{purchasegoods.GoodsName}}</div>
              <div class="mask-calculate">
                <div class="mask-small" :class="{redcolor: purchasegoods.GoodsDiscPrice!=purchasegoods.GoodsPrice}">￥</div>
                <div class="mask-new-price" :class="{redcolor: purchasegoods.GoodsDiscPrice!=purchasegoods.GoodsPrice}">{{purchasegoods.GoodsDiscPrice}}</div>
                <s class="mask-old-price" v-if="purchasegoods.GoodsDiscPrice!=purchasegoods.GoodsPrice">￥{{purchasegoods.GoodsPrice}}</s>
                <div class="mask-minus-btn" @click="minusbtn(purchasegoods)"></div>
                <div class="mask-num-text">{{purchasegoods.number}}</div>
                <div class="mask-plus-btn" @click="maskPlusbtn(purchasegoods)"></div>
              </div>
            </div>
            </transition-group>
          </div>
          <router-link tag="div" class="mask-youhuiquan" to="/coupon" v-if="isShowYouhui">
            <div class="mask-youhuiquan-left">选择优惠券</div>
            <div class="mask-youhuiquan-text" v-if="isShowYouhuiDetail">满{{youhuiquan.BalanceRequired}}减{{youhuiquan.ParValue}}</div>
            <div class="mask-youhuiquan-note" v-show="notePrice">还差{{notePrice}}元</div>
            <div class="mask-youhuiquan-right"></div>
          </router-link>
        </div>
      </transition>
      <div class="main-bottom">
        <div class="purchase-icon" :class="{duang: isDuang}" ref="purchase" @click="toShowMask">
        </div>
        <div class="purchase-goods-num" v-show="purchaseNum">{{purchaseNum}}</div>
        <div class="purchase-price" :class="{pricemargintop: !allReduce}">
          <div class="heji-contain"><span class="heji">合计：</span><span class="heji-small">￥</span><span class="heji-num">{{allPrice}}</span></div>
          <div class="jiesheng-price" v-show="allReduce">已优惠：￥{{allReduce}}</div>
        </div>
        <div class="price-btn" @click="pay">结算</div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter"
        v-for="(ball,index) in balls" :key="ball.show">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import $ from 'jquery'
  import qs from 'qs'
  import {url} from 'api/config'
  import {accAdd,accSub,accMul,accDiv} from 'api/calculate'

  export default {
    data() {
      return {
        isShowMask: false,
        isShowWant: false,
        isShowYouhui: false,
        isShowYouhuiDetail: false,
        isDuang: false,
        notePrice: 0,
        goodsData: [],
        purchaseList: [],
        myOrder: [],
        submitMessage: '',
        purchaseNum: 0,
        totalPrice: 0,
        allPrice: 0,
        allReduce: 0,
        orderType: 0,
        youhuiquan: {},
        payYouhuiquan: {},
        url: '',
        theRequest: {},
        goosScroll: {},
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
      this.url = location.search; //获取url中"?"符后的字串 
      var theRequest = new Object(); 
      if (this.url.indexOf("?") != -1) { 
        var str = this.url.substr(1); 
        var strs = str.split("&"); 
        for(var i = 0; i < strs.length; i ++) { 
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
        } 
      }
      this.theRequest = theRequest
      this.$store.state.shelfCode = theRequest.ShelfCode
      axios.get('../api/AjaxAPI/GetGoodsInfo' + this.url)
      // axios.get(url + '/goods')
      .then(res => {
        this.goodsData = res.data.Data
      })
      .catch(err => {
        console.log(err)
      });
      axios.get('../api/AjaxAPI/GetSelectCoupons?WechatId=' + this.user.OpenId + '&ShelfCode=' + this.$store.state.shelfCode + '&DataType=' + 0 + '&PageIndex=' + 1 + '&PageSize=' + 10)
      // axios.get(url + '/youhuiquanselect')
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
      this.changePurchaseNum()

      if(this.$store.state.isSelect){
        this.$store.state.isSelect = false
        if(this.notePrice){
          this.showMainMask("还差" + this.notePrice + "元可使用优惠券")
        }
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
          case 11:
            return '十一'
            break
          case 12:
            return '十二'
            break
          case 13:
            return '十三'
            break
          case 14:
            return '十四'
            break
          case 15:
            return '十五'
            break
          case 16:
            return '十六'
            break
          case 17:
            return '十七'
            break
          case 18:
            return '十八'
            break
          case 19:
            return '十九'
            break
          case 20:
            return '二十'
            break
          default:
            return cen
            break
        }
      }
    },
    methods:{
      showMainMask(content){
        this.$store.state.maskContent = content
        this.$store.commit('setIsShowMask')
      },
      submitWant(){
        let data = {
          WechatId:this.$store.state.user.OpenId,
          Text:this.submitMessage
        }
        axios.post('../api/AjaxAPI/SubmitUserWantEat',qs.stringify(data))
        .then(res => {
          this.showMainMask(res.data.Msg)
        })
        .catch(err => {
          console.log(err);
        });
        this.isShowWant = false
        this.submitMessage = ''
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
        if(this.purchaseList.length>0){
          this.isShowMask = !this.isShowMask
        }else{
          this.showMainMask('请选择商品')
        }
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
        if(this.purchaseList.length != 0){
          for(let i=0;i<this.purchaseList.length;i++){
            if(this.purchaseList[i].GoodsCode == goods.GoodsCode){
              this.purchaseList[i].number--
              if(this.purchaseList[i].number == 0){
                this.purchaseList.splice(i,1)
              }
            }
          }
          if(this.purchaseList.length == 0){
            this.isShowMask = false
          }
        }
        this.changePurchaseNum()
      },
      changePurchaseNum(){
        let sum = 0
        for(let i=0;i<this.purchaseList.length;i++){
          sum = accAdd(this.purchaseList[i].number,sum)
        }
        this.purchaseNum = sum
        this.changeAllPrice()
      },
      changeAllPrice(){
        let sum = 0
        let bigSum = 0
        let sumReduce = 0
        for(let i=0;i<this.purchaseList.length;i++){
          sum = accAdd(accMul(this.purchaseList[i].number,this.purchaseList[i].GoodsDiscPrice),sum)
          sumReduce = accAdd(accMul(this.purchaseList[i].number,(accSub(this.purchaseList[i].GoodsPrice,this.purchaseList[i].GoodsDiscPrice))),sumReduce)
        }
        this.totalPrice = sum
        this.allPrice = sum
        this.allReduce = sumReduce
        if(this.isShowYouhuiDetail){
          //判断是否使用了优惠券
          if(this.allPrice >= this.youhuiquan.BalanceRequired){
            this.notePrice = 0
            this.allReduce = accAdd(this.allReduce,this.youhuiquan.ParValue)
            if(sum >= this.youhuiquan.ParValue){
              this.allPrice = accSub(sum,this.youhuiquan.ParValue)
            }else{
              this.allReduce = accSub(this.allReduce,accSub(this.youhuiquan.ParValue,sum))
              this.allPrice = 0
            }
          }else{
            this.notePrice = accSub(this.youhuiquan.BalanceRequired,this.allPrice)
          }
        }
      },
      isYouhui(){
        if(this.notePrice){
          this.payYouhuiquan = {}
        }else{
          this.payYouhuiquan = this.youhuiquan
        }
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
      },
      submitOrder(){
        this.myOrder = []
        let temp = {}
        for(let i=0;i<this.purchaseList.length;i++){
          temp = {}
          temp.GoodsCode = this.purchaseList[i].GoodsCode 
          temp.GoodsName = this.purchaseList[i].GoodsName
          temp.Qty = this.purchaseList[i].number
          temp.Price = this.purchaseList[i].GoodsDiscPrice
          temp.TotalAmount = accMul(temp.Qty,temp.Price)
          this.myOrder.push(temp)
        }
      },
      pay() {
        this.isYouhui()
        var that = this
        if(this.purchaseList.length == 0){
          this.showMainMask('请选择商品')
        }else{
          this.submitOrder()
          if(this.allPrice > 0){
            this.orderType = 1
          }else{
            this.orderType = 0
          }
          var parm = {
              ShelfCode: that.theRequest.ShelfCode,
              WechatId: this.$store.state.user.OpenId,//微信OpenId，唯一标识
              PayType: that.orderType,//支付类型：0：余额/优惠券/币等支付完成；1：部分或完全金额使用微信
              PaySource: 2,//支付来源：1：PC；2：微信；3：IOS；4：Android；
              OrderType: that.orderType,//订单类型，0：正常订单（不涉及第三方订单）；1：微信订单（公众平台订单）
              GoodsDetailList: this.myOrder,//商品明细集合
              TotalAmount: this.totalPrice,//订单总金额
              UseBalance: 0,//使用余额
              CouCode: this.payYouhuiquan.BLGNum?this.payYouhuiquan.BLGNum:"",//优惠券编号
              CouAmt: this.payYouhuiquan.ParValue?this.payYouhuiquan.ParValue:0,//优惠券金额
              ThirdAmt: this.allPrice,// 第三方金额
              IP: this.$store.state.user.UserIp//IP地址
          };

          $.ajax({
              url: "../api/AjaxAPI/SubmitOrder",
              data: JSON.stringify(parm),
              type: "POST",
              contentType: "application/json;charset=utf-8",
              dataType: "json",
              beforeSend: function (XMLHttpRequest) {

              },
              complete: function (data, textStatus) {

              },
              success: function (json) {
                  if (json.Status != 200) {
                      that.showMainMask(json.Msg)
                  } else {
                      if (that.orderType == 1) {
                          var WeChatPublic = json.Data.WechatPublicOrderInfo;
                          if (WeChatPublic != null) {
                              that.onBridgeReady(WeChatPublic.AppId,
                                  WeChatPublic.Noncestr,
                                  WeChatPublic.Timestamp,
                                  WeChatPublic.Package,
                                  WeChatPublic.SignType,
                                  WeChatPublic.PaySign);
                          }
                      } else if (createOrderType == 0) {
                          window.location.href = "/MsgPage/Success";
                      }
                      else {
                          that.showMainMask("系统错误，请稍候再试。")
                      }
                  }
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                  if (XMLHttpRequest.responseText.indexOf("用户中心-登录") == -1) {
                      that.showMainMask("网络链接错误，请稍候再试。")
                  }
                  window.location.reload();
              }
          });
        }
        
      },
      onBridgeReady(appid, nonceStr, timeStamp, pack, signType, paySign) {
        var that = this
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": appid,     //公众号名称，由商户传入
                "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": nonceStr, //随机串
                "package": pack,
                "signType": signType,         //微信签名方式：
                "paySign": paySign //微信签名
            },
            function (res) {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if (res.err_msg == undefined) {
                    that.showMainMask("支付失败:" + res.errMsg)
                    return;
                }
                if (res.err_msg.indexOf("ok") != -1) {
                    location.href = '/MsgPage/Success';
                } else if (res.err_msg.indexOf("cancel") != -1) {
                    that.showMainMask("支付失败：支付过程中用户取消")
                } else {
                    //location.href = '/MsgPage/Fail';
                    that.showMainMask("支付失败")
                }
            }
        );
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
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  
  .list-enter-active, .list-leave-active {
    transition: all .5s;
  }
  .list-enter, .list-leave-active{
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .fold-enter-active, .fold-leave-active
    transition: all 0.3s
    transform: translate3d(0, -100%, 0)!important
  .fold-enter, .fold-leave-to
    transform: translate3d(0, 0, 0)!important
  
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
    // position:fixed;
    // top:0
    // left:0;
    // right:0;
    // bottom:0;
    width:100%;
    height:100%;
    z-index:0;
    // overflow:scroll;
    // -webkit-overflow-scrolling : touch;
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
                width:100%;
                max-width:100px;
                height:133px;
                background-size:cover;
                background-position:center;
                background-repeat:no-repeat;
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
        extend-click()
        margin:24px auto 0;
        width:80px;
        font-size:15px;
        color:#333;
      }
    }
    .main-goods-mask-bg{
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      width:100%;
      background:rgba(0,0,0,.5);
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
    .main-bottom-contain{
      position:fixed;
      z-index: 10;
      left:0;
      bottom:0;
      width:100%;
      height:49px;
      background:#fff;
      .main-goods-mask{
        position:absolute;
        z-index:-1;
        top:0;
        left:0;
        width:100%;
        padding:0 12px 0 15px;
        background:#fff;
        transform: translate3d(0, -100%, 0)
        .mask-goods-title{
          height:40px;
          line-height: 40px;
          borderbottom-1px(#e8e8e8)
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
            // line-height: 20px;
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
          bordertop-1px(#e8e8e8)
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
          .mask-youhuiquan-note{
            float:left;
            font-size: 12px;
            color:$red;
            line-height:43px;
            margin-left:20px;
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
      .main-bottom{
        bordertop-1px(#e8e8e8)
        position:fixed;
        z-index: 10;
        left:0;
        bottom:0;
        padding:7px 12px 0 15px;
        width:100%;
        height:49px;
        background:#fff;
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
        .pricemargintop{
          margin-top:6px;
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