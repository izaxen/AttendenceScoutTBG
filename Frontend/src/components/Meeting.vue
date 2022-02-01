<template>
  <div class="main">
    <div class="form-container">
    <form @submit.prevent="createNewMeeting" class="createNewMeeting">
      <div class="inside-form">
        <label for="activity">Aktivitet:</label>
        <input v-model="activity" id="activity" type="text" :placeholder="getPlaceholder.activity" />
      </div>

      <div class="inside-form">
        <label for="place">Plats:</label>
        <input v-model="place" id="place" type="text" :placeholder="getPlaceholder.place" />
      </div>

      <div class="inside-form">
        <label for="from">Från:</label>
        <input v-model="fromDate" id="from" type="datetime-local" :placeholder="getPlaceholder.fromDate" />
      </div>

      <div class="inside-form">
        <label for="to">Till:</label>
        <input v-model="toDate" id="to" type="datetime-local" :placeholder="getPlaceholder.toDate" :min="getFromDate"/>
      </div>
      <button class="big-navigation-btn">Spara</button>
    </form>
  </div>
  </div> 
</template>

<script>
export default {
  props: ['selectedMeeting'],

  data() {
    return {
      activity: "",
      place: "",
      fromDate: "",
      toDate: "",
    }
  },
  computed: {
    getPlaceholder() {
      return this.selectedMeeting !== undefined ? this.selectedMeeting : '';
    },
    getSelectedMeeting() {
      return this.selectedMeeting;
    },
    getFromDate(){
      return this.fromDate
    }
  },

  methods: {

    createNewMeeting() {
      const newMeet = {
        activity: this.activity,
        place: this.place,
        fromDate: this.fromDate,
        toDate: this.toDate,
      }
      
      this.$emit('newMeeting', newMeet)
    }
  },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.form-container{
  display: flex;
  justify-content: center;
}
.createNewMeeting {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
.inside-form {
  display: flex;
  justify-content: flex-end;
 margin: 10px;
 margin-right:55px 
}
input {
  padding: 5px;
  border-radius: 5px;
}

label {
  align-self: center;
}

button {
  margin: 60px auto;
}
</style>