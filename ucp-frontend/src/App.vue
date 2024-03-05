<template>
  <!-- Header Component on top of screen -->
  <HeaderComponent @mousemove="resetTimer"/>

  <!-- Router view for specified routes -->
  <div class="router_view-wrapper" @mousemove="resetTimer">
    <router-view />
  </div>

  <!-- Footer Component on bottom of screen -->
  <FooterComponent @mousemove="resetTimer"/>
</template>

<script setup>
  // Modules Imports
  import HeaderComponent from '@/Components/Header.vue'
  import FooterComponent from '@/Components/Footer.vue'

  import { provide, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
  const routerApp = useRouter()

  const logoutTimer = ref(900) // 5 minutes = 300 seconds
  const mouseMoveTimer = ref(null)

  // Functions
  const resetTimer = () => {
    clearInterval(mouseMoveTimer.value)

    if (!AccountStore.getLoggedUser) return
    
    logoutTimer.value = 900 // Reset timer to default time
    mouseMoveTimer.value = setInterval(() => {
      logoutTimer.value -= 1
      if (logoutTimer.value <= 0) {
        AccountStore.logoutUser()
        routerApp.push('/news')
      }
    }, 1000)
  }

  provide('logoutTimer', logoutTimer)
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    box-sizing: border-box;
    text-decoration: none;

    font-family: "Inter", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
    
  ::-webkit-scrollbar-track {
    background: #0D0D0D;
  }
    
  ::-webkit-scrollbar-thumb {
    background: #252525;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #202020;
  }

  #app {
    background-color: rgba(10, 10, 10, 0.93);

    .router_view-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 20px;

      width: 100%;
      min-height: 100vh;

      padding: 20px;
    }

    hr {
      width: 100%;
      height: 2px;

      margin-top: 10px;
      margin-bottom: 10px;

      background-color: rgb(255, 255, 255);
    }

    input {
      padding: 10px;
      color: black;
      font-weight: 400;
      font-size: 0.8rem;
      
      border-radius: 3px;

      background-color: rgba(255, 255, 255, 0.9);
    }

    /* Lista típusok */
    .list-pointed {
      margin-left: 20px;
      margin-right: 0px;
    }

    /* Szöveg színek */
    .tcolor-red {
      color: #f34b4b;
    }

    .tcolor-blue {
      color: #1c50ec;
    }

    .tcolor-lightblue {
      color: #0d74a9;
    }

    .tcolor-gray {
      color: #454545;
    }

    .tcolor-lightwhite {
      color: #d9d9d978;
    }

    /* Szöveg Formázás */
    .tformat-bold {
      font-weight: 800;
    }

    .tformat-lightbold {
      font-weight: 600;
    }
    
    /* Szöveg méretezés */
    .tsize-title {
      font-size: 1rem;
    }

    /* Animations */
    .anim-hoverscale { transition: all .2s ease-in-out; }
    .anim-hoverscale:hover { transform: scale(1.2); }
  }
</style>
