<template>
  <div class="rules-wrapper" v-if="AccountStore.getLoggedUser">
    <h3 class="tsize-title"><i class="pi pi-book"></i> Szabályzatok</h3>
    <details>
      <summary>Szerver szabályzat leírása</summary>
      <hr>
      <div class="list">
        <br>
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
        <br>
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
          <li><span class="title">- A fegyver csak akkor van elrejtve ha az adott ruhadarab alól nem látszik ki. (Amennyiben még is kilátszódna akkor nyugodtan fel lehet használni IC információnak.)</span></li>
        </ul>
      </div>
      <br>
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
      <div class="list">
        <br>
        <h5>4. Forgalmas/Nyilvános helyekre vonatkozó szabályzat:</h5>
        <ul class="list-pointed">
          <li><span class="title">- Minden ikonnal jelölt hely a térképen és ezeknek az 50 m-es körzetében tilos a rablás / indokolatlan lövöldözés!</span></li>
          <li><span class="title">- Kereskedelmi egységek:</span> boltok, benzinkutak, stb.</li>
          <li><span class="title">- Szolgáltató egységek:</span> fodrászat, szerelőtelep, kávézó, taxiállomás, stb.</li>
          <li><span class="title">- Pénzintézetek:</span> bankfiókok, kis bankok és Állami Bank</li>
          <li><span class="title">- Közintézmények:</span> kórház, munkaügyi központ, stb.</li>
          <li><span class="title">- Rendvédelmi épületek:</span> Los Santos Police Department központ</li>
          <li><span class="title">- Munkahelyek, azok öltözői, állomásai és jármű raktárai.</span></li>
          <li><span class="title">- Nyilvános garázsok, kikötők és hangár.</span></li>
          <li><span class="title">- Lefoglalt járművek garázsa, hangára és kikötője.</span></li>
          <li><span class="title">- Autós parkolók.</span></li>
          <li><span class="title">- Minden olyan, a térképen nem jelölt hely, ahol egyidőben 8+ fő civil tartózkodik.</span></li>
          <li><span class="title">- Jogos önvédelem esetén sikertelen szóbeli felszólítás után, a támadó szándékkal közelítőre figyelmeztető lövés adható le.</span></li>
          <li><span class="title">- Hotel, Motel és magáningatlan nem számít nyilvános helynek!</span></li>
          <li><span class="title">- TILOS bemenekülni a fent sorolt helyekre, annak tudatában, hogy azok védett területek!</span> <span class="title">(Például üldöznek hogy elraboljanak, ezért te bemenekülsz egy forgalmas helyre.)</span></li>
        </ul>
      </div>
      <div class="list">
        <br>
        <h5>5. Illegális frakciókra vonatkozó szabályzat:</h5>
        <ul class="list-pointed">
          <li><span class="title">- Nem nyithat tüzet a frakció HQ-jára.</span></li>
          <li><span class="title">- Merészkedő emberekre nyomós indok nélkül.</span></li>
          <li><span class="title">- Ha egy illegális szerv elrabol egy másik illegális szervben lévő személyt, akkor az ő frakciója köteles váltságdíjat fizetni, ellenkező esetben automatikus frakció ck-ban  részesül abban az esetben ha a frakciójában lévő személyek nem indultak az elrabolt személy megmentésére.</span></li>
          <li><span class="title">- A maximum váltságdíj XXX összeg.</span></li>
          <li><span class="title">- Nem érvényes abban az esetben ha a frakcióban lévő emberek nem elérhetőek.</span></li>
          <li><span class="title">- A legális frakcióban lévő játékosokat nem lehet ilyen módon elrabolni.</span></li>
        </ul>
      </div>
      <div class="list">
        <br>
        <h5>6. Rablás szabályzat:</h5>
        <ul class="list-pointed">
          <li><span class="title">- Rabláshoz kötelező túszt vinni.</span></li>
          <li><span class="title">- Boltrablás esetén nem kötelező megvárni a rendőrök kiérkezését.</span></li>
          <li><span class="title">- Nem lehet váltságdíjat kérni.</span></li>
          <li><span class="title">- Szolgálatban lévő rendőrök nem lehetnek túszok.</span></li>
          <li><span class="title">- Tilos a beépített túsz.</span></li>
          <li><span class="title">- Restart előtt 60 perccel tilos a rablás.</span></li>
          <li><span class="title">- Nemzeti Bank rablása esetén a zsákmányt a rablást követő 15 percben tilos letenni vagy átadni.</span></li>
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
    align-self: start;

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
        .list-pointed {
          display: flex;
          flex-direction: column;
          gap: 5px;

          margin-left: 20px;

          list-style-type: none;
          font-size: 0.9rem;

          li {
            color: rgb(49, 139, 164);
              
            .title {
              color: wheat;

              background-color: rgb(0, 65, 93);
            }
          }
        }
      }
    }
  }
</style>