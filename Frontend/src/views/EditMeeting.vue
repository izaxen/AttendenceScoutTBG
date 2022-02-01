<template>
  <div class="main-container">
    <div class="header-text">
      <h2>Edititera möte</h2>
    </div>
    <div class="selector-container">
      <select v-model="selectedOldMeeting" class="selector">
        <option selected disabled value>Välj möte att editera</option>
        <option
          v-for="meeting in getOldMeetings"
          :key="meeting"
          :value="meeting"
        >{{ meeting.fromDate }} - {{ meeting.activity }} - {{ meeting.place }}</option>
      </select>
    </div>
    <Meeting :selectedMeeting="getOldSelectedMeeting" v-if="getOldSelectedMeeting" @newMeeting="updateMeeting"/>
  </div>
</template>

<script>
import Meeting from '../components/Meeting.vue'

export default {
  components: {
    Meeting
  },

  data() {
    return {
      oldMeeting: "",
      selectedOldMeeting: "",
    }
  },
  computed: {
    getOldMeetings() {
      return this.oldMeeting;
    },
    getOldSelectedMeeting() {
      return this.selectedOldMeeting;
    }
  },

  async created() {
    this.oldMeeting = await this.$store.dispatch("meetingStore/getActiveMeetings");
  },

  methods: {
    getMeetingDetails() {
      return this.selecetedMeeting;
    },
  async updateMeeting(updatedMeeting){
    this.$store.dispatch('meetingStore/updateMeeting', {...updatedMeeting, id:this.selectedOldMeeting.id})
    this.oldMeeting = await this.$store.dispatch("meetingStore/getActiveMeetings");
    this.$router.push('add-attendence') 
  }
    
  }

}
</script>

<style scoped>
.main-container{
  display: flex;
  flex-direction: column;
}
.selector-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

select {
  border-radius: 5px;
  background-color: white;
  box-shadow: 3px 3px 5px;
  width: 90vw;
}
</style>