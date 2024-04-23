<template>
  <div class="login-wrapper" v-if="!AccountStore.getLoggedUser">
    <p class="tsize-title tformat-lightbold"><i class="pi pi-user"></i>Bejelentkezés</p>
    <hr>
    <input type="text" placeholder="Felhasználónév" v-model="username">
    <input type="password" placeholder="Jelszó" v-model="password">

    <div class="linkButtons" v-if="$route.path == '/login'">
      <router-link to="register" class="registerBtn tcolor-blue tformat-lightbold"><i class="pi pi-user-plus"></i>Regisztrálni szeretnél? </router-link>
      <router-link to="forgotdata" class="forgotdataBtn tcolor-blue tformat-lightbold"><i class="pi pi-inbox"></i>Elfelejtett adatok?</router-link>
    </div>

    <input class="submitBtn" type="button" value="Bejelentkezés" @click="submitLogin" :v-model="`xd`">
  </div>
</template>

<script setup>
  // Modules Imports
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
  const routerApp = useRouter()
  
  const username = ref('')
  const password = ref('')

  // Functions
  const submitLogin = async () => {
    if (!username.value || !password.value) {
      return alert('Töltsd ki az összes mezőt a bejelentkezéshez!')
    }

    await AccountStore.loginUser({ username: username.value, password: password.value }).then((serverResData) => {
      alert(serverResData.message)

      if (serverResData.data) {
        AccountStore.setLoggedUser(serverResData.data)
        routerApp.push('/news')

        username.value = ''
        password.value = ''
      }
    })
  }
</script>

<style lang="scss" scoped>
  .login-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    align-self: flex-start;

    width: 350px;

    margin: 0 auto;

    color: white;

    padding: 10px;
    border-radius: 5px;

    background-color: rgba(20, 20, 20, 0.9);

    hr {
      height: 2px;

      border-radius: 15px;
      
      background-color: rgba(112, 212, 120, 0.9);
    }

    .linkButtons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 20px;

      margin-top: 5px;
      margin-bottom: 20px;

      .registerBtn, .forgotdataBtn {
        font-size: 0.7rem;
      }
    }

    .submitBtn {
      background-color: rgba(112, 212, 120, 0.9) !important;
      color: white !important;
    }
  }
</style>