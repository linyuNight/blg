import * as types from './mutation-types'

const mutations = {
  [types.SET_ISSHOWMASK](state, isShowMask) {
    state.isShowMask = isShowMask
  }
}

export default mutations