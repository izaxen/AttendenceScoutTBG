<template>
  <div class="main-container" v-if="!getUser">
    <div class="header-text">
      <h3>Välkommen till Trelleborgs scoutkårs närvaro app.</h3>
    </div>
    <div class="login-btn">
      <button class="big-navigation-btn" @click="clickSignIn">Logga in</button>
    </div>
    <ErrorAuth v-if="getError"/>
  </div>
</template>

<script>
import ErrorAuth from "../components/ErrorAuth.vue";

export default {
  data(){
    return{
      errorLogin:false,
    }
  },
   async  mounted() {
      await this.$store.dispatch("userStore/whoAmI");
        if (this.getUser) {
            this.$router.push("user-home");
        }
    },
    computed: {
        getUser() {
            return this.$store.getters["userStore/user"];
        },
        getError(){
          return this.errorLogin
        }
    },
    methods: {
        async clickSignIn() {
            try {
                const googleUser = await this.$gAuth.signIn();
                if (!googleUser) {
                    return null;
                }
                const idToken = { token: googleUser.getAuthResponse().id_token };
                await this.$store.dispatch("userStore/authWithGoogle", idToken) ? this.rediretToUserHome() : this.errorLogin = true;
            }
            catch (error) {
              this.errorLogin = true;
                return null;
            }
        },
        rediretToUserHome(){
        this.errorLogin = false;
        this.$router.push("user-home")
        }
    },
    components: { ErrorAuth }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-text {
  text-align: center;
  width: 90%;
  align-self: center;
}
.login-btn {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

img {
  width: 150px;
}
</style>