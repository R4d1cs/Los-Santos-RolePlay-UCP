<template>
  <div class="discord_connecting-wrapper">
    <section class="greetings">
      <h3>Csatlakozz a közösségünkhez a Discord-on!</h3>
      <p>Készen állsz arra, hogy a FiveM közösségének egy aktív részévé válj? Csatlakozz hozzánk a Discord szerverünkön keresztül, ahol számos lehetőség vár rád, hogy még teljesebbé tegye játékélményedet a FiveM világában!</p>
    </section>

    <section class="details">
      <h4>A Discord szerverünkön:</h4>
      <ul>
        <li>Társaság: Ismerj meg új embereket, beszélgess és osszd meg tapasztalataidat más játékosokkal.</li>
        <li>Versenyek és Események: Vegyél részt izgalmas versenyeken, rendezvényeken és egyéb közösségi eseményeken, ahol megmutathatod képességeidet és kiépíthetsz barátságokat.</li>
        <li>Segítség és Támogatás: Bármilyen kérdésed vagy problémád van, a közösségünk mindig itt van, hogy segítsen és támogasson téged.</li>
      </ul>
      <p><a href="https://discord.gg/QnSRYpTxsr" target="_blank" class="tformat-bold tcolor-blue">Csatlakozz</a> most, és ne maradj le a közösség legfrissebb híreiről, eseményeiről és beszélgetéseiről!</p>
    </section>

    <section class="endings">
      <p>Ne felejts el bemutatkozni, hogy üdvözölhessünk téged, és olvasd el a szabályzatokat, hogy mindenki számára kellemes maradjon a hangulat a szerveren.</p>
      <h5 class="tformat-lightbold">Várunk rád a FiveM közösségünkben!</h5>
    </section>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .discord_connecting-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;

    width: 1300px;

    color: white;

    padding: 50px;

    .greetings, .details, .endings {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>