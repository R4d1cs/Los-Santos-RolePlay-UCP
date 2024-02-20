<template>
  <div class="news-wrapper">
    <p class="tsize-title tformat-lightbold">Hírek</p>
    <div class="news-items">
      <div class="news-item" v-for="{ newsTitle, newsDate, newsContext } in newsItems">
        <div class="news-date">{{ newsDate }}</div>
        <div class="news-title">{{ newsTitle }}</div>
        <div class="news-context">{{ newsContext }}</div>
	    </div>
    </div>
  </div>
  <div class="news_rside-wrapper">
    <LoginComponent style="width: 100%;" />

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
  import { ref } from 'vue'
  import LoginComponent from '@/Components/Login'

  const newsItems = ref([
    { newsTitle: 'Los Santos Autós Verseny', newsDate: '2024. 01. 12. 05:10', newsContext: 'Gyere el és tegyed próbára a legjobb versenyzőket a városban.' },
    { newsTitle: 'Los Santos Formula1 Verseny', newsDate: '2024. 01. 12. 15:10', newsContext: 'A város legnagyobb formula1-es versenye, ne hagyd ki, hogyha szeretnéd kipróbálni magad.' }
  ])
</script>

<style lang="scss" scoped>
  .news-wrapper {
    display: flex;
    flex-direction: column;

    align-self: flex-start;

    width: 1100px;

    color: white;

    .news-items {
      display: flex;
      flex-direction: column;
      gap: 10px;

      margin-top: 10px;

      width: 100%;

      .news-item {
        display: flex;
        flex-direction: column;
        align-items: start;
        text-align: start;

        padding: 10px;
        border-radius: 5px;

        background-color: #171717;

        .news-date {
          color: black;
          font-size: 0.8rem;
          font-weight: 500;

          padding: 3px;
          border-radius: 5px;

          background-color: #ffffff;
        }

        .news-title {
          margin-top: 15px;
          font-size: 1.2rem;
        }

        .news-context {
          margin-top: 30px;

          font-size: 0.9rem;
          text-shadow: 1px 2px #000000;
        }
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

        font-size: 18px;
      }

      .cards_context {
        margin-top: 25px;

        font-size: 15px;
        text-shadow: 1px 2px #000000;

        padding: 0px 20px;
      }
    }
  }
</style>