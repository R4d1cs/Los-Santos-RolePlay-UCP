<template>
  <div class="register-wrapper">
    <p class="tsize-title tformat-lightbold">Regisztráció</p>
    <hr>
    <input type="text" placeholder="Felhasználónév" v-model="username">
    <input type="password" placeholder="Jelszó" v-model="password">
    <input type="password" placeholder="Jelszó mégegyszer" v-model="confirmPassword">
    <input type="email" placeholder="E-mail cím" v-model="email">

    <router-link to="login" class="loginBtn tcolor-blue tformat-lightbold">Bejelentkezni szeretnél? </router-link>

    <input class="submitBtn" type="button" value="Regisztráció" @click="submitRegistration">
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
  const confirmPassword = ref('')
  const email = ref('')

  // Functions
  const submitRegistration = async () => {
    if (!username.value || !password.value || !confirmPassword.value || !email.value) {
      return alert('Töltsd ki az összes mezőt a regisztrációhoz!')
    }

    if (password.value !== confirmPassword.value) {
      return alert('A jelszavak nem egyeznek meg!')
    }

    await AccountStore.registerUser({ username: username.value, password: password.value, email: email.value }).then((serverResData) => {
      if (serverResData[0] !== 200) return alert(serverResData[1])
      
      routerApp.push('/login')
      alert(serverResData[1])

      username.value = ''
      password.value = ''
      confirmPassword.value = ''
      email.value = ''
    })
  }
</script>

<style lang="scss" scoped>
  .register-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    align-self: flex-start;

    width: 350px;

    color: white;

    padding: 10px;
    border-radius: 5px;

    background-color: rgba(20, 20, 20, 0.9);

    .loginBtn {
      margin: auto;

      margin-top: 5px;
      margin-bottom: 20px;
      
      font-size: 0.7rem;
    }

    .submitBtn {
      background-color: rgba(54, 64, 201, 0.9) !important;
      color: white !important;
    }
  }
</style>