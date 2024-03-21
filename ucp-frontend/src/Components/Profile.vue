<template>
  <div class="profile-wrapper" v-if="AccountStore.getLoggedUser">
    <div class="cards_item">
      <h4>Fiók adatok:</h4>
      <div class="cards_details">
        <div class="cards_title">{{ AccountStore.getLoggedUser.accountData.username || 'Nincs adat...' }}</div>
        <hr>
        <ul class="cards_context">
          <li><span class="title">Account ID </span><span class="value">{{ AccountStore.getLoggedUser.accountData.accID || 'Nincs adat...' }}</span></li>
          <li><span class="title">E-Mail cím </span><span class="value">{{ AccountStore.getLoggedUser.accountData.email || 'Nincs adat...' }}</span></li>
          <li><span class="title">Rangod </span><span class="value">{{ AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) || 'Nincs adat...' }}</span></li>
          <li><span class="title">Utoljára bejelentkezve </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.updatedAt) || 'Nincs adat...' }}</span></li>
          <li><span class="title">Regisztrálva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.createdAt) || 'Nincs adat...' }}</span></li>
        </ul>
      </div>
    </div>
    <div class="cards_item" v-if="AccountStore.getLoggedUser.charData" style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
      <br>
      <!-- <form id="avatarUploadForm" hidden><input type="file" accept="image/*" id="avatar" @change="uploadAvatar"></form>
      <img src="@/Assets/tesztProfileKép.png" class="charPicture" @click="triggerFileUpload"> -->
      <img src="@/Assets/tesztProfileKép.png" class="charPicture">
      <h4>Karakter adatok:</h4>
      <div class="cards_details">
        <div class="cards_title">{{ AccountStore.getLoggedUser.charData.charName || 'Nincs adat...' }}</div>
        <hr>
        <ul class="cards_context">
          <li><span class="title">Karakter ID </span><span class="value">{{ AccountStore.getLoggedUser.charData.charID || 'Nincs adat...' }}</span></li>
          <li><span class="title">Játszott percek </span><span class="value">{{ AccountStore.getLoggedUser.charData.gameTime >= 60 ? AccountStore.getLoggedUser.charData.gameTime + ' (' + formatPlaytime(AccountStore.getLoggedUser.charData.gameTime) + ')' : AccountStore.getLoggedUser.charData.gameTime + ' perc' || 'Nincs adat...' }}</span></li>
          <li><span class="title">Készpénz </span><span class="value" :style="'background-color: ' + (AccountStore.getLoggedUser.charData.cashBalance > 0 ? '#38E744' : '#E75538')">{{ formatCurrency(AccountStore.getLoggedUser.charData.cashBalance) || 'Nincs adat...' }}</span></li>
          <li><span class="title">Bankszámla </span><span class="value" :style="'background-color: ' + (AccountStore.getLoggedUser.charData.bankBalance > 0 ? '#38E744' : '#E75538')">{{ formatCurrency(AccountStore.getLoggedUser.charData.bankBalance) || 'Nincs adat...' }}</span></li>
          <li><span class="title">Utoljára használva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.charData.updatedAt) || 'Nincs adat...' }}</span></li>
        </ul>
      </div>
    </div>
</div>
</template>

<script setup>
  // Modules Imports
 // import { serverURL } from '@/main'
  import { useAccountStore } from '@/Stores/AccountStore.js'
  import { formatDate, formatCurrency, formatPlaytime } from '@/Utitilites/formatFuncs'

  // Declarations
  const AccountStore = useAccountStore()

  // // Functions
  // const triggerFileUpload = () => {
  //   document.getElementById('avatar').click()
  // }

  // const uploadAvatar = () => {
  //   const form = new FormData(document.getElementById('avatarUploadForm'))

  //   console.log(form)

  //   fetch(`${serverURL}/uploadAvatar`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': false
  //     },
  //     body: form
  //   }).then(data => {
  //     console.log(data)
  //   })
  // }
</script>

<style lang="scss" scoped>
  .profile-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    align-self: flex-start;

    width: 350px;

    color: white;

    padding: 10px;
    border-radius: 5px;

    background-color: rgba(20, 20, 20, 0.9);

    .cards_item {
      display: flex;
      flex-direction: column;
      align-items: start;
      text-align: start;
      gap: 10px;

      border-radius: 5px;

      .cards_details {
        width: 100%;
      }

      .cards_title {
        display: flex;
        gap: 10px;

        font-size: 0.9rem;

        padding: 5px 10px;
        border-radius: 5px;
        background-color: rgb(100, 100, 100);
      }

      .cards_context {
        margin-top: 10px;
        font-size: 0.8rem;
        list-style: none;

        li {
          margin-bottom: 15px;

          .title {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background-color: rgb(48, 48, 48);
          }

          .value {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background-color: rgb(0, 150, 214);
          }

          .title, .value {
            padding: 5px 10px;
          }

          &:last-child {
            margin-bottom: 5px;
          }
        }
      }

      .charPicture {
        width: 100%;

        margin-bottom: 10px;

        &:hover {
          opacity: 0.5;

          cursor: pointer;
        }
      }
    }
  }
</style>
