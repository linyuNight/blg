import * as types from './mutation-types'

export const setIsShowMask = function ({commit}) {
  commit(types.SET_ISSHOWMASK, true)
  let timer = setTimeout(() => {
    commit(types.SET_ISSHOWMASK, false)
    clearTimeout(timer)
  },2000)
}