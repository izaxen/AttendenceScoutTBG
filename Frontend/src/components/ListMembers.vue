<template>
  <div class="main-container">
    <div class="list-members">
      <h3>Medlemmar</h3>
      <div v-for="member in getUnitMembers" :key="member">
        <div v-if="member.unitRole === 'Medlem'" class="member-grid">
          <div class="member-name">{{ member.name }} {{ member.surName }}</div>
          <div class="member-present">
            <label>
              Närvarande:
              <input
                type="checkbox"
                v-model="presentMembers"
                :value="member.id"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="list-members">
      <h3>Ledare</h3>
      <div v-for="member in getUnitLeaders" :key="member">
        <div class="member-grid">
          <div class="member-name">{{ member.name }} {{ member.surName }}</div>
          <div class="member-present">
            <label>
              Närvarande:
              <input type="checkbox" v-model="presentMembers" :value="member.memberNo" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="list-members">
      <h3>Prova på medlemar</h3>
      <div v-for="member in getTempAttendents" :key="member">
        <div v-if="member.unitRole === 'Temp'" class="member-grid">
          <div class="member-name">{{ member.name }} {{ member.surName }}</div>
          <div class="member-present">
            <label>
              Närvarande:
              <input type="checkbox" v-model="presentMembers" :value="member.id" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-bottom">
      <div v-if="getPresentMembers" :class="getPresentMembers.length > 0 ? 'center' : 'disabled'">
        <button class="big-navigation-btn" @click="saveMeetingAttendence">Spara närvaro</button>
      </div>
      <button class="big-navigation-btn" @click="createTempAttendent">Lägg till ny scout</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedMeeting"],

  async created() {
    this.unitMembers = await this.$store.dispatch('userStore/getUnitMembers');
    this.tempAttendents = await this.$store.dispatch('userStore/getTempAttendents')
    this.unitLeaders = await this.$store.dispatch('userStore/getUnitLeaders')
    //this.presentMembers = await this.$store.dispatch('meetingStore/getMeetingAttendents', this.selectedMeeting.id)


  },

  data() {
    return {
      unitMembers: this.$store.getters['userStore/unitMembers'],
      presentMembers: [],
      tempAttendents: [],
      unitLeaders: [],
    }
  },

  computed: {
    getUnitMembers() {
      return this.unitMembers;
    },
    getTempAttendents() {
      return this.tempAttendents;
    },
    getSelectedMeeting() {
      console.log("kör selected");
      return this.selectedMeeting
    },
    getPresentMembers() {
      console.log(this.presentMembers);
      return this.presentMembers;
    },
    getUnitLeaders() {
      return this.unitLeaders
    }
  },

  methods: {
    createTempAttendent() {
      this.$router.push('create-temp-attendent')
    },
    saveMeetingAttendence() {
      const meetingAttendents = {
        eventID: this.selectedMeeting,
        attendents: this.presentMembers
      }
      this.$store.dispatch('meetingStore/saveMeetingAttendents', meetingAttendents);
      this.$router.go(-1)
    },
    async setPresentMembers() {
      this.presentMembers = await this.$store.dispatch('meetingStore/getMeetingAttendents', this.selectedMeeting.id)
      console.log(this.presentMembers);
    }

  },
  watch: {
   /*  selectedMeeting: async function () {
      await this.setPresentMembers()
    }, */
    presentMembers: function(){
      
      console.log(this.presentMembers);
    }
  },

}
</script>

<style scoped>
.main-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list-members {
  display: flex;
  flex-direction: column;
  margin: 20px auto 20px auto;
  border: 1px solid black;
  background-color: white;
  width: 90vw;
  border-radius: 5px;
  padding-bottom: 20px;
  box-shadow: 3px 3px 5px;
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(50%, auto));
  justify-items: center;
  margin: 5px;
}
.btn-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
}

h3 {
  margin: 10px auto;
}

button:hover {
  background-color: #9adff4a8;
  scale: 1.1;
}

.center {
  align-self: center;
}
.disabled {
  align-self: center;
  pointer-events: none;
  opacity: 0.6;
}
</style>