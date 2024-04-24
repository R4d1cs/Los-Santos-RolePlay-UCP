<template>
  <div class="forgot_data-wrapper" v-if="!AccountStore.getLoggedUser">
    <p class="tsize-title tformat-lightbold"><i class="pi pi-inbox"></i>Elfelejtett adatok</p>
    <hr>
    <input type="email" placeholder="E-mail cím" v-model="email">

    <div class="linkButtons">
      <router-link to="login" class="loginBtn tcolor-blue tformat-lightbold"><i class="pi pi-user"></i>Bejelentkezni szeretnél? </router-link>
    </div>

    <input class="submitBtn" type="button" value="Elküldés" @click="submitForgotData">
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
  
  const email = ref('')

  // Functions
  const submitForgotData = async () => {
    if (!email.value) {
      return alert('Töltsd ki az e-mail mezőt az elküldéshez!')
    }

    // await AccountStore.loginUser({ username: username.value, password: password.value }).then((serverResData) => {
    //   alert(serverResData.message)

    //   if (serverResData.data) {
    //     AccountStore.setLoggedUser(serverResData.data)
    //     routerApp.push('/news')

    //     username.value = ''
    //     password.value = ''
    //   }
    // })
  }
</script>

<style lang="scss" scoped>
  .forgot_data-wrapper {
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
      
      background-color: rgba(229, 150, 24, 0.9);
    }

    .linkButtons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 20px;

      margin-top: 5px;
      margin-bottom: 20px;

      .loginBtn {
        font-size: 0.7rem;
      }
    }

    .submitBtn {
      background-color: rgba(229, 150, 24, 0.9) !important;
      color: white !important;
    }
  }
</style>