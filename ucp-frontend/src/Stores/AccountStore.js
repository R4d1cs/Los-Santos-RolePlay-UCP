// Modules Imports
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { serverURL } from '@/main'

export const useAccountStore = defineStore('AccountStore', () => {
  // DATA/STATE
  const loggedUser = ref(null)

  // METHODS/SETTERS
  const setLoggedUser = (value) => {
    loggedUser.value = value
  }

  // COMPUTED/GETTERS
  const getLoggedUser = computed(() => {
    return loggedUser.value
  })

  // Functions
  const loginUser = async (credentials) => {
    try {
      const responseData = await fetch(`${serverURL}/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "accounts" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }

  const logoutUser = () => {
    setLoggedUser(null) // Reset the logged-in user upon logout
  }

  const registerUser = async (credentials) => {
    try {
      const responseData = await fetch(`${serverURL}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "accounts" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }

  const getUserGroupName = (role) => {
    switch (role) {
      case 'admin': return 'Admin'
      case 'user': return 'Felhasználó'
      default: return 'Ismeretlen'
    }
  }

  // Exports what we want to access in the future
  return {
    setLoggedUser,
    getLoggedUser,
    
    loginUser,
    logoutUser,
    registerUser,
    getUserGroupName
  }
}, { persist: true })
