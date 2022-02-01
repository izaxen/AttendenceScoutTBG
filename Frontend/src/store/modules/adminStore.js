
const adminStore = {
  namespaced: true,
  state: () => ({
    units: [],
    reports: [],
    presens: [],
    dateAndUnitChoices:{},
  }),

  getters: {
    units: state => state.units,
    reports: state => state.reports,
    presens: state => state.presens,
    dateAndUnitChoices: state => state.dateAndUnitChoices
  },

  mutations: {
    setUnits(state, units) {
      this.units = units;
    },
    setReports(state, reports) {
      this.reports = reports;
    },
    setPresens(state, presens) {
      this.presens = presens;
    },
    setDateAndUnitChoices(state, choices) {
      this.dateAndUnitChoices = choices
    }
  },

  actions: {
    setdateAndUnitChoicesReport(_,choices) {
      this.commit('adminStore/setDateAndUnitChoices', choices)
    },

    async getAllUnits() {
      let res = await fetch('/api/meetings/getAllUnits', {
        method: 'GET'
      });
      const units = await res.json();
      this.commit('adminStore/setUnits', units)
      return units;
    },

    async getStatisticReports() {
      let res = await fetch('api/statistic/getStatisticReport', {
        method: 'GET'
      });
      const reports = await res.json();
      this.commit('adminStore/setReports', reports)
      return reports;
    },
    async getStatisticPresens() {
      let res = await fetch('api/statistic/getStatisticPresens', {
        method: 'GET'
      });
      const presens = await res.json();
      this.commit('adminStore/setPresens', presens)
      return presens;
    }
  }
}
export default adminStore;