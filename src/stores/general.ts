import { defineStore } from 'pinia'

interface GeneralStoreInterface {
  mainMenu: 'menu' | 'form' | 'result'
}

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreInterface => {
    return {
      mainMenu: 'menu'
    }
  }
})
