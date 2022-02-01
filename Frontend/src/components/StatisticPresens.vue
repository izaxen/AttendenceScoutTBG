<template>
  <div class="main-container">
    <div class="center-grid">
      <div class="meeting-grid" v-for="meet in getMeetings" :key="meet.id">
        <div class="vert">
          <h3>{{ meet.activity }} - {{ meet.place }} - {{ meet.fromDate }} - {{ meet.toDate }}</h3>
        </div>
        <div class="attendents" v-for="att in getDetailedPresens" :key="att.id">
          <div v-if="att.eventID === meet.eventID">{{ att.name }} {{ att.surName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['reportChoice', 'presens'],

  data() {
    return {
      meetings: [],
      detailedReport: []
    }
  },
  computed: {
    getDetailedPresens() {
      return this.detailedReport;
    },
    getReportChoice() {
      return this.reportChoice;
    },
    getMeetings() {
      return this.meetings;
    }
  },

  created() {
    this.detailedReport = this.presens;
  },

  watch: {
    reportChoice: function () {
      this.filterDateAndUnit();
    }
  },

  methods: {
    filterDateAndUnit() {

      if (this.getReportChoice !== undefined) {

        let choseRep;
        if (this.reportChoice.unit === 'Alla avdelningar') {
          choseRep = [...this.presens].filter(attendent => {
            const date = attendent.fromDate.replace(/[T].*/, "");
            return new Date(date).getTime() >= new Date(this.reportChoice.fromDate).getTime() && new Date(date).getTime() <= new Date(this.reportChoice.toDate).getTime();
          });
        }
        else {
          choseRep = [...this.presens].filter(attendent => {
            const date = attendent.fromDate.replace(/[T].*/, "");
            return new Date(date).getTime() >= new Date(this.reportChoice.fromDate).getTime() && new Date(date).getTime() <= new Date(this.reportChoice.toDate).getTime() && this.reportChoice.unit === attendent.unit;
          });
        }
        this.detailedReport = choseRep;
      }
      this.filterUniqueEvents();
    },

    filterUniqueEvents() {
      this.meetings = [...new Map(this.detailedReport.map((item) => [item['eventID'], item])).values()];
    },

  }



}
</script>

<style scoped>
.main-grid-container {
  display: grid;
  grid-template-columns: repeat(3, 33%);
}
.center-grid {
  margin-left: 30px;
}
.meeting-grid {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.lh-grid {
  margin-right: 30px;
  align-self: flex-end;
  justify-self: flex-end;
}
</style>