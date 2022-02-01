<template>
  <div class="main-container">
    <div class="statistic-grid">
      <div class="wrapper">
        <div class="lh-grid-side" v-for="text in questions" :key="text.id">
          <p>{{ text }}</p>
        </div>
      </div>
      <div class="wrapper">
        <div class="rh-grid-side" v-for="text in getChosenReport" :key="text.id">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['reportChoice', 'reports'],
  data() {
    return {
      detailedReport: [],
      chosenReport: [],
      totalAttendents: 0,
      totalMeetings: 0,
      totalMales: 0,
      totalFemales: 0,
      femaleBetween4To6: [],
      femaleBetween7To12: [],
      femaleBetween13To16: [],
      femaleBetween17To20: [],
      maleBetween4To6: [],
      maleBetween7To12: [],
      maleBetween13To16: [],
      maleBetween17To20: [],
      disabledFemaleOver21: [],
      disabledMaleOver21: [],
      otherMale: [],
      otherFemale: [],
      questions: this.getLhSideText(),

    }
  },

  computed: {
    getReports() {
      return this.reports;
    },
    getChosenReport() {
      return this.chosenReport;
    },

    getReportChoice() {
      return this.reportChoice;
    },
    getDetailedReport() {
      return this.detailedReport;
    }

  },
  watch: {
    reportChoice: function () {
      this.filterDateAndUnit();
    }
  },

  created() {
    this.detailedReport = this.reports;
    this.initReports()
  },

  methods: {
    initReports() {
      this.filterTotalAttendents();
      this.filterMaleAgeGroups();
      this.filterFemaleAgeGroups();
      this.setReport();
    },

    filterDateAndUnit() {
      if (this.getReportChoice !== undefined) {

        let choseRep;
        if (this.reportChoice.unit === 'Alla avdelningar') {
          choseRep = [...this.reports].filter(attendent => {
            const date = attendent.fromDate.replace(/[T].*/, "");
            return new Date(date).getTime() >= new Date(this.reportChoice.fromDate).getTime() && new Date(date).getTime() <= new Date(this.reportChoice.toDate).getTime();
          });
        }
        else {
          choseRep = [...this.reports].filter(attendent => {
            const date = attendent.fromDate.replace(/[T].*/, "");
            return new Date(date).getTime() >= new Date(this.reportChoice.fromDate).getTime() && new Date(date).getTime() <= new Date(this.reportChoice.toDate).getTime() && this.reportChoice.unit === attendent.unit;
          });
        }
        this.detailedReport = choseRep;
      }

      this.initReports();

    },

    getLhSideText() {
      return ['Antal deltagare:*', 'Antal deltagartillfällen totalt:*', 'Antal deltagare flickor/damer*', 'Antal deltagare pojkar/herrar*', 'Antal deltagartillfällen flickor 4-6 år*', 'Antal deltagartillfällen flickor 7-12 år*', 'Antal deltagartillfällen flickor 13-16 år*', 'Antal deltagartillfällen flickor 17-20 år*', 'Antal deltagartillfällen pojkar 4-6 år*', 'Antal deltagartillfällen pojkar 7-12 år*', 'Antal deltagartillfällen pojkar 13-16 år*', 'Antal deltagartillfällen pojkar 17-20 år*', 'Antal deltagartillfällen funktionshindrade dam 21-*', 'Antal deltagartillfällen funktionshindrade herr 21-*']
    },

    setReport() {
      this.chosenReport = []
      this.chosenReport = [
        this.totalAttendents,
        this.totalMeetings,
        this.totalFemales,
        this.totalMales,
        this.femaleBetween4To6.length,
        this.femaleBetween7To12.length,
        this.femaleBetween13To16.length,
        this.femaleBetween17To20.length,
        this.maleBetween4To6.length,
        this.maleBetween7To12.length,
        this.maleBetween13To16.length,
        this.maleBetween17To20.length,
        this.disabledFemaleOver21.length,
        this.disabledMaleOver21.length,
      ]
    },

    filterUniqueAttendents() {
      return [...new Map(this.detailedReport.map((item) => [item['AttendentID'], item])).values()];
    },

    filterUniqueEvents() {
      this.totalMeetings = [...new Map(this.detailedReport.map((item) => [item['eventID'], item])).values()].length;
    },

    filterTotalAttendents() {
      const attendents = this.filterUniqueAttendents();
      this.totalAttendents = attendents.length;
      this.filterUniqueEvents();
      this.filterMaleAndFemaleTotalAttendents();
    },

    filterMaleAndFemaleTotalAttendents() {
      const attendents = this.filterUniqueAttendents();
      let male = []
      let female = []
      attendents.forEach((attendent) => {
        if (attendent.sex === 'Man') {
          male.push(attendent)
        }
        else female.push(attendent)
      })

      this.totalMales = male.length;
      this.totalFemales = female.length;
    },

    countAge(personalData) {
      const age = Date.now() - new Date(personalData);
      return Math.floor(age / 31556926000)
    },

    filterMaleAgeGroups() {
      this.clearCounterMale()
      this.filterMale().forEach(attendent => {
        switch (this.countAge(attendent.personalData)) {
          case 4:
          case 5:
          case 6:
            this.maleBetween4To6.push(attendent);
            break;
          case 7:
          case 8:
          case 9:
          case 11:
          case 10:
          case 12:
            this.maleBetween7To12.push(attendent);
            break;
          case 13:
          case 14:
          case 15:
          case 16:
            this.maleBetween13To16.push(attendent);
            break;
          case 17:
          case 18:
          case 19:
          case 20:
            this.maleBetween17To20.push(attendent);
            break;
          //Missing disabled
          default:
            this.otherMale.push(attendent);
        }
      });
    },

    filterFemaleAgeGroups() {
      this.clearCounterFemale()
      this.filterFemale().forEach(attendent => {
        switch (this.countAge(attendent.personalData)) {
          case 4:
          case 5:
          case 6:
            this.femaleBetween4To6.push(attendent);
            break;
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            this.femaleBetween7To12.push(attendent);
            break;
          case 13:
          case 14:
          case 15:
          case 16:
            this.femaleBetween13To16.push(attendent);
            break;
          case 17:
          case 18:
          case 19:
          case 20:
            this.femaleBetween17To20.push(attendent);
            break;
          //Missing disabled
          default:
            this.otherFemale.push(attendent)
        }
      });
    },

    clearCounterFemale() {
      this.femaleBetween4To6 = []
      this.femaleBetween7To12 = []
      this.femaleBetween13To16 = []
      this.femaleBetween17To20 = []
    },

    clearCounterMale() {
      this.maleBetween4To6 = []
      this.maleBetween7To12 = []
      this.maleBetween13To16 = []
      this.maleBetween17To20 = []
      this.disabledFemaleOver21 = []
      this.disabledMaleOver21 = []
    },

    filterMale() {
      const filterSexMale = [...this.detailedReport].filter(attendent => {
        return attendent.sex === 'Man'
      });
      return filterSexMale;
    },


    filterFemale() {
      const filterSexFemale = [...this.detailedReport].filter(attendent => {
        return attendent.sex === 'Kvinna'
      });
      return filterSexFemale;
    },
  }
}
</script>

<style scoped>
.statistic-grid {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
.wrapper {
  display: grid;
  grid-auto-rows: 1fr;
}
.wrapper > div:nth-child(odd) {
  background-color: rgb(235, 235, 235);
}
.lh-grid-side {
  padding-left: 20px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.rh-grid-side {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
p {
  font-size: larger;
}
</style>