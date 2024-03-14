<template>
  <div class="rules-wrapper" v-if="AccountStore.getLoggedUser">
    <h3 class="tsize-title">Szabályzatok</h3>
    <details>
      <summary>Szerver szabályzat leírása</summary>
      <hr>
      <div class="list">
        <h5>1. Alapfogalmak:</h5>
        <ul class="list-pointed">
          <li><span class="title">- RP (RolePlay):</span> Szerepjáték.</li>
          <li><span class="title">- IRL (InRealLife):</span> A való életben.</li>
          <li><span class="title">- IG (InGame):</span> A játékon belül.</li>
          <li><span class="title">- IC (In Character):</span> Karakteren belül, történő cselekményre mondjuk.</li>
          <li><span class="title">- OOC (Out Of Caracter):</span> Karakteren kívül, történő cselekményre mondjuk.</li>
          <li><span class="title">- IC-OOC keverése:</span> OOC kereskedelem vagy bármilyen való életben történő dolog keverése a játékbeli élettel és fordítva.</li>
          <li><span class="title">- NonRP (Non-RolePlay):</span> Nem megfelelően játszott karakter. Például a karakter egy golyót kapott és a játékos egy horzsolásnak kezeli.</li>
          <li><span class="title">- MG (MetaGaming):</span> OOC információkat felhasználni IC célokra.</li>
          <li><span class="title">- DM (DeathMatch):</span> Előzmény nélküli ölés.</li>
          <li><span class="title">- RK (RevengeKill):</span> Halál utáni bosszúállás.</li>
          <li><span class="title">- PG (PowerGaming):</span> Hősködés.</li>
          <li><span class="title">- DB (DriveBy):</span> Járművel való ölés.</li>
          <li><span class="title">- SK (SpawnKill):</span> Spawnoláskor való ölés. (Ide sorolható a házból való kilépéskor történő öléskor)</li>
          <li><span class="title">- Force RP:</span> Erőltetett RP.</li>
          <li><span class="title">- CK (CharacterKill):</span> Karakter törlés, hosszabb RP-t igénylő karakter kivégzés.</li>                                                       
          <li><span class="title">- Szereptévesztés:</span> Például legális frakcióban szolgálat közben tilos illegális cselekményt végrehajtani.</li>
        </ul>
      </div>
      <div class="list">
        <h5>2. Általános szabályzat:</h5>
        <ul class="list-pointed">
          <li><span class="title">- Az öngyilkos RP-t csak az Adminok engedélyével lehet megtenni.</span></li>
          <li><span class="title">- Tilos a bugokat kihasználni.(Amennyiben észlelsz egy bugot rögtön jelezd adminnak vagy a Tulajok egyikének)</span></li>
          <li><span class="title">- Tilos irritáló vagy zajos hangtorzító használata.</span></li>
          <li><span class="title">- Üldözéskor tilos előre nem kihelyezett gépjárművet garázsból kivenni.</span></li>
          <li><span class="title">- Fejlövés/fejsérülés esetén a karakter nem emlékezhet semmire.</span></li>
          <li><span class="title">- A rendvédelmi eszközöket/fegyvereket tilos eltulajdonítani.</span></li>
          <li><span class="title">- Bármilyen textúra vagy modpack használata tilos.</span></li>
          <li><span class="title">- Az NPC-ket ugyanolyan játékosnak kell kezelni mint bárki mást.</span></li>
          <li><span class="title">- Szabálysértést köteles vagy jelezni az adminoknak report formájában.</span></li>
          <li><span class="title">- A kórházból a szökési kísérlet engedélyezett.</span></li>
          <li><span class="title">- Kórházi ellátás esetén tilos visszamenni a tűzharcba.</span></li>
          <li><span class="title">- A szögesdrótot kizárólag utakra és járdákra lehet lehelyezni.</span></li>
          <li><span class="title">- A fegyver csak akkor van elrejtve ha az adott ruhadarab alól nem látszik ki.</span> <span class="title"> Amennyiben még is kilátszódna akkor nyugodtan fel lehet használni IC információnak.</span></li>
        </ul>
      </div>
      <div class="list">
        <h5>3. Karakter létrehozási szabályzat:</h5>
        <ul class="list-pointed">
          <li><span class="title">- A nevednek valósághoz igazodónak kell lennie: Keresztnév, Utónév.</span></li>
          <li><span class="title">- Tilos irreális, életszerűtlen nevet használni! (Pl.: Zsiguli Lengéscsillapító)</span></li>
          <li><span class="title">- Tilos szándékosan más, a szerveren játszó játékos nevét használnod!</span></li>
          <li><span class="title">- Tilos közszereplő, filmes karakter, híresség, történelmi személy, vagy politikus nevét felvenni!</span></li>
          <li><span class="title">- Tilos sértő, rasszista és sértő neveket használni! (Pl.: McBus Luck)</span></li>
          <li><span class="title">- Háborús bűnöst, történelmi személyt, közszereplőt tilos RP-zni!</span></li>
        </ul>
      </div>
    </details>
    <details>
      <summary>Discord szabályzat leírása</summary>
      <hr>
      <div class="list">
        <ul class="list-pointed">
          <li><span class="title">- Tilos a káromkodás.</span></li>
          <li><span class="title">- Tilos pornográf tartalmat megosztani vagy profilképként használni.</span></li>
          <li><span class="title">- Tilos személyes adatokat publikálni.</span></li>
          <li><span class="title">- CAPS LOCK-ot csak indokolt esetben használj és ne írj csupa nagybetűvel.</span></li>
          <li><span class="title">- Tilos a zaklatás és fenyegetés.</span></li>
          <li><span class="title">- Tilos a törölt tartalmak újra közlése.</span></li>
          <li><span class="title">- Mindenkivel úgy beszélj ahogy te másoktól elvárod.</span></li>
          <li><span class="title">- Tilos a rangoddal visszaélni.</span></li>
          <li><span class="title">- Más szerverek hirdetése tilos.</span></li>
          <li><span class="title">- Szándékos rosszindulatból vagy kontextusba nem illő emojikat használni tilos(skull, clown).</span></li>
        </ul>
      </div>
    </details>
    <details v-if="AccountStore.getLoggedUser.role == 'admin'">
      <summary>Admin szabályzat leírása</summary>
      <hr>
      <div class="list">
        <h5>1. Rablásra vonatkozó szabályzat: (Ez még nem hivatalos adatok!)</h5>
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
  // Modules Imports
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()
</script>

<style lang="scss" scoped>
  .rules-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-self: flex-start;

    margin: 0 5%;

    width: 1200px;

    color: white;

    details {
      padding: 15px;

      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.2);

      summary {
        font-size: 0.9rem;
      }

      .list {
        margin-left: 15px;

        h5 {
          margin-top: 25px;
          margin-bottom: 15px;
        }

        .list-pointed {
          display: flex;
          flex-direction: column;
          gap: 10px;

          margin-top: 5px;

          list-style-type: none;
          font-size: 0.9rem;

          li {
            color: rgb(49, 139, 164);
              
            .title {
              color: wheat;

              padding: 4px;

              background-color: rgb(0, 65, 93);
            }
          }
        }
      }
    }
  }
</style>