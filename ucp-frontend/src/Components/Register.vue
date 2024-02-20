<template>
  <div class="register-wrapper">
    <p class="tsize-title tformat-lightbold">Regisztráció</p>
    <hr>
    <input type="text" placeholder="Felhasználónév">
    <input type="password" placeholder="Jelszó">
    <input type="password" placeholder="Jelszó mégegyszer">
    <input type="email" placeholder="E-mail cím">

    <router-link to="login" class="loginBtn tcolor-blue tformat-lightbold">Bejelentkezni szeretnél? </router-link>

    <input class="submitBtn" type="button" value="Regisztráció">
  </div>
</template>

<style lang="scss" scoped>
  .register-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    align-self: flex-start;

    width: 350px;

    color: white;

    padding: 10px;
    border-radius: 5px;

    background-color: rgba(20, 20, 20, 0.9);

    .loginBtn {
      margin: auto;

      margin-top: 5px;
      margin-bottom: 20px;
      
      font-size: 0.7rem;
    }

    .submitBtn {
      background-color: rgba(54, 64, 201, 0.9) !important;
      color: white !important;
    }
  }
</style>