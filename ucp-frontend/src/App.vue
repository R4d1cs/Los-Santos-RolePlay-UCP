<template>
  <div class="router_view-wrapper">
    <router-view />
  </div>
  <FooterComponent />
</template>

<script setup>
  import FooterComponent from '@/Components/Footer.vue'
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
    background-color: rgba(0, 0, 0, 0.9);

    .router_view-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      gap: 20px;

      min-width: 100%;
      min-height: 100vh;

      padding: 20px 100px;
    }
  }

  /* Text Colors */
  .tcolor-blue {
    color: #1c50ec;
  }

  .tcolor-lightblue {
    color: #0d74a9;
  }

  /* Text Formatting */
  .text-bold {
    font-weight: 600;
  }
</style>
