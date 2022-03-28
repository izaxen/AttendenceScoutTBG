<template>
  <div class="main-container">
    <div class="selector-container">
      <select v-model="selectedMeeting" class="selector">
        <option disabled value selected>Välj möte att rapportera</option>
        <optgroup label="Möte att rappotera närvaro för" v-if="getMeetings">
          <option
            v-for="(value, key) in getMeetings.filter(x => x !== null)"
            :key="key"
            :value="value"
          >{{ value.activity }} - {{ value.place }} - {{ value.fromDate }}</option>
        </optgroup>

        <optgroup label="Färdigrapporterade möte">
          <option
            v-for="(value, key) in getReportedMeetings.filter(x => x !== null)"
            :key="key"
            :value="value"
          >{{ value.activity }} - {{ value.place }} - {{ value.fromDate }}</option>
        </optgroup>
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
      meetings: [],
      reportedMeetings: [],
      selectedMeeting: "",
    };
  },
  computed: {
    getMeetings() {
      return this.meetings;
    },
    getReportedMeetings() {
      return this.reportedMeetings;
    },
    getSelectedMeeting() {
      return this.selectedMeeting;
    },
  },
  async created() {
    this.meetings = await this.$store.dispatch("meetingStore/getUnreportedMeetings");
    this.reportedMeetings = await this.$store.dispatch("meetingStore/getReportedMeetings");
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