import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const GoodsShow = () => import('components/goods-show/goods-show')
const Account = () => import('components/account/account')
const OrderDetail = () => import('components/orderdetail/orderdetail')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goodsShow'
    },
    {
      path: '/goodsShow',
      component: GoodsShow,
    },
    {
      path: '/account',
      component: Account,
    },
    {
      path: '/orderDetail',
      component: OrderDetail,
    }
  ]
})
