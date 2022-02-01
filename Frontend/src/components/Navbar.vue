<template>
  <div class="main-container">
    <div class="container" v-if="firstPage">
      <div :class="user1Page">
        <button class="lh-button" @click="this.$router.push('user-home')" v-if="userPage">Tillbaka</button>

        <button class="rh-button" @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">Logga ut</button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";


export default {
  data() {
    return {
      activePage: this.$route.path
    }
  },
  computed: {
    firstPage() {
      return this.$route.path === '/'  ? "" : this.activePage;
    },
    userPage(){
      return this.$route.path !== '/user-home' ? this.activePage : "";
    },
      user1Page(){
      return this.$route.path === '/user-home' ? 'btn-panel float-right' : 'btn-panel'
    }
   
  },
  methods: {
   
    
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
      } catch (error) {
        console.error(error);
      }
      this.$store.dispatch('userStore/logOut')

    },

    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },

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
};
</script>

<style scoped>
.main-container {
  min-height: 55px;
}
.container {
  display: flex;
  flex-direction: row;
}
.btn-panel {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.float-right{
justify-content: end;
}

p {
  margin: 0 5px;
}

button {
  border-radius: 5px;
}

button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>