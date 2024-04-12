<template>
  <div class="usermanagment-wrapper" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser.accountData.role == 'admin'">
    <h3 class="tsize-title"><i class="pi pi-users"></i> Felhasználók kezelése</h3>
    <div class="loader-wrapper" v-if="usersDatas.length == 0">
      <div class="spinner"></div>
      <span>Felhasználók betöltése...</span>
    </div>
    <div class="ctable">
      <table v-if="usersDatas.length > 0">
        <thead>
          <th>AccountID</th>
          <th>Felhasználónév</th>
          <th>E-Mail cím</th>
          <th>Jogosultság</th>
          <th>Utoljára bejelentkezve</th>
          <th>Regisztráció időpontja</th>
          <th>Műveletek</th>
        </thead>
        <tbody>
          <tr v-for="user in usersDatas">
            <td>{{ user.accID }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ AccountStore.getUserGroupName(user.role) }}</td>
            <td>{{ formatDate(user.updatedAt) }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td><input type="button" @click="deleteUser(user.accID)" class="deleteBtn" value="Törlés"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  // Modules Imports
  import { ref } from 'vue'

  import { useAccountStore } from '@/Stores/AccountStore.js'
  import { serverURL } from '@/main'

  import { formatDate } from '@/Utitilites/formatFuncs'

  // Declarations
  const usersDatas = ref([])

  const AccountStore = useAccountStore()

  // Functions
  const deleteUser = async (accID) => {
    try {
      const responseData = await fetch(`${serverURL}/user_delete/${accID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await responseData.json()

      if (responseJson.affectedRows == 0) return alert('Sikertelen felhasználó törlés.')

      alert('Sikeres felhasználó törlés!')
      location.reload()
    } catch (err) {
      console.error(`Error fetching "news" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }

  // Fill usersDatas table with current users
  setTimeout(async () => {
    try {
      const responseData = await fetch(`${serverURL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await responseData.json()
      usersDatas.value = responseJson
    } catch (err) {
      console.error(`Error fetching "users" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }, 400)
</script>

<style lang="scss" scoped>
  .usermanagment-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-self: flex-start;

    margin: 0 5%;

    width: 1200px;

    color: white;

    .loader-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;

      height: 100vh;

      color: white;
      font-size: 0.8rem;

      .spinner {
        width: 30px;
        height: 30px;

        border: 3px solid #f3f3f3; /* Light grey */
        border-top: 3px solid rgb(255, 192, 120); /* Blue */
        border-radius: 50%;
        animation: spinAnimation 2s linear infinite;
      }

      @keyframes spinAnimation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }

    .ctable {
      padding: 5px 10px;
      border-radius: 10px;
      background-color: rgb(40, 40, 40);

      table {
        width: 100%;
        border-style: hidden;
        text-align: center;
        border-spacing: 0px 10px;

        font-size: 0.8rem;

        th, td {
          padding: 5px 10px;
        }

        thead {
          background-color: #fff;
          color: black;

          th:first-child {
            text-align: left;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }

          th:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          
          th {
            background-color: #fff;
            border: 0px solid black;
          }
        }

        tbody {
          td:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            text-align: left;
          }

          td:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          
          td {
            background-color: rgba(75, 204, 255, 0.558);
            border: 0px solid black;
          }
        }
      }
    }
  }
</style>