<template>
  <div class="footer-wrapper">
    <p>&copy; {{ getCurrentYear() }} LOS-SANTOS Kft. - Minden jog fenntartva!</p>
    <p>Kapcsolatfelvétel: <span class="tcolor-blue tformat-lightbold">support@lsrp-game.com</span></p>
  </div>
</template>

<script setup>
  const getCurrentYear = function () {
    return new Date().getFullYear()
  }
</script>

<style lang="scss" scoped>
  .footer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;

    height: 100px;

    font-size: 0.8rem;
    color: white;

    background-color: #0D0D0D;
  }
</style>