<template>
  <div class="footer-wrapper">
    <p>&copy; {{ new Date().getFullYear() }} LOS-SANTOS Kft. - Minden jog fenntartva!</p>
    <p><i class="pi pi-envelope"></i>Kapcsolatfelvétel: <span class="tcolor-blue tformat-lightbold">support@lsrp-game.com</span></p>
  </div>
</template>

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