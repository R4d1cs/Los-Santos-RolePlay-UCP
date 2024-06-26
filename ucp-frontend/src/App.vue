<template>
  <!-- Header Component on top of screen -->
  <HeaderComponent />

  <!-- Router view for specified routes -->
  <div class="router_view-wrapper">
    <router-view />
  </div>

  <!-- Footer Component on bottom of screen -->
  <FooterComponent />
</template>

<script setup>
  // Modules Imports
  import HeaderComponent from '@/Components/Header.vue'
  import FooterComponent from '@/Components/Footer.vue'
  import { useAccountStore } from '@/Stores/AccountStore.js'
  import { serverURL } from '@/main'

  import 'primeicons/primeicons.css'

  // Declarations
  const AccountStore = useAccountStore()

  setInterval(async () => {
    if (!AccountStore.getLoggedUser) return null

    if (!AccountStore.getLoggedUser.accountData) return null

    if (!AccountStore.getLoggedUser.accountData.accID) return null

    try {
      const responseData = await fetch(`${serverURL}/getUserData/${AccountStore.getLoggedUser.accountData.accID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await responseData.json()
      AccountStore.setLoggedUser(responseJson.data)
    } catch (err) {
      console.error(`Error fetching "accounts" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }, 3000)
</script>

<style lang="scss">
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

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 5px;

    height: 5px;
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

  /* This is the full app appearance */
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

    @media (min-width: 768px) and (max-width: 1024px) { /* Lower screen size than 1280px */
      .router_view-wrapper {
        flex-direction: column;
        justify-content: flex-start;

        .news-wrapper {
          width: 100%;

          .loader-wrapper {
            width: 100%;
          }
        }

        .news_rside-wrapper {
          flex-direction: row;

          width: 100%;
        }

        .rules-wrapper, .usermanagment-wrapper, .discord_connecting-wrapper {
          width: 100%;
          height: 100%;
        }

        .page_not_found-wrapper {
          margin: auto;
        }

        .profile-wrapper {
          width: 600px !important;
        }

        .discord_connecting-wrapper {
          height: 100vh;
        }
      }
    }

    @media (min-width: 0px) and (max-width: 768px) { /* Lower screen size than 1280px */
      .router_view-wrapper {
        flex-direction: column;
        justify-content: flex-start;

        .news-wrapper {
          width: 100%;

          .loader-wrapper {
            width: 100%;
          }
        }

        .news_rside-wrapper, .login-wrapper, .register-wrapper, .forgot_data-wrapper {
          width: 100%;
        }

        .rules-wrapper, .usermanagment-wrapper, .discord_connecting-wrapper {
          width: 100%;
          height: 100%;
        }

        .page_not_found-wrapper {
          margin: auto;
        }

        .discord_connecting-wrapper {
          height: 100vh;
        }
      }

      .header-wrapper {
        height: 100%;

        .header-links {
          display: none;
          position: relative;
          top: 0;
          left: 0;
          margin: 100px auto 20px auto;

          flex-direction: column;

          width: 100%;
          height: 100%;
        }

        .dropdownBtn {
          display: block;
        }
      }
    }

    /* Utitlites Templates */
    input, textarea {
      padding: 10px;
      color: black;
      font-weight: 400;
      font-size: 0.8rem;
      
      border-radius: 3px;

      background-color: rgba(255, 255, 255, 0.9);
    }

    .editBtn {
      background-color: rgb(236, 195, 30) !important;
    }

    .saveBtn {
      background-color: rgb(47, 188, 108) !important;
    }

    .deleteBtn {
      background-color: rgb(188, 47, 47) !important;
    }

    .editBtn, .saveBtn, .deleteBtn {
      padding: 5px 7px !important;

      position: relative;

      color: white !important;
    }

    /* Text Colors */
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

    /* Text Formatting */
    .tformat-bold {
      font-weight: 800;
    }

    .tformat-lightbold {
      font-weight: 600;
    }

    /* Animations */
    .anim-hoverscale { transition: all .2s ease-in-out; }
    .anim-hoverscale:hover { transform: scale(1.1); }

    /* Icon format */
    .pi {
      margin-right: 5px !important;
    }

    /* Custom Alings */
    .row {
      display: flex;
      flex-direction: row;
      gap: 15px;

      align-items: center;
      justify-content: center;
    }
  }
</style>
