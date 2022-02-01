import { createStore } from 'vuex'
import adminStore from './modules/adminStore'
import userStore from './modules/userStore'
import meetingStore from './modules/meetingStore'

export default createStore({
  modules: {
    adminStore,
    userStore,
    meetingStore,
  }
})
