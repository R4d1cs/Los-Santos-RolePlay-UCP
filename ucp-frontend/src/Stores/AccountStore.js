import { ref } from 'vue'
import { defineStore } from 'pinia'

const serverURL = 'http://localhost:3000/API'

export const useAccountStore = defineStore('AccountStore', () => {
  // Variables
  const loggedUser = ref()

  // Functions
  const registerUser = async (credentials) => {
    try {
      const responseData = await fetch(`${ serverURL }/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "accounts" table! (Err:  ${ err })`)
    }
  }

  const loginIn = async (credentials) => {
    try {
      const responseData = await fetch(`${ serverURL }/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "accounts" table! (Err:  ${ err })`)
    }
  }

  const getUserGroupName = (group) => {
    switch(group) {
      case 'user': { return 'Felhasználó'; }
      case 'aseged': { return 'Adminsegéd'; }
      case 'admin': { return 'Admin'; }
    }
  } 

  // Exports what we want to access in the future
  return {
    loggedUser,
    registerUser,
    getUserGroupName
  }
})