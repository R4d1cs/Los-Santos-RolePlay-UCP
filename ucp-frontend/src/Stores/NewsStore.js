import { defineStore } from 'pinia'

const serverURL = 'http://192.168.1.103:3000/API'

export const useNewsStore = defineStore('NewsStore', () => {
  const getNews = async () => {
    try {
      const responseData = await fetch(`${ serverURL }/news`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "news" table! (Err:  ${ err })`)
    }
  }

  return {
    getNews
  }
})