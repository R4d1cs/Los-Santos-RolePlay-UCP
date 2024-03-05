<template>
  <div class="header-wrapper">
    <router-link to="news" class="server_logo-wrapper" />

    <hr class="header-line" v-if="AccountStore['loggedUser']">

    <ul class="header-links">
      <router-link v-for="{ buttonTitle, buttonPath } in linkButtons" :to="buttonPath">
        <li :class="`link-item ${ buttonTitle['color'] || '' }`">
          <p>{{ buttonTitle['name'] }}</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
  // Modules Imports
  import { ref } from 'vue'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
  const linkButtons = ref([])

  // Check what should contain linkButtonts
  if (AccountStore['loggedUser']) {
    if (AccountStore['loggedUser']['role'] != 'user') {
      linkButtons.value = [
        { buttonTitle: { name: 'Szabályzatok' }, buttonPath: 'rules' },
        { buttonTitle: { name: 'Prémium Bolt', color: 'tcolor-lightblue' }, buttonPath: 'premiumshop' },
        { buttonTitle: { name: 'Segédlet anyagok' }, buttonPath: 'tutorial' },
        { buttonTitle: { name: 'Felhasználók kezelése' }, buttonPath: 'adminpanel' },
        { buttonTitle: { name: 'Csatlakozás', color: 'tcolor-blue' }, buttonPath: 'discord' },
        { buttonTitle: { name: `${ AccountStore['loggedUser']['username'] } (5:00)` }, buttonPath: '' }
      ]
    } else {
      linkButtons.value = [
        { buttonTitle: { name: 'Szabályzatok' }, buttonPath: 'rules' },
        { buttonTitle: { name: 'Prémium Bolt', color: 'tcolor-lightblue' }, buttonPath: 'premiumshop' },
        { buttonTitle: { name: 'Segédlet anyagok' }, buttonPath: 'tutorial' },
        { buttonTitle: { name: 'Csatlakozás', color: 'tcolor-blue' }, buttonPath: 'discord' },
        { buttonTitle: { name: `${ AccountStore['loggedUser']['username'] } (5:00)` }, buttonPath: '' }
      ]
    }
  } else {
    linkButtons.value = [
      { buttonTitle: { name: 'Csatlakozás', color: 'tcolor-blue' }, buttonPath: 'discord' },
      { buttonTitle: { name: 'Bejelentkezés' }, buttonPath: 'login' }
    ]
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
      gap: 15px;

      position: absolute;
      right: 100px;
      top: 15px;

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