import { defineStore } from 'pinia'

const serverURL = 'http://192.168.1.103:3000/API'

export const useAccountStore = defineStore('AccountStore', () => {
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
    registerUser
  }
})