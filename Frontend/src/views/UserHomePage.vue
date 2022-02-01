<template>
  <div class="main-container">
    <div class="header-text">
      <h2>Närvaro registrering för möte</h2>
    </div>
    <div class="navigation-btn">
      <button class="big-navigation-btn" @click="this.$router.push('/add-meeting');">Skapa nytt möte</button>
      <button class="big-navigation-btn" @click="this.$router.push('/add-attendence')">Lägg till närvaro på möte</button>
      <button class="big-navigation-btn" @click="this.$router.push('/edit-meeting')">Editera möte</button>
      <button class="big-navigation-btn" @click="this.$router.push('/statistic')">Statistik</button>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{

    }
  },
  methods:{
  
  },


}
</script>

<style scoped>
img {
  width: 120px;
}
.navigation-btn{
  margin-top: 30px;
 display: flex;
 flex-direction: column;
}
</style>