// Modules Imports
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Variables
const serverURL = 'http://localhost:3000/API'

export const useAccountStore = defineStore('AccountStore', () => {
  // DATA/STATE
  const loggedUser = ref(null)

  // METHODS/SETTERS
  const setLoggedUser = (value) => {
    loggedUser.value = value
  }

  // COMPUTED/GETTERS
  const getLoggedUser = computed(() => {
    if (!loggedUser.value) return loggedUser.value

    try {
      const serverResData = getUserProfileData(loggedUser.value.accountData.accID).then(resData => { return resData[2] })
      return serverResData
    } catch (error) {
      console.error('Error fetching user profile data:', error)
      return null
    }
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
    }
  }

  const getUserGroupName = (role) => {
    switch (role) {
      case 'admin': return 'Admin'
      case 'user': return 'User'
      default: return 'Unknown'
    }
  }

  const getUserProfileData = async (accID) => {
    try {
      const responseData = await fetch(`${serverURL}/getUserProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accID })
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      throw console.error(`Error fetching "accounts" or "characters" table! (Err: ${err})`) // Throw an error to let the callers handle it appropriately
    }
  }

  // Exports what we want to access in the future
  return {
    loggedUser,
    setLoggedUser,
    getLoggedUser,
    loginUser,
    logoutUser,
    registerUser,
    getUserGroupName
  }
}, { persist: true })
