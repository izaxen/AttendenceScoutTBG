const meetingStore = {
  namespaced: true,
  state: () => ({
    meetings: [],
  }),
  getters: {
    meetings: state => state.meetings,
  },

  mutations: {
    setUnitMeetings(state, meetings) {
      state.meetings = meetings;
    },
  },

  actions: {
    async updateMeeting(_, updatedMeeting) {
      await fetch('/api/meetings/updateMeeting', {
        method: 'POST',
        body: JSON.stringify(updatedMeeting)
      })
      this.$store.dispatch("meetingStore/getActiveMeetings");
    },

    async saveMeetingAttendents(_, attendents) {
      await fetch('api/meetings/saveMeetingAttendents', {
        method: 'POST',
        body: JSON.stringify(attendents)
      });
      
    },

    async createNewMeeting(_, newMeeting) {
      await fetch('api/meetings/createNewMeeting', {
        method: 'POST',
        body: JSON.stringify(newMeeting)
      })
    },
    async getActiveMeetings() {
      let res = await fetch('api/meetings/getActiveMeetings', {
        method: 'GET'
      });
      const meetings = await res.json();
      this.commit('meetingStore/setUnitMeetings', meetings)
      return meetings;
    },


  },
}
export default meetingStore;