import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找后商品列表中是否已经有该商品，有的话返回该item
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.如果有的话，该商品的数量加1
      if (oldProduct) {
        //oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
      // 3.没有的话，将新商品放入商品列表中
    })
  }

}
