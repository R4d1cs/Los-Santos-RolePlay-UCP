<template>
  <div class="header-wrapper">
    <router-link to="news" class="server_logo-wrapper anim-hoverscale" />

    <hr class="header-line" v-if="AccountStore.getLoggedUser">
    
    <h6 @click="toggleDropdownMenu()" class="dropdownBtn anim-hoverscale"><i class="pi pi-align-right"></i></h6>

    <ul class="header-links">
      <router-link to="rules" v-if="AccountStore.getLoggedUser" class="link-item"><i class="pi pi-book"></i>Szabályzatok</router-link>
      <router-link to="premiumshop" v-if="AccountStore.getLoggedUser" class="link-item tcolor-lightblue"><i class="pi pi-shop"></i>Prémium Bolt</router-link>
      <router-link to="users" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser.accountData.role == 'admin'" class="link-item"><i class="pi pi-users"></i>Felhasználók kezelése</router-link>
      <router-link to="discord" class="link-item tcolor-blue"><i class="pi pi-discord"></i>Csatlakozás</router-link>
      <router-link :to="AccountStore.getLoggedUser ?? 'login'" class="link-item"><i class="pi pi-user"></i>{{ AccountStore.getLoggedUser ? AccountStore.getLoggedUser.accountData.username + ' (' + AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) + ')' : 'Bejelentkezés' }}</router-link>

      <h6 v-if="AccountStore.getLoggedUser" @click="signOut" class="signOutBtn anim-hoverscale"><i class="pi pi-sign-out"></i> Kilépés</h6>
    </ul>
  </div>
</template>

<script setup>
  // Modules Imports
  import { useRouter } from 'vue-router'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
  const routerApp = useRouter()

  const signOut = () => {
    AccountStore.logoutUser()
    routerApp.push('/news')
  }

  const toggleDropdownMenu = () => {
    const headerLinks = document.querySelector('.header-links');
    headerLinks.style.display = headerLinks.style.display === 'none' ? 'flex' : 'none';
  }
</script>

<style lang="scss" scoped>
  .header-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;

    min-height: 100px;

    font-size: 0.8rem;
    color: white;

    background-image: url('@/Assets/headerBG.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #0D0D0D;

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

    .header-line {
      position: absolute;
      top: 0;

      width: 100%;
      height: 3px; 

      background-color: rgb(255, 192, 120);
    }

    .header-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;

      position: absolute;
      right: 40px;
      top: 15px;

      list-style: none;

      a {
        color: white;

        .link-item {
          display: flex;
          flex-direction: row;
          gap: 8px;

          font-size: 0.8rem;
        }
      }

      .signOutBtn {
        text-align: center;
        font-size: 0.7rem;
        font-weight: normal;
        
        border: 1.5px solid #ffc078b1;
        border-radius: 3px;

        padding: 2px 6px;

        background-color: rgb(255, 192, 120);

        cursor: pointer;
      }
    }

    .dropdownBtn {
      display: none;
      position: absolute;
      top: 20px;
      right: 15px;

      text-align: center;
      font-size: 1rem;
      font-weight: normal;

      padding: 2px 6px;

      cursor: pointer;
    }
  }
</style>