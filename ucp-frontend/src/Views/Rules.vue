<template>
  <div class="rules-wrapper">
    <h3 class="tsize-title">Szabályzatok</h3>
    <br>
    <details>
      <summary>Szerver szabályzat leírása</summary>
      <hr>
      <div class="list">
        <h4>1. Alapfogalmak:</h4>
        <ul class="list-pointed">
          <li>RP (RolePlay): Szerepjáték.</li>
          <li>IRL (InRealLife): A való életben.</li>
          <li>IG (InGame): A játékon belül.</li>
          <li>IC (In Character): Karakteren belül, történő cselekményre mondjuk.</li>
          <li>OOC (Out Of Caracter): Karakteren kívül, történő cselekményre mondjuk.</li>
          <li>IC-OOC keverése: OOC kereskedelem vagy bármilyen való életben történő dolog keverése a játékbeli élettel és fordítva.</li>
          <li>NonRP (Non-RolePlay): Nem megfelelően játszott karakter. Például a karakter egy golyót kapott és a játékos egy horzsolásnak kezeli.</li>
          <li>MG (MetaGaming): OOC információkat felhasználni IC célokra.</li>
          <li>DM (DeathMatch): Előzmény nélküli ölés.</li>
          <li>RK (RevengeKill): Halál utáni bosszúállás.</li>
          <li>PG (PowerGaming): Hősködés.</li>
          <li>DB (DriveBy): Járművel való ölés.</li>
          <li>SK (SpawnKill): Spawnoláskor való ölés. (Ide sorolható a házból való kilépéskor történő öléskor)</li>
          <li>Force RP: Erőltetett RP.</li>
          <li>CK (CharacterKill): Karakter törlés, hosszabb RP-t igénylő karakter kivégzés.</li>                                                       
          <li>Szereptévesztés: Például legális frakcióban szolgálat közben tilos illegális cselekményt végrehajtani.</li>
        </ul>
      </div>
      <div class="list">
        <h4>2. Általános szabályzat:</h4>
        <ul class="list-pointed">
          <li>Az öngyilkos RP-t csak az Adminok engedélyével lehet megtenni.</li>
          <li>Tilos a bugokat kihasználni.(Amennyiben észlelsz egy bugot rögtön jelezd adminnak vagy a Tulajok egyikének)</li>
          <li>Tilos irritáló vagy zajos hangtorzító használata.</li>
        </ul>
      </div>
    </details>
    <details>
      <summary>Discord szabályzat leírása</summary>
      <hr>
      <div class="list">
        <ul class="list-pointed">
          <li>Tilos a káromkodás.</li>
          <li>Tilos pornográf tartalmat megosztani vagy profilképként használni.</li>
          <li>Tilos személyes adatokat publikálni.</li>
          <li>CAPS LOCK-ot csak indokolt esetben használj és ne írj csupa nagybetűvel.</li>
          <li>Tilos a zaklatás és fenyegetés.</li>
          <li>Tilos a törölt tartalmak újra közlése.</li>
          <li>Mindenkivel úgy beszélj ahogy te másoktól elvárod.</li>
          <li>Tilos a rangoddal visszaélni.</li>
          <li>Más szerverek hirdetése tilos.</li>
          <li>Szándékos rosszindulatból vagy kontextusba nem illő emojikat használni tilos(skull, clown).</li>
        </ul>
      </div>
    </details>
    <details v-if="AccountStore['loggedUser']['role'] != 'user'">
      <summary>Admin szabályzat leírása</summary>
      <hr>
      <div class="list">
        <h4>1. Rablásra vonatkozó szabályzat:</h4>
        <ul class="list-pointed">
          <li>Tilos a káromkodás.</li>
          <li>Tilos pornográf tartalmat megosztani vagy profilképként használni.</li>
          <li>Tilos személyes adatokat publikálni.</li>
          <li>CAPS LOCK-ot csak indokolt esetben használj és ne írj csupa nagybetűvel.</li>
          <li>Tilos a zaklatás és fenyegetés.</li>
          <li>Tilos a törölt tartalmak újra közlése.</li>
          <li>Mindenkivel úgy beszélj ahogy te másoktól elvárod.</li>
          <li>Tilos a rangoddal visszaélni.</li>
          <li>Más szerverek hirdetése tilos.</li>
          <li>Szándékos rosszindulatból vagy kontextusba nem illő emojikat használni tilos(skull, clown).</li>
        </ul>
      </div>
    </details>
  </div>
</template>

<script setup>
  import { useAccountStore } from '@/Stores/AccountStore.js'

  const AccountStore = useAccountStore()
</script>

<style lang="scss" scoped>
  .rules-wrapper {
    display: flex;
    flex-direction: column;

    align-self: flex-start;

    width: 1100px;

    color: white;

    details {
      margin-bottom: 15px;

      padding: 15px;

      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.2);

      .list {
        margin-bottom: 20px;
        margin-left: 15px;

        .list-pointed {
          font-size: 0.9rem;
        }
      }
    }
  }
</style>