import { defineStore } from 'pinia'

interface GeneralStoreInterface {
  mainMenu: 'menu' | 'form' | 'result'
  formMenu: string
  criteriaValue: number[]
  formSurveyValue: number[][]
  stores: string[]
}

export const useGeneralStore = defineStore('general', {
  state: (): GeneralStoreInterface => {
    return {
      mainMenu: 'menu',
      formMenu: '',
      criteriaValue: [],
      formSurveyValue: [],
      stores: []
    }
  },
  persist: true
})
