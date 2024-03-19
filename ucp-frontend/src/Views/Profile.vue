<template>
  <div class="profile-wrapper" v-if="AccountStore.getLoggedUser">
    <h3 class="tsize-title">Profilod</h3>
    <div class="wrappers">
      <div class="profile_lside-wrapper">
        <div class="cards_item">
          <div class="cards_details">
            <div class="cards_title">{{ AccountStore.getLoggedUser.accountData.username || 'Nincs adat...' }}</div>
            <hr>
            <ul class="cards_context">
              <li><span class="title">Account ID </span><span class="value">{{ AccountStore.getLoggedUser.accountData.accID || 'Nincs adat...' }}</span></li>
              <li><span class="title">E-Mail cím </span><span class="value">{{ AccountStore.getLoggedUser.accountData.email || 'Nincs adat...' }}</span></li>
              <li><span class="title">Rangod </span><span class="value">{{ AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Utoljára online </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.updatedAt) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Regisztrálva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.createdAt) || 'Nincs adat...' }}</span></li>
            </ul>
          </div>
        </div>
        <div class="cards_item" v-if="AccountStore.getLoggedUser.charData" style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
          <img src="@/Assets/tesztProfileKép.png" class="charPicture">
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
      <div class="profile_center-wrapper">
        <div class="cards_item">
          <div class="cards_details">
            <div class="cards_title">Banok ({{ AccountStore.getLoggedUser.accountData.bans || 'Nincs adat...' }})</div>
            <hr>
            <div class="cards_context" v-if="!AccountStore.getLoggedUser.accountData.bans">Nincs találat!</div>
            <ul class="cards_context" v-if="AccountStore.getLoggedUser.accountData.bans">
              <li><span class="title">Account ID </span><span class="value">{{ AccountStore.getLoggedUser.accountData.accID || 'Nincs adat...' }}</span></li>
              <li><span class="title">E-Mail cím </span><span class="value">{{ AccountStore.getLoggedUser.accountData.email || 'Nincs adat...' }}</span></li>
              <li><span class="title">Rangod </span><span class="value">{{ AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Utoljára online </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.updatedAt) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Regisztrálva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.createdAt) || 'Nincs adat...' }}</span></li>
            </ul>
          </div>
        </div>
        <div class="cards_item">
          <div class="cards_details">
            <div class="cards_title">Adminjailek ({{ AccountStore.getLoggedUser.accountData.jails || 'Nincs adat...' }})</div>
            <hr>
            <div class="cards_context" v-if="!AccountStore.getLoggedUser.accountData.jails">Nincs találat!</div>
            <ul class="cards_context" v-if="AccountStore.getLoggedUser.accountData.jails">
              <li><span class="title">Account ID </span><span class="value">{{ AccountStore.getLoggedUser.accountData.accID || 'Nincs adat...' }}</span></li>
              <li><span class="title">E-Mail cím </span><span class="value">{{ AccountStore.getLoggedUser.accountData.email || 'Nincs adat...' }}</span></li>
              <li><span class="title">Rangod </span><span class="value">{{ AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Utoljára online </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.updatedAt) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Regisztrálva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.createdAt) || 'Nincs adat...' }}</span></li>
            </ul>
          </div>
        </div>
        <div class="cards_item">
          <div class="cards_details">
            <div class="cards_title">Kickek ({{ AccountStore.getLoggedUser.accountData.kicks || 'Nincs adat...' }})</div>
            <hr>
            <div class="cards_context" v-if="!AccountStore.getLoggedUser.accountData.kicks">Nincs találat!</div>
            <ul class="cards_context" v-if="AccountStore.getLoggedUser.accountData.kicks">
              <li><span class="title">Account ID </span><span class="value">{{ AccountStore.getLoggedUser.accountData.accID || 'Nincs adat...' }}</span></li>
              <li><span class="title">E-Mail cím </span><span class="value">{{ AccountStore.getLoggedUser.accountData.email || 'Nincs adat...' }}</span></li>
              <li><span class="title">Rangod </span><span class="value">{{ AccountStore.getUserGroupName(AccountStore.getLoggedUser.accountData.role) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Utoljára online </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.updatedAt) || 'Nincs adat...' }}</span></li>
              <li><span class="title">Regisztrálva </span><span class="value">{{ formatDate(AccountStore.getLoggedUser.accountData.createdAt) || 'Nincs adat...' }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Modules Imports
  import { useAccountStore } from '@/Stores/AccountStore.js'
  import { formatDate, formatCurrency, formatPlaytime } from '@/Utitilites/formatFuncs'

  // Declarations
  const AccountStore = useAccountStore()
</script>

<style lang="scss" scoped>
  .profile-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-self: flex-start;

    margin: 0 5%;

    width: 1200px;

    color: white;

    .wrappers {
      display: flex;
      flex-direction: row;
      gap: 50px;
    }

    .profile_lside-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      align-self: flex-start;

      width: 330px;

      color: white;

      .cards_item {
        display: flex;
        flex-direction: column;
        align-items: start;
        text-align: start;

        border-radius: 5px;

        background-color: #171717;

        .cards_details {
          width: 100%;
          padding: 10px;
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
        }
      }
    }

    .profile_center-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      align-self: flex-start;

      width: 820px;

      color: white;

      .cards_item {
        display: flex;
        flex-direction: column;
        align-items: start;
        text-align: start;

        border-radius: 5px;

        background-color: #171717;

        .cards_details {
          width: 100%;
          padding: 10px;
        }

        .cards_title {
          display: flex;
          gap: 10px;

          font-size: 0.9rem;
        }

        .cards_context {
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
              margin-bottom: 0;
            }
          }
        }
      }
    }
   }
</style>
