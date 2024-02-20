<template>
  <div class="login-wrapper">
    <p class="tsize-title tformat-lightbold">Bejelentkezés</p>
    <hr>
    <input type="text" placeholder="Felhasználónév">
    <input type="password" placeholder="Jelszó">
    <input class="submitBtn" type="button" value="Bejelentkezés">
  </div>
</template>

<style lang="scss" scoped>
  .login-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    align-self: flex-start;

    width: 350px;

    color: white;

    padding: 10px;
    border-radius: 5px;

    background-color: rgba(20, 20, 20, 0.9);

    .submitBtn {
      background-color: rgba(112, 212, 120, 0.9) !important;
      color: white !important;
    }
  }
</style>