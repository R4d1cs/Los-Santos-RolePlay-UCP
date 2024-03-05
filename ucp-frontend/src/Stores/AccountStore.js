import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const serverURL = 'http://localhost:3000/API'

export const useAccountStore = defineStore('AccountStore', () => {
  // DATA/STATE
  const loggedUser = ref(null)

  // METHODS/SETTERS
  const setLoggedUser = (value) => {
    return loggedUser.value = value
  }

  // COMPUTED/GETTERS
  const getLoggedUser = computed(() => {
    return loggedUser.value
  })

  // Functions
  const loginUser = async (credentials) => {
    try {
      const responseData = await fetch(`${ serverURL }/loginUser`, {
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

  const logoutUser = () => {
    setLoggedUser(null)
  }

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

  // Exports what we want to access in the future
  return {
    loggedUser,
    setLoggedUser,
    getLoggedUser,
    loginUser,
    logoutUser,
    registerUser
  }
}, { persist: true })