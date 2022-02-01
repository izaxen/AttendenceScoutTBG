<template>
  <div class="main-container">
    <div class="container">
      <form class="addTempAttendet" @submit.prevent="addTempAttendent">
        <div class="form-wrapper">
        <div class="inside-form">
          <label for="name">Förnamn:</label>
          <input v-model="firstName" id="name" type="text" required/>
        </div>

        <div class="inside-form">
          <label for="surName">Efternamn:</label>
          <input v-model="surName" id="surName" type="text" required/>
        </div>

        <div class="inside-form">
          <label for="personalData">Födelsedata:</label>
          <input v-model="personalDataYear" id="personalData" type="text" class="personal-four"   maxlength="4" required/>
          <span> - </span>
          <input v-model="personalDataMonth" id="personalData" type="text" class="personal-two" maxlength="2" required />
         <span> - </span>
          <input v-model="personalDataDay" id="personalData" type="text" class="personal-two" maxlength="2" required />
        </div>

        <div class="inside-form">
          <label for="sex">Pojke: </label>
          <input v-model="sex" id="sex" type="radio" value="Man" required />
          <label for="sex">Flicka: </label>
          <input v-model="sex" id="sex" type="radio" value="Kvinna" required/>
        </div>
        </div>
      </form>
      <button class="big-navigation-btn" @click="addTempAttendent">Lägg till scout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      surName: "",
      personalDataYear: "",
      personalDataMonth: "",
      personalDataDay: "",
      sex: "",
      
    }
  },
  methods: {
    addTempAttendent() {
      const newTempAttendent = {
        name: this.firstName,
        surName: this.surName,
        personalData: this.personalDataYear +"-"+this.personalDataMonth+"-"+ this.personalDataDay,
        sex: this.sex,
        unitRole: "Temp"
      }
      this.$store.dispatch('userStore/createTempAttendet', newTempAttendent);
      this.$router.push('add-attendence');

    }
  },

}
</script>

<style scoped>
.form-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container {
  margin: 40px auto;
  display: grid;
  flex-direction: column;
  justify-content: center;
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
  margin: 40px auto;
}
#sex{
  margin: 0 10px;
}
.personal-four{
  width:40px;
}
.personal-two{
  width: 20px;
}
span{
  margin:9px;
}
</style>