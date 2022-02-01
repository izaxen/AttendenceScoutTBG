<template>
  <div class="main">
    <div class="header-text">
      <h2>Skapa ett nytt möte</h2>
    </div>
    <Meeting @newMeeting="createNewMeeting" />
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
      activity: "",
      place: "",
      from: "",
      to: "",
    }
  },
  methods: {
    createNewMeeting(newMeet) {
      this.$store.dispatch('meetingStore/createNewMeeting', newMeet);
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.createNewMeeting {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
.inside-form {
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  margin-right: 87px;
}
input {
  padding: 5px;
  border-radius: 5px;
}

label {
  align-self: center;
}

button {
  margin: 100px auto;
}
</style>