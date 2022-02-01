<template>
  <div class="main-container">
    <div class="selector-container">
      <select v-model="selectedMeeting" class="selector">
        <option disabled value selected>Välj möte att rapportera</option>
        <option
          v-for="meeting in getMeetings"
          :key="meeting"
          :value="meeting.id"
        >{{ meeting.fromDate }} - {{ meeting.activity }} - {{ meeting.place }}</option>
      </select>
    </div>
    <div class="unit-members">
      <ListMembers :selectedMeeting="getSelectedMeeting" v-if="getSelectedMeeting" />
    </div>
  </div>
</template>

<script>
import ListMembers from "../components/ListMembers.vue";
export default {
  data() {
    return {
      meetings: this.$store.getters["userStore/meetings"],
      selectedMeeting: "",
    };
  },
  computed: {
    getMeetings() {
      return this.meetings;
    },
    getSelectedMeeting() {
      return this.selectedMeeting;
    },
  },
  async created() {
    this.meetings = await this.$store.dispatch("meetingStore/getActiveMeetings");
  },
  methods: {
   
  },
  components: { ListMembers }
}
</script>

<style scoped>
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