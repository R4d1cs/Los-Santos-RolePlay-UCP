<template>
  <div class="usermanagment-wrapper" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser.accountData.role == 'admin'">
    <h3 class="tsize-title">Felhasználók kezelése</h3>
    <table>
      <thead>
        <th>AccountID</th>
        <th>Felhasználónév</th>
        <th>E-Mail cím</th>
        <th>Jogosultság</th>
        <th>Utoljára bejelentkezve</th>
        <th>Regisztráció időpontja</th>
      </thead>
      <tbody>
        <tr v-for="user in usersDatas">
          <td>{{ user.accID }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ AccountStore.getUserGroupName(user.role) }}</td>
          <td>{{ formatDate(user.updatedAt) }}</td>
          <td>{{ formatDate(user.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
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
      console.error(`Error fetching "news" table! (Err: ${err})`)
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

    thead {
      background-color: rgb(255, 255, 255);
      color: black;

      display: table-header-group;
      vertical-align: middle;
      border-color: inherit;

      border: 10px solid blue;

      th {
        padding: 10px 5px;
      }
    }
  }
</style>