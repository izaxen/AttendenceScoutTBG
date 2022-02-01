const userStore = {
  namespaced: true,

  state: () => ({
    user: "",
    unitMembers: [],
    tempAttendent: [],
    unitLeaders: [],


  }),
  getters: {
    user: state => state.user,
    unitMembers: state => state.unitMembers,
    tempAttendets: state => state.tempAttendets,
    unitLeaders: state => state.unitLeaders
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUnitMembers(state, members) {
      state.members = members;
    },
    setTempUnitAttendents(state, attendent) {
      state.tempAttendets = attendent;
    },
    setUnitLeaders(state, leaders) {
      state.unitLeaders = leaders;
    }
  },

  actions: {
    setUserDetails(_, user) {
      this.commit('userStore/setUser', user)
    },

    async getUnitMembers() {
      let res = await fetch('/api/user/getUnitMembers', {
        method: 'GET'
      });
      const unitMembers = await res.json();
      this.commit('userStore/setUnitMembers', unitMembers)
      return unitMembers;
    },

    async getUnitLeaders() {
      let res = await fetch('/api/user/getUnitLeaders', {
        method: 'GET'
      });
      const unitLeaders = await res.json()
      this.commit('userStore/setUnitLeaders', unitLeaders)
      return unitLeaders;
    },

    async createTempAttendet(_, tempAttendent) {
      await fetch('api/user/createTempAttendent', {
        method: 'POST',
        body: JSON.stringify(tempAttendent)
      })
    },

    async getTempAttendents() {
      let res = await fetch('api/user/getTempAttendents', {
        method: 'GET'
      });
      const tempAtt = await res.json();
      this.commit('userStore/setTempUnitAttendents', tempAtt)
      return tempAtt;
    },

    async authWithGoogle(_, idToken) {
      let res = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify(idToken)
      });
      const auth = await res.json()
      if (auth.isAuth) {
        this.commit('userStore/setUser', auth.user);
        return true
      }
      return false;
    },

    async logOut() {
      await fetch('api/logOut', {
        method: 'GET'
      })
      location.assign('/')
    },

    async whoAmI() {
      let res = await fetch('api/whoAmI', {
        method: 'GET'
      })
      const auth = await res.json();
      if (auth.isAuth) {
        this.commit('userStore/setUser', auth.user)
      }
    },

  },
}
export default userStore;