// Modules Imports
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { serverURL } from '@/main'

export const useNewsStore = defineStore('NewsStore', () => {
  // DATA/STATE
  const allNews = ref(null)

  // COMPUTED/GETTERS
  const getNews = computed(async () => {
    try {
      const responseData = await fetch(`${serverURL}/news`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseJson = await responseData.json()
      return responseJson
    } catch (err) {
      console.error(`Error fetching "news" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  })

  // Functions

  // Exports what we want to access in the future
  return {
    allNews,
    getNews
  }
}, { persist: true })
