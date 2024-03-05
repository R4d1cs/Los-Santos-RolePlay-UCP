<template>
  <div class="header-wrapper">
    <router-link to="news" class="server_logo-wrapper anim-hoverscale" />

    <hr class="header-line" v-if="AccountStore.getLoggedUser">

    <ul class="header-links">
      <router-link to="rules" v-if="AccountStore.getLoggedUser">
        <li class="link-item">Szabályzatok</li>
      </router-link>
      <router-link to="premiumshop" v-if="AccountStore.getLoggedUser">
        <li class="link-item tcolor-lightblue">Prémium Bolt</li>
      </router-link>
      <router-link to="tutorial" v-if="AccountStore.getLoggedUser">
        <li class="link-item">Segédlet anyagok</li>
      </router-link>
      <router-link to="usercontol" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser['role'] == 'admin'">
        <li class="link-item">Felhasználók kezelése</li>
      </router-link>
      <router-link to="discord">
        <li class="link-item tcolor-blue">Csatlakozás</li>
      </router-link>
      <router-link :to=" AccountStore.getLoggedUser ? 'profile' : 'login'">
        <li class="link-item">{{ AccountStore.getLoggedUser ? AccountStore.getLoggedUser['username'] + ' (' + formatCountdown(logoutTimer) + ')' : 'Bejelentkezés' }}</li>
      </router-link>

      <h6 v-if="AccountStore.getLoggedUser" @click="signOut" class="anim-hoverscale">-></h6>
    </ul>
  </div>
</template>

<script setup>
  // Modules Imports
  import { ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
  const routerApp = useRouter()
  const logoutTimer = inject('logoutTimer')

  const signOut = () => {
    AccountStore.logoutUser()
    routerApp.push('/news')
  }

  // Utitlites
  const formatCountdown = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
</script>

<style lang="scss" scoped>
  .header-wrapper {
    min-height: 100px;

    background-image: url('@/Assets/headerBG.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;

    .server_logo-wrapper {
      position: absolute;
      top: 25px;
      left: 40px;

      width: 100px;
      height: 50px;
      
      background-image: URL('@/Assets/serverLogo.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .header-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;

      position: absolute;
      right: 100px;
      top: 15px;

      h6 {
        margin-left: -7px;

        font-size: 0.7rem !important;
        color: white;
        
        border: 1.5px solid #ffc078b1;
        border-radius: 3px;

        padding: 0;
        padding-left: 2px;

        background-color: rgb(255, 192, 120);

        opacity: 0.8;

        cursor: pointer;
      }

      a {
        color: white;
        list-style-type: none;

        .link-item {
          display: flex;
          flex-direction: row;
          gap: 8px;

          font-size: 0.8rem;
        }
      }
    }

    .header-line {
      margin: 0 !important; 

      height: 3px !important; 

      background-color: rgb(255, 192, 120) !important;

      opacity: 0.8;
    }
  }
</style>