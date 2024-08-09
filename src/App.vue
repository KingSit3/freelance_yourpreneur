<template>
  <main
    class="min-h-screen h-full w-full text-black flex flex-col gap-2 justify-center items-center p-10"
  >
    <h1 class="font-extrabold font-mono text-3xl">YourPreneur</h1>

    <!-- Container -->
    <div
      class="w-3/4 h-full bg-blue-100 px-10 py-4 rounded-xl border-b-2 border-r-2 border-green-800"
    >
      <template v-if="generalStore.$state.mainMenu == 'menu'">
        <MenuComponent />
      </template>
      <template v-else-if="generalStore.$state.mainMenu == 'form'">
        <FormComponent />
      </template>
    </div>
    <!-- Container -->
  </main>
</template>
<script setup lang="ts">
import MenuComponent from './components/MenuComponent.vue'
import { useGeneralStore } from './stores/general'
import FormComponent from './components/FormComponent.vue'

const generalStore = useGeneralStore()
</script>
