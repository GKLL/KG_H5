//store state 持久化插件
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState()(store)
}