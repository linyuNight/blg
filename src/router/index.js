import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const GoodsShow = () => import('components/goods-show/goods-show')
const Account = () => import('components/account/account')
const Coupon = () => import('components/coupon/coupon')
const OrderDetail = () => import('components/orderdetail/orderdetail')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goodsShow'
    },
    {
      path: '/goodsShow',
      name: 'goodsShow',
      component: GoodsShow,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
    }
  ]
})
