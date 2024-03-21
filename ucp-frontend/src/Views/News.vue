<template>
  <div class="news-wrapper">
    <h3>Hírek <input type="button" @click="createNews()" class="createBtn" value="Új hír létrehozása" v-if="AccountStore.getUserGroup() == 'admin'"></h3>
    <div class="loader-wrapper" v-if="newsDatas.length == 0">
      <div class="spinner"></div>
      <span>Hírek betöltése...</span>
    </div>

    <div class="news-items" v-if="newsDatas.length > 0">
      <NewsItemComponent v-for="item in newsDatas" :data="item" />
    </div>
  </div>

  <div class="news_rside-wrapper">
    <LoginComponent style="width: 100%;" />
    <ProfileComponent style="width: 100%;" />

    <div class="cards_item">
      <div class="cards_title">Minimum rendszerkövetelmények:</div>
      <ul class="cards_context">
        <li>Operációs rendszer: Windows 10</li>
        <li>Processzor: Intel Core 2 Q6600 @ 2.40GHz / AMD Phenom 9850 @ 2.5GHz</li>
        <li>Videókártya: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB / Intel HD GT2</li>
        <li>Memória: 8GB</li>
        <li>Tárhely: 105GB + ~4GB</li>
      </ul>
    </div>
    <div class="cards_item">
      <div class="cards_title">Ajánlott rendszerkövetelmények:</div>
      <ul class="cards_context">
        <li>Operációs rendszer: Windows 10, Windows 11</li>
        <li>Processzor: Intel Core i5 3470 @ 3.2GHz / AMD X8 FX-8350 @ 4GHz</li>
        <li>Videókártya: NVIDIA GTX 660 2GB / AMD HD7870 2GB</li>
        <li>Memória: 16GB</li>
        <li>Tárhely: 105GB + ~8GB</li>
        <li>Képernyő felbontás: 1920x1080</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  // Modules Imports
  import { ref } from 'vue'
  import LoginComponent from '@/Components/Login'
  import ProfileComponent from '@/Components/Profile.vue';
  import NewsItemComponent from '@/Components/NewsItem.vue';
  import { serverURL } from '@/main'

  import { useNewsStore } from '@/Stores/NewsStore.js'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const newsDatas = ref([])
  const NewsStore = useNewsStore()
  const AccountStore = useAccountStore()

  // Functions
  const createNews = async () => {
    console.log('Új hír!')
    // try {
    //   await fetch(`${serverURL}/news_create`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ title: 'Hír név', date: '2024-20-0', context: 'Kontextus' })
    //   }).then(() => {
    //     location.reload();
    //   })
    // } catch (err) {
    //   console.error(`Error fetching "news" table! (Err: ${err})`)
    //   throw new Error('Internal server error')
    // }
  }

  // Fill newsDatas table with current news
  setTimeout(() => {
    NewsStore.getNews.then(data => newsDatas.value = data)
  }, 400)
</script>

<style lang="scss" scoped>
  .news-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: flex-start;

    width: 850px;

    color: white;

    .news-items {
      display: flex;
      flex-direction: column;
      gap: 10px;

      margin-top: 10px;

      width: 100%;
    }


    h3 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .createBtn {
        padding: 5px 7px !important;

        position: relative;

        color: white !important;

        background-color: rgb(81, 205, 79) !important;
      }
    }

    .loader-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;

      width: 850px;
      height: 100vh;

      color: white;
      font-size: 0.8rem;

      .spinner {
        width: 30px;
        height: 30px;

        border: 3px solid #f3f3f3; /* Light grey */
        border-top: 3px solid rgb(255, 192, 120); /* Blue */
        border-radius: 50%;
        animation: spinAnimation 2s linear infinite;
      }

      @keyframes spinAnimation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  } 

  .news_rside-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    align-self: flex-start;

    width: 350px;

    color: white;

    .cards_item {
      display: flex;
      flex-direction: column;
      align-items: start;
      text-align: start;

      padding: 10px;
      border-radius: 5px;

      background-color: #171717;

      .cards_title {
        display: flex;
        gap: 10px;

        font-size: 0.9rem;
      }

      .cards_context {
        margin-top: 10px;

        font-size: 0.8rem;
        text-shadow: 1px 2px #000000;

        padding: 0px 20px;
      }
    }
  }
</style>