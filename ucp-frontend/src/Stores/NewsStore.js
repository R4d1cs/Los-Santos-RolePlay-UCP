import { defineStore } from 'pinia'

const serverURL = 'http://localhost:3000/API'

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