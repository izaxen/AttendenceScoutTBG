<template>
  <div class="main-container">
    <div class="container">
      <Navbar />
      <div class="main-view">
        <div class="logo">
          <img id="logo" src="./assets/trelleborgs-scoutkar.svg" alt="logo" />
        </div>
        <span v-if="getUser" class="user-span">{{ getUser.userName }} - {{getUser.unit}}</span>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { inject, toRefs } from "vue";
export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {

    }
  },
  async created() {
    await this.$store.dispatch("userStore/whoAmI");
    if (!this.getUser) {
      this.$router.push('/');
    }


  },

  computed: {
    getUser() {
     return  this.$store.getters['userStore/user']
      
    }
  },

  methods: {


  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => { };
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },

}
</script>

<style>
#app {
  background-color: #9adff469;
  min-height: 100vh;
}
#logo {
  width: 120px;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  box-shadow: 3px 3px 5px;
  border: 1px solid black;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.big-navigation-btn {
  padding: 15px 15px;
  width: 235px;
  margin: 15px;
  font-size: 115%;
  align-self: center;
}

.logo {
  display: flex;
  justify-content: center;
}
.header-text {
  align-self: center;
}
.user-span {
  text-align: center;
  margin: 10px;
  font-style: oblique;
  font-size: larger;
}

button:hover {
  background-color: #9adff4a8;
  scale: 1.1;
}
</style>
