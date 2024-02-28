import { ref } from 'vue'
import { defineStore } from 'pinia'

const serverURL = 'http://localhost:3000/API'

export const useAccountStore = defineStore('AccountStore', () => {
  const loggedUser = ref()

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

  return {
    loggedUser,
    registerUser
  }
})