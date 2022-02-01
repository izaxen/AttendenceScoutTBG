<template>
  <div class="main-container">
    <div class="selector-container">
      <select v-model="chosenUnit" @change="setChoices()">
        <option disabled value selected>Välj avdelning</option>
        <option v-for="unit in getUnits" :key="unit" :value="unit.unit" >{{ unit.unit }}</option>
      </select>

      <select v-model="statisticChoice" @change="setChoices()">
        <option disabled value selected>Välj statistik</option>
        <option :value="1">Inrapportering statistik</option>
        <option :value="2">Närvarorapport</option>
      </select>
      <div class="dates">
      <div>
        <label for="fromDate" id="lh-label">Från:</label>
        <input v-model="fromDate" type="date" id="fromDate" @change="setChoices()" />
      </div>
      <div>
        <label for="toDate">Till:</label>
        <input v-model="toDate" type="date" id="toDate" :min="getFromDate" @change="setChoices()"/>
      </div>
      </div>
    </div>
    <div class="statistic-container">
      <h2>Statistik Trelleborgs scoutkår</h2>
      <StatisticReport
        v-if="getStatisticChoice === 1"
        :reportChoice="getReportChoice"
        :reports="getReports"
      />
      <StatisticPresens
        v-if="getStatisticChoice === 2"
        :reportChoice="getReportChoice"
        :presens="getPresens"
      />
    </div>
  </div>
</template>

<script>
import StatisticReport from "../components/StatisticReport.vue"
import StatisticPresens from "../components/StatisticPresens.vue";
export default {
  data() {
    return {
      units: this.$store.getters["adminStore/units"],
      chosenUnit: "",
      statisticChoice: "",
      fromDate: "",
      toDate: "",
      reportChoice: {},
      reports: [],
      presens: [],
    };
  },
  methods: {
    setChoices() {
      const reportChoice = {
        unit: this.chosenUnit,
        fromDate: this.fromDate,
        toDate: this.toDate,
        choice: this.statisticChoice
      }
     if(reportChoice.unit !== "" && reportChoice.fromDate !== "" && reportChoice.toDate !== ""){
      this.reportChoice = reportChoice;}
    }
  },
  computed: {
    getUnits() {
      return this.units;
    },
    getUnit() {
      return this.chosenUnit;
    },
    getStatisticChoice() {
      return this.statisticChoice;
    },
    getReportChoice() {
      return this.reportChoice;
    },
    getReports() {
      return this.reports;
    },
    getPresens() {
      return this.presens;
    },
    getFromDate() {
      return this.fromDate;
    },
   

  },
  async created() {
    this.units = await this.$store.dispatch("adminStore/getAllUnits");
    this.reports = await this.$store.dispatch("adminStore/getStatisticReports")
    this.presens = await this.$store.dispatch("adminStore/getStatisticPresens")
  },
  components: { StatisticReport, StatisticPresens }
}
</script>

<style scoped>
.main-container {
  padding-bottom: 30px;
}
.selector-container {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.statistic-container {
  width: 90%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  border: 1px solid black;
  background-color: white;
  width: 90vw;
  border-radius: 5px;
  padding-bottom: 20px;
  box-shadow: 3px 3px 5px;
}
.dates{
  display:flex;
  justify-content: center;
  gap:15px;
}

select {
  border-radius: 5px;
  background-color: white;
  box-shadow: 3px 3px 5px;
  min-width: 180px;
}
h2 {
  text-align: center;
}
</style>